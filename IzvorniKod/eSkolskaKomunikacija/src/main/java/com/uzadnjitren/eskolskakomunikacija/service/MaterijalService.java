package com.uzadnjitren.eskolskakomunikacija.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobInfo;
import com.uzadnjitren.eskolskakomunikacija.model.Materijal;
import com.uzadnjitren.eskolskakomunikacija.model.Nastavnik;
import com.uzadnjitren.eskolskakomunikacija.model.Predmet;
import com.uzadnjitren.eskolskakomunikacija.repository.MaterijalRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.NastavnikRepository;
import com.uzadnjitren.eskolskakomunikacija.repository.PredmetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterijalService {

    private final Storage storage;
    private final String bucketName;
    private final PredmetRepository predmetRepository;
    private final MaterijalRepository materijalRepository;
    private final NastavnikRepository nastavnikRepository;

    // Konstruktor za inicijalizaciju servisa i repozitorija
    @Autowired
    public MaterijalService(
            @Value("${google.cloud.storage.bucket-name}") String bucketName,
            PredmetRepository predmetRepository,
            MaterijalRepository materijalRepository,
            NastavnikRepository nastavnikRepository) {
        this.storage = StorageOptions.getDefaultInstance().getService();
        this.bucketName = bucketName;
        this.predmetRepository = predmetRepository;
        this.materijalRepository = materijalRepository;
        this.nastavnikRepository = nastavnikRepository;
    }

    // Metoda za dohvaćanje URL-ova materijala unutar foldera određenog predmeta
    public List<String> listMaterialsBySubjectFolder(String subjectFolder) {
        List<String> materialUrls = new ArrayList<>();
        Bucket bucket = storage.get(bucketName);

        // Provjera je li bucket pronađen
        if (bucket == null) {
            return materialUrls;
        }

        String prefix = subjectFolder + "/";

        // Iteracija kroz sve objekte u bucketu koji odgovaraju prefiksu
        for (Blob blob : bucket.list(Storage.BlobListOption.prefix(prefix)).iterateAll()) {
            if (!blob.getName().endsWith("/")) {
                // Konstruiranje javnog URL-a
                String fileUrl = String.format("https://storage.googleapis.com/%s/%s", bucketName, blob.getName());
                materialUrls.add(fileUrl);
            }
        }

        return materialUrls;
    }

    // Metoda za upload materijala u bucket i spremanje u bazu
    public String uploadMaterijal(Integer sifPredmet, MultipartFile file) throws Exception {
        Bucket bucket = storage.get(bucketName);

        if (bucket == null) {
            throw new Exception("Bucket not found: " + bucketName);
        }

        String folderPath = sifPredmet + "/";
        String fileName = folderPath + file.getOriginalFilename();

        // Upload datoteke u Google Cloud Storage
        BlobInfo blobInfo = BlobInfo.newBuilder(bucket.getName(), fileName).build();
        bucket.create(blobInfo.getName(), file.getBytes(), file.getContentType());

        // Generiranje javnog URL-a za učitani materijal
        String fileUrl = String.format("https://storage.googleapis.com/%s/%s", bucketName, fileName);

        // Dohvati predmet prema šifri
        Predmet predmet = predmetRepository.findById(sifPredmet)
                .orElseThrow(() -> new Exception("Predmet not found: " + sifPredmet));

        // Dohvati nastavnika (postavi defaultnog ako nije specificiran)
        Nastavnik nastavnik = nastavnikRepository.findById(1) // Poziv na instanci repozitorija
                .orElseThrow(() -> new Exception("Nastavnik not found"));

        // Kreiraj instancu materijala
        Materijal materijal = new Materijal();
        materijal.setNazMaterijal(file.getOriginalFilename());
        materijal.setUrl(fileUrl);
        materijal.setBrPregleda(0);
        materijal.setBrSkidanja(0);
        materijal.setPredmet(predmet);
        materijal.setNastavnik(nastavnik);

        // Spremi materijal u bazu
        materijalRepository.save(materijal);

        return fileUrl;
    }
}
