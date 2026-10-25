# TALAL·AT — web application

The TALAL·AT website, turned into a full web application. The approved design is unchanged; behind it there is now a real back end.

| Part | Technology | Folder |
|---|---|---|
| Website + admin | **Next.js 16** (App Router, React 19, TypeScript) | `apps/web` |
| API | **NestJS 11** (TypeORM, class-validator, JWT, Swagger) | `apps/api` |
| Database | **PostgreSQL 16** | `docker-compose.yml` |
| Shared code | Types, prices, company content, seed data | `packages/shared` |
| Hosting | **Docker** + Caddy (automatic HTTPS) | `docker-compose.yml`, `docker/` |

## تشغيل سريع

1. ثبّت **Docker Desktop**.
2. افتح المجلد في الطرفية (Terminal) وانسخ ملف الإعدادات:
   `cp .env.example .env` (على ويندوز: `copy .env.example .env`).
3. افتح `.env` وغيّر كلمات السر: `POSTGRES_PASSWORD` و`JWT_SECRET` و`ADMIN_PASSWORD`.
4. شغّل: `docker compose up -d --build`
5. افتح الموقع على `http://localhost`، ولوحة الإدارة على `http://localhost/admin`. ادخل بالإيميل وكلمة السر من `.env`.

To stop it: `docker compose down`. Your data stays in the `db-data` volume.

---

## What is new

**Same design, now an application.**
- Every page, section, game, the 3D David hero, light and dark mode and all animations are carried over unchanged. The markup, classes and CSS are the approved ones, and the interaction layer runs exactly as before.
- Screenshots of the old and new pages match to within 1% (moving marquees aside).

**Company structure.**
- Four divisions, each with its own page under `/services/<division>`:
  - `software`: Software & Digital Platforms
  - `ai`: AI & Business Automation
  - `brand`: Branding, Creative & Digital Experiences
  - `growth`: Digital Marketing & Growth
- A small "The company" section on the home page and on the Services page.
- **Products** (`/products`):
  - **AI Marketing Studio**, the working name for the AI marketing SaaS.
  - **Nuss Nuss**, the Arabic-first expense-splitting app.
  - Both are labelled *In development*, and every feature shows its real status: Planned, In build or Ready. Each product page has a waitlist.

**Saved, not just emailed.**
- **Contact form:** saves the brief and gives the visitor a reference such as `L-7KQ2M9`. If the API is down, it falls back to opening the visitor's email app as before.
- **Pricing estimator:** a new *Send it to the studio* button saves the scope. The API **recalculates every price itself** from the price list, so a visitor can never send their own total. The WhatsApp and email buttons still work.
- **Waitlists:** one entry per email per product. Joining twice is harmless.
- **Email alerts** to the studio for each of these, once SMTP is set in `.env`. Without SMTP they are written to the API log.

**Admin** (`/admin`):
- Overview: new briefs, open pipeline in AED, waitlist sizes.
- Briefs and scopes: status, notes, search, CSV export.
- Waitlists, with CSV export.
- Portfolio: show, hide, order and feature case studies and Behance projects. Changes reach the site within a minute.
- Change password.

**Security:**
- Passwords hashed with bcrypt.
- Admin session in an http-only, SameSite cookie, plus a required header on every change (CSRF protection).
- Rate limits on public forms and on sign-in.
- Input validation on every field, and a spam trap field on every form.
- Visitor IPs are stored only as salted hashes.
- Helmet security headers.
- The app refuses to start in production with a weak `JWT_SECRET` or admin password.

## Project layout

