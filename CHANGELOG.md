# Changelog – Signalanlæg App

---

## v56.7
- **Milewide master** har nu korrekte varenumre fra CSV (0402/0404/0405/0409/0420)
- **Konsol svingbar** (270-500-3004) tilføjet under Beslag og støtteholdere

## v56.6
- **iPhone optimering:**
  - Safe area support (notch og home bar)
  - Alle inputs 16px så Safari ikke zoomer ind
  - Større touch-mål på alle knapper (min 48px)
  - Add-forms stables lodret på mobil
  - Knapper i card-header fylder fuld bredde
  - viewport-fit=cover for edge-to-edge display

## v56.5
- **Auto-regel: Lanterne 4-felt polsk pissignal** → 2m Lanternekabel 7G1mm Sort (250-100-0365)
- **Redigér udstyr** — kategori og vare-dropdown (varer opdateres live ved kategori-skift)
- **Stykliste format** — kategorier som tekstliste øverst, samlet tabel med alle varer nederst

## v56.4
- **Stykliste tabel** — padded ASCII tabel med faste kolonnebredder i txt, pæn markdown-tabel i md
- **Stykliste kun samlet** — ingen mast-opdeling, kun total oversigt pr. kategori
- **Rettet: Slet signal** virkede ikke
- **Rettet: Redigér signal** — nu med dropdown for kategori og signaltype (opdateres live), plus højde
- **Opeka DSI** — "DSI signal" omdøbt til Opeka DSI

## v56.3
- Stykliste vises ikke længere på skærmen — kun download-knap i output-sektionen
- Stykliste format-valg og download-knap er nu samlet med output-knapperne

## v56.2
- Rettet: Signal og udstyr sektioner lukkede sig igen når man ændrede en dropdown — åben/lukket state bevares nu på tværs af re-renders

## v56.1
- Rettet: Signal og udstyr sektioner kunne ikke åbnes — klik på tekst/badge bobler nu korrekt til toggle

## v56
- **Nye signalgrupper:** Opeka 2 punkt, DSI signal, Atki DSI, Atki 2 punkt, Glødepære 2 punkt, Glødepære DSI (alle med 4/3/2/1-felt)
- **Signal og udstyr sektioner starter minimerede** — tryk ▸ for at åbne, viser antal som badge
- **Stykliste omskrevet** — samlet oversigt på tværs af alle master, rent og overskueligt design
- **Eksportér dette anlæg** — ny knap der kun eksporterer det aktive anlæg som JSON
- Kabler vises altid i meter i styklisten (rettet)

## v55.3
- Rettet: Kabler vises nu altid i meter (m) i stykliste og output — ikke stk.

## v55.2
- Rettet: Højde-valg på signal virkede ikke — select fik forkert værdi fordi redigér-formen brugte samme felt-navn

## v55.1
- **Auto-regel: Forlænger arm** → automatisk 1× Forlænger arm til Radar (250-650-0148) når udstyr monteres på arm
- Max 1 arm pr. mast — vises kun én gang i styklisten selvom flere enheder sidder på samme arm

## v55
- **Redigér auto-varer** — dropdown for vare (kun fra samme kategori) og antal (0.5–20)
- **Auto-regel: Klemrækker** → automatisk 1× Sejldugspose (250-300-1100)
- **Auto-regel: DSI master** → automatiske hætter:
  - Lav DSI mast → 1× Tophætte (270-500-3005)
  - Høj DSI mast → 1× Tophætte + 1× Mellemhætte
  - DSI Galgemast cykel/høj → 1× Mellemhætte (270-500-3006)
- DSI mast-hætter vises direkte på mastkortet og tæller med i styklisten

## v54.2
- **Redigér auto-varer** — ✎ knap på hver auto-vare åbner inline redigering af antal og varenr.
- Ændrede auto-varer viser "ændret" badge i stedet for "auto"
- Overrides gemmes pr. signal/udstyr og respekteres i stykliste og output

