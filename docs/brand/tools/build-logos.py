"""Build the Tuki Coffee logo files: outlined SVGs, PNG exports and the website logo paths.

Text is shaped with HarfBuzz and converted to outlines, so no file depends on installed fonts.
Fonts (SIL OFL) are downloaded from github.com/google/fonts on first run into tools/.fonts/.

    python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz resvg-py
    .venv/bin/python docs/brand/tools/build-logos.py

Outputs:
    docs/brand/logo/*.svg              final logo system
    docs/brand/logo/concepts/*.svg     directions explored but not chosen
    docs/brand/logo/png/*.png          raster exports for social media and print proofs
    src/components/logo-paths.ts       path data for the <Logo> component
    src/app/icon.svg, apple-icon.png   favicon and iOS home-screen icon (Next.js metadata files)
"""
import math
import os
import subprocess

import resvg_py
import uharfbuzz as hb
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

TOOLS = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.dirname(TOOLS)
REPO = os.path.dirname(os.path.dirname(BRAND))
OUT = os.path.join(BRAND, 'logo')
FONTS = os.path.join(TOOLS, '.fonts')

# Brand colours, mirrored from docs/design-system/tokens/tokens.css (light theme).
C = {
    'roast': '#6F3B1F',     # --color-primary
    'espresso': '#2B1A12',  # --color-surface-inverse
    'cream': '#FBF6EE',     # --color-bg
    'orange': '#C2410C',    # --color-accent (cam Tuki)
    'caramel': '#F2B544',   # --color-highlight
}

GF = 'https://github.com/google/fonts/raw/main/ofl'
FONT_URLS = {
    'Fraunces.ttf': f'{GF}/fraunces/Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf',
    'Fraunces-Italic.ttf': f'{GF}/fraunces/Fraunces-Italic%5BSOFT,WONK,opsz,wght%5D.ttf',
    'BeVietnamPro-SemiBold.ttf': f'{GF}/bevietnampro/BeVietnamPro-SemiBold.ttf',
    'BeVietnamPro-Bold.ttf': f'{GF}/bevietnampro/BeVietnamPro-Bold.ttf',
}


def font_path(name):
    path = os.path.join(FONTS, name)
    if not os.path.exists(path):
        os.makedirs(FONTS, exist_ok=True)
        # curl uses the system certificate store; python.org builds on macOS ship without one.
        subprocess.run(['curl', '-fsSLo', path, FONT_URLS[name]], check=True)
    return path


FRAUNCES = font_path('Fraunces.ttf')
FRAUNCES_ITALIC = font_path('Fraunces-Italic.ttf')
BVP_SEMI = font_path('BeVietnamPro-SemiBold.ttf')
BVP_BOLD = font_path('BeVietnamPro-Bold.ttf')
DISPLAY = {'wght': 700, 'SOFT': 100, 'WONK': 1, 'opsz': 144}  # --display-variation at weight 700


def fmt(v):
    return f'{v:.2f}'.rstrip('0').rstrip('.')


# ---------------------------------------------------------------- text to outlines
_fonts = {}


def load(path, loc):
    key = (path, tuple(sorted(loc.items())))
    if key not in _fonts:
        face = hb.Face(hb.Blob.from_file_path(path))
        font = hb.Font(face)
        if loc:
            font.set_variations(loc)
        tt = TTFont(path)
        _fonts[key] = (face, font, tt, tt.getGlyphSet(location=loc or None, normalized=False))
    return _fonts[key]


def shape(path, text, size, loc=None, track=0.0):
    """Glyph runs [{name, x, adv}] and total width. `track` is extra spacing in em."""
    face, font, tt, gs = load(path, loc or {})
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {})
    order = tt.getGlyphOrder()
    s = size / face.upem
    x, out = 0.0, []
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        out.append({'name': order[info.codepoint], 'x': x + pos.x_offset * s, 'adv': pos.x_advance * s})
        x += pos.x_advance * s + track * size
    return out, x - track * size, s, gs


def glyph_d(gs, name, s, tx, ty, rot=0.0, cx=0.0):
    """Outline of one glyph with its baseline origin at (tx, ty), y pointing down.
    With `rot` (degrees) the glyph turns about its advance centre `cx`."""
    pen = SVGPathPen(gs, ntos=fmt)
    ca, sa = math.cos(math.radians(rot)), math.sin(math.radians(rot))
    gs[name].draw(TransformPen(pen, (s * ca, s * sa, s * sa, -s * ca, tx - ca * cx, ty - sa * cx)))
    return pen.getCommands()


