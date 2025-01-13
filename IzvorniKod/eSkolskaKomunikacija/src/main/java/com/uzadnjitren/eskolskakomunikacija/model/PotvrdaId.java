package com.uzadnjitren.eskolskakomunikacija.model;

import java.io.Serializable;
import java.util.Objects;

public class PotvrdaId implements Serializable {

    private Integer JMBAG;
    private String vrsta;

    // Default constructor
    public PotvrdaId() {
    }

    public PotvrdaId(Integer JMBAG, String vrsta) {
        this.JMBAG = JMBAG;
        this.vrsta = vrsta;
    }

    // Getteri i setteri

    public Integer getJmbag() {
        return JMBAG;
    }

    public void setJmbag(Integer JMBAG) {
        this.JMBAG = JMBAG;
    }

    public String getVrsta() {
        return vrsta;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

    // equals i hashCode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PotvrdaId that = (PotvrdaId) o;
        return Objects.equals(JMBAG, that.JMBAG) &&
                Objects.equals(vrsta, that.vrsta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(JMBAG, vrsta);
    }
}
