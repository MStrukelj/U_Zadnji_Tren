package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.model.Razred;
import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface UcenikRepository extends JpaRepository<Ucenik, Integer> {
    @Query("SELECT p FROM Upisao u" +
            " JOIN PredmetRazred pr ON u.oznRaz = pr.oznRaz" +
            " JOIN pr.predmet p" +
            " WHERE u.jmbag = :jmbag")
    List<Predmet> findPredmetiByUcenikJMBAG(@Param("jmbag") Integer jmbag);

    @Query("SELECT u FROM Ucenik u WHERE u.email = :email")
    Optional<Ucenik> findByEmail(@Param("email") String email);

    @Query("SELECT r FROM Razred r, Upisao u WHERE r.oznRaz = u.oznRaz AND u.jmbag = :jmbag AND r.izboran IS NULL")
    Optional<Razred> findMainRazredByJmbag(@Param("jmbag") Integer jmbag);
}
