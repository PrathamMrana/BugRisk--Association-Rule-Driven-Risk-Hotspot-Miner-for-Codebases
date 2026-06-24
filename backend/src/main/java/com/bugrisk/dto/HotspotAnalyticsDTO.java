package com.bugrisk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotspotAnalyticsDTO {
    private Long scanId;
    private String generatedAt;
    
    private List<HotspotDTO> hotspots;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HotspotDTO {
        private String module;
        private Double riskScore;
        private String riskLevel;
        private List<Map<String, Object>> topRules;
        private List<Map<String, Object>> contributions;
        private String explanation;
        private String driversText;
    }
}
