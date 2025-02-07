package com.uzadnjitren.eskolskakomunikacija.repository;
import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, String> {
    List<Korisnik> findByImeAndPrezime(String ime, String prezime);

    boolean existsKorisnikByEmail(String email);

    Korisnik findByEmail(String email);

    @Query("SELECT k FROM Korisnik k "+
            "WHERE k.uloga1 = 'US' ")
    Optional<Korisnik> findDjelatnikUS();
}
