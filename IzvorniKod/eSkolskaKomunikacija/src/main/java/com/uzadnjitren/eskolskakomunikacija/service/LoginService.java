package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.model.Login;
import com.uzadnjitren.eskolskakomunikacija.repository.LoginRepository;
import com.uzadnjitren.eskolskakomunikacija.exception.InvalidLoginException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class LoginService {

    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    /**
     * Autentificira korisnika na temelju email-a i lozinke
     * 
     * @param email email korisnika
     * @param lozinka lozinka korisnika
     * @return Optional<Login> koji sadrži podatke o korisniku ako je autentifikacija uspješna
     */
    public Optional<Login> authenticateUser(String email, String lozinka) {
        return loginRepository.findByEmailAndLozinka(email, lozinka);
    }

    /**
     * Provjerava postoji li korisnik s navedenim email-om
     * 
     * @param email email za provjeru
     * @return true ako korisnik postoji, false ako ne postoji
     */
    public boolean emailExists(String email) {
        return loginRepository.existsByEmail(email);
    }

    /**
     * Dohvaća korisnika po email-u
     * 
     * @param email email korisnika
     * @return Optional<Login> koji sadrži podatke o korisniku ako postoji
     */
    public Optional<Login> findByEmail(String email) {
        return loginRepository.findByEmail(email);
    }

    /**
     * Dohvaća sve podatke o korisniku uključujući i upisane razrede
     * 
     * @param email email korisnika
     * @param lozinka lozinka korisnika
     * @return Optional<Login> koji sadrži sve podatke o korisniku, uključujući upisane razrede
     */
    public Optional<Login> getFullUserData(String email, String lozinka) {
        Optional<Login> loginOptional = loginRepository.findByEmailAndLozinka(email, lozinka);
        
        // Ako korisnik postoji, Hibernate će automatski učitati upisane razrede zbog @OneToMany veze
        return loginOptional;
    }

    /**
     * Provjerava je li korisnik student (ima ulogu 'S')
     * 
     * @param login objekt korisnika
     * @return true ako je korisnik student, false ako nije
     */
    public boolean isStudent(Login login) {
        return "S".equals(login.getUloga1()) || "S".equals(login.getUloga2());
    }

    /**
     * Provjerava je li korisnik nastavnik (ima ulogu 'N')
     * 
     * @param login objekt korisnika
     * @return true ako je korisnik nastavnik, false ako nije
     */
    public boolean isTeacher(Login login) {
        return "N".equals(login.getUloga1()) || "N".equals(login.getUloga2());
    }

    /**
     * Provjerava je li korisnik administrator (ima ulogu 'A')
     * 
     * @param login objekt korisnika
     * @return true ako je korisnik administrator, false ako nije
     */
    public boolean isAdmin(Login login) {
        return "A".equals(login.getUloga1()) || "A".equals(login.getUloga2());
    }

    /**
     * Rukovanje iznimkama prilikom autentifikacije
     * 
     * @param email email korisnika
     * @param lozinka lozinka korisnika
     * @return Login objekt ako je autentifikacija uspješna
     * @throws InvalidLoginException ako autentifikacija nije uspješna
     */
    public Login authenticate(String email, String lozinka) throws InvalidLoginException {
        if (email == null || email.trim().isEmpty()) {
            throw new InvalidLoginException("Email ne može biti prazan");
        }

        if (lozinka == null || lozinka.trim().isEmpty()) {
            throw new InvalidLoginException("Lozinka ne može biti prazna");
        }

        return loginRepository.findByEmailAndLozinka(email, lozinka)
            .orElseThrow(() -> new InvalidLoginException("Neispravni podaci za prijavu"));
    }
}
