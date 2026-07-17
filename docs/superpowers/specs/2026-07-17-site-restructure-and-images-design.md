# Design: Site Restructure, Image Concept & Interactive Smart Home Feature

## Context

The hain.it website currently feels "cold" — all text and SVG, no imagery. The site structure has redundancies (home.html and smarthome.html overlap, microsoft.html should be part of consulting). URLs show `.html` extensions. The user wants:
- Folder-based clean URLs (`/business/` instead of `business.html`)
- Consolidated pages (merge home+smarthome, merge microsoft into consulting)
- AI-generated images throughout, with two visual tones (professional vs warm)
- A hero feature: interactive 3D house image with clickable rooms that "light up"

---

## 1. Site Structure

### New File Layout

```
/index.html                    → hain.it/
/business/index.html           → hain.it/business/
/consulting/index.html         → hain.it/consulting/
/development/index.html        → hain.it/development/
/smarthome/index.html          → hain.it/smarthome/
/portfolio/index.html          → hain.it/portfolio/
/portfolio-home/index.html     → hain.it/portfolio-home/
/contact/index.html            → hain.it/contact/
/imprint/index.html            → hain.it/imprint/
/privacy/index.html            → hain.it/privacy/
```

### Pages Removed
- `home.html` — merged into `/smarthome/`
- `microsoft.html` — merged into `/consulting/`

### Header Navigation (updated)

```
[hain.it_]  [Unternehmen ← clickable link to /business/]  |  [Privat ← clickable link to /smarthome/]  [Portfolio ▸]  [Lang] [Theme] [Kontakt]
              hover: Beratung, Entwicklung                    hover: Smart Home              hover: Business, Smart Home
```

- "Unternehmen" / "Business" is itself an `<a>` linking to `/business/`
- "Privat" / "Private" is itself an `<a>` linking to `/smarthome/`
- Portfolio gets a hover-expand showing two sub-links: Business + Smart Home

### Consulting + Microsoft Merge

The consulting page keeps its 6-phase methodology and gains a new section: "Microsoft & Tooling" that covers M365 licensing, Power Platform, Copilot — the content currently on microsoft.html. The M365 cost calculator also moves here.

### Smart Home Merge (home.html + smarthome.html)

Single page with this flow:
1. Hero with interactive 3D house image (the big feature)
2. Benefits (Comfort, Security, Energy)
3. Services/Capabilities (Planning, HA, Automation, Lighting, Security, Energy)
4. Supported brands
5. Process (6 steps)
6. CTA

---

## 2. Image Concept

### Visual Tone Split

| Area | Style | Mood | Colors |
|------|-------|------|--------|
| Business | Illustrative/abstract, clean lines, tech-forward | Professional, structured, competent | Cool blues, teals, dark backgrounds |
| Private/Home | Photorealistic 3D render, warm lighting | Cozy, inviting, personal | Warm amber, soft whites, wood tones |

### Image List & AI Prompts

#### A. Splash Page — Business Panel (left half background)

**Purpose:** Subtle background behind the business text. Semi-transparent overlay.
**Dimensions:** 960x1080 (portrait, half-screen)

