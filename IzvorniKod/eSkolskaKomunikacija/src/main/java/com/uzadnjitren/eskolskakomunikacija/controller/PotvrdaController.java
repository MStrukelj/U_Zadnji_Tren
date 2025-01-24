package com.uzadnjitren.eskolskakomunikacija.controller;


import com.uzadnjitren.eskolskakomunikacija.service.PdfGeneratorService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/api/potvrda")
public class PotvrdaController {
    private final PdfGeneratorService pdfGeneratorService;

    public PotvrdaController(PdfGeneratorService pdfGeneratorService) {
        this.pdfGeneratorService = pdfGeneratorService;
    }

    // Generiranje potvrde na temelju vrste i email adrese ucenika
    @GetMapping(value = "/{vrsta}/{email}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<?> generatePDF(@PathVariable String vrsta,@PathVariable String email) {
        ByteArrayInputStream potvrda = pdfGeneratorService.generatePDF(vrsta,email);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=potvrda"+"_"+vrsta + "_" + email+".pdf");
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(potvrda));
    }
}
