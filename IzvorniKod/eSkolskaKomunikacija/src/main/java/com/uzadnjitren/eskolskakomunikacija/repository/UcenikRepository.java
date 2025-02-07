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

    @Query("SELECT DISTINCT u FROM Ucenik u " +
            "JOIN Upisao up ON u.JMBAG = up.jmbag " +
            "JOIN PredmetRazred pr ON up.oznRaz = pr.oznRaz " +
            "WHERE pr.predmet.sifPredmet IN :sifrePredmeta")
    List<Ucenik> findAllByPredmetSifre(@Param("sifrePredmeta") List<Integer> sifrePredmeta);

    @Query("SELECT DISTINCT u FROM Ucenik u " +
            "JOIN Upisao up ON u.JMBAG = up.jmbag " +
            "JOIN Razred r ON up.oznRaz = r.oznRaz " +
            "WHERE r.smjer IN :smjerovi")
    List<Ucenik> findAllByRazredSmjerovi(@Param("smjerovi") List<String> smjerovi);

    @Query("SELECT r.oznRaz FROM Razred r ORDER BY r.godina ASC, r.oznRaz ASC")
    List<String> findAllClassIdentifiers();


    @Query("SELECT DISTINCT u FROM Ucenik u " +
            "JOIN Upisao up ON u.JMBAG = up.jmbag " +
            "WHERE up.oznRaz IN :classes")
    List<Ucenik> findAllByClasses(@Param("classes") List<String> classes);





}
