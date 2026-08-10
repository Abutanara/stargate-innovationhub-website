#!/usr/bin/env python3
"""Visitenkarte Stargate Innovationhub / My Weddy — Flyeralarm 85x55mm 4/4.

Erzeugt die 2-seitige Druck-PDF im Datenformat 87x57mm (Endformat 85x55mm,
1mm Beschnitt umlaufend, Sicherheitszone 3mm), Farben in CMYK, Schriften
eingebettet, Logos als CMYK-JPEGs auf die Hintergrundfarbe komponiert.

Voraussetzungen:
    pip install reportlab pillow numpy pymupdf
    ./fetch_fonts.sh                  # laedt die Google-Fonts-Schnitte (OFL)

Quellen:
    Stargate-Logo:  ../../images/trancparent-logo.png (Icon wird freigestellt)
    My-Weddy-Logo:  $WEDDY_LOGO oder ../../../weddingpage/public/logo/My_Weddy_v2-5.png

Ausgabe (druckdaten/):
    visitenkarte-stargate-myweddy-85x55-4-4.pdf   # 2 Seiten, fuer den Upload
    visitenkarte-*-einzelseite-{1,2}.pdf          # falls je Seite verlangt
    vorschau-seite-{1,2}.png                      # 300dpi-Vorschau
"""

import os
import sys

import numpy as np
import segno
from PIL import Image
from reportlab.lib.colors import CMYKColor
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "druckdaten")
TMP = os.path.join(BASE, ".build")
os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

STARGATE_LOGO = os.path.join(BASE, "..", "..", "images", "trancparent-logo.png")
WEDDY_LOGO = os.environ.get(
    "WEDDY_LOGO",
    os.path.join(BASE, "..", "..", "..", "weddingpage", "public", "logo",
                 "My_Weddy_v2-5.png"))
if not os.path.exists(WEDDY_LOGO):
    sys.exit("My-Weddy-Logo nicht gefunden — WEDDY_LOGO setzen "
             f"(gesucht: {WEDDY_LOGO})")

PAGE_W, PAGE_H = 87 * mm, 57 * mm  # Datenformat (inkl. 1mm Beschnitt je Seite)

# ---------------------------------------------------------------- Farben (CMYK)
SG_BG = (0.66, 0.56, 0.44, 0.90)      # tiefes, kuehles Schwarz (Website #0A0A0F)
SG_BLUE = (0.58, 0.12, 0.00, 0.00)    # Brand-Blau (#62C9F3)
SG_GRAY = (0.09, 0.06, 0.05, 0.34)    # helles Grau auf Dunkel
WD_BG = (0.00, 0.013, 0.045, 0.00)    # Cream (#FDFBF7)
WD_INK = (0.0, 0.0, 0.0, 0.90)        # Charcoal, reines K
WD_SOFT = (0.0, 0.0, 0.0, 0.62)
WD_FAINT = (0.0, 0.0, 0.0, 0.44)
WD_RULE = (0.0, 0.0, 0.0, 0.28)
WHITE = (0.0, 0.0, 0.0, 0.0)


def col(c):
    return CMYKColor(*c)


# ---------------------------------------------------------------- Schriften
FONTS = {
    "Outfit-SemiBold": "Outfit-SemiBold.ttf",
    "Outfit-ExtraBold": "Outfit-ExtraBold.ttf",
    "Inter-Regular": "Inter-Regular.ttf",
    "Inter-Medium": "Inter-Medium.ttf",
    "Cormorant-MediumItalic": "CormorantGaramond-MediumItalic.ttf",
}
for name, fn in FONTS.items():
    path = os.path.join(BASE, "fonts", fn)
    if not os.path.exists(path):
        sys.exit(f"Schrift fehlt: {path} — erst ./fetch_fonts.sh ausfuehren")
    pdfmetrics.registerFont(TTFont(name, path))