## v54.1
- **Redigér-knap (✎)** på signaler og ekstra udstyr — ret betegnelse, højde, antal og note uden at slette
- **Advarsel ved manglende højde** — ⚠ Højde badge på signaler uden højde valgt
- **Mast-filter i output** — vælg hvilke master der inkluderes i output via checkboxes (Alle/Ingen)
- **Naturlig sortering** af master — S1, S2, S10 i stedet for S1, S10, S2

## v54
- Rettet: Antal-felt og meter-felt havde samme felt-navn — antal viste altid 1 i styklisten uanset hvad man indtastede

## v53
- Rettet: Antal blev gemt som tekst i stedet for tal — stykliste og output viser nu korrekt antal

## v52
- Antal-felt for alt ekstra udstyr (ikke kun kabler)
- Forlænger arm toggle vises automatisk ved radar/kamera valg
- Spændbånd beregnes automatisk baseret på mastetype og montering:
  - ø127/DSI → 130-150mm (280-850-0009)
  - Alu-round Ø135/Milewide → 140-160mm (280-850-0010)
  - Alu-round Ø165 → 170-190mm (280-350-0013)
  - På forlænger arm: Smartmicro/Heimdall → 90-110mm, Flir → 50-70mm
  - Tilslutningsboks Heimdall: ingen spændbånd
- Spændbånd 50-70mm (280-850-0016) tilføjet i katalog
- Rettet: Lanterne 3-felt 5W havde forkert varenr — er nu 167-250-0831

## v51
- "NIL/KLO" credit tilføjet diskret i header
- CHANGELOG.md inkluderes fra nu af i alle versioner

## v50
- Ved indlæsning af gemt anlæg starter alle master nu minimerede

## v49
- Stykliste og Output starter minimerede — tryk ▸ for at åbne

## v48
- Master forbliver minimerede ved re-render (tilføj ny mast åbner ikke andre)
- Auto-gem efter 15 sekunder inaktivitet (kun hvis anlægsnummer eller navn er udfyldt)
- Stykliste og Output kan minimeres/udvides med ▾/▸ knap

## v47
- Rettet: Ekstra udstyr minimerer nu korrekt sammen med masten

## v46
- Nye DSI beslag: Konsol nedafvendt DSI (270-500-3001), Ophæng Universal DSI (270-500-3008), Vægbeslag DSI (270-500-3009)
- Auto-regel: Vægbeslag DSI → automatisk Ophæng Universal DSI (og omvendt)
- Auto-regel: Heimdall radar (195/156) → 4m Lanternekabel 5G1mm + 2× Spændbånd 130-150mm (gælder ikke tilslutningsboks)
- Lanternekabel under Ekstra udstyr: meter-felt vises automatisk ved valg af kabel

## v45
- Mast-kort kan minimeres/udvides med ▾/▸ knap
- Minimeret mast viser opsummering (fx "2 signaler, 1 udstyr")

## v44
- Ny signalkategori: Cykelsignaler
  - Lanterne 4-felt SEA (167-250-0914)
  - Lanterne 4-felt polsk pissignal (167-250-0501)

## v43
- Varer uden varenr. får nu interne ID'er (INTERN-...) så de kan tilføjes
- Interne ID'er vises aldrig i menuer, badges, stykliste eller output
- Berørte varer: GL. Kbh/Swarco klemrækker, Swarco/Scandinavia fodgænger tryk

## v42
- Ny kategori under Ekstra udstyr: Diverse
  - Baggrundsplade Siemens (167-650-0685)

## v41
- Tilslutningsboks til Heimdall (167-665-0066) tilføjet under Heimdall

## v40
- DSI Tophætte (270-500-3005) og DSI Mellemhætte (270-500-3006) tilføjet under Beslag og støtteholdere

## v39
- Varenumre vises ikke længere i udstyr-dropdown menuerne
- Varenumre vises stadig i stykliste og output

