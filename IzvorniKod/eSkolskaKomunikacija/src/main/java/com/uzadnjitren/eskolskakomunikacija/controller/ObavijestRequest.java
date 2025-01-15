package com.uzadnjitren.eskolskakomunikacija.controller;

import java.util.List;

public class ObavijestRequest {
    private String naslov;
    private String tekst;
    private List<Integer> sifrePredmeta;

    // Getteri i setteri
    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getTekst() {
        return tekst;
    }

    public void setTekst(String tekst) {
        this.tekst = tekst;
    }

    public List<Integer> getSifrePredmeta() {
        return sifrePredmeta;
    }

    public void setSifrePredmeta(List<Integer> sifrePredmeta) {
        this.sifrePredmeta = sifrePredmeta;
    }
}

