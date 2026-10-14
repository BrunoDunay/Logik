"""Prepara las imágenes y videos del sitio a partir del material de referencias/.

Recorta, redimensiona y exporta a WebP en frontend/public/media. Se corre desde la raíz:
    python scripts/build-media.py
Necesita Pillow y, para los videos, ffmpeg en el PATH.
"""

import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "referencias"
OUT = ROOT / "frontend" / "public" / "media"
POSTS = REF / "redes/instagram/publicaciones"
STORIES = REF / "redes/instagram/destacadas"
PHOTO = REF / "sitio/fotografiadeproducto"
DESIGN = REF / "sitio/contenido"
VIDEOS = REF / "sitio/videos"
HERO_VIDEO = VIDEOS / "1cd776_39c287ba6dfa4214a2f604ffe3965cb1.mp4"
RESULTS_VIDEO = VIDEOS / "1cd776_b0d5720ba15a4cb28efb646cce10a23b.mp4"


def site(folder: Path, stem: str) -> Path:
    return next(folder.glob(f"1cd776_{stem}*"))


def story(path: Path) -> Image.Image:
    """Recorta el cuadro vertical de una captura de historia (sin la interfaz de Instagram)."""
    im = Image.open(path).convert("RGB")
    w, h = im.size
    cw = int(h * 0.54)
    left = (w - cw) // 2
    return im.crop((left, int(h * 0.1), left + cw, int(h * 0.88)))


def crop(im: Image.Image, box: tuple[float, float, float, float]) -> Image.Image:
    """Recorte con fracciones del tamaño (izquierda, arriba, derecha, abajo)."""
    w, h = im.size
    return im.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))


def cover(im: Image.Image, ratio: float) -> Image.Image:
    """Recorte centrado a una proporción ancho/alto."""
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio)
        return im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = int(w / ratio)
    return im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))


def save(im: Image.Image, name: str, max_side: int = 1600, quality: int = 80) -> None:
    out = OUT / name
    out.parent.mkdir(parents=True, exist_ok=True)
    im = im.convert("RGB")
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(out, "WEBP", quality=quality, method=6)
    print(f"{name:34} {im.size[0]}x{im.size[1]}  {out.stat().st_size // 1024} KB")


def open_rgb(path: Path) -> Image.Image:
    with Image.open(path) as im:
        return im.convert("RGB")


