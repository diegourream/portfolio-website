# DUM Website Map & Architecture
This file serves as a blueprint for the personal portfolio of **Diego Urrea Méndez (DUM)**. It maps the directory structure, page layouts, design system, and key interactive scripts across the codebase.

---

## 1. Directory Tree & Routes

*   `/index.html` (Home / **Research & Publications** page)
*   `/diego-urrea.jpg` (Primary profile photo)
*   `/about/`
    *   `/about/index.html` (**About Me** page)
    *   `/about/CV_Diego_Urrea.pdf` (Predoctoral CV)
    *   `/about/diego-urrea.jpg` (About page portrait)
    *   `/about/mountain-river.jpg` (Hero background image)
    *   `/about/screen.png` (Reference UI layout)
    *   *Academic/Paper cover figures:* `compound-events.png`, `inundacion_santoña.png`, `multivariate-analysis.png`, `non-stationary-analysis.png`
*   `/tutorials/`
    *   `/tutorials/index.html` (**Tutorials** listing page)
    *   `/tutorials/copula-conceptual/index.html` (Interactive Copula Tutorial)
    *   `/tutorials/copula-notebook/index.html` (Jupyter notebook tutorial view)
*   `/articles/`
    *   `/articles/extreme-rainfall/index.html` (**Blog** post page: "The End of Stationarity")

---

## 2. Design System & Style Tokens

The site utilizes Tailwind CSS loaded via CDN (`https://cdn.tailwindcss.com`) with a customized theme config:

### Tailwind Theme Config (`tailwind.config`)
*   **Background Theme:** Dark Mode (`class="dark"` is active on `<html/>`).
*   **Key Colors:**
    *   `background` & `surface`: `#0a1628` (Deep Navy)
    *   `surface-container-lowest`: `#050d18` / `#030e20` (Very Dark Solid Navy for solid blocks)
    *   `primary`: `#58a6ff` (Light Blue)
    *   `secondary`: `#8b5cf6` (Purple)
    *   `on-surface`: `#d7e3fc` (Whitish blue for readable body texts)
*   **Typography:**
    *   `font-headline` & `font-label`: **Space Grotesk** (Geometrical sans-serif for headings, metrics, buttons)
    *   `font-body`: **Inter** (highly readable sans-serif for descriptions, biographies, text blocks)
    *   `font-mono`: **JetBrains Mono** (monospace font for dates, technical banners, citation modals)
*   **Rounded Borders:** `rounded-sm` (0.125rem) default for buttons and cards to give a modern, blocky tech aesthetic.

---

## 3. Page Layout Maps

### A. Home (`/index.html`)
1.  **Top Navigation:** Fixed glassmorphism bar with links `[About, Research (active), Tutorials, Blog]` + `[Contact]` button.
2.  **Hero Section:** High-resolution header with a gradient background, introducing the portfolio.
3.  **Research Lines Section:** 4 cards highlighting scientific focuses (Extreme Events, Multivariate, Non-Stationary, Compound Events).
4.  **Latest Publications Section:** 3 featured papers with cover images and DOI links.
5.  **Complete Archive Section:** Bibliography list filtered dynamically by category (Journal, Preprint) and year (2026-2023).
6.  **BibTeX Modal Overlay:** Pop-up displaying pre-formatted BibTeX citations with a `Copy Citation` clipboard script.

### B. About Me (`/about/index.html`)
1.  **Hero Section:** Centered portrait header displaying credentials, download links for the CV, and 5 square rounded SVG buttons for social networks (LinkedIn, X, ResearchGate, GitHub, ORCID).
2.  **About Me Bio Section:** Portrait photo on the left, a solid, high-readability biography text box on the right. 3 solid metrics cards at the bottom (Years Experience, Publications, Projects).
3.  **Core Research Capabilities Section (Methodological):** 4 solid cards detailing scientific expertise (Climate Projections & EVT, Multivariate risk, Bayesian ML & GPR, Catchment GIS analysis).
4.  **Computation & AI Toolkit Section (Software):** 5-card grid with high-fidelity branding SVGs (Python, R, Julia, QGIS/PostGIS, Claude/Gemini) detailing day-to-day scientific tasks. AI assistants spans 2 columns at the bottom.
5.  **Academic Journey Section:** Vertical interactive timeline with milestones (IHCantabria, MSc Universidad de Cantabria, Consultant).
6.  **Explore Research / Collaboration CTAs**

### C. Tutorials (`/tutorials/index.html`)
1.  **Header:** Introduction to tutorials.
2.  **Tutorials Grid:** Interactive cards (Copula Modeling, Extreme Value Theory, Flood Mapping).
3.  **Beta Subscription:** Subscription form card with a fluid dynamics image overlay.

### D. Blog Article (`/articles/extreme-rainfall/index.html`)
1.  **Article Hero:** Large, gathering storm image header with article title.
2.  **Reading Flow Layout:** 2-column layout on desktop: Left spans the reading progress indicator and main text; Right displays the author profile card (Diego Urrea Méndez) and table of contents.

---

## 4. Shared Core Scripts

All pages load these scripts in their `<footer/>` or `<head/>` blocks:

### 🌟 Constellation Particle System (`#fluid-canvas`)
A fixed background canvas (`z-[1]`, `pointer-events-none`) that draws floating dots.
*   **Interaction:** If the mouse moves inside the window, particles are gently attracted to the coordinates.
*   **Connections:** Lines are drawn automatically between particles that are closer than `120px` (light blue) and connecting to the cursor coordinate (light purple).
*   **Contrast Safeguard:** Content sections use `z-10` and solid dark backgrounds (`#030e20`) to cover the canvas behind readability boxes so text remains 100% legible.

### ⚡ Lightning Flash Effect (`#lightning`)
A full-screen overlay that flashes with an opacity of 1 at random intervals (triggered with a `setInterval` checking `Math.random() > 0.94` every 3 seconds) to simulate storm flashes.

### 🌀 Scroll Reveal Observer (`.reveal-element`)
An Intersection Observer script that detects scroll positions:
*   Adds the `.revealed` class to elements entering the viewport, triggering CSS transitions.
*   Classes `reveal-delayed-1` to `reveal-delayed-4` add transition delays for sequential elements.
