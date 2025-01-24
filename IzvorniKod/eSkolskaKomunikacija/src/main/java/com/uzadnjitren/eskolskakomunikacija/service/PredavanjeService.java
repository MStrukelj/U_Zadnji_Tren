package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Predavanje;
import com.uzadnjitren.eskolskakomunikacija.repository.PredavanjeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class PredavanjeService {
    private static final Logger logger = LoggerFactory.getLogger(PredavanjeService.class);
    private final PredavanjeRepository predavanjeRepository;

    @Autowired
    public PredavanjeService(PredavanjeRepository predavanjeRepository) {
        this.predavanjeRepository = predavanjeRepository;
    }

    public List<Predavanje> findByRazred(String oznRaz) {
        logger.info("Fetching schedule for class: {}", oznRaz);
        List<Predavanje> predavanja = predavanjeRepository.findByOznRazOrderByDanUTjednuAscVrijemePocAsc(oznRaz);

        // Log unique days and lesson counts per day
        Map<String, Long> lessonsPerDay = predavanja.stream()
            .collect(Collectors.groupingBy(
                Predavanje::getDanUTjednu,
                Collectors.counting()
            ));

        logger.info("Schedule breakdown by day:");
        lessonsPerDay.forEach((day, count) -> {
            logger.info("  {} - {} lessons", day, count);
            // Log first and last lesson for each day
            predavanja.stream()
                .filter(p -> p.getDanUTjednu().equals(day))
                .forEach(p -> logger.debug("    {} - {} - Room: {} - Subject: {}",
                    p.getVrijemePoc(), p.getVrijemeKraj(), p.getOznUcionica(), p.getSifPredmet()));
        });

        return predavanja;
    }
}