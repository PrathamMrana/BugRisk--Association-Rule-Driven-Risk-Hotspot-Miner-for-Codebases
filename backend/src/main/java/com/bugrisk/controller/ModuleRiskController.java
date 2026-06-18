package com.bugrisk.controller;

import com.bugrisk.entity.ModuleRisk;
import com.bugrisk.repository.ModuleRiskRepository;
import com.bugrisk.repository.RuleRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/risk")
@CrossOrigin(origins = "*")
@Slf4j
public class ModuleRiskController {

    private final ModuleRiskRepository moduleRiskRepository;
    private final RuleRepository ruleRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ModuleRiskController(ModuleRiskRepository moduleRiskRepository, 
                                RuleRepository ruleRepository,
                                ObjectMapper objectMapper) {
        this.moduleRiskRepository = moduleRiskRepository;
        this.ruleRepository = ruleRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<List<ModuleRisk>> getModuleRisks(
            @RequestParam(required = false) String module,
            @RequestParam(required = false) String riskLevel
    ) {
        log.info("Received request to retrieve module risk index. filterModule={}, filterRiskLevel={}", module, riskLevel);
        String moduleQuery = (module != null) ? module.toLowerCase() : null;
        List<ModuleRisk> risks = moduleRiskRepository.searchModuleRisks(moduleQuery, riskLevel);
        log.info("Found {} matching module risk indexes in PostgreSQL database", risks.size());
        return ResponseEntity.ok(risks);
    }

    @GetMapping("/module/{module}")
    public ResponseEntity<?> getModuleExplainability(@PathVariable String module) {
        log.info("Received explainability request for module: {}", module);
        
        java.util.Optional<ModuleRisk> riskOpt = moduleRiskRepository.findByModule(module);
        if (riskOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        ModuleRisk mr = riskOpt.get();
        List<Map<String, Object>> parsedRules = new ArrayList<>();
        try {
            if (mr.getTopRulesSummary() != null && !mr.getTopRulesSummary().isEmpty()) {
                JsonNode root = objectMapper.readTree(mr.getTopRulesSummary());
                if (root.isArray()) {
                    for (JsonNode node : root) {
                        Map<String, Object> rule = new HashMap<>();
                        rule.put("antecedent", node.path("antecedent").asText(""));
                        rule.put("consequent", node.path("consequent").asText(""));
                        rule.put("support", node.path("support").asDouble(0.0));
                        rule.put("confidence", node.path("confidence").asDouble(0.0));
                        rule.put("lift", node.path("lift").asDouble(0.0));
                        parsedRules.add(rule);
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to parse top rules summary for module: " + module, e);
        }
        
        // Dynamic contributions calculation
        double secStrength = 0.0;
        double perfStrength = 0.0;
        double integStrength = 0.0;
        double otherStrength = 0.0;
        
        java.util.Set<String> driversSet = new java.util.HashSet<>();
        double maxLift = 1.0;
        double maxConf = 0.0;
        
        for (Map<String, Object> rule : parsedRules) {
            String ant = (String) rule.get("antecedent");
            String cons = (String) rule.get("consequent");
            double support = (double) rule.get("support");
            double confidence = (double) rule.get("confidence");
            double lift = (double) rule.get("lift");
            
            double strength = support * confidence * lift;
            maxLift = Math.max(maxLift, lift);
            maxConf = Math.max(maxConf, confidence);
            
            // Extract drivers
            if (ant != null) {
                for (String part : ant.split(",")) {
                    String[] kv = part.split("=");
                    if (kv.length == 2 && !kv[1].equalsIgnoreCase(module)) {
                        driversSet.add(kv[1]);
                    }
                }
            }
            
            // Categorize rule
            String ruleText = (ant + "->" + cons).toLowerCase();
            if (ruleText.contains("security") || ruleText.contains("auth") || ruleText.contains("critical") || ruleText.contains("high")) {
                secStrength += strength;
            } else if (ruleText.contains("performance") || ruleText.contains("database") || ruleText.contains("memory") || ruleText.contains("resource")) {
                perfStrength += strength;
            } else if (ruleText.contains("integration") || ruleText.contains("api") || ruleText.contains("subsystem") || ruleText.contains("gateway")) {
                integStrength += strength;
            } else {
                otherStrength += strength;
            }
        }
        
        double totalStrength = secStrength + perfStrength + integStrength + otherStrength;
        
        List<Map<String, Object>> contributions = new ArrayList<>();
        if (totalStrength > 0) {
            contributions.add(createContribution("Security Drivers", Math.round((secStrength / totalStrength) * 100)));
            contributions.add(createContribution("Performance Drivers", Math.round((perfStrength / totalStrength) * 100)));
            contributions.add(createContribution("Integration Drivers", Math.round((integStrength / totalStrength) * 100)));
            contributions.add(createContribution("Other Drivers", Math.round((otherStrength / totalStrength) * 100)));
        } else {
            // Equal distribution fallback if no rules mapped strength
            contributions.add(createContribution("Security Drivers", 25));
            contributions.add(createContribution("Performance Drivers", 25));
            contributions.add(createContribution("Integration Drivers", 25));
            contributions.add(createContribution("Other Drivers", 25));
        }
        
        // Find dominant category
        String dominantCategory = "Security";
        double maxStrength = secStrength;
        if (perfStrength > maxStrength) {
            dominantCategory = "Performance";
            maxStrength = perfStrength;
        }
        if (integStrength > maxStrength) {
            dominantCategory = "Integration";
            maxStrength = integStrength;
        }
        if (otherStrength > maxStrength) {
            dominantCategory = "Other";
        }
        
        // Compile drivers text
        String driversText = driversSet.isEmpty() ? "general transaction context" : String.join(", ", driversSet);
        
        // Premium brief template explanation:
        // "{MODULE} classified {LEVEL}. Primary drivers: {DRIVERS}. Top rule strength: Confidence {CONF}% | Lift {LIFT}. {DOMINANT_CATEGORY}-related defect patterns dominate this module."
        String explanation = String.format(
            "%s classified %s. Primary drivers: %s. Top rule strength: Confidence %d%% | Lift %.1f. %s-related defect patterns dominate this module.",
            module.toUpperCase(),
            mr.getRiskLevel(),
            driversText,
            (int) Math.round(maxConf * 100),
            maxLift,
            dominantCategory
        );
        
        Map<String, Object> result = new HashMap<>();
        result.put("module", module);
        result.put("risk_score", mr.getRiskScore());
        result.put("risk_level", mr.getRiskLevel());
        result.put("top_rules", parsedRules);
        result.put("contributions", contributions);
        result.put("explanation", explanation);
        
        return ResponseEntity.ok(result);
    }
    
    private Map<String, Object> createContribution(String category, long percentage) {
        Map<String, Object> contrib = new HashMap<>();
        contrib.put("category", category);
        contrib.put("percentage", percentage);
        return contrib;
    }
}
