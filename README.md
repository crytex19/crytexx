# Bon Appétit — Next.js site

A full rebuild of the static `bonappetit-site` HTML/CSS/JS site as a deployable
Next.js 16 (App Router) + TypeScript project. Same look, same animations
(GSAP + Lenis), same booking form — now componentized and driven by one config file.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize everything from one file

**[lib/config.ts](lib/config.ts)** is the single source of truth for all copy:
business info, hero text, about paragraph, team bios, services, the full
gallery manifest, FAQ, and booking-form options. Edit values there — no need
to touch any component.

A few fields are still placeholders (search for `TODO` in the file) and should
be filled in before launch:

- `business.email` — used in the LocalBusiness JSON-LD schema
- `business.yearsInBusiness`, `business.eventsCompleted`, `business.serviceAreaDetail`
- `business.formEndpoint` — your real [Formspree](https://formspree.io) form ID (or swap for any endpoint that accepts a `POST` with `FormData`)
- `testimonials` — currently empty; add quotes to bring the testimonial slider back

Everything else (FAQ answers, team bios, the 88-image gallery, all 12
services) was carried over from the original site content as-is.

## Project structure

```
app/                Root layout, global styles, the single page route
components/         One component per section (Nav, Hero, Gallery, BookingForm, ...)
lib/config.ts        All editable content
public/assets/       The 88 photos from the original site
```

- `components/MotionSystem.tsx` — ports the original scroll animations (mask
  reveals, parallax, clip-reveals, magnetic cursor, tilt cards) using the
  same GSAP + ScrollTrigger + Lenis stack, now as npm packages instead of CDN scripts.
- `components/Gallery.tsx` — curated preview grid, "View All" modal, and a
  shared lightbox with keyboard + swipe navigation.
- `components/BookingForm.tsx` — the 5-step booking wizard: localStorage
  draft persistence, honeypot + timing spam check, WhatsApp deep-link handoff
  on submit, and a background POST to `formEndpoint`.

## Deploy

The easiest path is [Vercel](https://vercel.com) (made by the Next.js team):

```bash
npx vercel
```

Or build and self-host anywhere that runs Node:

```bash
npm run build
npm run start
```

Any other Next.js-compatible host (Netlify, Cloudflare, Railway, etc.) works too.
