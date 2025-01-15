package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.service.ObavijestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/obavijesti")
public class ObavijestController {

    private final ObavijestService obavijestService;

    @Autowired
    public ObavijestController(ObavijestService obavijestService) {
        this.obavijestService = obavijestService;
    }

    @PostMapping("/posalji")
    public ResponseEntity<?> posaljiObavijest(@RequestBody ObavijestRequest obavijestRequest) {
        try {
            obavijestService.posaljiObavijest(
                    obavijestRequest.getNaslov(),
                    obavijestRequest.getTekst(),
                    obavijestRequest.getSifrePredmeta()
            );
            return ResponseEntity.ok("Obavijest uspješno poslana učenicima.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Greška: " + e.getMessage());
        }
    }
}

