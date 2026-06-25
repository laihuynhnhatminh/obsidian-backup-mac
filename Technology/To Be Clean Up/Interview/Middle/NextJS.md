<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/Middle/index|← Middle]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


### You mentioned using both SSG and SSR in the same project. Walk me through how you decided which pages got which strategy — and was there a case where you made the wrong call initially?

#### What a strong answer looks like

- SSG for marketing/static pages (game landing pages, about, FAQs) — content changes rarely, CDN-cacheable
- SSR for personalized or frequently changing pages (user dashboard, live game status, inventory)
- ISR (Incremental Static Regeneration) for content updated periodically (game leaderboards, news) — this is the nuanced middle ground
- Mentions trade-offs: SSR adds server latency per request, SSG adds build time for large sites

Strong signal: candidate mentions ISR unprompted, or brings up stale-while-revalidate semantics. Shows depth beyond just SSG vs SSR binary thinking.

Red flag: vague answer like "we used SSR for dynamic pages" with no concrete reasoning or trade-off awareness.

---
### How did you handle code splitting and dynamic imports specifically for game assets? What's the difference between Next.js automatic code splitting and manually using `next/dynamic`?

#### What a strong answer looks like

- Next.js splits per-page automatically at the route level — each page is its own JS chunk
- `next/dynamic` is for component-level splitting within a page — e.g., lazy-loading a heavy game trailer component only when it enters the viewport
- Mentions `{ ssr: false }` for browser-only components (canvas, WebGL game embeds)
- May mention `loading` prop for skeleton UI during lazy load
- Bonus: awareness that `next/dynamic` wraps React's `Suspense` under the hood in Next.js 13+

Red flag: candidate can only describe one of the two, or conflates them. At mid/senior level they should know the granularity difference.

---
### You have a game listing page with 500+ games, each with images and metadata. Build time is getting too slow with SSG. What are your options and how do you choose?

#### Expected reasoning path

- **ISR with `revalidate`**: build a subset (most popular), generate the rest on-demand — best for content that changes but not in real-time
- **`fallback: 'blocking'` or `'true'` in `getStaticPaths`**: defer generation of less popular pages
- **SSR as escape hatch**: if freshness matters more than caching, accept the trade-off
- May mention parallel build workers, or splitting the build (App Router parallel routes)

Strong signal: candidate asks clarifying questions — "how often does game metadata change?" and "how important is cold-start latency?" — before jumping to a solution. Shows systems thinking.

Red flag: immediately says "just use SSR" without discussing why ISR would be better for CDN caching and SEO.

--- 
### You mentioned handling complex animations for gaming. How do you prevent animation work from hurting your Core Web Vitals, particularly CLS and INP?

#### What a strong answer looks like

- **CLS**: always reserve space for animated elements (explicit width/height or aspect-ratio), avoid injecting content above existing DOM, use `transform`/`opacity` which don't cause layout shifts
- **INP**: keep animation work off the main thread — use CSS animations over JS where possible, or Web Animations API; avoid long JS tasks during user interaction
- May mention `will-change: transform` to promote layers to GPU (but note the memory trade-off)
- Mentions checking with DevTools Performance panel or Chrome's INP debugger

Red flag: only mentions "use CSS instead of JS animations" without showing understanding of why (compositor thread vs main thread).