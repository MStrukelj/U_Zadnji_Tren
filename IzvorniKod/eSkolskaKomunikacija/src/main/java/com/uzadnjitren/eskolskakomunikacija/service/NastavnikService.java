package com.uzadnjitren.eskolskakomunikacija.service;
import com.uzadnjitren.eskolskakomunikacija.model.Nastavnik;
import com.uzadnjitren.eskolskakomunikacija.repository.NastavnikRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NastavnikService  {
   private final NastavnikRepository nastavnikRepository;

    public NastavnikService(NastavnikRepository nastavnikRepository) {
        this.nastavnikRepository = nastavnikRepository;
    }

    // Fukcija za dobivanje sifre nastavnika iz njegovog emaila
    public Integer getSifNast(String email) {
        Optional<Nastavnik> nastavnik= nastavnikRepository.findByEmail(email);
        return nastavnik.map(Nastavnik::getSifNast).orElse(null);
    }
}
