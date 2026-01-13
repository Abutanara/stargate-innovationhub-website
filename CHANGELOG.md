# Changelog

Alle wichtigen Änderungen an der Stargate Innovationhub Website werden hier dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

---

## [Unreleased]

### Hinzugefügt
- `.cursorrules` Datei für AI-Projekt-Konventionen
- `README.md` mit Projekt-Übersicht
- `CHANGELOG.md` für Versionshistorie
- `PROJECT_STRUCTURE.md` mit detaillierter Ordnerstruktur

---

## [1.0.0] - 2026-01-05

### 🎉 Initiale Release

Die erste Version der einheitlichen Stargate Innovationhub Unternehmenswebsite.

### Hinzugefügt

#### Struktur
- Einheitliche Website-Architektur mit Unternehmensseite und Produktseiten
- Mehrsprachigkeit (Deutsch & Englisch)
- Responsive Design (Mobile-First)

#### Seiten
- **Startseite** (`/`, `/en/`) - Unternehmensübersicht mit Hero, Produktvorstellung, Über uns, Kontakt
- **Produktübersicht** (`/products/`, `/en/products/`)
- **SmokeLess Produktseite** (`/products/smokeless/`, `/en/products/smokeless/`)
- **ForeverTold Produktseite** (`/products/forevertold/`, `/en/products/forevertold/`)
- **Legal-Seiten:**
  - Impressum (`/legal/imprint.html`)
  - Datenschutz (`/legal/privacy.html`)
  - AGB (`/legal/terms.html`)
  - Cookie-Richtlinie (`/legal/cookies.html`)
  - Haftungsausschluss (`/legal/disclaimer.html`)

#### Design System
- CSS Custom Properties (Design Tokens) für Farben, Spacing, Typography
- Dark Theme als Standard
- BEM CSS Methodology
- Produkt-spezifische Farbschemata (SmokeLess: Grün, ForeverTold: Terrakotta)

#### Features
- Cookie Consent Banner & Einstellungs-Modal
- Responsive Navigation mit Mobile Menu
- Smooth Scrolling für Anchor-Links
- Scroll-basierte Header-Effekte
- App Store Badges mit Download-Links

#### SEO
- Vollständige Meta Tags (OG, Twitter Cards)
- JSON-LD Structured Data (Organization, SoftwareApplication, FAQPage, BreadcrumbList, HowTo)
- hreflang Tags für Mehrsprachigkeit
- Canonical URLs
- robots.txt & sitemap.xml

#### Dokumentation
- `IONOS_GITHUB_SETUP.md` - Deployment-Anleitung
- `REDIRECT_PLAN.md` - URL-Weiterleitungsplan für Migration

---

## Changelog Format

### Kategorien

| Emoji | Kategorie | Beschreibung |
|-------|-----------|--------------|
| ✨ | Hinzugefügt | Neue Features |
| 🔄 | Geändert | Änderungen an bestehenden Features |
| 🗑️ | Entfernt | Entfernte Features |
| 🐛 | Behoben | Bug Fixes |
| 🔒 | Sicherheit | Sicherheits-Updates |
| 📝 | Dokumentation | Nur Dokumentationsänderungen |
| 🎨 | Design | CSS/UI Änderungen |
| 🔍 | SEO | SEO-Optimierungen |

### Beispiel-Einträge

```markdown
## [1.1.0] - 2026-02-01

### ✨ Hinzugefügt
- Neue FAQ-Sektion auf der SmokeLess-Seite
- Dark/Light Mode Toggle

### 🔄 Geändert
- Hero-Titel auf der Startseite aktualisiert
- Footer-Links umstrukturiert

### 🐛 Behoben
- Broken Link im Footer korrigiert
- Mobile Navigation schließt jetzt beim Klick
```

---

## Versioning

Wir verwenden [Semantic Versioning](https://semver.org/lang/de/):

- **MAJOR** (1.x.x): Grundlegende Änderungen an der Website-Struktur
- **MINOR** (x.1.x): Neue Seiten, Features oder Sektionen
- **PATCH** (x.x.1): Bug Fixes, kleine Content-Updates, Styling-Anpassungen

