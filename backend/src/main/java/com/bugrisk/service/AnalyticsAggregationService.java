package com.bugrisk.service;

import com.bugrisk.dto.*;
import com.bugrisk.entity.ScanHistory;
import com.bugrisk.repository.ScanHistoryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AnalyticsAggregationService {

    private final ScanHistoryRepository scanHistoryRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public AnalyticsAggregationService(ScanHistoryRepository scanHistoryRepository, ObjectMapper objectMapper) {
        this.scanHistoryRepository = scanHistoryRepository;
        this.objectMapper = objectMapper;
    }

    private ScanHistory getTargetScan(Long scanId) {
        if (scanId != null) {
            return scanHistoryRepository.findById(scanId).orElse(null);
        }
        List<ScanHistory> history = scanHistoryRepository.findAll(
                org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "timestamp")
        );
        return history.isEmpty() ? null : history.get(0);
    }

    public DashboardSummaryDTO getDashboardSummary(Long scanId) {
        ScanHistory scan = getTargetScan(scanId);
        if (scan == null) return DashboardSummaryDTO.builder().build();

        String generatedAt = LocalDateTime.now().toString();

        try {
            JsonNode root = objectMapper.readTree(scan.getResultsJson());
            JsonNode rulesNode = root.path("rules");
            JsonNode risksNode = root.path("module_risk");

            double sumLift = 0.0;
            double sumConf = 0.0;
            double sumSupport = 0.0;
            double maxLift = 0.0;
            int totalRules = rulesNode.size();

            Map<String, Integer> rulesByModule = new HashMap<>();

            for (JsonNode rule : rulesNode) {
                double lift = rule.path("lift").asDouble();
                sumLift += lift;
                sumConf += rule.path("confidence").asDouble();
                sumSupport += rule.path("support").asDouble();
                maxLift = Math.max(maxLift, lift);

                String ant = rule.path("antecedent").asText();
                if (ant != null) {
                    for (String part : ant.split(",")) {
                        part = part.trim();
                        if (part.startsWith("module=")) {
                            String mod = part.split("=")[1].trim();
                            rulesByModule.put(mod, rulesByModule.getOrDefault(mod, 0) + 1);
                        }
                    }
                }
            }

            Map<String, Integer> riskLevelCounts = new HashMap<>();
            String topModule = null;
            double topScore = 0.0;

            for (JsonNode risk : risksNode) {
                String level = risk.path("risk_level").asText();
                if (level != null && !level.isEmpty()) {
                    riskLevelCounts.put(level.toUpperCase(), riskLevelCounts.getOrDefault(level.toUpperCase(), 0) + 1);
                }
                double score = risk.path("risk_score").asDouble();
                if (score > topScore) {
                    topScore = score;
                    topModule = risk.path("module").asText();
                }
            }

            return DashboardSummaryDTO.builder()
                    .scanId(scan.getId())
                    .generatedAt(generatedAt)
                    .runtimeMs(scan.getRuntimeMs())
                    .datasetRows(scan.getDatasetRows())
                    .algorithm(scan.getAlgorithm())
                    .dataSource(scan.getDataSource())
                    .timestamp(scan.getTimestamp() != null ? scan.getTimestamp().toString() : null)
                    .totalRules(totalRules)
                    .avgLift(totalRules > 0 ? sumLift / totalRules : 0.0)
                    .avgConfidence(totalRules > 0 ? sumConf / totalRules : 0.0)
                    .avgSupport(totalRules > 0 ? sumSupport / totalRules : 0.0)
                    .maxLift(maxLift)
                    .topModule(topModule)
                    .topModuleRiskScore(topScore)
                    .riskLevelCounts(riskLevelCounts)
                    .rulesByModule(rulesByModule)
                    .build();

        } catch (Exception e) {
            log.error("Failed to generate dashboard summary", e);
            return DashboardSummaryDTO.builder().build();
        }
    }

    public SeverityAnalyticsDTO getSeverityAnalytics(Long scanId) {
        ScanHistory scan = getTargetScan(scanId);
        if (scan == null) return SeverityAnalyticsDTO.builder().build();

        String generatedAt = LocalDateTime.now().toString();
        Map<String, Integer> severityDist = new HashMap<>();
        Map<String, Integer> bugTypeDist = new HashMap<>();
        Map<String, Integer> moduleFreq = new HashMap<>();

        try {
            JsonNode root = objectMapper.readTree(scan.getResultsJson());
            JsonNode rulesNode = root.path("rules");

            for (JsonNode rule : rulesNode) {
                String ant = rule.path("antecedent").asText();
                String cons = rule.path("consequent").asText();

                if (cons != null && cons.contains("severity=")) {
                    String[] parts = cons.split("severity=");
                    if (parts.length > 1) {
                        String sev = parts[1].split(",")[0].trim().toLowerCase();
                        severityDist.put(sev, severityDist.getOrDefault(sev, 0) + 1);
                    }
                }

                if (ant != null) {
                    for (String part : ant.split(",")) {
                        part = part.trim();
                        if (part.startsWith("bug_type=")) {
                            String type = part.split("=")[1].trim();
                            bugTypeDist.put(type, bugTypeDist.getOrDefault(type, 0) + 1);
                        }
                        if (part.startsWith("module=")) {
                            String mod = part.split("=")[1].trim();
                            moduleFreq.put(mod, moduleFreq.getOrDefault(mod, 0) + 1);
                        }
                    }
                }
            }

            return SeverityAnalyticsDTO.builder()
                    .scanId(scan.getId())
                    .generatedAt(generatedAt)
                    .severityDistribution(severityDist)
                    .bugTypeDistribution(bugTypeDist)
                    .moduleFrequency(moduleFreq)
                    .build();
        } catch (Exception e) {
            log.error("Failed to generate severity analytics", e);
            return SeverityAnalyticsDTO.builder().build();
        }
    }

    public GraphAnalyticsDTO getGraphAnalytics(Long scanId) {
        ScanHistory scan = getTargetScan(scanId);
        if (scan == null) return GraphAnalyticsDTO.builder().build();

        String generatedAt = LocalDateTime.now().toString();

        try {
            JsonNode root = objectMapper.readTree(scan.getResultsJson());
            JsonNode rulesNode = root.path("rules");

            Map<String, GraphAnalyticsDTO.NodeDTO> nodesMap = new HashMap<>();
            List<GraphAnalyticsDTO.EdgeDTO> edgesList = new ArrayList<>();

            Set<String> uniqueAntecedents = new HashSet<>();
            Set<String> uniqueConsequents = new HashSet<>();

            int count = 0;
            for (JsonNode rule : rulesNode) {
                if (count >= 15) break; // Display top 15 rules on graph for visualization clarity
                String antStr = rule.path("antecedent").asText();
                String consStr = rule.path("consequent").asText();

                for (String s : antStr.split(",")) {
                    uniqueAntecedents.add(s.trim());
                }
                uniqueConsequents.add(consStr.trim());
                count++;
            }

            List<String> antArray = new ArrayList<>(uniqueAntecedents);
            List<String> consArray = new ArrayList<>(uniqueConsequents);

            // Layout consequents (Right Column)
            for (int i = 0; i < consArray.size(); i++) {
                String cons = consArray.get(i);
                String[] parts = cons.split("=");
                String consKey = parts[0];
                String consVal = parts.length > 1 ? parts[1] : null;
                int yPos = 80 + i * 140;

                Map<String, Object> style = new HashMap<>();
                style.put("background", "#881337");
                style.put("color", "#fda4af");
                style.put("border", "2px solid #e11d48");
                style.put("borderRadius", "8px");
                style.put("fontSize", "11px");
                style.put("fontWeight", "bold");
                style.put("padding", "8px");
                style.put("width", 140);

                nodesMap.put(cons, GraphAnalyticsDTO.NodeDTO.builder()
                        .id(cons)
                        .data(Map.of("label", consVal != null ? consVal.toUpperCase() : cons, "type", consKey))
                        .position(Map.of("x", 500, "y", yPos))
                        .style(style)
                        .build());
            }

            // Layout antecedents (Left Column)
            for (int i = 0; i < antArray.size(); i++) {
                String ant = antArray.get(i);
                String[] parts = ant.split("=");
                String antKey = parts[0];
                String antVal = parts.length > 1 ? parts[1] : ant;
                int yPos = 50 + i * 90;

                String bg = "#1e1b4b";
                String border = "#4f46e5";
                String text = "#c7d2fe";

                if (antKey.equals("module")) {
                    bg = "#3b0764"; border = "#9333ea"; text = "#f3e8ff";
                } else if (antKey.equals("subsystem")) {
                    bg = "#0f172a"; border = "#2563eb"; text = "#dbeafe";
                } else if (antKey.equals("language")) {
                    bg = "#1c1917"; border = "#d97706"; text = "#fef3c7";
                } else if (antKey.equals("tech_stack")) {
                    bg = "#042f2e"; border = "#0d9488"; text = "#ccfbf1";
                } else if (antKey.equals("bug_type")) {
                    bg = "#7c2d12"; border = "#ea580c"; text = "#ffedd5";
                }

                Map<String, Object> style = new HashMap<>();
                style.put("background", bg);
                style.put("color", text);
                style.put("border", "2px solid " + border);
                style.put("borderRadius", "8px");
                style.put("fontSize", "11px");
                style.put("fontWeight", "bold"); // Ensure string value for React
                style.put("padding", "8px");
                style.put("width", 140);

                nodesMap.put(ant, GraphAnalyticsDTO.NodeDTO.builder()
                        .id(ant)
                        .data(Map.of("label", antVal, "type", antKey))
                        .position(Map.of("x", 80, "y", yPos))
                        .style(style)
                        .build());
            }

            count = 0;
            for (JsonNode rule : rulesNode) {
                if (count >= 15) break;
                String antStr = rule.path("antecedent").asText();
                String consNodeId = rule.path("consequent").asText().trim();
                double lift = rule.path("lift").asDouble();

                for (String antNodeId : antStr.split(",")) {
                    antNodeId = antNodeId.trim();
                    edgesList.add(GraphAnalyticsDTO.EdgeDTO.builder()
                            .id("edge-" + count + "-" + antNodeId + "-" + consNodeId)
                            .source(antNodeId)
                            .target(consNodeId)
                            .label("lift: " + String.format("%.2f", lift))
                            .style(Map.of("stroke", "#475569", "strokeWidth", Math.min(Math.max(lift * 1.5, 1), 6)))
                            .labelStyle(Map.of("fill", "#94a3b8", "fontSize", "9px", "fontWeight", "bold", "fillOpacity", 0.8))
                            .animated(lift > 1.3)
                            .build());
                }
                count++;
            }

            return GraphAnalyticsDTO.builder()
                    .scanId(scan.getId())
                    .generatedAt(generatedAt)
                    .nodes(new ArrayList<>(nodesMap.values()))
                    .edges(edgesList)
                    .build();

        } catch (Exception e) {
            log.error("Failed to generate graph analytics", e);
            return GraphAnalyticsDTO.builder().build();
        }
    }

    public HotspotAnalyticsDTO getHotspotAnalytics(Long scanId) {
        ScanHistory scan = getTargetScan(scanId);
        if (scan == null) return HotspotAnalyticsDTO.builder().build();

        String generatedAt = LocalDateTime.now().toString();

        try {
            JsonNode root = objectMapper.readTree(scan.getResultsJson());
            JsonNode risksNode = root.path("module_risk");

            List<HotspotAnalyticsDTO.HotspotDTO> hotspots = new ArrayList<>();

            for (JsonNode riskNode : risksNode) {
                String module = riskNode.path("module").asText();
                double riskScore = riskNode.path("risk_score").asDouble();
                String riskLevel = riskNode.path("risk_level").asText();
                JsonNode topRulesNode = riskNode.path("top_rules");

                double secStrength = 0.0;
                double perfStrength = 0.0;
                double integStrength = 0.0;
                double otherStrength = 0.0;
                
                Set<String> driversSet = new HashSet<>();
                double maxLift = 1.0;
                double maxConf = 0.0;

                List<Map<String, Object>> parsedRules = new ArrayList<>();
                if (topRulesNode.isArray()) {
                    for (JsonNode r : topRulesNode) {
                        Map<String, Object> ruleMap = new HashMap<>();
                        String ant = r.path("antecedent").asText("");
                        String cons = r.path("consequent").asText("");
                        double support = r.path("support").asDouble(0.0);
                        double confidence = r.path("confidence").asDouble(0.0);
                        double lift = r.path("lift").asDouble(0.0);

                        ruleMap.put("antecedent", ant);
                        ruleMap.put("consequent", cons);
                        ruleMap.put("support", support);
                        ruleMap.put("confidence", confidence);
                        ruleMap.put("lift", lift);
                        parsedRules.add(ruleMap);

                        double strength = support * confidence * lift;
                        maxLift = Math.max(maxLift, lift);
                        maxConf = Math.max(maxConf, confidence);

                        if (ant != null) {
                            for (String part : ant.split(",")) {
                                String[] kv = part.split("=");
                                if (kv.length == 2 && !kv[1].equalsIgnoreCase(module)) {
                                    driversSet.add(kv[1]);
                                }
                            }
                        }

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
                }

                double totalStrength = secStrength + perfStrength + integStrength + otherStrength;
                List<Map<String, Object>> contributions = new ArrayList<>();
                if (totalStrength > 0) {
                    contributions.add(Map.of("category", "Security Drivers", "percentage", Math.round((secStrength / totalStrength) * 100)));
                    contributions.add(Map.of("category", "Performance Drivers", "percentage", Math.round((perfStrength / totalStrength) * 100)));
                    contributions.add(Map.of("category", "Integration Drivers", "percentage", Math.round((integStrength / totalStrength) * 100)));
                    contributions.add(Map.of("category", "Other Drivers", "percentage", Math.round((otherStrength / totalStrength) * 100)));
                } else {
                    contributions.add(Map.of("category", "Security Drivers", "percentage", 25));
                    contributions.add(Map.of("category", "Performance Drivers", "percentage", 25));
                    contributions.add(Map.of("category", "Integration Drivers", "percentage", 25));
                    contributions.add(Map.of("category", "Other Drivers", "percentage", 25));
                }

                String dominantCategory = "Security";
                double maxStrength = secStrength;
                if (perfStrength > maxStrength) { dominantCategory = "Performance"; maxStrength = perfStrength; }
                if (integStrength > maxStrength) { dominantCategory = "Integration"; maxStrength = integStrength; }
                if (otherStrength > maxStrength) { dominantCategory = "Other"; }

                String driversText = driversSet.isEmpty() ? "general transaction context" : String.join(", ", driversSet);

                String explanation = String.format(
                    "%s classified %s. Primary drivers: %s. Top rule strength: Confidence %d%% | Lift %.1f. %s-related defect patterns dominate this module.",
                    module.toUpperCase(), riskLevel, driversText, (int) Math.round(maxConf * 100), maxLift, dominantCategory
                );

                // For the table views that just need a summary list of drivers
                Map<String, Integer> driverCounts = new HashMap<>();
                for (JsonNode r : topRulesNode) {
                    String cons = r.path("consequent").asText("");
                    for (String part : cons.split(",")) {
                        String[] kv = part.split("=");
                        String val = kv.length > 1 ? kv[1].trim() : part.trim();
                        if (!val.isEmpty()) {
                            driverCounts.put(val, driverCounts.getOrDefault(val, 0) + 1);
                        }
                    }
                }
                String driversSummaryStr = "None";
                if (!driverCounts.isEmpty()) {
                    List<Map.Entry<String, Integer>> sorted = new ArrayList<>(driverCounts.entrySet());
                    sorted.sort((a, b) -> b.getValue().compareTo(a.getValue()));
                    driversSummaryStr = sorted.stream().limit(3).map(Map.Entry::getKey).collect(Collectors.joining(" + "));
                }


                hotspots.add(HotspotAnalyticsDTO.HotspotDTO.builder()
                        .module(module)
                        .riskScore(riskScore)
                        .riskLevel(riskLevel)
                        .topRules(parsedRules)
                        .contributions(contributions)
                        .explanation(explanation)
                        .driversText(driversSummaryStr)
                        .build());
            }

            return HotspotAnalyticsDTO.builder()
                    .scanId(scan.getId())
                    .generatedAt(generatedAt)
                    .hotspots(hotspots)
                    .build();
        } catch (Exception e) {
            log.error("Failed to generate hotspot analytics", e);
            return HotspotAnalyticsDTO.builder().build();
        }
    }

    public ScanTimelineDTO compareScans(Long scanAId, Long scanBId) {
        String generatedAt = LocalDateTime.now().toString();

        ScanHistory scanA = scanHistoryRepository.findById(scanAId).orElse(null);
        ScanHistory scanB = scanHistoryRepository.findById(scanBId).orElse(null);

        if (scanA == null || scanB == null) {
            return ScanTimelineDTO.builder().build();
        }

        try {
            JsonNode rootA = objectMapper.readTree(scanA.getResultsJson());
            JsonNode rootB = objectMapper.readTree(scanB.getResultsJson());

            int runtimeDelta = (scanB.getRuntimeMs() != null ? scanB.getRuntimeMs() : 0) - (scanA.getRuntimeMs() != null ? scanA.getRuntimeMs() : 0);
            int rulesDelta = scanB.getRulesCount() - scanA.getRulesCount();

            JsonNode risksA = rootA.path("module_risk");
            JsonNode risksB = rootB.path("module_risk");

            Map<String, Double> riskMapA = new HashMap<>();
            if (risksA.isArray()) {
                for (JsonNode r : risksA) {
                    riskMapA.put(r.path("module").asText(), r.path("risk_score").asDouble());
                }
            }

            List<String> riskIncreased = new ArrayList<>();
            List<String> riskDecreased = new ArrayList<>();
            List<String> newHotspots = new ArrayList<>();
            Set<String> modulesB = new HashSet<>();

            if (risksB.isArray()) {
                for (JsonNode r : risksB) {
                    String mod = r.path("module").asText();
                    double scoreB = r.path("risk_score").asDouble();
                    modulesB.add(mod);

                    if (riskMapA.containsKey(mod)) {
                        double scoreA = riskMapA.get(mod);
                        double delta = scoreB - scoreA;
                        if (delta > 0.05) {
                            riskIncreased.add(String.format("%s (+%.2f)", mod, delta));
                        } else if (delta < -0.05) {
                            riskDecreased.add(String.format("%s (%.2f)", mod, delta));
                        }
                    } else {
                        newHotspots.add(String.format("%s (Score: %.2f)", mod, scoreB));
                    }
                }
            }

            List<String> removedHotspots = new ArrayList<>();
            for (String modA : riskMapA.keySet()) {
                if (!modulesB.contains(modA)) {
                    removedHotspots.add(modA);
                }
            }

            return ScanTimelineDTO.builder()
                    .scanId(scanB.getId()) // Representing the 'current' or 'new' state context
                    .generatedAt(generatedAt)
                    .scanAId(scanA.getId())
                    .scanBId(scanB.getId())
                    .runtimeDeltaMs(runtimeDelta)
                    .rulesDelta(rulesDelta)
                    .riskIncreased(riskIncreased)
                    .riskDecreased(riskDecreased)
                    .newHotspots(newHotspots)
                    .removedHotspots(removedHotspots)
                    .build();

        } catch (Exception e) {
            log.error("Failed to compare scans", e);
            return ScanTimelineDTO.builder().build();
        }
    }
}
