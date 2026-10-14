"""Material del rediseño (v2): publicaciones, marcas, videos y equipo.

Exporta a frontend/public/media/v2. Se corre desde la raíz:
    python scripts/build-media-v2.py
Necesita Pillow, numpy y ffmpeg en el PATH.
"""

import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "referencias"
OUT = ROOT / "frontend/public/media/v2"
POSTS = REF / "redes/instagram/publicaciones"
PHOTO = REF / "sitio/fotografiadeproducto"
DESIGN = REF / "sitio/contenido"
HOME = REF / "sitio/inicio"
VIDEOS = REF / "sitio/videos"


def site(folder: Path, stem: str) -> Path:
    return next(folder.glob(f"1cd776_{stem}*"))


def open_rgb(path: Path) -> Image.Image:
    with Image.open(path) as im:
        return im.convert("RGB")


def cover(im: Image.Image, ratio: float) -> Image.Image:
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio)
        return im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = int(w / ratio)
    return im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))


def save(im: Image.Image, name: str, max_side: int, quality: int = 78) -> None:
    out = OUT / name
    out.parent.mkdir(parents=True, exist_ok=True)
    im = im.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(out, "WEBP", quality=quality, method=6)


def ffmpeg(*args: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


# ---- Publicaciones: las elegidas por el usuario (propias) y diseños para clientes (del sitio).
OWN = ["015", "017", "019", "024", "025", "027", "039", "041", "043", "052", "061", "063", "073", "077", "081", "085", "089", "093", "099"]
CLIENT = {
    # índice en la carpeta contenido (orden alfabético) → (categoría, marca)
    6: ("gastronomia", "Techani"), 9: ("gastronomia", "Techani"), 18: ("gastronomia", "Techani"),
    22: ("gastronomia", "Techani"), 40: ("gastronomia", "Techani"), 19: ("gastronomia", "Glüu"),
    32: ("gastronomia", "Comida a domicilio"), 5: ("gastronomia", "Pizzería"),
    8: ("salud", "GASE Dental Group"), 12: ("salud", "GASE Dental Group"), 27: ("salud", "GASE Dental Group"),
    37: ("salud", "GASE Dental Group"), 7: ("salud", "Holistik"), 21: ("salud", "Velo Bye"), 47: ("salud", "Velo Bye"),
    10: ("belleza", "Novedades y Cosméticos"), 13: ("belleza", "Novedades y Cosméticos"), 43: ("belleza", "Novedades y Cosméticos"),
    11: ("belleza", "Moira"), 24: ("belleza", "Moira"), 3: ("belleza", "Moira"),
    2: ("turismo", "Hampton by Hilton"), 4: ("turismo", "Hampton by Hilton"), 15: ("turismo", "Hampton by Hilton"),
    17: ("turismo", "Hampton by Hilton"), 41: ("turismo", "Hampton by Hilton"), 29: ("turismo", "Li-Kaan"),
    39: ("turismo", "Li-Kaan"), 16: ("turismo", "Agencia de viajes"), 36: ("turismo", "Agencia de viajes"),
    30: ("servicios", "Desperrucados"), 33: ("servicios", "Desperrucados"), 23: ("servicios", "Plan B"), 44: ("servicios", "Plan B"),
}


def build_posts() -> list[dict]:
    raw = (REF / "redes/instagram/publicaciones.json").read_text(encoding="utf-8-sig").strip()
    meta = json.loads(json.loads(raw) if raw.startswith('"') else raw)
    items = []
    for n in OWN:
        p = meta[int(n) - 1]
        save(cover(open_rgb(POSTS / f"{n}.jpg"), 4 / 5), f"posts/logik-{n}.webp", 760)
        items.append({
            "image": f"/media/v2/posts/logik-{n}.webp",
            "category": "logik",
            "account": "logikmkt",
            "caption": (p.get("alt") or "").strip(),
            "permalink": f"https://www.instagram.com{p['href']}",
        })
    designs = sorted(DESIGN.iterdir())
    for idx, (category, brand) in CLIENT.items():
        src = designs[idx]
        name = f"posts/{category}-{idx:02d}.webp"
        save(cover(open_rgb(src), 4 / 5), name, 760)
        items.append({
            "image": f"/media/v2/{name}",
            "category": category,
            "account": brand,
            "caption": f"Diseño de Logik Marketing para {brand}.",
            "permalink": None,
        })
    return items


# ---- Logos: separa los que venían en pares (uno arriba del otro) y los recorta.
def split_logos() -> dict[int, list[Path]]:
    tiles = [f for f in sorted(HOME.glob("*.png")) if f.name[7:15] not in {"0986f2bd", "65215039", "69e2b67e"}]
    result: dict[int, list[Path]] = {}
    (OUT / "logos").mkdir(parents=True, exist_ok=True)
    for i, f in enumerate(tiles, 1):
        with Image.open(f) as im:
            im = im.convert("RGBA")
        alpha = np.asarray(im.getchannel("A")) > 40
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
        # Une franjas separadas por menos de 60 px (texto de una misma marca).
        groups: list[list[int]] = []
        for a, b in spans:
            if groups and a - groups[-1][1] < 60:
                groups[-1][1] = b
            else:
                groups.append([a, b])
        groups = [g for g in groups if g[1] - g[0] > 40]
        result[i] = []
        for j, (a, b) in enumerate(groups):
            part = im.crop((0, a, im.width, b))
            part = part.crop(part.getchannel("A").getbbox())
            part.thumbnail((520, 360), Image.LANCZOS)
            out = OUT / "logos" / f"logo-{i:02d}-{j}.png"
            part.save(out, optimize=True)
            result[i].append(out)
    return result


BRANDS = [
    # nombre, logo (pieza, parte), foto (carpeta, raíz), color de la marca
    ("Hampton by Hilton", (15, 1), (DESIGN, "0b63a33d"), "#0d2c54"),
    ("Techani", (14, 0), (PHOTO, "567c7704"), "#c8143c"),
    ("GASE Dental Group", (3, 1), (DESIGN, "3a338233"), "#1d4f91"),
    ("Novedades y Cosméticos", (15, 0), (PHOTO, "760699c7"), "#1b1b1f"),
    ("Desperrucados", (1, 0), (DESIGN, "b75b8998"), "#1f4fa0"),
    ("Li-Kaan", (12, 0), (DESIGN, "ac289c19"), "#0b7f8a"),
    ("Glüu", (18, 0), (DESIGN, "61751c6a"), "#1673c6"),
    ("Plan B", (16, 0), (DESIGN, "8512c424"), "#e5881b"),
    ("Holistik", (4, 0), (DESIGN, "25ea1e2f"), "#2f4a37"),
]


def build_brands(logos: dict[int, list[Path]]) -> list[dict]:
    items = []
    for name, (tile, part), (folder, stem), color in BRANDS:
        slug = name.lower().replace(" ", "-").replace("ü", "u").replace("é", "e").replace("'", "")
        save(cover(open_rgb(site(folder, stem)), 4 / 5), f"marcas/{slug}.webp", 900)
        logo = logos[tile][min(part, len(logos[tile]) - 1)]
        items.append({"name": name, "slug": slug, "logo": f"/media/v2/logos/{logo.name}", "photo": f"/media/v2/marcas/{slug}.webp", "color": color})
    return items


def build_people() -> None:
    save(open_rgb(site(HOME, "ae7366b5")), "equipo/diana.webp", 1000, 82)
    save(open_rgb(site(HOME, "24d3c1f5")), "equipo/abigail.webp", 1000, 82)
    # Las fundadoras juntas (publicación "Agencia de marketing digital"): parte superior, sin el texto.
    im = open_rgb(POSTS / "094.jpg")
    save(im.crop((60, 0, im.width - 60, int(im.height * 0.45))), "equipo/fundadoras.webp", 1200, 82)
    save(open_rgb(POSTS / "078.jpg"), "equipo/marke-team.webp", 1000, 80)


def build_videos() -> None:
    (OUT / "videos").mkdir(parents=True, exist_ok=True)
    jobs = {
        "asi-trabajamos": (VIDEOS / "1cd776_39c287ba6dfa4214a2f604ffe3965cb1.mp4", "scale=1280:-2", "6"),
        "campanas-efectivas": (VIDEOS / "1cd776_b0d5720ba15a4cb28efb646cce10a23b.mp4", "scale=720:-2", "14"),
        "logik-30s": (ROOT / "videos/logik-marcas/renders/logik-marcas.mp4", "scale=720:-2", "3.6"),
    }
    for name, (src, scale, poster_at) in jobs.items():
        if not src.exists():
            print("falta", src)
            continue
        ffmpeg("-i", str(src), "-an", "-vf", scale, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "27",
               "-preset", "slow", "-movflags", "+faststart", str(OUT / f"videos/{name}.mp4"))
        png = OUT / f"videos/{name}.png"
        ffmpeg("-ss", poster_at, "-i", str(src), "-frames:v", "1", "-vf", scale, str(png))
        save(open_rgb(png), f"videos/{name}.webp", 1280, 80)
        png.unlink()


def main() -> None:
    posts = build_posts()
    logos = split_logos()
    brands = build_brands(logos)
    build_people()
    build_videos()
    (OUT / "catalog.json").write_text(json.dumps({"posts": posts, "brands": brands}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(len(posts), "publicaciones,", len(brands), "marcas")


if __name__ == "__main__":
    main()
