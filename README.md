# Beta-Tech Labs Company Limited

<div align="center">

[![Website](https://img.shields.io/badge/Website-beta--techlabs.com-gold?style=flat-square)](https://www.beta-techlabs.com)
[![Location](https://img.shields.io/badge/Location-Kabale%2C%20Uganda-green?style=flat-square)](#contact)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite%20%2B%20Tailwind-61dafb?style=flat-square)](#tech-stack)

**Dream It. Built It.**

*Turning Research into Real-World Solutions*

[Website](https://www.beta-techlabs.com) · [X](https://x.com/betatechlabs) · [LinkedIn](https://www.linkedin.com/in/betatech-labs-06398039b) · [GitHub](https://github.com/beta-techlabs)

</div>

---

## About

**Beta-Tech Labs Company Limited** is a research-driven technology company based in Kabale Main Town, Uganda. We transform ideas and real-world challenges into innovative products and technology solutions through research, engineering, and continuous innovation.

**Philosophy:** Research First. Innovation Always. Impact Forever.

| Pillar | Focus |
|--------|-------|
| **Research & Innovation** | Problem discovery, applied research, emerging technology exploration |
| **Product Innovation** | AI products, mobile apps, web platforms, enterprise systems |
| **Solution Engineering** | Custom solutions for organizations and partners |
| **Talent Development** | Internships, mentorship, workshops, industry collaboration |

---

## Live Products

| Product | Description | Link |
|---------|-------------|------|
| **Fasiri** | African language AI API (translate, transcribe, TTS) | [fasiri-ai.com](https://www.fasiri-ai.com/) |
| **Cultural Hub** | Cultural experiences and destination discovery | [cultural-hub-psi.vercel.app](http://cultural-hub-psi.vercel.app/) |
| **StellarIDE** | Browser-native Soroban IDE for Stellar | [stellaride.dev](http://stellaride.dev/) |
| **Rowan** | Stellar crypto-to-fiat liquidity bridge (in development) | [GitHub](https://github.com/edyeluandrew/rowan) |

More projects: [beta-techlabs.com/projects](https://www.beta-techlabs.com/projects)

---

## Site Pages

| Route | Purpose |
|-------|---------|
| `/` | Home (hero, how we work, team, testimonials, contact) |
| `/services` | Research, product development, engineering, talent programs |
| `/projects` | Product portfolio |
| `/events` | Workshops, bootcamps, past event gallery |
| `/research` | Research focus areas |
| `/privacy` · `/terms` · `/cookies` | Legal pages |

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | React 18, React Router, Vite |
| **Styling** | Tailwind CSS, Lucide icons |
| **CMS / Data** | Firebase Realtime Database |
| **Contact** | EmailJS |
| **Analytics** | Google Analytics |
| **PWA** | Service worker, web manifest |
| **Deploy** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone https://github.com/beta-techlabs/research-hub.git
cd research-hub
npm install
cp .env.example .env
# Fill in Firebase, EmailJS, and admin credentials in .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

### Environment variables

Copy `.env.example` to `.env` and configure:

| Variable | Purpose |
|----------|---------|
| `VITE_FIREBASE_*` | Firebase Realtime Database (team, events, projects, services) |
| `VITE_EMAILJS_*` | Contact form email delivery |
| `VITE_ADMIN_USERNAME` / `VITE_ADMIN_PASSWORD` | Admin panel login |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics (optional) |

See also: [EMAIL_SETUP.md](./EMAIL_SETUP.md) · [PWA_SETUP.md](./PWA_SETUP.md)

---

## Admin Panel

Content can be managed at `/labs` after logging in at `/admin-login`.

| Section | Manage |
|---------|--------|
| Events | Workshops, dates, gallery images |
| Team | Members, roles, photos |
| Services | Service offerings |
| Projects | Portfolio entries, links, status |

Event gallery images can be added as URLs (`/images/events/photo.jpg`) or uploaded directly in the admin editor.

---

## Project Structure

```
research-hub/
├── public/              # Static assets, PWA, OG images
│   └── images/          # Logos, team photos, event gallery
├── src/
│   ├── components/      # Header, Footer, Hero, Contact, etc.
│   ├── config/          # Site branding, contact, stats
│   ├── data/            # Firebase data layer & defaults
│   ├── pages/           # Route pages
│   └── firebase/        # Firebase config
├── scripts/             # Icon & asset generation
└── vercel.json          # Deployment config
```

---

## Contact

| | |
|---|---|
| **Email** | betatechlabs10@gmail.com |
| **Phone** | +256 764 331 334 |
| **WhatsApp** | +256 764 331 334 |
| **Office** | Behind Kabale Central Police Station, Kabale Main Town |
| **Landmark** | Opposite Numba Cafe, near All Saints Church |
| **Hours** | Mon - Fri, 9:00 AM - 5:00 PM |

---

<div align="center">

**Beta-Tech Labs Company Limited** · Kabale, Uganda · Est. 2024

</div>
