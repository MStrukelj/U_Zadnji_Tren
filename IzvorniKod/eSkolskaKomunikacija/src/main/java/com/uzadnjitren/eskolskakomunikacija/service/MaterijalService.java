package com.uzadnjitren.eskolskakomunikacija.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterijalService {

    private final Storage storage;
    private final String bucketName;

    // Konstruktor za inicijalizaciju Google Cloud Storage servisa i naziv bucketa
    public MaterijalService(@Value("${google.cloud.storage.bucket-name}") String bucketName) {
        this.storage = StorageOptions.getDefaultInstance().getService();
        this.bucketName = bucketName;
    }

    // Metoda za dohvacanje URL-ova materijala unutar foldera određenog predmeta
    public List<String> listMaterialsBySubjectFolder(String subjectFolder) {
        List<String> materialUrls = new ArrayList<>();
        Bucket bucket = storage.get(bucketName);

        // Provjera je li bucket pronadjen
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
}
