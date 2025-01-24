package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.*;
import com.uzadnjitren.eskolskakomunikacija.service.LoginService;
import com.uzadnjitren.eskolskakomunikacija.service.KorisnikService;
import com.uzadnjitren.eskolskakomunikacija.service.NastavnikService;
import com.uzadnjitren.eskolskakomunikacija.service.UcenikService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/oauth")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173", "https://frontend-latest-1126.onrender.com" }, allowCredentials = "true")
public class GoogleOAuthController {
    private static final Logger logger = LoggerFactory.getLogger(GoogleOAuthController.class);

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    private final LoginService loginService;
    private final KorisnikService korisnikService;
    private final UcenikService ucenikService;
    private final NastavnikService nastavnikService;

    @Autowired
    public GoogleOAuthController(LoginService loginService, KorisnikService korisnikService,
                               UcenikService ucenikService, NastavnikService nastavnikService) {
        this.loginService = loginService;
        this.korisnikService = korisnikService;
        this.ucenikService = ucenikService;
        this.nastavnikService = nastavnikService;
    }

    @GetMapping("/google")
    public ResponseEntity<Map<String, String>> getGoogleAuthUrl() {
        logger.info("Generating Google Auth URL with clientId: {} and redirectUri: {}", clientId, redirectUri);
        String googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
            "client_id=" + clientId +
            "&redirect_uri=" + encodeURIComponent(redirectUri) +
            "&response_type=code" +
            "&scope=email%20profile" +
            "&access_type=offline";

        Map<String, String> response = new HashMap<>();
        response.put("url", googleAuthUrl);
        logger.info("Generated auth URL: {}", googleAuthUrl);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestBody Map<String, String> body, HttpSession session) {
        String code = body.get("code");
        if (code == null) {
            logger.error("No code provided in callback");
            return ResponseEntity.badRequest().body(Map.of("error", "No code provided"));
        }

        try {
            logger.info("Processing OAuth callback with code: {}", code);

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
            logger.info("Requesting access token from Google");

            Map<String, Object> tokenResponse = restTemplate.postForObject(
                tokenUrl,
                request,
                Map.class
            );

            if (tokenResponse != null && tokenResponse.get("access_token") != null) {
                String accessToken = (String) tokenResponse.get("access_token");
                logger.info("Received access token from Google");

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

                logger.info("Received user info from Google: {}", userInfo);

                if (userInfo != null && userInfo.get("email") != null) {
                    String email = (String) userInfo.get("email");
                    logger.info("Looking up user in local database with email: {}", email);

                    Optional<Login> localUser = loginService.findByEmail(email);
                    if (localUser.isPresent()) {
                        Login user = localUser.get();
                        logger.info("Found local user: {}", user.getEmail());

                        session.setAttribute("user", user);
                        session.setAttribute("email", user.getEmail());

                        if (loginService.isStudent(user)) {
                            Integer jmbag = loginService.getJmbagByEmail(user.getEmail());
                            session.setAttribute("jmbag", jmbag);
                            logger.info("User is a student with JMBAG: {}", jmbag);
                        }

                        if (loginService.isTeacher(user)) {
                            Integer sifNast = nastavnikService.getSifNast(user.getEmail());
                            if (sifNast != null) {
                                session.setAttribute("sifNast", sifNast);
                                logger.info("User is a teacher with sifNast: {}", sifNast);
                            }
                        }

                        Map<String, Object> response = new HashMap<>();
                        response.put("success", true);
                        response.put("message", "Uspješna prijava");
                        Map<String, Object> userResponse = createUserResponse(user);
                        response.put("user", userResponse);

                        logger.info("Sending successful response with user data: {}", userResponse);
                        return ResponseEntity.ok(response);
                    } else {
                        logger.error("No local user found for email: {}", email);
                        return ResponseEntity.badRequest().body(Map.of(
                            "success", false,
                            "message", "Korisnik s ovim email-om nije registriran u sustavu"
                        ));
                    }
                }
            }

            logger.error("Failed to get tokens from Google");
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to get tokens"));
        } catch (Exception e) {
            logger.error("Error in OAuth callback: ", e);
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private Map<String, Object> createUserResponse(Login user) {
        Map<String, Object> userResponse = new HashMap<>();
        try {
            userResponse.put("email", user.getEmail());
            userResponse.put("uloga1", user.getUloga1());
            userResponse.put("uloga2", user.getUloga2());
            userResponse.put("isStudent", loginService.isStudent(user));
            userResponse.put("isTeacher", loginService.isTeacher(user));
            userResponse.put("isAdmin", loginService.isAdmin(user));

            Optional<Korisnik> korisnik = korisnikService.findByEmail(user.getEmail());
            if (korisnik.isPresent()) {
                userResponse.put("ime", korisnik.get().getIme());
                userResponse.put("prezime", korisnik.get().getPrezime());

                if (loginService.isStudent(user)) {
                    Optional<Ucenik> ucenik = ucenikService.findByEmail(user.getEmail());
                    ucenik.ifPresent(u -> {
                        userResponse.put("JMBAG", u.getJMBAG());
                        logger.info("Added student JMBAG to response: {}", u.getJMBAG());

                        Optional<Razred> razred = ucenikService.findRazredByJmbag(u.getJMBAG());
                        razred.ifPresent(r -> {
                            userResponse.put("razred", r.getOznRaz());
                            logger.info("Added student razred to response: {}", r.getOznRaz());
                        });
                    });
                }

                if (loginService.isTeacher(user)) {
                    Integer sifNast = nastavnikService.getSifNast(user.getEmail());
                    if (sifNast != null) {
                        userResponse.put("sifNast", sifNast);
                        logger.info("Added teacher sifNast to response: {}", sifNast);
                    }
                }
            }
            logger.info("Created complete user response: {}", userResponse);
        } catch (Exception e) {
            logger.error("Error creating user response: ", e);
        }

        return userResponse;
    }

    private String encodeURIComponent(String value) {
        try {
            return java.net.URLEncoder.encode(value, "UTF-8");
        } catch (java.io.UnsupportedEncodingException e) {
            return value;
        }
    }
}
