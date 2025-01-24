package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalDownloadsDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalPredmetDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalStats;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalViewsDto;
import com.uzadnjitren.eskolskakomunikacija.repository.MaterijalRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterijalStatsService {
    private final MaterijalRepository materijalRepository;

    public MaterijalStatsService(MaterijalRepository materijalRepository) {
        this.materijalRepository = materijalRepository;
    }

    // Funkcija koja vraća 10 najgledanijih materijala za određenog nastavnika
    public List<MaterijalViewsDto> findMostViewedMaterijal(Integer sifnast) {
        return materijalRepository.findMostViewedMaterijal(sifnast,PageRequest.of(0, 10));
    }

    // Funkcija koja vraća 10 najskidanijih materijala za određenog nastavnika
    public List<MaterijalDownloadsDto> findMostDownloadedMaterijal(Integer sifnast) {
        return materijalRepository.findMostDownloadedMaterijal(sifnast, PageRequest.of(0, 10));
    }

    // Funkcija koja vraća broj objavljenih materijala po predmetu za određenog nastavnika
    public List<MaterijalPredmetDto> findMaterijalPredmet(Integer sifnast) {
        return materijalRepository.findMaterijalPredmet(sifnast);
    }

    // Funkcija koja vraća statistiku materijala koji je objavio određeni nastavnik
    public MaterijalStats findMaterijalStats(Integer sifnast,Integer sifmaterijal) {
        return materijalRepository.findMaterijalStats(sifnast,sifmaterijal);
    }
}

