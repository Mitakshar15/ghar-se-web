# Content layer — authoring guide

Everything user-visible on the Ghar Se site that's not operational data (maker counts, payouts, cities) lives in this folder. Edit the right file, commit, push, merge — that's the entire workflow.

If you're a developer landing here for the first time, read `../CLAUDE.md` → **Rules → Static content** first. That covers the *why*. This file covers the *how*.

## TL;DR — where does what live

| You want to change... | Edit... |
|---|---|
| The hero headline or supporting cards | `landing/hero.ts` (lands in PR 2) |
| The "How it works" three steps | `landing/how-it-works.ts` |
| The Sirsi Suraksha trust pillars | `landing/suraksha.ts` |
| The For Makers benefits / fine print | `landing/for-makers.ts` |
| The dishes scrolling in the marquee | `landing/marquee.ts` (date-windowed) |
| A festival banner (CTA above the fold) | `landing/festival-campaigns.ts` |
| The customer testimonials | `landing/testimonials.ts` |
| The footer columns + links | `landing/footer.ts` |
| The maker FAQ | `portal/faqs.ts` |
| The commission %, deposit ₹, Plus price, payout window | `business/terms.ts` |
| Anything operational (maker count, payouts paid, cities live) | **Not here.** Edit the API / fixtures. |

> Note: PR 1 ships only the foundation (primitives, schemas, selectors, business terms). The `landing/` and `portal/` content files arrive in subsequent PRs as each section is migrated from its component.

## The shape of everything: `LocalizedString`

Every user-visible string is an object:

```ts
{ en: 'Sign in', kn: 'ಲಾಗಿನ್', hi: 'साइन इन' }
```

- `en` is **required**.
- `kn` and `hi` are **optional**. Today we ship English only. When we localize, partial Kannada (say, 80% of strings) renders fine — English fills the gaps.
- Never write a plain `string` for user-visible copy. The schema will reject it.

## Three patterns you'll use over and over

### 1. Just changing copy

Open the file, find the field, change the `en:` value. Done.

```ts
// landing/hero.ts
export const hero = HeroContentSchema.parse({
  // ...
  sub: { en: 'From the kitchens of Sushma aunty...' },   // ← edit this
  // ...
});
```

Commit. Push. The build runs Zod's `.parse()` on import — typos in field names or missing required fields fail CI before merge.

### 2. Launching a seasonal campaign (festival banner, marquee swap)

Add an entry with `activeFrom` and `activeUntil` ISO dates. The frontend's `pickActive()` selector picks whichever entry is currently in window:

```ts
// landing/festival-campaigns.ts
export const festivalCampaigns: FestivalCampaign[] = [
  {
    id: 'diwali-2026',
    name: { en: 'Deepavali' },
    emoji: '🪔',
    festivalDate: '2026-11-08',       // the actual festival
    activeFrom:   '2026-10-01',       // banner goes live this date
    activeUntil:  '2026-11-08',       // banner auto-retires this date
    eyebrow:        { en: 'Pre-orders open' },
    headlinePrefix: { en: 'Deepavali · ' },
    sub:  { en: 'Sweets boxes, chakli, mysore pak — book Sirsi makers now.' },
    cta:  { en: 'Browse festival kitchen' },
  },
  // ... more campaigns, ordered most-specific first
];
```

The countdown ("119 days") is calculated at render time against `festivalDate` — it ticks daily without any deploy.

### 3. Updating a business term (commission %, deposit ₹, etc.)

These have legal/contractual weight. There is exactly one place to change them:

```ts
// business/terms.ts
export const BUSINESS = BusinessTermsSchema.parse({
  commissionPct: 8,              // ← change here
  securityDepositInr: 500,
  // ...
});
```

Every component that says "8% commission", every FAQ that mentions it, every onboarding screen — all of them import `BUSINESS.commissionPct` (or the `commissionDisplay()` helper). One edit, everything stays consistent.

If you find a `"8%"` literal anywhere else in the codebase, that's a bug — extract it.

## The rules

1. **Never hardcode copy in a component.** Headlines, button labels, FAQ answers — all of it comes from `src/content/`.
2. **Never re-type a business term.** Import from `business/terms.ts` or use a display helper.
3. **English fields are required.** Kannada/Hindi are optional, English is the safety net.
4. **Date-windowed entries go in date order, most-specific first.** `pickActive()` returns the first match.
5. **Operational data (maker counts, payouts, cities) is not content.** It lives behind the API. Don't smuggle it into content files because it's easier to type.
6. **The schema fails the build on typos.** If a field is missing or mistyped, CI catches it. You can't ship broken content to prod.

## Common questions

**Q: Why TypeScript files and not JSON or YAML?**
TS gives us autocomplete, inline imports (use `BUSINESS.commissionPct` inside content), and the schema validates at module load — instant feedback in the editor. JSON is portable but loses all of that. We'll convert to JSON later when we wire up Keystatic (a CMS) — at that point the shape stays the same.

**Q: Can a non-developer edit this?**
Today, no — you need to be comfortable opening a TS file and committing via git. When marketing scales, we'll add Keystatic on top, which gives non-devs a web UI that edits the same files. See `../CLAUDE.md` → "Static content" for the migration path.

**Q: What if I need a string that should change per city (Kumta vs Honnavar)?**
Two options. (1) If it's a one-off, add a field on the relevant content block. (2) If it's pervasive, that's a job for the API per-city, not content files. Talk to the developer first.

**Q: I want to add an image. How?**
Use `AssetRef` from `primitives/rich.ts`. The schema requires `alt` text — you can't ship an image without it. (Real photo management is a Phase B problem, will likely use Cloudinary or similar.)

**Q: I edited a file and the build is failing.**
Read the Zod error in the CI log carefully — it tells you which field and which file. Usually it's a missing `en:` key or a typo in a key name. Run `npm test` locally to catch it before pushing.

## Folder layout

```
src/content/
├── primitives/      # LocalizedString, DateWindow, CTA, AssetRef
├── schema/          # Zod contracts for every content block
├── landing/         # Buyer-facing landing copy (arrives in PR 2+)
├── portal/          # Maker portal copy (arrives in later PRs)
├── business/        # Contractual terms — single source of truth
├── selectors.ts     # pickActive(), localized(), daysUntil()
├── selectors.test.ts
├── index.ts         # Re-exports for clean imports
└── README.md        # This file
```
