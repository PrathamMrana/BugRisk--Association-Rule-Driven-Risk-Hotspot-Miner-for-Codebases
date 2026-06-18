package com.bugrisk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RuleDto {
    private String antecedent;
    private String consequent;
    private Double support;
    private Double confidence;
    private Double lift;
}
