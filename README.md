# Programsko inženjerstvo

# Opis projekta
Ovaj projekt je reultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Cilj ovog projekta je razvoj web aplikacije koja će omogućiti učinkovito upravljanje i organizaciju obrazovnog procesa u srednjoj školi putem  elektroničkih sredstava komunikacije. Putem aplikacije objedinit će se najvažniji elementi  administracije i komunikacije unutar obrazovnog procesa i omogućit će se jednostavan pristup podacima, učinkovito upravljanje resursima i olakšanu suradnju svih sudionika obrazovnog procesa. Uvođenjem ovakve aplikacije omogućit će se : 
* centralizirano vođenje informacija o učenicima poput smjera, nastavnih i izvannastavnih aktivnosti koje učenici pohađaju
* prikaz rasporeda sati za te aktivnosti
* pristup materijalima tih aktivnosti
* podizanje potvrda učenika
* prikaz puta od škole do lokacija terenske nastave
* slanje obavijesti svim osobama koje sudjeluju u nastavnom procesu
* generiranje rasporeda sati s obzirom na resurse škole
* postavljanje materijala nastavnika za predmete koje predaje
* međusobna komunikacija između osoba koje sudjeluju u nastavnom procesu
* prikaz vremenske prognoze lokacije na kojoj se škola nalazi

# Funkcijski zahtjevi - detaljan opis na 2. stranici Wiki-ja
- izrada baze podataka 
- odabir smjera koji učenik želi upisati
- pridjeljivanje predmeta učenicima ovisno o smjeru
- izrađivanje rasporeda sati po smjerovima i prikazivanje istog
- nastavnik može odrediti vrijeme u danu/tjednu kad ne može održati nastavu
- slanje rasporeda i promjena na rasporedu svim učenicima i nastavnicima elektroničkom 
  poštom
- slanje obavijesti i komunikacija unutar grupe i pojedinih osoba
- objavljivanje materijala na web stranicama
- praćenje statistike pregleda i pristupa svim nastavnim materijalima
- slanje obavijesti o terenskoj nastavi
- prikazivanje dolaska od lokacije škole do lokacije terenske nastave
- omogućivanje nekoliko kategorija korisnika
- generiranje potvrde o upisu o školi i slanje iste elektroničkom poštom
- praćenje statistike o izdavanju potvrda i omogućivanje pregleda iste
  
# Nefunkcijski zahtjevi - detaljan opis na 2. stranici Wiki-ja
- PostgreSQL baza podataka
- responzivni dizajn i prilagodba aplikacije za upotrebu na različitim uređajima
- OAuth2 vanjski servis za autentifikaciju
- učenik može upisati samo jedan smjer
- raspored sati se prikazuje u tabličnom obliku za svaki tjedan
- materijali pojedinog predmeta su dostupni samo učenicima koji imaju taj predmet
- za prikaz puta od škole do lokacije terenske nastave koristi se Google Maps
- kategorije korisnika su : učenik, nastavnik, ravnatelj, satničar, djelatnik studentske službe i administrator informatičkog sustava
- potvrda o upisu u školu je u pdf formatu
- samo dvije kategorije korisnika imaju pregled statistike o izdavanju potvrda
  (djelatnik studentske službe i ravnatelj)
     
# Tehnologije
## Frontend  
   - React
## Backend 
  - Spring boot
## Baza podataka 
  - PostgreSQL

#Instalcija
# Članovi tima 
  ## Voditelj tima 
   * [Mislav Štrukelj](https://github.com/MStrukelj)

  ## Frontend
  * [Hana Morović](https://github.com/h-m1234)
  * [Andrea Anđelković](https://github.com/AndreaA44)
  * [Luka Petrušić](https://github.com/LukaFER99)

  ## Backend
   * [Dominik Papić](https://github.com/Dominik-Papic)
   * [Marko Knez](https://github.com/MarkoKnezFER)
   * [Mislav Štrukelj](https://github.com/MStrukelj)

  ## Dokumentacija
   * [Sasha Lucić](https://github.com/lucxix)
# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
