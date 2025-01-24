package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Nastavnik;
import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.repository.NastavnikRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NastavnikService {
    private final NastavnikRepository nastavnikRepository;

    public NastavnikService(NastavnikRepository nastavnikRepository) {
        this.nastavnikRepository = nastavnikRepository;
    }

    // Funkcija za dobivanje šifre nastavnika iz njegovog emaila
    public Integer getSifNast(String email) {
        Optional<Nastavnik> nastavnik = nastavnikRepository.findByEmail(email);
        return nastavnik.map(Nastavnik::getSifNast).orElse(null);
    }

    // Funkcija za dohvaćanje predmeta koje predaje nastavnik prema šifri nastavnika
    public List<Predmet> findPredmetiByNastavnikId(Integer sifNast) {
        return nastavnikRepository.findPredmetiByNastavnikId(sifNast);
    }
}
