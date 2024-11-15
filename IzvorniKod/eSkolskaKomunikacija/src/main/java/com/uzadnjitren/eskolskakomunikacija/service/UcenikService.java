package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.model.Razred;
import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UcenikService {

    // Injektira UcenikRepository koristeci konstruktor
    private final UcenikRepository ucenikRepository;

    @Autowired
    public UcenikService(UcenikRepository ucenikRepository) {
        this.ucenikRepository = ucenikRepository;
    }

    // Metoda koja dobavlja listu predmeta za odredjenog ucenika po JMBAG-u
    public List<Predmet> findPredmetiByUcenik(Integer jmbag) {
        return ucenikRepository.findPredmetiByUcenikJMBAG(jmbag);
    }

    public Optional<Ucenik> findByEmail(String email) {
        return ucenikRepository.findByEmail(email);
    }

    public Optional<Razred> findRazredByJmbag(Integer jmbag) {
        return ucenikRepository.findMainRazredByJmbag(jmbag);
    }
}
