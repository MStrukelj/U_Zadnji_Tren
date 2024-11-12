package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinColumn;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "upisao")
@IdClass(Upisao.UpisaoId.class)
public class Upisao {
    
    @Id
    @Column(name = "oznRaz")
    private String oznRaz;
    
    @Id
    @Column(name = "JMBAG")
    private Integer jmbag;
    
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "email", referencedColumnName = "email"),
        @JoinColumn(name = "lozinka", referencedColumnName = "lozinka")
    })
    private Login login;
    
    // Kompozitni ključ
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
    
    // Getteri i setteri
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
    
    public Login getLogin() {
        return login;
    }
    
    public void setLogin(Login login) {
        this.login = login;
    }
}
