# SAIL TOGETHER! — MASTERPLAN

Co-op-seglingskomedi i förstaperson. Hela spelet byggs runt **leveransresor** —
inte skattjakt, inte mobbdödande. Lasten är fysisk, däcket är halt och din
kompis är farligare än havet.

---

## De fem lagarna (bryts aldrig)

1. **Kaoset är produkten.** Varje system ska kunna mata däckskaoset.
   En feature som inte kan orsaka en rolig olycka är fel feature.
2. **Uppgraderingar gör ALDRIG seglingen lättare.** Ingen autopilot, inget
   stabilare däck, ingen anti-halka. Progression köper MER kaos (mer last,
   fler stationer, värre rutter) — aldrig mindre.
3. **Misslyckande är billigt men dramatiskt.** Att sjunka kostar lasten och
   stoltheten, aldrig framsteg. Max 20 sekunder från katastrof till nästa
   rundas start. Misslyckanden ska bli historier, inte surhet.
4. **Vågrytm i varje runda.** Lugn (småprat, moppning) → spik (vindby!
   grund! måsattack!) → panik → återhämtning. Aldrig 100 % skrik —
   lugnet är det som gör spikarna roliga.
5. **Sekundloopen är helig.** Segla/trimma/styra/moppa/släpa ändras inte.
   Allt nytt existerar för att mata den, inte ersätta den.

---

## Loop-arkitekturen

```
SEKUNDLOOPEN  (finns, ändras aldrig)
  trimma · styra · moppa · greppa/släpa · hoppa/simma · halka

RUNDLOOPEN    (5–10 min — hjärtat, det vi bygger nu)
  hamn: ta uppdrag + lasta lådor  →  segla rutten (händelsespikar)
  →  leverera (betalt per HEL låda)  →  tillbaka/vidare  →  andrum

METALOOPEN    (mellan rundor)
  guld  →  kaos-butiken (större lastdäck, kanon, pråm, hattar)
        →  svårare rutter (värre väder, nya faror, bättre betalt)
```

---

## Nuläge — Fas 0 ✅ (allt detta är byggt och verifierat)

Segelfysik (no-go/tack/roder-kräver-fart), 3 båtstorlekar, FP-kamera m.
mus/drag-look, hopp/simning/leash, stationer (roder+skot), däckshalka av
måsbajs + moppsystem (E/LMB/F, 2 moppar i co-op), grepp = dragkamp med
mus-drag + strain + liten knuff, fjäder-ragdolls (flopp/limp/uppresning),
googly-ögon som stirrar på närmaste pirat, väder (sol/mulet/stormby m.
regn+blixt), AAA-vatten på Q, karta på M, dockning vid pir, 4 extra öar,
val/haj/fiskar/vrakgods, ljudlandskap, PeerJS drop-in co-op (4-bokstavskod,
host-auktoritativ), dev-hook `__sail` för deterministisk verifiering.

**Den enda "rundan" idag:** segla till piren och docka. Det ersätts av Fas 1.

---

## Fas 1 — Lasten & leveransen (kärnrundan) ⬅ NÄSTA

Målet: en komplett runda med början, slut och betalning. Efter Fas 1 ÄR
det här ett spel.

**Ramar (beslutade):**
- Man börjar ALLTID med sloopen — skiff & galleon flyttar in i kaos-butiken
  (Fas 3) som upplåsningar. Menyn väljer inte båt.
- **Ingen parkeringsindikation.** Det som räknas är att lasten bärs in i
  leveransarean: *stanna båten → bär av lasten → få betalt*. Dockzoner,
  "DOCKED!"-skärmen och dockningslogiken tas bort.
- Båten **spawnar förtöjd vid hemmapirens kaj** och piraterna börjar PÅ
  bryggan — man kliver ombord och påbörjar äventyret.
- **Ankaret**: E vid ankarspelet i fören droppar ankaret (båten stannar
  snabbt, seglet släpps), E igen hivar upp det. Ankaret är hur man
  "parkerar" — var som helst, på riktigt.
- Nytt karaktärsläge **iland**: gå på bryggor (och senare stränder), kliv
  av/på båten med E vid gångbordet, klättra upp ur vattnet på bryggan.

### 1a. Fysisk däckslast
- Lådor & tunnor som fysikobjekt på däck (pool ~12): de **GLIDER** med
  kränging/svängar/halka — exakt samma pseudo-tröghetsmodell som
  karaktärerna (återanvänd slide-koden, annan friktion/massa per lasttyp).
