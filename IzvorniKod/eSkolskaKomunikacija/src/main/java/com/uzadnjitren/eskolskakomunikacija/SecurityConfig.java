package com.uzadnjitren.eskolskakomunikacija;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Omogucava pristup svim endpoint-ima bez autentifikacije
        // NIJE ZA PRODUKCIJU!!
        http.authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll())
                .csrf().disable();

        return http.build();
    }
}

