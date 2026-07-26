# WARDOM Studio

A premium, dark-mode agency site — the reference portfolio for a web development studio selling ₹30k–₹2L websites. Built with React 19 + Vite + Tailwind + Framer Motion on the frontend, and FastAPI + PostgreSQL on the backend.

## What's inside

```
wardom/
├── client/          React 19 + Vite + Tailwind + Framer Motion
│   └── src/
│       ├── components/   Navbar, Footer, Button, CustomCursor, ThemeToggle, Loader, MagneticButton
│       ├── sections/     Hero, FeaturedWork, Statistics, Services, Process, WhyUs, Testimonials, TechStack, FAQ, Contact
│       ├── hooks/        useMousePosition
│       ├── lib/          Lenis smooth-scroll setup
│       └── utils/        api.js (talks to the FastAPI backend)
│
└── server/          FastAPI + SQLAlchemy + PostgreSQL
    └── app/
        ├── main.py        App entrypoint, CORS, router mounting
        ├── database.py    SQLAlchemy engine/session (SQLite by default, swap in Postgres)
        ├── models.py       ContactSubmission, Project, Testimonial, NewsletterSubscriber, AdminUser
        ├── schemas.py      Pydantic request/response models
        ├── routes.py       /api/contact, /api/projects, /api/testimonials, /api/newsletter, /api/admin/login
        └── auth.py         JWT + password hashing helpers
```

## Features already wired up

- Dark, minimal, luxury design system: `#0A0A0A` / `#151515` / `#F4F1EC` / `#F97352` / `#D9A66B`
- Cormorant Garamond (headings), General Sans (body, self-host in production), Space Grotesk (numbers)
- Custom cursor with magnetic hover state, magnetic buttons, page loader with progress bar
- Noise texture overlay, animated grid background, mouse-follow gradient glow in the hero
- Lenis smooth scrolling, scroll-triggered reveals via Framer Motion
- Animated statistics counters, marquee tech stack, accordion services & FAQ
- Split-screen contact form wired to a real FastAPI `/api/contact` endpoint (with optional Resend email notification)
- Light/dark theme toggle
- Sections match the planned order: Hero → Featured Work → Statistics → Services → Process → Why Us → Testimonials → Tech Stack → FAQ → Contact → Footer

## Running the frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`.

## Running the backend

```bash
cd server
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python seed.py                  # optional: adds sample projects & testimonials
uvicorn app.main:app --reload --port 8000
```

The API defaults to a local SQLite file (`wardom.db`) so it runs with zero setup.
To use PostgreSQL (e.g. Supabase), set `DATABASE_URL` in `server/.env`, e.g.:

```
DATABASE_URL=postgresql://user:password@host:5432/wardom
```

Visit `http://localhost:8000/docs` for interactive API docs (Swagger UI).

## Connecting frontend to backend

`client/.env` should point at your running API:

```
VITE_API_BASE_URL=http://localhost:8000
```

The contact form on the site (`Contact.jsx`) posts to `POST /api/contact`, which saves the
submission to the database and (if `RESEND_API_KEY` is set) emails you a notification.

## Deployment notes

- **Frontend** → Vercel: `vercel --prod` from `client/`, set `VITE_API_BASE_URL` to your deployed API URL.
- **Backend** → Railway / Render: point the start command at `uvicorn app.main:app --host 0.0.0.0 --port $PORT`, add a PostgreSQL add-on, and set `DATABASE_URL`, `RESEND_API_KEY`, `CORS_ORIGINS`, `JWT_SECRET` as environment variables.
- **Database** → Supabase Postgres works as a drop-in `DATABASE_URL`.

## Next steps (Phase 5 in the plan)

- Swap the placeholder `General Sans` font stack for the real self-hosted font files.
- Replace the four sample projects/testimonials with real client work.
- Add a proper admin dashboard UI on top of the existing `/api/admin/login` JWT endpoint.
- Run a Lighthouse audit and tune image sizes / animation counts to hit 95+.
