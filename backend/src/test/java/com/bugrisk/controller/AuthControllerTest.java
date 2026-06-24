package com.bugrisk.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.bugrisk.security.JwtTokenProvider;
import com.bugrisk.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AuthControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        com.bugrisk.repository.UserRepository userRepository = Mockito.mock(com.bugrisk.repository.UserRepository.class);
        com.bugrisk.repository.AuditLogRepository auditLogRepository = Mockito.mock(com.bugrisk.repository.AuditLogRepository.class);
        PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
        AuthenticationManager authManager = Mockito.mock(AuthenticationManager.class);
        JwtTokenProvider jwtTokenProvider = Mockito.mock(JwtTokenProvider.class);

        AuthController authController = new AuthController(userRepository, auditLogRepository, passwordEncoder, authManager, jwtTokenProvider);
        this.mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    public void testLoginWithEmptyBody() throws Exception {
        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isOk());
    }
}
