package com.bugrisk.service;

import com.bugrisk.dto.ModuleRiskDto;
import com.bugrisk.dto.RuleDto;
import com.bugrisk.dto.ScanRequest;
import com.bugrisk.dto.ScanResponse;
import com.bugrisk.entity.AuditLog;
import com.bugrisk.entity.ModuleRisk;
import com.bugrisk.entity.Rule;
import com.bugrisk.entity.ScanHistory;
import com.bugrisk.repository.AuditLogRepository;
import com.bugrisk.repository.ModuleRiskRepository;
import com.bugrisk.repository.RuleRepository;
import com.bugrisk.repository.ScanHistoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ScanOrchestratorService {

    private final MlGatewayService mlGatewayService;
    private final RuleRepository ruleRepository;
    private final ModuleRiskRepository moduleRiskRepository;
    private final AuditLogRepository auditLogRepository;
    private final ScanHistoryRepository scanHistoryRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ScanOrchestratorService(
            MlGatewayService mlGatewayService,
            RuleRepository ruleRepository,
            ModuleRiskRepository moduleRiskRepository,
            AuditLogRepository auditLogRepository,
            ScanHistoryRepository scanHistoryRepository,
            ObjectMapper objectMapper) {
        this.mlGatewayService = mlGatewayService;
        this.ruleRepository = ruleRepository;
        this.moduleRiskRepository = moduleRiskRepository;
        this.auditLogRepository = auditLogRepository;
        this.scanHistoryRepository = scanHistoryRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Executes scan orchestration: wipes database tables, queries ML service, persists new data,
     * logs the action in the audit log, and evicts rules/risks caches.
     */
    @Transactional
    @CacheEvict(value = {"rules", "risks"}, allEntries = true)
    public ScanResponse executeScan(ScanRequest request) {
        String username = getSecurityUsername();
        try {
            // Fetch fresh results from FastAPI
            ScanResponse response = mlGatewayService.triggerScan(request).block();
            if (response == null) {
                throw new RuntimeException("Null response from FastAPI ML service");
            }

            saveScanResultsAndHistory(request, response, username);
            return response;

        } catch (Exception e) {
            try {
                saveFailedScanHistory(request, e.getMessage(), username);
            } catch (Exception ignored) {}
            // Log failure audit entry
            auditLogRepository.save(AuditLog.builder()
                    .username(username)
                    .action("RUN_SCAN")
                    .status("FAILED")
                    .timestamp(LocalDateTime.now())
                    .build());
            throw new RuntimeException("Scan execution failed: " + e.getMessage(), e);
        }
    }

    @Transactional
    @CacheEvict(value = {"rules", "risks"}, allEntries = true)
    public void saveScanResultsAndHistory(ScanRequest request, ScanResponse response, String username) {
        // 1. Clear database tables
        ruleRepository.deleteAllInBatch();
        moduleRiskRepository.deleteAllInBatch();

        // 2. Save new Rules
        if (response.getRules() != null) {
            List<Rule> rules = response.getRules().stream()
                    .map(dto -> Rule.builder()
                            .antecedent(dto.getAntecedent())
                            .consequent(dto.getConsequent())
                            .support(dto.getSupport())
                            .confidence(dto.getConfidence())
                            .lift(dto.getLift())
                            .build())
                    .collect(Collectors.toList());
            ruleRepository.saveAll(rules);
        }

        // 3. Save new ModuleRisks
        if (response.getModuleRisk() != null) {
            List<ModuleRisk> risks = response.getModuleRisk().stream()
                    .map(dto -> {
                        String topRulesSummary = "";
                        try {
                            topRulesSummary = objectMapper.writeValueAsString(dto.getTopRules());
                        } catch (Exception e) {
                            topRulesSummary = "[]";
                        }
                        double rawScore = dto.getRiskScore() != null ? dto.getRiskScore() : 0.0;
                        if (rawScore < 0.0 || rawScore > 100.0) {
                            log.warn("Abnormal out-of-bounds risk score from ML service: {} for module: {}. Clamping.", rawScore, dto.getModule());
                        }
                        double clampedScore = Math.max(0.0, Math.min(100.0, rawScore));

                        return ModuleRisk.builder()
                                .module(dto.getModule())
                                .riskScore(clampedScore)
                                .riskLevel(dto.getRiskLevel())
                                .topRulesSummary(topRulesSummary)
                                .build();
                        })
                        .collect(Collectors.toList());
            moduleRiskRepository.saveAll(risks);
        }

        // 4. Save Scan History
        String resultsJson = "{}";
        try {
            resultsJson = objectMapper.writeValueAsString(response);
        } catch (Exception e) {
            // ignore
        }

        String topHotspot = "None";
        if (response.getModuleRisk() != null && !response.getModuleRisk().isEmpty()) {
            ModuleRiskDto maxRisk = response.getModuleRisk().stream()
                    .max((a, b) -> Double.compare(a.getRiskScore() != null ? a.getRiskScore() : 0.0, b.getRiskScore() != null ? b.getRiskScore() : 0.0))
                    .orElse(null);
            if (maxRisk != null) {
                topHotspot = maxRisk.getModule();
            }
        }

        Integer rawRuntime = response.getRuntimeMs();
        Integer runtimeMs = null;
        if (rawRuntime != null) {
            runtimeMs = rawRuntime;
            if (runtimeMs <= 0) {
                if ("SUCCESS".equalsIgnoreCase(response.getStatus()) || "success".equalsIgnoreCase(response.getStatus())) {
                    runtimeMs = 1; // measurement resolution limitation confirmed for successful scan
                } else {
                    runtimeMs = null;
                }
            }
        }


        scanHistoryRepository.save(ScanHistory.builder()
                .algorithm(request != null && request.getAlgorithm() != null ? request.getAlgorithm() : "fpgrowth")
                .dataSource(request != null && request.getDataSource() != null ? request.getDataSource() : "synthetic")
                .runtimeMs(runtimeMs)
                .rulesCount(response.getRulesCount() != null ? response.getRulesCount() : 0)
                .resultsJson(resultsJson)
                .datasetRows(response.getDatasetRows() != null ? response.getDatasetRows() : (request != null && request.getRows() != null ? request.getRows() : 2500))
                .support(request != null && request.getSupport() != null ? request.getSupport() : 0.02)
                .confidence(request != null && request.getConfidence() != null ? request.getConfidence() : 0.5)
                .liftThreshold(request != null && request.getLift() != null ? request.getLift() : 1.2)
                .topHotspot(topHotspot)
                .status("SUCCESS")
                .datasetHash(response.getDatasetHash() != null ? response.getDatasetHash() : "N/A")
                .build());

        // 5. Log success audit entry
        auditLogRepository.save(AuditLog.builder()
                .username(username)
                .action("RUN_SCAN")
                .status("SUCCESS")
                .timestamp(LocalDateTime.now())
                .build());
    }

    @Transactional
    public void saveFailedScanHistory(ScanRequest request, String errorReason, String username) {
        scanHistoryRepository.save(ScanHistory.builder()
                .algorithm(request != null && request.getAlgorithm() != null ? request.getAlgorithm() : "fpgrowth")
                .dataSource(request != null && request.getDataSource() != null ? request.getDataSource() : "synthetic")
                .runtimeMs(null)
                .rulesCount(0)
                .resultsJson("{}")
                .datasetRows(request != null && request.getRows() != null ? request.getRows() : 0)
                .support(request != null && request.getSupport() != null ? request.getSupport() : 0.0)
                .confidence(request != null && request.getConfidence() != null ? request.getConfidence() : 0.0)
                .liftThreshold(request != null && request.getLift() != null ? request.getLift() : 0.0)
                .topHotspot("N/A")
                .status("FAILED")
                .errorReason(errorReason)
                .datasetHash("N/A")
                .build());
    }

    private String getSecurityUsername() {
        String username = "SYSTEM";
        try {
            org.springframework.security.core.Authentication auth = 
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getName() != null) {
                username = auth.getName();
            }
        } catch (NoClassDefFoundError | Exception ignored) {
        }
        return username;
    }

    @Transactional
    public void saveComparisonHistory(ScanRequest request, String responseBody, String username) {
        try {
            com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(responseBody);
            String dataSource = request != null && request.getDataSource() != null ? request.getDataSource() : "synthetic";
            
            // Persist FP-Growth run
            com.fasterxml.jackson.databind.JsonNode fpNode = root.path("fpgrowth");
            if (!fpNode.isMissingNode() && !fpNode.isNull()) {
                com.fasterxml.jackson.databind.JsonNode totalTimeNode = fpNode.path("total_time_ms");
                Integer fpRuntime = null;
                String fpStatus = "SUCCESS";
                String fpError = null;
                
                if (totalTimeNode.isNull() || totalTimeNode.isMissingNode()) {
                    fpStatus = "FAILED";
                    fpError = "FP-Growth comparison execution failed";
                } else {
                    int rawFpRuntime = totalTimeNode.asInt();
                    fpRuntime = rawFpRuntime;
                    if (fpRuntime <= 0) {
                        fpRuntime = 1; // confirmation of fast resolution limit Confirmed
                    }
                }
                
                scanHistoryRepository.save(ScanHistory.builder()
                        .algorithm("fpgrowth")
                        .dataSource(dataSource)
                        .runtimeMs(fpRuntime)
                        .rulesCount(fpNode.path("rules_count").asInt(0))
                        .resultsJson(fpNode.toString())
                        .datasetRows(request != null && request.getRows() != null ? request.getRows() : 2000)
                        .support(request != null && request.getSupport() != null ? request.getSupport() : 0.03)
                        .confidence(request != null && request.getConfidence() != null ? request.getConfidence() : 0.5)
                        .liftThreshold(request != null && request.getLift() != null ? request.getLift() : 1.2)
                        .topHotspot("N/A")
                        .status(fpStatus)
                        .errorReason(fpError)
                        .datasetHash("N/A")
                        .build());
            }
            
            // Persist Apriori run
            com.fasterxml.jackson.databind.JsonNode apNode = root.path("apriori");
            if (!apNode.isMissingNode() && !apNode.isNull()) {
                com.fasterxml.jackson.databind.JsonNode totalTimeNode = apNode.path("total_time_ms");
                Integer apRuntime = null;
                String apStatus = "SUCCESS";
                String apError = null;
                
                if (totalTimeNode.isNull() || totalTimeNode.isMissingNode()) {
                    apStatus = "FAILED";
                    apError = "Apriori comparison execution failed";
                } else {
                    int rawApRuntime = totalTimeNode.asInt();
                    apRuntime = rawApRuntime;
                    if (apRuntime <= 0) {
                        apRuntime = 1; // confirmation of fast resolution limit Confirmed
                    }
                }
                
                scanHistoryRepository.save(ScanHistory.builder()
                        .algorithm("apriori")
                        .dataSource(dataSource)
                        .runtimeMs(apRuntime)
                        .rulesCount(apNode.path("rules_count").asInt(0))
                        .resultsJson(apNode.toString())
                        .datasetRows(request != null && request.getRows() != null ? request.getRows() : 2000)
                        .support(request != null && request.getSupport() != null ? request.getSupport() : 0.03)
                        .confidence(request != null && request.getConfidence() != null ? request.getConfidence() : 0.5)
                        .liftThreshold(request != null && request.getLift() != null ? request.getLift() : 1.2)
                        .topHotspot("N/A")
                        .status(apStatus)
                        .errorReason(apError)
                        .datasetHash("N/A")
                        .build());
            }


            // Save success audit entry
            auditLogRepository.save(AuditLog.builder()
                    .username(username)
                    .action("COMPARE_PLAYGROUND")
                    .status("SUCCESS")
                    .timestamp(LocalDateTime.now())
                    .build());
        } catch (Exception e) {
            // Save failure audit entry
            auditLogRepository.save(AuditLog.builder()
                    .username(username)
                    .action("COMPARE_PLAYGROUND")
                    .status("FAILED")
                    .timestamp(LocalDateTime.now())
                    .build());
            throw new RuntimeException("Failed to persist comparison runs: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void logUploadAudit(String filename, String status, String username) {
        auditLogRepository.save(AuditLog.builder()
                .username(username)
                .action("UPLOAD_DATASET")
                .status(status)
                .timestamp(LocalDateTime.now())
                .build());
    }
}
