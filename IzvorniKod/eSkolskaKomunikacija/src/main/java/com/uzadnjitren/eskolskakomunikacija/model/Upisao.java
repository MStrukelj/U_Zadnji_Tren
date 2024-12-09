package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "upisao")
@IdClass(Upisao.UpisaoId.class)
public class Upisao {

    @Id
    @Column(name = "oznraz")
    private String oznRaz;

    @Id
    @Column(name = "JMBAG")
    private Integer jmbag;

    @ManyToOne
    @JoinColumn(name = "JMBAG", referencedColumnName = "JMBAG", insertable = false, updatable = false)
    private Ucenik ucenik;

    @ManyToOne
    @JoinColumn(name = "oznraz", referencedColumnName = "oznraz", insertable = false, updatable = false)
    private Razred razred;

    public static class UpisaoId implements Serializable {
        private String oznRaz;
        private Integer jmbag;

        public UpisaoId() {}

        public UpisaoId(String oznRaz, Integer jmbag) {
            this.oznRaz = oznRaz;
            this.jmbag = jmbag;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            UpisaoId upisaoId = (UpisaoId) o;
            return Objects.equals(oznRaz, upisaoId.oznRaz) &&
                    Objects.equals(jmbag, upisaoId.jmbag);
        }

        @Override
        public int hashCode() {
            return Objects.hash(oznRaz, jmbag);
        }
    }

    // Getters and Setters
    public String getOznRaz() {
        return oznRaz;
    }

    public void setOznRaz(String oznRaz) {
        this.oznRaz = oznRaz;
    }

    public Integer getJmbag() {
        return jmbag;
    }

    public void setJmbag(Integer jmbag) {
        this.jmbag = jmbag;
    }

    public Ucenik getUcenik() {
        return ucenik;
    }

    public void setUcenik(Ucenik ucenik) {
        this.ucenik = ucenik;
    }

    public Razred getRazred() {
        return razred;
    }

    public void setRazred(Razred razred) {
        this.razred = razred;
    }
}
