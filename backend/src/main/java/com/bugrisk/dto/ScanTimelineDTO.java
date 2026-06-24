package com.bugrisk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScanTimelineDTO {
    private Long scanId;
    private String generatedAt;
    
    private Long scanAId;
    private Long scanBId;
    
    private Integer runtimeDeltaMs;
    private Integer rulesDelta;
    
    private List<String> riskIncreased;
    private List<String> riskDecreased;
    private List<String> newHotspots;
    private List<String> removedHotspots;
}
