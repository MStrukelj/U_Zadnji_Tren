package com.uzadnjitren.eskolskakomunikacija.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/oauth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class GoogleOAuthController {
    
    private final String clientId = "401923248656-a1rtvefu1e506923r7kjvfmqnq1a84i6.apps.googleusercontent.com";
    private final String clientSecret = "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";
    private final String redirectUri = "http://localhost:5173/oauth/callback";

    @GetMapping("/google")
    public ResponseEntity<Map<String, String>> getGoogleAuthUrl() {
        String googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "client_id=" + clientId +
            "&redirect_uri=" + encodeURIComponent(redirectUri) +
            "&response_type=code" +
            "&scope=email%20profile" +
            "&access_type=offline";
        
        Map<String, String> response = new HashMap<>();
        response.put("url", googleAuthUrl);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        if (code == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No code provided"));
        }

        try {
            // Exchange code for tokens
            RestTemplate restTemplate = new RestTemplate();
            String tokenUrl = "https://oauth2.googleapis.com/token";
            
            Map<String, String> tokenRequest = new HashMap<>();
            tokenRequest.put("client_id", clientId);
            tokenRequest.put("client_secret", clientSecret);
            tokenRequest.put("code", code);
            tokenRequest.put("redirect_uri", redirectUri);
            tokenRequest.put("grant_type", "authorization_code");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(tokenRequest, headers);
            
            Map<String, Object> tokenResponse = restTemplate.postForObject(
                tokenUrl, 
                request, 
                Map.class
            );

            if (tokenResponse != null && tokenResponse.get("access_token") != null) {
                // Get user info using access token
                String accessToken = (String) tokenResponse.get("access_token");
                String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
                
                HttpHeaders userInfoHeaders = new HttpHeaders();
                userInfoHeaders.setBearerAuth(accessToken);
                HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);
                
                Map<String, Object> userInfo = restTemplate.exchange(
                    userInfoUrl,
                    org.springframework.http.HttpMethod.GET,
                    userInfoRequest,
                    Map.class
                ).getBody();

                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "userInfo", userInfo
                ));
            }

            return ResponseEntity.badRequest().body(Map.of("error", "Failed to get tokens"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private String encodeURIComponent(String value) {
        try {
            return java.net.URLEncoder.encode(value, "UTF-8");
        } catch (java.io.UnsupportedEncodingException e) {
            return value;
        }
    }
}
