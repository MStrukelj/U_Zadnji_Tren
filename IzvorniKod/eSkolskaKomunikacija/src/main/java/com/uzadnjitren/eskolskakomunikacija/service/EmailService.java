package com.uzadnjitren.eskolskakomunikacija.service;

import jakarta.mail.*;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Properties;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${spring.mail.password}")
    private String senderPassword;

    private final Session session;

    public EmailService() {
        // Konfiguracija sesije za Gmail
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        this.session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, senderPassword);
            }
        });
    }

    public void sendEmailToMultipleRecipients(List<String> recipients, String subject, String body) throws MessagingException {
        // Priprema emaila
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(senderEmail));
        message.setRecipients(
                Message.RecipientType.TO,
                recipients.stream()
                        .map(email -> {
                            try {
                                return new InternetAddress(email);
                            } catch (AddressException e) {
                                throw new RuntimeException(e);
                            }
                        })
                        .toArray(InternetAddress[]::new)
        );
        message.setSubject(subject);
        message.setText(body);

        // Slanje emaila
        Transport.send(message);
    }
}
