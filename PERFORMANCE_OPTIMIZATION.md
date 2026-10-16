# Performance-Optimierungen - Stargate Innovationhub Website

> **Status:** Implementiert am 16. Januar 2026
> **Ziel:** Lighthouse Performance Score von 68 → 90+

---

## ✅ Implementierte Optimierungen

### 1. **Google Fonts Optimierung**
- ✅ `preconnect` für fonts.googleapis.com und fonts.gstatic.com
- ✅ `dns-prefetch` als Fallback für ältere Browser
- ✅ `display=swap` bereits im Google Fonts URL enthalten
- ✅ Resource Hints für externe Domains (App Stores)

### 2. **Resource Hints & Preloading**
- ✅ Critical CSS preload: `/css/styles.css`
- ✅ Critical Images preload:
  - Hauptseite: `trancparent-logo.png` (Hero Logo)
  - SmokeLess: `SmokeLess_1024x1024.png`
  - ForeverTold: `ForeverTold-App-Icon-1024x1024.png`

### 3. **Image Loading Optimierung**
- ✅ **`fetchpriority="high"`** für Above-the-Fold Bilder:
  - Hero-Logo auf Hauptseite
  - Produkt-Icons auf Hero-Sektionen
- ✅ **`loading="lazy"`** für Below-the-Fold Bilder:
  - Produkt-Icons auf Startseite
  - Store-Badges (Apple/Google)
  - Footer-Logos
  - App-Screenshots
- ✅ **Width/Height Attribute** für alle Bilder (CLS Prevention)

### 4. **Dateigrößen-Übersicht (PNG → WebP Potenzial)**

| Datei | Größe | Verwendung | Priorität |
|-------|-------|------------|-----------|
| `SmokeLess_1024x1024.png` | ~200KB | Hero SmokeLess-Seite | **Hoch** |
| `ForeverTold-App-Icon-1024x1024.png` | ~180KB | Hero ForeverTold-Seite | **Hoch** |
| `Group 1_long.png` | ~1.2MB | App-Screenshots SmokeLess | **Sehr Hoch** |
| `Group 2_long.png` | ~1.1MB | App-Screenshots ForeverTold | **Sehr Hoch** |
| `smokeless-icon.png` | ~50KB | Produkt-Karten | Mittel |
| `forevertold-icon.png` | ~50KB | Produkt-Karten | Mittel |
| `trancparent-logo.png` | ~15KB | Logo/Navigation | Niedrig |
| `apple_logo3.png` | ~5KB | Store-Badges | Niedrig |
| `google_logo.png` | ~4KB | Store-Badges | Niedrig |

**Geschätzte Einsparung mit WebP:** ~2,6 MB → ~600-800 KB (70-75% Reduktion)

---

## 🔄 Nächste Schritte: WebP-Konvertierung

### Warum WebP?
- **70-80% kleinere Dateigröße** bei gleicher Qualität
- Unterstützt von allen modernen Browsern (95%+ Marktanteil)
- PNG-Fallback für alte Browser über `<picture>`-Element

### Konvertierungs-Anleitung

#### Option 1: Online-Tools (Einfach)
1. Gehe zu https://squoosh.app
2. Ziehe Bilder rein
3. Wähle WebP Format, Qualität 85-90
4. Lade konvertierte Dateien herunter
5. Speichere sie ZUSÄTZLICH zu den PNG-Dateien im `/images/` Ordner

#### Option 2: Command Line (Schnell für viele Dateien)

**Installation (macOS mit Homebrew):**
```bash
brew install webp
```

**Konvertierung aller PNG zu WebP:**
```bash
cd /Users/florianaboutara/Developer/stargate-innovationhub-website/images

# Einzelne Datei
cwebp -q 85 smokeless-icon.png -o smokeless-icon.webp

# Alle PNGs auf einmal
for file in *.png; do
    cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

**Qualitäts-Einstellungen:**
- `-q 85`: Gute Balance (empfohlen)
- `-q 90`: Höhere Qualität, größere Datei
- `-q 80`: Kleinere Datei, leicht sichtbare Kompression

### Ergebnis nach Konvertierung:
Nach der Konvertierung solltest du folgende Dateien haben:

```
/images/
├── smokeless-icon.png          (Original - BEHALTEN!)
├── smokeless-icon.webp         (Neu - Optimiert)
├── forevertold-icon.png        (Original - BEHALTEN!)
├── forevertold-icon.webp       (Neu - Optimiert)
├── SmokeLess_1024x1024.png     (Original - BEHALTEN!)
├── SmokeLess_1024x1024.webp    (Neu - Optimiert)
└── ... (alle anderen Bilder)
```

---

## 📝 Nach WebP-Konvertierung: HTML anpassen

Nachdem die WebP-Dateien erstellt wurden, müssen wir die `<img>`-Tags durch `<picture>`-Elemente ersetzen.

### Beispiel-Transformation:

**Vorher:**
```html
<img src="/images/smokeless-icon.png" alt="SmokeLess App Icon" 
     class="product-card__icon" loading="lazy" width="150" height="150">
```

**Nachher:**
```html
<picture>
    <source srcset="/images/smokeless-icon.webp" type="image/webp">
    <img src="/images/smokeless-icon.png" alt="SmokeLess App Icon" 
         class="product-card__icon" loading="lazy" width="150" height="150">
