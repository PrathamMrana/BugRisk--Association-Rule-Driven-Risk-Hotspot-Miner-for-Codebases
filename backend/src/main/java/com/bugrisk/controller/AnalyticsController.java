package com.bugrisk.controller;

import com.bugrisk.dto.*;
import com.bugrisk.service.AnalyticsAggregationService;
import com.bugrisk.service.MlGatewayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/analytics")
@CrossOrigin(originPatterns = "*")
@Slf4j
public class AnalyticsController {

    private final MlGatewayService mlGatewayService;
    private final AnalyticsAggregationService aggregationService;

    @Autowired
    public AnalyticsController(MlGatewayService mlGatewayService,
                               AnalyticsAggregationService aggregationService) {
        this.mlGatewayService = mlGatewayService;
        this.aggregationService = aggregationService;
    }

    @GetMapping(value = "/summary", produces = "application/json")
    public ResponseEntity<DashboardSummaryDTO> getAnalyticsSummary(@RequestParam(required = false) Long scanId) {
        log.info("Fetching ML analytics summary (scanId={})...", scanId);
        return ResponseEntity.ok(aggregationService.getDashboardSummary(scanId));
    }

    @GetMapping(value = "/severities", produces = "application/json")
    public ResponseEntity<SeverityAnalyticsDTO> getSeverities(@RequestParam(required = false) Long scanId) {
        log.info("Fetching severity analytics (scanId={})...", scanId);
        return ResponseEntity.ok(aggregationService.getSeverityAnalytics(scanId));
    }

    @GetMapping(value = "/graph", produces = "application/json")
    public ResponseEntity<GraphAnalyticsDTO> getGraph(@RequestParam(required = false) Long scanId) {
        log.info("Fetching graph analytics (scanId={})...", scanId);
        return ResponseEntity.ok(aggregationService.getGraphAnalytics(scanId));
    }

    @GetMapping(value = "/hotspots", produces = "application/json")
    public ResponseEntity<HotspotAnalyticsDTO> getHotspots(@RequestParam(required = false) Long scanId) {
        log.info("Fetching hotspot analytics (scanId={})...", scanId);
        return ResponseEntity.ok(aggregationService.getHotspotAnalytics(scanId));
    }

    @GetMapping(value = "/timeline/compare", produces = "application/json")
    public ResponseEntity<ScanTimelineDTO> compareTimeline(
            @RequestParam Long scanA,
            @RequestParam Long scanB) {
        log.info("Comparing timeline metrics for scans {} and {}...", scanA, scanB);
        return ResponseEntity.ok(aggregationService.compareScans(scanA, scanB));
    }

    @GetMapping("/sample-data/download")
    public Mono<ResponseEntity<byte[]>> downloadSampleCsv() {
        log.info("Proxying sample CSV download from ml-service...");
        return mlGatewayService.getSampleCsv()
                .map(bytes -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=bugrisk_sample_data.csv")
                        .contentType(MediaType.parseMediaType("text/csv"))
                        .body(bytes));
    }

    @PostMapping(value = "/dataset-profile", produces = "application/json")
    public Mono<String> getDatasetProfile(@RequestParam(value = "source", defaultValue = "synthetic") String source) {
        log.info("Generating dataset intelligence profile for source: {}", source);
        return mlGatewayService.forwardDatasetProfile(source);
    }
}
