# Visitenkarte — Stargate Innovationhub / My Weddy

Beidseitige Visitenkarte für Flyeralarm, Produkt **„Visitenkarten klassisch,
8,5 x 5,5 cm, beidseitig bedruckt (4/4)“**.

| Seite | Motiv |
|---|---|
| 1 (Vorderseite) | Stargate Innovationhub — dunkles Markenmotiv; Logo-Lockup und QR-Code (→ stargate-innovationhub.com) als mittig zentrierte Gruppe; Kontakt Florian Aboutara (Tel. +49 155 67226511, ohne Postadresse) |
| 2 (Rückseite) | My Weddy — Editorial-Design; Wortmarke zentriert, Overline „Dein Hochzeitsplaner“, Leit-Claim „Aus Planung wird Vorfreude.“; unten rechts kleiner QR-Code (→ my-weddy.com) neben der Webadresse |

## Druckdaten (`druckdaten/`)

- **`visitenkarte-stargate-myweddy-85x55-4-4.pdf`** — die Upload-Datei
  (2 Seiten: S. 1 Vorderseite, S. 2 Rückseite)
- `visitenkarte-einzelseite-1-stargate.pdf` / `visitenkarte-einzelseite-2-myweddy.pdf`
  — dieselben Motive einzeln, falls der Upload je Seite eine Datei verlangt
- `vorschau-seite-1.png` / `vorschau-seite-2.png` — 300-dpi-Vorschau

Technische Eckdaten:

- Datenformat **87 x 57 mm** = Endformat 85 x 55 mm + 1 mm Beschnitt umlaufend
  (TrimBox ist in der PDF gesetzt), keine Schneidemarken
- Alle Vektorfarben in **CMYK**; Logos als CMYK-JPEGs (600 dpi) auf die
  jeweilige Hintergrundfarbe komponiert
- Dunkler Fond: C66 M56 Y44 K90 (Flächendeckung 256 % < 300 %-Limit),
  kleine Texte der Rückseite in reinem Schwarz (nur K, kein Passer-Risiko)
- Schriften eingebettet (subsettiert): Outfit, Inter, Cormorant Garamond
- Texte halten die 3-mm-Sicherheitszone ein; die blaue Fußkante der
  Vorderseite läuft bewusst in den Beschnitt
- QR-Codes als Vektor-Module direkt in der PDF (ECC M): vorn 10 mm auf
  weißer Kachel rechts neben dem Logo (zuverlässiges Scannen auf dunklem
  Fond), hinten 8,5 mm in reinem K unten rechts neben der Webadresse;
  beide Codes werden beim Build aus dem 300-dpi-Rendering maschinell
  rückgelesen und verifiziert

## Neu bauen

```bash
pip install reportlab pillow numpy pymupdf segno zxing-cpp
./fetch_fonts.sh          # Google-Fonts-Schnitte (OFL) nach fonts/
python3 build_card.py     # schreibt nach druckdaten/
```

Das My-Weddy-Wortmarken-PNG wird aus dem Schwester-Repo `weddingpage`
(`public/logo/My_Weddy_v2-5.png`) gelesen; abweichender Pfad per
`WEDDY_LOGO=/pfad/zur/datei python3 build_card.py`.

## Herkunft der Gestaltung

- **Stargate-Seite:** Website-Farbwelt (`css/styles.css`: #0A0A0F / #62C9F3),
  Display-Schrift Outfit, Icon aus `images/trancparent-logo.png` freigestellt;
  Kontaktdaten aus `legal/imprint.html`
- **My-Weddy-Seite:** Editorial Design System des `weddingpage`-Repos
  (Cream-Hintergrund #FDFBF7, Charcoal, Cormorant Garamond); Leit-Claim aus
  `docs/guidelines/BRAND_IDENTITY.md` §10.1
