package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

@Entity
public class Materijal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "materijal_seq")
    @SequenceGenerator(name = "materijal_seq", sequenceName = "materijal_seq", allocationSize = 1)
    @Column(name = "sifmaterijal", nullable = false)
    private Integer sifMaterijal;


    @Column(name = "nazmaterijal")
    private String nazMaterijal;

    @Column(name = "brpregleda")
    private Integer brPregleda;

    @Column(name = "brskidanja")
    private Integer brSkidanja;

    @Column(name = "URL")
    private String url;

    @ManyToOne
    @JoinColumn(name = "sifpredmet", nullable = false)
    private Predmet predmet;

    @ManyToOne
    @JoinColumn(name = "sifnast", nullable = false) // Dodaj vezu s nastavnikom
    private Nastavnik nastavnik;

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

    public Nastavnik getNastavnik() { return nastavnik; }
    public void setNastavnik(Nastavnik nastavnik) { this.nastavnik = nastavnik; }
}


