"""Remove solid black backdrop from hero showcase PNG (edge flood-fill)."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "public" / "hero" / "hero-showcase-reference.png"
THRESHOLD = 32


def is_background_pixel(r: int, g: int, b: int, a: int) -> bool:
    if a == 0:
        return True
    return max(r, g, b) < THRESHOLD


def remove_background(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        for y in (0, height - 1):
            if is_background_pixel(*pixels[x, y]) and not visited[y][x]:
                visited[y][x] = True
                queue.append((x, y))

    for y in range(height):
        for x in (0, width - 1):
            if is_background_pixel(*pixels[x, y]) and not visited[y][x]:
                visited[y][x] = True
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)

        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx]:
                if is_background_pixel(*pixels[nx, ny]):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    img.save(path, optimize=True)
    print(f"Updated {path} ({width}x{height})")


if __name__ == "__main__":
    remove_background(TARGET)
