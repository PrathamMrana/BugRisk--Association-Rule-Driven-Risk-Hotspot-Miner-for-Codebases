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
public class SeverityAnalyticsDTO {
    private Long scanId;
    private String generatedAt;
    
    private Map<String, Integer> severityDistribution;
    private Map<String, Integer> bugTypeDistribution;
    private Map<String, Integer> moduleFrequency;
}
