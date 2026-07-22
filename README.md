# World Cup 2026 Hub ⚽

A premium, full-stack **FIFA World Cup 2026** experience — cinematic dark UI, glassmorphism, neon glow, stadium lighting, 3D cards and smooth Framer Motion animations.

Built to feel like an official global football platform (ESPN × FIFA × UCL × modern SaaS dashboard).

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + custom design system (glass, neon, gradients, stadium lights)
- **Framer Motion** animations (page transitions, scroll reveal, 3D tilt, number counters, floating particles)
- **shadcn-style UI** primitives + **Lucide** icons
- **Prisma ORM** + **PostgreSQL**
- **bcryptjs** password hashing
- `next-themes` dark/light mode + multi-language switcher (EN / ES / FR)

## Features

| Page | Highlights |
|------|-----------|
| **Home** | Cinematic hero, live countdown, floating footballs, stats, AI predictor, news |
| **Dashboard** | Live scores, upcoming fixtures, FIFA rankings, Golden Boot race |
| **Teams** | Search + continent filter, favorite teams, squad previews |
| **Fixtures** | Calendar grouping, status filters, live/finished states, reminders |
| **Stadiums** | 3D hover showcase with stadium lighting |
| **Players** | 3D tilt cards + head-to-head **comparison** tool |
| **News** | Featured layout, categories, search, trending sidebar |
| **Fan Zone** | Interactive polls, score predictions, leaderboard, fan wall |
| **Admin** | Manage teams / matches / players / news + analytics |
| **Login** | Credentials + social login UI |

Design tokens: Deep Navy `#071426`, Midnight `#020617`, Electric Blue `#00A8FF`, Pitch Green `#00C853`, Gold `#FFD700`. Fonts: **Anton** / **Bebas Neue** (display) + **Inter** (body).

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000. **The app runs fully with built-in mock data — no database required.**

### Optional: enable the PostgreSQL backend

```bash
cp .env.example .env          # set DATABASE_URL
npm run prisma:generate
npm run prisma:push           # create tables
npm run prisma:seed           # seed teams, matches, players, news, users
```

Demo accounts (after seeding): `admin@wc26.com / admin1234` and `fan@wc26.com / fan12345`.

### API routes

- `GET /api/teams?continent=&q=`
- `GET /api/matches?status=`
- `GET /api/players?position=&q=`
- `GET /api/news?category=`
- `POST /api/auth/register`

All read routes gracefully fall back to mock data when the database isn't provisioned.

## Notes

Concept fan project — not affiliated with or endorsed by FIFA. Imagery via Unsplash; flags via flagcdn.
