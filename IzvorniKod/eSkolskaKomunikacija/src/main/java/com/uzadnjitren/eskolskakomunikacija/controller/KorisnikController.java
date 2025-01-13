package com.uzadnjitren.eskolskakomunikacija.controller;

import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import com.uzadnjitren.eskolskakomunikacija.service.KorisnikService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/korisnici")
public class KorisnikController {
    private final KorisnikService korisnikService;

    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }
    @GetMapping
    public ResponseEntity<List<Korisnik>> getAllKorisnici() {
        return ResponseEntity.ok(korisnikService.getAllKorisnici());
    }
    @GetMapping("/ime/{ime}_{prezime}")
    public ResponseEntity<List<Korisnik>> getKorisnikByImeAndPrezime(@PathVariable String ime, @PathVariable String prezime) {
        List <Korisnik> korisnici = korisnikService.getKorisnikByImeAndPrezime(ime,prezime);
        return ResponseEntity.ok(korisnici);
    }
    @GetMapping("/{email}")
    public ResponseEntity<Korisnik> getKorisnikByEmail(@PathVariable String email) {
        Korisnik korisnik = korisnikService.getKorisnikByEmail(email);
        return ResponseEntity.ok(korisnik);
    }

    @PostMapping("/add_zaposlenik")
    public ResponseEntity<Korisnik> addZaposlenik(@RequestBody Korisnik korisnik) {
        Korisnik zaposlenik = korisnikService.addZaposlenik(korisnik);
        return ResponseEntity.created(URI.create("/api/korisnici/"+zaposlenik.getIme()+"_"+zaposlenik.getPrezime())).body(zaposlenik);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Korisnik> updateKorisnik(@PathVariable String email, @RequestBody Korisnik korisnik) {
        return ResponseEntity.ok(korisnikService.updateKorisnik(email,korisnik));
    }
}
