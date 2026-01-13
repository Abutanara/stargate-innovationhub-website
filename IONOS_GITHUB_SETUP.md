# IONOS & GitHub Setup (Custom Domain + neue Struktur)

## Überblick (was wir erreichen)
Du hast jetzt **eine gemeinsame Website-Struktur** im Repo (Root = DE, `/en/` = EN, `/products/…` usw.). Ziel ist:
- **Hauptdomain**: `stargate-innovationhub.com` zeigt auf GitHub Pages (neue Website).
- **Optional**: `www.stargate-innovationhub.com` zeigt auch auf die Website (oder leitet auf die Hauptdomain um).
- **Alte Domains/Subdomains** (z.B. `myquitly.stargate-innovationhub.com` → jetzt `smokeless`, `forevertold.app`) sollen per **301** auf die neuen URLs weiterleiten.

Wichtig: Für GitHub Pages mit Custom Domain musst du bei IONOS **DNS-Records setzen** (A/AAAA/CNAME). **Nameserver zu GitHub ändern ist normalerweise nicht nötig**.

---

## Voraussetzungen (bitte einmal klären)
- **Apex-Domain**: `stargate-innovationhub.com` (ja)
- **www**: willst du `www.stargate-innovationhub.com` nutzen?
  - Empfehlung: **ja** (und dann entweder auch auf GitHub Pages zeigen lassen oder als 301 auf Apex umleiten).
- **GitHub Pages Typ**:
  - **User/Org Site**: Repo heißt meist `<username>.github.io`
  - **Project Site**: Repo heißt beliebig, Pages URL ist trotzdem `https://<username>.github.io/<repo>/`

Falls du unsicher bist: In GitHub → **Settings → Pages** steht die **Pages URL**. Die brauchen wir gleich für den `www`-CNAME.

---

## Schritt 1: Repo-Dateien (was im Repo vorhanden sein muss)

### 1.1 `CNAME` (Custom Domain Datei)
Die Datei existiert bereits und muss im Root liegen:

**Datei:** `/CNAME`
```
stargate-innovationhub.com
```

### 1.2 Kein `.nojekyll` im Root (bewusst)
Wir erstellen **absichtlich kein** `.nojekyll` im Root, weil GitHub/Jekyll sonst auch den Ordner `_original/` ausliefern würde (Archiv, groß, soll nicht öffentlich sein).

---

## Schritt 2: GitHub Pages richtig einstellen (klick-genau)

### 2.1 Deploy aus dem richtigen Ordner aktivieren
1. Öffne dein GitHub Repository
2. Gehe zu **Settings → Pages**
3. Unter **Build and deployment**:
   - **Source**: „Deploy from a branch“
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Speichern

### 2.2 Custom Domain in GitHub hinterlegen
1. In **Settings → Pages**
2. Bereich **Custom domain**
3. Trage ein: `stargate-innovationhub.com`
4. Speichern

GitHub prüft danach DNS. Das kann einige Minuten dauern.

### 2.3 HTTPS erzwingen
1. In **Settings → Pages**
2. Checkbox **Enforce HTTPS** aktivieren
   - Wenn die Checkbox erst später aktiv wird: DNS muss erst korrekt sein, dann stellt GitHub das Zertifikat aus (kann bis zu ~24h dauern).

---

## Schritt 3: IONOS – Hauptdomain von „Weiterleitung“ auf „DNS“ umstellen

Du hast aktuell (laut Screenshot) die **Hauptdomain** als **Weiterleitung** auf eine alte Subdomain gesetzt. Das muss weg, sonst zeigt die Hauptdomain nie auf GitHub Pages.

### 3.1 Weiterleitung entfernen / Verwendungsart auf DNS stellen
In IONOS:
1. Domain auswählen: `stargate-innovationhub.com`
2. Tab/Abschnitt **Details**
3. Bei **Verwendungsart**: **nicht** „Weiterleitung“, sondern **DNS** (oder „Domain nur verwalten“ / „DNS verwenden“ – je nach IONOS UI)
4. Speichern

---

## Schritt 4: IONOS – DNS Records für GitHub Pages setzen (wichtigster Teil)

### 4.1 A-Records für Apex setzen (`stargate-innovationhub.com`)
In IONOS → **DNS** (oder „DNS Einstellungen“ / „Resource Records“):

Erstelle/ersetze folgende **A-Records** für den Host `@` (manchmal heißt das Feld „Host“ oder „Name“):
- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

Hinweise:
- Manche UIs erlauben **4 A-Records** für denselben Host, manche wollen sie in einer Liste.
- Falls schon A-Records existieren: **alte entfernen/ersetzen**, damit nur die GitHub-IP(s) aktiv sind.

