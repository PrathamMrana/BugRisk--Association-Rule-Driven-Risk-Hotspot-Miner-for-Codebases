package com.bugrisk.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${ml.service.url:http://127.0.0.1:8000}")
    private String mlServiceUrl;

    @Bean
    public WebClient mlWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl(mlServiceUrl)
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)) // 10MB Buffer for rules payload
                .build();
    }
}
