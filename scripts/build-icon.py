"""Genera el favicon y los íconos de la marca a partir de los trazos del logo (logo-paths.ts):
la K en negro y la flecha en rosa, sobre blanco. Uso: python scripts/build-icon.py"""
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = (ROOT / 'frontend/src/app/components/logo/logo-paths.ts').read_text(encoding='utf-8')
OUT = ROOT / 'frontend/public/brand'
INK, PINK = (20, 16, 18), (254, 95, 146)


def path(key):
    return re.search(rf"\b{key}: '([^']+)'", SRC).group(1)


def subpaths(d, steps=16):
    """Convierte los comandos M/L/C/Z absolutos en polígonos."""
    tokens = re.findall(r'[MLCZ]|-?\d+\.?\d*', d)
    polys, cur, i, pos = [], [], 0, (0.0, 0.0)
    while i < len(tokens):
        t = tokens[i]
        i += 1
        if t == 'M':
            if cur:
                polys.append(cur)
            pos = (float(tokens[i]), float(tokens[i + 1]))
            i += 2
            cur = [pos]
        elif t == 'L':
            pos = (float(tokens[i]), float(tokens[i + 1]))
            i += 2
            cur.append(pos)
        elif t == 'C':
            p = [float(x) for x in tokens[i:i + 6]]
            i += 6
            x0, y0 = pos
            for s in range(1, steps + 1):
                u = s / steps
                a, b, c, e = (1 - u) ** 3, 3 * (1 - u) ** 2 * u, 3 * (1 - u) * u * u, u ** 3
                cur.append((a * x0 + b * p[0] + c * p[2] + e * p[4], a * y0 + b * p[1] + c * p[3] + e * p[5]))
            pos = (p[4], p[5])
        elif t == 'Z':
            if cur:
                polys.append(cur)
            cur = []
    if cur:
        polys.append(cur)
    return polys


def render(size, keys_colors, box, pad):
    """Dibuja con 4x de supermuestreo; los huecos (subtrazados internos) se restan con XOR."""
    S = size * 4
    x0, y0, x1, y1 = box
    scale = S * (1 - 2 * pad) / max(x1 - x0, y1 - y0)
    ox = (S - (x1 - x0) * scale) / 2 - x0 * scale
    oy = (S - (y1 - y0) * scale) / 2 - y0 * scale
    img = Image.new('RGB', (S, S), (255, 255, 255))
    for key, color in keys_colors:
        mask = Image.new('1', (S, S), 0)
        for poly in subpaths(path(key)):
            m = Image.new('1', (S, S), 0)
            ImageDraw.Draw(m).polygon([(x * scale + ox, y * scale + oy) for x, y in poly], fill=1)
            mask = ImageChops.logical_xor(mask, m)
        img.paste(Image.new('RGB', (S, S), color), mask=mask.convert('L'))
    return img.resize((size, size), Image.LANCZOS)


keys = [('k', INK), ('arrow', PINK)]
pts = [pt for k, _ in keys for poly in subpaths(path(k)) for pt in poly]
box = (min(p[0] for p in pts), min(p[1] for p in pts), max(p[0] for p in pts), max(p[1] for p in pts))
render(512, keys, box, 0.16).save(OUT / 'icon.png')
render(180, keys, box, 0.16).save(OUT / 'apple-touch-icon.png')
render(48, keys, box, 0.08).save(OUT / 'favicon-48.png')
render(32, keys, box, 0.06).save(OUT / 'favicon-32.png')

# Imagen para compartir (Open Graph, 1200 x 630): la misma K sobre blanco, centrada y con aire.
square = render(630, keys, box, 0.14)
share = Image.new('RGB', (1200, 630), (255, 255, 255))
share.paste(square, ((1200 - 630) // 2, 0))
share.save(OUT / 'share.png', optimize=True)

# Versión vectorial para los navegadores que aceptan SVG.
side = max(box[2] - box[0], box[3] - box[1]) * 1.16
cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
x, y = cx - side / 2, cy - side / 2
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.1f} {y:.1f} {side:.1f} {side:.1f}">'
    f'<rect x="{x:.1f}" y="{y:.1f}" width="{side:.1f}" height="{side:.1f}" rx="{side * 0.2:.1f}" fill="#fff"/>'
    f'<path fill="#141012" d="{path("k")}"/><path fill="#fe5f92" d="{path("arrow")}"/></svg>'
)
(OUT / 'icon.svg').write_text(svg, encoding='utf-8')
print('listo', [round(v) for v in box])
