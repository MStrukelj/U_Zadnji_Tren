package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.service.UcenikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ucenici")
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
}

