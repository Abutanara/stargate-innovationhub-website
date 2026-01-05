# ForeverTold Website

Landing Page für die ForeverTold App.

## 📁 Struktur

```
website/
├── index.html          # Hauptseite (Landing Page)
├── datenschutz.html    # Datenschutzerklärung
├── impressum.html      # Impressum
├── agb.html            # AGB
├── robots.txt          # SEO: Crawler-Anweisungen
├── sitemap.xml         # SEO: Sitemap
├── manifest.json       # PWA Manifest
├── css/
│   └── styles.css      # Alle Styles (Mobile-First)
├── js/
│   └── main.js         # JavaScript (Menu, Animationen)
└── images/
    ├── logo.svg              # Logo
    ├── qr-code.svg           # QR-Code Placeholder
    ├── apple-touch-icon.png  # iOS Icon
    ├── favicon-32x32.png     # Favicon (zu erstellen)
    ├── favicon-16x16.png     # Favicon (zu erstellen)
    ├── app-screenshot-hero.png # App Screenshot (zu erstellen)
    └── og-image.png          # Social Media Preview (zu erstellen)
```

## 🚀 Deployment

Die Website ist statisches HTML/CSS/JS und kann überall gehostet werden:

### Option 1: Vercel (Empfohlen)
```bash
cd website
npx vercel
```

### Option 2: Netlify
```bash
cd website
npx netlify deploy --prod
```

### Option 3: GitHub Pages
1. Repository in GitHub erstellen
2. `website/` Ordner hochladen
3. Settings → Pages → Source: main branch, /website folder

### Option 4: Firebase Hosting
```bash
cd website
firebase init hosting
firebase deploy
```

## ✏️ Anpassungen nötig

### 1. Bilder erstellen/ersetzen
- `images/app-screenshot-hero.png` - Screenshot der App (300x600px)
- `images/og-image.png` - Social Media Preview (1200x630px)
- `images/favicon-32x32.png` - Favicon (32x32px)
- `images/favicon-16x16.png` - Favicon (16x16px)
- `images/icon-192x192.png` - PWA Icon (192x192px)
- `images/icon-512x512.png` - PWA Icon (512x512px)

### 2. Rechtliche Texte
- `impressum.html` - Deine echten Kontaktdaten eintragen
- `datenschutz.html` - Ggf. anpassen
- `agb.html` - Ggf. von Anwalt prüfen lassen

### 3. App Store Links
In `index.html` die Download-Links anpassen:
```html
<a href="https://apps.apple.com/app/forevertold/id[DEINE_APP_ID]">
<a href="https://play.google.com/store/apps/details?id=app.forevertold">
```

### 4. Domain
In `sitemap.xml` und `robots.txt` die echte Domain eintragen.

## 🎨 Design System

Die Website verwendet die gleichen Farben wie die App:

| Variable | Farbe | Verwendung |
|----------|-------|------------|
| `--color-primary` | #E07A5F | Hauptfarbe (Terracotta) |
| `--color-background` | #F8F4EA | Hintergrund (Warm Cream) |
| `--color-text-primary` | #81614F | Textfarbe (Warm Brown) |

## 📱 Mobile-First

Die Styles sind Mobile-First aufgebaut:
- Basis-Styles für Mobile (< 640px)
- `@media (min-width: 640px)` für Tablet
- `@media (min-width: 1024px)` für Desktop

## 🔍 SEO Features

- ✅ Semantic HTML5 Struktur
- ✅ Meta Tags (Title, Description, Keywords)
- ✅ Open Graph Tags (Facebook, LinkedIn)
- ✅ Twitter Card Tags
- ✅ Structured Data (JSON-LD Schema.org)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Mobile-Friendly
- ✅ Accessibility (ARIA Labels, Skip Links)

## 🔧 Lokale Entwicklung

Einfach die `index.html` im Browser öffnen oder einen lokalen Server starten:

```bash
cd website
python3 -m http.server 8000
# oder
npx serve
```

Dann öffne http://localhost:8000

## 📄 Lizenz

© 2026 ForeverTold. Alle Rechte vorbehalten.

