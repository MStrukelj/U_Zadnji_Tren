package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.dto.UcenikPotvrdaDto;
import com.uzadnjitren.eskolskakomunikacija.dto.VrstaPotvrdeDto;
import com.uzadnjitren.eskolskakomunikacija.model.Potvrda;
import com.uzadnjitren.eskolskakomunikacija.model.PotvrdaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PotvrdaRepository extends JpaRepository<Potvrda, PotvrdaId> {
    @Query("SELECT new com.uzadnjitren.eskolskakomunikacija.dto.VrstaPotvrdeDto(p.vrsta,SUM(p.brSkidanja)) "+
            "FROM Potvrda p "+
            "GROUP BY p.vrsta")
    List<VrstaPotvrdeDto> getStatsVrstaPotvrda();

    @Query("SELECT new com.uzadnjitren.eskolskakomunikacija.dto.UcenikPotvrdaDto(p.vrsta,p.brSkidanja) "+
            "FROM Potvrda p "+
            "WHERE p.JMBAG = :JMBAG")
    List<UcenikPotvrdaDto> getStatsPotvrdaByJmbag(@Param("JMBAG") Integer JMBAG);
}
