package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Razred {

    @Id
    private String oznRaz;
    private String smjer;
    private Integer godina;
    private Integer kapacitet;
    private String izboran;
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
