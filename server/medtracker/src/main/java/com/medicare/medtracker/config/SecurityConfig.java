package com.medicare.medtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disable CSRF for testing (safe for backend APIs)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // allow all requests without login
                )
                .httpBasic(Customizer.withDefaults()); // enable basic auth (not required here)
        return http.build();
    }
}
