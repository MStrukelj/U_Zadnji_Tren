package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalDownloadsDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalPredmetDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalViewsDto;
import com.uzadnjitren.eskolskakomunikacija.model.Materijal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterijalRepository extends JpaRepository<Materijal, Integer> {
    List<Materijal> findAllByPredmet_SifPredmet(Integer sifPredmet);

    @Query("SELECT new com.uzadnjitren.eskolskakomunikacija.dto.MaterijalViewsDto(m.nazMaterijal, m.brPregleda) " +
            "FROM Materijal m " +
            "WHERE m.nastavnik.sifNast = :sifnast " +
            "ORDER BY m.brPregleda DESC")
    List<MaterijalViewsDto> findMostViewedMaterijal(@Param("sifnast") Integer sifnast,Pageable pageable);

    @Query("SELECT new com.uzadnjitren.eskolskakomunikacija.dto.MaterijalDownloadsDto(m.nazMaterijal, m.brSkidanja) FROM Materijal m " +
            "WHERE m.nastavnik.sifNast = :sifnast " +
            "ORDER BY m.brSkidanja DESC")
    List<MaterijalDownloadsDto> findMostDownloadedMaterijal(@Param("sifnast") Integer sifnast, Pageable pageable);

    @Query("SELECT new com.uzadnjitren.eskolskakomunikacija.dto.MaterijalPredmetDto(m.predmet.nazPred, COUNT(m.sifMaterijal)) " +
            "FROM Materijal m " +
            "WHERE m.nastavnik.sifNast = :sifnast " +
            "GROUP BY m.predmet.nazPred " +
            "ORDER BY COUNT(m.sifMaterijal) DESC")
    List<MaterijalPredmetDto> findMaterijalPredmet(@Param("sifnast") Integer sifnast);

}
