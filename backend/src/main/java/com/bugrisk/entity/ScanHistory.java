package com.bugrisk.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "scan_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScanHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String algorithm;

    @Column(name = "data_source", nullable = false)
    private String dataSource;

    @Column(name = "runtime_ms")
    private Integer runtimeMs;

    @Column(name = "rules_count")
    private Integer rulesCount;

    @Column(name = "results_json", columnDefinition = "TEXT")
    private String resultsJson;

    @Column(name = "dataset_rows")
    private Integer datasetRows;

    @Column(name = "support_threshold")
    private Double support;

    @Column(name = "confidence_threshold")
    private Double confidence;

    @Column(name = "lift_threshold")
    private Double liftThreshold;

    @Column(name = "top_hotspot")
    private String topHotspot;

    @Column(nullable = false)
    private String status;

    @Column(name = "error_reason", columnDefinition = "TEXT")
    private String errorReason;

    @Column(name = "dataset_hash")
    private String datasetHash;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }
}
