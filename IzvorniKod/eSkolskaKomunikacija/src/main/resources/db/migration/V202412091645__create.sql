CREATE TABLE MJESTO
(
    pbr INT NOT NULL,
    nazMjesto VARCHAR(20) NOT NULL,
    PRIMARY KEY (pbr)
);

CREATE TABLE RAZRED
(
    oznRaz VARCHAR(10) NOT NULL,
    smjer VARCHAR(1),
    godina INT,
    kapacitet INT NOT NULL,
    izboran VARCHAR(20),
    fakultativan VARCHAR(20),
    PRIMARY KEY (oznRaz),
    CONSTRAINT checkoznRaz CHECK(CHAR_LENGTH(oznRaz) < 10)
);

CREATE TABLE PREDMET
(
    sifPredmet INT NOT NULL,
    nazPred VARCHAR(50) NOT NULL,
    brSatiTjedno INT NOT NULL,
    izboran BOOLEAN NOT NULL,
    fakultativan BOOLEAN NOT NULL,
    PRIMARY KEY (sifPredmet),
    UNIQUE(nazPred)
);

CREATE UNIQUE INDEX idx_nazPred ON PREDMET(nazPred);

CREATE TABLE UCIONICA
(
    oznUcionica VARCHAR(20) NOT NULL,
    kapacitet INT NOT NULL,
    PRIMARY KEY (oznUcionica)
);

CREATE TABLE KORISNIK
(
    email VARCHAR NOT NULL,
    lozinka VARCHAR NOT NULL,
    ime VARCHAR NOT NULL,
    prezime VARCHAR NOT NULL,
    uloga1 VARCHAR(6) NOT NULL,
    uloga2 VARCHAR(6),
    PRIMARY KEY (email, lozinka),
    CONSTRAINT checkUloga1 CHECK(CHAR_LENGTH(uloga1) <= 6),
    CONSTRAINT checkUloga2 CHECK(CHAR_LENGTH(uloga2) <= 6)
);

CREATE TABLE UCENIK
(
    JMBAG INT NOT NULL,
    OIB VARCHAR(11) NOT NULL,
    datRod DATE NOT NULL,
    pbrStan INT NOT NULL,
    pbrRod INT NOT NULL,
    email VARCHAR NOT NULL,
    lozinka VARCHAR NOT NULL,
    PRIMARY KEY (JMBAG),
    FOREIGN KEY (pbrStan) REFERENCES MJESTO(pbr) ON DELETE CASCADE,
    FOREIGN KEY (pbrRod) REFERENCES MJESTO(pbr) ON DELETE CASCADE,
    FOREIGN KEY (email, lozinka) REFERENCES KORISNIK(email, lozinka) ON DELETE CASCADE,
    UNIQUE (OIB),
    UNIQUE (email, lozinka),
    CONSTRAINT checkOIB CHECK(CHAR_LENGTH(OIB) = 11)
);

CREATE TABLE NASTAVNIK
(
    sifNast INT NOT NULL,
    email VARCHAR NOT NULL,
    lozinka VARCHAR NOT NULL,
    PRIMARY KEY (sifNast),
    FOREIGN KEY (email, lozinka) REFERENCES KORISNIK(email, lozinka) ON DELETE CASCADE,
    UNIQUE (email, lozinka)
);

CREATE SEQUENCE sifnast_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1;
ALTER TABLE nastavnik
    ALTER COLUMN sifNast SET DEFAULT nextval('sifnast_seq');

CREATE TABLE PREDMETRAZRED
(
    oznRaz VARCHAR(10) NOT NULL,
    sifPredmet INT NOT NULL,
    sifNast INT NOT NULL,
    PRIMARY KEY (oznRaz, sifPredmet),
    FOREIGN KEY (oznRaz) REFERENCES RAZRED(oznRaz) ON DELETE CASCADE,
    FOREIGN KEY (sifPredmet) REFERENCES PREDMET(sifPredmet) ON DELETE CASCADE,
    FOREIGN KEY (sifNast) REFERENCES NASTAVNIK(sifNast) ON DELETE CASCADE,
    CONSTRAINT checkoznRaz CHECK(CHAR_LENGTH(oznRaz) < 10)
);

CREATE TABLE UPISAO
(
    oznRaz VARCHAR(10) NOT NULL,
    JMBAG INT NOT NULL,
    PRIMARY KEY (oznRaz, JMBAG),
    FOREIGN KEY (oznRaz) REFERENCES RAZRED(oznRaz) ON DELETE CASCADE,
    FOREIGN KEY (JMBAG) REFERENCES UCENIK(JMBAG) ON DELETE CASCADE,
    CONSTRAINT checkoznRaz CHECK(CHAR_LENGTH(oznRaz) < 10)
);

CREATE TABLE KOMPATIBILAN
(
    oznUcionica VARCHAR(20) NOT NULL,
    sifPredmet INT NOT NULL,
    PRIMARY KEY (oznUcionica, sifPredmet),
    FOREIGN KEY (oznUcionica) REFERENCES UCIONICA(oznUcionica) ON DELETE CASCADE,
    FOREIGN KEY (sifPredmet) REFERENCES PREDMET(sifPredmet) ON DELETE CASCADE
);

CREATE TABLE PREDAVANJE
(
    vrijemePoc TIME NOT NULL,
    vrijemeKraj TIME NOT NULL,
    danUTjednu VARCHAR(20) NOT NULL,
    oznUcionica VARCHAR(20) NOT NULL,
    oznRaz VARCHAR(10) NOT NULL,
    sifPredmet INT NOT NULL,
    PRIMARY KEY (vrijemePoc, danUTjednu, oznRaz, sifPredmet),
    FOREIGN KEY (oznUcionica) REFERENCES UCIONICA(oznUcionica) ON DELETE CASCADE,
    FOREIGN KEY (oznRaz, sifPredmet) REFERENCES PREDMETRAZRED(oznRaz, sifPredmet) ON DELETE CASCADE,
    UNIQUE (vrijemeKraj, danUTjednu, oznRaz, sifPredmet)
);

CREATE TABLE MATERIJAL
(
    sifMaterijal INT NOT NULL,
    nazMaterijal VARCHAR(50) NOT NULL,
    brPregleda INT NOT NULL,
    brSkidanja INT NOT NULL,
    URL VARCHAR NOT NULL,
    sifPredmet INT NOT NULL,
    sifNast INT NOT NULL,
    PRIMARY KEY (sifMaterijal),
    FOREIGN KEY (sifPredmet) REFERENCES PREDMET(sifPredmet) ON DELETE CASCADE,
    FOREIGN KEY (sifNast) REFERENCES NASTAVNIK(sifNast) ON DELETE CASCADE
);

CREATE TABLE POTVRDA
(
    vrsta VARCHAR(20) NOT NULL,
    brSkidanja INT NOT NULL,
    JMBAG INT NOT NULL,
    PRIMARY KEY (vrsta, JMBAG),
    FOREIGN KEY (JMBAG) REFERENCES UCENIK(JMBAG) ON DELETE CASCADE
);