## v38
- Komplet nyt mørkt professionelt design (DM Sans + DM Mono fonte)
- Blå accent-streg på mastkort, gul på stykliste
- Pill-badges med varenumre i monospace
- Auto-varer vises i grønt
- Fuld iPhone-optimering: større touch-mål, ingen zoom på inputs, sticky header

## v37
- iPhone-optimering: font-size 16px forhindrer zoom, større knapper (min 44px)
- Sticky header, add-form stables lodret på mobil
- PWA meta-tags: kan tilføjes til hjemskærm fra Safari

## v36
- Ny kategori under Ekstra udstyr: Heimdall
  - Heimdall 24V radar Stopline (167-665-0063)
  - Heimdall 24V Fodgænger (167-665-0065)

## v35
- Stykliste kan nu downloades som både Markdown (.md) og Tekst (.txt)

## v34
- AluStar DSI: tilføjet 4-lys, 2-felt fodgænger, 1-felt
- AluStar 2 punkt: tilføjet 2-felt fodgænger, 1-felt

## v33
- Scandinavia fodgænger tryk flyttet ind under Swarco (samme producent)

## v32
- Ny undermenu under Fodgænger Tryk → Swarco:
  - Swarco Touch uden tryk, fodgænger tryk, fodgænger tryk med lyd
  - Scandinavia fodgænger tryk, med lydgiver, uden tryk

## v31
- Klemrækker: tilføjet GL. Kbh 27/37 leder, GL. Swarco 27/37 leder, Nyere Swarco 27/37 leder

## v30
- Fjernet fra Ekstra udstyr menu: Pilelinjer og skygger, NOIKLX kabler, Vaselinekabler, Styreskab

## v29
- Forlænger arm til Radar (250-650-0148) tilføjet under Smartmicro Radar

## v28
- Auto-regel: Alle Smartmicro-typer → 2× Spændbånd 130-150mm (280-850-0009)

## v27
- Smartmicro Type 29 (250-650-0160) og Type 30 (250-650-0161) tilføjet i katalog
- Auto-regel: Type 29/30 → Konsol UMMR for Radar 29/44/45
- Auto-regel: Type 48 → Konsol UMMR for Radar 42/48

## v26
- Auto-regel: Smartmicro Type 44/45/48 → Kabel UMMR til radar (250-650-0159)
- Auto-regel: Smartmicro Type 44/45 → Konsol UMMR 29/44/45 (250-650-0137)

## v25
- Auto-regel: Flir TrafiOne → 2× Spændbånd 130-150mm (280-850-0009) tilføjet

## v24
- Auto-regel: Flir TrafiOne 195/156 → 8m Kabel Kat 6A (250-100-1997)
- Auto-varer for Ekstra udstyr vises nu på mastkort og i output
- Auto-udstyr vises i stykliste

## v23
- Konsol Universal DSI (270-500-3003) tilføjet under Beslag og støtteholdere

## v22
- Auto-regel: DSI signal (inkl. Swarco AluStar DSI) → 1× Konsol opadvendt DSI (270-500-3002)
- Konsol opadvendt DSI tilføjet i varekatalog

## v21
- Ekstra udstyr menu: første 10 kategorier (master, fundamenter, signalhoveder) fjernet
- Ny kategori: Fodgænger Tryk med undermenu Prisma, RTB, Swarco
- Alle Prisma-varer flyttet under Fodgænger Tryk → Prisma
- RTB tryk-varer flyttet under Fodgænger Tryk → RTB
- Stykliste viser nu korrekt lanterner fra signaler
- Stykliste viser varer fra underkategorier

## v17 (udgangspunkt)
- Lanterner fra signaler tæller med i stykliste
- Mastetype inkluderet i stykliste og output med varenr.
- Mastetype vælges kun ét sted (fjernet duplikat dropdown på mastkort)
- Kabelantal vises korrekt som meter (ikke stk.)

---

*App udviklet til dokumentation af trafiksignalanlæg*
