package com.uzadnjitren.eskolskakomunikacija.repository;
import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, String> {
    List<Korisnik> findByImeAndPrezime(String ime, String prezime);

    boolean existsKorisnikByEmail(String email);
}