- Glider de genom gångbord/över reling (vid hopp-stänk-krafter): plums,
  flyter 10 s (bärgningschans!), sen sjunker de. Lådor på splats åkerextra.
- Stapling: lådor kan stå på varandra (enkel höjdnivå 0/1), ras vid lutning.
- **Klart när:** en låda på fördäck glider till relingen och åker i sjön vid
  en hård gipp i stormby, och kan fiskas upp om man är snabb.

### 1b. Bära & lasta
- E plockar upp låda (tvåhandsfattning: långsammare gång, ingen mopp/grepp
  samtidigt), E sätter ner, F kastar mjukt (kort knuff — samma som pirater).
- Lastzon på hemmapiren: lådor spawnar på kajen, bärs ombord, räknas när de
  står på däck. Leveranszon på målön: bär iland → räknas + betalas.
- **Klart när:** två spelare kan lasta 6 lådor, segla, och bära iland dem.

### 1c. Rundans ramverk
- Tillstånd: I_HAMN → LASTAR → TILL_SJÖSS → LEVERERAR → SAMMANFATTNING.
- Rundsammanfattning: lådor levererade/tappade, tid, guld, "dagens olycka"
  (t.ex. "P2 spenderade 94 s i vattnet").
- Andrum i hamn: inget väder, måsarna håller sig borta, musik ner.
- **Klart när:** loopen hamn→leverans→hamn går att spela tre varv i sträck
  utan dödläge, och sammanfattningen visar rätt siffror hos båda spelarna.

### 1d. En (1) handbyggd rutt
- Hemmahamn (nuvarande pir) → palmön i öster (150,-70) får egen liten kaj.
- Betalning per hel låda + tidsbonus som ALDRIG kräver vansinnessegling
  (bonusen ska fresta, inte tvinga).
- **Klart när:** en kompetent duo klarar rundan på ~6 min med 5/6 lådor.

---

## Fas 2 — Rutter & händelsedirektören

Målet: variation och vågrytmen, så att runda #10 inte känns som runda #1.

### 2a. Ruttnät
- Kajer på alla 4 småöar. Ruttdata: sträcka, motvindsandel, klippfält,
  basrisk → betalning. 2–3 valbara uppdrag per hamnbesök (uppdragstavla).
- **Klart när:** man kan välja mellan en trygg kort och en girig lång rutt.

### 2b. Händelsedirektören
- En regissör med intensitetskurva (lugn→spik→vila) som schemalägger:
  **vindby** (10 s dubbel vind + vridning, förvarning: mörk strimma på
  vattnet), **måssvärm** (5–8 bajsare på en gång, förvarning: skränkör),
  **långvåg** (en stor dyning som lutar däcket rejält i 4 s).
- Direktören får ALDRIG trigga spik under LASTAR/SAMMANFATTNING (lag 4).
- **Klart när:** en 6-minutersrunda har 2–3 kännbara spikar och mätbara
  lugn (täcknings-test via hook: intensitetskurvan ser ut som vågor).

### 2c. Försäkringsbrev (valbar risk)
- Vid lastning: välj att stuva surrade lådor (−20 % betalt) eller löst
  (full betalning). Surrning = ett rep-objekt som håller tills det slits
  av EN hård smäll. Risk/belöning utan menyer — det syns på däcket.
- **Klart när:** valet känns i magen, inte i menyn.

---

## Fas 3 — Guld & kaos-butiken (metaloopen)

Målet: skäl att spela "en runda till", utan att bryta lag 2.

### 3a. Ekonomi & persistens
- Guld per levererad låda; host äger saldot (localStorage + i snapshot).
- Prislappar grovt: 1 runda = råd med 1 liten grej, 3–4 rundor = stor grej.

### 3b. Butiken (i hamn, mellan rundor)
- **Skeppen**: man börjar alltid med sloopen — **skiffen och galleonen
  köps här** (skiff = kvick och tippig med få lådplatser; galleon = 14
  lådor och ett vandrande försäkringsärende).
- **Större lastdäck**: +4 lådplatser (= mer pengar, mer yta att tappa på).
- ✅ **Kanonen**: ny station (A/D sikta, W/S höj, LMB skjut, 3 s omladdning).
  Köpt som ren dumhet — rekyl knuffar skrovet, den som står bakom kanonen
  golvas, och en träffad mås ger HÄMNDSVÄRM (5–8 bombare).