### 4.2 (Optional, empfohlen) AAAA-Records für IPv6 setzen
Wenn IONOS AAAA erlaubt, setze zusätzlich für `@`:
- `@` → `2606:50c0:8000::153`
- `@` → `2606:50c0:8001::153`
- `@` → `2606:50c0:8002::153`
- `@` → `2606:50c0:8003::153`

### 4.3 CNAME für `www` setzen
Wenn du `www.stargate-innovationhub.com` nutzen willst:

- **Host/Name**: `www`
- **Typ**: `CNAME`
- **Wert/Ziel**: deine GitHub Pages Ziel-Domain

Typischer Wert ist:
- **User/Org Site**: `<username>.github.io`
- **Project Site**: ebenfalls `<username>.github.io` (GitHub routet intern korrekt)

Beispiel (Platzhalter):
```
www  CNAME  deinusername.github.io
```

### 4.4 Wichtiger Hinweis: Kein CNAME für Apex
Setze **keinen** CNAME für `@` (Apex). Bei DNS ist für die Hauptdomain üblich: **A/AAAA** (oder ALIAS/ANAME, falls Provider das unterstützt).

---

## Schritt 5: Subdomains/alte Domains per 301 weiterleiten (IONOS)

### 5.1 `myquitly.stargate-innovationhub.com` → neue SmokeLess-Seite
In IONOS:
1. Subdomain auswählen (oder anlegen): `myquitly`
2. Verwendungsart: **Weiterleitung**
3. Ziel: `https://stargate-innovationhub.com/products/smokeless/`
4. Typ: **301 permanent**
5. Speichern

Wichtig (häufigster Fehler):
- Eine IONOS-Weiterleitung funktioniert **nur**, wenn `myquitly` DNS-seitig **nicht** auf GitHub Pages zeigt.
- Prüfe in IONOS → **DNS**, dass es **keinen** `CNAME myquitly ...` und **keine** `A/AAAA myquitly ...` Records gibt, die auf GitHub (oder sonst wohin) zeigen.
- Wenn so ein Record existiert, landet der Traffic bei GitHub und **IONOS kann nicht weiterleiten** → dann wirkt die Weiterleitung “scheinbar nicht”.

Schnelltest (Terminal):
```bash
dig +short myquitly.stargate-innovationhub.com A
dig +short myquitly.stargate-innovationhub.com AAAA
curl -I https://myquitly.stargate-innovationhub.com
```
Erwartung:
- Bei `curl -I` muss ein `301` kommen und ein `Location: https://stargate-innovationhub.com/products/smokeless/`

### 5.2 `forevertold.app` → neue ForeverTold-Seite
Analog:
- Ziel: `https://stargate-innovationhub.com/products/forevertold/`
- Typ: **301 permanent**

Optional (zusätzlich sauber):
- `www.forevertold.app` ebenfalls per 301 auf die neue Seite.

---

## Schritt 6: Tests (damit du sicher bist, dass alles korrekt ist)

### 6.1 DNS prüfen (Terminal)
```bash
dig +short stargate-innovationhub.com A
dig +short stargate-innovationhub.com AAAA
dig +short www.stargate-innovationhub.com CNAME
```

Erwartung:
- A zeigt die `185.199.108.153` … `185.199.111.153`
- CNAME von `www` zeigt auf `<username>.github.io` (oder was du gesetzt hast)

### 6.2 Redirects prüfen (Terminal)
```bash
curl -I https://myquitly.stargate-innovationhub.com
curl -I https://forevertold.app
```

Erwartung:
- HTTP Status `301` und `Location: https://stargate-innovationhub.com/products/.../`

### 6.3 Browser prüfen
- `https://stargate-innovationhub.com/`
- `https://stargate-innovationhub.com/en/`
- `https://stargate-innovationhub.com/products/`
- `https://stargate-innovationhub.com/products/smokeless/`
- `https://stargate-innovationhub.com/products/forevertold/`

---

## Checkliste (kurz & praktisch)

### GitHub
- [ ] Pages aktiviert: `main` + `/ (root)`
- [ ] Custom domain eingetragen: `stargate-innovationhub.com`
- [ ] „Enforce HTTPS“ aktiv

### IONOS (Hauptdomain)
- [ ] Verwendungsart **nicht** „Weiterleitung“
- [ ] `@` hat 4× A-Records (GitHub IPs)
- [ ] (optional) `@` hat 4× AAAA-Records
- [ ] (optional) `www` CNAME → `<username>.github.io`

### IONOS (Redirects)
- [ ] `myquitly.stargate-innovationhub.com` 301 → `/products/smokeless/`
- [ ] `forevertold.app` 301 → `/products/forevertold/`

---

## Hilfreiche Links (Dokumentation)
- GitHub Pages Doku: `https://docs.github.com/en/pages`
- DNS Propagation Check (Tools): `https://dnschecker.org` und `https://www.whatsmydns.net`

