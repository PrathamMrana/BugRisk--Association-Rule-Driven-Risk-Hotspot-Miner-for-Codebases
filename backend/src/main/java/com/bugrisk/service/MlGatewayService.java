package com.bugrisk.service;

import com.bugrisk.dto.ScanRequest;
import com.bugrisk.dto.ScanResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MlGatewayService {

    private final WebClient mlWebClient;

    @Autowired
    public MlGatewayService(WebClient mlWebClient) {
        this.mlWebClient = mlWebClient;
    }

    /**
     * Call the ML service run endpoint to perform rules mining and risk scoring.
     */
    public Mono<ScanResponse> triggerScan(ScanRequest request) {
        String correlationId = getCorrelationId();
        return mlWebClient.post()
                .uri("/api/v1/ml/run")
                .header("X-Request-Id", correlationId)
                .bodyValue(request != null ? request : ScanRequest.builder().build())
                .retrieve()
                .bodyToMono(ScanResponse.class);
    }

    /**
     * Forwards dataset upload multipart file to ML service.
     */
    public Mono<String> forwardUpload(org.springframework.web.multipart.MultipartFile file) {
        String correlationId = getCorrelationId();
        org.springframework.util.MultiValueMap<String, Object> body = new org.springframework.util.LinkedMultiValueMap<>();
        try {
            final String originalFilename = file.getOriginalFilename();
            org.springframework.core.io.ByteArrayResource resource = new org.springframework.core.io.ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return originalFilename;
                }
            };
            body.add("file", resource);
        } catch (java.io.IOException e) {
            return Mono.error(e);
        }
        
        return mlWebClient.post()
                .uri("/api/v1/ml/upload")
                .header("X-Request-Id", correlationId)
                .contentType(org.springframework.http.MediaType.MULTIPART_FORM_DATA)
                .body(org.springframework.web.reactive.function.BodyInserters.fromMultipartData(body))
                .retrieve()
                .bodyToMono(String.class);
    }

    /**
     * Performs comparative FP-Growth vs Apriori benchmarking.
     */
    public Mono<String> comparePlayground(ScanRequest request) {
        String correlationId = getCorrelationId();
        return mlWebClient.post()
                .uri("/api/v1/ml/playground/compare")
                .header("X-Request-Id", correlationId)
                .bodyValue(request != null ? request : ScanRequest.builder().build())
                .retrieve()
                .bodyToMono(String.class);
    }

    /**
     * Subscribes to SSE stream from FastAPI.
     */
    public reactor.core.publisher.Flux<org.springframework.http.codec.ServerSentEvent<String>> streamScan(ScanRequest request) {
        String correlationId = getCorrelationId();
        ScanRequest req = request != null ? request : ScanRequest.builder().build();
        
        org.springframework.web.util.UriComponentsBuilder builder = org.springframework.web.util.UriComponentsBuilder.fromPath("/api/v1/ml/stream");
        if (req.getRows() != null) builder.queryParam("rows", req.getRows());
        if (req.getSeed() != null) builder.queryParam("seed", req.getSeed());
        if (req.getAlgorithm() != null) builder.queryParam("algorithm", req.getAlgorithm());
        if (req.getSupport() != null) builder.queryParam("support", req.getSupport());
        if (req.getConfidence() != null) builder.queryParam("confidence", req.getConfidence());
        if (req.getLift() != null) builder.queryParam("lift", req.getLift());
        if (req.getDataSource() != null) builder.queryParam("dataSource", req.getDataSource());
        
        String uri = builder.build().toUriString();

        return mlWebClient.get()
                .uri(uri)
                .header("X-Request-Id", correlationId)
                .accept(org.springframework.http.MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(new org.springframework.core.ParameterizedTypeReference<org.springframework.http.codec.ServerSentEvent<String>>() {});
    }

    /**
     * Fetches aggregated analytics summary from the ML service.
     */
    public Mono<String> getAnalyticsSummary() {
        String correlationId = getCorrelationId();
        return mlWebClient.get()
                .uri("/api/v1/ml/analytics/summary")
                .header("X-Request-Id", correlationId)
                .retrieve()
                .bodyToMono(String.class);
    }

    /**
     * Proxies the sample CSV download from the ML service.
     */
    public Mono<byte[]> getSampleCsv() {
        String correlationId = getCorrelationId();
        return mlWebClient.get()
                .uri("/api/v1/ml/sample-data/download")
                .header("X-Request-Id", correlationId)
                .retrieve()
                .bodyToMono(byte[].class);
    }

    /**
     * Retrieves dataset intelligence profile from the ML service.
     */
    public Mono<String> forwardDatasetProfile(String source) {
        String correlationId = getCorrelationId();
        return mlWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/v1/ml/dataset-profile")
                        .queryParam("source", source != null ? source : "synthetic")
                        .build())
                .header("X-Request-Id", correlationId)
                .retrieve()
                .bodyToMono(String.class);
    }

    private String getCorrelationId() {
        try {
            org.springframework.web.context.request.ServletRequestAttributes attrs =
                (org.springframework.web.context.request.ServletRequestAttributes) 
                org.springframework.web.context.request.RequestContextHolder.getRequestAttributes();
            if (attrs != null) {
                Object value = attrs.getRequest().getAttribute("X-Request-Id");
                if (value != null) {
                    return value.toString();
                }
            }
        } catch (Exception ignored) {
        }
        return "REQ-SYSTEM-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
