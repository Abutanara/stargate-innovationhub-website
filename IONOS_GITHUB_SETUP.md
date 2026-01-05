# IONOS & GitHub Setup-Anleitung für die neue Website

## Übersicht
Diese Anleitung erklärt, was Sie in IONOS und GitHub anpassen müssen, um die neue einheitliche Website-Struktur zu aktivieren.

---

## 📋 Schritt 1: GitHub Repository vorbereiten

### 1.1 CNAME-Datei erstellen
Erstellen Sie eine `CNAME`-Datei im Root-Verzeichnis mit der neuen Domain:

**Datei:** `/CNAME`
```
stargate-innovationhub.com
```

### 1.2 GitHub Pages aktivieren
1. Gehen Sie zu Ihrem GitHub Repository
2. Navigieren Sie zu **Settings** → **Pages**
3. Unter **Source** wählen Sie:
   - **Branch:** `main` (oder `master`)
   - **Folder:** `/ (root)`
4. Klicken Sie auf **Save**

### 1.3 Dateien committen und pushen
```bash
# Alle neuen Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Neue einheitliche Website-Struktur"

# Zu GitHub pushen
git push origin main
```

**Wichtig:** Nach dem Push kann es 5-10 Minuten dauern, bis GitHub Pages die Website bereitstellt.

---

## 🌐 Schritt 2: IONOS Domain-Konfiguration

### 2.1 Aktuelle Situation (aus Screenshot)
- **Domain:** Aktuell als "Zusatz-Domain" konfiguriert
- **Verwendungsart:** "Weiterleitung" zu `http://myquitly.stargate-innovationhub.com`
- **Status:** Aktiv

### 2.2 Was Sie in IONOS ändern müssen

#### Option A: GitHub Pages mit IONOS Domain (Empfohlen)

1. **Verwendungsart ändern:**
   - Gehen Sie zu **Details** → **Verwendungsart anpassen**
   - Ändern Sie von "Weiterleitung" zu **"Webhosting"** oder **"DNS"**

2. **Nameserver auf GitHub Pages umstellen:**
   - Gehen Sie zu **Nameserver**
   - Ändern Sie die Nameserver zu:
     ```
     ns1.github.com
     ns2.github.com
     ns3.github.com
     ns4.github.com
     ```
   - **ODER** verwenden Sie A-Records (wenn Nameserver nicht geändert werden können):
     ```
     A-Record: 185.199.108.153
     A-Record: 185.199.109.153
     A-Record: 185.199.110.153
     A-Record: 185.199.111.153
     ```

3. **CNAME-Record hinzufügen (falls A-Records verwendet werden):**
   - Erstellen Sie einen CNAME-Record:
     ```
     Name: @ (oder leer)
     Typ: CNAME
     Wert: [Ihr-GitHub-Username].github.io
     ```

#### Option B: Weiterleitung beibehalten (Alternative)

Wenn Sie die Domain-Weiterleitung in IONOS beibehalten möchten:

1. **Weiterleitung anpassen:**
   - Gehen Sie zu **Details** → **Weiterleitung anpassen**
   - Ändern Sie die Ziel-URL von:
     ```
     http://myquitly.stargate-innovationhub.com
     ```
   - Zu:
     ```
     https://stargate-innovationhub.com
     ```
   - **Wichtig:** Verwenden Sie `https://` (nicht `http://`)

2. **SSL-Zertifikat prüfen:**
   - Stellen Sie sicher, dass das SSL-Zertifikat aktiv ist (grünes Schloss-Symbol)

---

## 🔄 Schritt 3: Subdomain-Weiterleitungen einrichten

### 3.1 MyQuitly Subdomain (myquitly.stargate-innovationhub.com)

**In IONOS:**
1. Erstellen Sie eine neue Subdomain oder bearbeiten Sie die bestehende
2. Setzen Sie die Verwendungsart auf **"Weiterleitung"**
3. Ziel-URL: `https://stargate-innovationhub.com/products/myquitly/`
4. Typ: **301 (Permanent Redirect)**

**Alternative: GitHub Pages Redirect**
Wenn die Subdomain auch über GitHub Pages läuft, erstellen Sie eine `_redirects` Datei oder verwenden Sie JavaScript-Redirects.

### 3.2 ForeverTold Domain (forevertold.app)

**In IONOS:**
1. Gehen Sie zur Domain-Verwaltung für `forevertold.app`
2. Setzen Sie die Verwendungsart auf **"Weiterleitung"**
3. Ziel-URL: `https://stargate-innovationhub.com/products/forevertold/`
4. Typ: **301 (Permanent Redirect)**

---

## 📁 Schritt 4: GitHub Repository-Struktur

### 4.1 Erforderliche Dateien im Root

