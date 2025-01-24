package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.dto.SignUpRequest;
import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import com.uzadnjitren.eskolskakomunikacija.model.Upisao;
import com.uzadnjitren.eskolskakomunikacija.repository.KorisnikRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.UpisaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.uzadnjitren.eskolskakomunikacija.exception.KorisnikCRUDException;
import jakarta.transaction.Transactional;

import java.util.Date;

@Service
public class SignUpService {

    private final KorisnikRepository korisnikRepository;
    private final UcenikRepository ucenikRepository;
    private final UpisaoRepository upisaoRepository;

    @Autowired
    public SignUpService(KorisnikRepository korisnikRepository, UcenikRepository ucenikRepository, UpisaoRepository upisaoRepository) {
        this.korisnikRepository = korisnikRepository;
        this.ucenikRepository = ucenikRepository;
        this.upisaoRepository = upisaoRepository;
    }

    @Transactional
    public void signUp(SignUpRequest request) {
        // Check if email already exists
        if (korisnikRepository.existsKorisnikByEmail(request.getEmail())) {
            throw new KorisnikCRUDException("Email already exists", HttpStatus.BAD_REQUEST);
        }

        // Create Korisnik
        Korisnik korisnik = new Korisnik();
        korisnik.setEmail(request.getEmail());
        korisnik.setLozinka(request.getLozinka());
        korisnik.setUloga1("S"); // Student role
        korisnik.setIme(request.getIme());
        korisnik.setPrezime(request.getPrezime());
        korisnikRepository.save(korisnik);

        // Create Ucenik
        Ucenik ucenik = new Ucenik();
        ucenik.setEmail(request.getEmail());
        ucenik.setLozinka(request.getLozinka());
        ucenik.setJMBAG(generateJMBAG());
        ucenik.setOIB(generateOIB());
        ucenik.setDatRod(new Date());
        ucenik.setPbrStan(10000); // Default to Zagreb
        ucenik.setPbrRod(10000); // Default to Zagreb
        ucenikRepository.save(ucenik);

        // Assign student to their track class (1.A, 1.B, or 1.C based on smjer)
        String razredOznaka = "1." + request.getSmjer(); // e.g., "1.A", "1.B", "1.C"
        Upisao upisao = new Upisao();
        upisao.setJmbag(ucenik.getJMBAG());
        upisao.setOznRaz(razredOznaka);
        upisaoRepository.save(upisao);

        // If they selected an elective subject, assign them to that class too
        if (request.getIzborniPredmet() != null && !request.getIzborniPredmet().isEmpty()) {
            Upisao upisaoIzborni = new Upisao();
            upisaoIzborni.setJmbag(ucenik.getJMBAG());
            upisaoIzborni.setOznRaz(request.getIzborniPredmet()); // DSD, FRA, or ASTR
            upisaoRepository.save(upisaoIzborni);
        }
    }

    private Integer generateJMBAG() {
        // Simple implementation - you might want to make this more sophisticated
        return (int) (Math.random() * 1000000);
    }

    private String generateOIB() {
        // Simple implementation - you might want to make this more sophisticated
        return String.format("%011d", (long) (Math.random() * 100000000000L));
    }
}