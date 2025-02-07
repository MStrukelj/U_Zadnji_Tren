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
     * @param email   email korisnika
     * @param lozinka lozinka korisnika
     * @return Optional<Login> koji sadrži podatke o korisniku ako je
     *         autentifikacija uspješna
     */
    public Optional<Login> authenticateUser(String email, String lozinka) {
        System.out.println("Attempting to authenticate user with email: " + email);
        Optional<Login> result = loginRepository.findByEmailAndLozinka(email, lozinka);
        System.out.println("Authentication result: " + (result.isPresent() ? "User found" : "User not found"));
        return result;
    }

    /**
     * Provjerava postoji li korisnik s navedenim email-om
     *
     * @param email email za provjeru
     * @return true ako korisnik postoji, false ako ne postoji
     */
    public boolean emailExists(String email) {
        System.out.println("Checking if email exists: " + email);
        boolean exists = loginRepository.existsByEmail(email);
        System.out.println("Email exists: " + exists);
        return exists;
    }

    /**
     * Dohvaća korisnika po email-u
     *
     * @param email email korisnika
     * @return Optional<Login> koji sadrži podatke o korisniku ako postoji
     */
    public Optional<Login> findByEmail(String email) {
        System.out.println("Finding user by email: " + email);
        Optional<Login> result = loginRepository.findByEmail(email);
        System.out.println("Find by email result: " + (result.isPresent() ? "User found" : "User not found"));
        return result;
    }

    /**
     * Dohvaća sve podatke o korisniku uključujući i upisane razrede
     *
     * @param email   email korisnika
     * @param lozinka lozinka korisnika
     * @return Optional<Login> koji sadrži sve podatke o korisniku, uključujući
     *         upisane razrede
     */
    public Optional<Login> getFullUserData(String email, String lozinka) {
        Optional<Login> loginOptional = loginRepository.findByEmailAndLozinka(email, lozinka);

        // Ako korisnik postoji, Hibernate će automatski učitati upisane razrede zbog
        // @OneToMany veze
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
     * @param email   email korisnika
     * @param lozinka lozinka korisnika
     * @return Login objekt ako je autentifikacija uspješna
     * @throws InvalidLoginException ako autentifikacija nije uspješna
     */
    public Login authenticate(String email, String lozinka) throws InvalidLoginException {
        System.out.println("Starting authentication process for email: " + email);
        System.out.println("Password length: " + (lozinka != null ? lozinka.length() : "null"));

        if (email == null || email.trim().isEmpty()) {
            System.out.println("Authentication failed: Email is empty");
            throw new InvalidLoginException("Email ne može biti prazan");
        }

        if (lozinka == null || lozinka.trim().isEmpty()) {
            System.out.println("Authentication failed: Password is empty");
            throw new InvalidLoginException("Lozinka ne može biti prazna");
        }

        try {
            // First check if the email exists
            boolean emailExists = loginRepository.existsByEmail(email);
            System.out.println("Email exists in database: " + emailExists);

            if (!emailExists) {
                System.out.println("Authentication failed: Email not found in database");
                throw new InvalidLoginException("Neispravni podaci za prijavu");
            }

            // Try to find user by email first
            Optional<Login> userByEmail = loginRepository.findByEmail(email);
            if (userByEmail.isPresent()) {
                System.out.println("Found user by email. Stored password length: " +
                        (userByEmail.get().getLozinka() != null ? userByEmail.get().getLozinka().length() : "null"));
            }

            return loginRepository.findByEmailAndLozinka(email, lozinka)
                    .orElseThrow(() -> {
                        System.out.println("Authentication failed: Invalid credentials - password mismatch");
                        return new InvalidLoginException("Neispravni podaci za prijavu");
                    });
        } catch (Exception e) {
            System.out.println("Authentication failed with exception: " + e.getMessage());
            e.printStackTrace();
            throw new InvalidLoginException("Greška prilikom provjere podataka");
        }
    }

    public Integer getJmbagByEmail(String email) {
        // Metoda za dohvaćanje JMBAG-a po emailu ako je korisnik ucenik
        return loginRepository.findJmbagByEmail(email).orElseThrow(
                () -> new InvalidLoginException("Nije moguće pronaći JMBAG za učenika s emailom: " + email));
    }

}
