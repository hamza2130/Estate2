# Autostack AI — Real Estate Advisor demo

A full-stack property advisory website (public site, listings API, database and admin panel), rebuilt in the style of a DHA Islamabad property advisor under the dummy brand **Autostack AI**. All names, phone numbers and listings are demo data.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript) for the site, API routes and admin panel
- **Prisma + SQLite** for the database (zero setup; switch `provider` in `prisma/schema.prisma` to `postgresql` for production)
- **Tailwind CSS** for styling
- **JWT session cookie** (jose + bcrypt) protecting `/admin` and `/api/admin`

## Run it locally

Requires Node.js 20 or newer.

```bash
cp .env.example .env      # set AUTH_SECRET and the admin login here
npm install
npm run setup             # creates the database and loads demo content
npm run dev               # http://localhost:3000
```

Admin panel: http://localhost:3000/admin — default login `admin@autostack.ai` / `admin123` (from `.env`).

For a production build: `npm run build && npm start`.

## What's included

**Public site**
- Home: hero with search, stats, projects, featured listings, services, rentals, testimonials, guides, inquiry form
- Properties: filter by purpose, type, project, price and keyword, sort and pagination
- Property detail: photo gallery, key facts, features, call / WhatsApp buttons, inquiry form, similar listings
- Projects and project detail pages, buying guides, about, contact (with map), floating WhatsApp button

**Admin panel** (`/admin`)
- Dashboard with listing and inquiry counts
- Create, edit and delete properties, projects, guides and testimonials
- Image upload (stored in `./uploads`) or paste an image URL
- Inquiries inbox with New / Contacted / Closed status
- Site settings: brand name, contact details, office hours, homepage headline and hero image, about text

**API**
| Method | Route | Auth |
| --- | --- | --- |
| GET | `/api/properties?purpose=&type=&project=&minPrice=&maxPrice=&q=&sort=&page=` | public |
| GET | `/api/properties/:slug` | public |
| GET | `/api/projects` | public |
| POST | `/api/inquiries` | public |
| POST | `/api/auth/login`, `/api/auth/logout` | — |
| GET, POST | `/api/admin/{properties,projects,guides,testimonials}` | admin |
| GET, PUT, DELETE | `/api/admin/{resource}/:id` | admin |
| PATCH, DELETE | `/api/admin/inquiries/:id` | admin |
| GET, PUT | `/api/admin/settings` | admin |
| POST | `/api/admin/upload` | admin |

## Deploying

SQLite and local uploads need a server with a persistent disk (a VPS, Railway or Render with a volume). For Vercel, switch Prisma to Postgres (e.g. Neon) and move uploads to object storage.
