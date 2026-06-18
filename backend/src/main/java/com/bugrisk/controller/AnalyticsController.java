package com.bugrisk.controller;

import com.bugrisk.entity.Rule;
import com.bugrisk.entity.ModuleRisk;
import com.bugrisk.repository.RuleRepository;
import com.bugrisk.repository.ModuleRiskRepository;
import com.bugrisk.service.MlGatewayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/analytics")
@CrossOrigin(origins = "*")
@Slf4j
public class AnalyticsController {

    private final MlGatewayService mlGatewayService;
    private final RuleRepository ruleRepository;
    private final ModuleRiskRepository moduleRiskRepository;

    @Autowired
    public AnalyticsController(MlGatewayService mlGatewayService,
                               RuleRepository ruleRepository,
                               ModuleRiskRepository moduleRiskRepository) {
        this.mlGatewayService = mlGatewayService;
        this.ruleRepository = ruleRepository;
        this.moduleRiskRepository = moduleRiskRepository;
    }

    /**
     * Returns platform-wide analytics summary derived from the database:
     * avg lift, avg confidence, avg support, top module, severity distribution, etc.
     */
    @GetMapping(value = "/summary", produces = "application/json")
    public ResponseEntity<?> getAnalyticsSummary() {
        log.info("Fetching ML analytics summary directly from PostgreSQL database...");
        
        List<Rule> rules = ruleRepository.findAll();
        List<ModuleRisk> risks = moduleRiskRepository.findAll();
        
        int totalRules = rules.size();
        if (totalRules == 0) {
            Map<String, Object> emptyMap = new HashMap<>();
            emptyMap.put("total_rules", 0);
            emptyMap.put("avg_lift", 0.0);
            emptyMap.put("avg_confidence", 0.0);
            emptyMap.put("avg_support", 0.0);
            emptyMap.put("max_lift", 0.0);
            emptyMap.put("top_module", null);
            emptyMap.put("top_module_risk_score", 0.0);
            emptyMap.put("severity_distribution", new HashMap<>());
            emptyMap.put("rules_by_module", new HashMap<>());
            emptyMap.put("risk_level_counts", new HashMap<>());
            return ResponseEntity.ok(emptyMap);
        }
        
        double sumLift = 0.0;
        double sumConf = 0.0;
        double sumSupport = 0.0;
        double maxLift = 0.0;
        
        Map<String, Integer> severityDist = new HashMap<>();
        Map<String, Integer> rulesByModule = new HashMap<>();
        
        for (Rule r : rules) {
            sumLift += r.getLift();
            sumConf += r.getConfidence();
            sumSupport += r.getSupport();
            maxLift = Math.max(maxLift, r.getLift());
            
            // Severity distribution from consequent
            String consequent = r.getConsequent();
            if (consequent != null && consequent.contains("severity=")) {
                String[] parts = consequent.split("severity=");
                if (parts.length > 1) {
                    String sev = parts[1].split(",")[0].trim().toLowerCase();
                    severityDist.put(sev, severityDist.getOrDefault(sev, 0) + 1);
                }
            }
            
            // Rules count per module from antecedent
            String antecedent = r.getAntecedent();
            if (antecedent != null) {
                for (String part : antecedent.split(",")) {
                    part = part.trim();
                    if (part.startsWith("module=")) {
                        String mod = part.split("=")[1].trim();
                        rulesByModule.put(mod, rulesByModule.getOrDefault(mod, 0) + 1);
                    }
                }
            }
        }
        
        double avgLift = sumLift / totalRules;
        double avgConfidence = sumConf / totalRules;
        double avgSupport = sumSupport / totalRules;
        
        // Risk level distribution and top module
        Map<String, Integer> riskLevelCounts = new HashMap<>();
        String topModule = null;
        double topScore = 0.0;
        
        for (ModuleRisk risk : risks) {
            String level = risk.getRiskLevel();
            if (level != null) {
                riskLevelCounts.put(level.toUpperCase(), riskLevelCounts.getOrDefault(level.toUpperCase(), 0) + 1);
            }
            double score = risk.getRiskScore();
            if (score > topScore) {
                topScore = score;
                topModule = risk.getModule();
            }
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("total_rules", totalRules);
        result.put("avg_lift", avgLift);
        result.put("avg_confidence", avgConfidence);
        result.put("avg_support", avgSupport);
        result.put("max_lift", maxLift);
        result.put("top_module", topModule);
        result.put("top_module_risk_score", topScore);
        result.put("severity_distribution", severityDist);
        result.put("rules_by_module", rulesByModule);
        result.put("risk_level_counts", riskLevelCounts);
        
        return ResponseEntity.ok(result);
    }

    /**
     * Proxies the sample CSV download from the ML service.
     * Allows any authenticated user to download the sample dataset schema.
     */
    @GetMapping("/sample-data/download")
    public Mono<ResponseEntity<byte[]>> downloadSampleCsv() {
        log.info("Proxying sample CSV download from ml-service...");
        return mlGatewayService.getSampleCsv()
                .map(bytes -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=bugrisk_sample_data.csv")
                        .contentType(MediaType.parseMediaType("text/csv"))
                        .body(bytes));
    }

    /**
     * Generates intelligence profile analytics on the current active dataset.
     */
    @PostMapping(value = "/dataset-profile", produces = "application/json")
    public Mono<String> getDatasetProfile(@RequestParam(value = "source", defaultValue = "synthetic") String source) {
        log.info("Generating dataset intelligence profile for source: {}", source);
        return mlGatewayService.forwardDatasetProfile(source);
    }
}
