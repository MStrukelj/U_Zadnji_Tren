package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "predavanje")
public class Predavanje {
    @Id
    @Column(name = "vrijemepoc", columnDefinition = "time")
    private LocalTime vrijemePoc;

    @Column(name = "vrijemekraj", columnDefinition = "time")
    private LocalTime vrijemeKraj;

    @Column(name = "danutjednu", columnDefinition = "varchar")
    private String danUTjednu;

    @Column(name = "oznucionica", columnDefinition = "varchar")
    private String oznUcionica;

    @Column(name = "oznraz", columnDefinition = "varchar")
    private String oznRaz;

    @Column(name = "sifpredmet", columnDefinition = "integer")
    private Integer sifPredmet;

    // Getters and Setters
    public LocalTime getVrijemePoc() {
        return vrijemePoc;
    }

    public void setVrijemePoc(LocalTime vrijemePoc) {
        this.vrijemePoc = vrijemePoc;
    }

    public LocalTime getVrijemeKraj() {
        return vrijemeKraj;
    }

    public void setVrijemeKraj(LocalTime vrijemeKraj) {
        this.vrijemeKraj = vrijemeKraj;
    }

    public String getDanUTjednu() {
        return danUTjednu;
    }

    public void setDanUTjednu(String danUTjednu) {
        this.danUTjednu = danUTjednu;
    }

    public String getOznUcionica() {
        return oznUcionica;
    }

    public void setOznUcionica(String oznUcionica) {
        this.oznUcionica = oznUcionica;
    }

    public String getOznRaz() {
        return oznRaz;
    }

    public void setOznRaz(String oznRaz) {
        this.oznRaz = oznRaz;
    }

    public Integer getSifPredmet() {
        return sifPredmet;
    }

    public void setSifPredmet(Integer sifPredmet) {
        this.sifPredmet = sifPredmet;
    }
}