package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Login;
import com.uzadnjitren.eskolskakomunikacija.service.LoginService;
import com.uzadnjitren.eskolskakomunikacija.exception.InvalidLoginException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    /**
     * DTO (Data Transfer Object) za login zahtjev
     */
    public static class LoginRequest {
        private String email;
        private String lozinka;

        // Getteri i setteri
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getLozinka() { return lozinka; }
        public void setLozinka(String lozinka) { this.lozinka = lozinka; }
    }

    /**
     * Endpoint za prijavu korisnika
     * 
     * @param loginRequest DTO koji sadrži podatke za prijavu
     * @param session HTTP sesija
     * @return ResponseEntity s podacima o uspješnosti prijave
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
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

            return ResponseEntity.ok(response);

        } catch (InvalidLoginException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Došlo je do greške prilikom prijave");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Endpoint za odjavu korisnika
     * 
     * @param session HTTP sesija
     * @return ResponseEntity s potvrdom odjave
     */
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

    /**
     * Endpoint za provjeru trenutnog stanja sesije
     * 
     * @param session HTTP sesija
     * @return ResponseEntity s informacijom o trenutnoj sesiji
     */
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
                    "message", "Sesija je istekla"
                ));
            }
        }
        return ResponseEntity.ok(Map.of(
            "success", false,
            "message", "Nema aktivne sesije"
        ));
    }

    /**
     * Pomoćna metoda za kreiranje odgovora s podacima o korisniku
     * 
     * @param user Login objekt
     * @return Map s relevantnim podacima o korisniku
     */
    private Map<String, Object> createUserResponse(Login user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("email", user.getEmail());
        userResponse.put("uloga1", user.getUloga1());
        userResponse.put("uloga2", user.getUloga2());
        userResponse.put("isStudent", loginService.isStudent(user));
        userResponse.put("isTeacher", loginService.isTeacher(user));
        userResponse.put("isAdmin", loginService.isAdmin(user));
        return userResponse;
    }
}
