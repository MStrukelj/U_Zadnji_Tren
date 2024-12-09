package com.uzadnjitren.eskolskakomunikacija.model;

import java.io.Serializable;
import java.util.Objects;

public class PredmetRazredId implements Serializable {

    // Kombinirani primarni kljuc za entitet PredmetRazred
    private String oznRaz;
    private Integer sifPredmet;

    public PredmetRazredId() {}

    public PredmetRazredId(String oznRaz, Integer sifPredmet) {
        this.oznRaz = oznRaz;
        this.sifPredmet = sifPredmet;
    }

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

    // Override-ane metode za usporedbu objekata
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PredmetRazredId that = (PredmetRazredId) o;
        return Objects.equals(oznRaz, that.oznRaz) && Objects.equals(sifPredmet, that.sifPredmet);
    }

    @Override
    public int hashCode() {
        return Objects.hash(oznRaz, sifPredmet);
    }
}
