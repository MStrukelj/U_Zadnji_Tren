package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

@Entity
@Table(name = "korisnik")
public class Korisnik {

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "lozinka", nullable = false)
    private String lozinka;

    @Column(name = "ime", nullable = false)
    private String ime;

    @Column(name = "prezime", nullable = false)
    private String prezime;

    @Column(name = "uloga1", length = 6, nullable = false)
    private String uloga1;

    @Column(name = "uloga2", length = 6)
    private String uloga2;

    // Getteri i setteri
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

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getUloga1() {
        return uloga1;
    }

    public void setUloga1(String uloga1) {
        this.uloga1 = uloga1;
    }

    public String getUloga2() {
        return uloga2;
    }

    public void setUloga2(String uloga2) {
        this.uloga2 = uloga2;
    }

}
