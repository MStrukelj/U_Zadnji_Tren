package com.uzadnjitren.eskolskakomunikacija.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Ucenik {

    @Id
    private Integer JMBAG;

    private String OIB;

    @Column(name = "datrod") // Mala slova jer PostgreSQL automatski konvertira u mala slova
    private Date datRod;

    @Column(name = "pbrstan")
    private Integer pbrStan;

    @Column(name = "pbrrod")
    private Integer pbrRod;

    private String email;
    private String lozinka;

    @ManyToOne
    @JoinColumn(name = "pbrstan", insertable = false, updatable = false)
    private Mjesto mjestoStanovanja;

    @ManyToOne
    @JoinColumn(name = "pbrrod", insertable = false, updatable = false)
    private Mjesto mjestoRodenja;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "email", referencedColumnName = "email", insertable = false, updatable = false),
            @JoinColumn(name = "lozinka", referencedColumnName = "lozinka", insertable = false, updatable = false)
    })
    private Korisnik korisnik;


    // Getteri za sva polja
    public Integer getJMBAG() { return JMBAG; }
    public String getOIB() { return OIB; }
    public Date getDatRod() { return datRod; }
    public Integer getPbrStan() { return pbrStan; }
    public Integer getPbrRod() { return pbrRod; }
    public String getEmail() { return email; }
    public String getLozinka() { return lozinka; }

    public Mjesto getMjestoStanovanja() { return mjestoStanovanja; }
    public Mjesto getMjestoRodenja() { return mjestoRodenja; }

    // Setteri za sva polja
    public void setJMBAG(Integer JMBAG) { this.JMBAG = JMBAG; }
    public void setOIB(String OIB) { this.OIB = OIB; }
    public void setDatRod(Date datRod) { this.datRod = datRod; }
    public void setPbrStan(Integer pbrStan) { this.pbrStan = pbrStan; }
    public void setPbrRod(Integer pbrRod) { this.pbrRod = pbrRod; }
    public void setEmail(String email) { this.email = email; }
    public void setLozinka(String lozinka) { this.lozinka = lozinka; }

    public void setMjestoStanovanja(Mjesto mjestoStanovanja) { this.mjestoStanovanja = mjestoStanovanja; }
    public void setMjestoRodenja(Mjesto mjestoRodenja) { this.mjestoRodenja = mjestoRodenja; }
}
