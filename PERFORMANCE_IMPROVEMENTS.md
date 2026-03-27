# Performance Optimization Log - MovieMate

This document tracks what performance issues existed, what was improved, and what to measure next.
Use this as evidence for resume/CV and as a running optimization history.

---

## 1) Baseline (Before Optimizations)

- Lighthouse desktop performance score was around **76**.
- React Profiler showed heavy re-renders in `Home` search flow:
  - `Home` render around **18.2ms** in a profiled commit.
  - Multiple `Link` children re-rendering because parent search state changed frequently.
- Non-critical images were loading without a clear lazy-loading strategy.
- Local hero/banner assets were partially unoptimized (JPG still used in critical places).
- Deployment cache strategy was not explicitly configured.

---

## 2) Implemented Improvements

### A. Rendering and Search Flow Optimizations

#### What was happening earlier
- `Home` used both:
  - `searchText`
  - `fetchSearchResult` (boolean toggle)
- Typing triggered extra state transitions (`false -> true`) along with text updates.
- This caused unnecessary re-renders in list-heavy UI.

#### What was changed
- Refactored `Home` search trigger to use:
  - `searchText` (immediate input)
  - `debouncedSearchText` (set after 600ms pause)
- Removed `fetchSearchResult` state and manual debounce wrapper logic.
- Search API call now depends on `debouncedSearchText` only.

#### Result
- React Profiler showed major improvement:
  - `Home` render reduced from about **18.2ms** to about **1.8ms** in sampled commits.
  - Commit render duration observed around ~**2.2ms**.

---

### B. Lazy-load Non-Critical Images

#### What was changed
- Added `loading="lazy"` and `decoding="async"` to non-critical images in:
  - `src/pages/About.jsx`
  - `src/pages/List.jsx`
  - `src/components/ui/DataCarousel.jsx`
  - Search result images in `src/pages/Home.jsx`

#### Critical image handling
- Kept homepage hero image eager:
  - `loading="eager"`
  - `fetchPriority="high"`
  - `decoding="async"`

---

### C. Local Hero/Banner Image Optimization

#### What was changed
- Moved key local visuals to WebP usage:
  - Header banner: `/header-background.webp`
  - About page image: `/about-movie-zone.webp`
  - Home hero: `/background.webp`

---

### D. Preload Critical Hero Image

#### What was changed
- Added preload hint in `index.html` for homepage hero:
  - `<link rel="preload" as="image" href="/background.jpg" fetchpriority="high" />`

> Note: now that Home uses `/background.webp`, update preload to `/background.webp` for best alignment.

---

### E. Reduce Paint-Heavy Effects in Repeated Items

#### What was changed
- Removed per-item JS animation (`motion`) from search result list items.
- Replaced with lightweight Tailwind CSS transitions on hover:
  - subtle shadow
  - small translateX effect
- Kept visual polish while reducing runtime animation overhead on repeated rows.

---

### F. Smooth TV Fetch on Scroll (Reliability + Performance)

#### What was happening earlier
- TV list loading depended on `scrollY` checks + throttling + `sessionStorage` gating.
- In practice this could miss the threshold, requiring users to scroll up/down multiple times before the TV API call triggered.

#### What was changed
- Replaced the scroll listener with an `IntersectionObserver` watching a small "sentinel" element placed just before the TV section.
- When the sentinel comes near the viewport, we fetch the TV list once and disconnect the observer.

#### Why this is better
- More reliable than scroll events (no threshold misses).
- Cheaper than continuous scroll listeners (browser handles it efficiently).
- Fetch happens slightly before the user reaches the section (`rootMargin`) for smoother UX.

---

### G. Deployment Caching Strategy (Netlify Free)

#### What was changed
- Added `public/_headers` with cache rules:
  - long immutable cache for hashed/static assets
  - revalidation for `index.html`
  - basic security headers

---

## 3) Current Measurable Wins

- React Profiler:
  - `Home` render reduced from ~**18.2ms** to ~**1.8ms** (sampled profile comparison).
- Re-render pressure during search typing reduced by removing redundant state toggles.
- Image loading strategy improved for non-critical content and critical LCP candidate image.
- Production deployment now has explicit cache strategy via Netlify headers.

---

## 4) CV/Resume Bullet Drafts

- Improved React search-page rendering performance by refactoring debounced state flow, reducing profiled `Home` render time from ~18ms to ~2ms.
- Optimized media loading by implementing lazy-loading for non-critical images and prioritizing critical hero image delivery.
- Implemented static asset caching strategy for Netlify deployments using custom `_headers` rules to improve repeat-load performance.
- Reduced list UI render overhead by replacing per-item JS animations with lightweight CSS transitions.

---

## 5) Next Steps (Future Updates)

Use this section to keep updating performance work.

### Pending high-value tasks
- [ ] Keep `index.html` preload `href` aligned with the actual LCP hero (e.g. `/background-1920.webp`).
- [ ] Remove unused JPG assets from `public/` if no longer needed.
- [ ] Capture before/after Lighthouse metrics in a consistent table (3-run average).
- [ ] Add CLS-focused image dimensions/aspect-ratio checks for all major images.
- [ ] Re-profile `List` and `Details` interactions after further UI polish.

### Suggested measurement template

| Metric | Before | After | Notes |
|---|---:|---:|---|
| Lighthouse Performance (Desktop) | 76 | TBD | Average of 3 runs |
| LCP | TBD | TBD | |
| TBT | TBD | TBD | |
| CLS | TBD | TBD | |
| Home render time (Profiler) | ~18.2ms | ~1.8ms | Search interaction |

---

## 6) Update Rules for This Document

When adding new optimization work:
1. Add what issue existed.
2. Add what exact change was made (file/component level).
3. Add measurable evidence (Profiler/Lighthouse/build output).
4. Add a short CV-ready bullet if impact is meaningful.

