DO $$
DECLARE

ime_array TEXT[] := ARRAY[
        'Lucija', 'Luka', 'Ana', 'Ema', 'Petra', 'Ivan', 'Lea', 'Nika', 'Sara', 'Dora',
        'Marija', 'Matea', 'Iva', 'Marko', 'Marta', 'David', 'Filip', 'Katarina', 'Laura', 'Antonio',
        'Barbara', 'Ivana', 'Karla', 'Lovro', 'Jakov', 'Lorena', 'Nina', 'Magdalena', 'Nikolina', 'Anamarija',
        'Ena', 'Jana', 'Klara', 'Kristina', 'Lana', 'Lara', 'Leon', 'Martina', 'Borna', 'Bruno',
        'Elena', 'Ivona', 'Josipa', 'Maja', 'Matej', 'Matija', 'Monika', 'Patricija', 'Paula'
    ];

    prezime_array TEXT[] := ARRAY[
        'Horvat', 'Knežević', 'Kovačević', 'Lončar', 'Galić', 'Novak', 'Vuković', 'Brkić', 'Erceg', 'Hranić',
        'Ključarić', 'Kolar', 'Lovrić', 'Malkoč', 'Marković', 'Martinović', 'Matić', 'Petrović', 'Anđelić', 'Babić',
        'Besednik', 'Bilić', 'Biškup', 'Buršić', 'Colić', 'Dodig', 'Dončević', 'Dujmić', 'Fajgl', 'Ferenčević',
        'Filipović', 'Franjković', 'Glavaš', 'Golubić', 'Govorčinović', 'Grgić', 'Halaček', 'Ilčić', 'Iskrić', 'Ivanković',
        'Ivančić', 'Ivković', 'Jakopović', 'Janković', 'Jerković', 'Jerončić', 'Jurković', 'Juzbašić', 'Kadijević'
    ];
    smjer TEXT[] := ARRAY['A','B','C'];
    raz TEXT[] := ARRAY['A','B','C','D','E','F'];

    predmeti TEXT[] := ARRAY['Hrvatski jezik', 'Engleski jezik','Njemački jezik','Latinski jezik', 'Glazbena umjetnost',
    'Likovna umjetnost', 'Psihologija','Logika','Sociologija','Filozofija','Povijest', 'Geografija','Matematika - A',
    'Matematika - B', 'Matematika - C', 'Fizika', 'Kemija','Biologija','Informatika - AC', 'Informatika - B','Politika i gospodarstvo','TZK', 'Etika',
    'Vjeronauk','Njemački jezik DSD', 'Francuski jezik', 'Astronomija'
    ];
    sati INT[] := ARRAY[4,3,2,2,1,1,1,1,1,2,2,2,4,5,6,3,2,2,2,3,1,2,1,1,2,2,2];

    pred_zaj TEXT[] :=ARRAY['Hrvatski jezik', 'Engleski jezik','Povijest','Geografija','Fizika','Kemija','Biologija','TZK'];
    pred_A TEXT[] := ARRAY['Njemački jezik', 'Matematika - A', 'Informatika - AC'];
    pred_B TEXT[] := ARRAY['Matematika - B', 'Informatika - B'];
    pred_C TEXT[] := ARRAY['Matematika - C', 'Informatika - AC'];
    pred_12 TEXT[] := ARRAY['Latinski jezik','Glazbena umjetnost','Likovna umjetnost'];
    pred_3 TEXT[] := ARRAY['Psihologija','Logika','Sociologija'];
    pred_4 TEXT[]:= ARRAY['Filozofija','Politika i gospodarstvo'];
    dvorane TEXT[]:= ARRAY['U1','U2','U3','U4','U5','B','K','GP1','GP2','T','I1','I2','M1','M2','J1','J2'];

    i INT := 1;
    oib BIGINT := 12345678910;
    datRod DATE;
    ime TEXT;
    prezime TEXT;
    email TEXT;
    lozinka TEXT;
    pbrStan INT;
    pbrRod INT;
	uc RECORD;
	god INT :=1;
	smj TEXT;
    ra RECORD;
	nast RECORD;
BEGIN
    -- punjenje relacije korisnik s nasumično generiranim podacima
    WHILE i <= 521 LOOP
        ime := ime_array[ceil(random() * array_length(ime_array, 1))];
        prezime := prezime_array[ceil(random() * array_length(prezime_array, 1))];

        email := lower(ime || '.' || translate(prezime,'čćđšžČĆĐŠŽ', 'ccdsszCCDSSZ') || i || '@skole.hr');
        lozinka := lower(left(ime, 1) || translate(prezime,'čćđšžČĆĐŠŽ', 'ccdsszCCDSSZ')  || i);

        IF i = 1 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES ('eskolskakomunikacijamail@gmail.com', lozinka, ime, prezime, 'S');
        ELSIF i>=2 AND i<= 480 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES (email, lozinka, ime, prezime, 'S');
        ELSIF i = 481 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES ('markoknezg@gmail.com', lozinka, ime, prezime, 'N');
        ELSIF i>= 482 AND i<=517 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES (email, lozinka, ime, prezime, 'N');
        ELSIF i = 518 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES (email, lozinka, ime, prezime, 'R');
        ELSIF i = 519 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES (email, lozinka, ime, prezime, 'US');
        ELSIF i = 520 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES ('knezcro@gmail.com', lozinka, ime, prezime, 'SAT');
        ELSIF i = 521 THEN
            INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
            VALUES (email, lozinka, ime, prezime, 'A');
END IF;
        i := i + 1;
END LOOP;

    --punjenje relacije nastavnik
FOR nast in SELECT * FROM korisnik k WHERE k.uloga1 = 'N'
    LOOP
            INSERT INTO nastavnik(sifNast,email,lozinka) VALUES (DEFAULT,nast.email,nast.lozinka);
END LOOP;

    --punjenje relacije mjesto
INSERT INTO mjesto(pbr, nazmjesto) VALUES
                                       (10000, 'Zagreb'),
                                       (10410, 'Velika Gorica'),
                                       (10290, 'Zaprešić'),
                                       (10360, 'Sesvete'),
                                       (49210, 'Zabok'),
                                       (10430, 'Samobor');

i := 1;

    --punjnje relacije ucenik
FOR uc IN
SELECT k.email, k.lozinka FROM korisnik k WHERE uloga1 = 'S'
    LOOP
        datRod := CASE
                     WHEN i <= 120 THEN '2001-04-01'::DATE
                     WHEN i <= 240 THEN '2002-04-01'::DATE
                     WHEN i <= 360 THEN '2003-04-01'::DATE
                     ELSE '2004-04-01'::DATE
END;

SELECT datRod + (RANDOM() * (datRod +'1 year'::interval - datRod)) INTO datRod;

SELECT pbr INTO pbrRod FROM mjesto ORDER BY RANDOM() LIMIT 1;
SELECT pbr INTO pbrStan FROM mjesto ORDER BY RANDOM() LIMIT 1;

