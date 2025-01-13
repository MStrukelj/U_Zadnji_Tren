package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@IdClass(PotvrdaId.class)
@Table(name = "potvrda")
public class Potvrda {

    @Id
    @Column(name = "vrsta")
    private String vrsta;

    @Id
    @Column(name = "JMBAG")
    private Integer JMBAG;

    @Column(name = "brskidanja")
    private Integer brSkidanja;

    @ManyToOne
    @JoinColumn(name = "JMBAG", insertable = false, updatable = false, nullable = false)
    private Ucenik ucenik;

    // Getteri i setteri
    public String getVrsta() {
        return vrsta;
    }

    public void setVrsta(String vrsta) {
        this.vrsta = vrsta;
    }

    public Integer getJmbag() {
        return JMBAG;
    }

    public void setJmbag(Integer jmbag) {
        this.JMBAG = jmbag;
    }

    public Integer getBrskidanja() {
        return brSkidanja;
    }

    public void setBrskidanja(Integer brSkidanja) {
        this.brSkidanja = brSkidanja;
    }

    public Ucenik getUcenik() {
        return ucenik;
    }

    public void setUcenik(Ucenik ucenik) {
        this.ucenik = ucenik;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Potvrda potvrda = (Potvrda) o;
        return Objects.equals(JMBAG, potvrda.JMBAG) &&
                Objects.equals(vrsta, potvrda.vrsta) &&
                Objects.equals(brSkidanja, potvrda.brSkidanja);
    }

    @Override
    public int hashCode() {
        return Objects.hash(JMBAG, vrsta, brSkidanja);
    }
}
