package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.service.NastavnikService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/nastavnik")
public class NastavnikController {
    private final NastavnikService nastavnikService;

    public NastavnikController(NastavnikService nastavnikService) {
        this.nastavnikService = nastavnikService;
    }

    // Endpoint za dobivanje sifre nastavnika iz njegovog emaila
    @GetMapping("/{email}")
    public ResponseEntity<?> getSifNast(@PathVariable String email) {
        Integer sifNast = nastavnikService.getSifNast(email);
        return sifNast != null ? ResponseEntity.ok().body(sifNast) : ResponseEntity.notFound().build();
    }

    // Endpoint za dohvaćanje predmeta koje predaje nastavnik
    @GetMapping("/{sifNast}/predmeti")
    public ResponseEntity<List<Predmet>> getPredmetiByNastavnik(@PathVariable Integer sifNast) {
        List<Predmet> predmeti = nastavnikService.findPredmetiByNastavnikId(sifNast);
        return predmeti.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(predmeti);
    }
}
