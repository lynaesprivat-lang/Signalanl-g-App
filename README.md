# Signalanlæg – Kategoriseringsværktøj

En standalone web app til at dokumentere trafiksignalanlæg med master og signaler. Genererer Markdown (til Obsidian) eller almindelig tekst.

## Kom i gang

1. Udpak mappen et sted på din computer (fx `~/Documents/signalanlaeg-app/`)
2. Dobbeltklik `index.html` – så åbner den i din standardbrowser
3. Begynd at registrere anlæg

Ingen server eller installation nødvendig.

## Funktioner

- **Anlægsoplysninger**: Anlægsnummer, tegningsnummer, revision, navn, type (enkelt/dobbelt)
- **Master**: S1, S2, ... med mastetype (høj/lav/cyklistgalge)
- **Ekstra udstyr**: Termisk kamera, radar, trafikkamera, ITS-sensor, detektor, højttaler, fodgængertryk (m./u. tryk), cyklisttryk, andet
- **Signaler**: Signaltype (fra signaturforklaring), betegnelse (fx A1H, CyA1, af), højde (højt/lavt), note
- **Output-valg**: Markdown (.md) eller tekst (.txt)
- **Download eller kopiér** outputtet
- **Gem i browser**: Anlæg gemmes lokalt i localStorage – overlever genstart
- **JSON-eksport/import**: Flyt anlæg mellem maskiner eller tag backup

## Filstruktur

```
signalanlaeg-app/
├── index.html     ← Åbn denne i browseren
├── styles.css     ← Styling
├── app.js         ← App-logik
└── README.md      ← Denne fil
```

## Tips til Obsidian-brug

- Download Markdown-filen og læg den i din Obsidian-vault
- YAML frontmatter gør anlægget søgbart via `tag:#signalanlæg` eller efter anlægsnummer
- Med Dataview-pluginet kan du lave en samlet oversigt:
  ```dataview
  TABLE anlægsnummer, revision, type, dato
  FROM #signalanlæg
  SORT dato DESC
  ```

## Backup

JSON-eksporten indeholder alle dine gemte anlæg. Behold den et sikkert sted – hvis din browsers localStorage ryddes, kan du importere JSON-filen tilbage.

## Browserkrav

Moderne browser (Chrome, Firefox, Safari, Edge – en version fra de seneste par år). Appen bruger kun standard web-API'er og ingen eksterne biblioteker.

## Privatliv

Alt gemmes lokalt i din browser. Ingen data sendes nogensinde noget sted hen.
