package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.repository.PredmetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/predmeti")
public class PredmetController {

    @Autowired
    private PredmetRepository predmetRepository;

    @GetMapping
    public ResponseEntity<List<Predmet>> getAllPredmeti() {
        List<Predmet> predmeti = predmetRepository.findAll();
        return ResponseEntity.ok(predmeti);
    }
}