```
/
├── CNAME                          # Domain-Konfiguration
├── index.html                     # Hauptseite (DE)
├── en/
│   └── index.html                 # Hauptseite (EN)
├── products/
│   ├── index.html
│   ├── myquitly/
│   │   └── index.html
│   └── forevertold/
│       └── index.html
├── legal/
│   ├── imprint.html
│   ├── privacy.html
│   ├── terms.html
│   ├── cookies.html
│   └── disclaimer.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
├── robots.txt
└── sitemap.xml
```

### 4.2 .nojekyll Datei (falls nötig)

Wenn GitHub Pages Probleme mit Dateien hat, die mit `_` beginnen:
```
/.nojekyll
```
(Leere Datei erstellen)

---

## ✅ Schritt 5: Checkliste

### GitHub
- [ ] CNAME-Datei erstellt mit `stargate-innovationhub.com`
- [ ] Alle Dateien committed und gepusht
- [ ] GitHub Pages aktiviert (Settings → Pages)
- [ ] Website unter `https://[username].github.io` erreichbar
- [ ] Custom Domain funktioniert (kann bis zu 24h dauern)

### IONOS - Hauptdomain
- [ ] Verwendungsart von "Weiterleitung" zu "DNS/Webhosting" geändert
- [ ] Nameserver auf GitHub Pages umgestellt ODER A-Records konfiguriert
- [ ] SSL-Zertifikat aktiv und gültig
- [ ] Domain zeigt auf neue Website (nicht mehr auf alte Subdomain)

### IONOS - Subdomains/Weiterleitungen
- [ ] `myquitly.stargate-innovationhub.com` → `https://stargate-innovationhub.com/products/myquitly/` (301)
- [ ] `forevertold.app` → `https://stargate-innovationhub.com/products/forevertold/` (301)

### Testing
- [ ] Hauptdomain funktioniert: `https://stargate-innovationhub.com`
- [ ] Englische Version funktioniert: `https://stargate-innovationhub.com/en/`
- [ ] MyQuitly Seite funktioniert: `https://stargate-innovationhub.com/products/myquitly/`
- [ ] ForeverTold Seite funktioniert: `https://stargate-innovationhub.com/products/forevertold/`
- [ ] Weiterleitungen funktionieren (301 Redirects)
- [ ] SSL funktioniert (grünes Schloss)
- [ ] Mobile Ansicht funktioniert

---

## 🔧 Schritt 6: DNS-Propagierung

**Wichtig:** Nach Änderungen an Nameservern oder DNS-Einträgen kann es **24-48 Stunden** dauern, bis die Änderungen weltweit wirksam sind.

**DNS-Propagierung prüfen:**
- Verwenden Sie Tools wie:
  - https://dnschecker.org
  - https://www.whatsmydns.net
- Geben Sie Ihre Domain ein und prüfen Sie, ob die neuen Nameserver/IPs weltweit propagiert sind

---

## 🚨 Häufige Probleme & Lösungen

### Problem: Domain zeigt noch auf alte Website
**Lösung:**
- Warten Sie 24-48 Stunden auf DNS-Propagierung
- Leeren Sie Browser-Cache
- Prüfen Sie DNS-Einträge mit `dig stargate-innovationhub.com` oder `nslookup`

### Problem: SSL-Zertifikat-Fehler
**Lösung:**
- GitHub Pages stellt automatisch SSL-Zertifikate bereit (Let's Encrypt)
- Warten Sie nach DNS-Änderung bis zu 24 Stunden
- Prüfen Sie in GitHub Pages Settings, ob die Domain verifiziert ist

### Problem: Weiterleitungen funktionieren nicht
**Lösung:**
- Prüfen Sie in IONOS, ob die Weiterleitung auf "301 Permanent" gesetzt ist
- Verwenden Sie `https://` (nicht `http://`) in den Weiterleitungszielen
- Testen Sie mit: `curl -I https://myquitly.stargate-innovationhub.com`

### Problem: GitHub Pages zeigt 404
**Lösung:**
- Prüfen Sie, ob die CNAME-Datei korrekt ist
- Prüfen Sie, ob GitHub Pages aktiviert ist
- Prüfen Sie die Repository-Struktur (Dateien müssen im Root oder angegebenen Ordner sein)

---

## 📞 Support-Kontakte

**IONOS Support:**
- Telefon: 0800 2000 000 (kostenlos)
- E-Mail: support@ionos.de
- Live-Chat im IONOS Kundencenter

**GitHub Support:**
- https://docs.github.com/en/pages
- GitHub Community Forum

---

## 📝 Notizen

**Aktuelle GitHub Pages IPs (Stand 2024):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**GitHub Pages Nameserver:**
```
ns1.github.com
ns2.github.com
ns3.github.com
ns4.github.com
```

**Wichtige URLs:**
- Hauptdomain: `https://stargate-innovationhub.com`
- MyQuitly: `https://stargate-innovationhub.com/products/myquitly/`
- ForeverTold: `https://stargate-innovationhub.com/products/forevertold/`

