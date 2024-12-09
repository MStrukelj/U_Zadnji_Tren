package com.uzadnjitren.eskolskakomunikacija.model;

import java.io.Serializable;
import java.util.Objects;

public class UcenikId implements Serializable {

    private Integer jmbag;
    private String email;
    private String lozinka;

    public UcenikId() {}

    public UcenikId(Integer jmbag, String email, String lozinka) {
        this.jmbag = jmbag;
        this.email = email;
        this.lozinka = lozinka;
    }

    public Integer getJmbag() {
        return jmbag;
    }

    public void setJmbag(Integer jmbag) {
        this.jmbag = jmbag;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UcenikId ucenikId = (UcenikId) o;
        return Objects.equals(jmbag, ucenikId.jmbag) &&
                Objects.equals(email, ucenikId.email) &&
                Objects.equals(lozinka, ucenikId.lozinka);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jmbag, email, lozinka);
    }
}
