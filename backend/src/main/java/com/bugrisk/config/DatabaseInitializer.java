package com.bugrisk.config;

import com.bugrisk.entity.User;
import com.bugrisk.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            log.info("Database users table is empty. Initializing default platform users...");

            User admin = User.builder()
                    .username("admin")
                    .email("admin@bugrisk.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .build();

            User engineer = User.builder()
                    .username("engineer")
                    .email("engineer@bugrisk.com")
                    .passwordHash(passwordEncoder.encode("engineer123"))
                    .role("ENGINEER")
                    .build();

            userRepository.save(admin);
            userRepository.save(engineer);

            log.info("Default users created: username='admin' (role=ADMIN, password='admin123') and username='engineer' (role=ENGINEER, password='engineer123')");
        }
    }
}
