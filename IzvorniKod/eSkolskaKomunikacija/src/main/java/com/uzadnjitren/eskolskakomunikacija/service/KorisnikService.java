package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import com.uzadnjitren.eskolskakomunikacija.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KorisnikService {
    
    private final KorisnikRepository korisnikRepository;
    
    @Autowired
    public KorisnikService(KorisnikRepository korisnikRepository) {
        this.korisnikRepository = korisnikRepository;
    }
    
    public Optional<Korisnik> findByEmail(String email) {
        return korisnikRepository.findById(email);
    }
}