def text_d(path, text, size, x, y, loc=None, track=0.0):
    glyphs, width, s, gs = shape(path, text, size, loc, track)
    return ' '.join(glyph_d(gs, g['name'], s, x + g['x'], y) for g in glyphs), width


# ---------------------------------------------------------------- shapes
def drop(cx, top, h):
    """Coffee drop, point up; `top` is the tip, `h` the full height."""
    r = h * 0.36
    by = top + h - r
    k = 0.5523 * r
    return (f'M{fmt(cx)} {fmt(top)}'
            f'C{fmt(cx + r * 0.35)} {fmt(top + h * 0.28)} {fmt(cx + r)} {fmt(by - r * 0.55)} {fmt(cx + r)} {fmt(by)}'
            f'C{fmt(cx + r)} {fmt(by + k)} {fmt(cx + k)} {fmt(by + r)} {fmt(cx)} {fmt(by + r)}'
            f'C{fmt(cx - k)} {fmt(by + r)} {fmt(cx - r)} {fmt(by + k)} {fmt(cx - r)} {fmt(by)}'
            f'C{fmt(cx - r)} {fmt(by - r * 0.55)} {fmt(cx - r * 0.35)} {fmt(top + h * 0.28)} {fmt(cx)} {fmt(top)}Z')


def rrect(x, y, w, h, r):
    r = min(r, w / 2, h / 2)
    return (f'M{fmt(x + r)} {fmt(y)}H{fmt(x + w - r)}A{fmt(r)} {fmt(r)} 0 0 1 {fmt(x + w)} {fmt(y + r)}'
            f'V{fmt(y + h - r)}A{fmt(r)} {fmt(r)} 0 0 1 {fmt(x + w - r)} {fmt(y + h)}H{fmt(x + r)}'
            f'A{fmt(r)} {fmt(r)} 0 0 1 {fmt(x)} {fmt(y + h - r)}V{fmt(y + r)}A{fmt(r)} {fmt(r)} 0 0 1 {fmt(x + r)} {fmt(y)}Z')


def phin_t(ox=0.0, oy=0.0, k=1.0):
    """Phin on a glass inside a 100x100 box: the plate is the crossbar of a T, the glass its stem.
    Returns (body path with the drop knocked out, to fill evenodd; drop path)."""
    def P(x, y):
        return f'{fmt(ox + x * k)} {fmt(oy + y * k)}'

    def R(x, y, w, h, r):
        return rrect(ox + x * k, oy + y * k, w * k, h * k, r * k)

    knob = R(44, 6, 12, 7, 3)
    lid = R(29, 14, 42, 8, 4)
    chamber = f'M{P(33, 24)}L{P(67, 24)}L{P(65, 40)}L{P(35, 40)}Z'
    plate = R(10, 42, 80, 11, 5.5)
    top, bottom = 57, 93
    glass = (f'M{P(33, top)}L{P(67, top)}L{P(63.2, bottom - 7)}'
             f'Q{P(62.2, bottom)} {P(55.5, bottom)}L{P(44.5, bottom)}Q{P(37.8, bottom)} {P(36.8, bottom - 7)}Z')
    d = drop(ox + 50 * k, oy + 63 * k, 20 * k)
    return f'{knob} {lid} {chamber} {plate} {glass} {d}', d


def wordmark(x, baseline, size, font=FRAUNCES):
    """'tuki' with a coffee drop in place of the dot on the i.
    Returns (letters path, drop path, width, y of the drop tip)."""
    glyphs, width, s, gs = shape(font, 'tukı', size, DISPLAY, track=-0.02)
    letters = ' '.join(glyph_d(gs, g['name'], s, x + g['x'], baseline) for g in glyphs)
    # Measure the dot of the real "i" to place the drop where the dot would sit.
    _, _, tt, gs_i = load(font, DISPLAY)
    pen = RecordingPen()
    gs_i[tt.getBestCmap()[ord('i')]].draw(pen)
    contours, current = [], []
    for op, args in pen.value:
        current.extend(args)
        if op in ('closePath', 'endPath'):
            contours.append(current)
            current = []
    dot = next(c for c in contours if min(p[1] for p in c) > 470)  # the contour above x-height
    xs, ys = [p[0] * s for p in dot], [p[1] * s for p in dot]
    h = (max(ys) - min(ys)) * 1.5
    tip = baseline - max(ys) - h * 0.12
    return letters, drop(x + glyphs[-1]['x'] + (min(xs) + max(xs)) / 2, tip, h), width, tip


