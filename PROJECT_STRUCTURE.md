# Projektstruktur – Stargate Innovationhub Website

Dieses Dokument beschreibt die vollständige Ordner- und Dateistruktur der Website.

---

## 📁 Übersicht

```
stargate-innovationhub-website/
│
├── 📄 Hauptdateien
│   ├── index.html              # 🇩🇪 Deutsche Startseite
│   ├── CNAME                   # GitHub Pages Custom Domain
│   ├── robots.txt              # Suchmaschinen-Steuerung
│   └── sitemap.xml             # XML Sitemap für SEO
│
├── 📁 /en/                     # 🇬🇧 Englische Version
│   ├── index.html              # EN Startseite
│   ├── /legal/                 # EN Rechtliche Seiten
│   └── /products/              # EN Produktseiten
│
├── 📁 /products/               # 🇩🇪 Produktseiten
│   ├── index.html              # Produktübersicht
│   ├── /myquitly/              # MyQuitly Produktseite
│   └── /forevertold/           # ForeverTold Produktseite
│
├── 📁 /legal/                  # 🇩🇪 Rechtliche Seiten
│   ├── imprint.html            # Impressum
│   ├── privacy.html            # Datenschutzerklärung
│   ├── terms.html              # AGB
│   ├── cookies.html            # Cookie-Richtlinie
│   └── disclaimer.html         # Haftungsausschluss
│
├── 📁 /css/                    # Stylesheets
│   └── styles.css              # Einheitliches Stylesheet
│
├── 📁 /js/                     # JavaScript
│   └── main.js                 # Shared JavaScript
│
├── 📁 /images/                 # Alle Bilder
│
├── 📁 /_original/              # ⚠️ Archiv (NICHT BEARBEITEN)
│
└── 📄 Dokumentation
    ├── README.md               # Projekt-Übersicht
    ├── CHANGELOG.md            # Versionshistorie
    ├── PROJECT_STRUCTURE.md    # Diese Datei
    ├── IONOS_GITHUB_SETUP.md   # Deployment-Anleitung
    ├── REDIRECT_PLAN.md        # URL-Weiterleitungsplan
    ├── .cursorrules            # AI-Projekt-Konventionen
    └── .gitignore              # Git Ignore Regeln
```

---

## 📁 Detaillierte Struktur

### Root-Verzeichnis `/`

| Datei | Beschreibung | Sprache |
|-------|--------------|---------|
| `index.html` | Startseite mit Hero, Produkten, Über uns, Kontakt | DE |
| `CNAME` | GitHub Pages Custom Domain Konfiguration | - |
| `robots.txt` | Suchmaschinen-Anweisungen | - |
| `sitemap.xml` | XML Sitemap für Google & Co. | - |

---

### `/en/` – Englische Version

Spiegelt die deutsche Struktur 1:1.

```
/en/
├── index.html                  # EN Startseite
├── /legal/
│   ├── imprint.html            # Imprint (Legal Notice)
│   ├── privacy.html            # Privacy Policy
│   ├── terms.html              # Terms of Service
│   ├── cookies.html            # Cookie Policy
│   └── disclaimer.html         # Disclaimer
└── /products/
    ├── index.html              # Products Overview
    ├── /myquitly/
    │   └── index.html          # MyQuitly Product Page
    └── /forevertold/
        └── index.html          # ForeverTold Product Page
```

---

### `/products/` – Produktseiten (DE)

| Pfad | Beschreibung |
|------|--------------|
| `/products/index.html` | Produktübersicht mit Karten für beide Apps |
| `/products/myquitly/index.html` | Detaillierte MyQuitly Seite mit Features, FAQ, Downloads |
| `/products/forevertold/index.html` | Detaillierte ForeverTold Seite mit Features, FAQ, Downloads |

---

### `/legal/` – Rechtliche Seiten (DE)

| Datei | Beschreibung | Pflicht |
|-------|--------------|---------|
| `imprint.html` | Impressum mit Anbieterkennzeichnung | ✅ TMG §5 |
| `privacy.html` | Datenschutzerklärung (DSGVO) | ✅ DSGVO |
| `terms.html` | Allgemeine Geschäftsbedingungen | Optional |
| `cookies.html` | Cookie-Richtlinie | ✅ ePrivacy |
| `disclaimer.html` | Haftungsausschluss für Apps | Empfohlen |

---

### `/css/` – Stylesheets

| Datei | Zeilen | Beschreibung |
|-------|--------|--------------|
| `styles.css` | ~2268 | Einheitliches Stylesheet mit Design System |

**Struktur innerhalb von styles.css:**

```css
/* ======================================== */
/*   1. CSS Custom Properties (Design Tokens) */
/* ======================================== */
:root { ... }

/* ======================================== */
/*   2. Reset & Base Styles                  */
/* ======================================== */

/* ======================================== */
/*   3. Utility Classes                      */
/* ======================================== */

/* ======================================== */
/*   4. Layout Components                    */
/* ======================================== */
/* - Header/Nav */
/* - Footer */
/* - Container */

/* ======================================== */
/*   5. Page Components                      */
/* ======================================== */
/* - Hero */
/* - Sections */
/* - Cards */

/* ======================================== */
/*   6. Product-specific Styles              */
/* ======================================== */
/* - MyQuitly */
/* - ForeverTold */

/* ======================================== */
/*   7. Legal Pages                          */
/* ======================================== */

/* ======================================== */
/*   8. Cookie Banner & Modal                */
/* ======================================== */
```

