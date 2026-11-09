# Generates text-bearing SEO assets with Pillow:
#   public/og-image.png        1200x630 Open Graph / Twitter share card
#   public/mstile-310x150.png  wide Microsoft tile
#   public/favicon.ico         multi-size classic favicon (16/32/48)
# Run after scripts/generate_seo_assets.mjs:
#   python3 scripts/make_og_assets.py
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public"

DEEP_BLUE = (33, 16, 143)      # #21108F
ROYAL_BLUE = (49, 86, 200)     # #3156C8
RED = (229, 36, 54)            # #E52436
ORANGE = (255, 138, 36)        # #FF8A24
BLACK = (11, 12, 18)           # #0B0C12
WHITE = (255, 255, 255)
SLATE = (154, 160, 180)        # #9AA0B4

BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def font(path_, size):
    return ImageFont.truetype(path_, size)


def v_gradient(size, top, bottom):
    """Vertical linear gradient, filled row-wise."""
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        row = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = row
    return img


def overlay(size):
    """Transparent RGBA layer + draw context — draw on it, then
    Image.alpha_composite(base, layer) for true alpha blending."""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    return layer, ImageDraw.Draw(layer)


def grid(size, step=48, color=(255, 255, 255, 12)):
    layer, d = overlay(size)
    w, h = size
    for x in range(0, w, step):
        d.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, step):
        d.line([(0, y), (w, y)], fill=color, width=1)
    return layer


def rounded_gradient_square(size, radius, c1, c2):
    """Rounded square filled with a vertical gradient (brand tile look)."""
    img = v_gradient((size, size), c1, c2).convert("RGBA")
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=radius, fill=255
    )
    img.putalpha(mask)
    return img


def chip(d, xy, text, fnt, pad_x=18, pad_y=9):
    x, y = xy
    tw = d.textlength(text, font=fnt)
    th = fnt.size
    radius = (th + pad_y * 2) // 2
    d.rounded_rectangle(
        [x, y, x + tw + pad_x * 2, y + th + pad_y * 2],
        radius=radius,
        fill=(255, 255, 255, 20),
        outline=(255, 255, 255, 80),
        width=2,
    )
    d.text((x + pad_x, y + pad_y - 1), text, font=fnt, fill=WHITE)
    return x + tw + pad_x * 2


def monogram_badge(size=128, radius=28):
    """Brand gradient rounded square with white A + orange dot."""
    tile = rounded_gradient_square(size, radius, ROYAL_BLUE, RED)
    d = ImageDraw.Draw(tile)
    fa = font(BOLD, int(size * 0.56))
    bbox = d.textbbox((0, 0), "A", font=fa)
    aw, ah = bbox[2] - bbox[0], bbox[3] - bbox[1]
    ax = (size - aw) / 2 - bbox[0] - size * 0.03
    ay = (size - ah) / 2 - bbox[1] - size * 0.02
    d.text((ax, ay), "A", font=fa, fill=WHITE)
    r = int(size * 0.075)
    d.ellipse([size - r * 3, size - r * 3, size - r, size - r], fill=ORANGE)
    return tile


# ─────────────────────────────────────────────────────────────
# OG image 1200x630
# ─────────────────────────────────────────────────────────────
W, H = 1200, 630
og = v_gradient((W, H), BLACK, DEEP_BLUE).convert("RGBA")
og = Image.alpha_composite(og, grid((W, H)))

deco, dd = overlay((W, H))
# soft accent glows, pushed to the edges so text stays readable
dd.ellipse([W - 240, -300, W + 320, 260], fill=(229, 36, 54, 52))
dd.ellipse([-260, H - 240, 240, H + 260], fill=(49, 86, 200, 60))
og = Image.alpha_composite(og, deco)

d = ImageDraw.Draw(og)  # opaque text drawing on the composited base

# monogram badge
badge = monogram_badge(148, 34)
og.paste(badge, (80, 84), badge)

# name + role
f_name = font(BOLD, 82)
f_role = font(BOLD, 25)
d.text((272, 98), "AARAV SHARMA", font=f_name, fill=WHITE)
d.text((276, 208), "CSE STUDENT  •  RESEARCHER  •  TECHNOLOGY ENTHUSIAST", font=f_role, fill=ORANGE)

# headline
f_head = font(BOLD, 46)
f_sub = font(REG, 29)
d.text((80, 306), "Building Intelligent Solutions", font=f_head, fill=WHITE)
d.text((80, 368), "Through Code, Research & Innovation.", font=f_head, fill=WHITE)
d.text((82, 450), "AI / ML  ·  Large Language Models  ·  Causal Reasoning  ·  Trustworthy AI", font=f_sub, fill=(196, 204, 230))

# bottom chips (on an overlay so the pill fill blends correctly)
chips_layer, cd = overlay((W, H))
f_chip = font(REG, 23)
x = 80
for label in ["AI & ML", "LLMs", "Web Engineering", "Open Source"]:
    x = chip(cd, (x, 516), label, f_chip) + 16
og = Image.alpha_composite(og, chips_layer)
d = ImageDraw.Draw(og)

d.text((W - 80 - d.textlength("aaravsharma.dev", font=f_sub), 524), "aaravsharma.dev", font=f_sub, fill=SLATE)

og.convert("RGB").save(PUB / "og-image.png", "PNG", optimize=True)

# ─────────────────────────────────────────────────────────────
# Wide MS tile 310x150
# ─────────────────────────────────────────────────────────────
tw, th = 310, 150
tile = Image.new("RGB", (tw, th), DEEP_BLUE)
g_layer = grid((tw, th), step=24, color=(255, 255, 255, 10))
tile = Image.alpha_composite(tile.convert("RGBA"), g_layer)
td = ImageDraw.Draw(tile)

mini = monogram_badge(86, 20)
tile.paste(mini, (18, 32), mini)
f_t1 = font(BOLD, 30)
f_t2 = font(REG, 15)
td.text((116, 42), "Aarav", font=f_t1, fill=WHITE)
td.text((116, 78), "Sharma", font=f_t1, fill=WHITE)
td.text((117, 116), "CSE Student · Researcher", font=f_t2, fill=(185, 192, 232))
tile.convert("RGB").save(PUB / "mstile-310x150.png", "PNG", optimize=True)

# ─────────────────────────────────────────────────────────────
# favicon.ico (classic multi-size, legacy browsers auto-request it)
# ─────────────────────────────────────────────────────────────
# Pillow derives every frame from the base image, so use the largest PNG
# (48x48) as the base and let it downscale for 32/16.
ico_base = Image.open(PUB / "favicon-48x48.png").convert("RGBA")
ico_base.save(
    PUB / "favicon.ico",
    format="ICO",
    sizes=[(48, 48), (32, 32), (16, 16)],
)

print("✓ og-image.png, mstile-310x150.png, favicon.ico written to public/")
