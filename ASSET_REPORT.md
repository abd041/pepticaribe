# PeptiCaribe — Phase 1 Asset & Product Data Report

Generated: 2026-06-05

## Summary

| Metric | Count |
|--------|-------|
| Total products in catalog | 21 |
| Public products | 13 |
| Private products | 8 |
| Product images imported | 27 |
| Unique image paths mapped | 28 |
| Videos imported | 10 |
| Products with video mapped | 10 |
| COA PDFs available | 0 (all placeholders) |

## Products Imported

### Public (13)

- **Bacteriostatic Water** (`bacteriostatic-water`) — SKU `PC-BAC` — 2 variant(s) — has video
- **GLP-3 RT** (`glp-3-rt`) — SKU `PC-GLP3` — 3 variant(s) — has video
- **GLP-2 T** (`glp-2-t`) — SKU `PC-GLP2` — 2 variant(s) — has video
- **GHK-Cu** (`ghk-cu`) — SKU `PC-GHK` — 2 variant(s) — has video
- **Wolverine** (`bpc-157-tb-500`) — SKU `PC-BPCTB` — 1 variant(s) — has video
- **BPC-157** (`bpc-157`) — SKU `PC-BPC157` — 1 variant(s)
- **MOTS-c** (`mots-c`) — SKU `PC-MOTSC` — 1 variant(s) — has video
- **CJC-1295/Ipamorelin** (`cjc-1295-ipamorelin`) — SKU `PC-CJCIPA` — 1 variant(s) — has video
- **SS-31** (`ss-31`) — SKU `PC-SS31` — 1 variant(s)
- **KPV** (`kpv`) — SKU `PC-KPV` — 1 variant(s)
- **NAD+** (`nad-plus`) — SKU `PC-NAD` — 1 variant(s) — has video
- **Glutathione** (`glutathione`) — SKU `PC-GSH` — 1 variant(s) — has video
- **5-Amino-1MQ** (`5-amino-1mq`) — SKU `PC-5AMQ` — 1 variant(s) — has video

### Private (8)

- **Tesamorelin** (`tesamorelin`) — SKU `PC-TESA` — 1 variant(s)
- **KLOW** (`klow`) — SKU `PC-KLOW` — 1 variant(s)
- **Adamax** (`adamax`) — SKU `PC-ADAMAX` — 1 variant(s)
- **Semax** (`semax`) — SKU `PC-SEMAX` — 1 variant(s)
- **Selank** (`selank`) — SKU `PC-SELANK` — 1 variant(s)
- **Melanotan II** (`melanotan-ii`) — SKU `PC-MT2` — 1 variant(s)
- **DSIP** (`dsip`) — SKU `PC-DSIP` — 1 variant(s)
- **PT-141** (`pt-141`) — SKU `PC-PT141` — 1 variant(s)

## Videos Mapped

- `bacteriostatic-water` → `/videos/bac-water.mp4`
- `glp-3-rt` → `/videos/glp-3-rt.mp4`
- `glp-2-t` → `/videos/glp-2-t.mp4`
- `ghk-cu` → `/videos/ghk-cu.mp4`
- `bpc-157-tb-500` → `/videos/bpc-157-tb-500.mp4`
- `mots-c` → `/videos/mots-c.mp4`
- `cjc-1295-ipamorelin` → `/videos/cjc-1295-ipamorelin.mp4`
- `nad-plus` → `/videos/nad-plus.mp4`
- `glutathione` → `/videos/glutathione.mp4`
- `5-amino-1mq` → `/videos/5-amino-1mq.mp4`

## Missing Videos (11 products)

- `bpc-157` (BPC-157)
- `ss-31` (SS-31)
- `kpv` (KPV)
- `tesamorelin` (Tesamorelin)
- `klow` (KLOW)
- `adamax` (Adamax)
- `semax` (Semax)
- `selank` (Selank)
- `melanotan-ii` (Melanotan II)
- `dsip` (DSIP)
- `pt-141` (PT-141)

## Missing COAs (all 21 products)

All COA paths point to `/coa/placeholders/*.pdf` — no PDF files were provided.

## Unmapped Assets

### Images (1)

- `/products/original.png` — brand/reference asset, not assigned to a product

### Videos

- None — all 10 imported MP4s are mapped

## Image / Variant Mismatches

- **glp-2-t** (PC-GLP2-60): Client doc specifies 60 mg variant; only 30 mg and 40 mg PNGs provided. 60 mg mapped to `glp-2-t-40mg.png` as nearest asset.

## Pricing Notes

- **BAC Water**: No price in client document (pages 20–23). Variants priced at $15 from cart mockup (page 10) — confirm with client.
- **GLP-2 T**: Client doc lists 60 mg at $170; asset folder has 40 mg image instead of 60 mg.

## Bundle Discounts

- **GLP-3 RT (RETA)**: 2 vials 5% · 3 vials 8% · 4 vials 10%
- All other products: no bundle tiers specified in client document
