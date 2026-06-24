package com.bugrisk.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.bugrisk.security.JwtTokenProvider;
import com.bugrisk.security.JwtAuthenticationFilter;
import com.bugrisk.security.CustomUserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class StatusControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        StatusController statusController = new StatusController();
        // Since mlServiceUrl is injected via @Value, we set it manually via reflection or a setter
        org.springframework.test.util.ReflectionTestUtils.setField(statusController, "mlServiceUrl", "http://localhost:8000");
        this.mockMvc = MockMvcBuilders.standaloneSetup(statusController).build();
    }

    @Test
    public void testGetSystemStatus() throws Exception {
        mockMvc.perform(get("/api/v1/status").accept(org.springframework.http.MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.backend").value("Online"))
                .andExpect(jsonPath("$.mlService").exists());
    }
}
