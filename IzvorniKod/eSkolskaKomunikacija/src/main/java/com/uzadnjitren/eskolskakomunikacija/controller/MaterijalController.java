package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.service.MaterijalService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
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
            @RequestParam("file") MultipartFile file,
            @RequestParam("sifNast") Integer sifNast,
            HttpSession session) {
        try {
            System.out.println("Session attributes: " + session.getAttributeNames());

            if (sifNast == null) {
                throw new IllegalArgumentException("Šifra nastavnika nije navedena.");
            }

            System.out.println("Received upload request: sifPredmet=" + sifPredmet + ", sifNast=" + sifNast);

            String uploadedUrl = materijalService.uploadMaterijal(sifPredmet, file, sifNast);

            Map<String, String> response = new HashMap<>();
            response.put("fileUrl", uploadedUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error during file upload: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }




    @GetMapping("/{sifPredmet}/materijali/download")
    public ResponseEntity<byte[]> downloadMaterijal(@RequestParam String fileUrl) {
        try {
            String decodedFileUrl = java.net.URLDecoder.decode(fileUrl, StandardCharsets.UTF_8.name());

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.getForEntity(decodedFileUrl, byte[].class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to download file from URL: " + decodedFileUrl);
            }

            String fileName = decodedFileUrl.substring(decodedFileUrl.lastIndexOf("/") + 1);

            materijalService.incrementDownloads(decodedFileUrl);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName).build());

            return new ResponseEntity<>(response.getBody(), headers, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error downloading file: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }






}
