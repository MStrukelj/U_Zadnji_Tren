package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "predmet")
public class Predmet {

    @Id
    @Column(name = "sifpredmet")
    private Integer sifPredmet;

    @Column(name = "nazPred")
    private String nazPred;

    @Column(name = "brSatiTjedno")
    private Integer brSatiTjedno;

    @Column(name = "izboran")
    private Boolean izboran;

    @Column(name = "fakultativan")
    private Boolean fakultativan;

    // Getteri i Setteri
    public Integer getSifPredmet() {
        return sifPredmet;
    }

    public void setSifPredmet(Integer sifPredmet) {
        this.sifPredmet = sifPredmet;
    }

    public String getNazPred() {
        return nazPred;
    }

    public void setNazPred(String nazPred) {
        this.nazPred = nazPred;
    }

    public Integer getBrSatiTjedno() {
        return brSatiTjedno;
    }

    public void setBrSatiTjedno(Integer brSatiTjedno) {
        this.brSatiTjedno = brSatiTjedno;
    }

    public Boolean getIzboran() {
        return izboran;
    }

    public void setIzboran(Boolean izboran) {
        this.izboran = izboran;
    }

    public Boolean getFakultativan() {
        return fakultativan;
    }

    public void setFakultativan(Boolean fakultativan) {
        this.fakultativan = fakultativan;
    }
}
