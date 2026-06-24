package com.bugrisk.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/status")
@CrossOrigin(originPatterns = "*")
public class StatusController {

    @Value("${ml.service.url}")
    private String mlServiceUrl;

    @GetMapping
    public ResponseEntity<Map<String, String>> getSystemStatus() {
        Map<String, String> status = new HashMap<>();
        status.put("backend", "Online");
        
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(mlServiceUrl + "/docs", String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                status.put("mlService", "Online");
            } else {
                status.put("mlService", "Degraded");
            }
        } catch (Exception e) {
            status.put("mlService", "Warming Up");
        }

        return ResponseEntity.ok(status);
    }
}
