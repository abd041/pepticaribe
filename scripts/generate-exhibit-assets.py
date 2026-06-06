"""Generate transparent exhibit PNGs for featured compound cards."""

from __future__ import annotations

import io
from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "products" / "exhibit"
OUT.mkdir(parents=True, exist_ok=True)

# Uniform exhibit canvas — every vial lands at identical position + scale
CANVAS_W = 1060
CANVAS_H = 2274
CONTENT_H = 2226
BOTTOM_GAP = 24

# slug -> (source relative to public, output filename)
ASSETS: dict[str, tuple[str, str]] = {
    "glp-3-rt": ("products/glp-3-rt-30mg.png", "glp-3-rt.png"),
    "glp-2-t": ("products/glp-2-t-40mg.png", "glp-2-t.png"),
    "ghk-cu": ("products/ghk-cu-100mg.png", "ghk-cu.png"),
    "bpc-157-tb-500": ("products/bpc-157-tb-500.png", "wolverine.png"),
    "bpc-157": ("products/bpc-157.png", "bpc-157.png"),
    "mots-c": ("products/mots-c.png", "mots-c.png"),
    "nad-plus": ("products/nad-plus.png", "nad-plus.png"),
    "cjc-1295-ipamorelin": ("products/cjc-1295-ipamorelin.png", "cjc-1295-ipamorelin.png"),
}


def trim_transparent(img: Image.Image, padding: int = 24) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    return img.crop((left, top, right, bottom))


def normalize_to_canvas(img: Image.Image) -> Image.Image:
    """Place vial content on a shared canvas so every card renders identically."""
    bbox = img.getbbox()
    if not bbox:
        return img

    content = img.crop(bbox)
    scale = CONTENT_H / content.height
    target_w = max(1, round(content.width * scale))
    target_h = CONTENT_H
    resized = content.resize((target_w, target_h), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    x = (CANVAS_W - target_w) // 2
    y = CANVAS_H - BOTTOM_GAP - target_h
    canvas.paste(resized, (x, y), resized)
    return canvas


def process(slug: str, src_rel: str, out_name: str) -> None:
    src = PUBLIC / src_rel
    dest = OUT / out_name
    if not src.exists():
        raise FileNotFoundError(src)

    raw = src.read_bytes()
    cutout = remove(raw)
    img = Image.open(io.BytesIO(cutout)).convert("RGBA")
    img = trim_transparent(img)
    img = normalize_to_canvas(img)
    img.save(dest, "PNG", optimize=True)
    print(f"processed {src_rel} -> products/exhibit/{out_name} ({img.size[0]}x{img.size[1]})")


def main() -> None:
    for slug, (src_rel, out_name) in ASSETS.items():
        process(slug, src_rel, out_name)


if __name__ == "__main__":
    main()
