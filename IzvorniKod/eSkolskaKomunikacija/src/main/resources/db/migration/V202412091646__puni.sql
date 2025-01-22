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
            'Likovna umjetnost', 'Psihologija','Logika','Sociologija','Filozofija','Povijest', 'Zemljopis','Matematika - A',
            'Matematika - B', 'Matematika - C', 'Fizika', 'Kemija','Biologija','Informatika - AC', 'Informatika - B','Politika i gospodarstvo','TZK', 'Etika',
            'Vjeronauk','Njemački jezik DSD', 'Francuski jezik', 'Astronomija'
            ];
        sati INT[] := ARRAY[4,3,2,2,1,1,1,1,1,2,2,2,4,5,6,3,2,2,2,3,1,2,1,1,2,2,2];

        pred_zaj TEXT[] :=ARRAY['Hrvatski jezik', 'Engleski jezik','Povijest','Zemljopis','Fizika','Kemija','Biologija','TZK'];
        pred_A TEXT[] := ARRAY['Njemački jezik', 'Matematika - A', 'Informatika - AC'];
        pred_B TEXT[] := ARRAY['Matematika - B', 'Informatika - B'];
        pred_C TEXT[] := ARRAY['Matematika - C', 'Informatika - AC'];
        pred_12 TEXT[] := ARRAY['Latinski jezik','Glazbena umjetnost','Likovna umjetnost'];
        pred_3 TEXT[] := ARRAY['Psihologija','Logika','Sociologija'];
        pred_4 TEXT[]:= ARRAY['Filozofija','Politika i gospodarstvo'];

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
    BEGIN
        -- punjenje relacije korisnik s nasumično generiranim podacima
        WHILE i <= 480 LOOP
                ime := ime_array[ceil(random() * array_length(ime_array, 1))];
                prezime := prezime_array[ceil(random() * array_length(prezime_array, 1))];

                email := lower(ime || '.' || translate(prezime,'čćđšžČĆĐŠŽ', 'ccdsszCCDSSZ') || i || '@skole.hr');
                lozinka := lower(left(ime, 1) || translate(prezime,'čćđšžČĆĐŠŽ', 'ccdsszCCDSSZ')  || i);

                INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
                VALUES (email, lozinka, ime, prezime, 'S');

                i := i + 1;
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

                        IF god != 1 THEN
                            FOR i IN 1..20 LOOP
                                    INSERT INTO upisao(oznRaz, JMBAG)
                                    VALUES (god::varchar || '.' || raz[cnt], i + 120 *(4 - god)+ (cnt-1) *20);
                                END LOOP;
                        END IF;
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

        --placeholder ucitelj
        INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1) VALUES  ('.', '.', '.', '.', 'N');
        INSERT INTO nastavnik(sifNast,email,lozinka) VALUES (0,'.','.');

        --punjenje relacije predmetrazred za obavezne predmete
        FOR ra IN (SELECT oznRaz, god, razred.smjer FROM razred WHERE izboran IS NULL AND fakultativan IS NULL) LOOP
                IF ra.smjer = 'A' THEN
                    FOR i IN 1..array_length(pred_A, 1) LOOP
                            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_A[i]), 0);
                        END LOOP;
                ELSIF ra.smjer = 'B' THEN
                    FOR i IN 1..array_length(pred_B, 1) LOOP
                            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_B[i]), 0);
                        END LOOP;
                ELSE
                    FOR i IN 1..array_length(pred_C, 1) LOOP
                            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_C[i]), 0);
                        END LOOP;
                END IF;

                IF ra.god IN (1, 2) THEN
                    FOR i IN 1..array_length(pred_12, 1) LOOP
                            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_12[i]), 0);
                        END LOOP;
                ELSIF ra.god = 3 THEN
                    FOR i IN 1..array_length(pred_3, 1) LOOP
                            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_3[i]), 0);
                        END LOOP;
                ELSE
                    FOR i IN 1..array_length(pred_4, 1) LOOP
                            INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                            VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_4[i]), 0);
                        END LOOP;
                END IF;

                FOR i IN 1..array_length(pred_zaj, 1) LOOP
                        INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                        VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = pred_zaj[i]), 0);
                    END LOOP;
            END LOOP;

        --punjenje relacije predmetrazred za izborne predmete
        FOR ra IN (SELECT oznRaz,izboran FROM razred WHERE izboran IS NOT NULL) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = ra.izboran), 0);
            END LOOP;

        --punjenje relacije predmetrazred za fakultativne predmete
        FOR ra IN (SELECT oznRaz,fakultativan FROM razred WHERE fakultativan IS NOT NULL) LOOP
                INSERT INTO predmetrazred(oznRaz, sifPredmet, sifNast)
                VALUES (ra.oznRaz, (SELECT sifPredmet FROM predmet WHERE nazPred = ra.fakultativan), 0);
            END LOOP;
    END $$;
