# Stargate Innovationhub Website

> Offizielle Unternehmenswebsite von Stargate Innovationhub – Mobile App Entwicklung aus Deutschland.

🌐 **Live:** [stargate-innovationhub.com](https://stargate-innovationhub.com)

---

## 📱 Unsere Produkte

| Produkt | Beschreibung | Links |
|---------|--------------|-------|
| **MyQuitly** | Rauchen-aufhören App mit personalisierten Reduktionsplänen | [iOS](https://apps.apple.com/app/id6754508949) · [Android](https://play.google.com/store/apps/details?id=com.myquitly.quitsmoking) |
| **ForeverTold** | Lebensgeschichten bewahren – Audio zu Büchern/Hörbüchern | [iOS](https://apps.apple.com/app/forevertold) · [Android](https://play.google.com/store/apps/details?id=app.forevertold) |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling:** CSS Custom Properties (Design Tokens), BEM Methodology
- **Fonts:** Google Fonts (Inter, Outfit)
- **Hosting:** GitHub Pages
- **Domain:** stargate-innovationhub.com (via IONOS)

> ⚠️ Dies ist eine **statische Website** ohne Build-Tools oder Frameworks.

---

## 🚀 Lokale Entwicklung

### Voraussetzungen
- Ein moderner Webbrowser
- Optional: Live Server Extension für VS Code / Cursor

### Starten

```bash
# Repository klonen
git clone https://github.com/[username]/stargate-innovationhub-website.git
cd stargate-innovationhub-website

# Option 1: Einfach öffnen
open index.html

# Option 2: Mit Python HTTP Server
python3 -m http.server 8000
# → http://localhost:8000

# Option 3: Mit VS Code Live Server
# Rechtsklick auf index.html → "Open with Live Server"
```

---

## 📁 Projektstruktur

```
/
├── index.html              # 🇩🇪 Deutsche Startseite
├── en/                     # 🇬🇧 Englische Version
│   ├── index.html
│   ├── legal/
│   └── products/
├── products/               # Produktseiten (DE)
│   ├── index.html
│   ├── myquitly/
│   └── forevertold/
├── legal/                  # Rechtliche Seiten (DE)
├── css/styles.css          # Einheitliches Stylesheet
├── js/main.js              # Shared JavaScript
├── images/                 # Alle Bilder
└── _original/              # Archiv (nicht bearbeiten!)
```

📄 Detaillierte Struktur: Siehe [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## 🌍 Mehrsprachigkeit

| Sprache | Pfad | Beispiel |
|---------|------|----------|
| Deutsch (Standard) | `/` | `/products/myquitly/` |
| Englisch | `/en/` | `/en/products/myquitly/` |

**Wichtig:** Änderungen immer in **beiden** Sprachversionen durchführen!

---

## 📝 Dokumentation

| Datei | Beschreibung |
|-------|--------------|
| [README.md](README.md) | Diese Datei – Projekt-Übersicht |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Detaillierte Ordnerstruktur |
| [CHANGELOG.md](CHANGELOG.md) | Versionshistorie |
| [IONOS_GITHUB_SETUP.md](IONOS_GITHUB_SETUP.md) | Deployment-Anleitung |
| [REDIRECT_PLAN.md](REDIRECT_PLAN.md) | URL-Weiterleitungsplan |
| [.cursorrules](.cursorrules) | AI-Projekt-Konventionen |

---

## 🎨 Design System

### Farben

| Name | Hex | Verwendung |
|------|-----|------------|
| Brand | `#62c9f3` | Stargate Hauptfarbe |
| MyQuitly | `#20C997` | Produkt-Akzent |
| ForeverTold | `#E07A5F` | Produkt-Akzent |
| Background | `#0A0A0F` | Dark Theme Basis |

### CSS-Variablen

```css
/* Farben */
var(--color-brand)
var(--color-myquitly)
var(--color-forevertold)

/* Spacing */
var(--space-1) ... var(--space-32)

/* Typography */
var(--font-display)  /* Outfit */
var(--font-body)     /* Inter */
```

---

## 🔄 Deployment

Die Website wird automatisch über **GitHub Pages** deployed.

1. Änderungen auf `main` Branch pushen
2. GitHub Pages baut automatisch (ca. 1-2 Minuten)
3. Live unter [stargate-innovationhub.com](https://stargate-innovationhub.com)

📄 Detaillierte Anleitung: Siehe [IONOS_GITHUB_SETUP.md](IONOS_GITHUB_SETUP.md)

---

## 📋 Konventionen

### Commit Messages

```
<type>: <beschreibung>

Beispiele:
feat: Neue FAQ-Sektion hinzugefügt
fix: Broken Link im Footer korrigiert
style: Button-Hover verbessert
content: Produktbeschreibung aktualisiert
seo: Structured Data ergänzt
```

### Code-Stil

- **CSS:** BEM Naming (`block__element--modifier`)
- **Pfade:** Immer absolut (`/css/styles.css`)
- **Variablen:** CSS Custom Properties nutzen

📄 Vollständige Regeln: Siehe [.cursorrules](.cursorrules)

---

## 📞 Kontakt

**Stargate Innovationhub**  
Albert-Schweitzer-Allee 9  
65203 Wiesbaden, Deutschland

📧 info@stargate-innovationhub.com

---

## 📜 Lizenz

© 2026 Stargate Innovationhub. Alle Rechte vorbehalten.

