package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.dto.UcenikPotvrdaDto;
import com.uzadnjitren.eskolskakomunikacija.dto.VrstaPotvrdeDto;
import com.uzadnjitren.eskolskakomunikacija.service.PotvrdaStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/potvrda/stats")
public class PotvrdaStatsController {
    private final PotvrdaStatsService potvrdaStatsService;

    public PotvrdaStatsController(PotvrdaStatsService potvrdaStatsService) {
        this.potvrdaStatsService = potvrdaStatsService;
    }

    @GetMapping
    public ResponseEntity<?> getPotvrdaStats() {
        List<VrstaPotvrdeDto>  vrstaPotvrdeDtos = potvrdaStatsService.getStatsVrstaPotvrda();
        return vrstaPotvrdeDtos.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(vrstaPotvrdeDtos);
    }
    @GetMapping("/{JMBAG}")
    public ResponseEntity<?> getPotvrdaStatsByJmbag(@PathVariable Integer JMBAG) {
        List<UcenikPotvrdaDto> ucenikPotvrdaDtos = potvrdaStatsService.getStatsUcenikPotvrda(JMBAG);
        return ucenikPotvrdaDtos.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(ucenikPotvrdaDtos);
    }
}
