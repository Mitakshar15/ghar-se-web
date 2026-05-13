# Ghar Se Web — Project Context for Claude

> Read this file end-to-end before touching code. It encodes the working agreement, conventions, and architectural choices for the React application. Skipping this means re-litigating settled decisions.

This file is scoped to **`gharse-web/`** only. The parent directory's `../CLAUDE.md` covers the HTML/JSX **prototypes** — that is design exploration, this is the production codebase.

## What this project is

**`gharse-web/`** is the production React app for **Ghar Se** — a hyperlocal pre-order marketplace connecting home makers (festival sweets, snacks, pickles, ghee, masalas, handlooms, crafts) with consumers in tier-2/3 Indian cities. Launch market: **Sirsi, Karnataka**.

The app serves **two audiences in one codebase**:

1. **Buyer-facing marketing site** at `/` — the unauthenticated landing experience. Hero, How it works, Sirsi Suraksha trust pillars, featured makers, festival CTAs, "for makers" pitch, testimonials, footer.
2. **Maker portal** at `/portal/*` — the authed dashboard for home cooks. 9 sections: Dashboard, Orders, Menu, Calendar, Earnings, Reviews, Profile, Settings, Help.

Both share the same React app, design system, and API layer. Sign-in flow at `/sign-in` (phone + OTP) bridges the two.

The mobile app and the prototypes (the JSX/HTML files in the parent directory) are NOT part of this project. They are reference designs.

## Aim & theme

- **Domain:** hyperlocal pre-order marketplace. NOT instant delivery. Festival-anchored. Lead-time bound (3–7 days typically). Bulk orders.
- **Tone:** Swiggy/Zomato density with cultural warmth. NOT editorial minimalism. NOT generic SaaS.
- **Audience reality:** tier-2/3 Indian users, often on cheap Androids, often with Kannada as the comfort language. Older users with bigger thumbs. Skeptical of online payments. WhatsApp-fluent. **Optimise for clarity, trust, and accessibility — not for novelty.**
- **Brand voice:** "Sushma aunty", real Sirsi neighbourhoods (Hosakeri, Marikamba Nagar), real Havyaka dishes (karanji, holige, kayi modaka). Hindi `घर से` and Kannada `ಮನೆಯಿಂದ` accents used **ornamentally**, never as primary copy.
- **Trust system:** "Sirsi Suraksha" = KYC + escrow + hygiene grade + 24h refund + tamper-evident packaging. Surface trust signals everywhere, not just one banner.

## Locked decisions

Settled. Don't reopen without an explicit ask.

- **Build tool:** Vite. Not CRA, not Next.js. Spring Boot backend will be a sibling API.
- **Language:** TypeScript everywhere. No `.js` files in `src/`.
- **Styling:** Tailwind CSS v3 with custom brand tokens. Design tokens live in `tailwind.config.js` AND mirrored as JS values in `src/config/tokens.ts` for inline-style use. Keep both in sync.
- **Routing:** `react-router-dom` v7. Path constants in `src/config/routes.ts` — never inline route strings.
- **Data fetching:** TanStack Query. Server state lives in Query cache; local UI state lives in component or Zustand stores. No global Redux.
- **Auth state:** Zustand store, **in-memory only**. Refresh via httpOnly cookie (server-issued, when the backend is wired up). NEVER `localStorage` for tokens.
- **Forms:** React Hook Form + Zod resolver. Validation schemas live alongside the form component.
- **Schemas:** Zod is the single source of truth. `src/types/domain.ts` defines `*Schema` and `type X = z.infer<typeof XSchema>`. Validate at API boundaries.
- **Mock API:** MSW (Mock Service Worker) intercepting at the network layer. Toggleable via `VITE_USE_MOCKS`. Endpoints versioned (`/api/v1/...`) so the Spring Boot routes mirror cleanly.
- **Icons:** `lucide-react`. Newer versions removed brand icons (Instagram/Twitter/etc.) — use generic stand-ins (Camera, Globe, MessageCircle).
- **Fonts:** Fraunces (display), Inter (body), Instrument Serif italic (Hindi/Kannada accents). Loaded from Google Fonts via `<link>` in `index.html` with `preconnect`.

## Project structure

