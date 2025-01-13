package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

@Entity
public class Materijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sifMaterijal") // Exact database column name
    private Integer sifMaterijal;

    @Column(name = "nazMaterijal")
    private String nazMaterijal;

    @Column(name = "brPregleda")
    private Integer brPregleda;

    @Column(name = "brSkidanja")
    private Integer brSkidanja;

    @Column(name = "URL")
    private String url;

    @ManyToOne
    @JoinColumn(name = "sifPredmet") // Exact foreign key column name
    private Predmet predmet;

    @ManyToOne
    @JoinColumn(name = "sifnast") // Foreign key column
    private Nastavnik nastavnik;

    // Getters and Setters
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
