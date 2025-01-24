package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Predavanje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface PredavanjeRepository extends JpaRepository<Predavanje, LocalTime> {
    @Query(value = "SELECT * FROM predavanje WHERE oznraz = :oznRaz ORDER BY " +
           "CASE danutjednu " +
           "  WHEN 'Monday' THEN 1 " +
           "  WHEN 'Tuesday' THEN 2 " +
           "  WHEN 'Wednesday' THEN 3 " +
           "  WHEN 'Thursday' THEN 4 " +
           "  WHEN 'Friday' THEN 5 " +
           "  ELSE 6 END, " +
           "vrijemepoc", nativeQuery = true)
    List<Predavanje> findByOznRazOrderByDanUTjednuAscVrijemePocAsc(@Param("oznRaz") String oznRaz);
}