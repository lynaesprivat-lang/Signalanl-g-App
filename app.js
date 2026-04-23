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
        { label: 'Lanterne 3-felt 5W',            varenr: '167-250-0831' },
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
    {
      kategori: 'Cykelsignaler',
      typer: [
        { label: 'Lanterne 4-felt SEA',             varenr: '167-250-0914' },
        { label: 'Lanterne 4-felt polsk pissignal',  varenr: '167-250-0501' },
      ]
    },
  ];

  // Flad liste – kun labels til output (ingen varenr)
  const SIGNAL_TYPER = SIGNAL_KATEGORIER.flatMap(k => k.typer.map(t => t.label));

  const HOJDE_MULIGHEDER = ['', 'Højt', 'Lavt'];

  // Varenumre der måles i meter
  const KABEL_VARENUMRE = ['250-100-0362', '250-100-0363', '250-100-0365', '250-100-1997'];

  // Radar/kamera varenumre der bruger spændbånd
  const RADAR_VARENUMRE = [
    '250-650-0160', '250-650-0161', '250-650-0164', '250-650-0165', '250-650-0167', // Smartmicro
    '250-650-0118', '250-650-0119', // Flir
    '167-665-0063', '167-665-0065', // Heimdall radar
    '250-650-0190/1', // Radartilslutningsbox Bluetooth
  ];

  // Spændbånd pr. mastetype (direkte montering)
  const SPAENDBAAND_PR_MAST = {
    'Høj mast 5,1m ø127':        '280-850-0009', // 130-150mm
    'Lav mast 3,1m ø127':        '280-850-0009',
    'Tryk mast m. Luge':         '280-850-0009',
    'Mast 6,1m Ø127 til Radar':  '280-850-0009',
    'Lav DSI mast':              '280-850-0009',
    'Høj DSI mast':              '280-850-0009',
    'DSI Galgemast cykel':       '280-850-0009',
    'DSI Galgemast høj':         '280-850-0009',
    'Alu-round 3,1m Ø135':           '280-850-0010', // 140-160mm
    'Alu-round 5,3m Ø165':           '280-350-0013', // 170-190mm
    'Alu-round 6,3m ø165 til Radar': '280-350-0013',
    'Milewide Lav':              '280-850-0010', // 140-160mm
    'Milewide Høj':              '280-850-0010',
    'Milewide Cykel Galge':      '280-850-0010',
    'Milewide Høj Galge':        '280-850-0010',
    'Milewide Tryk Stander':     '280-850-0010',
  };

  // Spændbånd ved forlænger arm
  const SPAENDBAAND_ARM_DEFAULT = '280-850-0005'; // 90-110mm
  const SPAENDBAAND_ARM_FLIR    = '280-850-0016'; // 50-70mm
  const FLIR_VARENUMRE = ['250-650-0118', '250-650-0119'];

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
            { varenr: 'INTERN-SW-TOUCH-U',  beskrivelse: 'Swarco Touch uden tryk', bem: '' },
            { varenr: 'INTERN-SW-TOUCH-F',  beskrivelse: 'Swarco Touch fodgænger tryk', bem: '' },
            { varenr: 'INTERN-SW-TOUCH-FL', beskrivelse: 'Swarco Touch fodgænger tryk med lyd', bem: '' },
            { varenr: 'INTERN-SC-FODG',     beskrivelse: 'Scandinavia fodgænger tryk', bem: '' },
            { varenr: 'INTERN-SC-FODG-L',   beskrivelse: 'Scandinavia fodgænger tryk med lydgiver', bem: '' },
            { varenr: 'INTERN-SC-UDEN',     beskrivelse: 'Scandinavia uden tryk', bem: '' },
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
        { varenr: '270-500-3001', beskrivelse: 'Konsol nedafvendt DSI', bem: '' },
        { varenr: '270-500-3002', beskrivelse: 'Konsol opadvendt DSI', bem: '' },
        { varenr: '270-500-3003', beskrivelse: 'Konsol Universal DSI', bem: '' },
        { varenr: '270-500-3005', beskrivelse: 'DSI Tophætte', bem: '' },
        { varenr: '270-500-3006', beskrivelse: 'DSI Mellemhætte', bem: '' },
        { varenr: '270-500-3008', beskrivelse: 'Ophæng Universal DSI', bem: '' },
        { varenr: '270-500-3009', beskrivelse: 'Vægbeslag DSI', bem: '' },
      ]
    },
    {
      kategori: 'Spændbånd',
      varer: [
        { varenr: '280-850-0016', beskrivelse: 'Spændbånd 50-70mm Rustfrit stål', bem: '' },
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
        { varenr: '167-665-0066', beskrivelse: 'Tilslutningsboks til Heimdall', bem: '' },
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
        { varenr: 'INTERN-KL-27KBH',    beskrivelse: 'GL. Kbh 27 leder', bem: '' },
        { varenr: 'INTERN-KL-37KBH',    beskrivelse: 'GL. Kbh 37 leder', bem: '' },
        { varenr: 'INTERN-KL-27SW',     beskrivelse: 'GL. Swarco 27 leder', bem: '' },
        { varenr: 'INTERN-KL-37SW',     beskrivelse: 'GL. Swarco 37 leder', bem: '' },
        { varenr: 'INTERN-KL-27SWNY',   beskrivelse: 'Nyere Swarco 27 leder', bem: '' },
        { varenr: 'INTERN-KL-37SWNY',   beskrivelse: 'Nyere Swarco 37 leder', bem: '' },
      ]
    },
    {
      kategori: 'Diverse',
      varer: [
        { varenr: '167-650-0685', beskrivelse: 'Baggrundsplade Siemens', bem: '' },
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

  // Vis varenr — skjul interne ID'er
  function visVarenr(varenr) {
    if (!varenr || varenr.startsWith('INTERN-')) return '';
    return varenr;
  }

  const STORAGE_PREFIX = 'signalanlaeg:';

  // Holder styr på hvilke master er kollapsede (overlever re-render)
  const collapsedMaster = new Set();

  // Mast-filter til output (null = alle)
  let mastFilter = null;

  function renderMastFilter() {
    const wrap = $('mast-filter-wrap');
    const container = $('mast-filter-checkboxes');
    if (!wrap || !container) return;
    if (state.master.length === 0) { wrap.style.display = 'none'; return; }
    wrap.style.display = '';
    if (!mastFilter) mastFilter = new Set(state.master.map(m => m.mastId));
    container.innerHTML = state.master.map(m => {
      const checked = mastFilter.has(m.mastId);
      return `<label class="${checked ? 'checked' : ''}">
        <input type="checkbox" data-mast-filter="${escapeHtml(m.mastId)}" ${checked ? 'checked' : ''} />
        ${escapeHtml(m.mastId)}
      </label>`;
    }).join('');
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', e => {
        const id = e.target.dataset.mastFilter;
        if (e.target.checked) mastFilter.add(id); else mastFilter.delete(id);
        e.target.closest('label').className = mastFilter.has(id) ? 'checked' : '';
        opdaterOutput();
      });
    });
  }

  // Auto-gem timer
  let autoGemTimer = null;
  function planAutoGem() {
    clearTimeout(autoGemTimer);
    autoGemTimer = setTimeout(() => {
      const idDel = state.nr.trim() || state.navn.trim();
      if (!idDel) return;
      const key = STORAGE_PREFIX + idDel.replace(/[^a-zA-Z0-9æøåÆØÅ_-]/g, '_');
      try {
        localStorage.setItem(key, JSON.stringify(state));
        opdaterGemtListe();
        $('gemte-anlaeg').value = key;
        visBesked('✓ Auto-gemt');
      } catch (err) { /* stille fejl */ }
    }, 15000);
  }

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
    // Gendan kollaps-state
    state.master.forEach((mast, mastIdx) => {
      if (collapsedMaster.has(mastIdx)) {
        const card = container.querySelectorAll('.mast-card')[mastIdx];
        if (!card) return;
        const body = card.querySelector('.mast-body');
        const summary = card.querySelector('.mast-summary');
        const btn = card.querySelector('.btn-collapse');
        if (body) body.style.display = 'none';
        if (summary) summary.style.display = '';
        if (btn) btn.textContent = '▸';
        card.dataset.collapsed = 'true';
      }
    });
  }

  function renderMastCard(mast, mastIdx) {
    const armVarenr = '250-650-0148';
    const armVare = findVare(armVarenr);
    let armVistPåKort = false;

    const udstyrHtml = (mast.udstyr && mast.udstyr.length > 0)
      ? mast.udstyr.map((u, uIdx) => {
          const vare = u.varenr ? findVare(u.varenr) : null;
          const erKabel = KABEL_VARENUMRE.includes(u.varenr);
          const antalLabel = erKabel && u.antal ? `${u.antal}m ` : (u.antal && u.antal > 1 ? `${u.antal}× ` : '');
          const autoVarer = autoVarerForUdstyr(u, mast.mastetype);

          // Vis forlænger arm auto-vare — kun første gang på dette mastkort
          let armHtml = '';
          if (u.forlængerArm && RADAR_VARENUMRE.includes(u.varenr) && !armVistPåKort) {
            armVistPåKort = true;
            armHtml = `<div class="auto-vare-row">
              <span class="auto-vare-ikon">↳</span>
              <span class="auto-vare-label">1× ${escapeHtml(armVare ? armVare.beskrivelse : armVarenr)}</span>
              <span class="badge badge-auto">auto</span>
            </div>`;
          }

          if (u._redigerer) {
            return `
              <div class="item-row rediger-row">
                <span class="rediger-label">Redigerer udstyr:</span>
                <div class="add-form">
                  <div class="field field-small"><label>Antal</label>
                    <input type="number" data-rediger-u="antal" data-mast="${mastIdx}" data-udstyr="${uIdx}" value="${u.antal || 1}" min="0.5" step="0.5" /></div>
                  <div class="field"><label>Betegnelse</label>
                    <input type="text" data-rediger-u="betegnelse" data-mast="${mastIdx}" data-udstyr="${uIdx}" value="${escapeHtml(u.betegnelse || '')}" /></div>
                  <button class="btn-primary" data-action="gem-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}">Gem</button>
                  <button class="btn-secondary" data-action="annuller-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}">Annullér</button>
                </div>
              </div>`;
          }

          const autoHtml = autoVarer.map((v, aIdx) => {
            const autoVare = findVare(v.varenr);
            const override = (u._autoOverrides || {})[aIdx] || {};
            const visAntal = override.antal !== undefined ? override.antal : v.antal;
            const visVarenrAuto = override.varenr || v.varenr;
            const visVare = findVare(visVarenrAuto);
            const aLabel = Number.isInteger(visAntal) ? `${visAntal}×` : `${visAntal}m`;

            if (override._redigerer) {
              const antalDd = bygAntalDropdownHtml(visAntal);
              const varenrDd = bygVareDropdownHtml(v.varenr, visVarenrAuto);
              return `<div class="auto-vare-row rediger-auto-row">
                <span class="auto-vare-ikon">↳</span>
                <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;flex:1">
                  <div style="display:flex;flex-direction:column;gap:2px">
                    <label style="font-size:10px;color:var(--text-subtle)">Antal</label>
                    <span id="auto-u-antal-wrap-${mastIdx}-${uIdx}-${aIdx}">${antalDd}</span>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:2px">
                    <label style="font-size:10px;color:var(--text-subtle)">Vare</label>
                    <span id="auto-u-varenr-wrap-${mastIdx}-${uIdx}-${aIdx}">${varenrDd}</span>
                  </div>
                  <div style="display:flex;gap:4px;align-self:flex-end">
                    <button class="btn-primary" style="padding:4px 12px;font-size:12px" data-action="gem-auto-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}" data-auto="${aIdx}">Gem</button>
                    <button class="btn-secondary" style="padding:4px 10px;font-size:12px" data-action="annuller-auto-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}" data-auto="${aIdx}">Annullér</button>
                  </div>
                </div>
              </div>`;
            }
            return `<div class="auto-vare-row">
              <span class="auto-vare-ikon">↳</span>
              <span class="auto-vare-label">${aLabel} ${escapeHtml(visVare ? visVare.beskrivelse : visVarenrAuto)}</span>
              <span class="badge badge-auto">${override.varenr || override.antal !== undefined ? 'ændret' : 'auto'}</span>
              <button class="btn-icon btn-rediger" style="font-size:10px;padding:1px 6px;margin-left:auto" data-action="rediger-auto-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}" data-auto="${aIdx}" title="Redigér auto-vare">✎</button>
            </div>`;
          }).join('');
          return `
            <div class="item-row">
              <span class="badge badge-warning">${escapeHtml(visVarenr(u.varenr) || u.type || '')}</span>
              <span class="item-label">${antalLabel}${escapeHtml(vare ? vare.beskrivelse : (u.type || ''))}${u.forlængerArm ? ' <span class="badge badge-neutral" style="font-size:10px">arm</span>' : ''}</span>
              ${u.betegnelse ? `<span class="item-note">${escapeHtml(u.betegnelse)}</span>` : ''}
              <button class="btn-icon btn-rediger" data-action="rediger-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}" title="Redigér">✎</button>
              <button class="btn-icon" data-action="del-udstyr" data-mast="${mastIdx}" data-udstyr="${uIdx}">×</button>
            </div>
            ${armHtml}
            ${autoHtml}
          `;
        }).join('')
      : '<p class="empty-state">Intet ekstra udstyr</p>';

    const signalerHtml = mast.signaler.length > 0
      ? mast.signaler.map((sig, sigIdx) => {
          // Redigér-mode
          if (sig._redigerer) {
            const hojdeOpts = HOJDE_MULIGHEDER.map(h =>
              `<option value="${escapeHtml(h)}"${h === sig.hojde ? ' selected' : ''}>${h || '—'}</option>`
            ).join('');
            return `
              <div class="item-row rediger-row">
                <span class="rediger-label">Redigerer signal:</span>
                <div class="add-form">
                  <div class="field field-small"><label>Betegnelse</label>
                    <input type="text" data-rediger-sig="betegnelse" data-mast="${mastIdx}" data-sig="${sigIdx}" value="${escapeHtml(sig.betegnelse || '')}" /></div>
                  <div class="field field-small"><label>Højde</label>
                    <select data-rediger-sig="hojde" data-mast="${mastIdx}" data-sig="${sigIdx}">${hojdeOpts}</select></div>
                  <div class="field"><label>Note</label>
                    <input type="text" data-rediger-sig="note" data-mast="${mastIdx}" data-sig="${sigIdx}" value="${escapeHtml(sig.note || '')}" /></div>
                  <button class="btn-primary" data-action="gem-sig" data-mast="${mastIdx}" data-sig="${sigIdx}">Gem</button>
                  <button class="btn-secondary" data-action="annuller-sig" data-mast="${mastIdx}" data-sig="${sigIdx}">Annullér</button>
                </div>
              </div>`;
          }
          const autoVarer = autoVarerForSignal(sig);
          const autoHtml = autoVarer.map((v, aIdx) => {
            const override = (sig._autoOverrides || {})[aIdx] || {};
            const visAntal = override.antal !== undefined ? override.antal : v.antal;
            const visVarenrAuto = override.varenr || v.varenr;
            const visVare = findVare(visVarenrAuto);
            const aLabel = Number.isInteger(visAntal) ? `${visAntal}×` : `${visAntal}m`;

            if (override._redigerer) {
              const antalDd = bygAntalDropdownHtml(visAntal);
              const varenrDd = bygVareDropdownHtml(v.varenr, visVarenrAuto);
              return `<div class="auto-vare-row rediger-auto-row">
                <span class="auto-vare-ikon">↳</span>
                <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;flex:1">
                  <div style="display:flex;flex-direction:column;gap:2px">
                    <label style="font-size:10px;color:var(--text-subtle)">Antal</label>
                    <span id="auto-sig-antal-wrap-${mastIdx}-${sigIdx}-${aIdx}">${antalDd}</span>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:2px">
                    <label style="font-size:10px;color:var(--text-subtle)">Vare</label>
                    <span id="auto-sig-varenr-wrap-${mastIdx}-${sigIdx}-${aIdx}">${varenrDd}</span>
                  </div>
                  <div style="display:flex;gap:4px;align-self:flex-end">
                    <button class="btn-primary" style="padding:4px 12px;font-size:12px" data-action="gem-auto-sig" data-mast="${mastIdx}" data-sig="${sigIdx}" data-auto="${aIdx}">Gem</button>
                    <button class="btn-secondary" style="padding:4px 10px;font-size:12px" data-action="annuller-auto-sig" data-mast="${mastIdx}" data-sig="${sigIdx}" data-auto="${aIdx}">Annullér</button>
                  </div>
                </div>
              </div>`;
            }
            return `<div class="auto-vare-row">
              <span class="auto-vare-ikon">↳</span>
              <span class="auto-vare-label">${aLabel} ${escapeHtml(visVare ? visVare.beskrivelse : visVarenrAuto)}</span>
              <span class="badge badge-auto">${override.varenr || override.antal !== undefined ? 'ændret' : 'auto'}</span>
              <button class="btn-icon btn-rediger" style="font-size:10px;padding:1px 6px;margin-left:auto" data-action="rediger-auto-sig" data-mast="${mastIdx}" data-sig="${sigIdx}" data-auto="${aIdx}" title="Redigér auto-vare">✎</button>
            </div>`;
          }).join('');
          const hojdeBadge = sig.hojde
            ? `<span class="badge badge-neutral">${escapeHtml(sig.hojde)}</span>`
            : `<span class="badge badge-hojde-advarsel" title="Højde er ikke valgt">⚠ Højde</span>`;
          return `
            <div class="item-row">
              <span class="badge">${escapeHtml(sig.betegnelse || '?')}</span>
              <span class="item-label">${escapeHtml(sig.type)}</span>
              ${hojdeBadge}
              ${sig.note ? `<span class="item-note">${escapeHtml(sig.note)}</span>` : ''}
              <button class="btn-icon btn-rediger" data-action="rediger-sig" data-mast="${mastIdx}" data-sig="${sigIdx}" title="Redigér">✎</button>
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

    const signalerCount = mast.signaler.length;
    const udstyrCount = (mast.udstyr || []).length;
    const summary = [
      signalerCount > 0 ? `${signalerCount} signal${signalerCount > 1 ? 'er' : ''}` : '',
      udstyrCount > 0 ? `${udstyrCount} udstyr` : ''
    ].filter(Boolean).join(', ');

    const mastAutoVarer = autoVarerForMast(mast);
    const mastAutoHtml = mastAutoVarer.map(v => {
      const vare = findVare(v.varenr);
      return `<div class="auto-vare-row" style="margin-bottom:3px">
        <span class="auto-vare-ikon">↳</span>
        <span class="auto-vare-label">${v.antal}× ${escapeHtml(vare ? vare.beskrivelse : v.varenr)}</span>
        <span class="badge badge-auto">auto</span>
      </div>`;
    }).join('');

    return `
      <section class="mast-card" data-collapsed="false">
        <div class="mast-header">
          <div style="display:flex;align-items:center;gap:0.5rem;flex:1;min-width:0;">
            <button class="btn-collapse" data-action="toggle-mast" data-mast="${mastIdx}" title="Fold/unfold">▾</button>
            <span class="mast-title">${escapeHtml(mast.mastId)}</span>
            <span class="mast-subtype-label">${escapeHtml(mast.mastetype)}</span>
            <span class="mast-summary" style="display:none">${escapeHtml(summary)}</span>
          </div>
          <button class="btn-icon" data-action="del-mast" data-mast="${mastIdx}">Slet mast</button>
        </div>
        ${mastAutoHtml ? `<div style="padding:0 0 0.5rem">${mastAutoHtml}</div>` : ''}

        <div class="mast-body">
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
              <div class="field field-small" id="udstyr-meter-wrap-${mastIdx}" style="display:none">
                <label>Meter</label>
                <input type="number" data-field="udstyrmeter" data-mast="${mastIdx}" placeholder="m" min="0.5" step="0.5" style="min-width:60px" />
              </div>
              <div class="field field-small" id="udstyr-antal-wrap-${mastIdx}">
                <label>Antal</label>
                <input type="number" data-field="udstyrantal" data-mast="${mastIdx}" placeholder="1" min="1" step="1" value="1" style="min-width:60px" />
              </div>
              <div class="field field-small" id="udstyr-arm-wrap-${mastIdx}" style="display:none">
                <label>På arm?</label>
                <select data-field="udstyrarm" data-mast="${mastIdx}">
                  <option value="nej">Nej</option>
                  <option value="ja">Ja</option>
                </select>
              </div>
              <div class="field">
                <label>Betegnelse (valgfri)</label>
                <input type="text" data-field="udstyrbetegnelse" data-mast="${mastIdx}" placeholder="fx Radar 1" />
              </div>
              <button class="btn-secondary" data-action="add-udstyr" data-mast="${mastIdx}">+ Tilføj udstyr</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function filtereredeMaster() {
    if (!mastFilter) return state.master;
    return state.master.filter(m => mastFilter.has(m.mastId));
  }
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
      filtereredeMaster().forEach(mast => {
        if (mast.udstyr && mast.udstyr.length > 0) {
          md += '**Ekstra udstyr:**\n';
          mast.udstyr.forEach(u => {
            const label = u.type || (visVarenr(u.varenr) ? u.varenr : '') || '';
            const vn = visVarenr(u.varenr);
            const erKabel = KABEL_VARENUMRE.includes(u.varenr);
            const antalPræfix = erKabel && u.antal ? `${u.antal}m ` : (u.antal && u.antal > 1 ? `${u.antal}× ` : '');
            const armTekst = u.forlængerArm ? ' _(forlænger arm)_' : '';
            md += `- ${antalPræfix}${label}${vn ? ` (${vn})` : ''}${armTekst}${u.betegnelse ? ' – ' + u.betegnelse : ''}\n`;
            autoVarerForUdstyr(u, mast.mastetype).forEach((v, aIdx) => {
              const override = (u._autoOverrides || {})[aIdx] || {};
              const varenr = override.varenr || v.varenr;
              const antal = override.antal !== undefined ? override.antal : v.antal;
              const vare = findVare(varenr);
              const antalLabel = Number.isInteger(antal) ? `${antal}×` : `${antal}m`;
              md += `  - ↳ ${antalLabel} ${vare ? vare.beskrivelse : varenr} (${varenr})${override.varenr ? ' _(ændret)_' : ''}\n`;
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
            autoVarerForSignal(sig).forEach((v, aIdx) => {
              const override = (sig._autoOverrides || {})[aIdx] || {};
              const varenr = override.varenr || v.varenr;
              const antal = override.antal !== undefined ? override.antal : v.antal;
              const vare = findVare(varenr);
              const antalLabel = Number.isInteger(antal) ? `${antal}×` : `${antal}m`;
              md += `  - ↳ ${antalLabel} ${vare ? vare.beskrivelse : varenr} (${varenr})${override.varenr ? ' _(ændret)_' : ''}\n`;
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
      filtereredeMaster().forEach(mast => {
        const masteVarenr = findMasteVarenr(mast.mastetype);
        const header = `${mast.mastId} - ${mast.mastetype}${masteVarenr ? ` (${masteVarenr})` : ''}`;
        t += header + '\n';
        t += '-'.repeat(header.length) + '\n';
        if (mast.udstyr && mast.udstyr.length > 0) {
          t += 'Ekstra udstyr:\n';
          mast.udstyr.forEach(u => {
            const vn = visVarenr(u.varenr);
            const label = u.type || (vn ? vn : '') || '';
            const erKabel = KABEL_VARENUMRE.includes(u.varenr);
            const antalPræfix = erKabel && u.antal ? `${u.antal}m ` : (u.antal && u.antal > 1 ? `${u.antal}× ` : '');
            const armTekst = u.forlængerArm ? ' (forlænger arm)' : '';
            t += `  * ${antalPræfix}${label}${vn ? ` (${vn})` : ''}${armTekst}${u.betegnelse ? ' - ' + u.betegnelse : ''}\n`;
            autoVarerForUdstyr(u, mast.mastetype).forEach((v, aIdx) => {
              const override = (u._autoOverrides || {})[aIdx] || {};
              const varenr = override.varenr || v.varenr;
              const antal = override.antal !== undefined ? override.antal : v.antal;
              const vare = findVare(varenr);
              const antalLabel = Number.isInteger(antal) ? `${antal}×` : `${antal}m`;
              t += `    → ${antalLabel} ${vare ? vare.beskrivelse : varenr} (${varenr})\n`;
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
            autoVarerForSignal(sig).forEach((v, aIdx) => {
              const override = (sig._autoOverrides || {})[aIdx] || {};
              const varenr = override.varenr || v.varenr;
              const antal = override.antal !== undefined ? override.antal : v.antal;
              const vare = findVare(varenr);
              const antalLabel = Number.isInteger(antal) ? `${antal}×` : `${antal}m`;
              t += `    → ${antalLabel} ${vare ? vare.beskrivelse : varenr} (${varenr})\n`;
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
    renderMastFilter();
    opdaterOutput();
    planAutoGem();
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
      beskrivelse: 'Flir TrafiOne → 8m Kabel Kat 6A',
      matcher: u => u.varenr === '250-650-0118' || u.varenr === '250-650-0119',
      varer: [{ varenr: '250-100-1997', antal: 8 }]
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
      beskrivelse: 'Heimdall radar → 4m Lanternekabel 5G1mm',
      matcher: u => u.varenr === '167-665-0063' || u.varenr === '167-665-0065',
      varer: [{ varenr: '250-100-0362', antal: 4 }]
    },
    {
      beskrivelse: 'Vægbeslag DSI → 1× Ophæng Universal DSI',
      matcher: u => u.varenr === '270-500-3009',
      varer: [{ varenr: '270-500-3008', antal: 1 }]
    },
    {
      beskrivelse: 'Ophæng Universal DSI → 1× Vægbeslag DSI',
      matcher: u => u.varenr === '270-500-3008',
      varer: [{ varenr: '270-500-3009', antal: 1 }]
    },
    {
      beskrivelse: 'Klemrække → 1× Sejldugspose',
      matcher: u => ['250-300-1001','250-300-1002','250-300-1003','250-300-1004','250-300-1005','250-300-1007','250-300-1008','250-300-1009'].includes(u.varenr),
      varer: [{ varenr: '250-300-1100', antal: 1 }]
    },
  ];

  // Auto-regler baseret på mastetype
  const AUTO_REGLER_MAST = [
    { matcher: m => m.mastetype === 'Lav DSI mast',       varer: [{ varenr: '270-500-3005', antal: 1 }] },
    { matcher: m => m.mastetype === 'Høj DSI mast',       varer: [{ varenr: '270-500-3005', antal: 1 }, { varenr: '270-500-3006', antal: 1 }] },
    { matcher: m => m.mastetype === 'DSI Galgemast cykel', varer: [{ varenr: '270-500-3006', antal: 1 }] },
    { matcher: m => m.mastetype === 'DSI Galgemast høj',   varer: [{ varenr: '270-500-3006', antal: 1 }] },
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

  // Beregn automatiske varer for et enkelt udstyr (med mastetype og arm-info)
  function autoVarerForUdstyr(u, mastetype) {
    const result = [];
    AUTO_REGLER_UDSTYR.forEach(regel => {
      if (regel.matcher(u)) regel.varer.forEach(v => result.push({ ...v }));
    });

    // Spændbånd baseret på radar/kamera + mastetype
    if (RADAR_VARENUMRE.includes(u.varenr)) {
      if (u.forlængerArm) {
        // På forlænger arm
        const svarenr = FLIR_VARENUMRE.includes(u.varenr) ? SPAENDBAAND_ARM_FLIR : SPAENDBAAND_ARM_DEFAULT;
        result.push({ varenr: svarenr, antal: 2 });
      } else if (mastetype) {
        // Direkte på mast
        const svarenr = SPAENDBAAND_PR_MAST[mastetype];
        if (svarenr) result.push({ varenr: svarenr, antal: 2 });
      }
    }

    return result;
  }

  // Find alle varer i samme kategori som et givet varenr (til dropdown)
  function findVareKategoriVarer(varenr) {
    for (const kat of VAREKATALOG) {
      if (kat.underkategorier) {
        for (const under of kat.underkategorier) {
          if (under.varer.find(v => v.varenr === varenr)) return under.varer;
        }
      } else if (kat.varer) {
        if (kat.varer.find(v => v.varenr === varenr)) return kat.varer;
      }
    }
    return null;
  }

  // Byg varenr dropdown HTML for en given vare (fra samme kategori)
  function bygVareDropdownHtml(varenr, selected) {
    const varer = findVareKategoriVarer(varenr);
    if (!varer) return `<input type="text" value="${escapeHtml(selected)}" style="width:150px;font-size:13px;padding:4px 8px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-2);color:var(--text)" />`;
    return `<select style="font-size:13px;padding:4px 8px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-2);color:var(--text);min-width:180px">
      ${varer.filter(v => !v.varenr.startsWith('INTERN-')).map(v =>
        `<option value="${escapeHtml(v.varenr)}"${v.varenr === selected ? ' selected' : ''}>${escapeHtml(v.beskrivelse)}</option>`
      ).join('')}
    </select>`;
  }

  // Byg antal dropdown (0.5 til 20 med 0.5 trin, plus heltal op til 20)
  function bygAntalDropdownHtml(selected) {
    const opts = [];
    for (let i = 0.5; i <= 20; i += 0.5) {
      const label = Number.isInteger(i) ? `${i}` : `${i}`;
      opts.push(`<option value="${i}"${i === selected ? ' selected' : ''}>${label}</option>`);
    }
    return `<select style="width:80px;font-size:13px;padding:4px 8px;border:1px solid var(--border);border-radius:var(--radius);background:var(--bg-2);color:var(--text)">${opts.join('')}</select>`;
  }

  function autoVarerForMast(mast) {
    const result = [];
    AUTO_REGLER_MAST.forEach(regel => {
      if (regel.matcher(mast)) regel.varer.forEach(v => result.push({ ...v }));
    });
    return result;
  }

  // Beregn stykliste pr. mast inkl. automatiske varer
  function beregnStyklistePrMast(mast) {
    const tæller = {};
    // Mastetype
    const masteVarenr = findMasteVarenr(mast.mastetype);
    if (masteVarenr) tæller[masteVarenr] = (tæller[masteVarenr] || 0) + 1;
    // Auto-varer fra mastetype (hætter osv.)
    autoVarerForMast(mast).forEach(v => {
      tæller[v.varenr] = (tæller[v.varenr] || 0) + v.antal;
    });
    // Manuelt tilføjet udstyr + auto-varer for udstyr
    let armTilfoejt = false;
    (mast.udstyr || []).forEach(u => {
      if (u.varenr) {
        const antal = parseFloat(u.antal) || 1;
        tæller[u.varenr] = (tæller[u.varenr] || 0) + antal;
      }
      // Forlænger arm — max 1 pr. mast
      if (u.forlængerArm && RADAR_VARENUMRE.includes(u.varenr) && !armTilfoejt) {
        tæller['250-650-0148'] = (tæller['250-650-0148'] || 0) + 1;
        armTilfoejt = true;
      }
      autoVarerForUdstyr(u, mast.mastetype).forEach((v, aIdx) => {
        const override = (u._autoOverrides || {})[aIdx] || {};
        const varenr = override.varenr || v.varenr;
        const antal = override.antal !== undefined ? override.antal : v.antal;
        tæller[varenr] = (tæller[varenr] || 0) + antal;
      });
    });
    // Automatiske varer fra signaler + selve lanterner
    (mast.signaler || []).forEach(sig => {
      if (sig.varenr) tæller[sig.varenr] = (tæller[sig.varenr] || 0) + 1;
      autoVarerForSignal(sig).forEach((v, aIdx) => {
        const override = (sig._autoOverrides || {})[aIdx] || {};
        const varenr = override.varenr || v.varenr;
        const antal = override.antal !== undefined ? override.antal : v.antal;
        tæller[varenr] = (tæller[varenr] || 0) + antal;
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
      // Kollaps alle master ved indlæsning
      collapsedMaster.clear();
      state.master.forEach((_, i) => collapsedMaster.add(i));
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

  function naturalSort(a, b) {
    return a.mastId.localeCompare(b.mastId, undefined, { numeric: true, sensitivity: 'base' });
  }

  function tilfoejMast() {
    const mastId = $('ny-mast-id').value.trim() || `S${state.master.length + 1}`;
    state.master.push({
      mastId: mastId,
      mastetype: $('ny-mastetype').value,
      udstyr: [],
      signaler: []
    });
    state.master.sort(naturalSort);
    $('ny-mast-id').value = '';
    render();
  }

  // ==============================
  // Event handlers
  // ==============================
  function tilkoblEvents() {
    $('anlaeg-nr').addEventListener('input', e => { state.nr = e.target.value; opdaterOutput(); planAutoGem(); });
    $('anlaeg-navn').addEventListener('input', e => { state.navn = e.target.value; opdaterOutput(); planAutoGem(); });

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

    // Mast-filter knapper
    $('filter-alle-btn') && $('filter-alle-btn').addEventListener('click', () => {
      mastFilter = new Set(state.master.map(m => m.mastId));
      renderMastFilter();
      opdaterOutput();
    });
    $('filter-ingen-btn') && $('filter-ingen-btn').addEventListener('click', () => {
      mastFilter = new Set();
      renderMastFilter();
      opdaterOutput();
    });
    $('toggle-stykliste-btn').addEventListener('click', () => {
      const indhold = $('stykliste-indhold');
      const controls = $('stykliste-controls');
      const btn = $('toggle-stykliste-btn');
      const skjult = indhold.style.display === 'none';
      indhold.style.display = skjult ? '' : 'none';
      if (controls) controls.style.display = skjult ? '' : 'none';
      btn.textContent = skjult ? '▾' : '▸';
    });

    // Toggle output
    $('toggle-output-btn').addEventListener('click', () => {
      const indhold = $('output-indhold');
      const controls = $('output-controls');
      const btn = $('toggle-output-btn');
      const skjult = indhold.style.display === 'none';
      indhold.style.display = skjult ? '' : 'none';
      if (controls) controls.style.display = skjult ? '' : 'none';
      btn.textContent = skjult ? '▾' : '▸';
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

    if (action === 'toggle-mast') {
      const card = t.closest('.mast-card');
      const body = card.querySelector('.mast-body');
      const summary = card.querySelector('.mast-summary');
      const collapsed = card.dataset.collapsed === 'true';
      const mIdx2 = parseInt(t.dataset.mast);
      if (collapsed) {
        body.style.display = '';
        summary.style.display = 'none';
        t.textContent = '▾';
        card.dataset.collapsed = 'false';
        collapsedMaster.delete(mIdx2);
      } else {
        body.style.display = 'none';
        summary.style.display = '';
        t.textContent = '▸';
        card.dataset.collapsed = 'true';
        collapsedMaster.add(mIdx2);
      }
    } else if (action === 'del-mast') {
      if (confirm(`Slet ${state.master[mIdx].mastId} og alle dens signaler?`)) {
        state.master.splice(mIdx, 1);
        // Opdater kollaps-indeks efter sletning
        const nyCollapsed = new Set();
        collapsedMaster.forEach(i => { if (i < mIdx) nyCollapsed.add(i); else if (i > mIdx) nyCollapsed.add(i - 1); });
        collapsedMaster.clear();
        nyCollapsed.forEach(i => collapsedMaster.add(i));
        render();
      }
    } else if (action === 'del-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      state.master[mIdx].udstyr.splice(uIdx, 1);
      render();
    } else if (action === 'rediger-auto-sig') {
      const sIdx = parseInt(t.dataset.sig);
      const aIdx = parseInt(t.dataset.auto);
      const sig = state.master[mIdx].signaler[sIdx];
      if (!sig._autoOverrides) sig._autoOverrides = {};
      if (!sig._autoOverrides[aIdx]) sig._autoOverrides[aIdx] = {};
      sig._autoOverrides[aIdx]._redigerer = true;
      render();
    } else if (action === 'annuller-auto-sig') {
      const sIdx = parseInt(t.dataset.sig);
      const aIdx = parseInt(t.dataset.auto);
      const sig = state.master[mIdx].signaler[sIdx];
      if (sig._autoOverrides && sig._autoOverrides[aIdx]) delete sig._autoOverrides[aIdx]._redigerer;
      render();
    } else if (action === 'gem-auto-sig') {
      const sIdx = parseInt(t.dataset.sig);
      const aIdx = parseInt(t.dataset.auto);
      const antalWrap = document.getElementById(`auto-sig-antal-wrap-${mIdx}-${sIdx}-${aIdx}`);
      const varenrWrap = document.getElementById(`auto-sig-varenr-wrap-${mIdx}-${sIdx}-${aIdx}`);
      const antalEl = antalWrap ? antalWrap.querySelector('select') : null;
      const varenrEl = varenrWrap ? (varenrWrap.querySelector('select') || varenrWrap.querySelector('input')) : null;
      const sig = state.master[mIdx].signaler[sIdx];
      if (!sig._autoOverrides) sig._autoOverrides = {};
      sig._autoOverrides[aIdx] = {
        antal: antalEl ? parseFloat(antalEl.value) : undefined,
        varenr: varenrEl && varenrEl.value.trim() ? varenrEl.value.trim() : undefined,
      };
      render();
    } else if (action === 'rediger-auto-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      const aIdx = parseInt(t.dataset.auto);
      const u = state.master[mIdx].udstyr[uIdx];
      if (!u._autoOverrides) u._autoOverrides = {};
      if (!u._autoOverrides[aIdx]) u._autoOverrides[aIdx] = {};
      u._autoOverrides[aIdx]._redigerer = true;
      render();
    } else if (action === 'annuller-auto-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      const aIdx = parseInt(t.dataset.auto);
      const u = state.master[mIdx].udstyr[uIdx];
      if (u._autoOverrides && u._autoOverrides[aIdx]) delete u._autoOverrides[aIdx]._redigerer;
      render();
    } else if (action === 'gem-auto-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      const aIdx = parseInt(t.dataset.auto);
      const antalWrap = document.getElementById(`auto-u-antal-wrap-${mIdx}-${uIdx}-${aIdx}`);
      const varenrWrap = document.getElementById(`auto-u-varenr-wrap-${mIdx}-${uIdx}-${aIdx}`);
      const antalEl = antalWrap ? antalWrap.querySelector('select') : null;
      const varenrEl = varenrWrap ? (varenrWrap.querySelector('select') || varenrWrap.querySelector('input')) : null;
      const u = state.master[mIdx].udstyr[uIdx];
      if (!u._autoOverrides) u._autoOverrides = {};
      u._autoOverrides[aIdx] = {
        antal: antalEl ? parseFloat(antalEl.value) : undefined,
        varenr: varenrEl && varenrEl.value.trim() ? varenrEl.value.trim() : undefined,
      };
      render();
    } else if (action === 'annuller-sig') {
      const sIdx = parseInt(t.dataset.sig);
      delete state.master[mIdx].signaler[sIdx]._redigerer;
      render();
    } else if (action === 'gem-sig') {
      const sIdx = parseInt(t.dataset.sig);
      const card = t.closest('.mast-card');
      const sig = state.master[mIdx].signaler[sIdx];
      const betegnelse = card.querySelector(`[data-rediger-sig="betegnelse"][data-sig="${sIdx}"]`);
      const hojde = card.querySelector(`[data-rediger-sig="hojde"][data-sig="${sIdx}"]`);
      const note = card.querySelector(`[data-rediger-sig="note"][data-sig="${sIdx}"]`);
      if (betegnelse) sig.betegnelse = betegnelse.value.trim();
      if (hojde) sig.hojde = hojde.value;
      if (note) sig.note = note.value.trim();
      delete sig._redigerer;
      render();
    } else if (action === 'rediger-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      state.master[mIdx].udstyr[uIdx]._redigerer = true;
      render();
    } else if (action === 'annuller-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      delete state.master[mIdx].udstyr[uIdx]._redigerer;
      render();
    } else if (action === 'gem-udstyr') {
      const uIdx = parseInt(t.dataset.udstyr);
      const card = t.closest('.mast-card');
      const u = state.master[mIdx].udstyr[uIdx];
      const antal = card.querySelector(`[data-rediger-u="antal"][data-udstyr="${uIdx}"]`);
      const betegnelse = card.querySelector(`[data-rediger-u="betegnelse"][data-udstyr="${uIdx}"]`);
      if (antal) u.antal = parseFloat(antal.value) || 1;
      if (betegnelse) u.betegnelse = betegnelse.value.trim();
      delete u._redigerer;
      render();
      const sIdx = parseInt(t.dataset.sig);
      state.master[mIdx].signaler.splice(sIdx, 1);
      render();
    } else if (action === 'add-udstyr') {
      const card = t.closest('.mast-card');
      const varenr = card.querySelector('[data-field="udstyrtype"]').value;
      const betegnelse = card.querySelector('[data-field="udstyrbetegnelse"]').value.trim();
      const antalInput = card.querySelector('[data-field="udstyrantal"]');
      const meterInput = card.querySelector('[data-field="udstyrmeter"]');
      const armSelect = card.querySelector('[data-field="udstyrarm"]');
      const erKabel = KABEL_VARENUMRE.includes(varenr);
      const rawAntal = erKabel
        ? (meterInput && meterInput.value ? parseFloat(meterInput.value) : 1)
        : (antalInput && antalInput.value ? parseFloat(antalInput.value) : 1);
      const forlængerArm = armSelect ? armSelect.value === 'ja' : false;
      if (!varenr) { visBesked('Vælg en vare først', 'danger'); return; }
      const vare = findVare(varenr);
      const gemAntal = isNaN(rawAntal) || rawAntal < 0.5 ? 1 : rawAntal;
      state.master[mIdx].udstyr.push({ varenr, type: vare ? vare.beskrivelse : varenr, betegnelse, antal: gemAntal, forlængerArm });
      card.querySelector('[data-field="udstyrbetegnelse"]').value = '';
      if (meterInput) meterInput.value = '';
      if (antalInput) antalInput.value = '1';
      if (armSelect) armSelect.value = 'nej';
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
          .map(v => `<option value="${escapeHtml(v.varenr)}">${escapeHtml(v.beskrivelse)}</option>`)
          .join('');
        vareSelect.disabled = false;
        // Vis meter-felt hvis kabel, ellers antal-felt
        const meterWrap = card.querySelector(`#udstyr-meter-wrap-${mIdx}`);
        const antalWrap = card.querySelector(`#udstyr-antal-wrap-${mIdx}`);
        const armWrap = card.querySelector(`#udstyr-arm-wrap-${mIdx}`);
        const erKabel = kat.varer.length > 0 && KABEL_VARENUMRE.includes(kat.varer[0].varenr);
        const erRadar = kat.varer.length > 0 && RADAR_VARENUMRE.includes(kat.varer[0].varenr);
        if (meterWrap) meterWrap.style.display = erKabel ? '' : 'none';
        if (antalWrap) antalWrap.style.display = erKabel ? 'none' : '';
        if (armWrap) armWrap.style.display = erRadar ? '' : 'none';
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
          .map(v => `<option value="${escapeHtml(v.varenr)}">${escapeHtml(v.beskrivelse)}</option>`)
          .join('');
        vareSelect.disabled = false;
        const mIdx2 = parseInt(t.dataset.mast);
        const meterWrap2 = card.querySelector(`#udstyr-meter-wrap-${mIdx2}`);
        const antalWrap2 = card.querySelector(`#udstyr-antal-wrap-${mIdx2}`);
        const armWrap2 = card.querySelector(`#udstyr-arm-wrap-${mIdx2}`);
        const erKabel2 = under.varer.length > 0 && KABEL_VARENUMRE.includes(under.varer[0].varenr);
        const erRadar2 = under.varer.length > 0 && RADAR_VARENUMRE.includes(under.varer[0].varenr);
        if (meterWrap2) meterWrap2.style.display = erKabel2 ? '' : 'none';
        if (antalWrap2) antalWrap2.style.display = erKabel2 ? 'none' : '';
        if (armWrap2) armWrap2.style.display = erRadar2 ? '' : 'none';
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
