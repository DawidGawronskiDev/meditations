# Sensiplac

A pranayama app built with Next.js. It walks through breathing techniques like Bhastrika, Kapalbhati, and Nadi Shodhana, pairing each one with a timed phase sequence and an animated shader visual tied to the breath.

## Stack

- Next.js 16, React 19, Tailwind CSS 4
- Drizzle ORM on Postgres (tested against Neon)
- three.js / react-three-fiber for the meditation blob shader
- GSAP for phase animation
- shadcn/ui (Radix) for components
- Vitest for tests

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with a Postgres connection string:

   ```
   DATABASE_URL=postgresql://user:password@host/db?sslmode=require
   ```

3. Generate and apply the schema, then seed the database:

   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   npm run db:seed
   ```

   To wipe and reseed existing data, pass `--reset`:

   ```bash
   npm run db:seed -- --reset
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at http://localhost:3000.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - production build
- `npm run start` - run the production build
- `npm run lint` - eslint
- `npm run test` - vitest
- `npm run db:seed` - seed chakras and techniques from `features/meditation/`

## Project layout

- `app/` - routes (`/meditations`, `/meditations/[slug]`)
- `features/` - one folder per domain area (meditation, navbar, footer, theme, breadcrumbs), each with its own components, data, and queries
- `components/ui/` - shadcn components
- `db/` - Drizzle schema, relations, and seed script
- `drizzle/` - generated migrations
