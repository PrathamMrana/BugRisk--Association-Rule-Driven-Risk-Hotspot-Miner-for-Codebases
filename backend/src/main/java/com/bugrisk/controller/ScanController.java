package com.bugrisk.controller;

import com.bugrisk.dto.ScanRequest;
import com.bugrisk.dto.ScanResponse;
import com.bugrisk.entity.AuditLog;
import com.bugrisk.entity.ScanHistory;
import com.bugrisk.repository.AuditLogRepository;
import com.bugrisk.repository.ScanHistoryRepository;
import com.bugrisk.service.MlGatewayService;
import com.bugrisk.service.ScanOrchestratorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scan")
@CrossOrigin(originPatterns = "*")
@Slf4j
public class ScanController {

    private final ScanOrchestratorService scanOrchestratorService;
    private final MlGatewayService mlGatewayService;
    private final ScanHistoryRepository scanHistoryRepository;
    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ScanController(
            ScanOrchestratorService scanOrchestratorService,
            MlGatewayService mlGatewayService,
            ScanHistoryRepository scanHistoryRepository,
            AuditLogRepository auditLogRepository,
            ObjectMapper objectMapper) {
        this.scanOrchestratorService = scanOrchestratorService;
        this.mlGatewayService = mlGatewayService;
        this.scanHistoryRepository = scanHistoryRepository;
        this.auditLogRepository = auditLogRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/run")
    public ResponseEntity<ScanResponse> runScan(@RequestBody(required = false) ScanRequest request) {
        log.info("Received defect analysis scan request parameters: {}", request);
        ScanResponse response = scanOrchestratorService.executeScan(request);
        log.info("Defect scan execution successfully completed. Rules count: {}, Modules count: {}",
                response.getRulesCount(), response.getModulesCount());
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/upload", produces = "application/json")
    public ResponseEntity<String> uploadDataset(@RequestParam("file") MultipartFile file) {
        String username = "SYSTEM";
        try {
            org.springframework.security.core.Authentication auth = 
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getName() != null) {
                username = auth.getName();
            }
        } catch (Exception ignored) {
        }
        final String finalUsername = username;
        log.info("Received dataset upload request: filename={}, user={}", file.getOriginalFilename(), finalUsername);
        try {
            String response = mlGatewayService.forwardUpload(file).block();
            try {
                com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(response);
                String validationStatus = root.path("validation_status").asText("invalid");
                String status = "valid".equalsIgnoreCase(validationStatus) ? "SUCCESS" : "FAILED";
                scanOrchestratorService.logUploadAudit(file.getOriginalFilename(), status, finalUsername);
            } catch (Exception e) {
                scanOrchestratorService.logUploadAudit(file.getOriginalFilename(), "FAILED", finalUsername);
            }
            return ResponseEntity.ok(response);
        } catch (Exception err) {
            log.error("Failed to forward upload: ", err);
            scanOrchestratorService.logUploadAudit(file.getOriginalFilename(), "FAILED", finalUsername);
            return ResponseEntity.status(500).body("{\"status\":\"error\",\"message\":\"" + err.getMessage() + "\"}");
        }
    }

    @PostMapping(value = "/playground/compare", produces = "application/json")
    public Mono<String> comparePlayground(@RequestBody(required = false) ScanRequest request) {
        String username = "SYSTEM";
        try {
            org.springframework.security.core.Authentication auth = 
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getName() != null) {
                username = auth.getName();
            }
        } catch (Exception ignored) {
        }
        final String finalUsername = username;
        log.info("Received comparative playground mining request parameters: {}, user: {}", request, finalUsername);
        return mlGatewayService.comparePlayground(request)
                .doOnNext(responseBody -> {
                    try {
                        scanOrchestratorService.saveComparisonHistory(request, responseBody, finalUsername);
                    } catch (Exception e) {
                        log.error("Failed to save comparison history: ", e);
                    }
                });
    }

