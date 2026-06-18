package com.bugrisk.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScanResponse {
    private String status;

    @JsonProperty("rules_count")
    private Integer rulesCount;

    @JsonProperty("modules_count")
    private Integer modulesCount;

    @JsonProperty("runtime_ms")
    private Integer runtimeMs;

    private List<RuleDto> rules;

    @JsonProperty("module_risk")
    private List<ModuleRiskDto> moduleRisk;

    @JsonProperty("dataset_hash")
    private String datasetHash;

    @JsonProperty("dataset_rows")
    private Integer datasetRows;

    @JsonProperty("dataset_columns")
    private Integer datasetColumns;
}
