package com.uzadnjitren.eskolskakomunikacija.repository;

import com.uzadnjitren.eskolskakomunikacija.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Login, Login.LoginId> {
    // Metoda za pronalaženje korisnika po emailu i lozinki
    Optional<Login> findByEmailAndLozinka(String email, String lozinka);
    
    // Metoda za pronalaženje korisnika po emailu
    Optional<Login> findByEmail(String email);
    
    // Provjera postoji li korisnik s danim emailom
    boolean existsByEmail(String email);
}
