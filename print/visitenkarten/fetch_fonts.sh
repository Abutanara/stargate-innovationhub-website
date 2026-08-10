#!/usr/bin/env bash
# Laedt die benoetigten Schriftschnitte (SIL Open Font License) von Google Fonts.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p fonts

declare -A URLS=(
  ["Outfit-SemiBold.ttf"]="https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4E.ttf"
  ["Outfit-ExtraBold.ttf"]="https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyC4E.ttf"
  ["Inter-Regular.ttf"]="https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf"
  ["Inter-Medium.ttf"]="https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf"
  ["CormorantGaramond-MediumItalic.ttf"]="https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5wDDOjw.ttf"
)

for f in "${!URLS[@]}"; do
  if [ ! -f "fonts/$f" ]; then
    echo "lade $f"
    curl -sS -o "fonts/$f" "${URLS[$f]}"
  fi
done
echo "Schriften vollstaendig."
