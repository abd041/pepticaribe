# PeptiCaribe — Product Data Audit

**Source:** `src/data/products.ts`  
**Generated:** 2026-06-05  
**Result:** ✅ ALL CHECKS PASSED

---

## Summary

| Metric | Value |
|--------|-------|
| Total products | 21 |
| Public products | 13 |
| Private products | 8 |
| Total variants | 26 |
| Parent SKUs | 21 |
| Variant SKUs | 26 |
| Total SKUs (parent + variant) | 47 |

---

## Verification Checks

| Check | Status | Details |
|-------|--------|---------|
| All 21 products present | ✅ Pass | 21 products |
| Unique product IDs | ✅ Pass | 21 IDs, all unique |
| Unique product slugs | ✅ Pass | 21 slugs, all unique |
| Unique SKUs (parent + variant) | ✅ Pass | 47 SKUs, all unique |
| Unique variant IDs | ✅ Pass | 26 variant IDs, all unique |
| Every public product has hero image | ✅ Pass | 13/13 public products have images |
| Every product has description | ✅ Pass | 21/21 have descriptions |
| Every variant has pricing (> 0) | ✅ Pass | 26/26 variants priced |
| No duplicate products (name + parent SKU) | ✅ Pass | No duplicates |
| All products have ≥ 1 variant | ✅ Pass | 21/21 have variants |

---

## Product Inventory

| # | ID | Slug | Display Name | Parent SKU | Private | Variants | Hero Image | Video | Description |
|---|-----|------|--------------|------------|---------|----------|------------|-------|-------------|
| 1 | `bac-water` | `bacteriostatic-water` | Bacteriostatic Water | `PC-BAC` | No | 2 | `/products/bac-water.png` | `/videos/bac-water.mp4` | 268 chars |
| 2 | `reta-glp-3` | `glp-3-rt` | GLP-3 RT | `PC-GLP3` | No | 3 | `/products/glp-3-rt-30mg.png` | `/videos/glp-3-rt.mp4` | 283 chars |
| 3 | `glp-2-t` | `glp-2-t` | GLP-2 T | `PC-GLP2` | No | 2 | `/products/glp-2-t-30mg.png` | `/videos/glp-2-t.mp4` | 268 chars |
| 4 | `ghk-cu` | `ghk-cu` | GHK-Cu | `PC-GHK` | No | 2 | `/products/ghk-cu-50mg.png` | `/videos/ghk-cu.mp4` | 262 chars |
| 5 | `bpc-157-tb-500` | `bpc-157-tb-500` | Wolverine | `PC-BPCTB` | No | 1 | `/products/bpc-157-tb-500.png` | `/videos/bpc-157-tb-500.mp4` | 268 chars |
| 6 | `bpc-157` | `bpc-157` | BPC-157 | `PC-BPC157` | No | 1 | `/products/bpc-157.png` | — | 244 chars |
| 7 | `mots-c` | `mots-c` | MOTS-c | `PC-MOTSC` | No | 1 | `/products/mots-c.png` | `/videos/mots-c.mp4` | 228 chars |
| 8 | `cjc-1295-ipamorelin` | `cjc-1295-ipamorelin` | CJC-1295/Ipamorelin | `PC-CJCIPA` | No | 1 | `/products/cjc-1295-ipamorelin.png` | `/videos/cjc-1295-ipamorelin.mp4` | 268 chars |
| 9 | `ss-31` | `ss-31` | SS-31 | `PC-SS31` | No | 1 | `/products/ss-31.png` | — | 256 chars |
| 10 | `kpv` | `kpv` | KPV | `PC-KPV` | No | 1 | `/products/kpv.png` | — | 244 chars |
| 11 | `nad-plus` | `nad-plus` | NAD+ | `PC-NAD` | No | 1 | `/products/nad-plus.png` | `/videos/nad-plus.mp4` | 268 chars |
| 12 | `glutathione` | `glutathione` | Glutathione | `PC-GSH` | No | 1 | `/products/glutathione.png` | `/videos/glutathione.mp4` | 244 chars |
| 13 | `5-amino-1mq` | `5-amino-1mq` | 5-Amino-1MQ | `PC-5AMQ` | No | 1 | `/products/5-amino-1mq.png` | `/videos/5-amino-1mq.mp4` | 268 chars |
| 14 | `tesamorelin` | `tesamorelin` | Tesamorelin | `PC-TESA` | Yes | 1 | `/products/tesamorelin.png` | — | 244 chars |
| 15 | `klow` | `klow` | KLOW | `PC-KLOW` | Yes | 1 | `/products/klow.png` | — | 232 chars |
| 16 | `adamax` | `adamax` | Adamax | `PC-ADAMAX` | Yes | 1 | `/products/adamax.png` | — | 268 chars |
| 17 | `semax` | `semax` | Semax | `PC-SEMAX` | Yes | 1 | `/products/semax.png` | — | 256 chars |
| 18 | `selank` | `selank` | Selank | `PC-SELANK` | Yes | 1 | `/products/selank.png` | — | 244 chars |
| 19 | `melanotan-ii` | `melanotan-ii` | Melanotan II | `PC-MT2` | Yes | 1 | `/products/melanotan-ii.png` | — | 256 chars |
| 20 | `dsip` | `dsip` | DSIP | `PC-DSIP` | Yes | 1 | `/products/dsip.png` | — | 232 chars |
| 21 | `pt-141` | `pt-141` | PT-141 | `PC-PT141` | Yes | 1 | `/products/pt-141.png` | — | 256 chars |