INSERT INTO UCENIK(JMBAG, OIB, datRod, pbrRod, pbrStan, email, lozinka)
VALUES (i, OIB, datRod, pbrRod, pbrStan, uc.email, uc.lozinka);

OIB := OIB + 1;
        i := i + 1;
END LOOP;

    --svi razredi osim onih za fakultativne predmete i punjenje relacije upisao učenika koji nisu prvi razred bez izbornih
FOR god IN 1..4 LOOP
        FOR cnt IN 1..6 LOOP
            smj := CASE
                     WHEN cnt IN (1, 2) THEN smjer[1]
                     WHEN cnt IN (3, 4) THEN smjer[2]
                     WHEN cnt IN (5, 6) THEN smjer[3]
END;

INSERT INTO razred(oznRaz, smjer, godina, kapacitet)
VALUES (god::varchar || '.' || raz[cnt], smj, god, 20);

FOR i IN 1..20 LOOP
                    INSERT INTO upisao(oznRaz, JMBAG)
                    VALUES (god::varchar || '.' || raz[cnt], i + 120 *(4 - god)+ (cnt-1) *20);
END LOOP;
END LOOP;

FOR i IN 1..3 LOOP
            INSERT INTO razred(oznRaz, godina, smjer,izboran,kapacitet)
                VALUES (god::varchar  || smjer[i]||'-'||'VJ', god,smjer[i],'Vjeronauk', 20);
INSERT INTO razred(oznRaz, godina,smjer,izboran,kapacitet)
VALUES (god::varchar ||  smjer[i]||'-'||'ET', god,smjer[i],'Etika', 20);
END LOOP;
END LOOP;

    --punjenje upisao s izbornim razredima
FOR ra IN (SELECT up.JMBAG, r.godina, r.smjer FROM upisao up NATURAL JOIN razred r) LOOP
    	IF ra.JMBAG % 2 = 0 THEN
        INSERT INTO upisao(oznRaz, JMBAG)
        VALUES (ra.godina::varchar || ra.smjer || '-VJ', ra.JMBAG);
ELSE
        INSERT INTO upisao(oznRaz, JMBAG)
        VALUES (ra.godina::varchar || ra.smjer || '-ET', ra.JMBAG);
END IF;
END LOOP;


    -- fakultativni razredi
INSERT INTO razred(oznRaz,fakultativan,kapacitet) VALUES ('DSD','Njemački jezik DSD', 40);
INSERT INTO razred(oznRaz,fakultativan,kapacitet) VALUES ('FRA','Francuski jezik', 40);
INSERT INTO razred(oznRaz,fakultativan,kapacitet) VALUES ('ASTR','Astronomija', 40);
i:=1;

    -- punjenje relacije predmet sa svim mogućim predmetima
FOR i in 1..array_length(predmeti,1) LOOP
        INSERT INTO predmet (sifPredmet,nazPred,brSatiTjedno,izboran,fakultativan) VALUES
        (i,predmeti[i],sati[i],CASE WHEN i in (24,25) THEN TRUE ELSE FALSE END ,CASE WHEN i>25 THEN TRUE ELSE FALSE END);
END LOOP;


    --punjenje relacije predmetrazred za obavezne predmete
FOR ra IN (SELECT oznRaz, godina, razred.smjer FROM razred WHERE izboran IS NULL AND fakultativan IS NULL) LOOP
        IF ra.smjer = 'A' THEN
            FOR i IN 1..array_length(pred_A, 1) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_A[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_A[i]));
END LOOP;
        ELSIF ra.smjer = 'B' THEN
            FOR i IN 1..array_length(pred_B, 1) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_B[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_B[i]));
END LOOP;
ELSE
            FOR i IN 1..array_length(pred_C, 1) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_C[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_C[i]));
END LOOP;
END IF;

        IF ra.godina IN (1, 2) THEN
            FOR i IN 1..array_length(pred_12, 1) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_12[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_12[i]));
END LOOP;
        ELSIF ra.godina = 3 THEN
            FOR i IN 1..array_length(pred_3, 1) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_3[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_3[i]));
END LOOP;
ELSE
            FOR i IN 1..array_length(pred_4, 1) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_4[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_4[i]));
END LOOP;
END IF;

FOR i IN 1..array_length(pred_zaj, 1) LOOP
            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_zaj[i]), (SELECT sifPredmet FROM predmet WHERE nazPred = pred_zaj[i]));
END LOOP;
END LOOP;

	    --punjenje relacije predmetrazred za izborne predmete
FOR ra IN (SELECT oznRaz,izboran FROM razred WHERE izboran IS NOT NULL) LOOP
    INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = ra.izboran), (SELECT sifPredmet FROM predmet WHERE nazPred = ra.izboran));
END LOOP;

    --punjenje relacije predmetrazred za fakultativne predmete
FOR ra IN (SELECT oznRaz,fakultativan FROM razred WHERE fakultativan IS NOT NULL) LOOP
    INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = ra.fakultativan), (SELECT sifPredmet FROM predmet WHERE nazPred = ra.fakultativan));
END LOOP;

 --punjenje predmet razred sa ispravnim nastavnicima

 -- MAT1
UPDATE predmetrazred
SET sifNast = 13
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Mat%')
  AND oznRaz like '1%';

--INFO1
UPDATE predmetrazred
SET sifNast = 19
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Info%')
  AND (oznRaz like '1%' OR oznRaz like '2%');

-- MAT2
UPDATE predmetrazred
SET sifNast = 14
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Mat%')
  AND oznRaz like '2%';

-- HRV2
UPDATE predmetrazred
SET sifNast = 28
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Hrv%')
  AND oznRaz like '2%';

-- ENG3
UPDATE predmetrazred
SET sifNast = 29
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Eng%')
  AND oznRaz like '2%';

-- FIZ3
UPDATE predmetrazred
SET sifNast = 30
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Fiz%')
  AND oznRaz like '2%';

--SOCPSHI
UPDATE predmetrazred
SET sifNast = 9
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Psih%');

--FILOLOG
UPDATE predmetrazred
SET sifNast = 8
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Fil%');

--POV2
UPDATE predmetrazred
SET sifNast = 31
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Pov%')
  AND (oznRaz like '3%' OR oznRaz like '4%');

--GEO2
UPDATE predmetrazred
SET sifNast = 32
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Geo%')
  AND (oznRaz like '3%' OR oznRaz like '4%');

-- HRV3
UPDATE predmetrazred
SET sifNast = 33
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Hrv%')
  AND oznRaz like '3%';

-- HRV4
UPDATE predmetrazred
SET sifNast = 34
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Hrv%')
  AND oznRaz like '4%';

-- MAT3
UPDATE predmetrazred
SET sifNast = 15
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Mat%')
  AND oznRaz like '3%';

--BIO2
UPDATE predmetrazred
SET sifNast = 35
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Bio%')
  AND (oznRaz like '3%' OR oznRaz like '4%');

