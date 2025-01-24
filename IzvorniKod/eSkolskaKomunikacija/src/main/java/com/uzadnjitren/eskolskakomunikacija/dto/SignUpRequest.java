package com.uzadnjitren.eskolskakomunikacija.dto;

public class SignUpRequest {
    private String email;
    private String lozinka;
    private String ime;
    private String prezime;
    private String smjer;
    private String izborniPredmet;

    // Getters and setters
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

    public String getSmjer() {
        return smjer;
    }

    public void setSmjer(String smjer) {
        this.smjer = smjer;
    }

    public String getIzborniPredmet() {
        return izborniPredmet;
    }

    public void setIzborniPredmet(String izborniPredmet) {
        this.izborniPredmet = izborniPredmet;
    }
}