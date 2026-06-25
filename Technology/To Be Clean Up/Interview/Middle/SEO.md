<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/Middle/index|← Middle]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


### Your Lighthouse LCP score was poor on a page with a large hero game banner. Walk me through exactly how you diagnosed and fixed it.

#### Diagnostic steps a senior should mention

- Use Chrome DevTools Performance or WebPageTest to identify the LCP element and its delay breakdown (TTFB, resource load delay, render delay)
- Check if the image was in the initial HTML or injected by JS (JS-injected images can't be preloaded effectively)
- Check if the hero image had `loading="lazy"` incorrectly set — LCP element should never be lazy

#### Fixes they should know

- Add `<link rel="preload">` for the LCP image in `<Head>`, or use Next.js Image `priority` prop
- Convert to WebP/AVIF and serve correct size via `next/image` `sizes` prop
- Ensure the image is served from a CDN close to the user
- Remove render-blocking resources that delay the image from being painted

Strong signal: mentions the three sub-parts of LCP delay (load delay, load time, render delay) and can pinpoint which was the actual bottleneck. Shows they've actually debugged this, not just read about it.

---
### Google Search Console shows good desktop scores but mobile LCP is failing on your game pages. What are the most likely culprits specific to gaming sites and how do you tackle them?

#### Gaming-specific culprits

- Full-resolution game screenshots served to mobile — should use `srcset` / `sizes` to serve smaller variants
- Autoplay game trailer videos above the fold — videos are expensive on mobile; should be deferred or replaced with a poster image
- Heavy WebGL or canvas previews loading synchronously
- Desktop-only preload hints not adjusted for mobile breakpoints

#### Approach

- Test on real mobile hardware or Moto G emulation in DevTools (throttled CPU + network)
- Use `next/image` with proper `sizes` — e.g. `"(max-width: 768px) 100vw, 50vw"`
- Lazy load below-fold game cards; only preload the first viewport's assets

Red flag: candidate gives generic advice without connecting it to the gaming/multimedia context you described. You want domain-specific problem-solving here.

---
### You used WebP and AVIF. How do you decide between them, and how does Next.js Image handle format negotiation for you?

#### What they should know

- AVIF has better compression than WebP (~50% smaller at same quality) but slower encoding and slightly less browser support
- WebP is the safe default — near-universal browser support, significant improvement over JPEG/PNG
- Next.js `next/image` handles format negotiation via the `Accept` header — it serves AVIF to browsers that support it, WebP as fallback, original format as final fallback
- The `formats` config in `next.config.js` controls which formats the optimizer attempts

Strong signal: mentions that AVIF's encoding cost means it may not suit real-time or user-uploaded images without a caching layer. Shows awareness of the production trade-off, not just the marketing pitch.