--KEM2
UPDATE predmetrazred
SET sifNast = 36
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Kem%')
  AND (oznRaz like '3%' OR oznRaz like '4%');

-- ENG2
UPDATE predmetrazred
SET sifNast = 37
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Eng%')
  AND oznRaz like '3%';

-- FIZ2
UPDATE predmetrazred
SET sifNast = 27
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Fiz%')
  AND oznRaz like '3%';

--INFO2
UPDATE predmetrazred
SET sifNast = 20
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Info%')
  AND (oznRaz like '3%' OR oznRaz like '4%');

-- MAT4
UPDATE predmetrazred
SET sifNast = 7
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Mat%')
  AND oznRaz like '4%';

-- ENG4
UPDATE predmetrazred
SET sifNast = 10
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Eng%')
  AND oznRaz like '4%';

-- FIZ4
UPDATE predmetrazred
SET sifNast = 26
WHERE sifPredmet IN (SELECT sifPredmet from predmet where predmet.nazPred LIKE 'Fiz%')
  AND oznRaz like '4%';

-- punjenje relacije predmet sa svim mogućim predmetima
FOR i in 1..array_length(dvorane,1) LOOP
        INSERT INTO ucionica(oznUcionica,kapacitet) VALUES
        (dvorane[i],CASE WHEN dvorane[i] = 'T' THEN 50 ELSE 30 END);
END LOOP;
-- unos u tablicu PREDAVANJE
--1.A
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','J2','1.A',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','U4','1A-ET',23);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','U1','1A-VJ',24);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','I2','1.A',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','GP2','1.A',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','K','1.A',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','GP2','1.A',12);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','J1','1.A',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','U4','1.A',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','J1','1.A',3);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','U4','1.A',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','GP1','1.A',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','U2','1.A',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('15:00:00','15:45:00','Tuesday','T','1.A',22);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','U1','1.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','U1','1.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','I2','1.A',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','U3','1.A',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','J2','1.A',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','M1','1.A',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','M1','1.A',13);

--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','U5','1.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Thursday','U5','1.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','U3','1.A',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','J1','1.A',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','M1','1.A',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','M1','1.A',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','T','1.A',22);
--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','B','1.A',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','B','1.A',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','J1','1.A',3);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','J1','1.A',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','K','1.A',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','GP2','1.A',11);

--1.B
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','K','1.B',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','U1','1.B',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','U3','1.B',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','J1','1.B',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','M2','1.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Monday','M2','1.B',13);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','U3','1.B',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','M2','1.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','M2','1.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','J2','1.B',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','U2','1.B',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','I2','1.B',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('15:00:00','15:45:00','Tuesday','T','1.B',22);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','B','1.B',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','B','1.B',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','J1','1.B',3);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','GP2','1.B',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','U1','1.B',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','U1','1.B',1);


--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','U4','1.B',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Thursday','J1','1.B',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','GP2','1.B',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','GP1','1.B',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','U1','1.B',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','U1','1.B',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','T','1.B',22);
--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','GP2','1.B',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','J2','1.B',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','K','1.B',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','I2','1.B',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','J1','1.B',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','J1','1.B',3);

--1.C
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U2','1.C',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','I1','1.C',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','U4','1.C',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','J2','1.C',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','GP1','1.C',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','GP1','1.C',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Monday','T','1.C',22);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','M2','1.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','GP1','1.C',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','B','1.C',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','B','1.C',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','J2','1.C',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','K','1.C',17);


--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Wednesday','T','1.C',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','M2','1.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','U5','1B-ET',23);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','U3','1B-VJ',24);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','GP1','1.C',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','K','1.C',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','U4','1.C',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','U3','1.C',5);


--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','M2','1.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Thursday','J2','1.C',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','U2','1.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','U2','1.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','I1','1.C',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','U5','1.C',16);

--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','U4','1.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','U4','1.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','M2','1.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','M2','1.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','J2','1.C',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','I1','1.C',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Friday','J2','1.C',2);

--1.D
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','M1','1.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','K','1.D',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','GP2','1.D',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','B','1.D',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','B','1.D',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','U5','1.D',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Monday','T','1.D',22);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','I1','1.D',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','J1','1.D',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','U3','1.D',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','U1','1.D',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','GP2','1.D',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','M1','1.D',14);


--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Wednesday','T','1.D',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','GP1','1.D',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','U2','1.D',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','U2','1.D',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','I1','1.D',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','U4','1.D',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','J2','1.D',2);


--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','J2','1.D',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Thursday','GP2','1.D',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','J2','1.D',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','M1','1.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','K','1.D',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','I1','1.D',20);

--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','M2','1.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','M2','1.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','U1','1.D',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','J2','1.D',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','U1','1.D',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','U1','1.D',1);

--1.E
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Monday','T','1.E',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','I1','1.E',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','M1','1.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','M1','1.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','U4','1.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','U4','1.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','K','1.E',17);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','U5','1.E',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','U5','1.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','U5','1.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','J1','1.E',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','U5','1.E',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','GP2','1.E',11);


--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','I1','1.E',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','J2','1.E',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','GP2','1.E',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','M1','1.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','M1','1.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','GP2','1.E',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','J1','1.E',4);


--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','K','1.E',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Thursday','M1','1.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','M1','1.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','GP2','1.E',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','U3','1.E',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','J1','1.E',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('15:00:00','15:45:00','Thursday','T','1.E',22);

--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U1','1C-ET',23);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U3','1C-VJ',24);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','J1','1.E',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','B','1.E',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','B','1.E',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','U4','1.E',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','U3','1.E',6);

--1.F
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Monday','T','1.F',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','GP1','1.F',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','U2','1.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','U2','1.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','M1','1.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','M1','1.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','J2','1.F',2);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','U1','1.F',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','GP2','1.F',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','K','1.F',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','M1','1.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','M1','1.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','U5','1.F',16);


--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','U3','1.F',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','GP2','1.F',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','K','1.F',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','I2','1.F',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','U5','1.F',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','J2','1.F',2);


--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','J1','1.F',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Thursday','GP1','1.F',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','J1','1.F',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','U5','1.F',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','B','1.F',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','B','1.F',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('15:00:00','15:45:00','Thursday','T','1.F',22);

--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','I2','1.F',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','U5','1.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','U5','1.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','M2','1.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','M2','1.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Friday','J1','1.F',4);

--2.A
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U5','2A-ET',23);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U4','2A-VJ',24);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','J2','2.A',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','J1','2.A',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','U1','2.A',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','I2','2.A',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','U4','2.A',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Monday','J1','2.A',3);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','U2','2.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','U2','2.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','J2','2.A',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','GP1','2.A',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','J1','2.A',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','GP1','2.A',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Tuesday','T','2.A',22);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','J2','2.A',3);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','J1','2.A',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','B','2.A',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','B','2.A',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','M2','2.A',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','M2','2.A',13);