</picture>
```

### Automatisierung für alle Bilder:
Sobald die WebP-Dateien vorhanden sind, können wir systematisch alle HTML-Dateien aktualisieren:

1. **Hauptseite** (`/index.html`)
2. **Produktübersicht** (`/products/index.html`)
3. **SmokeLess** (`/products/smokeless/index.html`)
4. **ForeverTold** (`/products/forevertold/index.html`)
5. **EN-Versionen** (alle `/en/` Dateien)

**Wichtig:** PNG-Dateien bleiben als Fallback für:
- Alte Browser (< 2020)
- Browser mit deaktiviertem WebP
- SEO-Crawlers die nur PNG verstehen

---

## ⚡ Render-Blocking CSS Optimierung

### Critical CSS Inline (Optional)
Um das größte Performance-Problem zu lösen (Render-Blocking CSS), können wir kritisches CSS inline im `<head>` einbetten.

**Was ist kritisches CSS?**
- CSS für Above-the-Fold Content (sichtbar ohne Scrollen)
- Variablen (`:root`)
- Navigation Styles
- Hero Section Styles
- Typografie Basis

**Umsetzung:**
```html
<head>
    <!-- Kritisches CSS inline -->
    <style>
        :root { /* CSS-Variablen */ }
        .header { /* Navigation Styles */ }
        .hero { /* Hero Section */ }
        /* ... nur Above-the-Fold Styles */
    </style>
    
    <!-- Rest des CSS asynchron laden -->
    <link rel="preload" href="/css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/styles.css"></noscript>
</head>
```

**Nachteil:**
- Erhöht HTML-Größe
- Erschwert Wartung (CSS an 2 Stellen)
- Nur sinnvoll für **sehr** kritische Performance-Optimierung

**Empfehlung:**
- Erst WebP umsetzen und Ergebnisse messen
- Critical CSS nur wenn Performance-Score noch < 85 ist

---

## 🗂️ Cache-Headers Empfehlungen

### Für IONOS/GitHub Pages Hosting

GitHub Pages setzt bereits gute Cache-Header, aber für eigenes Hosting:

**`.htaccess` (falls Apache Server):**
```apache
# Browser Cache - 1 Jahr für Bilder
<FilesMatch "\.(webp|png|jpg|jpeg|gif|svg|ico)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Browser Cache - 1 Woche für CSS/JS
<FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=604800, public"
</FilesMatch>

# Browser Cache - 1 Stunde für HTML
<FilesMatch "\.(html)$">
    Header set Cache-Control "max-age=3600, public, must-revalidate"
</FilesMatch>
```

**`_headers` (für Netlify/Cloudflare Pages):**
```
/images/*
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=604800

/js/*
  Cache-Control: public, max-age=604800

/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

**GitHub Pages:** Nutzt automatisch CDN-Caching, keine weitere Konfiguration nötig!

---

## 📊 Erwartete Performance-Verbesserungen

### Vor Optimierung (Lighthouse Mobile):
| Seite | Performance | LCP | FCP |
|-------|-------------|-----|-----|
| Hauptseite | 68 | 15.5s | 2.9s |
| /products/ | 74 | 15.5s | 1.7s |
| SmokeLess | 53 | 21.9s | 3.3s |
| ForeverTold | 70 | 11.5s | 2.9s |

### Nach Optimierung (Geschätzt):
| Seite | Performance | LCP | FCP |
|-------|-------------|-----|-----|
| Hauptseite | 85-90 | 2.5s | 1.2s |
| /products/ | 90-93 | 2.0s | 1.0s |
| SmokeLess | 85-90 | 2.5s | 1.3s |
| ForeverTold | 88-92 | 2.2s | 1.2s |

**Verbesserungen durch:**
1. ✅ Resource Hints: ~200ms FCP-Verbesserung
2. ✅ Lazy Loading: ~300ms LCP-Verbesserung (weniger konkurrierende Requests)
3. 🔄 WebP: ~1-2s LCP-Verbesserung (70% kleinere Bilder)
4. 🔄 Width/Height: CLS von 0.3 → <0.1

---

## 🎯 Nächste konkrete Schritte

1. **WebP-Konvertierung durchführen** (Priorität: Hoch)
   - `Group 1_long.png` → `Group 1_long.webp`
   - `Group 2_long.png` → `Group 2_long.webp`
   - Alle anderen PNG-Dateien

2. **HTML mit `<picture>`-Elementen aktualisieren**
   - Alle DE-Seiten
   - Alle EN-Seiten (Sync mit DE)

3. **Lighthouse erneut testen**
   - Mobile: Sollte 85+ erreichen
   - Desktop: Sollte 95+ erreichen

4. **Optional: Critical CSS** (nur wenn Score < 85)

---

## 📞 Support & Fragen

Bei Fragen zur Umsetzung:
- Dokumentation lesen: `IONOS_GITHUB_SETUP.md`
- Projekt-Regeln: `.cursorrules`
- Performance-Tools: https://pagespeed.web.dev/

**Wichtig:** Alle Änderungen sollten committed werden NACH jedem größeren Schritt!

```bash
git add .
git commit -m "perf: WebP-Bilder hinzugefügt und Picture-Elemente implementiert"
git push origin main
```

---

**Stand:** 16. Januar 2026
**Autor:** Performance-Optimierung Batch 1
**Nächstes Review:** Nach WebP-Implementation
