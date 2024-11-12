package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(PredmetRazredId.class)
@Table(name = "predmetrazred")
public class PredmetRazred implements Serializable {

    @Id
    @Column(name = "oznraz")
    private String oznRaz;

    @Id
    @Column(name = "sifpredmet")
    private Integer sifPredmet;

    @ManyToOne
    @JoinColumn(name = "oznraz", insertable = false, updatable = false)
    private Razred razred;

    @ManyToOne
    @JoinColumn(name = "sifpredmet", insertable = false, updatable = false)
    private Predmet predmet;

    @ManyToOne
    @JoinColumn(name = "sifNast")
    private Nastavnik nastavnik;

    // Getteri i Setteri
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

    public Razred getRazred() {
        return razred;
    }

    public void setRazred(Razred razred) {
        this.razred = razred;
    }

    public Predmet getPredmet() {
        return predmet;
    }

    public void setPredmet(Predmet predmet) {
        this.predmet = predmet;
    }

    public Nastavnik getNastavnik() {
        return nastavnik;
    }

    public void setNastavnik(Nastavnik nastavnik) {
        this.nastavnik = nastavnik;
    }
}