--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','08:45:00','Thursday','T','2.A',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','U3','2.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Thursday','U3','2.A',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','I2','2.A',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','K','2.A',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','U5','2.A',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','U3','2.A',6);
--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','K','2.A',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','U1','2.A',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','GP1','2.A',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','GP2','2.A',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','M1','2.A',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','M1','2.A',13);

--2.B
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','U2','2.B',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','J2','2.B',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','GP1','2.B',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','U2','2.B',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','U2','2.B',1);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','GP1','2.B',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','M1','2.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','M2','2.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','I1','2.B',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','K','2.B',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','J1','2.B',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Tuesday','T','2.B',22);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','M1','2.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','M1','2.B',13);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','U3','2.B',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','U5','2.B',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','J1','2.B',3);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','J1','2.B',2);

--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','08:45:00','Thursday','T','2.B',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','U1','2.B',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Thursday','B','2.B',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','B','2.B',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','J2','2.B',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','GP1','2.B',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','J2','2.B',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','J1','2.B',3);
--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','I2','2.B',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','K','2.B',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','U4','2.B',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','U4','2.B',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','GP2','2.B',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','U5','2.B',16);

--2.C
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U3','2.C',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','GP1','2.C',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','U5','2.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','U5','2.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','U1','2.C',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','M1','2.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Monday','M1','2.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('15:00:00','15:45:00','Monday','T','2.C',22);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','J2','2.C',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','K','2.C',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','U2','2.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','U2','2.C',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','B','2.C',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','B','2.C',18);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','U5','2.C',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','I1','2.C',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','M2','2.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','J2','2.C',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','GP2','2.C',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','K','2.C',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','T','2.C',22);

--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','M1','2.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Thursday','U4','2B-ET',23);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Thursday','U1','2B-VJ',24);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','GP1','2.C',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','I2','2.C',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','J2','2.C',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','U2','2.C',16);
--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','J2','2.C',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','U3','2.C',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','GP2','2.C',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','M1','2.C',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','I2','2.C',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','J2','2.C',2);

--2.D
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','B','2.D',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','B','2.D',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','GP1','2.D',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','J1','2.D',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','J2','2.D',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','U1','2.D',6);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','GP2','2.D',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','U3','2.D',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','U4','2.D',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','M2','2.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','I2','2.D',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','J2','2.D',4);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','U4','2.D',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','U4','2.D',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','J2','2.D',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','M2','2.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','K','2.D',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','I2','2.D',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Wednesday','T','2.D',22);

--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','I2','2.D',20);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','K','2.D',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','U1','2.D',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','J1','2.D',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','M2','2.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Thursday','M2','2.D',14);
--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','M1','2.D',14);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','GP1','2.D',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','U3','2.D',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','GP1','2.D',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','U2','2.D',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','U2','2.D',1);

--2.E
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','U1','2.E',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','J1','2.E',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','U3','2.E',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','M2','2.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','M2','2.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','I1','2.E',19);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Tuesday','T','2.E',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','U4','2.E',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','J2','2.E',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','GP2','2.E',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','K','2.E',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','M2','2.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','M2','2.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Tuesday','J2','2.E',4);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','J1','2.E',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','K','2.E',17);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','U4','2.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','U4','2.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','U2','2.E',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','GP1','2.E',12);

--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','GP2','2.E',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Thursday','I2','2.E',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','U4','2.E',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','M2','2.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','M2','2.E',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','GP1','2.E',12);

--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Friday','T','2.E',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','U2','2.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','U2','2.E',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','J2','2.E',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','U1','2C-ET',23);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Friday','U2','2C-VJ',24);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','B','2.E',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','B','2.E',18);

--2.F
--Monday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Monday','J1','2.F',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Monday','M2','2.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Monday','M2','2.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Monday','I1','2.F',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Monday','GP2','2.F',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Monday','J1','2.F',2);

--Tuesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Tuesday','T','2.F',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Tuesday','B','2.F',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Tuesday','B','2.F',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Tuesday','I1','2.F',19);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Tuesday','U3','2.F',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Tuesday','U3','2.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Tuesday','U3','2.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('14:00:00','14:45:00','Tuesday','J1','2.F',2);

--Wednesday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Wednesday','K','2.F',18);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Wednesday','U2','2.F',6);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Wednesday','U5','2.F',5);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Wednesday','J1','2.F',4);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Wednesday','GP1','2.F',11);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Wednesday','U2','2.F',16);

--Thursday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Thursday','GP1','2.F',12);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','09:45:00','Thursday','M2','2.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Thursday','M2','2.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('11:00:00','11:45:00','Thursday','U4','2.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Thursday','U4','2.F',1);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Thursday','K','2.F',17);

--Friday
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('07:00:00','07:45:00','Friday','T','2.F',22);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('08:00:00','08:45:00','Friday','J1','2.F',2);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('09:00:00','9:45:00','Friday','M1','2.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('10:00:00','10:45:00','Friday','M1','2.F',15);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('12:00:00','12:45:00','Friday','U5','2.F',16);
INSERT INTO PREDAVANJE(vrijemePoc,vrijemeKraj,danUTjednu,oznUcionica,oznRaz,sifPredmet)
VALUES ('13:00:00','13:45:00','Friday','GP1','2.F',12);

-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'T', '3.A', 22),
    ('14:00', '14:45', 'Monday', 'J2', '3.A', 3),
    ('15:00', '15:45', 'Monday', 'J2', '3.A', 2),
    ('16:00', '16:45', 'Monday', 'M1', '3.A', 13),
    ('17:00', '17:45', 'Monday', 'M1', '3.A', 13),
    ('18:00', '18:45', 'Monday', 'GP1', '3.A', 12),
    ('19:00', '19:45', 'Monday', 'U5', '3.A', 8);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'K', '3.A', 17),
    ('14:00', '14:45', 'Tuesday', 'U1', '3.A', 2),
    ('15:00', '15:45', 'Tuesday', 'U1', '3.A', 16),
    ('16:00', '16:45', 'Tuesday', 'I2', '3.A', 19),
    ('17:00', '17:45', 'Tuesday', 'GP2', '3.A', 12),
    ('18:00', '18:45', 'Tuesday', 'GP2', '3.A', 11);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'U2', '3.A', 1),
    ('14:00', '14:45', 'Wednesday', 'U2', '3.A', 1),
    ('15:00', '15:45', 'Wednesday', 'B', '3.A', 18),
    ('16:00', '16:45', 'Wednesday', 'B', '3.A', 18),
    ('17:00', '17:45', 'Wednesday', 'M2', '3.A', 13),
    ('18:00', '19:45', 'Wednesday', 'M2', '3.A', 13);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'U2', '3.A', 16),
    ('14:00', '14:45', 'Thursday', 'U3', '3.A', 2),
    ('15:00', '15:45', 'Thursday', 'U2', '3.A', 1),
    ('16:00', '16:45', 'Thursday', 'U2', '3.A', 1),
    ('17:00', '17:45', 'Thursday', 'U4', '3A-ET', 23),
    ('17:00', '17:45', 'Thursday', 'U3', '3A-VJ', 24),
    ('18:00', '18:45', 'Thursday', 'I2', '3.A', 19);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'K', '3.A', 17),
    ('14:00', '14:45', 'Friday', 'U5', '3.A', 9),
    ('15:00', '15:45', 'Friday', 'U2', '3.A', 16),
    ('16:00', '16:45', 'Friday', 'J2', '3.A', 3),
    ('17:00', '17:45', 'Friday', 'U2', '3.A', 7),
    ('18:00', '18:45', 'Friday', 'GP1', '3.A', 11),
    ('19:00', '19:45', 'Friday', 'T', '3.A', 22);

