# COQUÍRICO V2 — POLISHED ASSET SET

Web-ready imagery for `v2/coquirico-v2.html`, built by the asset-polish pass.
**53 files · 5.49 MB total · every file ≤ 600 KB · every path below is relative to `v2/`.**

Source files under `coquirico-handoff/` were **read only** — nothing outside `v2/` was created,
modified or overwritten. Verified after the build: zero files in `coquirico-handoff/` have a
modified time from this session.

## How this was made

| Step | Tool | Why |
|---|---|---|
| El Original bottle cutout | **Adobe** `image_remove_background` | The one product shot with no transparent version — it was on white |
| Poster grading (3 posters) | **Adobe** `image_apply_adjustments` (Lab temperature + Camera Raw shadows/highlights) | Lifted shadows + paper-warm temperature, per-image tuned |
| Poster grain | **Adobe** `image_add_grain` (amount 24) | Light film grain |
| Ingredient warmth (4 cutouts) | **Adobe** `image_apply_adjustments` — one identical grade for all four | Matched warmth across the set |
| Label panel cutouts | local (ffmpeg + measured alpha masks) | Needs exact pixel geometry, not AI subject detection |
| Lineup normalisation, crops, resizing, WebP encoding | local (ffmpeg) | Deterministic geometry and encoding |
| Paper texture tile | local (generated, Node) | Procedural seamless noise |

Adobe round-trips used the authenticated Creative Cloud account. Uploaded working copies live in
your Creative Cloud under **`cloud-content/coquirico-v2/`** (7 files) — safe to delete; the finished
assets are all local, in `v2/assets/`.

---

## 1. PRODUCT — the ten-card lineup
`assets/product/` · **all normalised onto one 1080×1446 canvas**

This is the important part: every render was re-seated so the lineup grid lines up.

- All **8 cans** are scaled to an identical can height (**1294 px** on the 2× canvas).
- The **2 bottles** (El Original, Rum Expression) are **1370 px** — deliberately taller, because
  they really are bottles, not cans.
- **Every subject shares one baseline** (subject bottom at y=1389/1446 = 96.1%).
- Subjects are horizontally centred on their own silhouette, not on the old canvas.

So you can drop all ten into one grid with a single `aspect-ratio` and they will look like a
photographed shelf, not ten unrelated crops.

| File | Px | Size | Drink | Tier |
|---|---|---|---|---|
| `coquetearte-can.webp` / `@2x` | 540×723 / 1080×1446 | 43 K / 134 K | Coquetearte | **real** |
| `el-original-bottle-card.webp` / `@2x` | 540×723 / 1080×1446 | 31 K / 83 K | El Original Vegan Coquito | **real** |
| `brisa-de-parcha-can.webp` / `@2x` | 540×723 / 1080×1446 | 42 K / 144 K | Brisa de Parcha | study |
| `guayaba-rosada-can.webp` / `@2x` | 540×723 / 1080×1446 | 39 K / 127 K | Guayaba Rosada | study |
| `cafe-y-canela-can.webp` / `@2x` | 540×723 / 1080×1446 | 51 K / 182 K | Café y Canela | study |
| `flamboyan-at-dusk-can.webp` / `@2x` | 540×723 / 1080×1446 | 55 K / 192 K | Flamboyán at Dusk | artist |
| `rain-on-palm-can.webp` / `@2x` | 540×723 / 1080×1446 | 48 K / 174 K | Rain on Palm | artist |
| `coqui-chorus-can.webp` / `@2x` | 540×723 / 1080×1446 | 42 K / 135 K | Coquí Chorus | artist |
| `caribbean-night-01-can.webp` / `@2x` | 540×723 / 1080×1446 | 49 K / 172 K | Caribbean Night No. 01 | artist |
| `future-rum-bottle.webp` / `@2x` | 540×723 / 1080×1446 | 34 K / 106 K | Rum Expression | **21+ concept** |

**Plus one extra framing:**

| File | Px | Size | What |
|---|---|---|---|
| `el-original-bottle.webp` / `@2x` | 203×691 / 405×1378 | 32 K / 93 K | The same Adobe cutout **trimmed tight** to the bottle. Use when El Original gets its own hero/ritual card rather than a grid cell. |