---

## Variant Pricing

| Product Slug | Variant ID | Variant SKU | Size | Price | Image |
|--------------|------------|-------------|------|-------|-------|
| `bacteriostatic-water` | `bac-water-3ml` | `PC-BAC-3ML` | 3 ml | $15 | `/products/bac-water.png` |
| `bacteriostatic-water` | `bac-water-10ml` | `PC-BAC-10ML` | 10 ml | $15 | `/products/bac-water-30ml.png` |
| `glp-3-rt` | `glp-3-rt-10mg` | `PC-GLP3-10` | 10 mg | $90 | `/products/glp-3-rt-10mg.png` |
| `glp-3-rt` | `glp-3-rt-20mg` | `PC-GLP3-20` | 20 mg | $130 | `/products/glp-3-rt-20mg.png` |
| `glp-3-rt` | `glp-3-rt-30mg` | `PC-GLP3-30` | 30 mg | $170 | `/products/glp-3-rt-30mg.png` |
| `glp-2-t` | `glp-2-t-30mg` | `PC-GLP2-30` | 30 mg | $110 | `/products/glp-2-t-30mg.png` |
| `glp-2-t` | `glp-2-t-60mg` | `PC-GLP2-60` | 60 mg | $170 | `/products/glp-2-t-40mg.png` |
| `ghk-cu` | `ghk-cu-50mg` | `PC-GHK-50` | 50 mg | $35 | `/products/ghk-cu-50mg.png` |
| `ghk-cu` | `ghk-cu-100mg` | `PC-GHK-100` | 100 mg | $45 | `/products/ghk-cu-100mg.png` |
| `bpc-157-tb-500` | `bpc-157-tb-500-5mg` | `PC-BPCTB-55` | 5/5 mg | $50 | `/products/bpc-157-tb-500.png` |
| `bpc-157` | `bpc-157-standard` | `PC-BPC157-STD` | Standard | $40 | `/products/bpc-157.png` |
| `mots-c` | `mots-c-10mg` | `PC-MOTSC-10` | 10 mg | $50 | `/products/mots-c.png` |
| `cjc-1295-ipamorelin` | `cjc-1295-ipamorelin-55mg` | `PC-CJCIPA-55` | 5/5 mg | $60 | `/products/cjc-1295-ipamorelin.png` |
| `ss-31` | `ss-31-10mg` | `PC-SS31-10` | 10 mg | $50 | `/products/ss-31.png` |
| `kpv` | `kpv-10mg` | `PC-KPV-10` | 10 mg | $50 | `/products/kpv.png` |
| `nad-plus` | `nad-plus-500mg` | `PC-NAD-500` | 500 mg | $60 | `/products/nad-plus.png` |
| `glutathione` | `glutathione-1500mg` | `PC-GSH-1500` | 1500 mg | $60 | `/products/glutathione.png` |
| `5-amino-1mq` | `5-amino-1mq-50mg` | `PC-5AMQ-50` | 50 mg | $70 | `/products/5-amino-1mq.png` |
| `tesamorelin` | `tesamorelin-10mg` | `PC-TESA-10` | 10 mg | $70 | `/products/tesamorelin.png` |
| `klow` | `klow-80mg` | `PC-KLOW-80` | 80 mg | $100 | `/products/klow.png` |
| `adamax` | `adamax-10mg` | `PC-ADAMAX-10` | 10 mg | $70 | `/products/adamax.png` |
| `semax` | `semax-10mg` | `PC-SEMAX-10` | 10 mg | $40 | `/products/semax.png` |
| `selank` | `selank-10mg` | `PC-SELANK-10` | 10 mg | $40 | `/products/selank.png` |
| `melanotan-ii` | `melanotan-ii-10mg` | `PC-MT2-10` | 10 mg | $40 | `/products/melanotan-ii.png` |
| `dsip` | `dsip-10mg` | `PC-DSIP-10` | 10 mg | $50 | `/products/dsip.png` |
| `pt-141` | `pt-141-10mg` | `PC-PT141-10` | 10 mg | $40 | `/products/pt-141.png` |