- ✅ **Pråm på släp**: +6 lådor på släplina som fiskstjärtar SJÄLV (låg
  lateral dämpning), rycker i aktern, och KAPSEJSAR vid för vild sväng —
  dumpar allt, rätar sig efter 10 s. Hitch/unhitch vid hemmaförtöjningen.
- ✅ **Hattar.** Viktigast. Kosmetik som åker av vid knockdown och flyter.
- **Klart när:** alla köp gör livet roligare och INGET köp gör det lättare. ✅

### 3c. Ruttlås
- Svårare rutter (längre, stormigare, trängre passager) låses upp av guld —
  de BETALAR mer för att de KOSTAR mer nerver.

---

## Fas 4 — Storm, läckor & att sjunka vackert

Målet: den stora dramaturgin — och det billiga misslyckandet (lag 3).

### 4a. Vatten i båten
- Hårda smällar (grund/klippa i fart) slår **läckor**: synligt hål +
  vattenstråle + stigande vattennivå på däck (visuell plan + siffra).
- Vattennivån påverkar: tyngre båt (segt roder), lådor FLYTER runt på
  däck när nivån stiger (kaos-guld).

### 4b. Ösa-jobbet
- Hinken (finns redan vid moppen!) blir verktyg: fyll vid läckan, töm
  över relingen. Ny triage: styra/trimma/moppa/ösa/bära — fler jobb än
  händer, alltid.
- **Klart när:** en läcka mitt i en storm tvingar ett högljutt beslut om
  vem som släpper vad.

### 4c. Sjunka & återkomst
- Nivå full → båten sätter sig, sjunker på 10 s (tid att rädda EN låda
  var). Kameran under ytan, tystnad, en fisk simmar förbi.
- Uppspolade på närmaste strand, båten ankrad utanför, lasten borta.
  **20 sekunder** från bubblor till nästa rundstart. Sammanfattningen
  döper haveriet ("Katastrofen vid Skäret, 14:03").
- **Klart när:** att sjunka får testpersoner att SKRATTA och trycka
  "en runda till".

### 4d. Storm tier 2
- Direktören får storm som rundhändelse på svåra rutter: vågor som spolar
  över däck (skjuter lådor/pirater), sikt ner, blixtar närmare.

---

## ~~Faror med avsikt~~ (PARKERAD — tas ev. in igen senare)

Borttagen ur planen tills vidare. Idéerna sparas här i kortform om vi
ångrar oss: klippfält/strömmar, kapare-skiff som stjäl lådor (ger kanonen
syfte), kraken-tentakel som bonkas med moppen.

---

## Teknisk backlog (för senare — rör inte kärnloopen)

- **FFT-vatten**: byt Gerstner-stacken mot en Fast Fourier Transform-baserad
  vågsimulering (à la Sea of Thieves), **synkroniserad mellan CPU (fysik)
  och GPU (grafik)** så att båt/last/karaktärer kan läsa exakt samma våghöjd
  som syns på skärmen. **Chunk-baserad** så havet kan vara stort utan att
  hela ytan simuleras varje frame. Kräver: vågspektrum (Phillips/JONSWAP),
  IFFT på GPU (eller WASM på CPU + textur-upload), höjdsampling per chunk
  för fysiken, LOD per chunk-avstånd. Stort jobb — görs som egen fas när
  rundloopen är bevisad, och ALLTID med flat-vatten-fallback kvar på Q.

---

## Fas 5 — Skala & utsläpp

- Deploy till URL (GitHub Pages) så ingen skickar filer.
- Reläserver (Socket.IO på Render, Sviten-receptet) om PeerJS-brokern
  strular för folk — same protokoll, annan transport.
- 3–4 spelare utvärderas EFTER att 2P-rundloopen är bevisad (fler händer
  = behöver fler jobb; kanon+ösa+pråm måste finnas först).
- Balanspass: båtarna får lastkapacitet som identitet (skiff = 4 lådor
  och kvick; galleon = 14 lådor och ett vandrande försäkringsärende).

---

## Byggordning & disciplin

1. Varje delfas verifieras i browsern via `__sail`-hooken innan nästa
   påbörjas (samma regim som hittills — deterministiska steg + loopback-
   gäst för allt nätat).
2. Fysikregressionssviten (beam reach ≈ 8.6, no-go, roder-vid-fart) körs
   efter varje fas. Sekundloopen är helig.
3. En fas = en spelbar förbättring. Aldrig två halvfärdiga faser samtidigt.
4. Efter Fas 1: speltest med riktiga människor INNAN Fas 2 låses —
   rundlängd och betalning tunas mot verkliga skratt, inte teori.
