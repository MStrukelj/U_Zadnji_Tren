-- Insert into korisnik table for placeholder nastavnik
INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1)
VALUES ('.', '.', '.', '.', 'N');

-- Insert into nastavnik table placeholder row
INSERT INTO nastavnik (sifNast, email, lozinka)
VALUES (0, '.', '.');

-- Insert into korisnik table for students
INSERT INTO korisnik (email, lozinka, ime, prezime, uloga1) VALUES
                                                                ('lucija.horvat1@skole.hr', 'lhorvat1', 'Lucija', 'Horvat', 'S'),
                                                                ('luka.knezevic2@skole.hr', 'lknezevic2', 'Luka', 'Knežević', 'S'),
                                                                ('ana.kovacevic3@skole.hr', 'akovacevic3', 'Ana', 'Kovačević', 'S'),
                                                                ('ema.loncar4@skole.hr', 'eloncar4', 'Ema', 'Lončar', 'S'),
                                                                ('petra.galic5@skole.hr', 'pgalic5', 'Petra', 'Galić', 'S'),
                                                                ('ivan.novak6@skole.hr', 'inovak6', 'Ivan', 'Novak', 'S'),
                                                                ('lea.vukovic7@skole.hr', 'lvukovic7', 'Lea', 'Vuković', 'S'),
                                                                ('nika.brkic8@skole.hr', 'nbrkic8', 'Nika', 'Brkić', 'S');

-- Insert into mjesto table
INSERT INTO mjesto (pbr, nazmjesto) VALUES
                                        (10000, 'Zagreb'),
                                        (10410, 'Velika Gorica'),
                                        (10290, 'Zaprešić'),
                                        (10360, 'Sesvete'),
                                        (49210, 'Zabok'),
                                        (10430, 'Samobor');

-- Insert into ucenik table
INSERT INTO ucenik (JMBAG, OIB, datRod, pbrRod, pbrStan, email, lozinka) VALUES
                                                                             (1, '12345678910', '2001-05-12', 10000, 10410, 'lucija.horvat1@skole.hr', 'lhorvat1'),
                                                                             (2, '12345678911', '2001-06-10', 10290, 10360, 'luka.knezevic2@skole.hr', 'lknezevic2'),
                                                                             (3, '12345678912', '2002-07-01', 10430, 49210, 'ana.kovacevic3@skole.hr', 'akovacevic3'),
                                                                             (4, '12345678913', '2003-08-15', 10290, 10410, 'ema.loncar4@skole.hr', 'eloncar4'),
                                                                             (5, '12345678914', '2004-01-20', 10410, 10000, 'petra.galic5@skole.hr', 'pgalic5'),
                                                                             (6, '12345678915', '2002-11-22', 49210, 10290, 'ivan.novak6@skole.hr', 'inovak6'),
                                                                             (7, '12345678916', '2003-09-09', 10360, 10000, 'lea.vukovic7@skole.hr', 'lvukovic7'),
                                                                             (8, '12345678917', '2004-12-01', 10430, 10430, 'nika.brkic8@skole.hr', 'nbrkic8');

-- Insert into razred table
INSERT INTO razred (oznRaz, smjer, godina, kapacitet) VALUES
                                                          ('1.A', 'A', 1, 20),
                                                          ('1.B', 'B', 1, 20),
                                                          ('1.C', 'C', 1, 20),
                                                          ('2.A', 'A', 2, 20),
                                                          ('2.B', 'B', 2, 20),
                                                          ('2.C', 'C', 2, 20);

-- Insert into upisao table
INSERT INTO upisao (oznRaz, JMBAG) VALUES
                                       ('1.A', 1), ('1.A', 2), ('1.B', 3), ('1.C', 4),
                                       ('2.A', 5), ('2.B', 6), ('2.C', 7), ('1.C', 8);

-- Insert into predmet table
INSERT INTO predmet (sifPredmet, nazPred, brSatiTjedno, izboran, fakultativan) VALUES
                                                                                   (1, 'Hrvatski jezik', 4, FALSE, FALSE),
                                                                                   (2, 'Engleski jezik', 3, FALSE, FALSE),
                                                                                   (3, 'Njemački jezik', 2, TRUE, FALSE),
                                                                                   (4, 'Matematika - A', 4, FALSE, FALSE),
                                                                                   (5, 'Matematika - B', 5, FALSE, FALSE),
                                                                                   (6, 'Fizika', 3, FALSE, FALSE);

-- Insert into predmetrazred table
INSERT INTO predmetrazred (oznRaz, sifPredmet, sifNast) VALUES
                                                            ('1.A', 1, 0), ('1.A', 2, 0),
                                                            ('1.B', 3, 0), ('1.C', 4, 0),
                                                            ('2.A', 5, 0), ('2.B', 6, 0);
