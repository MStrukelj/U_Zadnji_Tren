package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

@Entity
public class Nastavnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    @Column(name = "sifnast") // Točno ime stupca u bazi
    private Integer sifNast;

    @Column(name = "email") // Ime stupca u bazi
    private String email;

    @Column(name = "lozinka") // Ime stupca u bazi
    private String lozinka;

    // Getteri i setteri
    public Integer getSifNast() {
        return sifNast;
    }

    public void setSifNast(Integer sifNast) {
        this.sifNast = sifNast;
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
}