def coffee_line(x, baseline, width, cap):
    """'COFFEE' in Be Vietnam Pro SemiBold, tracked to span `width`."""
    size = cap / 0.74
    glyphs, natural, _, _ = shape(BVP_SEMI, 'COFFEE', size)
    track = (width - natural) / (len(glyphs) - 1) / size
    return text_d(BVP_SEMI, 'COFFEE', size, x, baseline, None, track)[0]


def svg(w, h, body, title='Tuki Coffee'):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}" role="img" '
            f'aria-labelledby="t"><title id="t">{title}</title>{body}</svg>\n')


def paint(symbol, sym_drop, word, word_drop, coffee, ink, accent, bg=None, size=None):
    """Layer a lockup. Mono (accent == ink) keeps the drop in the glass as a knockout."""
    out = f'<rect width="{fmt(size[0])}" height="{fmt(size[1])}" fill="{bg}"/>' if bg else ''
    out += f'<path fill="{ink}" fill-rule="evenodd" d="{symbol}"/>'
    if accent != ink:
        out += f'<path fill="{accent}" d="{sym_drop}"/>'
    out += f'<path fill="{ink}" d="{word}"/><path fill="{accent}" d="{word_drop}"/>'
    if coffee:
        out += f'<path fill="{ink}" d="{coffee}"/>'
    return out


written = []


