package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.service.MaterijalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<Map<String, String>>> getMaterijaliByPredmet(@PathVariable Integer sifPredmet) {
        // Povećanje broja pregleda za sve materijale
        materijalService.incrementViews(sifPredmet);

        List<Map<String, String>> materials = materijalService.listMaterialsBySubjectFolder(sifPredmet.toString());
        return materials.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(materials);
    }



    @PostMapping("/{sifPredmet}/materijali/upload")
    public ResponseEntity<?> uploadMaterijal(
            @PathVariable Integer sifPredmet,
            @RequestParam("file") MultipartFile file) {
        try {
            String uploadedUrl = materijalService.uploadMaterijal(sifPredmet, file);


            Map<String, String> response = new HashMap<>();
            response.put("fileUrl", uploadedUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @GetMapping("/{sifPredmet}/materijali/download")
    public ResponseEntity<byte[]> downloadMaterijal(@RequestParam String fileUrl) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.getForEntity(fileUrl, byte[].class);

            // Izdvajanje naziva datoteke iz URL-a
            String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

            // Povećanje broja skidanja za materijal
            materijalService.incrementDownloads(fileName);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName).build());

            return new ResponseEntity<>(response.getBody(), headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }




}