def grid(paths: list[Path], cols: int, cell: int) -> Image.Image:
    """Mosaico de publicaciones del feed, sin separación (como se ve el perfil)."""
    tiles = [cover(open_rgb(p), 4 / 5).resize((cell, int(cell * 5 / 4))) for p in paths]
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * int(cell * 5 / 4)))
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % cols) * cell, (i // cols) * int(cell * 5 / 4)))
    return sheet


def ffmpeg(*args: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def main() -> None:
    # ---- Hero: fragmento de su video con trabajo de clientes (Techani y Hampton), sin textos.
    (OUT / "hero").mkdir(parents=True, exist_ok=True)
    ffmpeg("-ss", "8.0", "-t", "5.5", "-i", str(HERO_VIDEO), "-an", "-vf", "scale=960:-2,fps=30",
           "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p", "-crf", "27",
           "-movflags", "+faststart", str(OUT / "hero/reel.mp4"))
    ffmpeg("-ss", "9.6", "-i", str(HERO_VIDEO), "-frames:v", "1", str(OUT / "hero/reel.png"))
    save(open_rgb(OUT / "hero/reel.png"), "hero/reel.webp", 960)
    (OUT / "hero/reel.png").unlink()

    # ---- Video de resultados (provisional hasta tener el de HyperFrames).
    (OUT / "showcase").mkdir(parents=True, exist_ok=True)
    ffmpeg("-i", str(RESULTS_VIDEO), "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "26",
           "-movflags", "+faststart", str(OUT / "showcase/marcas.mp4"))
    ffmpeg("-ss", "14", "-i", str(RESULTS_VIDEO), "-frames:v", "1", str(OUT / "showcase/marcas.png"))
    save(open_rgb(OUT / "showcase/marcas.png"), "showcase/marcas.webp", 720)
    (OUT / "showcase/marcas.png").unlink()

    # ---- Servicios (fotos al margen, en proporciones distintas a propósito).
    feed = [POSTS / f"{n}.jpg" for n in ("016", "026", "047", "002")]
    save(grid(feed, 2, 540), "servicios/redes.webp", 1080)
    save(cover(open_rgb(site(PHOTO, "7d628aff")), 3 / 2), "servicios/fotografia.webp", 1200)
    save(story(STORIES / "resultados/20.jpg"), "servicios/campanas.webp", 900)
    save(open_rgb(site(DESIGN, "3166b19f")), "servicios/identidad.webp", 900)
    save(cover(story(STORIES / "team/27.jpg"), 1), "servicios/web.webp", 900)
    save(crop(open_rgb(POSTS / "060.jpg"), (0, 0.3, 1, 1)), "servicios/asesoria.webp", 1000)

    # ---- Trabajo: miniaturas que van dentro del párrafo.
    work = {
        "hampton": site(DESIGN, "0b63a33d"),
        "techani": site(PHOTO, "567c7704"),
        "gase": site(DESIGN, "3a338233"),
        "desperrucados": site(DESIGN, "b75b8998"),
        "novedades": site(PHOTO, "760699c7"),
        "li-kaan": site(DESIGN, "ac289c19"),
        "gluu": site(DESIGN, "61751c6a"),
        "plan-b": site(DESIGN, "8512c424"),
    }
    for name, path in work.items():
        save(cover(open_rgb(path), 3 / 2), f"trabajo/{name}.webp", 640, 76)
    save(cover(story(STORIES / "portafolio/01.jpg"), 3 / 2), "trabajo/secret-plus.webp", 640, 76)

    # ---- Proceso: fotos a pantalla completa.
    save(crop(open_rgb(POSTS / "084.jpg"), (0, 0.33, 1, 1)), "proceso/analizamos.webp", 1800)
    save(crop(open_rgb(POSTS / "080.jpg"), (0, 0.15, 1, 0.85)), "proceso/creamos.webp", 1800)
    ffmpeg("-ss", "15.0", "-i", str(HERO_VIDEO), "-frames:v", "1", str(OUT / "proceso/anunciamos.png"))
    save(open_rgb(OUT / "proceso/anunciamos.png"), "proceso/anunciamos.webp", 1800)
    (OUT / "proceso/anunciamos.png").unlink()
    save(crop(open_rgb(POSTS / "086.jpg"), (0, 0.04, 1, 0.6)), "proceso/medimos.webp", 1800)

    # ---- Equipo.
    save(crop(open_rgb(POSTS / "094.jpg"), (0.08, 0.0, 0.92, 0.45)), "equipo/fundadoras.webp", 1000)
    save(open_rgb(POSTS / "078.jpg"), "equipo/oficina.webp", 1000)
    save(story(STORIES / "team/24.jpg"), "equipo/estudio.webp", 900)

    # ---- Marca.
    brand = OUT.parent / "brand"
    brand.mkdir(parents=True, exist_ok=True)
    with Image.open(REF / "sitio/inicio/1cd776_6521503937f846849b8b885a8c8ebb30.png") as logo:
        logo = logo.convert("RGBA")
    bbox = logo.getbbox()
    logo = logo.crop(bbox)
    logo.thumbnail((600, 600), Image.LANCZOS)
    logo.save(brand / "logo.png", optimize=True)
    # Versión para fondos oscuros: lo negro pasa a blanco papel y el rosa se queda igual.
    light = logo.copy()
    px = light.load()
    for y in range(light.height):
        for x in range(light.width):
            r, g, b, a = px[x, y]
            if a and max(r, g, b) < 120:
                px[x, y] = (247, 243, 241, a)
    light.save(brand / "logo-light.png", optimize=True)
    print("brand/logo.png y brand/logo-light.png", logo.size)

    ink = (20, 16, 18)
    # Ícono: el monograma "K" con su flecha, sobre negro.
    with Image.open(REF / "sitio/inicio/1cd776_69e2b67e5b5f47c6ae96b2ceeefcf163.png") as mark:
        mark = mark.convert("RGB")
    mark = mark.crop(Image.eval(mark, lambda v: 255 - v).getbbox())
    px = mark.load()
    for y in range(mark.height):
        for x in range(mark.width):
            r, g, b = px[x, y]
            if min(r, g, b) > 170 and r - b < 40:
                px[x, y] = ink
            elif max(r, g, b) < 120:
                px[x, y] = (247, 243, 241)
    icon = Image.new("RGB", (512, 512), ink)
    mark.thumbnail((360, 360), Image.LANCZOS)
    icon.paste(mark, ((512 - mark.width) // 2, (512 - mark.height) // 2))
    icon.save(brand / "icon.png", optimize=True)

    # Imagen al compartir el enlace (WhatsApp, redes): el logo claro sobre negro.
    share = Image.new("RGB", (1200, 630), ink)
    wide = light.copy()
    wide.thumbnail((760, 300), Image.LANCZOS)
    share.paste(wide, ((1200 - wide.width) // 2, (630 - wide.height) // 2), wide)
    share.save(brand / "share.png", optimize=True)
    print("brand/icon.png y brand/share.png")


if __name__ == "__main__":
    main()