```
gharse-web/
├── public/
│   ├── favicon.svg
│   └── mockServiceWorker.js          # MSW service worker — DO NOT edit by hand
├── src/
│   ├── main.tsx                      # Entry: starts MSW (if enabled), mounts React
│   ├── app/
│   │   └── App.tsx                   # Top-level BrowserRouter + routes
│   ├── config/
│   │   ├── env.ts                    # Zod-validated runtime env. Bail-fast on misconfig.
│   │   ├── routes.ts                 # Canonical route paths (ROUTES.dashboard etc.)
│   │   └── tokens.ts                 # JS-accessible design tokens (mirrors tailwind config)
│   ├── types/
│   │   └── domain.ts                 # Zod schemas + inferred TS types for all domain objects
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts             # fetch wrapper with auth header + timeout + ApiError
│   │   │   ├── endpoints.ts          # Path constants (API.orders, API.order(id), ...)
│   │   │   └── queryClient.ts        # Shared QueryClient + `qk` query-key registry
│   │   ├── auth/
│   │   │   └── store.ts              # Zustand auth store + wires token-getter into api client
│   │   └── utils/
│   │       ├── cn.ts                 # className merger (clsx)
│   │       └── format.ts             # Indian-locale rupee, plural, relativeDay
│   ├── components/
│   │   ├── ui/                       # Primitives: Button, Card, Input, Pill, Skeleton, StatTile, Empty
│   │   ├── layout/                   # Logo, PortalShell (sidebar + topbar)
│   │   └── feedback/                 # Modal, Toast
│   ├── features/                     # Vertical slices — one folder per domain feature
│   │   ├── landing/
│   │   │   ├── Landing.tsx           # Page composer
│   │   │   └── components/           # Nav, Hero, Marquee, HowItWorks, Suraksha,
│   │   │                             # FeaturedMakers, FestivalCTA, ForMakers,
│   │   │                             # Numbers, Cities, Testimonials, DownloadCTA, Footer
│   │   ├── auth/
│   │   │   ├── api.ts                # requestOtp, verifyOtp, fetchMe
│   │   │   ├── Login.tsx
│   │   │   ├── Otp.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── portal/
│   │       ├── dashboard/Dashboard.tsx
│   │       ├── orders/Orders.tsx
│   │       ├── menu/Menu.tsx
│   │       ├── calendar/Calendar.tsx
│   │       ├── earnings/Earnings.tsx
│   │       ├── reviews/Reviews.tsx
│   │       ├── profile/Profile.tsx
│   │       ├── settings/Settings.tsx
│   │       └── help/Help.tsx
│   ├── mocks/
│   │   ├── fixtures.ts               # Static seed data (maker, items, orders, reviews, payouts, …)
│   │   ├── handlers.ts               # MSW request handlers for every /api/v1/* endpoint
│   │   └── browser.ts                # setupWorker + handlers (loaded only when mocks enabled)
│   ├── hooks/                        # Shared custom hooks (currently empty — add as needed)
│   ├── i18n/                         # Translations (placeholder for future Kannada/Hindi UI)
│   └── styles/
│       └── global.css                # Tailwind layers + brand utilities (press, hover-lift, dots)
├── .env.example                      # Documented env vars. Copy to .env.local.
├── tailwind.config.js                # Brand tokens + animations + dot-pattern backgrounds
├── vite.config.ts                    # Vite + path alias @/* → src/*
├── tsconfig.app.json                 # Strict TS + paths
└── eslint.config.js                  # ESLint flat config (Vite default)
```

## Rules

### Architecture

- **Vertical slices.** New features go in `src/features/<feature>/`, not in a global `components/` or `pages/` bag. UI primitives shared across features go in `src/components/ui/`.
- **Centralise paths.** API endpoints in `src/lib/api/endpoints.ts`, routes in `src/config/routes.ts`. Never inline `/api/v1/...` or `/portal/...` strings in component code.
- **Centralise tokens.** Colors, fonts, brand utilities flow through `tailwind.config.js` + `src/config/tokens.ts`. Never hard-code hex values inside components except for one-off SVG fills.
- **No circular feature imports.** Features may import from `components/`, `lib/`, `config/`, `types/`. Features must not import from each other. If two features need to share, lift it.

