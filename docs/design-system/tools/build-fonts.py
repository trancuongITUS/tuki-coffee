"""Build the self-hosted Fraunces files the website loads (src/app/fonts/*.woff2).

Google Fonts can only serve Fraunces with SOFT and WONK as full ranges, which makes every file
100-150KB. The site uses one value of each (SOFT 100, WONK 1) and two weights, so each file here
is pinned to those values and keeps only the opsz axis, which the browser still sets from the
font size (optical sizing). Glyphs are cut to the Google "latin" + "vietnamese" subsets in one
file, so Vietnamese headings never wait on a second request.

    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python docs/design-system/tools/build-fonts.py

Source fonts (SIL OFL) are downloaded from github.com/google/fonts on first run into tools/.fonts/.
Keep the pinned values in sync with the `localFont` calls in src/app/fonts.ts.
"""
import os
import subprocess

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

TOOLS = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(os.path.dirname(TOOLS)))
CACHE = os.path.join(TOOLS, '.fonts')
OUT = os.path.join(REPO, 'src', 'app', 'fonts')

SOURCES = {
    'normal': 'Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf',
    'italic': 'Fraunces-Italic%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf',
}
FACES = [
    ('fraunces-600.woff2', 'normal', 600),
    ('fraunces-600-italic.woff2', 'italic', 600),
    ('fraunces-400.woff2', 'normal', 400),
    ('fraunces-400-italic.woff2', 'italic', 400),
]
AXES = {'SOFT': 100, 'WONK': 1}

# Google Fonts unicode-range for the "latin" and "vietnamese" subsets.
RANGES = (
    '0000-00FF 0131 0152-0153 02BB-02BC 02C6 02DA 02DC 0304 0308 0329 2000-206F 20AC 2122 2191 2193 '
    '2212 2215 FEFF FFFD 0102-0103 0110-0111 0128-0129 0168-0169 01A0-01A1 01AF-01B0 0300-0301 '
    '0303-0304 0308-0309 0323 1EA0-1EF9 20AB'
)


def source(style):
    path = os.path.join(CACHE, SOURCES[style].replace('%5B', '[').replace('%5D', ']').replace('%2C', ','))
    if not os.path.exists(path):
        os.makedirs(CACHE, exist_ok=True)
        url = f'https://github.com/google/fonts/raw/main/ofl/fraunces/{SOURCES[style]}'
        subprocess.run(['curl', '-sfL', '-o', path, url], check=True)
    return path


def build(name, style, weight):
    font = instancer.instantiateVariableFont(TTFont(source(style)), {**AXES, 'wght': weight})
    options = subset.Options()
    options.layout_features = ['*']
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=subset.parse_unicodes(RANGES))
    subsetter.subset(font)
    font.flavor = 'woff2'
    out = os.path.join(OUT, name)
    font.save(out)
    print(f'{out}  {os.path.getsize(out) / 1024:.1f}KB')


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for face in FACES:
        build(*face)
