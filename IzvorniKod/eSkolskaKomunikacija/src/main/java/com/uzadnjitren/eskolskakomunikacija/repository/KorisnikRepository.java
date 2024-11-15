package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, String> {
}
