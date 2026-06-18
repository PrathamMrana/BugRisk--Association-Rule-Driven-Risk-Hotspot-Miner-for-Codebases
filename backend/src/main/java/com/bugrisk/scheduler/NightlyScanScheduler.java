package com.bugrisk.scheduler;

import com.bugrisk.dto.ScanRequest;
import com.bugrisk.service.ScanOrchestratorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NightlyScanScheduler {

    private final ScanOrchestratorService scanOrchestratorService;

    @Autowired
    public NightlyScanScheduler(ScanOrchestratorService scanOrchestratorService) {
        this.scanOrchestratorService = scanOrchestratorService;
    }

    /**
     * Scheduled automated baseline defect scan task.
     * Defaults to run every night at 1:00 AM.
     */
    @Scheduled(cron = "${scan.scheduler.cron:0 0 1 * * ?}")
    public void performScheduledScan() {
        log.info("Scheduled task triggered: starting automated baseline defect analysis scan...");
        try {
            ScanRequest baselineRequest = ScanRequest.builder()
                    .rows(2500)
                    .seed(42)
                    .algorithm("fpgrowth")
                    .support(0.03)
                    .confidence(0.50)
                    .lift(1.2)
                    .build();
            
            scanOrchestratorService.executeScan(baselineRequest);
            log.info("Automated scheduled baseline defect scan successfully completed.");
        } catch (Exception e) {
            log.error("Scheduled defect scan automation failed: {}", e.getMessage(), e);
        }
    }
}
