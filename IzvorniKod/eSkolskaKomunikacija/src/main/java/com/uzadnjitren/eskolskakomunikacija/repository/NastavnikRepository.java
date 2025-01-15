package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Nastavnik;
import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface NastavnikRepository extends JpaRepository<Nastavnik, Integer> {

    // Pronađi nastavnika prema emailu
    @Query("SELECT n FROM Nastavnik n WHERE n.email = :email")
    Optional<Nastavnik> findByEmail(@Param("email") String email);

    // Pronađi predmete koje predaje nastavnik prema njegovom ID-u
    @Query("SELECT p FROM PredmetRazred pr" +
            " JOIN pr.predmet p" +
            " WHERE pr.nastavnik.sifNast = :sifNast")
    List<Predmet> findPredmetiByNastavnikId(@Param("sifNast") Integer sifNast);
}
