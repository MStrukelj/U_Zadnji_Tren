package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Predavanje;
import com.uzadnjitren.eskolskakomunikacija.service.PredavanjeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predavanja")
@CrossOrigin(origins = { "http://localhost:5173", "https://frontend-latest-1126.onrender.com" }, allowCredentials = "true")
public class PredavanjeController {
    private final PredavanjeService predavanjeService;

    @Autowired
    public PredavanjeController(PredavanjeService predavanjeService) {
        this.predavanjeService = predavanjeService;
    }

    @GetMapping("/razred/{oznRaz}")
    public ResponseEntity<?> getRasporedByRazred(@PathVariable String oznRaz) {
        List<Predavanje> raspored = predavanjeService.findByRazred(oznRaz);
        return raspored.isEmpty() ?
            ResponseEntity.noContent().build() :
            ResponseEntity.ok(raspored);
    }
}