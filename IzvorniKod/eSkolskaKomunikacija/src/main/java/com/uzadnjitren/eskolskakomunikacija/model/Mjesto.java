package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Mjesto {

    @Id
    private Integer pbr;
    private String nazMjesto;

    public Integer getPbr() {
        return pbr;
    }

    public void setPbr(Integer pbr) {
        this.pbr = pbr;
    }

    public String getNazMjesto() {
        return nazMjesto;
    }

    public void setNazMjesto(String nazMjesto) {
        this.nazMjesto = nazMjesto;
    }
}
