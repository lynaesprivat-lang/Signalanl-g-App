// Signalanlæg - Kategoriseringsværktøj
// App-logik

(function () {
  'use strict';

  // ==============================
  // Konstanter
  // ==============================
  const SIGNAL_KATEGORIER = [
    {
      kategori: 'Ercolight / Silux 2 punkt',
      typer: [
        { label: 'Lanterne 3-felt 5W',            varenr: '167-250-0813' },
        { label: 'Lanterne 3-felt 17W',           varenr: '167-250-0531' },
        { label: 'Lanterne 3-felt 24V',           varenr: '167-250-0931' },
        { label: 'Lanterne 2-felt fodgænger 5W',  varenr: '167-250-0821' },
        { label: 'Lanterne 2-felt fodgænger 17W', varenr: '167-250-0521' },
        { label: 'Lanterne 2-felt fodgænger 24V', varenr: '167-250-0921' },
        { label: 'Lanterne 1-felt 5W',            varenr: '167-250-0813' },
        { label: 'Lanterne 1-felt 17W',           varenr: '167-250-0513' },
        { label: 'Lanterne 1-felt 24V',           varenr: '167-250-0913' },
      ]
    },
    {
      kategori: 'Ercolight / Silux DSI',
      typer: [
        { label: 'Lanterne 3-felt DSI 5W',            varenr: '167-250-0833' },
        { label: 'Lanterne 3-felt DSI 17W',           varenr: '167-250-0533' },
        { label: 'Lanterne 2-felt fodgænger DSI 5W',  varenr: '167-250-0823' },
        { label: 'Lanterne 2-felt fodgænger DSI 17W', varenr: '167-250-0523' },
        { label: 'Lanterne 1-felt DSI 5W',            varenr: '167-250-0815' },
        { label: 'Lanterne 1-felt DSI 17W',           varenr: '167-250-0515' },
      ]
    },
    {
      kategori: 'Swarco AluStar DSI',
      typer: [
        { label: 'AluStar DSI 4-lys', varenr: '' },
        { label: 'AluStar DSI 3-felt', varenr: '' },
        { label: 'AluStar DSI 2-felt fodgænger', varenr: '' },
        { label: 'AluStar DSI 1-felt', varenr: '' },
      ]
    },
    {
      kategori: 'Swarco AluStar 2 punkt',
      typer: [
        { label: 'AluStar 2 punkt 3-felt', varenr: '' },
        { label: 'AluStar 2 punkt 2-felt fodgænger', varenr: '' },
        { label: 'AluStar 2 punkt 1-felt', varenr: '' },
      ]
    },
  ];

  // Flad liste – kun labels til output (ingen varenr)
  const SIGNAL_TYPER = SIGNAL_KATEGORIER.flatMap(k => k.typer.map(t => t.label));

  const HOJDE_MULIGHEDER = ['', 'Højt', 'Lavt'];

  // ==============================
  // Varekatalog
  // ==============================
  const VAREKATALOG = [
    {
      kategori: 'Master til nedgravning',
      varer: [
        { varenr: '270-200-0105', beskrivelse: 'Høj mast for nedgravning 5,1m ø127', bem: '2 punkt montage' },
        { varenr: '270-200-0104', beskrivelse: 'Lav mast for nedgravning 3,1m ø127', bem: '2 punkt montage' },
        { varenr: '270-200-0103', beskrivelse: 'Tryk mast for nedgravning m. Luge', bem: '' },
        { varenr: '270-200-0109', beskrivelse: 'Mast 6,1m Ø127 til Radar for nedg.', bem: '' },
        { varenr: '270-200-0141', beskrivelse: 'Lav DSI mast', bem: '' },
        { varenr: '270-200-0142', beskrivelse: 'Høj DSI mast', bem: '' },
      ]
    },
    {
      kategori: 'Alu-round master',
      varer: [
        { varenr: '270-200-0302', beskrivelse: 'Mast Alu-round 3,1m Ø135', bem: '' },
        { varenr: '270-200-0303', beskrivelse: 'Mast Alu-round 5,3m Ø165', bem: '' },
        { varenr: '270-200-0308', beskrivelse: 'Mast Alu-round 6,3m ø165 til Radar', bem: '' },
      ]
    },
    {
      kategori: 'DSI Galgemaster',
      varer: [
        { varenr: '270-200-0144', beskrivelse: 'DSI Galgemast cykel', bem: '' },
        { varenr: '270-200-0146', beskrivelse: 'DSI Galgemast høj', bem: '' },
      ]
    },
    {
      kategori: 'Fundamentplader',
      varer: [
        { varenr: '270-200-0520', beskrivelse: 'Fu. Plade beton ø 102-130mm', bem: '2 stk. for høj. 1 stk. for lav og tryk mast' },
        { varenr: '270-200-0521', beskrivelse: 'FU. Plade beton rørmast Ø120-165mm', bem: '' },
      ]
    },
    {
      kategori: 'Mastetilbehør',
      varer: [
        { varenr: '250-300-1101', beskrivelse: 'Mastenr. gul folie 0-9', bem: '' },
        { varenr: '270-100-8268', beskrivelse: 'Flangemøtrik', bem: '' },
        { varenr: '270-100-1056', beskrivelse: 'Pindbolt', bem: '' },
      ]
    },
    {
      kategori: 'Signalhoveder – Lanterner 5W',
      varer: [
        { varenr: '167-250-0501', beskrivelse: 'Lanterne 4-felt 100mm ALU', bem: 'Inkl. ALU støtteholder. Klar linser' },
        { varenr: '167-250-0831', beskrivelse: 'Lanterne 4-felt 100mm', bem: 'Inkl. Pc støtteholder. Klar linser' },
        { varenr: '167-250-0813', beskrivelse: 'Lanterne 3-felt', bem: 'Klar linse. Inkl. skygge' },
        { varenr: '167-250-0821', beskrivelse: 'Lanterne 2-felt fodgænger', bem: 'Klar linse. Inkl. skygge' },
        { varenr: '167-650-0685', beskrivelse: 'Lanterne 1-felt', bem: 'Klar linse. Inkl. skygge' },
      ]
    },
    {
      kategori: 'Signalhoveder – Lanterner 17W',
      varer: [
        { varenr: '167-650-0914', beskrivelse: 'Lanterne 4-felt 100mm ALU', bem: 'Inkl. ALU støtteholder. Klar linser' },
        { varenr: '167-250-0303', beskrivelse: 'Lanterne 4-felt 100mm', bem: 'Inkl. Pc støtteholder. Klar linser' },
        { varenr: '167-250-0531', beskrivelse: 'Lanterne 3-felt', bem: 'Klar linse. Inkl. skygge' },
        { varenr: '167-250-0521', beskrivelse: 'Lanterne 2-felt fodgænger', bem: 'Klar linse. Inkl. skygge' },
        { varenr: '167-250-0513', beskrivelse: 'Lanterne 1-felt', bem: 'Klar linse. Inkl. skygge' },
      ]
    },
    {
      kategori: 'Signalhoveder – Lanterner 24V (Siemens Sx)',
      varer: [
        { varenr: '167-250-0931', beskrivelse: 'Lanterne 3-lys 24V', bem: '' },
        { varenr: '167-250-0921', beskrivelse: 'Lanterne 2-lys 24V', bem: '' },
        { varenr: '167-250-0913', beskrivelse: 'Lanterne 1-lys 24V', bem: '' },
      ]
    },
    {
      kategori: 'Signalhoveder – Lanterner 17W DSI',
      varer: [
        { varenr: '167-650-0914', beskrivelse: 'Lanterne 4-felt 100mm ALU DSI op', bem: '' },
        { varenr: '167-650-0306', beskrivelse: 'Lanterne 4-felt 100mm DSI op', bem: '' },
        { varenr: '167-250-0533', beskrivelse: 'Lanterne 3-felt DSI op', bem: 'Klar linse. Inkl. skygge' },
        { varenr: '167-250-0523', beskrivelse: 'Lanterne 2-felt fodgænger DSI op', bem: 'Klar linse. Inkl. skygge' },
        { varenr: '167-250-0515', beskrivelse: 'Lanterne 1-felt DSI op', bem: 'Klar linse. Inkl. skygge' },
      ]
    },
    {
      kategori: 'Silux2 LED moduler 200mm',
      varer: [
        { varenr: '167-650-0152', beskrivelse: '200mm rød led Silux2 inkl. Forramme', bem: 'Hvid linse (5W)' },
        { varenr: '167-650-0153', beskrivelse: '200mm gul led Silux2 inkl. Forramme', bem: 'Hvid linse (5W)' },
        { varenr: '167-650-0673', beskrivelse: '200mm grøn led Silux2 inkl. Forramme', bem: 'Hvid linse (5W)' },
        { varenr: '167-650-0121', beskrivelse: '200mm rød led Silux2 inkl. Forramme', bem: 'Hvid linse (17W)' },
        { varenr: '167-650-0122', beskrivelse: '200mm gul led Silux2 inkl. Forramme', bem: 'Hvid linse (17W)' },
        { varenr: '167-650-0123', beskrivelse: '200mm grøn led Silux2 inkl. Forramme', bem: 'Hvid linse (17W)' },
        { varenr: '167-650-0151', beskrivelse: 'Baggrundsplade Siemens 3-felt', bem: '' },
      ]
    },
    {
      kategori: 'Masker og indlæg 200mm',
      varer: [
        { varenr: '167-650-0574', beskrivelse: '200mm pilemaske / indlæg rød / gul Silux2', bem: '' },
        { varenr: '167-650-0573', beskrivelse: '200mm pilemaske / indlæg rød / gul Silux2', bem: '' },
        { varenr: '167-650-0674', beskrivelse: '200mm pilemaske / indlæg Grøn Silux2', bem: '' },
        { varenr: '167-650-0671', beskrivelse: '200mm Fodg. maske / indlæg rød Silux2', bem: '' },
        { varenr: '167-650-0672', beskrivelse: '200mm Fodg. maske / indlæg Grøn Silux2', bem: '' },
      ]
    },

    {
      kategori: 'Fodgænger Tryk',
      underkategorier: [
        {
          navn: 'Prisma',
          varer: [
            { varenr: '250-650-0034',   beskrivelse: 'Akustisk signal uden tryk 24VDC Prisma', bem: '' },
            { varenr: '250-650-0035',   beskrivelse: 'Akustisk Fodg.tryk Prisma 24VDC', bem: '' },
            { varenr: '250-650-0037',   beskrivelse: 'Ekstern Højtaler Prisma', bem: '' },
            { varenr: '250-650-0040',   beskrivelse: 'Akustisk Fodg.tryk Prisma (Daps 2000L, RAL5017)', bem: '' },
            { varenr: '250-650-0041',   beskrivelse: 'Fodgængertryk Prisma (6 Wires)', bem: '' },
            { varenr: '250-650-0041/1', beskrivelse: 'Fodgængertryk Prisma med Lysring', bem: '' },
            { varenr: '250-650-0041/2', beskrivelse: 'Fodgængertryk Prisma med Interfacekort 24-49V', bem: '' },
            { varenr: '250-650-0042',   beskrivelse: 'Cykeltryk Prisma', bem: '' },
            { varenr: '250-650-0046',   beskrivelse: 'Akustisk signal uden tryk Prisma', bem: '' },
            { varenr: '250-650-0049',   beskrivelse: 'Akustisk Fodg.tryk Prisma med vibrator', bem: '' },
            { varenr: '250-650-0050',   beskrivelse: 'Mærkat "Tryk for Grønt" Fodg. tryk', bem: '' },
            { varenr: '250-650-0062',   beskrivelse: 'Retningspil Prisma K---', bem: '' },
            { varenr: '250-650-0064',   beskrivelse: 'Retningspil Prisma KK--', bem: '' },
            { varenr: '250-650-0066',   beskrivelse: 'Retningspil Prisma K-KK', bem: '' },
            { varenr: '250-650-0068',   beskrivelse: 'Retningspil Prisma K--K', bem: '' },
            { varenr: '250-650-0069',   beskrivelse: 'Retningspil Prisma KK-KK', bem: '' },
          ]
        },
        {
          navn: 'RTB',
          varer: [
            { varenr: '250-650-0001', beskrivelse: 'RTB Fodg. Tryk Type A 230v', bem: '' },
            { varenr: '250-650-0002', beskrivelse: 'RTB Akustisk tryk A Pit', bem: 'Uden tryk i bund, hvid kvitteringslys' },
            { varenr: '250-650-0003', beskrivelse: 'RTB Akustisk tryk F Pit', bem: 'Tryk i bund, hvidt kvitteringslys' },
            { varenr: '250-650-0005', beskrivelse: 'RTB Fodg. Tryk type A 230v med Relæ', bem: '' },
            { varenr: '250-550-0051', beskrivelse: 'Makat til fodgængertryk RTB', bem: '' },
          ]
        },
        {
          navn: 'Swarco',
          varer: [
            { varenr: '', beskrivelse: 'Swarco Touch uden tryk', bem: '' },
            { varenr: '', beskrivelse: 'Swarco Touch fodgænger tryk', bem: '' },
            { varenr: '', beskrivelse: 'Swarco Touch fodgænger tryk med lyd', bem: '' },
            { varenr: '', beskrivelse: 'Scandinavia fodgænger tryk', bem: '' },
            { varenr: '', beskrivelse: 'Scandinavia fodgænger tryk med lydgiver', bem: '' },
            { varenr: '', beskrivelse: 'Scandinavia uden tryk', bem: '' },
          ]
        },
      ],
      varer: [] // flad liste til stykliste-opslag
    },
    {
      kategori: 'Beslag og støtteholdere',
      varer: [
        { varenr: '167-650-0211', beskrivelse: 'Støtteholder sort kort', bem: '' },
        { varenr: '167-650-0212', beskrivelse: 'Støtteholder sort lang', bem: '' },
        { varenr: '167-650-0323', beskrivelse: 'Støtteholder sort', bem: '' },
        { varenr: '167-650-0231', beskrivelse: 'Top / bund uden støtteholder sort', bem: '' },
        { varenr: '167-650-0324', beskrivelse: 'Bundskrue kort top / bund sort', bem: '' },
        { varenr: '270-500-3002', beskrivelse: 'Konsol opadvendt DSI', bem: '' },
        { varenr: '270-500-3003', beskrivelse: 'Konsol Universal DSI', bem: '' },
      ]
    },
    {
      kategori: 'Spændbånd',
      varer: [
        { varenr: '280-850-0015', beskrivelse: 'Spændbånd 60-80mm Rustfrit stål', bem: '' },
        { varenr: '280-850-0014', beskrivelse: 'Spændbånd 80-100mm Rustfrit stål', bem: '' },
        { varenr: '280-850-0005', beskrivelse: 'Spændbånd 90-110mm Rustfrit stål', bem: '' },
        { varenr: '280-850-0006', beskrivelse: 'Spændbånd 100-120mm Rustfrit stål', bem: '' },
        { varenr: '280-850-0008', beskrivelse: 'Spændbånd 120-140mm Rustfrit stål', bem: '' },
        { varenr: '280-850-0009', beskrivelse: 'Spændbånd 130-150mm Rustfrit stål', bem: '' },
        { varenr: '280-850-0010', beskrivelse: 'Spændbånd 140-160mm Rustfrit stål', bem: '' },
        { varenr: '280-350-0013', beskrivelse: 'Spændbånd 170-190mm Rustfrit stål', bem: '' },
        { varenr: '998-900-0009', beskrivelse: 'Kabelbinder Sort UV bestandig 4,8 x 249mm', bem: '' },
      ]
    },
    {
      kategori: 'Smartmicro Radar',
      varer: [
        { varenr: '250-650-0160', beskrivelse: 'Smartmicro Type 29', bem: '' },
        { varenr: '250-650-0161', beskrivelse: 'Smartmicro Type 30', bem: '' },
        { varenr: '250-650-0165', beskrivelse: 'Smartmicro Type 45', bem: '' },
        { varenr: '250-650-0164', beskrivelse: 'Smartmicro Type 44', bem: '' },
        { varenr: '250-650-0167', beskrivelse: 'Smartmicro Type 48', bem: '' },
        { varenr: '250-650-0159', beskrivelse: 'Kabel UMMR til radar 40/42/44/45/48', bem: '' },
        { varenr: '250-650-0162', beskrivelse: 'Konsol UMMR for Radar 42/48', bem: '' },
        { varenr: '250-650-0137', beskrivelse: 'Konsol UMMR for Radar 29/44/45', bem: '' },
        { varenr: '250-650-0190/1', beskrivelse: 'Radartilslutningsbox til Bluetooth 4', bem: '' },
        { varenr: '250-650-0148', beskrivelse: 'Forlænger arm til Radar', bem: '' },
      ]
    },
    {
      kategori: 'Heimdall',
      varer: [
        { varenr: '167-665-0063', beskrivelse: 'Heimdall 24V radar Stopline', bem: '' },
        { varenr: '167-665-0065', beskrivelse: 'Heimdall 24V Fodgænger', bem: '' },
      ]
    },
    {
      kategori: 'Flir TrafiOne',
      varer: [
        { varenr: '250-650-0118', beskrivelse: 'Flir TrafiOne 195', bem: '' },
        { varenr: '250-650-0119', beskrivelse: 'Flir TrafiOne 156', bem: '' },
      ]
    },


    {
      kategori: 'Netværk og lanternekabel',
      varer: [
        { varenr: '250-100-1997', beskrivelse: 'Kabel Kat 6A F/utp 1x4P PE sort', bem: '' },
        { varenr: '250-100-0363', beskrivelse: 'Lanternekabel 3G1mm Sort', bem: '' },
        { varenr: '250-100-0362', beskrivelse: 'Lanternekabel 5G1mm Sort', bem: '' },
        { varenr: '250-100-0365', beskrivelse: 'Lanternekabel 7G1mm Sort', bem: '' },
        { varenr: '280-700-0831', beskrivelse: 'Kabeldæksbånd 1,8 x 100mm rød', bem: '' },
      ]
    },
    {
      kategori: 'Klemrækker',
      varer: [
        { varenr: '250-300-1001', beskrivelse: 'Klemrække 7-polet', bem: '' },
        { varenr: '250-300-1002', beskrivelse: 'Klemrække 10-polet', bem: '' },
        { varenr: '250-300-1003', beskrivelse: 'Klemrække 14-polet', bem: '' },
        { varenr: '250-300-1004', beskrivelse: 'Klemrække 19-polet', bem: '' },
        { varenr: '250-300-1005', beskrivelse: 'Klemrække 27-polet', bem: '' },
        { varenr: '250-300-1007', beskrivelse: 'Klemrække 37-polet', bem: '' },
        { varenr: '250-300-1008', beskrivelse: 'Klemrække 27+16 polet', bem: '' },
        { varenr: '250-300-1009', beskrivelse: 'Klemrække 37+16 polet', bem: '' },
        { varenr: '250-300-1100', beskrivelse: 'Sejldugspose til klemrække', bem: '' },
        { varenr: '250-300-1010', beskrivelse: 'Jordledning for klemrække til mast', bem: '' },
        { varenr: '', beskrivelse: 'GL. Kbh 27 leder', bem: '' },
        { varenr: '', beskrivelse: 'GL. Kbh 37 leder', bem: '' },
        { varenr: '', beskrivelse: 'GL. Swarco 27 leder', bem: '' },
        { varenr: '', beskrivelse: 'GL. Swarco 37 leder', bem: '' },
        { varenr: '', beskrivelse: 'Nyere Swarco 27 leder', bem: '' },
        { varenr: '', beskrivelse: 'Nyere Swarco 37 leder', bem: '' },
      ]
    },

  ];

  // Hjælpefunktion: slå varenr op (inkl. underkategorier)
  function findVare(varenr) {
    for (const kat of VAREKATALOG) {
      if (kat.underkategorier) {
        for (const under of kat.underkategorier) {
          const v = under.varer.find(v => v.varenr === varenr);
          if (v) return v;
        }
      } else {
        const v = kat.varer.find(v => v.varenr === varenr);
        if (v) return v;
      }
    }
    return null;
  }

  // Hjælpefunktion: slå mastetype op
  function findMasteVarenr(label) {
    for (const g of MASTETYPER_GRUPPER) {
      const m = g.typer.find(t => t.label === label);
      if (m) return m.varenr;
    }
    return '';
  }

  const UDSTYR_TYPER = VAREKATALOG.flatMap(k => k.varer ? k.varer.map(v => v.varenr) : []); // legacy compat

  // Kategorier der vises i Ekstra Udstyr menuen (ikke master/signalhoveder)
  const SKJULTE_KATEGORIER = [
    'Master til nedgravning', 'Alu-round master', 'DSI Galgemaster',
    'Fundamentplader', 'Mastetilbehør',
    'Signalhoveder – Lanterner 5W', 'Signalhoveder – Lanterner 17W',
    'Signalhoveder – Lanterner 24V (Siemens Sx)', 'Signalhoveder – Lanterner 17W DSI',
    'Silux2 LED moduler 200mm',
  ];
  const UDSTYR_MENU = VAREKATALOG.filter(k => !SKJULTE_KATEGORIER.includes(k.kategori));

  const MASTETYPER_GRUPPER = [
    {
      gruppe: 'Master til nedgravning',
      typer: [
        { label: 'Høj mast 5,1m ø127',        varenr: '270-200-0105' },
        { label: 'Lav mast 3,1m ø127',         varenr: '270-200-0104' },
        { label: 'Tryk mast m. Luge',          varenr: '270-200-0103' },
        { label: 'Mast 6,1m Ø127 til Radar',   varenr: '270-200-0109' },
      ]
    },
    {
      gruppe: 'Alu-round master',
      typer: [
        { label: 'Alu-round 3,1m Ø135',           varenr: '270-200-0302' },
        { label: 'Alu-round 5,3m Ø165',           varenr: '270-200-0303' },
        { label: 'Alu-round 6,3m ø165 til Radar', varenr: '270-200-0308' },
      ]
    },
    {
      gruppe: 'DSI master',
      typer: [
        { label: 'Lav DSI mast',       varenr: '270-200-0141' },
        { label: 'Høj DSI mast',       varenr: '270-200-0142' },
        { label: 'DSI Galgemast cykel', varenr: '270-200-0144' },
        { label: 'DSI Galgemast høj',  varenr: '270-200-0146' },
      ]
    },
    {
      gruppe: 'Milewide master',
      typer: [
        { label: 'Milewide Lav',         varenr: '' },
        { label: 'Milewide Høj',         varenr: '' },
        { label: 'Milewide Cykel Galge', varenr: '' },
        { label: 'Milewide Høj Galge',   varenr: '' },
        { label: 'Milewide Tryk Stander', varenr: '' },
      ]
    },
  ];

  // Flad liste til bagudkompatibilitet
  const MASTETYPER = MASTETYPER_GRUPPER.flatMap(g => g.typer.map(t => t.label));

  const STORAGE_PREFIX = 'signalanlaeg:';

  // ==============================
  // State
  // ==============================
  let state = tomtAnlaeg();

  function tomtAnlaeg() {
    return {
      nr: '',
      navn: '',
      master: []
    };
  }

  // ==============================
  // Hjælpefunktioner
  // ==============================
  const $ = id => document.getElementById(id);

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }

  function fullTegningsnr() {
    return state.nr || '';
  }

  function visBesked(tekst, type = 'success') {
    const el = $('status-besked');
    el.textContent = tekst;
    el.style.color = type === 'danger' ? 'var(--danger)' : 'var(--success)';
    setTimeout(() => { el.textContent = ''; }, 2500);
  }

  // ==============================
  // Rendering
  // ==============================
  function renderMaster() {
    const container = $('master-liste');
    if (state.master.length === 0) {
      container.innerHTML = '<section class="card"><p class="empty-state">Ingen master tilføjet endnu. Opret en ovenfor.</p></section>';
      return;
    }

    container.innerHTML = state.master.map((mast, mastIdx) => renderMastCard(mast, mastIdx)).join('');
  }

  function renderMastCard(mast, mastIdx) {
    const udstyrHtml = (mast.udstyr && mast.udstyr.length > 0)
      ? mast.udstyr.map((u, uIdx) => {
          const vare = u.varenr ? findVare(u.varenr) : null;
          const autoVarer = autoVarerForUdstyr(u);
          const autoHtml = autoVarer.map(v => {
            const autoVare = findVare(v.varenr);
            const antalLabel = Number.isInteger(v.antal) ? `${v.antal}×` : `${v.antal}m`;
            return `<div class="auto-vare-row">
              <span class="auto-vare-ikon">↳</span>
              <span class="auto-vare-label">${antalLabel} ${escapeHtml(autoVare ? autoVare.beskrivelse : v.varenr)}</span>
              <span class="badge badge-auto">auto</span>
            </div>`;
          }).join('');
          return `
            <div class="item-row">
              <span class="badge badge-warning">${escapeHtml(u.varenr || u.type || '')}</span>
              <span class="item-label">${escapeHtml(vare ? vare.beskrivelse : (u.type || ''))}</span>
              ${u.betegnelse ? `<span class="item-note">${escapeHtml(u.betegnelse)}</span>` : ''}
              <button class="btn-icon" data-action="del-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}">×</button>
            </div>
            ${autoHtml}
          `;
        }).join('')
      : '<p class="empty-state">Intet ekstra udstyr</p>';

    const signalerHtml = mast.signaler.length > 0
      ? mast.signaler.map((sig, sigIdx) => {
          const autoVarer = autoVarerForSignal(sig);
          const autoHtml = autoVarer.map(v => {
            const vare = findVare(v.varenr);
            const antalLabel = Number.isInteger(v.antal) ? `${v.antal}×` : `${v.antal}m`;
            return `<div class="auto-vare-row">
              <span class="auto-vare-ikon">↳</span>
              <span class="auto-vare-label">${antalLabel} ${escapeHtml(vare ? vare.beskrivelse : v.varenr)}</span>
              <span class="badge badge-auto">auto</span>
            </div>`;
          }).join('');
          return `
            <div class="item-row">
              <span class="badge">${escapeHtml(sig.betegnelse || '?')}</span>
              <span class="item-label">${escapeHtml(sig.type)}</span>
              ${sig.hojde ? `<span class="badge badge-neutral">${escapeHtml(sig.hojde)}</span>` : ''}
              ${sig.note ? `<span class="item-note">${escapeHtml(sig.note)}</span>` : ''}
              <button class="btn-icon" data-action="del-signal" data-mast="${mastIdx}" data-sig="${sigIdx}">×</button>
            </div>
            ${autoHtml}
          `;
        }).join('')
      : '<p class="empty-state">Ingen signaler</p>';

    const udstyrOptions = UDSTYR_TYPER.map(u => `<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join('');
    const signalOptions = SIGNAL_TYPER.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    const hojdeOptions = HOJDE_MULIGHEDER.map(h => `<option value="${escapeHtml(h)}">${h || '—'}</option>`).join('');
    const mastetypeOptions = MASTETYPER_GRUPPER.map(g =>
      `<optgroup label="${escapeHtml(g.gruppe)}">${g.typer.map(m =>
        `<option value="${escapeHtml(m.label)}"${m.label === mast.mastetype ? ' selected' : ''}>${escapeHtml(m.label)}</option>`
      ).join('')}</optgroup>`
    ).join('');

    return `
      <section class="mast-card">
        <div class="mast-header">
          <div>
            <span class="mast-title">${escapeHtml(mast.mastId)}</span>
            <span class="mast-subtype-label">${escapeHtml(mast.mastetype)}</span>
          </div>
          <button class="btn-icon" data-action="del-mast" data-mast="${mastIdx}">Slet mast</button>
        </div>

        <div class="mast-section">
          <div class="mast-section-label">Signaltype</div>
          ${signalerHtml}
          <div class="add-form">
            <div class="field">
              <label>Kategori</label>
              <select data-field="signalkategori" data-mast="${mastIdx}">
                <option value="">— Vælg kategori —</option>
                ${SIGNAL_KATEGORIER.map(k => `<option value="${escapeHtml(k.kategori)}">${escapeHtml(k.kategori)}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label>Præcis type</label>
              <select data-field="signaltype" data-mast="${mastIdx}" disabled>
                <option value="">— Vælg kategori først —</option>
              </select>
            </div>
            <div class="field field-small">
              <label>Betegnelse</label>
              <input type="text" data-field="betegnelse" data-mast="${mastIdx}" placeholder="A1H" />
            </div>
            <div class="field field-small">
              <label>Højde</label>
              <select data-field="hojde" data-mast="${mastIdx}">${hojdeOptions}</select>
            </div>
            <div class="field">
              <label>Note</label>
              <input type="text" data-field="note" data-mast="${mastIdx}" placeholder="(valgfri)" />
            </div>
            <button class="btn-secondary" data-action="add-signal" data-mast="${mastIdx}">+ Tilføj signal</button>
          </div>
        </div>

        <div class="mast-section">
          <div class="mast-section-label">Ekstra udstyr</div>
          ${udstyrHtml}
          <div class="add-form">
            <div class="field">
              <label>Kategori</label>
              <select data-field="udstyrkategori" data-mast="${mastIdx}">
                <option value="">— Vælg kategori —</option>
                ${UDSTYR_MENU.map(k => `<option value="${escapeHtml(k.kategori)}">${escapeHtml(k.kategori)}</option>`).join('')}
              </select>
            </div>
            <div class="field" id="udstyr-under-wrap-${mastIdx}" style="display:none">
              <label>Underkategori</label>
              <select data-field="udstyrunderkategori" data-mast="${mastIdx}" disabled>
                <option value="">— Vælg underkategori —</option>
              </select>
            </div>
            <div class="field">
              <label>Vare</label>
              <select data-field="udstyrtype" data-mast="${mastIdx}" disabled>
                <option value="">— Vælg kategori først —</option>
              </select>
            </div>
            <div class="field">
              <label>Betegnelse (valgfri)</label>
              <input type="text" data-field="udstyrbetegnelse" data-mast="${mastIdx}" placeholder="fx Radar 1" />
            </div>
            <button class="btn-secondary" data-action="add-udstyr" data-mast="${mastIdx}">+ Tilføj udstyr</button>
          </div>
        </div>
      </section>
    `;
  }

  // ==============================
  // Output (Markdown / tekst)
  // ==============================
  function generateMarkdown() {
    const dato = new Date().toISOString().slice(0, 10);
    const nummer = fullTegningsnr();

    let md = '---\n';
    md += 'tags:\n  - signalanlæg\n';
    if (state.nr) md += `anlægsnummer: ${state.nr}\n`;
    if (state.navn) md += `navn: ${state.navn}\n`;
    md += `dato: ${dato}\n`;
    md += `antal_master: ${state.master.length}\n`;
    const totalSignaler = state.master.reduce((sum, m) => sum + m.signaler.length, 0);
    md += `antal_signaler: ${totalSignaler}\n`;
    md += '---\n\n';

    const titel = nummer
      ? `# Anlæg ${nummer}${state.navn ? ' – ' + state.navn : ''}`
      : `# Anlæg: ${state.navn || '(uden navn)'}`;
    md += titel + '\n\n';

    md += '## Oversigt\n\n';
    if (state.nr) md += `**Anlægsnummer:** ${state.nr}\n`;
    md += `**Dato:** ${dato}\n`;
    md += `**Antal master:** ${state.master.length}\n`;
    md += `**Antal signaler:** ${totalSignaler}\n\n---\n\n`;

    if (state.master.length === 0) {
      md += '_Ingen master tilføjet endnu._\n';
    } else {
      state.master.forEach(mast => {
        const masteVarenr = findMasteVarenr(mast.mastetype);
        md += `## ${mast.mastId} – ${mast.mastetype}${masteVarenr ? ` (${masteVarenr})` : ''}\n\n`;
        if (mast.udstyr && mast.udstyr.length > 0) {
          md += '**Ekstra udstyr:**\n';
          mast.udstyr.forEach(u => {
            const label = u.type || u.varenr || '';
            md += `- ${label}${u.varenr ? ` (${u.varenr})` : ''}${u.betegnelse ? ' – ' + u.betegnelse : ''}\n`;
            autoVarerForUdstyr(u).forEach(v => {
              const vare = findVare(v.varenr);
              const antalLabel = Number.isInteger(v.antal) ? `${v.antal}×` : `${v.antal}m`;
              md += `  - ↳ ${antalLabel} ${vare ? vare.beskrivelse : v.varenr} (${v.varenr})\n`;
            });
          });
          md += '\n';
        }
        if (mast.signaler.length === 0) {
          md += '_Ingen signaler._\n\n';
        } else {
          mast.signaler.forEach(sig => {
            let line = `- **${sig.betegnelse || '?'}:** ${sig.type}`;
            if (sig.varenr) line += ` (${sig.varenr})`;
            if (sig.hojde) line += ` _(${sig.hojde})_`;
            if (sig.note) line += ` — _${sig.note}_`;
            md += line + '\n';
            autoVarerForSignal(sig).forEach(v => {
              const vare = findVare(v.varenr);
              const antalLabel = Number.isInteger(v.antal) ? `${v.antal}×` : `${v.antal}m`;
              md += `  - ↳ ${antalLabel} ${vare ? vare.beskrivelse : v.varenr} (${v.varenr})\n`;
            });
          });
          md += '\n';
        }
      });
    }

    return md;
  }

  function generateTekst() {
    const dato = new Date().toISOString().slice(0, 10);
    const nummer = fullTegningsnr();

    let t = '';
    const titel = nummer
      ? `ANLÆG ${nummer}${state.navn ? ' - ' + state.navn : ''}`
      : `ANLÆG: ${state.navn || '(uden navn)'}`;
    t += titel + '\n';
    t += '='.repeat(titel.length) + '\n\n';

    if (state.nr) t += `Anlægsnummer:   ${state.nr}\n`;
    t += `Dato:           ${dato}\n`;
    t += `Antal master:   ${state.master.length}\n`;
    const totalSignaler = state.master.reduce((sum, m) => sum + m.signaler.length, 0);
    t += `Antal signaler: ${totalSignaler}\n\n`;

    if (state.master.length === 0) {
      t += 'Ingen master tilføjet endnu.\n';
    } else {
      state.master.forEach(mast => {
        const masteVarenr = findMasteVarenr(mast.mastetype);
        const header = `${mast.mastId} - ${mast.mastetype}${masteVarenr ? ` (${masteVarenr})` : ''}`;
        t += header + '\n';
        t += '-'.repeat(header.length) + '\n';
        if (mast.udstyr && mast.udstyr.length > 0) {
          t += 'Ekstra udstyr:\n';
          mast.udstyr.forEach(u => {
            const label = u.type || u.varenr || '';
            t += `  * ${label}${u.varenr ? ` (${u.varenr})` : ''}${u.betegnelse ? ' - ' + u.betegnelse : ''}\n`;
            autoVarerForUdstyr(u).forEach(v => {
              const vare = findVare(v.varenr);
              const antalLabel = Number.isInteger(v.antal) ? `${v.antal}×` : `${v.antal}m`;
              t += `    → ${antalLabel} ${vare ? vare.beskrivelse : v.varenr} (${v.varenr})\n`;
            });
          });
        }
        if (mast.signaler.length === 0) {
          t += 'Ingen signaler.\n';
        } else {
          t += 'Signaler:\n';
          mast.signaler.forEach(sig => {
            let line = `  * ${sig.betegnelse || '?'}: ${sig.type}`;
            if (sig.varenr) line += ` (${sig.varenr})`;
            if (sig.hojde) line += ` (${sig.hojde})`;
            if (sig.note) line += ` - ${sig.note}`;
            t += line + '\n';
            autoVarerForSignal(sig).forEach(v => {
              const vare = findVare(v.varenr);
              const antalLabel = Number.isInteger(v.antal) ? `${v.antal}×` : `${v.antal}m`;
              t += `    → ${antalLabel} ${vare ? vare.beskrivelse : v.varenr} (${v.varenr})\n`;
            });
          });
        }
        t += '\n';
      });
    }

    return t;
  }

  function opdaterOutput() {
    const format = $('format-vaelger').value;
    $('output').value = format === 'txt' ? generateTekst() : generateMarkdown();
  }

  function render() {
    renderMaster();
    renderStykliste();
    opdaterOutput();
  }

  // ==============================
  // Automatiske regler
  // ==============================
  const AUTO_REGLER_SIGNAL = [
    {
      beskrivelse: 'DSI signal → 1× Konsol opadvendt DSI',
      matcher: sig => sig.kategori && sig.kategori.includes('DSI'),
      varer: [{ varenr: '270-500-3002', antal: 1 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 3-felt/2-felt → 2× Støtteholder sort kort',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && !sig.type.includes('1-felt'),
      varer: [{ varenr: '167-650-0211', antal: 2 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 3-felt/2-felt → 2× Flangemøtrik',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && !sig.type.includes('1-felt'),
      varer: [{ varenr: '270-100-8268', antal: 2 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 3-felt/2-felt → 2× Pindbolt',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && !sig.type.includes('1-felt'),
      varer: [{ varenr: '270-100-1056', antal: 2 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 1-felt → 1× Støtteholder sort lang',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && sig.type.includes('1-felt'),
      varer: [{ varenr: '167-650-0212', antal: 1 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 1-felt → 1× Flangemøtrik',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && sig.type.includes('1-felt'),
      varer: [{ varenr: '270-100-8268', antal: 1 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 1-felt → 1× Pindbolt',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && sig.type.includes('1-felt'),
      varer: [{ varenr: '270-100-1056', antal: 1 }]
    },
    {
      beskrivelse: 'Ercolight 2 punkt 1-felt → 3,5m Lanternekabel 5G1mm Sort',
      matcher: sig => sig.kategori && sig.kategori.includes('2 punkt') && sig.type && sig.type.includes('1-felt'),
      varer: [{ varenr: '250-100-0362', antal: 3.5 }]
    },
    {
      beskrivelse: 'Lavt signal (ikke 1-felt) → 3,5m Lanternekabel 5G1mm Sort',
      matcher: sig => sig.hojde === 'Lavt' && !(sig.kategori && sig.kategori.includes('2 punkt') && sig.type && sig.type.includes('1-felt')),
      varer: [{ varenr: '250-100-0362', antal: 3.5 }]
    },
    {
      beskrivelse: 'Højt signal → 5m Lanternekabel 5G1mm Sort',
      matcher: sig => sig.hojde === 'Højt',
      varer: [{ varenr: '250-100-0362', antal: 5 }]
    },
  ];

  const AUTO_REGLER_UDSTYR = [
    {
      beskrivelse: 'Flir TrafiOne → 8m Kabel Kat 6A + 2× Spændbånd',
      matcher: u => u.varenr === '250-650-0118' || u.varenr === '250-650-0119',
      varer: [
        { varenr: '250-100-1997', antal: 8 },
        { varenr: '280-850-0009', antal: 2 },
      ]
    },
    {
      beskrivelse: 'Smartmicro Type 44/45/48 → Kabel UMMR',
      matcher: u => ['250-650-0164', '250-650-0165', '250-650-0167'].includes(u.varenr),
      varer: [{ varenr: '250-650-0159', antal: 1 }]
    },
    {
      beskrivelse: 'Smartmicro Type 44/45 → Konsol UMMR 29/44/45',
      matcher: u => ['250-650-0164', '250-650-0165'].includes(u.varenr),
      varer: [{ varenr: '250-650-0137', antal: 1 }]
    },
    {
      beskrivelse: 'Smartmicro Type 29/30 → Konsol UMMR 29/44/45',
      matcher: u => ['250-650-0160', '250-650-0161'].includes(u.varenr),
      varer: [{ varenr: '250-650-0137', antal: 1 }]
    },
    {
      beskrivelse: 'Smartmicro Type 48 → Konsol UMMR 42/48',
      matcher: u => u.varenr === '250-650-0167',
      varer: [{ varenr: '250-650-0162', antal: 1 }]
    },
    {
      beskrivelse: 'Smartmicro alle typer → 2× Spændbånd 130-150mm',
      matcher: u => ['250-650-0160', '250-650-0161', '250-650-0164', '250-650-0165', '250-650-0167'].includes(u.varenr),
      varer: [{ varenr: '280-850-0009', antal: 2 }]
    },
  ];

  // Bagudkompatibilitet
  const AUTO_REGLER = AUTO_REGLER_SIGNAL;

  // Beregn automatiske varer for et enkelt signal
  function autoVarerForSignal(sig) {
    const result = [];
    AUTO_REGLER_SIGNAL.forEach(regel => {
      if (regel.matcher(sig)) regel.varer.forEach(v => result.push({ ...v }));
    });
    return result;
  }

  // Beregn automatiske varer for et enkelt udstyr
  function autoVarerForUdstyr(u) {
    const result = [];
    AUTO_REGLER_UDSTYR.forEach(regel => {
      if (regel.matcher(u)) regel.varer.forEach(v => result.push({ ...v }));
    });
    return result;
  }

  // Beregn stykliste pr. mast inkl. automatiske varer
  function beregnStyklistePrMast(mast) {
    const tæller = {};
    // Mastetype
    const masteVarenr = findMasteVarenr(mast.mastetype);
    if (masteVarenr) tæller[masteVarenr] = (tæller[masteVarenr] || 0) + 1;
    // Manuelt tilføjet udstyr + auto-varer for udstyr
    (mast.udstyr || []).forEach(u => {
      if (u.varenr) tæller[u.varenr] = (tæller[u.varenr] || 0) + 1;
      autoVarerForUdstyr(u).forEach(v => {
        tæller[v.varenr] = (tæller[v.varenr] || 0) + v.antal;
      });
    });
    // Automatiske varer fra signaler + selve lanterner
    (mast.signaler || []).forEach(sig => {
      if (sig.varenr) tæller[sig.varenr] = (tæller[sig.varenr] || 0) + 1;
      autoVarerForSignal(sig).forEach(v => {
        tæller[v.varenr] = (tæller[v.varenr] || 0) + v.antal;
      });
    });
    return tæller;
  }

  function renderStykliste() {
    const container = $('stykliste-indhold');
    if (!container) return;

    if (state.master.length === 0) {
      container.innerHTML = '<p class="empty-state">Ingen master tilføjet endnu.</p>';
      return;
    }

    const harVarer = state.master.some(m => {
      const tæller = beregnStyklistePrMast(m);
      return Object.keys(tæller).length > 0;
    });
    if (!harVarer) {
      container.innerHTML = '<p class="empty-state">Ingen varer tilføjet på nogen mast endnu.</p>';
      return;
    }

    container.innerHTML = state.master.map(mast => {
      const tæller = beregnStyklistePrMast(mast);
      const varenumre = Object.keys(tæller);
      if (varenumre.length === 0) return '';

      const grupperHtml = VAREKATALOG.map(kat => {
        // Hent alle varer fra kategorien (inkl. underkategorier)
        const alleVarer = kat.underkategorier
          ? kat.underkategorier.flatMap(u => u.varer)
          : (kat.varer || []);

        const rækker = alleVarer
          .filter(v => tæller[v.varenr])
          .map(v => `
            <div class="item-row">
              <span class="badge badge-warning">${escapeHtml(v.varenr)}</span>
              <span class="item-label">${escapeHtml(v.beskrivelse)}</span>
              ${v.bem ? `<span class="item-note">${escapeHtml(v.bem)}</span>` : ''}
              <span class="stykliste-antal">${Number.isInteger(tæller[v.varenr]) ? tæller[v.varenr] + ' stk.' : tæller[v.varenr] + ' m'}</span>
            </div>
          `).join('');
        if (!rækker) return '';
        return `<div class="stykliste-gruppe"><div class="mast-section-label">${escapeHtml(kat.kategori)}</div>${rækker}</div>`;
      }).join('');

      return `
        <div class="stykliste-mast">
          <div class="stykliste-mast-titel">${escapeHtml(mast.mastId)} – ${escapeHtml(mast.mastetype)}</div>
          ${grupperHtml}
        </div>
      `;
    }).join('');
  }

  function generateStyklisteMarkdown() {
    const dato = new Date().toISOString().slice(0, 10);
    const nummer = fullTegningsnr();
    const titel = nummer
      ? `Stykliste – Anlæg ${nummer}${state.navn ? ' – ' + state.navn : ''}`
      : `Stykliste – ${state.navn || 'Anlæg'}`;
    let md = `# ${titel}\n\n`;
    md += `**Dato:** ${dato}\n\n`;

    const masterMedVarer = state.master.filter(m => m.udstyr && m.udstyr.length > 0);
    if (masterMedVarer.length === 0) {
      md += '_Ingen varer._\n';
      return md;
    }

    masterMedVarer.forEach(mast => {
      md += `## ${mast.mastId} – ${mast.mastetype}\n\n`;
      const tæller = beregnStyklistePrMast(mast);
      let harRækker = false;
      VAREKATALOG.forEach(kat => {
        const varer = kat.varer.filter(v => tæller[v.varenr]);
        if (varer.length === 0) return;
        if (!harRækker) harRækker = true;
        md += `### ${kat.kategori}\n\n`;
        md += '| Varenr. | Beskrivelse | Antal |\n';
        md += '| ------- | ----------- | ----- |\n';
        varer.forEach(v => {
          md += `| ${v.varenr} | ${v.beskrivelse}${v.bem ? ' – ' + v.bem : ''} | ${tæller[v.varenr]} stk. |\n`;
        });
        md += '\n';
      });
    });

    // Samlet totaloversigt
    md += '---\n\n## Samlet totaloversigt\n\n';
    const total = {};
    state.master.forEach(mast => {
      Object.entries(beregnStyklistePrMast(mast)).forEach(([varenr, antal]) => {
        total[varenr] = (total[varenr] || 0) + antal;
      });
    });
    if (Object.keys(total).length > 0) {
      md += '| Varenr. | Beskrivelse | Total antal |\n';
      md += '| ------- | ----------- | ----------- |\n';
      Object.entries(total).forEach(([varenr, antal]) => {
        const vare = findVare(varenr);
        md += `| ${varenr} | ${vare ? vare.beskrivelse : varenr} | ${antal} stk. |\n`;
      });
    }

    return md;
  }

  // ==============================
  // LocalStorage
  // ==============================
  function gemteNoegler() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) keys.push(k);
    }
    return keys.sort();
  }

  function opdaterGemtListe() {
    const sel = $('gemte-anlaeg');
    sel.innerHTML = '<option value="">— Vælg gemt anlæg —</option>';
    gemteNoegler().forEach(k => {
      const navn = k.replace(STORAGE_PREFIX, '');
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = navn;
      sel.appendChild(opt);
    });
  }

  function gemAnlaeg() {
    const idDel = state.nr.trim() || state.navn.trim();
    if (!idDel) {
      visBesked('Giv anlægget et nummer eller navn først', 'danger');
      return;
    }
    const key = STORAGE_PREFIX + idDel.replace(/[^a-zA-Z0-9æøåÆØÅ_-]/g, '_');
    try {
      localStorage.setItem(key, JSON.stringify(state));
      opdaterGemtListe();
      $('gemte-anlaeg').value = key;
      visBesked('✓ Anlæg gemt');
    } catch (err) {
      visBesked('Kunne ikke gemme: ' + err.message, 'danger');
    }
  }

  function indlaesAnlaeg(key) {
    if (!key) return;
    try {
      const rawData = localStorage.getItem(key);
      if (!rawData) return;
      const data = JSON.parse(rawData);
      state = {
        nr: data.nr || '',
        navn: data.navn || '',
        master: data.master || []
      };
      // Migrering: ældre data kunne have udstyr som string
      state.master.forEach(m => {
        if (typeof m.udstyr === 'string') {
          m.udstyr = m.udstyr ? [{ type: 'Andet', betegnelse: m.udstyr }] : [];
        } else if (!Array.isArray(m.udstyr)) {
          m.udstyr = [];
        }
      });
      opdaterFormFelter();
      render();
      visBesked('✓ Anlæg indlæst');
    } catch (err) {
      visBesked('Kunne ikke indlæse: ' + err.message, 'danger');
    }
  }

  function sletAnlaeg(key) {
    if (!key) return;
    if (!confirm('Slet det gemte anlæg permanent?')) return;
    localStorage.removeItem(key);
    opdaterGemtListe();
    visBesked('Anlæg slettet');
  }

  function eksporterJson() {
    const alle = {};
    gemteNoegler().forEach(k => {
      alle[k.replace(STORAGE_PREFIX, '')] = JSON.parse(localStorage.getItem(k));
    });
    const blob = new Blob([JSON.stringify(alle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signalanlaeg-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    visBesked('✓ Backup downloadet');
  }

  function importerJson(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        let antal = 0;
        Object.entries(data).forEach(([navn, anlaeg]) => {
          const key = STORAGE_PREFIX + navn;
          localStorage.setItem(key, JSON.stringify(anlaeg));
          antal++;
        });
        opdaterGemtListe();
        visBesked(`✓ ${antal} anlæg importeret`);
      } catch (err) {
        visBesked('Ugyldig JSON-fil: ' + err.message, 'danger');
      }
    };
    reader.readAsText(file);
  }

  // ==============================
  // Form-håndtering
  // ==============================
  function opdaterFormFelter() {
    $('anlaeg-nr').value = state.nr;
    $('anlaeg-navn').value = state.navn;
  }

  function nytAnlaeg() {
    if (state.master.length > 0 && !confirm('Start nyt anlæg? Nuværende data slettes (medmindre det er gemt).')) return;
    state = tomtAnlaeg();
    opdaterFormFelter();
    render();
  }

  function tilfoejMast() {
    const mastId = $('ny-mast-id').value.trim() || `S${state.master.length + 1}`;
    state.master.push({
      mastId: mastId,
      mastetype: $('ny-mastetype').value,
      udstyr: [],
      signaler: []
    });
    $('ny-mast-id').value = '';
    render();
  }

  // ==============================
  // Event handlers
  // ==============================
  function tilkoblEvents() {
    $('anlaeg-nr').addEventListener('input', e => { state.nr = e.target.value; opdaterOutput(); });
    $('anlaeg-navn').addEventListener('input', e => { state.navn = e.target.value; opdaterOutput(); });

    $('nyt-anlaeg-btn').addEventListener('click', nytAnlaeg);
    $('tilfoej-mast-btn').addEventListener('click', tilfoejMast);

    $('gem-btn').addEventListener('click', gemAnlaeg);
    $('indlaes-btn').addEventListener('click', () => indlaesAnlaeg($('gemte-anlaeg').value));
    $('slet-btn').addEventListener('click', () => sletAnlaeg($('gemte-anlaeg').value));

    $('export-json-btn').addEventListener('click', eksporterJson);
    $('import-json-input').addEventListener('change', e => {
      if (e.target.files[0]) importerJson(e.target.files[0]);
      e.target.value = '';
    });

    $('format-vaelger').addEventListener('change', opdaterOutput);
    $('kopier-btn').addEventListener('click', kopierOutput);
    $('download-btn').addEventListener('click', downloadOutput);
    $('download-stykliste-btn').addEventListener('click', downloadStykliste);

    // Event-delegation på mast-liste
    $('master-liste').addEventListener('click', handleMasterKlik);
    $('master-liste').addEventListener('change', handleMasterChange);
  }

  function handleMasterKlik(e) {
    const t = e.target;
    const action = t.dataset.action;
    if (!action) return;

    const mIdx = parseInt(t.dataset.mast);

    if (action === 'del-mast') {
      if (confirm(`Slet ${state.master[mIdx].mastId} og alle dens signaler?`)) {
        state.master.splice(mIdx, 1);
        render();
      }
    } else if (action === 'del-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      state.master[mIdx].udstyr.splice(uIdx, 1);
      render();
    } else if (action === 'del-signal') {
      const sIdx = parseInt(t.dataset.sig);
      state.master[mIdx].signaler.splice(sIdx, 1);
      render();
    } else if (action === 'add-udstyr') {
      const card = t.closest('.mast-card');
      const varenr = card.querySelector('[data-field="udstyrtype"]').value;
      const betegnelse = card.querySelector('[data-field="udstyrbetegnelse"]').value.trim();
      if (!varenr) { visBesked('Vælg en vare først', 'danger'); return; }
      const vare = findVare(varenr);
      state.master[mIdx].udstyr.push({ varenr, type: vare ? vare.beskrivelse : varenr, betegnelse });
      card.querySelector('[data-field="udstyrbetegnelse"]').value = '';
      render();
    } else if (action === 'add-signal') {
      const card = t.closest('.mast-card');
      const kategori = card.querySelector('[data-field="signalkategori"]').value;
      const type = card.querySelector('[data-field="signaltype"]').value;
      const betegnelse = card.querySelector('[data-field="betegnelse"]').value.trim();
      const hojde = card.querySelector('[data-field="hojde"]').value;
      const note = card.querySelector('[data-field="note"]').value.trim();
      // Find varenr fra SIGNAL_KATEGORIER
      let varenr = '';
      for (const kat of SIGNAL_KATEGORIER) {
        const match = kat.typer.find(ty => ty.label === type);
        if (match) { varenr = match.varenr; break; }
      }
      state.master[mIdx].signaler.push({ type, varenr, kategori, betegnelse, hojde, note });
      card.querySelector('[data-field="betegnelse"]').value = '';
      card.querySelector('[data-field="note"]').value = '';
      render();
    }
  }

  function handleMasterChange(e) {
    const t = e.target;
    if (t.dataset.field === 'mastetype') {
      const mIdx = parseInt(t.dataset.mast);
      state.master[mIdx].mastetype = t.value;
      opdaterOutput();
    } else if (t.dataset.field === 'signalkategori') {
      const card = t.closest('.mast-card');
      const typeSelect = card.querySelector('[data-field="signaltype"]');
      const valgtKategori = t.value;
      const kategori = SIGNAL_KATEGORIER.find(k => k.kategori === valgtKategori);
      if (kategori) {
        typeSelect.innerHTML = kategori.typer
          .map(ty => `<option value="${escapeHtml(ty.label)}">${escapeHtml(ty.label)}</option>`)
          .join('');
        typeSelect.disabled = false;
      } else {
        typeSelect.innerHTML = '<option value="">— Vælg kategori først —</option>';
        typeSelect.disabled = true;
      }
    } else if (t.dataset.field === 'udstyrkategori') {
      const card = t.closest('.mast-card');
      const mIdx = parseInt(t.dataset.mast);
      const vareSelect = card.querySelector('[data-field="udstyrtype"]');
      const underWrap = card.querySelector(`#udstyr-under-wrap-${mIdx}`);
      const underSelect = card.querySelector('[data-field="udstyrunderkategori"]');
      const valgtKat = t.value;
      const kat = UDSTYR_MENU.find(k => k.kategori === valgtKat);

      if (kat && kat.underkategorier) {
        // Vis underkategori-dropdown
        underWrap.style.display = '';
        underSelect.innerHTML = '<option value="">— Vælg underkategori —</option>' +
          kat.underkategorier.map(u => `<option value="${escapeHtml(u.navn)}">${escapeHtml(u.navn)}</option>`).join('');
        underSelect.disabled = false;
        vareSelect.innerHTML = '<option value="">— Vælg underkategori først —</option>';
        vareSelect.disabled = true;
      } else if (kat && kat.varer) {
        // Direkte til varer
        underWrap.style.display = 'none';
        underSelect.disabled = true;
        vareSelect.innerHTML = kat.varer
          .map(v => `<option value="${escapeHtml(v.varenr)}">${escapeHtml(v.varenr)} – ${escapeHtml(v.beskrivelse)}</option>`)
          .join('');
        vareSelect.disabled = false;
      } else {
        underWrap.style.display = 'none';
        vareSelect.innerHTML = '<option value="">— Vælg kategori først —</option>';
        vareSelect.disabled = true;
      }
    } else if (t.dataset.field === 'udstyrunderkategori') {
      const card = t.closest('.mast-card');
      const vareSelect = card.querySelector('[data-field="udstyrtype"]');
      const katSelect = card.querySelector('[data-field="udstyrkategori"]');
      const valgtKat = katSelect.value;
      const valgtUnder = t.value;
      const kat = UDSTYR_MENU.find(k => k.kategori === valgtKat);
      const under = kat && kat.underkategorier ? kat.underkategorier.find(u => u.navn === valgtUnder) : null;
      if (under && under.varer.length > 0) {
        vareSelect.innerHTML = under.varer
          .map(v => `<option value="${escapeHtml(v.varenr)}">${escapeHtml(v.varenr)} – ${escapeHtml(v.beskrivelse)}</option>`)
          .join('');
        vareSelect.disabled = false;
      } else {
        vareSelect.innerHTML = '<option value="">— Ingen varer endnu —</option>';
        vareSelect.disabled = true;
      }
    }
  }

  function kopierOutput() {
    const text = $('output').value;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => visBesked('✓ Kopieret til udklipsholder'))
        .catch(() => {
          $('output').select();
          document.execCommand('copy');
          visBesked('✓ Kopieret');
        });
    } else {
      $('output').select();
      document.execCommand('copy');
      visBesked('✓ Kopieret');
    }
  }

  function generateStyklisteTekst() {
    const dato = new Date().toISOString().slice(0, 10);
    const nummer = fullTegningsnr();
    const titel = nummer
      ? `STYKLISTE – ANLÆG ${nummer}${state.navn ? ' – ' + state.navn : ''}`
      : `STYKLISTE – ${state.navn || 'ANLÆG'}`;
    let t = titel + '\n' + '='.repeat(titel.length) + '\n';
    t += `Dato: ${dato}\n\n`;

    const masterMedVarer = state.master.filter(m => {
      const tæller = beregnStyklistePrMast(m);
      return Object.keys(tæller).length > 0;
    });
    if (masterMedVarer.length === 0) {
      t += 'Ingen varer.\n';
      return t;
    }

    masterMedVarer.forEach(mast => {
      const header = `${mast.mastId} – ${mast.mastetype}`;
      t += header + '\n' + '-'.repeat(header.length) + '\n';
      const tæller = beregnStyklistePrMast(mast);
      VAREKATALOG.forEach(kat => {
        const alleVarer = kat.underkategorier
          ? kat.underkategorier.flatMap(u => u.varer)
          : (kat.varer || []);
        const varer = alleVarer.filter(v => tæller[v.varenr]);
        if (varer.length === 0) return;
        t += `${kat.kategori}:\n`;
        varer.forEach(v => {
          const antal = Number.isInteger(tæller[v.varenr]) ? tæller[v.varenr] + ' stk.' : tæller[v.varenr] + ' m';
          t += `  ${v.varenr ? v.varenr + ' – ' : ''}${v.beskrivelse}: ${antal}\n`;
        });
        t += '\n';
      });
    });

    // Samlet totaloversigt
    t += '='.repeat(30) + '\nSAMLET TOTALOVERSIGT\n' + '='.repeat(30) + '\n';
    const total = {};
    state.master.forEach(mast => {
      Object.entries(beregnStyklistePrMast(mast)).forEach(([varenr, antal]) => {
        total[varenr] = (total[varenr] || 0) + antal;
      });
    });
    Object.entries(total).forEach(([varenr, antal]) => {
      const vare = findVare(varenr);
      const antalLabel = Number.isInteger(antal) ? antal + ' stk.' : antal + ' m';
      t += `  ${varenr ? varenr + ' – ' : ''}${vare ? vare.beskrivelse : varenr}: ${antalLabel}\n`;
    });

    return t;
  }

  function downloadStykliste() {
    const format = $('stykliste-format').value;
    const tekst = format === 'txt' ? generateStyklisteTekst() : generateStyklisteMarkdown();
    const nummer = fullTegningsnr() || state.navn.replace(/[^a-zA-Z0-9æøåÆØÅ_-]/g, '_') || 'anlaeg';
    const filnavn = `${nummer}-stykliste.${format}`;
    const mimeType = format === 'txt' ? 'text/plain;charset=utf-8' : 'text/markdown;charset=utf-8';
    const blob = new Blob([tekst], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filnavn;
    a.click();
    URL.revokeObjectURL(url);
    visBesked(`✓ ${filnavn} downloadet`);
  }

  function downloadOutput() {
    const format = $('format-vaelger').value;
    const text = $('output').value;
    const nummer = fullTegningsnr() || state.navn.replace(/[^a-zA-Z0-9æøåÆØÅ_-]/g, '_') || 'anlaeg';
    const filnavn = `${nummer}.${format}`;
    const mimeType = format === 'txt' ? 'text/plain;charset=utf-8' : 'text/markdown;charset=utf-8';
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filnavn;
    a.click();
    URL.revokeObjectURL(url);
    visBesked(`✓ ${filnavn} downloadet`);
  }

  // ==============================
  // Init
  // ==============================
  function init() {
    tilkoblEvents();
    opdaterFormFelter();
    opdaterGemtListe();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
