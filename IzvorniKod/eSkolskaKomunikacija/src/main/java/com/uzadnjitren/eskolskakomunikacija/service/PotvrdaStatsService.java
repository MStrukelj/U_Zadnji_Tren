package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.dto.UcenikPotvrdaDto;
import com.uzadnjitren.eskolskakomunikacija.dto.VrstaPotvrdeDto;
import com.uzadnjitren.eskolskakomunikacija.repository.PotvrdaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PotvrdaStatsService {
    private final PotvrdaRepository potvrdaRepository;

    public PotvrdaStatsService(PotvrdaRepository potvrdaRepository) {
        this.potvrdaRepository = potvrdaRepository;
    }

    // Funkcija koja vraća broj ukupno skidanih potvrda za svaku vrstu potvrde
    public List<VrstaPotvrdeDto> getStatsVrstaPotvrda(){
        return potvrdaRepository.getStatsVrstaPotvrda();
    }

    // Funkcija koja vraća broj ukupno skidanih potvrda po vrsti za određenog učenika
    public List<UcenikPotvrdaDto> getStatsUcenikPotvrda(Integer JMBAG){
        return potvrdaRepository.getStatsPotvrdaByJmbag(JMBAG);
    }
}