### TypeScript

- **Strict mode is on.** Don't bypass with `any` — at minimum use `unknown` and narrow.
- **Schemas first.** Every API payload and form is described by a Zod schema; TS type is `z.infer<typeof X>`. Parse at boundaries (API responses, form submits) so contract drift surfaces immediately.
- **Path alias `@/`.** Use `@/components/ui/Button`, not relative `../../../components/ui/Button`.
- **No `.tsx` in non-component files.** Files exporting components → `.tsx`. Files exporting pure functions/types → `.ts`.

### React

- **Functional components only.** Hooks for state + effects. No class components.
- **`useQuery` for server reads, `useMutation` for server writes.** Don't `useEffect` + `fetch` directly.
- **Invalidate, don't refetch manually.** After a mutation, `qc.invalidateQueries({ queryKey: qk.orders() })` — let TanStack Query decide.
- **Keys via `qk`.** All query keys come from `src/lib/api/queryClient.ts` `qk` registry to avoid cache mismatches.
- **Avoid `useEffect` for derivations.** Derive in render or with `useMemo`. Only use `useEffect` for true side-effects (subscriptions, DOM measurements, integrations).

### Styling

- **Tailwind first.** Use utility classes. Custom utilities live in `src/styles/global.css` under `@layer utilities`.
- **`cn()` for conditional classes.** Import from `@/lib/utils/cn` — keeps the conditional API consistent and easy to swap for `tailwind-merge` later.
- **Inline `style` only for dynamic values** (gradients with computed stops, SVG path colors driven by data). Never for static colors that have a Tailwind utility.
- **Phone-first responsive.** Default styles target mobile; use `sm:`/`md:`/`lg:` to upscale. Maker portal sidebar collapses to a drawer below `md`.

### Security (non-negotiable)

- **Tokens never touch `localStorage` or `sessionStorage`.** They live in the Zustand store (memory) plus an httpOnly refresh cookie set by the server. XSS-exfiltratable storage is forbidden.
- **`credentials: 'same-origin'`** is set in `lib/api/client.ts`. If the backend lives on a different origin in prod, switch to `'include'` and require a CORS allowlist + strict `SameSite` cookie attrs.
- **CSP via server headers.** The `<meta http-equiv>` block in `index.html` is defence-in-depth; the real CSP must come from the server response headers. Dev mode is intentionally permissive (Vite HMR needs `'unsafe-inline'` + `ws:`).
- **Validate at boundaries.** Every API response is parsed by a Zod schema before reaching components. Every form submission is validated by a Zod resolver before hitting the API.
- **No `dangerouslySetInnerHTML`** unless the input is sanitized with DOMPurify or similar. Default to plain JSX.
- **No secrets in `VITE_*` vars.** Anything prefixed `VITE_` is shipped to the browser. API keys, signing secrets, etc. belong on the server only.
- **Audit dependencies.** `npm audit` before each release. Pin major versions in `package.json`.

### API contract

- **Versioned namespace.** All endpoints live under `/api/v1/...`. Bumping the version is how we break the contract; never silently mutate a v1 shape.
- **Mock and real share a contract.** Every handler in `src/mocks/handlers.ts` is the spec the Spring Boot endpoint must satisfy. When the backend lands, swap `VITE_USE_MOCKS=false` and the components don't move.
- **Error shape:** `{ error: string }` for non-2xx, parsed by `ApiError` into `status` + `message`.
- **Pagination, when needed,** uses `?page=&size=` + a `{ items, page, size, total }` envelope. (Not in use yet — add the day we exceed 50 records.)

### Forms

- **React Hook Form + Zod resolver.** Schema defined just above the component, type via `z.infer`.
- **Number inputs:** register with `{ valueAsNumber: true }` and use `z.number()`, not `z.coerce.number()`. Coerce + RHF produces type mismatch errors.
- **Error display via `errors.field?.message`** passed to the `Input` component's `error` prop.

### State

- **Server state:** TanStack Query. Source of truth lives on the server.
- **Auth/session:** Zustand store (`useAuth`).
- **Toasts/notifications:** Zustand store (`useToast`).
- **Everything else:** local component state. Reach for Zustand only when state genuinely crosses unrelated components.

### Config

