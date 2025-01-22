package com.uzadnjitren.eskolskakomunikacija.service;

import com.lowagie.text.pdf.BaseFont;
import com.uzadnjitren.eskolskakomunikacija.model.Korisnik;
import com.uzadnjitren.eskolskakomunikacija.model.Potvrda;
import com.uzadnjitren.eskolskakomunikacija.model.Razred;
import com.uzadnjitren.eskolskakomunikacija.model.Ucenik;
import com.uzadnjitren.eskolskakomunikacija.repository.KorisnikRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.PotvrdaRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.UcenikRepository;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.Year;
import java.util.Date;
import java.util.Optional;

@Service
public class PdfGeneratorService {
    private final TemplateEngine templateEngine;
    private final UcenikRepository ucenikRepository;
    private final KorisnikRepository korisnikRepository;
    private final PotvrdaRepository potvrdaRepository;

    public PdfGeneratorService(TemplateEngine templateEngine, UcenikRepository ucenikRepository, KorisnikRepository korisnikRepository, PotvrdaRepository potvrdaRepository) {
        this.templateEngine = templateEngine;
        this.ucenikRepository = ucenikRepository;
        this.korisnikRepository = korisnikRepository;
        this.potvrdaRepository = potvrdaRepository;
    }
    public ByteArrayInputStream generatePDF(String vrsta,String email) {
        Ucenik ucenik = ucenikRepository.findByEmail(email).get();
        Korisnik ucenikKorisnik = korisnikRepository.findByEmail(email);
        Razred razred = ucenikRepository.findMainRazredByJmbag(ucenik.getJMBAG()).get();
        Korisnik usDjelatnik = korisnikRepository.findDjelatnikUS().get();
        String html = "";

        Context context = new Context();
        context.setVariable("ime", ucenikKorisnik.getIme()+" "+ ucenikKorisnik.getPrezime());
        context.setVariable("razred", razred.getOznRaz());
        context.setVariable("email", usDjelatnik.getEmail());
        context.setVariable("oib", ucenik.getOIB());
        context.setVariable("skolskaGodina", Year.now().getValue()-1 +"./"+Year.now().getValue()+".");
        context.setVariable("datumIzdavanja", new Date());
        context.setVariable("djelatnik",usDjelatnik.getIme()+" "+ usDjelatnik.getPrezime());

        if(vrsta.equals("I")){
             html = templateEngine.process("potvrda_izostanak", context);
        }
        else if(vrsta.equals("V")) {
            html = templateEngine.process("potvrda_volontiranje", context);
        }
        else {
            html = templateEngine.process("potvrda_status_ucenika", context);
        }
        Optional <Potvrda> optPotvrda= potvrdaRepository.findPotvrdaByJMBAGAndVrsta(ucenik.getJMBAG(),vrsta);
        Potvrda potvrda;
        if(optPotvrda.isPresent()){
            potvrda = optPotvrda.get();
            Integer brSkidanja = potvrda.getBrskidanja()+1;
            potvrda.setBrskidanja(brSkidanja);
        }
        else
            potvrda = new Potvrda(vrsta,ucenik.getJMBAG(),1);

        potvrdaRepository.save(potvrda);
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.getFontResolver().addFont("src/main/resources/potvrda-resource/arial.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Greška pri generiranju PDF-a: " + e.getMessage(), e);
        }
    }
}
