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
public class GraphAnalyticsDTO {
    private Long scanId;
    private String generatedAt;
    
    private List<NodeDTO> nodes;
    private List<EdgeDTO> edges;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NodeDTO {
        private String id;
        private Map<String, Object> data;
        private Map<String, Object> position;
        private Map<String, Object> style;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EdgeDTO {
        private String id;
        private String source;
        private String target;
        private String label;
        private Map<String, Object> style;
        private Map<String, Object> labelStyle;
        private boolean animated;
    }
}
