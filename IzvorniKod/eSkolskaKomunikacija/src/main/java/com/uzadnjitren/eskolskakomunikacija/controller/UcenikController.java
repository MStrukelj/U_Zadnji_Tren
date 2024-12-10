package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.service.UcenikService;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ucenici")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UcenikController {
    // Injecta UcenikService koristeci konstruktor
    private final UcenikService ucenikService;

    @Autowired
    public UcenikController(UcenikService ucenikService) {
        this.ucenikService = ucenikService;
    }

    // Endpoint za dobavljanje predmeta po JMBAG-u ucenika
    @GetMapping("/{jmbag}/predmeti")
    public ResponseEntity<List<Predmet>> getPredmetiByUcenik(@PathVariable Integer jmbag) {
        // Dobavljaju se predmeti pomocu UcenikService-a i vraca se odgovarajuci HTTP odgovor
        List<Predmet> predmeti = ucenikService.findPredmetiByUcenik(jmbag);
        return predmeti.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(predmeti);
    }

    // Endpoint za dobavljanje predmeta prijavljenog ucenika koristeci session
    @GetMapping("/predmeti")
    public ResponseEntity<?> getPredmetiForLoggedUcenik(HttpSession session) {
        // Dohvaca JMBAG ucenika iz sessiona
        Integer jmbag = (Integer) session.getAttribute("jmbag");

        if (jmbag == null) {
            return ResponseEntity.status(403).body("Korisnik nije prijavljen ili nema JMBAG.");
        }

        // Dobavljaju se predmeti pomocu UcenikService-a i vraca se odgovarajuci HTTP odgovor
        List<Predmet> predmeti = ucenikService.findPredmetiByUcenik(jmbag);
        return predmeti.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(predmeti);
    }
}