**Prompt:**
> Abstract geometric network visualization, dark navy background, floating translucent nodes connected by thin teal-colored lines, subtle data flow particles, minimal and clean, no text, corporate technology aesthetic, soft depth of field, cool blue-teal color palette (#1a6b8a accent), dark moody atmosphere, ultra-wide composition, 8k render

---

#### B. Splash Page — Home Panel (right half background)

**Purpose:** Subtle background behind the home text. Semi-transparent overlay.
**Dimensions:** 960x1080 (portrait, half-screen)

**Prompt:**
> Cozy modern living room at dusk seen through a large window, warm ambient lighting from smart LED strips, soft golden glow, minimalist Scandinavian interior, plants, wooden furniture, smart home tablet on wall showing home controls, evening atmosphere, inviting and personal, shallow depth of field, warm color palette with amber and soft green accents, photorealistic, 8k

---

#### C. Business Landing Hero (`/business/`)

**Dimensions:** 1920x600 (wide banner)

**Prompt:**
> Abstract wide banner, dark background with subtle grid pattern, floating holographic UI elements showing process diagrams and data visualizations, thin glowing teal lines (#1a6b8a), geometric shapes suggesting workflow and automation, clean minimal aesthetic, no text, corporate technology mood, cinematic lighting, ultrawide 32:10 aspect ratio, 8k render

---

#### D. Consulting Page Hero (`/consulting/`)

**Dimensions:** 1920x600 (wide banner)

**Prompt:**
> Abstract visualization of a business process transformation, dark background, left side shows tangled chaotic lines (old processes), transitioning smoothly to right side with clean organized parallel flows, teal accent color (#1a6b8a), subtle nodes and connection points, minimal and elegant, no text, wide cinematic composition, 8k render

---

#### E. Development Page Hero (`/development/`)

**Dimensions:** 1920x600 (wide banner)

**Prompt:**
> Dark abstract code visualization, floating translucent code blocks and API endpoint structures in 3D space, soft teal glow on syntax elements, depth of field, clean dark background with subtle grid, minimal geometric aesthetic suggesting software architecture, no readable text, wide cinematic format, 8k render

---

#### F. Smart Home Page — Interactive 3D House (THE HERO FEATURE)

**Purpose:** This is the centerpiece. A 3D isometric cutaway of a modern house showing rooms. Clickable zones will be overlaid with CSS.
**Dimensions:** 1200x900 (slightly wider than tall)
**CRITICAL:** Needs to be rendered DARK (nighttime, lights off) as the base state. Individual rooms will be "lit up" via CSS overlays.

**Prompt — Base Image (dark/off state):**
> Isometric cutaway view of a modern two-story house at night, all lights off, dark moody atmosphere, you can see inside all rooms: living room, kitchen, bedroom, kids room, bathroom, hallway, utility room in basement. Clean architectural rendering style, minimal furniture visible as dark silhouettes, large windows showing dark blue night sky, concrete and wood materials, Scandinavian modern design, very dark overall with just enough ambient moonlight to see room shapes, no text, high detail architectural visualization, 8k isometric render

**Prompt — Lit Room Overlays (for reference/inspiration, not necessarily generated):**
> Same isometric house view but with warm golden lighting in [ROOM NAME], smart LED strips casting soft amber glow, cozy atmosphere in that specific room while rest stays dark, dramatic contrast between lit and unlit areas

**Note:** For the interactive feature, we generate ONE dark base image. The "lighting" effect is achieved with CSS:
- Transparent colored overlays (`background: radial-gradient(...)`) positioned over each room
- On click/hover: overlay opacity animates from 0 to ~0.6 with warm amber color
- Page background subtly shifts from pure dark to slightly warmer
- Optional: small CSS glow/bloom effect around "lit" room

---

#### G. Smart Home Page — Secondary Images (between sections)

**Prompt — Smart Home Detail (for benefits section):**
> Close-up photorealistic render of a modern smart home wall panel with touch interface showing room controls, warm ambient backlighting, wooden wall texture, cozy evening atmosphere, shallow depth of field, warm color palette, inviting and personal feeling, 8k

---

#### H. Portfolio Pages

**Portfolio Business** uses the same cool-toned abstract style as business pages.
**Portfolio Home** uses warm-toned imagery.

**Prompt — Portfolio Business Hero:**
> Abstract dark technology grid with floating brand logos as subtle geometric shapes, interconnected with thin teal lines, suggesting a technology ecosystem, minimal and clean, dark background, wide format, 8k

**Prompt — Portfolio Home Hero:**
> Cozy bird's-eye view of a smart home living space, warm lighting, visible smart devices (speaker, thermostat, light switch) integrated naturally into beautiful interior design, evening atmosphere, photorealistic, warm amber tones, wide format, 8k

---

## 3. Interactive 3D House Feature (Technical Design)

### Concept
A full-width hero section on `/smarthome/` showing the 3D house image. Overlaid on the image are invisible clickable zones (one per room). Clicking a zone:
1. Adds a warm glow overlay to that room area
2. Shows room info (temperature, devices, status) in a floating tooltip
3. Subtly warms the entire page background (CSS variable transition)
4. Multiple rooms can be lit simultaneously

### Implementation

```
┌─────────────────────────────────────────────┐
│  .house-interactive (position: relative)     │
│                                              │
│  ┌─ img (base dark house render) ──────────┐│
│  │                                          ││
│  │  ┌─ .room-zone (position: absolute) ──┐ ││
│  │  │  clip-path defines room shape       │ ││
│  │  │  background: warm radial gradient   │ ││
│  │  │  opacity: 0 → 0.6 on click         │ ││
│  │  └────────────────────────────────────┘ ││
│  │                                          ││
│  └──────────────────────────────────────────┘│
│                                              │
│  .room-tooltip (appears on click)            │
└─────────────────────────────────────────────┘
```

### Room Zones (positioned as % of image)
Each room gets a `<div>` with:
- `position: absolute; top: X%; left: Y%; width: W%; height: H%`
- `clip-path: polygon(...)` for non-rectangular rooms
- `background: radial-gradient(ellipse, rgba(255,180,50,0.5), transparent)`
- `opacity: 0` by default, `opacity: 1` when `.lit` class is added
- `transition: opacity 0.6s ease`
- `cursor: pointer`

### Page Warmth Effect
```css
:root {
    --page-warmth: 0;
}
.house-interactive[data-lit-count="1"] ~ * { --page-warmth: 0.02; }
.house-interactive[data-lit-count="2"] ~ * { --page-warmth: 0.04; }
/* ... up to all rooms lit */

body {
    background: color-mix(in srgb, var(--bg) calc(100% - var(--page-warmth) * 100%), #2a1a0a calc(var(--page-warmth) * 100%));
}
```

Or simpler: JS toggles a class on `<body>` that transitions background-color.

### Tooltip Content (per room)
Shows: Room name, temperature, number of devices, on/off status of lights.
Data is hardcoded (this is a demo/showcase, not connected to real HA).

---

## 4. Image Format & Integration

- Format: WebP (best size/quality ratio), with PNG fallback
- Loading: `<img loading="lazy">` for below-fold images
- Splash backgrounds: CSS `background-image` with overlay gradient for text readability
- Hero banners: `<img>` in a container with `object-fit: cover`
- 3D House: Single `<img>` with overlay `<div>`s

### Overlay Pattern for Splash
```css
.panel-business {
    background: linear-gradient(rgba(10,10,11,0.7), rgba(10,10,11,0.5)),
                url('images/splash-business.webp') center/cover;
}
.panel-home {
    background: linear-gradient(rgba(10,10,11,0.5), rgba(10,10,11,0.3)),
                url('images/splash-home.webp') center/cover;
}
```

---

## 5. Migration Plan (high level)

1. Create folder structure
2. Move/merge content into new locations
3. Update all internal links (header, footer, breadcrumbs, CTAs)
4. Update deploy workflow (should work as-is since it mirrors the whole directory)
5. Generate images and add to `/images/` directory
6. Build the interactive house feature
7. Test all routes
8. Push & deploy

---

## 6. What's NOT Changing

- Overall dark-first design with light mode option
- GSAP ScrollTrigger animations
- i18n system (CSS-based, already works)
- Color scheme (--accent-business: teal, --accent-home: green)
- Contact form behavior
- Impressum/Datenschutz content (just moves to folders)
