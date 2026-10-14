"""Vectoriza el logo de Logik (PNG del sitio actual) en un SVG con una ruta por letra.

Cada letra y la flecha quedan como <path> separados con id, para poder animarlos uno por uno
(la animación de entrada del sitio dibuja el logo pieza por pieza). Se corre desde la raíz:
    python scripts/trace-logo.py
Necesita Pillow, numpy, scipy y potracer.
"""

from pathlib import Path

import numpy as np
import potrace
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "referencias/sitio/inicio/1cd776_6521503937f846849b8b885a8c8ebb30.png"
OUT = ROOT / "frontend/src/app/components/logo/logo-paths.ts"
SCALE = 3  # se traza a 3× para curvas más suaves

im = Image.open(SRC).convert("RGBA")
im = im.crop(im.getchannel("A").getbbox())
im = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
rgba = np.asarray(im).astype(int)
r, g, b, a = (rgba[..., i] for i in range(4))
solid = a > 128
pink = solid & (r > 180) & (r - g > 60)
dark = solid & ~pink


def pt(p) -> tuple[float, float]:
    """Punto de potracer (objeto con .x/.y) a tupla en la escala original del logo."""
    return p.x / SCALE, p.y / SCALE


def trace(mask: np.ndarray) -> str:
    """Contorno de una máscara como datos de ruta SVG en la escala original del logo."""
    # potracer toma como figura los valores falsos: se invierte la máscara.
    path = potrace.Bitmap(~mask).trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=0.2)
    parts = []
    for curve in path:
        parts.append("M%.2f %.2f" % pt(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                parts.append("L%.2f %.2fL%.2f %.2f" % (*pt(seg.c), *pt(seg.end_point)))
            else:
                parts.append("C%.2f %.2f %.2f %.2f %.2f %.2f" % (*pt(seg.c1), *pt(seg.c2), *pt(seg.end_point)))
        parts.append("Z")
    return "".join(parts)


# Renglón superior (LOGIK) y renglón inferior (MARKETING): se separan por la franja vacía entre ellos.
rows = np.where(dark.any(axis=1) | pink.any(axis=1))[0]
gap_rows = np.where(np.diff(rows) > 5)[0]
split = rows[gap_rows[0]] + 3 if len(gap_rows) else dark.shape[0]

top = dark.copy()
top[split:] = False
bottom = dark.copy()
bottom[:split] = False


def letters(mask: np.ndarray, expected: int) -> list[np.ndarray]:
    """Separa letras por columnas vacías (la G y la O tienen huecos, así que no sirve 'componentes')."""
    cols = mask.any(axis=0)
    spans, start = [], None
    for x, filled in enumerate(cols):
        if filled and start is None:
            start = x
        elif not filled and start is not None:
            spans.append((start, x))
            start = None
    if start is not None:
        spans.append((start, len(cols)))
    if len(spans) != expected:
        raise SystemExit(f"Se esperaban {expected} letras y salieron {len(spans)}")
    out = []
    for x0, x1 in spans:
        m = np.zeros_like(mask)
        m[:, x0:x1] = mask[:, x0:x1]
        out.append(m)
    return out


big = dict(zip(["l", "o", "g", "i", "k"], letters(top, 5)))
small = dict(zip(["m", "a", "r", "k2", "e", "t", "i2", "n", "g2"], letters(bottom, 9)))
paths = {key: trace(mask) for key, mask in {**big, **small}.items()}
paths["arrow"] = trace(pink)

w, h = im.width / SCALE, im.height / SCALE
lines = [
    "// Generado por scripts/trace-logo.py a partir del logo del sitio actual. No lo edites a mano.",
    f"export const LOGO_VIEWBOX = '0 0 {w:.0f} {h:.0f}';",
    f"/** Altura de la línea que separa LOGIK de MARKETING, en unidades del viewBox. */",
    f"export const LOGO_SPLIT = {split / SCALE:.1f};",
    "export const LOGO_PATHS = {",
]
for key, d in paths.items():
    lines.append(f"  {key}: '{d}',")
lines.append("} as const;")
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"{OUT.relative_to(ROOT)}: viewBox {w:.0f}×{h:.0f}, {len(paths)} rutas, {sum(len(v) for v in paths.values()) // 1024} KB")
