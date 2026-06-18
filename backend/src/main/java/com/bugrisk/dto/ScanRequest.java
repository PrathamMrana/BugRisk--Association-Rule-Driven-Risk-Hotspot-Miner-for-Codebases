package com.bugrisk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScanRequest {
    private Integer rows;
    private Integer seed;
    private String algorithm;
    private Double support;
    private Double confidence;
    private Double lift;
    
    @Builder.Default
    private String dataSource = "synthetic";
}
