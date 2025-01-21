package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import com.uzadnjitren.eskolskakomunikacija.controller.ObavijestRequest.Location;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ObavijestService {

    private final UcenikRepository ucenikRepository;
    private final EmailService emailService;

    @Autowired
    public ObavijestService(UcenikRepository ucenikRepository, EmailService emailService) {
        this.ucenikRepository = ucenikRepository;
        this.emailService = emailService;
    }

    public void posaljiObavijest(String subject, String description, List<String> classes, Location location) throws Exception {
        List<Ucenik> ucenici = ucenikRepository.findAllByClasses(classes);

        if (ucenici.isEmpty()) {
            throw new Exception("Nema učenika u odabranim razredima.");
        }

        // Priprema liste email adresa
        List<String> emailAddresses = ucenici.stream()
                .map(Ucenik::getEmail)
                .collect(Collectors.toList());

        // Priprema informacije o lokaciji
        String locationInfo = (location != null)
                ? String.format("Lokacija: https://www.google.com/maps/place/%s+%s",
                convertToDMS(location.getLat(), true),
                convertToDMS(location.getLng(), false))
                : "Lokacija nije specificirana.";


        String emailBody = String.format("%s\n\n%s", description, locationInfo);

        try {
            // Slanje emaila svim primateljima
            emailService.sendEmailToMultipleRecipients(emailAddresses, subject, emailBody);
        } catch (MessagingException e) {
            throw new Exception("Greška prilikom slanja e-maila.", e);
        }
    }

    // Metoda za konverziju u DMS format
    private String convertToDMS(double coordinate, boolean isLatitude) {
        String direction = isLatitude
                ? (coordinate >= 0 ? "N" : "S")
                : (coordinate >= 0 ? "E" : "W");

        coordinate = Math.abs(coordinate);
        int degrees = (int) coordinate;
        double minutesFull = (coordinate - degrees) * 60;
        int minutes = (int) minutesFull;
        double seconds = (minutesFull - minutes) * 60;


        return String.format("%d%%C2%%B0%d'%s%%22%s",
                degrees,
                minutes,
                String.format(Locale.US, "%.1f", seconds),
                direction);
    }



}
