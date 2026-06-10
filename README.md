# Velocità — Luxury Car Dealership Landing Page (Demo)

A premium, animation-driven landing page demo for a luxury car dealership,
built with **React**, **Framer Motion** and **Lenis** smooth scrolling.

## Highlights

- **Scroll-driven car assembly** — the centerpiece "Atelier" section shatters a
  Nissan GT-R photograph into 40 fragments that fly back together as you
  scroll, settling into the full car with a gold aura and spec reveal.
- **Cinematic hero** — per-letter masked wordmark reveal, parallax backdrop,
  animated scroll cue.
- **Dark-luxury design system** — near-black palette, gold accents, Playfair
  Display + Manrope typography, film-grain overlay.
- **Curated collection grid** — staggered viewport reveals, hover lift and
  image zoom, spec chips and pricing.
- **Animated stat counters**, infinite brand marquee, parallax CTA banner.
- Responsive down to mobile; respects `prefers-reduced-motion` for ambient
  loops.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static site to dist/
```

Deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages).

## Notes

- Photography is hotlinked from [Unsplash](https://unsplash.com) under the
  Unsplash License. Every image has a graceful dark-gradient fallback, so the
  design holds up even if an image is unavailable.
- All dealership details (name, inventory, prices, contact info) are
  fictional — this is a design demo.