### Transparency status — asked and answered
The brief asked which renders already had alpha. **Nine of the ten already carried a true alpha
channel** (`yuva420p`, verified per file) and needed no background removal — Coquetearte, all three
flavour studies, all four artist editions, and the rum bottle. **Only El Original was on white**
(`pedro_03.jpg`, near-white studio seamless); that one went through Adobe `image_remove_background`
and came back clean — cork cap and bottle shoulder intact, no halo on cream.

### CSS — the lineup grid
```css
.lineup{ display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:2.5rem 1.5rem; }
.lineup figure{ margin:0; }
.lineup img{
  display:block; width:100%; height:auto;
  aspect-ratio: 1080 / 1446;      /* every product file shares this */
  object-fit: contain;             /* belt-and-braces; sources already match */
}
```
```html
<img src="assets/product/coquetearte-can.webp"
     srcset="assets/product/coquetearte-can.webp 540w,
             assets/product/coquetearte-can@2x.webp 1080w"
     sizes="(max-width:768px) 45vw, 240px"
     width="540" height="723" loading="lazy" decoding="async"
     alt="Coquetearte — Puerto Rican style coconut drink, 8 fl oz can">
```
The **hero** can should drop `loading="lazy"` and use `fetchpriority="high"`.

---

## 2. LABEL ART — the illustration system
`assets/label/`

Cut from `coquirico-handoff/assets/source-photos/pedro_06.jpg` (1536×1024 — the higher-res twin of
`web/label.jpg`). Panel boundaries were **measured off the pixels**, not estimated: the can bodies
run x 41–399 / 461–803 / 861–1188 / 1236–1501, all y 27–1006.

