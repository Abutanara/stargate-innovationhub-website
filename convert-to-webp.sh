#!/bin/bash

# WebP Konvertierungs-Script für Stargate Innovationhub Website
# Dieses Script konvertiert alle PNG-Dateien im /images/ Ordner zu WebP
# Die Original-PNG-Dateien bleiben erhalten!

# Farben für Terminal-Output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  WebP Konvertierung - Stargate Images${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Prüfe ob cwebp installiert ist
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  'cwebp' ist nicht installiert!${NC}"
    echo ""
    echo "Installation:"
    echo "  macOS:    brew install webp"
    echo "  Linux:    sudo apt-get install webp"
    echo "  Windows:  Download from https://developers.google.com/speed/webp/download"
    echo ""
    exit 1
fi

# Wechsle ins images Verzeichnis
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/images" || exit 1

echo -e "${GREEN}✓${NC} Gefunden: $(pwd)"
echo ""

# Zähle PNG-Dateien
PNG_COUNT=$(ls -1 *.png 2>/dev/null | wc -l)

if [ "$PNG_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Keine PNG-Dateien gefunden!${NC}"
    exit 0
fi

echo -e "📷 Gefunden: ${GREEN}$PNG_COUNT${NC} PNG-Dateien"
echo ""

# Qualitäts-Einstellung (kann angepasst werden)
QUALITY=85

echo -e "Konvertierungs-Einstellungen:"
echo -e "  Qualität: ${GREEN}$QUALITY${NC} (85 = empfohlen, 90 = höhere Qualität, 80 = kleinere Datei)"
echo ""

# Frage User ob fortfahren
read -p "Fortfahren? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Abgebrochen.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}Starte Konvertierung...${NC}"
echo ""

# Konvertiere jede PNG-Datei
CONVERTED=0
SKIPPED=0
ERRORS=0

for file in *.png; do
    # Überspringe wenn Datei nicht existiert (Glob-Fehler)
    [ -e "$file" ] || continue
    
    WEBP_FILE="${file%.png}.webp"
    
    # Überspringe wenn WebP bereits existiert
    if [ -f "$WEBP_FILE" ]; then
        echo -e "⏭️  ${YELLOW}Übersprungen:${NC} $file (WebP existiert bereits)"
        ((SKIPPED++))
        continue
    fi
    
    # Zeige Original-Größe
    ORIGINAL_SIZE=$(du -h "$file" | cut -f1)
    
    echo -n "🔄 Konvertiere: $file ($ORIGINAL_SIZE) ... "
    
    # Konvertiere zu WebP
    if cwebp -q $QUALITY "$file" -o "$WEBP_FILE" -quiet 2>/dev/null; then
        WEBP_SIZE=$(du -h "$WEBP_FILE" | cut -f1)
        
        # Berechne Prozent-Einsparung
        ORIGINAL_BYTES=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        WEBP_BYTES=$(stat -f%z "$WEBP_FILE" 2>/dev/null || stat -c%s "$WEBP_FILE" 2>/dev/null)
        SAVINGS=$((100 - (WEBP_BYTES * 100 / ORIGINAL_BYTES)))
        
        echo -e "${GREEN}✓${NC} $WEBP_SIZE (${GREEN}-${SAVINGS}%${NC})"
        ((CONVERTED++))
    else
        echo -e "${YELLOW}✗ Fehler${NC}"
        ((ERRORS++))
    fi
done

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Konvertierung abgeschlossen${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "Statistik:"
echo -e "  ✓ Konvertiert: ${GREEN}$CONVERTED${NC}"
echo -e "  ⏭️  Übersprungen: ${YELLOW}$SKIPPED${NC}"
if [ "$ERRORS" -gt 0 ]; then
    echo -e "  ✗ Fehler:      ${YELLOW}$ERRORS${NC}"
fi
echo ""

if [ "$CONVERTED" -gt 0 ]; then
    echo -e "${GREEN}Nächste Schritte:${NC}"
    echo "1. Überprüfe die WebP-Dateien im /images/ Ordner"
    echo "2. Aktualisiere HTML-Dateien mit <picture>-Elementen"
    echo "3. Teste die Website lokal"
    echo "4. Committe die Änderungen: git add images/*.webp"
    echo ""
    echo "Dokumentation: PERFORMANCE_OPTIMIZATION.md"
fi

echo ""
echo -e "${GREEN}✓${NC} Fertig!"
