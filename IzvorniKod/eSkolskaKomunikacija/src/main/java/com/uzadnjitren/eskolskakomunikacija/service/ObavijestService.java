package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.util.List;

@Service
public class ObavijestService {

    private final UcenikRepository ucenikRepository;
    private final EmailService emailService;

    @Autowired
    public ObavijestService(UcenikRepository ucenikRepository, EmailService emailService) {
        this.ucenikRepository = ucenikRepository;
        this.emailService = emailService;
    }

    public void posaljiObavijest(String naslov, String tekst, List<Integer> sifrePredmeta) throws Exception {
        // Dohvati učenike upisane u odabrane predmete
        List<Ucenik> ucenici = ucenikRepository.findAllByPredmetSifre(sifrePredmeta);

        if (ucenici.isEmpty()) {
            throw new Exception("Nema učenika upisanih u odabrane predmete.");
        }

        // Pošalji obavijest svakom učeniku
        for (Ucenik ucenik : ucenici) {
            try {
                emailService.sendEmail(ucenik.getEmail(), naslov, tekst);
            } catch (MessagingException e) {
                throw new Exception("Greška prilikom slanja e-maila učeniku: " + ucenik.getEmail(), e);
            }
        }
    }
}
