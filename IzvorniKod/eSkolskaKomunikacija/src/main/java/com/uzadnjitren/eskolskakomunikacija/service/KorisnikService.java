package com.uzadnjitren.eskolskakomunikacija.service;

import com.uzadnjitren.eskolskakomunikacija.exception.KorisnikCRUDException;
import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import com.uzadnjitren.eskolskakomunikacija.repository.KorisnikRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.NastavnikRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KorisnikService {
    
    private final KorisnikRepository korisnikRepository;

    public static List<String> getNullOrEmptyFields(Korisnik k) {
        List<String> nullOrEmptyFields = new ArrayList<>();
        if(k == null) throw new KorisnikCRUDException("Korisnik nema upisanih podataka.",HttpStatus.FORBIDDEN);
        Field[] fields = k.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try{
                Object value = field.get((Object) k);
                if (value == null || (value instanceof String && ((String) value).isEmpty() )) {
                    if(!field.getName().equals("uloga2"))
                        nullOrEmptyFields.add(field.getName());
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        return nullOrEmptyFields;
    }

    @Autowired
    public KorisnikService(KorisnikRepository korisnikRepository) {
        this.korisnikRepository = korisnikRepository;
    }
    
    public Optional<Korisnik> findByEmail(String email) {
        return korisnikRepository.findById(email);
    }

    public List<Korisnik> getKorisnikByImeAndPrezime(String ime, String prezime) {
        List<Korisnik> korisnici= korisnikRepository.findByImeAndPrezime(ime,prezime);
        if (korisnici.isEmpty())
            throw  new KorisnikCRUDException("Korisnik s imenom i prezimenom:"+ime+" "+prezime+" nije pronađen.", HttpStatus.NOT_FOUND);
        return korisnici;
    }
    public List<Korisnik> getAllKorisnici() {
        return korisnikRepository.findAll();
    }

    public Korisnik addZaposlenik(Korisnik zaposlenik) {
        System.out.println(KorisnikService.getNullOrEmptyFields(zaposlenik));
        if (!KorisnikService.getNullOrEmptyFields(zaposlenik).isEmpty()) {
            throw new KorisnikCRUDException("Zaposleniku nisu unesena obavezna polja: " +
                    String.join(", ", KorisnikService.getNullOrEmptyFields(zaposlenik)) + ".",HttpStatus.FORBIDDEN);
        }
        else if(zaposlenik.getUloga1().equals("S") || (!zaposlenik.getUloga2().isEmpty() && zaposlenik.getUloga2().equals("S")))
            throw new KorisnikCRUDException("Zaposlenik ne smije imati ulogu učenika.", HttpStatus.FORBIDDEN);
        else if (korisnikRepository.existsKorisnikByEmail(zaposlenik.getEmail()))
            throw new KorisnikCRUDException("Zaposlenik treba imati jedinstvenu email adresu.", HttpStatus.FORBIDDEN);
        return korisnikRepository.save(zaposlenik);
    }

    public Korisnik getKorisnikByEmail(String email) {
         return korisnikRepository.findById(email).orElseThrow(
                () -> new KorisnikCRUDException("Korisnik s email adresom:"+email+" nije pronađen.", HttpStatus.NOT_FOUND));
    }

    public Korisnik updateKorisnik(String email, Korisnik korisnik) {
        Korisnik korisnik_email = korisnikRepository.findById(email).orElseThrow(
                () -> new KorisnikCRUDException("Korisnik s email adresom:"+email+" nije pronađen.", HttpStatus.NOT_FOUND));
        if(!korisnik.getEmail().equals(email))
            throw new KorisnikCRUDException("Mijenjanje email adrese nije dopušteno.", HttpStatus.FORBIDDEN);
        else if(korisnik.getUloga1().equals("S") && korisnik.getUloga2() != null && !korisnik.getUloga2().isEmpty())
            throw new KorisnikCRUDException("Korisnik koji je student ne smije imati drugu ulogu.", HttpStatus.FORBIDDEN);
        else if (korisnik_email.getUloga1().equals("S") && korisnik.getUloga2() != null && !korisnik.getUloga1().equals("S"))
            throw new KorisnikCRUDException("Uloga se ne smije mijenjati iz studenta u ulogu koja pripada nastavnom osoblju.", HttpStatus.FORBIDDEN);
        else if (korisnik.getUloga2() != null && korisnik.getUloga2().equals("S")) {
            throw new KorisnikCRUDException("Korisnik ne smije istovremeno imati uloge nastavnog osoblja i studenta.",HttpStatus.FORBIDDEN);
        }
        return korisnikRepository.save(korisnik);
    }

    public Korisnik deleteKorisnik(String email) {
        Korisnik korisnik = korisnikRepository.findById(email).orElseThrow(
                () -> new KorisnikCRUDException("Korisnik s email adresom:"+email+" nije pronađen.", HttpStatus.NOT_FOUND));
        korisnikRepository.delete(korisnik);
        return korisnik;
    }
}