---

### `/js/` – JavaScript

| Datei | Beschreibung |
|-------|--------------|
| `main.js` | Shared JavaScript für alle Seiten |

**Funktionen in main.js:**
- Mobile Navigation Toggle
- Smooth Scroll für Anchor-Links
- Header Scroll-Effekt
- Intersection Observer für Animationen
- Cookie Banner & Modal Logik

---

### `/images/` – Bilder

| Datei | Verwendung |
|-------|------------|
| `trancparent-logo.png` | Stargate Logo (transparent) |
| `myquitly-icon.png` | MyQuitly App Icon |
| `forevertold-icon.png` | ForeverTold App Icon |
| `apple_logo3.png` | Apple Store Badge Icon |
| `google_logo.png` | Google Play Badge Icon |
| `Group 1_long.png` | MyQuitly App Screenshots (DE) |
| `Group 2_long.png` | MyQuitly App Screenshots (EN) |
| `forevertold-og.png` | ForeverTold OG Image |

**Konventionen:**
- Format: PNG bevorzugt
- Max. Größe: 200KB
- Naming: kebab-case

---

### `/_original/` – Archiv ⚠️

> **WARNUNG:** Diesen Ordner **NIEMALS** bearbeiten!

Enthält die originalen Einzelwebsites vor der Zusammenführung:

```
/_original/
├── /forevertold-website/       # Ursprüngliche ForeverTold Website
│   ├── index.html
│   ├── /css/
│   ├── /js/
│   ├── /images/
│   └── ...
└── /myquitly-website/          # Ursprüngliche MyQuitly Website
    ├── index.html
    ├── styles.css
    ├── /de/
    ├── /en/
    └── ...
```

**Zweck:** Referenz und Backup der alten Struktur.

---

## 🌍 Sprachstruktur

```
Deutsche Version (Standard)     Englische Version
========================       ========================
/                              /en/
├── index.html                 ├── index.html
├── /products/                 ├── /products/
│   ├── index.html             │   ├── index.html
│   ├── /myquitly/             │   ├── /myquitly/
│   └── /forevertold/          │   └── /forevertold/
└── /legal/                    └── /legal/
    ├── imprint.html               ├── imprint.html
    ├── privacy.html               ├── privacy.html
    ├── terms.html                 ├── terms.html
    ├── cookies.html               ├── cookies.html
    └── disclaimer.html            └── disclaimer.html
```

**Regel:** Jede deutsche Seite hat eine englische Entsprechung und umgekehrt.

---

## 📄 Dokumentation

| Datei | Zweck | Aktualisieren wenn... |
|-------|-------|----------------------|
| `README.md` | Projekt-Übersicht | Neue Features, Setup-Änderungen |
| `CHANGELOG.md` | Versionshistorie | Bei jeder Release |
| `PROJECT_STRUCTURE.md` | Ordnerstruktur | Neue Ordner/Dateien hinzugefügt |
| `IONOS_GITHUB_SETUP.md` | Deployment | Hosting-Änderungen |
| `REDIRECT_PLAN.md` | URL-Redirects | Neue Weiterleitungen |
| `.cursorrules` | AI-Konventionen | Neue Regeln/Konventionen |

---

## 🔗 URL-Struktur

### Produktions-URLs

| Seite | URL |
|-------|-----|
| DE Startseite | `https://stargate-innovationhub.com/` |
| EN Startseite | `https://stargate-innovationhub.com/en/` |
| MyQuitly (DE) | `https://stargate-innovationhub.com/products/myquitly/` |
| MyQuitly (EN) | `https://stargate-innovationhub.com/en/products/myquitly/` |
| ForeverTold (DE) | `https://stargate-innovationhub.com/products/forevertold/` |
| ForeverTold (EN) | `https://stargate-innovationhub.com/en/products/forevertold/` |
| Datenschutz (DE) | `https://stargate-innovationhub.com/legal/privacy.html` |
| Privacy (EN) | `https://stargate-innovationhub.com/en/legal/privacy.html` |

---

## 📝 Hinweise

### Neue Seite hinzufügen

1. Erstelle die deutsche Version im passenden Ordner
2. Kopiere Header/Footer von einer ähnlichen Seite
3. Erstelle die englische Version unter `/en/`
4. Aktualisiere `sitemap.xml`
5. Aktualisiere diese Datei (PROJECT_STRUCTURE.md)

### Pfade

- ✅ **Immer absolute Pfade:** `/css/styles.css`, `/images/logo.png`
- ❌ **Niemals relative Pfade:** `../css/styles.css`, `./images/logo.png`

### Verzeichnis-Index

Alle Unterordner mit `index.html` können ohne Dateiname aufgerufen werden:
- `/products/myquitly/index.html` → `/products/myquitly/`