--3.B
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'T', '3.B', 22),
    ('14:00', '14:45', 'Monday', 'U1', '3.B', 1),
    ('15:00', '15:45', 'Monday', 'U1', '3.B', 1),
    ('16:00', '16:45', 'Monday', 'GP2', '3.B', 11),
    ('17:00', '17:45', 'Monday', 'U3', '3.B', 16),
    ('18:00', '18:45', 'Monday', 'M1', '3.B', 13),
    ('19:00', '19:45', 'Monday', 'M1', '3.B', 13);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'U4', '3.B', 8),
    ('14:00', '14:45', 'Tuesday', 'U5', '3.B', 1),
    ('15:00', '15:45', 'Tuesday', 'U5', '3.B', 1),
    ('16:00', '16:45', 'Tuesday', 'J1', '3.B', 3),
    ('17:00', '17:45', 'Tuesday', 'U1', '3.B', 2),
    ('18:00', '18:45', 'Tuesday', 'U2', '3.B', 16);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'I1', '3.B', 19),
    ('14:00', '14:45', 'Wednesday', 'K', '3.B', 17),
    ('15:00', '15:45', 'Wednesday', 'U4', '3.B', 2),
    ('16:00', '16:45', 'Wednesday', 'J1', '3.B', 3),
    ('17:00', '17:45', 'Wednesday', 'U4', '3.B', 16),
    ('18:00', '18:45', 'Wednesday', 'GP2', '3.B', 12);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'K', '3.B', 17),
    ('14:00', '14:45', 'Thursday', 'I1', '3.B', 19),
    ('15:00', '15:45', 'Thursday', 'GP1', '3.B', 11),
    ('16:00', '16:45', 'Thursday', 'U1', '3.B', 7),
    ('18:00', '18:45', 'Thursday', 'U5', '3.B', 9);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'B', '3.B', 18),
    ('14:00', '14:45', 'Friday', 'B', '3.B', 18),
    ('15:00', '15:45', 'Friday', 'J1', '3.B', 2),
    ('16:00', '16:45', 'Friday', 'GP2', '3.B', 12),
    ('17:00', '17:45', 'Friday', 'M2', '3.B', 13),
    ('18:00', '18:45', 'Friday', 'M2', '3.B', 13),
    ('19:00', '19:45', 'Friday', 'T', '3.B', 22);

--3.C
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'M1', '3.C', 14),
    ('14:00', '14:45', 'Monday', 'M1', '3.C', 14),
    ('15:00', '15:45', 'Monday', 'U5', '3.C', 1),
    ('16:00', '16:45', 'Monday', 'U5', '3.C', 1),
    ('17:00', '17:45', 'Monday', 'I1', '3.C', 20),
    ('18:00', '18:45', 'Monday', 'U1', '3.C', 2),
    ('19:00', '19:45', 'Monday', 'T', '3.C', 22);


-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'U5', '3.C', 16),
    ('14:00', '14:45', 'Tuesday', 'GP1', '3.C', 12),
    ('15:00', '15:45', 'Tuesday', 'J1', '3.C', 2),
    ('16:00', '16:45', 'Tuesday', 'U5', '3B-ET', 23),
    ('16:00', '16:45', 'Tuesday', 'U2', '3B-VJ', 24),
    ('17:00', '17:45', 'Tuesday', 'U2', '3.C', 9),
    ('18:10', '18:55', 'Tuesday', 'M1', '3.C', 14);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'K', '3.C', 17),
    ('14:00', '14:45', 'Wednesday', 'M1', '3.C', 14),
    ('15:00', '15:45', 'Wednesday', 'U1', '3.C', 7),
    ('16:00', '16:45', 'Wednesday', 'U1', '3.C', 8),
    ('17:00', '17:45', 'Wednesday', 'I1', '3.C', 20),
    ('18:00', '18:45', 'Wednesday', 'GP1', '3.C', 11),
    ('19:00', '19:45', 'Wednesday', 'T', '3.C', 22);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'J2', '3.C', 2),
    ('14:00', '14:45', 'Thursday', 'U5', '3.C', 16),
    ('15:00', '15:45', 'Thursday', 'K', '3.C', 17),
    ('16:00', '16:45', 'Thursday', 'GP2', '3.C', 12),
    ('17:00', '17:45', 'Thursday', 'I1', '3.C', 20),
    ('18:00', '18:45', 'Thursday', 'GP2', '3.C', 11);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'M1', '3.C', 14),
    ('14:00', '14:45', 'Friday', 'U1', '3.C', 16),
    ('15:00', '15:45', 'Friday', 'U2', '3.C', 1),
    ('16:00', '16:45', 'Friday', 'U2', '3.C', 1),
    ('17:00', '17:45', 'Friday', 'B', '3.C', 18),
    ('18:00', '18:45', 'Friday', 'B', '3.C', 18);

--3.D
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'U5', '3.D', 16),
    ('14:00', '14:45', 'Monday', 'I1', '3.D', 20),
    ('15:00', '15:45', 'Monday', 'U3', '3.D', 2),
    ('16:00', '16:45', 'Monday', 'K', '3.D', 17),
    ('17:00', '17:45', 'Monday', 'U2', '3.D', 1),
    ('18:00', '18:45', 'Monday', 'U2', '3.D', 1),
    ('19:00', '19:45', 'Monday', 'T', '3.D', 22);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'B', '3.D', 18),
    ('14:00', '14:45', 'Tuesday', 'B', '3.D', 18),
    ('14:00', '14:45', 'Tuesday', 'GP1', '3.D', 11),
    ('17:00', '17:45', 'Tuesday', 'M2', '3.D', 14),
    ('18:00', '18:45', 'Tuesday', 'U5', '3.D', 9);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'M1', '3.D', 14),
    ('14:00', '14:45', 'Wednesday', 'U3', '3.D', 16),
    ('15:00', '15:45', 'Wednesday', 'U2', '3.D', 1),
    ('16:00', '16:45', 'Wednesday', 'U2', '3.D', 1),
    ('17:00', '17:45', 'Wednesday', 'GP1', '3.D', 12),
    ('18:00', '18:45', 'Wednesday', 'I2', '3.D', 20),
    ('19:00', '19:45', 'Wednesday', 'T', '3.D', 22);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'M1', '3.D', 14),
    ('14:00', '14:45', 'Thursday', 'M1', '3.D', 14),
    ('15:00', '15:45', 'Thursday', 'U1', '3.D', 8),
    ('16:00', '16:45', 'Thursday', 'J1', '3.D', 2),
    ('17:00', '17:45', 'Thursday', 'U1', '3.D', 7),
    ('18:00', '18:45', 'Thursday', 'U4', '3.D', 16);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'U1', '3.D', 2),
    ('14:00', '14:45', 'Friday', 'M1', '3.D', 14),
    ('15:00', '15:45', 'Friday', 'K', '3.D', 17),
    ('16:00', '16:45', 'Friday', 'I2', '3.D', 20),
    ('17:00', '17:45', 'Friday', 'GP2', '3.D', 11),
    ('18:00', '18:45', 'Friday', 'GP2', '3.D', 12);