# ------------------------------------------- Logos als CMYK-JPEG komponieren
def rgb_to_cmyk_arr(rgb):
    """Naive per-Pixel-Konvertierung RGB -> CMYK (float 0..1 Arrays)."""
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    k = 1.0 - np.maximum(np.maximum(r, g), b)
    denom = np.clip(1.0 - k, 1e-6, 1.0)
    c = (1.0 - r - k) / denom
    m = (1.0 - g - k) / denom
    y = (1.0 - b - k) / denom
    return np.stack([c, m, y, k], axis=-1)


def compose_cmyk_jpeg(im, bg_cmyk, target_w_mm, dpi, out_jpg):
    """RGBA-Bild auf CMYK-Hintergrund alphablenden, als CMYK-JPEG speichern."""
    target_px = int(round(target_w_mm / 25.4 * dpi))
    scale = target_px / im.width
    im = im.resize((target_px, int(round(im.height * scale))), Image.LANCZOS)
    arr = np.asarray(im).astype(np.float64) / 255.0
    fg = rgb_to_cmyk_arr(arr[..., :3])
    a = arr[..., 3:4]
    bg = np.array(bg_cmyk, dtype=np.float64).reshape(1, 1, 4)
    out = fg * a + bg * (1.0 - a)
    cmyk8 = np.clip(np.round(out * 255.0), 0, 255).astype(np.uint8)
    img = Image.fromarray(cmyk8, mode="CMYK")
    img.save(out_jpg, "JPEG", quality=97, dpi=(dpi, dpi))
    return img.size


def stargate_icon():
    """Icon (ohne Schriftzug) aus dem transparenten Stargate-Logo freistellen."""
    im = Image.open(STARGATE_LOGO).convert("RGBA")
    # Der Schriftzug beginnt bei y~1126 (2000px-Version); Icon liegt darueber.
    icon = im.crop((0, 0, im.width, int(im.height * 0.559)))
    return icon.crop(icon.getbbox())


DPI = 600
SG_ICON_W = 16.4  # mm
WD_MARK_W = 43.0  # mm
SG_ICON_JPG = os.path.join(TMP, "stargate-icon-cmyk.jpg")
WD_MARK_JPG = os.path.join(TMP, "weddy-mark-cmyk.jpg")
sg_icon_px = compose_cmyk_jpeg(stargate_icon(), SG_BG, SG_ICON_W, DPI,
                               SG_ICON_JPG)
wd_mark_px = compose_cmyk_jpeg(Image.open(WEDDY_LOGO).convert("RGBA"), WD_BG,
                               WD_MARK_W, DPI, WD_MARK_JPG)
SG_ICON_H = SG_ICON_W * sg_icon_px[1] / sg_icon_px[0]
WD_MARK_H = WD_MARK_W * wd_mark_px[1] / wd_mark_px[0]


# ---------------------------------------------------------------- Zeichnen
def top(y_mm):
    """y-Koordinate von oben in PDF-Punkte (PDF-Ursprung ist unten links)."""
    return PAGE_H - y_mm * mm


def text_w_mm(text, font, size, tracking=0.0):
    """Breite eines Textes inkl. Letterspacing in mm."""
    w = pdfmetrics.stringWidth(text, font, size) + tracking * max(len(text) - 1, 0)
    return w / mm


def tracked_text(c, x_mm, y_mm, text, font, size, color, tracking=0.0,
                 align="center"):
    """Text mit Letterspacing; x = Mittelpunkt (center) bzw. Kante."""
    c.setFillColor(col(color))
    w = pdfmetrics.stringWidth(text, font, size) + tracking * max(len(text) - 1, 0)
    if align == "center":
        x = x_mm * mm - w / 2
    elif align == "right":
        x = x_mm * mm - w
    else:
        x = x_mm * mm
    t = c.beginText(x, top(y_mm))
    t.setFont(font, size)
    t.setCharSpace(tracking)
    t.textOut(text)
    c.drawText(t)


def qr_matrix(url):
    return [list(row) for row in segno.make(url, error="m").matrix]