- **All client config goes through `src/config/env.ts`.** It's Zod-validated and bails on misconfig. Add new keys here AND `.env.example` in lockstep.
- **Feature flags via `VITE_FEATURE_*`** env vars, never via runtime DB. We aren't there yet.

## Build & dev commands

```bash
# Install
npm install

# Dev server (Vite on :5173, MSW mocks enabled by default)
npm run dev

# Production build
npm run build

# Type-check without emitting
npx tsc --noEmit

# Lint
npm run lint

# Preview production build locally
npm run preview
```

To run against the real backend instead of mocks:

```bash
VITE_USE_MOCKS=false VITE_API_BASE_URL=https://api.gharse.com npm run dev
```

## When the founder says X, do Y

| Founder says | What it usually means |
|---|---|
| "Add a section to the portal" | New folder in `src/features/portal/<name>/`, new route in `config/routes.ts`, new sidebar entry in `PortalShell`, new MSW handler. Don't shove it into an existing file. |
| "Make the homepage section X feel like Y" | Edit the matching file in `src/features/landing/components/`. Don't touch portal code. |
| "Wire up the real API" | Set `VITE_USE_MOCKS=false`, point `VITE_API_BASE_URL` at the Spring Boot host. Verify each endpoint in `src/mocks/handlers.ts` is implemented server-side with the same shape. |
| "Keep the previous design" | Restore exactly. Don't reinterpret. |
| "Refine X" | Spacing, hierarchy, polish. NOT a redesign. |
| "Innovate" | Propose 2-3 specific ideas, implement the one he picks. Don't ship a wholesale rework. |
| "That's not what I wanted" | Re-read the instruction literally, redo with less interpretation. |

## Iteration playbook

1. **Read this file.** Then read the file you're about to change. Then change it.
2. **Stay in your slice.** Touching the dashboard? Don't also "improve" the orders page.
3. **Match the locked decisions.** No new colour, no new font, no new state library, no new build tool — unless explicitly opened.
4. **Validate at boundaries.** When you add an API call, add the schema + parse. When you add a form, add the schema + resolver.
5. **Document deliberately.** Code comments answer *why*, not *what*. The name `MakerMenuEditor` already says what it does.

## Things that are explicitly NOT in scope

- Server-side rendering / Next.js migration.
- A native mobile app (the React Native build is a separate project, not this one).
- A buyer-facing authed experience (buyers use the mobile app; the website is marketing + maker portal only).
- Analytics, A/B testing, growth experiments — those land after launch.
- The business plan, the founder slide deck, marketing collateral.

## Reference: real entities used in mock data

Keep these consistent across all features (already encoded in `src/mocks/fixtures.ts`):

- **Maker:** Sushma Bhat / "Sushma's Kitchen" / Hosakeri, Sirsi / 8 years / FSSAI 12345600002345 / hygiene A+ / Canara Bank ••• 4521
- **Other makers:** Lakshmi Hegde (pickles), Vidya Joshi (ghee), Anita Naik (snacks)
- **Customers:** Vinay G., Geetha S., Pradeep K., Anjali R., Suresh M., Lakshmi B., Mitakshar, Vidya J., Anita N., Ramesh H.
- **Sirsi neighbourhoods:** Hosakeri, Marikamba Nagar, Bisalakoppa, Banavasi Road
- **Phase 2 cities:** Kumta, Honnavar, Yellapur, Karwar, Dandeli
- **Dishes:** Karanji (₹35/piece, 4d lead), Holige (₹40/piece, 3d lead), Chakli (₹450/kg, 3d lead), Kayi Modaka (₹45/piece, 5d lead), Mysore Pak (₹380/250g)
- **Festivals:** Ganesh Chaturthi (Sept 6), Krishna Janmashtami, Diwali, Ugadi
- **Trust brand:** "Sirsi Suraksha"
- **Subscription:** "Ghar Se Plus" — ₹199/yr (buyer-side, not surfaced in the maker portal)

## Closing note

This is a real product. The mock data uses people the founder knows or could know. The bar is: would Sushma aunty, who has spent 8 years perfecting her karanji, find this app respectful and useful? If a change makes the answer more "yes", ship it. If it makes the app feel more like a Bay Area SaaS, push back.
