package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Predmet {

    @Id
    private Integer sifPredmet;

    private String nazPred;

    private Integer brSatiTjedno;

    private Boolean izboran;

    private Boolean fakultativan;

    @OneToMany(mappedBy = "predmet")
    private List<Materijal> materijali;

    // Getteri i setteri
    public Integer getSifPredmet() { return sifPredmet; }
    public void setSifPredmet(Integer sifPredmet) { this.sifPredmet = sifPredmet; }

    public String getNazPred() { return nazPred; }
    public void setNazPred(String nazPred) { this.nazPred = nazPred; }

    public Integer getBrSatiTjedno() { return brSatiTjedno; }
    public void setBrSatiTjedno(Integer brSatiTjedno) { this.brSatiTjedno = brSatiTjedno; }

    public Boolean getIzboran() { return izboran; }
    public void setIzboran(Boolean izboran) { this.izboran = izboran; }

    public Boolean getFakultativan() { return fakultativan; }
    public void setFakultativan(Boolean fakultativan) { this.fakultativan = fakultativan; }

    public List<Materijal> getMaterijali() { return materijali; }
    public void setMaterijali(List<Materijal> materijali) { this.materijali = materijali; }
}