--3.E
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'U4', '3.E', 2),
    ('14:00', '14:45', 'Monday', 'U3', '3.E', 16),
    ('15:00', '15:45', 'Monday', 'K', '3.E', 17),
    ('16:00', '16:45', 'Monday', 'U2', '3.E', 9),
    ('17:00', '17:45', 'Monday', 'U2', '3.E', 7),
    ('18:00', '18:45', 'Monday', 'I2', '3.E', 19),
    ('20:00', '20:45', 'Monday', 'T', '3.E', 22);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'M2', '3.E', 15),
    ('14:00', '14:45', 'Tuesday', 'M2', '3.E', 15),
    ('15:00', '15:45', 'Tuesday', 'GP2', '3.E', 12),
    ('16:00', '16:45', 'Tuesday', 'B', '3.E', 18),
    ('17:00', '17:45', 'Tuesday', 'B', '3.E', 18),
    ('18:00', '18:45', 'Tuesday', 'K', '3.E', 17);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'U5', '3C-ET', 23),
    ('13:00', '13:45', 'Wednesday', 'U4', '3C-VJ', 24),
    ('14:00', '14:45', 'Wednesday', 'GP2', '3.E', 11),
    ('15:00', '15:45', 'Wednesday', 'U3', '3.E', 16),
    ('16:00', '16:45', 'Wednesday', 'J2', '3.E', 2),
    ('17:00', '17:45', 'Wednesday', 'J2', '3.E', 2),
    ('18:00', '18:45', 'Wednesday', 'U3', '3.E', 1);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('12:00', '12:45', 'Thursday', 'T', '3.E', 22),
    ('13:00', '14:45', 'Thursday', 'I2', '3.E', 19),
    ('14:00', '15:45', 'Thursday', 'GP2', '3.E', 11),
    ('15:00', '15:45', 'Thursday', 'M1', '3.E', 15),
    ('16:00', '16:45', 'Thursday', 'M1', '3.E', 15),
    ('17:00', '17:45', 'Thursday', 'U2', '3.E', 1),
    ('18:00', '18:45', 'Thursday', 'U2', '3.E', 1);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'U5', '3.E', 8),
    ('14:00', '14:45', 'Friday', 'J1', '3.E', 2),
    ('15:00', '15:45', 'Friday', 'M1', '3.E', 15),
    ('16:00', '16:45', 'Friday', 'M1', '3.E', 15),
    ('17:00', '17:45', 'Friday', 'GP1', '3.E', 12),
    ('18:00', '18:45', 'Friday', 'U2', '3.E', 16);


--3.F
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'B', '3.F', 18),
    ('14:00', '14:45', 'Monday', 'B', '3.F', 18),
    ('15:00', '15:45', 'Monday', 'U2', '3.F', 16),
    ('16:00', '16:45', 'Monday', 'J1', '3.F', 2),
    ('17:00', '17:45', 'Monday', 'K', '3.F', 17),
    ('18:00', '18:45', 'Monday', 'GP2', '3.F', 12),
    ('20:00', '20:45', 'Monday', 'T', '3.F', 22);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'GP1', '3.F', 11),
    ('14:00', '14:45', 'Tuesday', 'K', '3.F', 17),
    ('15:00', '15:45', 'Tuesday', 'M2', '3.F', 15),
    ('16:00', '16:45', 'Tuesday', 'M2', '3.F', 15),
    ('17:00', '17:45', 'Tuesday', 'U5', '3.F', 16),
    ('18:00', '18:45', 'Tuesday', 'J2', '3.F', 2);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('14:00', '14:45', 'Wednesday', 'I1', '3.F', 19),
    ('15:00', '15:45', 'Wednesday', 'M1', '3.F', 15),
    ('16:00', '16:45', 'Wednesday', 'M1', '3.F', 15),
    ('17:00', '17:45', 'Wednesday', 'GP2', '3.F', 11),
    ('18:00', '18:45', 'Wednesday', 'U5', '3.F', 9);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('12:00', '12:45', 'Thursday', 'T', '3.F', 22),
    ('13:00', '13:45', 'Thursday', 'U1', '3.F', 1),
    ('14:00', '14:45', 'Thursday', 'U1', '3.F', 1),
    ('15:00', '15:45', 'Thursday', 'GP2', '3.F', 12),
    ('16:00', '16:45', 'Thursday', 'U4', '3.F', 8),
    ('17:00', '17:45', 'Thursday', 'M1', '3.F', 15),
    ('18:00', '18:45', 'Thursday', 'M1', '3.F', 15);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'U3', '3.F', 1),
    ('14:00', '14:45', 'Friday', 'U3', '3.F', 1),
    ('15:00', '15:45', 'Friday', 'U5', '3.F', 7),
    ('16:00', '16:45', 'Friday', 'U4', '3.F', 16),
    ('17:00', '17:45', 'Friday', 'I1', '3.F', 19),
    ('18:00', '18:45', 'Friday', 'J1', '3.F', 2);