def draw_qr(c, matrix, x_mm, y_top_mm, size_mm, color):
    """QR als Vektor-Rechtecke; Module minimal ueberlappend (keine Haarspalten)."""
    n = len(matrix)
    mod = size_mm / n
    c.setFillColor(col(color))
    for ry, row in enumerate(matrix):
        for rx, v in enumerate(row):
            if v:
                c.rect((x_mm + rx * mod) * mm - 0.02,
                       top(y_top_mm + (ry + 1) * mod) - 0.02,
                       mod * mm + 0.04, mod * mm + 0.04, stroke=0, fill=1)


QR_STARGATE = qr_matrix("https://stargate-innovationhub.com")
QR_WEDDY = qr_matrix("https://my-weddy.com")


def front_contact(c, y0):
    """Kontaktblock der Stargate-Seite: links Name, rechts drei Zeilen,
    beginnend bei Basislinie y0 (mm von oben)."""
    tracked_text(c, 8, y0 + 3.0, "Florian Aboutara", "Outfit-SemiBold", 9,
                 WHITE, align="left")
    tracked_text(c, 8, y0 + 6.4, "Gründer & Inhaber", "Inter-Regular", 6,
                 SG_GRAY, align="left")

    tracked_text(c, 79, y0, "+49 155 67226511",
                 "Inter-Medium", 6.3, WHITE, align="right")
    tracked_text(c, 79, y0 + 3.2, "info@stargate-innovationhub.com",
                 "Inter-Medium", 6.3, WHITE, align="right")
    tracked_text(c, 79, y0 + 6.4, "stargate-innovationhub.com",
                 "Inter-Medium", 6.3, SG_BLUE, align="right")

    # Blaue Fusskante: 2.5mm ab Datenformat-Kante, bleibt bei ±1mm
    # Schneidetoleranz immer sichtbar und laeuft in den Beschnitt.
    c.setFillColor(col(SG_BLUE))
    c.rect(0, 0, PAGE_W, 2.5 * mm, stroke=0, fill=1)


def draw_front(c):
    """Seite 1 — Stargate Innovationhub (dunkel): Logo-Lockup und QR-Kachel
    als Gruppe mittig zentriert (QR rechts neben dem Logo)."""
    c.setFillColor(col(SG_BG))
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    lockup_w = max(SG_ICON_W,
                   text_w_mm("Stargate", "Outfit-ExtraBold", 17, 0.2),
                   text_w_mm("INNOVATION HUB", "Outfit-SemiBold", 6.6, 2.6))
    tile = 13.0
    gap = 9.0
    left = (87 - (lockup_w + gap + tile)) / 2
    lockup_cx = left + lockup_w / 2
    tile_x = left + lockup_w + gap

    c.drawImage(SG_ICON_JPG, (lockup_cx - SG_ICON_W / 2) * mm,
                top(9.2 + SG_ICON_H), SG_ICON_W * mm, SG_ICON_H * mm)
    tracked_text(c, lockup_cx, 30.6, "Stargate", "Outfit-ExtraBold", 17,
                 WHITE, tracking=0.2)
    tracked_text(c, lockup_cx, 35.4, "INNOVATION HUB", "Outfit-SemiBold", 6.6,
                 SG_BLUE, tracking=2.6)

    # QR-Kachel vertikal auf Lockup-Mitte (9.2..35.4 -> 22.3) zentriert;
    # weisse Kachel, damit der Code auf dunklem Fond zuverlaessig scannt.
    c.setFillColor(col(WHITE))
    c.roundRect(tile_x * mm, top(22.3 + tile / 2), tile * mm, tile * mm,
                1 * mm, stroke=0, fill=1)
    draw_qr(c, QR_STARGATE, tile_x + 1.5, 22.3 - 5.0, 10.0,
            (0.0, 0.0, 0.0, 1.0))

    front_contact(c, 43.6)

    # Blaue Fusskante: 2.5mm ab Datenformat-Kante, bleibt bei ±1mm
    # Schneidetoleranz immer sichtbar und laeuft in den Beschnitt.
    c.setFillColor(col(SG_BLUE))
    c.rect(0, 0, PAGE_W, 2.5 * mm, stroke=0, fill=1)


