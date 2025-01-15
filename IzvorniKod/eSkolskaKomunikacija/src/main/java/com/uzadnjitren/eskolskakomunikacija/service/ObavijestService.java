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

    public void posaljiObavijest(String subject, String description, List<String> classes) throws Exception {
        // Fetch students based on selected classes
        List<Ucenik> ucenici = ucenikRepository.findAllByRazredSmjerovi(classes);

        if (ucenici.isEmpty()) {
            throw new Exception("Nema učenika u odabranim razredima.");
        }

        // Send email to each student
        for (Ucenik ucenik : ucenici) {
            try {
                emailService.sendEmail(ucenik.getEmail(), subject, description);
            } catch (MessagingException e) {
                throw new Exception("Greška prilikom slanja e-maila učeniku: " + ucenik.getEmail(), e);
            }
        }
    }
}
