package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

@Entity
public class Nastavnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sifNast;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String lozinka;

    // Getters and Setters
    public Integer getSifNast() { return sifNast; }
    public void setSifNast(Integer sifNast) { this.sifNast = sifNast; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLozinka() { return lozinka; }
    public void setLozinka(String lozinka) { this.lozinka = lozinka; }
}
