package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalDownloadsDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalPredmetDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalStats;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalViewsDto;
import com.uzadnjitren.eskolskakomunikacija.repository.MaterijalRepository;
import com.uzadnjitren.eskolskakomunikacija.service.MaterijalStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/materijal/stats")
public class MaterijalStatsController {
    private final MaterijalStatsService materijalStatsService;

    public MaterijalStatsController(MaterijalStatsService materijalStatsService) {
        this.materijalStatsService = materijalStatsService;
    }

    @GetMapping("/mostviewed/{sifnast}")
    public ResponseEntity<?> mostviewed(@PathVariable Integer sifnast) {
        List<MaterijalViewsDto> materijali = materijalStatsService.findMostViewedMaterijal(sifnast);
        return materijali.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok().body(materijali);
    }

    @GetMapping("/mostdownloaded/{sifnast}")
    public ResponseEntity<?> mostdownloaded(@PathVariable Integer sifnast) {
        List<MaterijalDownloadsDto> materijali = materijalStatsService.findMostDownloadedMaterijal(sifnast);
        return materijali.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok().body(materijali);
    }
    @GetMapping("/materijalpredmet/{sifnast}")
    public ResponseEntity<?> materijalpredmet(@PathVariable Integer sifnast) {
        List<MaterijalPredmetDto> materijali = materijalStatsService.findMaterijalPredmet(sifnast);
        return materijali.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok().body(materijali);
    }
    @GetMapping("/{sifnast}/{sifmaterijal}")
    public ResponseEntity<?> materijalpredmet(@PathVariable Integer sifnast,@PathVariable Integer sifmaterijal) {
        MaterijalStats materijalStats = materijalStatsService.findMaterijalStats(sifnast, sifmaterijal);
        return materijalStats == null ? ResponseEntity.noContent().build() : ResponseEntity.ok().body(materijalStats);
    }
}
