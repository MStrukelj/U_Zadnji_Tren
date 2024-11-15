package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import com.uzadnjitren.eskolskakomunikacija.model.Login;
import com.uzadnjitren.eskolskakomunikacija.model.Razred;
import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import com.uzadnjitren.eskolskakomunikacija.service.LoginService;
import com.uzadnjitren.eskolskakomunikacija.service.KorisnikService;
import com.uzadnjitren.eskolskakomunikacija.service.UcenikService;
import com.uzadnjitren.eskolskakomunikacija.exception.InvalidLoginException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LoginController {

    private final LoginService loginService;
    private final KorisnikService korisnikService;
    private final UcenikService ucenikService;

    @Autowired
    public LoginController(LoginService loginService, KorisnikService korisnikService, UcenikService ucenikService) {
        this.loginService = loginService;
        this.korisnikService = korisnikService;
        this.ucenikService = ucenikService;
    }

    public static class LoginRequest {
        private String email;
        private String lozinka;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getLozinka() {
            return lozinka;
        }

        public void setLozinka(String lozinka) {
            this.lozinka = lozinka;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        System.out.println("Received login request for email: " + loginRequest.getEmail());
        try {
            Login user = loginService.authenticate(loginRequest.getEmail(), loginRequest.getLozinka());

            // Spremanje podataka u sesiju
            session.setAttribute("user", user);
            session.setAttribute("email", user.getEmail());

            // Ako je user ucenik, pohrani njegov JMBAG u sesion
            if (loginService.isStudent(user)) {
                Integer jmbag = loginService.getJmbagByEmail(user.getEmail());
                session.setAttribute("jmbag", jmbag);
            }

            // Priprema odgovora
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Uspješna prijava");
            response.put("user", createUserResponse(user));

            System.out.println("Login successful for user: " + user.getEmail());
            return ResponseEntity.ok(response);

        } catch (InvalidLoginException e) {
            System.out.println("Login failed: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            System.out.println("Unexpected error during login: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Došlo je do greške prilikom prijave");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        try {
            session.invalidate();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Uspješna odjava");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Greška prilikom odjave");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String userEmail = (String) session.getAttribute("email");
        if (userEmail != null) {
            try {
                Login user = loginService.findByEmail(userEmail)
                        .orElseThrow(() -> new InvalidLoginException("Korisnik nije pronađen"));

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("user", createUserResponse(user));
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                session.invalidate();
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "Sesija je istekla"));
            }
        }
        return ResponseEntity.ok(Map.of(
                "success", false,
                "message", "Nema aktivne sesije"));
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

                        Optional<Razred> razred = ucenikService.findRazredByJmbag(u.getJMBAG());
                        razred.ifPresent(r -> {
                            userResponse.put("razred", r.getOznRaz());
                            System.out.println("Found razred: " + r.getOznRaz());
                        });
                    });
                }
            }

            System.out.println("Created user response: " + userResponse);
        } catch (Exception e) {
            System.err.println("Error creating user response: " + e.getMessage());
            e.printStackTrace();
        }

        return userResponse;
    }
}