---

## SKU Registry (47 total)

### Parent SKUs (21)

- `PC-BAC`
- `PC-GLP3`
- `PC-GLP2`
- `PC-GHK`
- `PC-BPCTB`
- `PC-BPC157`
- `PC-MOTSC`
- `PC-CJCIPA`
- `PC-SS31`
- `PC-KPV`
- `PC-NAD`
- `PC-GSH`
- `PC-5AMQ`
- `PC-TESA`
- `PC-KLOW`
- `PC-ADAMAX`
- `PC-SEMAX`
- `PC-SELANK`
- `PC-MT2`
- `PC-DSIP`
- `PC-PT141`

### Variant SKUs (26)

- `PC-BAC-3ML`
- `PC-BAC-10ML`
- `PC-GLP3-10`
- `PC-GLP3-20`
- `PC-GLP3-30`
- `PC-GLP2-30`
- `PC-GLP2-60`
- `PC-GHK-50`
- `PC-GHK-100`
- `PC-BPCTB-55`
- `PC-BPC157-STD`
- `PC-MOTSC-10`
- `PC-CJCIPA-55`
- `PC-SS31-10`
- `PC-KPV-10`
- `PC-NAD-500`
- `PC-GSH-1500`
- `PC-5AMQ-50`
- `PC-TESA-10`
- `PC-KLOW-80`
- `PC-ADAMAX-10`
- `PC-SEMAX-10`
- `PC-SELANK-10`
- `PC-MT2-10`
- `PC-DSIP-10`
- `PC-PT141-10`

---

## ID Registry (21)

- `bac-water`
- `reta-glp-3`
- `glp-2-t`
- `ghk-cu`
- `bpc-157-tb-500`
- `bpc-157`
- `mots-c`
- `cjc-1295-ipamorelin`
- `ss-31`
- `kpv`
- `nad-plus`
- `glutathione`
- `5-amino-1mq`
- `tesamorelin`
- `klow`
- `adamax`
- `semax`
- `selank`
- `melanotan-ii`
- `dsip`
- `pt-141`

---

## Slug Registry (21)

- `bacteriostatic-water`
- `glp-3-rt`
- `glp-2-t`
- `ghk-cu`
- `bpc-157-tb-500`
- `bpc-157`
- `mots-c`
- `cjc-1295-ipamorelin`
- `ss-31`
- `kpv`
- `nad-plus`
- `glutathione`
- `5-amino-1mq`
- `tesamorelin`
- `klow`
- `adamax`
- `semax`
- `selank`
- `melanotan-ii`
- `dsip`
- `pt-141`

---

## Duplicate Analysis

| Field | Total | Unique | Duplicates |
|-------|-------|--------|------------|
| Product `id` | 21 | 21 | None |
| Product `slug` | 21 | 21 | None |
| Parent `sku` | 21 | 21 | None |
| Variant `id` | 26 | 26 | None |
| Variant `sku` | 26 | 26 | None |
| Combined SKUs | 47 | 47 | None |
| `name` + `sku` pairs | 21 | 21 | None |

**No duplicate products exist.**

---

## Data Quality Notes

| Note | Severity |
|------|----------|
| BAC Water pricing ($15) from cart mockup (page 10), not pricing doc (pages 20–23) | ⚠️ Review with client |
| GLP-2 T 60 mg variant uses `glp-2-t-40mg.png` — no 60 mg image asset provided | ⚠️ Asset gap |
| All COA paths are placeholders — no PDFs on disk | ℹ️ Expected |
| `original.png` imported but not referenced in catalog | ℹ️ Unmapped brand asset |
| Only GLP-3 RT has bundle discount tiers defined in client doc | ℹ️ By design |

---

## Audit Method

Checks performed by programmatic inspection of `src/data/products.ts`:

1. Collected all `id`, `slug`, `sku` (parent + variant), and `variant.id` values
2. Ran duplicate detection on each field
3. Verified every public product (`isPrivate: false`) has non-empty `image`
4. Verified every product has non-empty `description`
5. Verified every variant has `price > 0`
6. Verified composite key `name|sku` has no collisions
7. Verified every product has `variants.length >= 1`

**Re-run audit:** `npx tsx scripts/audit-products.mjs`
