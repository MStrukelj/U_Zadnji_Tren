package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