Each panel is a **true-alpha cutout of the can silhouette** — gold bands, rounded shoulders and
silver base included, paper ground removed. They drop straight onto cream with no white box and no
halo, so you do **not** need the `background-position` crop recipes from BRAND-KIT §3.3 (those are
still valid if you'd rather crop in CSS; these are the same panels as real files).

| File | Px (1× / 2×) | Size | What | Use |
|---|---|---|---|---|
| `label-front.webp` / `@2x` | 186×497 / 371×992 | 28 K / 98 K | **Front panel** — gold `COQUÍRICO`, black coquí, `Coquetearte™`, `KEEP REFRIGERATED · NON-ALCOHOLIC` | The "label unrolled" hero column |
| `label-botanical-a.webp` / `@2x` | 170×496 / 340×992 | 27 K / 91 K | **Botanical side A** — big open flamboyán blossom, leafed stem. No type | Tall left column in Story / Serve |
| `label-botanical-b.webp` / `@2x` | 139×496 / 278×992 | 20 K / 71 K | **Botanical side B** — climbing stem, blossoms stepping down. No type | Bleed off a section edge as "art peeking in" |
| `label-back.webp` / `@2x` | 178×497 / 355×992 | 27 K / 87 K | **Back panel** — the quote, `INGREDIENTS:`, full Nutrition Facts, address, barcode | The "what's inside" / facts block |

> **Display size.** The flat label art is ~360 px per panel at source, so **`@2x` is native** and the
> intended display width is the 1× number (≈140–190 px). These are tall decorative columns, not
> full-bleed images. Do not scale them past their 2× width or they will soften.

**Bigger front panel, when you need one:**

| File | Px | Size | What |
|---|---|---|---|
| `label-front-detail.webp` / `@2x` | 710×710 / 1420×1420 | 51 K / 184 K | Square close-up of the front panel **on the actual can** — condensation, gold band, the frog large and crisp. From `assets/label_wrap.jpg` (1500×1509), outer gold border trimmed. Opaque (no alpha) — it is a photograph, so sit it in a card. |

**The brand mark:**

| File | Px | Size | What |
|---|---|---|---|
| `coqui-mark-ink@2x.webp` | 724×711 | 7 K | **The coquí in brand ink `#2a1a0e`, transparent, lossless.** Built from the alpha channel of the gold-foil frog layer, so it is far higher-resolution and cleaner than the ~237 px frog on the flat label. |
| `coqui-mark-ink.webp` | 362×356 | 9 K | 1× |
| `coqui-mark-ink.png` | 724×711 | 22 K | PNG fallback |

```css
/* ink frog on cream — the most "printed matter" mark available */
.coqui-mark{ width:96px; aspect-ratio:724/711; }
```
Recolour it by `filter`, or re-tint from the PNG if you need a different ink.

---

## 3. STORY POSTERS — Adobe-graded
`assets/story/`

Each got: shadows and darks lifted, highlights recovered, a CIELAB paper-warm temperature shift, a
touch of desaturation for calm, and **light film grain (24)**. Grades were tuned per image after
previewing each one — not one preset sprayed across all three.

| File | Px | Size | What | Grade applied |
|---|---|---|---|---|
| `poster-coqui-call.webp` / `@2x` | 960×540 / 1920×1080 | 51 K / 376 K | **The coquí on a wet leaf at night.** Was a near-black, cool, green-cast frame; now open and warm | shadows +34, darks +22, highlights −12, gamma 1.14, sat −6, Lab a+14 b+58 |
| `poster-shoreline-dawn.webp` / `@2x` | 960×640 / 1920×1280 | 130 K / 526 K | **Shoreline at dawn** — sun over the sea, travertine ledge, flamboyán branch. Already warm, so this was calmed rather than warmed | shadows +28, darks +14, highlights −18, gamma 1.05, sat −10, Lab a+8 b+44 |
| `poster-serigraph.webp` / `@2x` | 960×538 / 1300×728 | 143 K / 307 K | **The coquí call as a flat screen-print** — navy ground, cream moon, scarlet flamboyán, two black frogs. The most on-brief image in the project for "on paper" | deliberately light: shadows +18, darks +10, gamma 1.06, Lab a+8 b+40, **no saturation change** so the print palette survives |

> `poster-serigraph@2x` is **1300 px, not 1920** — that is its native width. It was not upscaled.
> The other two are true 1920.

```html
<img src="assets/story/poster-serigraph.webp"
     srcset="assets/story/poster-serigraph.webp 960w,
             assets/story/poster-serigraph@2x.webp 1300w"
     sizes="(max-width:900px) 100vw, 900px"
     width="960" height="538" loading="lazy" decoding="async"
     alt="The coquí call, drawn as a screen print — flamboyán blossoms and a low moon">
```

**Recommendation:** lead the story block with `poster-serigraph` (flat, printed, closest to the
brand's own label art) and use `poster-shoreline-dawn` as the calm full-width band. `poster-coqui-call`
is the photographic option if you want one real photograph in the page.

---

## 4. INGREDIENTS — the "what's inside" strip
`assets/ingredients/` · **all four normalised to 600×600, one scale, one baseline, one warmth**

The brief asked for three; there are **four** real cutouts and Coquetearte's ingredient deck maps to
all four, so all four are here. Drop the fourth if the layout wants three.

Normalisation: each cutout's alpha bounding box was measured, then all four were placed in an
identical 1200×1200 window at a **single uniform scale** (they were authored within 4% of each
other, so no per-image rescaling was needed) with the **subject bottom on a shared baseline**.
Then one identical Adobe grade for all four: shadows +12, darks +6, gamma 1.03, saturation −4,
Lab a+9 b+46. The whites in the coconut now read paper-warm instead of pure white.

| File | Px (1× / 2×) | Size | Shows | Covers (per BRAND-KIT §1.9) |
|---|---|---|---|---|
| `ing-coconut-water-milk.webp` / `@2x` | 300×300 / 600×600 | 17 K / 52 K | Halved coconut + a loose wedge | coconut water **+** coconut milk |
| `ing-cane-sugar-agave.webp` / `@2x` | 300×300 / 600×600 | 21 K / 63 K | Sugar scoop + agave leaf and spoon | cane sugar **+** agave syrup |
| `ing-cinnamon.webp` / `@2x` | 300×300 / 600×600 | 19 K / 63 K | Three cinnamon quills + ground cinnamon | cinnamon |
| `ing-vanilla-extract.webp` / `@2x` | 300×300 / 600×600 | 18 K / 52 K | Vanilla pods + orchid flower | vanilla extract |

```css
.inside{ display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; align-items:end; }
.inside img{ width:100%; height:auto; aspect-ratio:1/1; }   /* baseline already shared in-file */
```
Because the baseline is baked into the images, `align-items:end` is optional — they will sit on the
same line either way.

> **Guardrail:** this strip belongs to **Coquetearte** (and by extension the artist editions, which
> are the same recipe). Do not show it under a flavour study or the rum concept.

---

## 5. PAPER TEXTURE
`assets/tex/` · **512×512, generated, genuinely seamless**

Procedural: five octaves of tiling value noise (lattices wrap modulo their period, so the tile has
no seam by construction) plus per-pixel fibre grain. Amplitude is deliberately tiny — blotches ±3.2
levels, fibre ±2.6 levels out of 255. Verified by tiling 3×3 and stretching contrast ~40×: the
blotches flow continuously across every boundary. See `v2/extras/proof-paper-tile-seamless-40x-contrast.jpg`.

| File | Px | Size | What |
|---|---|---|---|
| `paper-cream-512.webp` | 512×512 | 114 K | **Opaque cream paper**, based on `#f4ead2`. Drop-in page background. |
| `paper-cream-512.png` | 512×512 | 174 K | PNG twin |
| `paper-grain-512.webp` | 512×512 | 216 K | **Neutral grain overlay** — transparent, carries only the texture. Lay over *any* colour. |
| `paper-grain-512.png` | 512×512 | 290 K | PNG twin |

```css
/* (a) the whole page as cream paper */
body{ background:#f4ead2 url("assets/tex/paper-cream-512.webp") repeat; }

/* (b) grain over an arbitrary colour — works on the dark After-Dark band too */
.paper{ position:relative; }
.paper::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background:url("assets/tex/paper-grain-512.webp") repeat;
  opacity:.5; mix-blend-mode:multiply;
}
@media (prefers-reduced-motion:no-preference){ /* nothing animates — texture is static */ }
```
Use **one** of (a) or (b), not both. If the scout's CSS-noise fallback is already in the page,
prefer this tile — it is real paper grain rather than a repeating SVG feTurbulence, and at 114 KB
it caches once for the whole site.

---

## 6. PROOF SHEETS
`v2/extras/` — rendered composites, for eyes-on checking (not for the page):

| File | Shows |
|---|---|
| `proof-lineup-10up.jpg` | All ten products on a shared baseline with a rule drawn at the baseline |
| `proof-ingredients-baseline.jpg` | The four graded ingredient cutouts on cream |
| `proof-posters-and-label-panels.jpg` | The three graded posters + the four label panels on cream |
| `proof-frog-mark-and-cards.jpg` | The ink coquí mark, two cans, and both El Original framings at card size |
| `proof-paper-tile-seamless-40x-contrast.jpg` | The paper tile 3×3 at ~40× contrast — the seamlessness test |

---

## 7. NOTES FOR THE INTEGRATOR

1. **Paths.** Everything is under `v2/assets/…`, so from `v2/coquirico-v2.html` the `src` is
   `assets/product/coquetearte-can.webp` — no `../coquirico-handoff/` traversal. That makes `v2/`
   self-contained and portable (`make-portable.mjs` will inline these fine).
2. **One aspect ratio for all ten products:** `1080 / 1446`. Set it on the `<img>` and the grid can
   never jump during load. Always ship `width`/`height` attributes.
3. **WebP only.** Every deliverable is WebP except three PNG fallbacks (`coqui-mark-ink.png`,
   `paper-cream-512.png`, `paper-grain-512.png`). WebP is supported everywhere V2 targets; the PNGs
   are there if a build step needs them.
4. **Page weight.** If you use the full set — 10 lineup cards at 1×, 4 ingredients at 1×, 4 label
   panels at 1×, one poster at 2×, the paper tile — you land around **1.4 MB**, well inside budget.
   Only load `@2x` via `srcset` so 1× screens never fetch it.
5. **Do not re-grade.** The posters and ingredients already carry their grade and grain. Stacking a
   CSS `filter: sepia()` or `brightness()` on top will muddy them.
6. **Guardrails these files must respect:**
   - `el-original-bottle*` is the **one real product containing alcohol** — never let a blanket
     "zero alcohol" line sit over it. Its own line: *750 mL bottle made with coconut and white rum.*
   - `future-rum-bottle` is a **21+ concept** — no recipe, no date, no ingredient strip.
   - `brisa-de-parcha`, `guayaba-rosada`, `cafe-y-canela` are **flavour studies — imagined, not
     bottled.** No ingredient strip, no formula.
   - The four artist editions **are** the real Coquetearte, different art — the ingredient strip is
     valid for them.
   - No prices, no cart. Footer: *Concept site — presentation only.*