def write(name, content):
    path = os.path.join(OUT, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    written.append(name)


# ---------------------------------------------------------------- final system
def symbol_files():
    body, d = phin_t()
    write('tuki-symbol.svg', svg(100, 100,
          f'<path fill="{C["roast"]}" fill-rule="evenodd" d="{body}"/><path fill="{C["orange"]}" d="{d}"/>',
          'Tuki Coffee — biểu tượng phin'))
    # Favicon: rounded roast tile; the symbol is drawn at half size so it stays solid at 16px.
    body, d = phin_t(7, 6.5, 0.5)
    write('tuki-favicon.svg', svg(64, 64,
          f'<rect width="64" height="64" rx="16" fill="{C["roast"]}"/>'
          f'<path fill="{C["cream"]}" fill-rule="evenodd" d="{body}"/><path fill="{C["caramel"]}" d="{d}"/>'))
    # Social avatar: full-bleed square; the symbol stays inside the circle crop platforms apply.
    body, d = phin_t(22, 20, 0.56)
    write('tuki-avatar.svg', svg(100, 100,
          f'<rect width="100" height="100" fill="{C["roast"]}"/>'
          f'<path fill="{C["cream"]}" fill-rule="evenodd" d="{body}"/><path fill="{C["caramel"]}" d="{d}"/>'))


def horizontal():
    size, cap, coffee_base, pad, gap = 160, 22, 50, 24, 26
    _, _, width, tip = wordmark(0, 0, size)
    block = coffee_base - tip           # drop tip .. COFFEE baseline
    k = block / 100 * 1.08
    ox, oy = pad, pad + 2
    text_x = ox + 100 * k + gap
    base = oy - tip + (100 * k - block) / 2
    body, d = phin_t(ox, oy, k)
    word, wdrop, width, _ = wordmark(text_x, base, size)
    coffee = coffee_line(text_x + 4, base + coffee_base, width - 6, cap)
    W, H = text_x + width + pad, oy + 100 * k + pad
    parts = (body, d, word, wdrop, coffee)
    write('tuki-lockup-horizontal.svg', svg(W, H, paint(*parts, C['roast'], C['orange'])))
    write('tuki-lockup-horizontal-reverse.svg',
          svg(W, H, paint(*parts, C['cream'], C['caramel'], C['espresso'], (W, H))))
    write('tuki-lockup-horizontal-mono.svg', svg(W, H, paint(*parts, C['espresso'], C['espresso'])))


def compact(pad):
    """Symbol + 'tuki' without the COFFEE line, for small sizes such as the website header.
    The symbol stands on the baseline and rises a little above the drop so it holds its weight next to the letters."""
    size, gap = 160, 22
    _, _, _, tip = wordmark(0, 0, size)
    k = -tip * 1.2 / 87               # knob top (y 6) to glass bottom (y 93) = 1.2 x word height
    ox, oy = pad, pad - 6 * k
    base = oy + 93 * k
    body, d = phin_t(ox, oy, k)
    text_x = ox + 100 * k + gap
    word, wdrop, width, _ = wordmark(text_x, base, size)
    W, H = text_x + width + pad, base + pad + 3   # +3: round letters overshoot the baseline
    return W, H, body, d, word, wdrop


def compact_files():
    W, H, body, d, word, wdrop = compact(24)
    parts = (body, d, word, wdrop, None)
    write('tuki-lockup-compact.svg', svg(W, H, paint(*parts, C['roast'], C['orange'])))
    write('tuki-lockup-compact-reverse.svg',
          svg(W, H, paint(*parts, C['cream'], C['caramel'], C['espresso'], (W, H))))


def stacked():
    size, k = 150, 1.45
    _, _, width, tip = wordmark(0, 0, size)
    W = max(width, 100 * k) + 60
    ox, oy = (W - 100 * k) / 2, 28
    body, d = phin_t(ox, oy, k)
    tx = (W - width) / 2
    base = oy + 100 * k + 22 - tip
    word, wdrop, _, _ = wordmark(tx, base, size)
    coffee = coffee_line(tx + 4, base + 48, width - 6, 21)
    H = base + 48 + 30
    write('tuki-lockup-stacked.svg', svg(W, H, paint(body, d, word, wdrop, coffee, C['roast'], C['orange'])))


def seal():
    W = 400
    cx = cy = W / 2
    r_out, r_in = 190, 128
    size, track = 25, 0.14
    glyphs, width, s, gs = shape(BVP_BOLD, 'TUKI COFFEE • RANG MỘC • PHA TẬN TÂM • ', size, None, track)
    r_text = (r_out + r_in) / 2 - size * 0.36   # baseline radius
    circ = 2 * math.pi * r_text
    extra = (circ - width) / len(glyphs)         # spread the text evenly round the ring
    parts, x = [], 0.0
    for g in glyphs:
        ang = (x + g['adv'] / 2) / circ * 360 - 90
        a = math.radians(ang)
        parts.append(glyph_d(gs, g['name'], s, cx + r_text * math.cos(a), cy + r_text * math.sin(a),
                             rot=ang + 90, cx=g['adv'] / 2))
        x += g['adv'] + extra + track * size
    ring = (f'M{fmt(cx)} {fmt(cy - r_out)}A{r_out} {r_out} 0 1 1 {fmt(cx - 0.01)} {fmt(cy - r_out)}Z '
            f'M{fmt(cx)} {fmt(cy - r_in)}A{r_in} {r_in} 0 1 0 {fmt(cx + 0.01)} {fmt(cy - r_in)}Z')
    k = 1.7
    body, d = phin_t(cx - 50 * k, cy - 50 * k, k)
    write('tuki-seal.svg', svg(W, W,
          f'<path fill="{C["roast"]}" fill-rule="evenodd" d="{ring}"/>'
          f'<path fill="{C["cream"]}" d="{" ".join(parts)}"/>'
          f'<path fill="{C["roast"]}" fill-rule="evenodd" d="{body}"/><path fill="{C["orange"]}" d="{d}"/>',
          'Tuki Coffee — rang mộc, pha tận tâm'))


# ---------------------------------------------------------------- directions not chosen (kept for reference)
def concept_wordmark():
    word, wdrop, width, _ = wordmark(20, 190, 200)
    coffee = coffee_line(24, 252, width - 8, 28)
    write('concepts/concept-a-wordmark.svg', svg(width + 40, 276,
          f'<path fill="{C["roast"]}" d="{word}"/><path fill="{C["orange"]}" d="{wdrop}"/>'
          f'<path fill="{C["roast"]}" d="{coffee}"/>', 'Tuki Coffee — hướng A'))


def blob(cx, cy, radii, rot=0.0):
    n = len(radii)
    pts = [(cx + rx * math.cos(math.radians(i * 360 / n + rot)), cy + ry * math.sin(math.radians(i * 360 / n + rot)))
           for i, (rx, ry) in enumerate(radii)]
    d = f'M{fmt(pts[0][0])} {fmt(pts[0][1])}'
    for i in range(n):  # Catmull-Rom through the points, as cubic Béziers
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        d += (f'C{fmt(p1[0] + (p2[0] - p0[0]) / 6)} {fmt(p1[1] + (p2[1] - p0[1]) / 6)} '
              f'{fmt(p2[0] - (p3[0] - p1[0]) / 6)} {fmt(p2[1] - (p3[1] - p1[1]) / 6)} {fmt(p2[0])} {fmt(p2[1])}')
    return d + 'Z'


def concept_sticker():
    W, H, size = 480, 320, 150
    shape_d = blob(W / 2, H / 2, [(212, 128), (200, 136), (206, 140), (214, 132),
                                  (204, 128), (208, 138), (200, 134), (210, 130)], rot=12)
    _, _, width, _ = wordmark(0, 0, size, FRAUNCES_ITALIC)
    tx, base = (W - width) / 2 - 4, H / 2 + 42
    word, wdrop, _, _ = wordmark(tx, base, size, FRAUNCES_ITALIC)
    coffee = coffee_line(tx + 4, base + 44, width - 6, 19)
    write('concepts/concept-c-sticker.svg', svg(W, H,
          f'<g transform="rotate(-6 {W / 2} {H / 2})"><path fill="{C["caramel"]}" d="{shape_d}"/>'
          f'<path fill="{C["espresso"]}" d="{word}"/><path fill="{C["orange"]}" d="{wdrop}"/>'
          f'<path fill="{C["espresso"]}" d="{coffee}"/></g>', 'Tuki Coffee — hướng C'))


# ---------------------------------------------------------------- exports
PNG_EXPORTS = [  # (svg, png, width in px)
    ('tuki-lockup-horizontal.svg', 'tuki-lockup-horizontal-2000.png', 2000),
    ('tuki-lockup-horizontal-reverse.svg', 'tuki-lockup-horizontal-reverse-2000.png', 2000),
    ('tuki-lockup-horizontal-mono.svg', 'tuki-lockup-horizontal-mono-2000.png', 2000),
    ('tuki-lockup-compact.svg', 'tuki-lockup-compact-1200.png', 1200),
    ('tuki-lockup-compact-reverse.svg', 'tuki-lockup-compact-reverse-1200.png', 1200),
    ('tuki-lockup-stacked.svg', 'tuki-lockup-stacked-1200.png', 1200),
    ('tuki-symbol.svg', 'tuki-symbol-1024.png', 1024),
    ('tuki-seal.svg', 'tuki-seal-1600.png', 1600),
    ('tuki-avatar.svg', 'tuki-avatar-1080.png', 1080),
]


def export_png(src, dest, width):
    png = resvg_py.svg_to_bytes(svg_path=os.path.join(OUT, src), width=width, skip_system_fonts=True)
    path = os.path.join(OUT, 'png', dest)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(bytes(png))
    written.append(f'png/{dest}')


def website(W, H, body, d, word, wdrop):
    """Path data for src/components/logo.tsx; colours come from --color-logo / --color-logo-accent."""
    path = os.path.join(REPO, 'src/components/logo-paths.ts')
    with open(path, 'w') as f:
        f.write('// Generated by docs/brand/tools/build-logos.py from the compact lockup. Do not edit by hand.\n\n')
        f.write('export const logoPaths = {\n')
        f.write(f"  viewBox: '0 0 {fmt(W)} {fmt(H)}',\n")
        f.write(f"  /** Phin symbol; the drop inside the glass is a hole, filled by `symbolDrop`. */\n")
        f.write(f"  symbol: '{body}',\n")
        f.write(f"  symbolDrop: '{d}',\n")
        f.write(f"  word: '{word}',\n")
        f.write(f"  wordDrop: '{wdrop}',\n")
        f.write('} as const\n')
    written.append(os.path.relpath(path, BRAND))


def app_icons():
    """Next.js metadata files: icon.svg is the favicon; apple-icon.png is full-bleed because iOS rounds it."""
    app = os.path.join(REPO, 'src/app')
    with open(os.path.join(OUT, 'tuki-favicon.svg')) as src, open(os.path.join(app, 'icon.svg'), 'w') as dest:
        dest.write(src.read())
    png = resvg_py.svg_to_bytes(svg_path=os.path.join(OUT, 'tuki-avatar.svg'), width=180, skip_system_fonts=True)
    with open(os.path.join(app, 'apple-icon.png'), 'wb') as f:
        f.write(bytes(png))
    written.extend(['../../src/app/icon.svg', '../../src/app/apple-icon.png'])


if __name__ == '__main__':
    symbol_files()
    horizontal()
    compact_files()
    stacked()
    seal()
    concept_wordmark()
    concept_sticker()
    for src, dest, width in PNG_EXPORTS:
        export_png(src, dest, width)
    website(*compact(1))  # tight box: the page layout owns the spacing
    app_icons()
    print('\n'.join(written))
