package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.service.MaterijalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/predmeti")
public class MaterijalController {

    private final MaterijalService materijalService;

    // Konstruktor za automatsko umetanje (Autowired) servisa MaterijalService
    @Autowired
    public MaterijalController(MaterijalService materijalService) {
        this.materijalService = materijalService;
    }

    // Endpoint koji vraca URL-ove svih materijala za odredjeni predmet (prema sifri predmeta)
    @GetMapping("/{sifPredmet}/materijali")
    public ResponseEntity<List<String>> getMaterijaliByPredmet(@PathVariable Integer sifPredmet) {
        List<String> materialUrls = materijalService.listMaterialsBySubjectFolder(sifPredmet.toString());

        return materialUrls.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(materialUrls);
    }
}
