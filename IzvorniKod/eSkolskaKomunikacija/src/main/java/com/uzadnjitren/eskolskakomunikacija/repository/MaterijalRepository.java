package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Materijal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterijalRepository extends JpaRepository<Materijal, Integer> {
    List<Materijal> findAllByPredmet_SifPredmet(Integer sifPredmet);
}