    @GetMapping("/history")
    public ResponseEntity<List<ScanHistory>> getScanHistory() {
        log.info("Fetching scan execution history...");
        List<ScanHistory> history = scanHistoryRepository.findAll(
                org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "timestamp")
        );
        return ResponseEntity.ok(history);
    }

    @GetMapping("/audit")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        log.info("Fetching audit logs...");
        List<AuditLog> logs = auditLogRepository.findAll(
                org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "timestamp")
        );
        return ResponseEntity.ok(logs);
    }

    @GetMapping(value = "/stream", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter streamScan(
            @RequestParam(required = false) Integer rows,
            @RequestParam(required = false) Integer seed,
            @RequestParam(required = false) String algorithm,
            @RequestParam(required = false) Double support,
            @RequestParam(required = false) Double confidence,
            @RequestParam(required = false) Double lift,
            @RequestParam(required = false, defaultValue = "synthetic") String dataSource) {
        
        ScanRequest request = ScanRequest.builder()
                .rows(rows)
                .seed(seed)
                .algorithm(algorithm)
                .support(support)
                .confidence(confidence)
                .lift(lift)
                .dataSource(dataSource)
                .build();
        
        String username = "SYSTEM";
        try {
            org.springframework.security.core.Authentication auth = 
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getName() != null) {
                username = auth.getName();
            }
        } catch (Exception ignored) {
        }
        final String finalUsername = username;
        
        log.info("Starting real-time defect analysis SSE stream, user={}", finalUsername);
        
        org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter = 
                new org.springframework.web.servlet.mvc.method.annotation.SseEmitter(600000L);
                
        mlGatewayService.streamScan(request)
                .subscribe(
                        event -> {
                            try {
                                String data = event.data();
                                if (data != null) {
                                    log.info("Received SSE event data: {}", data);
                                    if (data.contains("\"stage\": \"FAILED\"")) {
                                        try {
                                            log.warn("SSE Stream failed from ML service. Persisting failure in database...");
                                            com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(data);
                                            String errorReason = root.path("error").asText("Unknown pipeline error");
                                            scanOrchestratorService.saveFailedScanHistory(request, errorReason, finalUsername);
                                            log.info("Successfully persisted failed scan history record.");
                                        } catch (Exception e) {
                                            log.error("Failed to parse and save failed streamed scan results: ", e);
                                        }
                                    }

                                    if (data.contains("\"stage\": \"COMPLETED\"")) {
                                        try {
                                            log.info("SSE Stream completed from ML service. Persisting results in database...");
                                            com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(data);
                                            com.fasterxml.jackson.databind.JsonNode resultNode = root.path("result");
                                            if (!resultNode.isMissingNode() && !resultNode.isNull()) {
                                                ScanResponse response = objectMapper.treeToValue(resultNode, ScanResponse.class);
                                                scanOrchestratorService.saveScanResultsAndHistory(request, response, finalUsername);
                                                log.info("Successfully persisted streamed scan results. Rules count: {}", response.getRulesCount());
                                            }
                                        } catch (Exception e) {
                                            log.error("Failed to parse and save streamed scan results: ", e);
                                        }
                                    }

                                    emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                                            .data(data));
                                }
                            } catch (Exception e) {
                                log.error("Error sending SSE event: ", e);
                            }
                        },
                        err -> {
                            log.error("SSE stream error: ", err);
                            try {
                                scanOrchestratorService.saveFailedScanHistory(request, err.getMessage(), finalUsername);
                            } catch (Exception e) {
                                log.error("Failed to save failed scan history: ", e);
                            }
                            emitter.completeWithError(err);
                        },
                        () -> {
                            log.info("SSE stream completed successfully.");
                            emitter.complete();
                        }
                );
                
        return emitter;
    }

    @PostMapping("/cache/clear")
    @org.springframework.cache.annotation.CacheEvict(value = {"rules", "risks"}, allEntries = true)
    public ResponseEntity<java.util.Map<String, String>> clearCache() {
        log.info("Request received to manually evict rules and risks Redis cache...");
        return ResponseEntity.ok(java.util.Map.of("status", "success", "message", "Redis caches 'rules' and 'risks' cleared."));
    }
}

