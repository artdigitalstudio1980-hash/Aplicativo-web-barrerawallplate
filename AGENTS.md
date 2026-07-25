<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js** 16.2.1 (App Router) + **React** 19.2.4 + **TypeScript** 5
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — no `tailwind.config.js`
- **Prisma 7** + **MySQL** (Hostinger) — adapter: `@prisma/adapter-mariadb`
- **Auth**: JWT via `jose` (cookies `access_token`/`refresh_token`), role-based (ADMIN/VENDEDOR/USUARIO)
- **Mobile**: Expo (React Native) in `mobile/` — separate `package.json`

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server (port 3000) |
| `npm run build` | `prisma generate && next build` (both required) |
| `npm run start` | Production server |
| `npm run lint` | ESLint only (no Prettier, no typecheck) |

No test framework is configured.

## Prisma 7 quirks

- Schema uses `engineType = "library"` — this means `PrismaClient` constructor **requires** an `adapter` option
- `@prisma/adapter-mariadb` is installed but **not wired** into `src/lib/prisma.ts`; build fails on page data collection with `"Using engine type 'client' requires either 'adapter' or 'accelerateUrl'"` — fixing this requires passing the adapter to the PrismaClient constructor
- Config is in `prisma.config.ts` (Prisma 7 style) — loads dotenv manually
- Generated client goes to `./node_modules/@prisma/client` (standard, no custom output)

## Auth

- `src/middleware.ts` guards `/admin/*` routes by decoding `access_token` cookie via jose; **this file is deprecated** in Next 16 — should be renamed to `proxy.ts`
- API routes use `withAuth()` / `withOptionalAuth()` wrappers from `src/lib/api-middleware.ts`
- Token pair: 15m access + 7d refresh; stored as `access_token` / `refresh_token` cookies (httpOnly is NOT set — readable from JS)
- `next-auth` is in `package.json` but unused

## Project structure

- `src/app/` — Next.js App Router pages and API routes (all under `/api/v1/`)
- `src/lib/` — shared utilities (prisma singleton, auth, cart context, validators using Zod)
- `src/components/` — client components organized by domain (`home/`, `admin/`, `cart/`, etc.)
- `src/generated/prisma/` — gitignored, populated during build
- `mobile/` — separate Expo app, not included in TS compilation (excluded in `tsconfig.json`)
- `MARKETING.md` — brand copy, ad hooks, launch strategy (not a technical doc)

## Known issues

- Build reliably fails on page data collection due to missing Prisma adapter wiring (see Prisma 7 quirks above)
- Middleware deprecation warning: `"middleware"` file convention → use `"proxy"` instead
- `export const config` in `middleware.ts` (matcher) is also deprecated in Next 16
