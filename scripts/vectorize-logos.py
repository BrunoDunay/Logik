"""Vectoriza los logos de clientes que se veían borrosos o mordidos (el PNG original del sitio viene suavizado).
Recorta cada logo de su pieza original a resolución completa, lo amplía, lo traza con potrace y lo guarda
como SVG blanco en frontend/public/media/v2/logos/logo-NN-j.svg. Uso: python scripts/vectorize-logos.py"""
from pathlib import Path

import numpy as np
import potrace
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
HOME = ROOT / 'referencias/sitio/inicio'
OUT = ROOT / 'frontend/public/media/v2/logos'
SCALE = 5
# (pieza, parte) como en build-media-v2.py: Alisson Tours, Tu Contfiable, CEECA y California Frutería.
# EIC se quitó: su texto pequeño no tiene detalle suficiente para vectorizarse bien.
TARGETS = [(10, 1), (16, 1), (21, 1), (22, 0)]


def tiles() -> list[Path]:
    return [f for f in sorted(HOME.glob('*.png')) if f.name[7:15] not in {'0986f2bd', '65215039', '69e2b67e'}]


def groups(alpha: np.ndarray) -> list[tuple[int, int]]:
    """Franjas horizontales con contenido, unidas si están a menos de 60 px (igual que build-media-v2.py)."""
    rows = alpha.any(axis=1)
    spans, start = [], None
    for y, filled in enumerate(rows):
        if filled and start is None:
            start = y
        elif not filled and start is not None:
            spans.append((start, y))
            start = None
    if start is not None:
        spans.append((start, len(rows)))
    merged: list[list[int]] = []
    for a, b in spans:
        if merged and a - merged[-1][1] < 60:
            merged[-1][1] = b
        else:
            merged.append([a, b])
    return [(a, b) for a, b in merged if b - a > 40]


def trace(mask: np.ndarray) -> str:
    path = potrace.Bitmap(~mask).trace(turdsize=6, alphamax=1.0, opticurve=True, opttolerance=0.2)
    pt = lambda p: (p.x / SCALE, p.y / SCALE)
    parts = []
    for curve in path:
        parts.append('M%.1f %.1f' % pt(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                parts.append('L%.1f %.1fL%.1f %.1f' % (*pt(seg.c), *pt(seg.end_point)))
            else:
                parts.append('C%.1f %.1f %.1f %.1f %.1f %.1f' % (*pt(seg.c1), *pt(seg.c2), *pt(seg.end_point)))
        parts.append('Z')
    return ''.join(parts)


files = tiles()
for tile, part in TARGETS:
    im = Image.open(files[tile - 1]).convert('RGBA')
    alpha = np.asarray(im.getchannel('A')) > 40
    a, b = groups(alpha)[part]
    crop = im.crop((0, a, im.width, b))
    crop = crop.crop(crop.getchannel('A').getbbox())
    w, h = crop.size
    # Ampliar y suavizar un poco antes de umbralizar da bordes limpios sin perder las letras pequeñas.
    big = crop.getchannel('A').resize((w * SCALE, h * SCALE), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.8))
    mask = np.asarray(big) > 128
    d = trace(mask)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="#fff" fill-rule="evenodd" d="{d}"/></svg>'
    out = OUT / f'logo-{tile:02d}-{part}.svg'
    out.write_text(svg, encoding='utf-8')
    print(out.name, f'{w}x{h}', f'{len(svg) // 1024} KB')
