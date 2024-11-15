package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class Materijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sifMaterijal;
    private String nazMaterijal;
    private Integer brPregleda;
    private Integer brSkidanja;
    private String url;

    @ManyToOne
    @JoinColumn(name = "sifPredmet")
    private Predmet predmet;

    // Getteri i setteri
    public Integer getSifMaterijal() { return sifMaterijal; }
    public void setSifMaterijal(Integer sifMaterijal) { this.sifMaterijal = sifMaterijal; }

    public String getNazMaterijal() { return nazMaterijal; }
    public void setNazMaterijal(String nazMaterijal) { this.nazMaterijal = nazMaterijal; }

    public Integer getBrPregleda() { return brPregleda; }
    public void setBrPregleda(Integer brPregleda) { this.brPregleda = brPregleda; }

    public Integer getBrSkidanja() { return brSkidanja; }
    public void setBrSkidanja(Integer brSkidanja) { this.brSkidanja = brSkidanja; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public Predmet getPredmet() { return predmet; }
    public void setPredmet(Predmet predmet) { this.predmet = predmet; }
}
