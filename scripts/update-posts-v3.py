"""Ajustes de la sesión 5 al material del rediseño (complementa build-media-v2.py, no lo reemplaza):
- agrega 14 publicaciones propias de Logik (las más llamativas) después de la 015, que sigue primero;
- quita las publicaciones de marcas sin logo identificado y cambia "Moira" por Novedades y Cosméticos;
- separa los dos archivos de logos que traían dos marcas juntas.
Uso: python scripts/update-posts-v3.py"""
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / 'referencias/redes/instagram'
MEDIA = ROOT / 'frontend/public/media/v2'
DATA = ROOT / 'backend/seeders/data/posts.json'

NEW_OWN = ['002', '008', '009', '010', '011', '012', '016', '026', '037', '044', '046', '055', '067', '091']
DROP = {'Comida a domicilio', 'Pizzería', 'Agencia de viajes', 'Velo Bye'}
RENAME = {'Moira': 'Novedades y Cosméticos'}


def cover(im, ratio):
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio)
        return im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = int(w / ratio)
    return im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))


raw = (REF / 'publicaciones.json').read_text(encoding='utf-8-sig').strip()
meta = json.loads(json.loads(raw) if raw.startswith('"') else raw)
posts = json.loads(DATA.read_text(encoding='utf-8'))

posts = [p for p in posts if p['account'] not in DROP]
for p in posts:
    if p['account'] in RENAME:
        p['account'] = RENAME[p['account']]
        p['caption'] = f"Diseño de Logik Marketing para {p['account']}."

have = {p['image'] for p in posts}
own = [p for p in posts if p['category'] == 'logik']
others = [p for p in posts if p['category'] != 'logik']
for n in NEW_OWN:
    image = f'/media/v2/posts/logik-{n}.webp'
    if image in have:
        continue
    im = Image.open(REF / f'publicaciones/{n}.jpg').convert('RGB')
    im = cover(im, 4 / 5)
    im.thumbnail((760, 950), Image.LANCZOS)
    im.save(MEDIA / f'posts/logik-{n}.webp', quality=82)
    p = meta[int(n) - 1]
    own.append({
        'image': image,
        'category': 'logik',
        'account': 'logikmkt',
        'caption': (p.get('alt') or '').strip(),
        'permalink': f"https://www.instagram.com{p['href']}",
    })

# La 015 sigue al frente; el resto de las propias en orden de publicación.
first = [p for p in own if p['image'].endswith('logik-015.webp')]
rest = sorted((p for p in own if not p['image'].endswith('logik-015.webp')), key=lambda p: p['image'])
DATA.write_text(json.dumps(first + rest + others, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# Logos que venían de dos en dos: se separan por manchas conectadas.
for name, parts in {'13-0': ['13-a', '13-b'], '19-0': ['19-a', '19-b']}.items():
    im = Image.open(MEDIA / f'logos/logo-{name}.png').convert('RGBA')
    alpha = np.asarray(im.getchannel('A')) > 40
    labels, _ = ndimage.label(ndimage.binary_dilation(alpha, iterations=12))
    boxes = sorted(ndimage.find_objects(labels), key=lambda o: o[0].start + o[1].start)
    for out, o in zip(parts, boxes):
        im.crop((o[1].start, o[0].start, o[1].stop, o[0].stop)).save(MEDIA / f'logos/logo-{out}.png', optimize=True)

print('publicaciones:', len(first + rest + others), '· propias:', len(first + rest))