def draw_back(c):
    """Seite 2 — My Weddy (Editorial, warm): Wortmarke zentriert, Overline
    vor dem Claim, unten rechts kleiner QR neben der Webadresse."""
    c.setFillColor(col(WD_BG))
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    mark_w = 43.0
    mark_h = mark_w * wd_mark_px[1] / wd_mark_px[0]
    c.drawImage(WD_MARK_JPG, (87 - mark_w) / 2 * mm, top(13.8 + mark_h),
                mark_w * mm, mark_h * mm)

    tracked_text(c, 43.5, 30.2, "DEIN HOCHZEITSPLANER", "Inter-Medium", 6,
                 WD_SOFT, tracking=2.0)

    c.setStrokeColor(col(WD_RULE))
    c.setLineWidth(0.45)
    c.line((43.5 - 6) * mm, top(34.6), (43.5 + 6) * mm, top(34.6))

    tracked_text(c, 43.5, 41.6, "„Aus Planung wird Vorfreude.“",
                 "Cormorant-MediumItalic", 12, WD_INK, tracking=0.15)

    # Unteres Band: links Produkt-Zeile, rechts Webadresse mit kleinem QR
    # (-> my-weddy.com) in reinem K auf Cream, 3mm Ruhezone zum Text.
    qr = 8.5
    qr_x = 79 - qr
    qr_top = 48.25 - qr / 2
    draw_qr(c, QR_WEDDY, qr_x, qr_top, qr, (0.0, 0.0, 0.0, 0.92))
    tracked_text(c, qr_x - 3.0, 49.1, "my-weddy.com", "Inter-Medium", 6.8,
                 WD_SOFT, tracking=0.6, align="right")
    tracked_text(c, 8, 49.1, "Ein Produkt von Stargate Innovationhub",
                 "Inter-Regular", 4.8, WD_FAINT, tracking=0.2, align="left")


def set_page_boxes(c):
    """TrimBox = Endformat 85x55, zentriert im Datenformat."""
    c.setTrimBox((1 * mm, 1 * mm, 86 * mm, 56 * mm))
    c.setBleedBox((0, 0, PAGE_W, PAGE_H))


def make_pdf(path, pages):
    c = canvas.Canvas(path, pagesize=(PAGE_W, PAGE_H))
    c.setTitle("Visitenkarte Stargate Innovationhub / My Weddy — 85x55mm 4/4")
    c.setAuthor("Stargate Innovationhub")
    for draw in pages:
        set_page_boxes(c)
        draw(c)
        c.showPage()
    c.save()
    print("PDF:", path)


MAIN_PDF = os.path.join(OUT, "visitenkarte-stargate-myweddy-85x55-4-4.pdf")

make_pdf(MAIN_PDF, [draw_front, draw_back])
make_pdf(os.path.join(OUT, "visitenkarte-einzelseite-1-stargate.pdf"),
         [draw_front])
make_pdf(os.path.join(OUT, "visitenkarte-einzelseite-2-myweddy.pdf"),
         [draw_back])

# ---------------------------------------------------------------- Vorschau
import pymupdf  # noqa: E402

doc = pymupdf.open(MAIN_PDF)
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=300)
    png = os.path.join(OUT, f"vorschau-seite-{i + 1}.png")
    pix.save(png)
    print("Vorschau:", png)

# ------------------- QR-Verifikation (Ruecklesen aus der gebauten PDF)
try:
    import io  # noqa: E402

    import zxingcpp  # noqa: E402
except ImportError:
    sys.exit("zxing-cpp fehlt (pip install zxing-cpp) — "
             "QR-Codes konnten nicht verifiziert werden")

EXPECTED_QR = {1: "https://stargate-innovationhub.com",
               2: "https://my-weddy.com"}
for i, page in enumerate(doc, start=1):
    pix = page.get_pixmap(dpi=300)
    im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
    texts = [r.text for r in zxingcpp.read_barcodes(im)]
    if EXPECTED_QR[i] not in texts:
        sys.exit(f"QR auf Seite {i} nicht lesbar (gefunden: {texts})")
    print(f"QR Seite {i} verifiziert: {EXPECTED_QR[i]}")
