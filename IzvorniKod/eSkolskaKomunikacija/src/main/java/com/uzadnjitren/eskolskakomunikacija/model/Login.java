package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "KORISNIK")
@IdClass(Login.LoginId.class)
public class Login {
    
    @Id
    @Column(name = "email")
    private String email;
    
    @Id
    @Column(name = "lozinka")
    private String lozinka;
    
    @Column(name = "uloga1", length = 6)
    private String uloga1;
    
    @Column(name = "uloga2", length = 6)
    private String uloga2;
    
    // Kompozitni ključ mora biti implementiran kao zasebna klasa
    public static class LoginId implements Serializable {
        private String email;
        private String lozinka;
        
        public LoginId() {}
        
        public LoginId(String email, String lozinka) {
            this.email = email;
            this.lozinka = lozinka;
        }
        
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            LoginId loginId = (LoginId) o;
            return Objects.equals(email, loginId.email) &&
                   Objects.equals(lozinka, loginId.lozinka);
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(email, lozinka);
        }
    }
    
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
