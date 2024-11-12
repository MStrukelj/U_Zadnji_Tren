package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface UcenikRepository extends JpaRepository<Ucenik, Integer> {
    // JPQL query za dobavljanje predmeta po JMBAG-u ucenika
    @Query("SELECT p FROM Upisao u" +
            " JOIN PredmetRazred pr ON u.oznRaz = pr.oznRaz" +
            " JOIN pr.predmet p" +
            " WHERE u.jmbag = :jmbag")
    List<Predmet> findPredmetiByUcenikJMBAG(@Param("jmbag") Integer jmbag);
}