```
apps/
  web/                         Next.js
    src/app/(site)/            public pages: /, /projects, /services, /services/[division],
                               /products, /products/[slug], /pricing, /about, /contact
    src/app/admin/             studio admin
    src/app/api/[...path]/     same-origin bridge to the API (development; Caddy does this in Docker)
    src/components/sections/   page sections (ported 1:1 from the approved design) + new sections
    src/components/forms/      contact, scope and waitlist forms
    src/lib/site-runtime.js    the original interaction layer (cursor, galleries, games, estimator)
    src/lib/hero3d.js          the 3D David hero (three.js)
    src/app/site.css           the approved stylesheet, unchanged
    src/app/extend.css         styles for the new parts, using the same tokens
    public/assets/             images, videos, 3D mesh
  api/                         NestJS
    src/database/              entities, migrations, seed
    src/{leads,quotes,waitlist,content,auth,admin}/
    test/app.e2e.spec.ts       end-to-end tests against PostgreSQL
packages/
  shared/src/pricing-catalog.ts   ← prices of the estimator (AED)
  shared/src/content.ts           ← divisions, products, company details
  shared/src/seed/                ← first content of the database
```

## Everyday edits

- **Prices:**
  1. Edit `packages/shared/src/pricing-catalog.ts`.
  2. Rebuild with `docker compose up -d --build`.
  The site and the API both read this one file.
- **Division and product text:** edit `packages/shared/src/content.ts`, then rebuild.
- **Showing or hiding work:** use `/admin` → Portfolio. No rebuild is needed.
- **Deposit payment link:**
  1. Put your Stripe Payment Link or Ziina link in `PAYMENT_LINK` in `.env`.
  2. Run `docker compose up -d`.
  The *Pay the deposit* button then appears in the estimator.
- **Admin password:** change it in `/admin` → Account. If it is forgotten:
  1. Set a new `ADMIN_PASSWORD` and `ADMIN_PASSWORD_RESET=true`.
  2. Restart.
  3. Set `ADMIN_PASSWORD_RESET` back to `false`.

## Going live on a domain

On a server with Docker (any VPS):

1. Point the domain's DNS `A` record to the server.
2. In `.env`, set:
   ```
   SITE_URL=https://yourdomain.com
   SITE_ADDRESS=yourdomain.com
   COOKIE_SECURE=true
   ```
3. Run `docker compose up -d --build`. Caddy gets and renews the HTTPS certificate on its own.

**Microsoft Azure.**
- The same two images run on **Azure Container Apps**, with **Azure Database for PostgreSQL – Flexible Server**.
- Set the variables from `.env.example` on each app.
- Set `DATABASE_SSL=true` for Azure's PostgreSQL.
- Point `API_INTERNAL_URL` on the web app to the API's internal address.
- Route `/api/*` to the API with Container Apps ingress, or keep the Next.js bridge.

## Development without Docker for the apps

```bash
npm install
docker compose -f docker-compose.dev.yml up -d      # PostgreSQL on localhost:5432
cp apps/api/.env.example apps/api/.env               # then: npm run dev:api  (http://localhost:4000, docs at /api/docs)
npm run build:shared && npm run dev:web              # http://localhost:3000
npm test                                             # API end-to-end tests (needs TEST_DATABASE_URL or the dev database)
```

## API

All under `/api`. Swagger docs are at `/api/docs` when `SWAGGER_ENABLED=true`.

| Method | Path | |
|---|---|---|
| GET | `/health` | health check (database ping) |
| GET | `/content/site` | portfolio, price list, payment settings |
| GET | `/content/company` | divisions, products, company details |
| POST | `/leads` | contact brief → `{ ref }` |
| POST | `/quotes` | estimator scope → server-calculated totals |
| POST | `/waitlist` | product waitlist |
| POST | `/auth/login`, `/auth/logout`; GET `/auth/me` | admin session |
| GET/PATCH | `/admin/leads`, `/admin/quotes`, `/admin/waitlist`, `/admin/content/*`, `/admin/stats` | back office |

## Not built yet (on purpose)

- **The two products themselves.** Their pages and waitlists are live; the apps are separate projects.
- **Card payments inside the site.** Deposits use a payment link. Full Stripe Checkout and subscriptions need a UAE trade licence or freelance permit on the Stripe account, and can be added to the API when that is ready.
- **Arabic version of the site.** The layout supports it; the content needs writing.

Licence note: the 3D David bust comes from the Scan the World scan, CC BY-SA 4.0. Keep the credit line in the footer.