--4.A
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'J1', '4.A', 2),
    ('14:00', '14:45', 'Monday', 'J1', '4.A', 3),
    ('15:00', '15:45', 'Monday', 'GP1', '4.A', 12),
    ('16:00', '16:45', 'Monday', 'GP2', '4.A', 11),
    ('17:00', '17:45', 'Monday', 'U5', '4.A', 21),
    ('18:00', '18:45', 'Monday', 'U4', '4.A', 16);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('12:00', '12:45', 'Tuesday', 'T', '4.A', 22),
    ('13:00', '13:45', 'Tuesday', 'GP2', '4.A', 12),
    ('14:00', '15:45', 'Tuesday', 'GP2', '4.A', 11),
    ('15:00', '16:45', 'Tuesday', 'U1', '4.A', 19),
    ('16:00', '16:45', 'Tuesday', 'U1', '4.A', 10),
    ('17:00', '17:45', 'Tuesday', 'U4', '4.A', 1),
    ('18:00', '18:45', 'Tuesday', 'U4', '4.A', 1);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'U3', '4.A', 10),
    ('14:00', '14:45', 'Wednesday', 'J2', '4.A', 2),
    ('15:00', '15:45', 'Wednesday', 'K', '4.A', 17),
    ('16:00', '16:45', 'Wednesday', 'U4', '4.A', 16),
    ('17:00', '17:45', 'Wednesday', 'B', '4.A', 18),
    ('18:00', '18:45', 'Wednesday', 'B', '4.A', 18);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'U4', '4.A', 1),
    ('14:00', '14:45', 'Thursday', 'U4', '4.A', 1),
    ('15:00', '15:45', 'Thursday', 'J1', '4.A', 3),
    ('16:00', '16:45', 'Thursday', 'J2', '4.A', 2),
    ('17:00', '17:45', 'Thursday', 'M2', '4.A', 13),
    ('18:00', '18:45', 'Thursday', 'M2', '4.A', 13),
    ('19:00', '19:45', 'Thursday', 'U3', '4.A', 22);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'U1', '4.A', 19),
    ('14:00', '14:45', 'Friday', 'M2', '4.A', 13),
    ('15:00', '15:45', 'Friday', 'M2', '4.A', 13),
    ('16:00', '16:45', 'Friday', 'U3', '4.A', 16),
    ('17:00', '17:45', 'Friday', 'K', '4.A', 17),
    ('18:00', '18:45', 'Friday', 'U3', '4A-ET', 23),
    ('18:00', '18:45', 'Friday', 'U5', '4A-VJ', 24);

--4.B
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'U2', '4.B', 16),
    ('14:00', '14:45', 'Monday', 'U5', '4.B', 10),
    ('15:00', '15:45', 'Monday', 'M2', '4.B', 13),
    ('16:00', '16:45', 'Monday', 'M2', '4.B', 13),
    ('17:00', '17:45', 'Monday', 'J1', '4.B', 2),
    ('18:00', '18:45', 'Monday', 'K', '4.B', 17);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('12:00', '12:45', 'Tuesday', 'T', '4.B', 22),
    ('13:00', '13:45', 'Tuesday', 'U1', '4.B', 21),
    ('14:00', '14:45', 'Tuesday', 'I1', '4.B', 19),
    ('15:00', '15:45', 'Tuesday', 'U4', '4.B', 1),
    ('16:00', '16:45', 'Tuesday', 'U4', '4.B', 1),
    ('17:00', '17:45', 'Tuesday', 'U4', '4.B', 10),
    ('18:00', '18:45', 'Tuesday', 'J1', '4.B', 2);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'B', '4.B', 18),
    ('14:00', '14:45', 'Wednesday', 'B', '4.B', 18),
    ('15:00', '15:45', 'Wednesday', 'J1', '4.B', 2),
    ('16:00', '16:45', 'Wednesday', 'I1', '4.B', 19),
    ('17:00', '17:45', 'Wednesday', 'M2', '4.B', 13),
    ('18:00', '18:45', 'Wednesday', 'M2', '4.B', 13);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'GP1', '4.B', 11),
    ('14:00', '14:45', 'Thursday', 'U2', '4.B', 16),
    ('15:00', '15:45', 'Thursday', 'U5', '4.B', 1),
    ('16:00', '16:45', 'Thursday', 'U5', '4.B', 1),
    ('17:00', '17:45', 'Thursday', 'GP2', '4.B', 12),
    ('18:00', '18:45', 'Thursday', 'J1', '4.B', 3),
    ('19:00', '19:45', 'Thursday', 'T', '4.B', 22);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'GP2', '4.B', 11),
    ('14:00', '14:45', 'Friday', 'U2', '4.B', 16),
    ('15:00', '15:45', 'Friday', 'GP1', '4.B', 12),
    ('16:00', '16:45', 'Friday', 'K', '4.B', 17),
    ('17:00', '17:45', 'Friday', 'J1', '4.B', 3);

--4.C
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'U3', '4.C', 10),
    ('14:00', '14:45', 'Monday', 'GP2', '4.C', 11),
    ('15:00', '15:45', 'Monday', 'U1', '4.C', 16),
    ('16:00', '16:45', 'Monday', 'GP1', '4.C', 12),
    ('17:00', '17:45', 'Monday', 'B', '4.C', 18),
    ('18:00', '18:45', 'Monday', 'B', '4.C', 18);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'I2', '4.C', 20),
    ('14:00', '14:45', 'Tuesday', 'U3', '4.C', 21),
    ('14:00', '14:45', 'Tuesday', 'U2', '4B-ET', 23),
    ('15:00', '15:45', 'Tuesday', 'U3', '4B-VJ', 24),
    ('16:00', '16:45', 'Tuesday', 'U3', '4.C', 16),
    ('17:00', '17:45', 'Tuesday', 'K', '4.C', 17),
    ('18:00', '18:45', 'Tuesday', 'M2', '4.C', 14),
    ('19:00', '19:45', 'Tuesday', 'T', '4.C', 22);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'M2', '4.C', 14),
    ('14:00', '14:45', 'Wednesday', 'M2', '4.C', 14),
    ('15:00', '15:45', 'Wednesday', 'I1', '4.C', 20),
    ('16:00', '16:45', 'Wednesday', 'U5', '4.C', 2),
    ('17:00', '17:45', 'Wednesday', 'U2', '4.C', 1),
    ('18:00', '18:45', 'Wednesday', 'U2', '4.C', 1);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'U3', '4.C', 16),
    ('14:00', '14:45', 'Thursday', 'J2', '4.C', 2),
    ('15:00', '15:45', 'Thursday', 'M1', '4.C', 14),
    ('16:00', '16:45', 'Thursday', 'I1', '4.C', 20),
    ('17:00', '17:45', 'Thursday', 'K', '4.C', 17),
    ('18:00', '18:45', 'Thursday', 'U3', '4.C', 10),
    ('20:00', '20:45', 'Thursday', 'T', '4.C', 22);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'J1', '4.C', 2),
    ('14:00', '14:45', 'Friday', 'GP1', '4.C', 12),
    ('15:00', '15:45', 'Friday', 'GP2', '4.C', 11),
    ('16:00', '16:45', 'Friday', 'M2', '4.C', 14),
    ('17:00', '17:45', 'Friday', 'U4', '4.C', 1),
    ('18:00', '18:45', 'Friday', 'U4', '4.C', 1);

