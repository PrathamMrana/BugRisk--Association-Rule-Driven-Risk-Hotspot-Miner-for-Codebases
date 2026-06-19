package com.bugrisk.controller;

import com.bugrisk.dto.AuthResponse;
import com.bugrisk.dto.LoginRequest;
import com.bugrisk.dto.RegisterRequest;
import com.bugrisk.entity.AuditLog;
import com.bugrisk.entity.User;
import com.bugrisk.repository.AuditLogRepository;
import com.bugrisk.repository.UserRepository;
import com.bugrisk.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(originPatterns = "*")
@Slf4j
public class AuthController {

    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(
            UserRepository userRepository,
            AuditLogRepository auditLogRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        log.info("Received request to register user: {}", request.getUsername());

        if (userRepository.existsByUsername(request.getUsername())) {
            log.warn("Username already taken: {}", request.getUsername());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Email already registered: {}", request.getEmail());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered.");
        }

        String role = request.getRole() != null ? request.getRole().toUpperCase() : "ENGINEER";
        if (!role.equals("ADMIN") && !role.equals("ENGINEER")) {
            role = "ENGINEER"; // Fallback to safe role
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
        log.info("User registered successfully: username={}, role={}", user.getUsername(), user.getRole());

        auditLogRepository.save(AuditLog.builder()
                .username(request.getUsername())
                .action("REGISTER")
                .status("SUCCESS")
                .timestamp(LocalDateTime.now())
                .build());

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
        log.info("Received request to login user: {}", request.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.createToken(authentication);
            String role = tokenProvider.getRole(token);

            auditLogRepository.save(AuditLog.builder()
                    .username(request.getUsername())
                    .action("LOGIN")
                    .status("SUCCESS")
                    .timestamp(LocalDateTime.now())
                    .build());

            log.info("User logged in successfully: {}", request.getUsername());
            return ResponseEntity.ok(AuthResponse.builder()
                    .token(token)
                    .username(request.getUsername())
                    .role(role)
                    .build());

        } catch (Exception e) {
            log.error("Authentication failed for user: {}. Error: {}", request.getUsername(), e.getMessage());

            auditLogRepository.save(AuditLog.builder()
                    .username(request.getUsername())
                    .action("LOGIN")
                    .status("FAILED")
                    .timestamp(LocalDateTime.now())
                    .build());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }
}
