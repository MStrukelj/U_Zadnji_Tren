package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalDownloadsDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalPredmetDto;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalStats;
import com.uzadnjitren.eskolskakomunikacija.dto.MaterijalViewsDto;
import com.uzadnjitren.eskolskakomunikacija.repository.MaterijalRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterijalStatsService {
    private final MaterijalRepository materijalRepository;

    public MaterijalStatsService(MaterijalRepository materijalRepository) {
        this.materijalRepository = materijalRepository;
    }

    public List<MaterijalViewsDto> findMostViewedMaterijal(Integer sifnast) {
        return materijalRepository.findMostViewedMaterijal(sifnast,PageRequest.of(0, 10));
    }

    public List<MaterijalDownloadsDto> findMostDownloadedMaterijal(Integer sifnast) {
        return materijalRepository.findMostDownloadedMaterijal(sifnast, PageRequest.of(0, 10));
    }

    public List<MaterijalPredmetDto> findMaterijalPredmet(Integer sifnast) {
        return materijalRepository.findMaterijalPredmet(sifnast);
    }
    public MaterijalStats findMaterijalStats(Integer sifnast,Integer sifmaterijal) {
        return materijalRepository.findMaterijalStats(sifnast,sifmaterijal);
    }
}