--4.D
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'I1', '4.D', 20),
    ('14:00', '14:45', 'Monday', 'U2', '4.D', 16),
    ('15:00', '15:45', 'Monday', 'J2', '4.D', 2),
    ('16:00', '16:45', 'Monday', 'U4', '4.D', 1),
    ('17:00', '17:45', 'Monday', 'U4', '4.D', 1),
    ('18:00', '18:45', 'Monday', 'U3', '4.D', 21);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'M1', '4.D', 14),
    ('14:00', '14:45', 'Tuesday', 'U4', '4.D', 16),
    ('16:00', '16:45', 'Tuesday', 'GP2', '4.D', 11),
    ('17:00', '17:45', 'Tuesday', 'J1', '4.D', 2),
    ('18:00', '18:45', 'Tuesday', 'GP1', '4.D', 12),
    ('19:00', '19:45', 'Tuesday', 'T', '4.D', 22);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'GP1', '4.D', 12),
    ('14:00', '14:45', 'Wednesday', 'U4', '4.D', 16),
    ('15:00', '15:45', 'Wednesday', 'M2', '4.D', 14),
    ('16:00', '16:45', 'Wednesday', 'M2', '4.D', 14),
    ('17:00', '17:45', 'Wednesday', 'K', '4.D', 17),
    ('18:00', '18:45', 'Wednesday', 'U4', '4.D', 10);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'B', '4.D', 18),
    ('14:00', '14:45', 'Thursday', 'B', '4.D', 18),
    ('15:00', '15:45', 'Thursday', 'I2', '4.D', 20),
    ('16:00', '16:45', 'Thursday', 'M1', '4.D', 14),
    ('17:00', '17:45', 'Thursday', 'GP1', '4.D', 11),
    ('18:00', '18:45', 'Thursday', 'K', '4.D', 17),
    ('20:00', '20:45', 'Thursday', 'K', '4.D', 22);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Friday', 'M2', '4.D', 14),
    ('14:00', '14:45', 'Friday', 'I1', '4.D', 20),
    ('15:00', '15:45', 'Friday', 'U4', '4.D', 1),
    ('16:00', '16:45', 'Friday', 'U4', '4.D', 1),
    ('17:00', '17:45', 'Friday', 'J2', '4.D', 2),
    ('18:00', '18:45', 'Friday', 'U1', '4.D', 10);

--4.E
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'M2', '4.E', 15),
    ('14:00', '14:45', 'Monday', 'M2', '4.E', 15),
    ('15:00', '15:45', 'Monday', 'I1', '4.E', 19),
    ('16:00', '16:45', 'Monday', 'J2', '4.E', 2),
    ('17:00', '17:45', 'Monday', 'U3', '4.E', 10),
    ('18:00', '18:45', 'Monday', 'GP1', '4.E', 11);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'U3', '4.E', 16),
    ('14:00', '14:45', 'Tuesday', 'M1', '4.E', 15),
    ('15:00', '15:45', 'Tuesday', 'M1', '4.E', 15),
    ('16:00', '16:45', 'Tuesday', 'K', '4.E', 17),
    ('17:00', '17:45', 'Tuesday', 'I1', '4.E', 19),
    ('18:00', '18:45', 'Tuesday', 'U4', '4.E', 10);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'GP2', '4.E', 11),
    ('14:00', '14:45', 'Wednesday', 'U4', '4.E', 1),
    ('15:00', '15:45', 'Wednesday', 'U4', '4.E', 1),
    ('16:00', '16:45', 'Wednesday', 'GP1', '4.E', 12),
    ('17:00', '17:45', 'Wednesday', 'U5', '4.E', 21),
    ('18:00', '18:45', 'Wednesday', 'J2', '4.E', 2),
    ('20:00', '20:45', 'Wednesday', 'T', '4.E', 22);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'M2', '4.E', 15),
    ('14:00', '14:45', 'Thursday', 'M2', '4.E', 15),
    ('15:00', '15:45', 'Thursday', 'U4', '4C-ET', 23),
    ('15:00', '15:45', 'Thursday', 'U3', '4C-VJ', 24),
    ('16:00', '16:45', 'Thursday', 'U3', '4.E', 16),
    ('17:00', '17:45', 'Thursday', 'U5', '4.E', 2),
    ('18:00', '18:45', 'Thursday', 'GP1', '4.E', 12);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('12:00', '12:45', 'Friday', 'T', '4.E', 22),
    ('13:00', '13:45', 'Friday', 'U4', '4.E', 1),
    ('14:00', '14:45', 'Friday', 'U4', '4.E', 1),
    ('15:00', '15:45', 'Friday', 'B', '4.E', 18),
    ('16:00', '16:45', 'Friday', 'B', '4.E', 18),
    ('17:00', '17:45', 'Friday', 'U1', '4.E', 16),
    ('18:00', '18:45', 'Friday', 'K', '4.E', 17);

--4.F
-- Monday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Monday', 'K', '4.F', 17),
    ('14:00', '14:45', 'Monday', 'U4', '4.F', 1),
    ('15:00', '15:45', 'Monday', 'U4', '4.F', 1),
    ('16:00', '16:45', 'Monday', 'U1', '4.F', 16),
    ('17:00', '17:45', 'Monday', 'M2', '4.F', 15),
    ('18:00', '18:45', 'Monday', 'M2', '4.F', 15);

-- Tuesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Tuesday', 'U2', '4.F', 1),
    ('14:00', '14:45', 'Tuesday', 'U2', '4.F', 1),
    ('15:00', '15:45', 'Tuesday', 'J2', '4.F', 2),
    ('16:00', '16:45', 'Tuesday', 'M1', '4.F', 15),
    ('17:00', '17:45', 'Tuesday', 'M1', '4.F', 15),
    ('18:00', '18:45', 'Tuesday', 'I2', '4.F', 19);

-- Wednesday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Wednesday', 'J2', '4.F', 2),
    ('14:00', '14:45', 'Wednesday', 'U1', '4.F', 10),
    ('15:00', '15:45', 'Wednesday', 'GP2', '4.F', 12),
    ('16:00', '16:45', 'Wednesday', 'GP2', '4.F', 11),
    ('17:00', '17:45', 'Wednesday', 'U1', '4.F', 16),
    ('18:00', '18:45', 'Wednesday', 'U1', '4.F', 21),
    ('20:00', '20:45', 'Wednesday', 'U1', '4.F', 22);

-- Thursday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('13:00', '13:45', 'Thursday', 'U5', '4.F', 10),
    ('14:00', '14:45', 'Thursday', 'GP1', '4.F', 12),
    ('16:00', '16:45', 'Thursday', 'GP1', '4.F', 11),
    ('17:00', '17:45', 'Thursday', 'B', '4.F', 18),
    ('18:00', '18:45', 'Thursday', 'B', '4.F', 18);

-- Friday
INSERT INTO PREDAVANJE (vrijemePoc, vrijemeKraj, danUTjednu, oznUcionica, oznRaz, sifPredmet)
VALUES
    ('12:00', '12:45', 'Friday', 'T', '4.F', 22),
    ('13:00', '13:45', 'Friday', 'U1', '4.F', 16),
    ('14:00', '14:45', 'Friday', 'K', '4.F', 17),
    ('15:00', '15:45', 'Friday', 'I1', '4.F', 19),
    ('16:00', '16:45', 'Friday', 'J1', '4.F', 2),
    ('17:00', '17:45', 'Friday', 'M1', '4.F', 15),
    ('18:00', '18:45', 'Friday', 'M1', '4.F', 15);

END $$;