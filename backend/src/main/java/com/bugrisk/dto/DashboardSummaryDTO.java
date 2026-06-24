package com.bugrisk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDTO {
    private Long scanId;
    private String generatedAt;
    
    // Scan stats
    private Integer runtimeMs;
    private Integer datasetRows;
    private String algorithm;
    private String dataSource;
    private String timestamp;
    
    // Rule stats
    private Integer totalRules;
    private Double avgLift;
    private Double avgConfidence;
    private Double avgSupport;
    private Double maxLift;
    
    // Top Hotspot
    private String topModule;
    private Double topModuleRiskScore;
    
    // Distributions
    private Map<String, Integer> riskLevelCounts;
    private Map<String, Integer> rulesByModule;
}
