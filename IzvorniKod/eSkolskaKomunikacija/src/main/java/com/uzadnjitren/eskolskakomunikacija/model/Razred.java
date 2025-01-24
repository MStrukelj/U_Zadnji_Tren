package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "razred")
public class Razred {

    @Id
    @Column(name = "oznraz")
    private String oznRaz;
    
    @Column(name = "smjer")
    private String smjer;
    
    @Column(name = "godina")
    private Integer godina;
    
    @Column(name = "kapacitet")
    private Integer kapacitet;
    
    @Column(name = "izboran")
    private String izboran;
    
    @Column(name = "fakultativan")
    private String fakultativan;

    public String getOznRaz() {
        return oznRaz;
    }

    public void setOznRaz(String oznRaz) {
        this.oznRaz = oznRaz;
    }

    public String getSmjer() {
        return smjer;
    }

    public void setSmjer(String smjer) {
        this.smjer = smjer;
    }

    public Integer getGodina() {
        return godina;
    }

    public void setGodina(Integer godina) {
        this.godina = godina;
    }

    public Integer getKapacitet() {
        return kapacitet;
    }

    public void setKapacitet(Integer kapacitet) {
        this.kapacitet = kapacitet;
    }

    public String getIzboran() {
        return izboran;
    }

    public void setIzboran(String izboran) {
        this.izboran = izboran;
    }

    public String getFakultativan() {
        return fakultativan;
    }

    public void setFakultativan(String fakultativan) {
        this.fakultativan = fakultativan;
    }
}
