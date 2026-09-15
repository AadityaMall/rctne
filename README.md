# Rotaract Club of Thane North End — RCTNE Website

Welcome to the official web application of the **Rotaract Club of Thane North End (RCTNE)** for the year **Aagaz '26–27** (*"Every beginning holds endless possibilities"*).

This repository is built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **GSAP ScrollTrigger**.

---

## 📋 Table of Contents

- [Overview & Purpose](#-overview--purpose)
- [Tech Stack](#-tech-stack)
- [Architecture & Directory Structure](#-architecture--directory-structure)
- [Core Architectural Rules (AGENTS.md)](#-core-architectural-rules-agentsmd)
- [Key Features & Pages](#-key-features--pages)
- [Data & Service Layer Pattern](#-data--service-layer-pattern)
- [Contact Form & SMTP Integration](#-contact-form--smtp-integration)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Building & Deployment](#-building--deployment)
- [AI Agent & Developer Cheat Sheet](#-ai-agent--developer-cheat-sheet)

---

## 🌟 Overview & Purpose

The Rotaract Club of Thane North End is a youth-led community service organization under Rotary International District 3142. This website serves as RCTNE's digital home to showcase community initiatives, upcoming drives, project portfolios, team leadership, event galleries, and to onboard new prospective members.

---

## 🛠 Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Framework** | Next.js 16.2 (App Router with Turbopack) |
| **Language** | TypeScript (Strict mode, zero `any`) |
| **Styling** | Tailwind CSS v4 + Semantic CSS Variables (`OKLCH` token colors) |
| **UI Components** | Radix UI primitives / shadcn/ui (`src/components/ui/`) |
| **Animations** | Framer Motion (micro-interactions) + GSAP & ScrollTrigger (stacked card storytelling) |
| **Icons** | Lucide React (`lucide-react`) |
| **Notifications** | Sonner (`sonner` toast notifications) |
| **Mailer** | Nodemailer (`nodemailer` for SMTP via Gmail App Password) |

---

## 📁 Architecture & Directory Structure

All application code resides strictly within the `src/` directory:

```text
rctne/
├── .agents/                 # AI subagent configuration and skills
├── src/
│   ├── app/                 # Next.js App Router (Pages are thin shells; no inline business logic)
│   │   ├── about/           # About Us page
│   │   ├── api/
│   │   │   └── contact/     # SMTP mail submission endpoint
│   │   ├── calendar/        # Events calendar page
│   │   ├── contact/         # Membership application & contact form page
│   │   ├── gallery/         # Event photo gallery page
│   │   ├── projects/        # Full project portfolio with GSAP card stacks
│   │   ├── team/            # Board of Directors & leadership team
│   │   ├── globals.css      # CSS design tokens & OKLCH color system
│   │   ├── layout.tsx       # Root layout (Navbar, Footer, Floating CTA, Toaster)
│   │   └── page.tsx         # Home page shell
│   ├── components/
│   │   ├── features/        # Page-specific feature components (home, contact, etc.)
│   │   ├── layout/          # Application shell (Navbar, Footer, MorphingBackground, WhatsAppFloatingCta)
│   │   ├── shared/          # Reusable components across features (PhotoCard, SectionHeader, SocialIcons)
│   │   └── ui/              # shadcn UI components (button, skeleton, blur-fade, etc.)
│   ├── data/                # Static/mock content (Never imported directly by components)
│   │   ├── about.data.ts
│   │   ├── calendar.data.ts
│   │   ├── gallery.data.ts
│   │   ├── nav.data.ts
│   │   ├── projects.data.ts
│   │   ├── site-config.data.ts
│   │   └── team.data.ts
│   ├── services/            # Service Layer (All data fetching & API interactions live here)
│   │   ├── base.ts          # Centralized API wrapper
│   │   ├── contact.service.ts
│   │   └── content.service.ts
│   ├── types/               # TypeScript interfaces & type definitions
│   │   ├── content.types.ts
│   │   ├── nav.types.ts
│   │   └── site-config.types.ts
│   └── lib/                 # Utility functions (`cn()` helper)
├── public/                  # Static assets (images, logos, project photos)
├── .env.local               # Environment variables (SMTP credentials)
├── AGENTS.md                # Single source of truth for project coding standards
├── DESIGN.md                # Aesthetic tokens & design documentation
└── site-config.data.ts      # Centralized site settings, SEO metadata, & external URLs
```

---

## 📜 Core Architectural Rules (AGENTS.md)

When modifying or extending this repository, the following rules defined in `AGENTS.md` **must be strictly followed**:

1. **Path Aliases**: Always use absolute path imports with `@/` (e.g., `import { siteConfig } from "@/data/site-config.data"`).
2. **Service-Layer Enforced**: Components and custom hooks **never** call `fetch()` or import from `src/data/` directly. They **always** consume data via `src/services/`.
3. **Promise-Based Service Layer**: Service functions that return mock data always wrap results in a `Promise` (e.g. `Promise.resolve(data)`), ensuring seamless future backend integration.
4. **Strict TypeScript Discipline**: No `any` types permitted. All domain models and API shapes live in `src/types/`.
5. **Component Ownership**:
   - `src/components/ui/` is managed by shadcn/ui. Never edit manually.
   - `src/lib/` is managed by third-party utilities. Never edit manually.
6. **Styling & Dark Mode**:
   - Semantic tokens only (e.g. `text-text`, `bg-background`, `text-accent`, `text-text-muted`).
   - Every component supports both light and dark modes natively.
7. **Error Handling & Loading**:
   - Use Sonner toast notifications for user feedback. No `console.log` or `console.error` in production code.
   - Use Skeleton loaders (`@/components/ui/skeleton`) instead of loading spinners.

---

## 🚀 Key Features & Pages

### 1. Home Page (`/`)
- **Hero Section (`HomeHero.tsx`)**: High-impact headline, animated shiny badge, CTA to Google Form Join Us application, and quick link to projects.
- **Work Glimpse (`WorkGlimpse.tsx`)**: Interactive project cards showcase with hover reveals and reel previews.
- **Impact Metrics**: Numbers ticker displaying drives conducted, lives touched, and volunteer hours.
- **Calendar Preview (`CalendarSection.tsx`)**: Displays 3 upcoming drives with dynamic "Get WhatsApp Updates →" action buttons.
- **Closing CTA (`ClosingCTA.tsx`)**: Invitation to join the club or sponsor initiatives.

### 2. Projects Portfolio (`/projects`)
- Implements a **GSAP ScrollTrigger stacked vertical card presentation** with scaling and pinning mechanics.
- Interactive Instagram Reels overlay iframe embeds.
- "Join Next Drive →" buttons on each project card linking to RCTNE's WhatsApp channel.

### 3. Events Calendar (`/calendar`)
- Segregates **Upcoming** and **Past** events.
- Displays event category tags, date, location, and highlights.
- Clear link labels: "Get WhatsApp Updates →" for WhatsApp channel links, or "Register Now →" for specific event registration forms.

### 4. About Us (`/about`)
- Overview of RCTNE's history since establishment, district details (District 3142), mission & vision statements, 5 core pillars, organizational values, district awards list, and President's theme.

### 5. Team Directory (`/team`)
- Showcases the Board of Directors, executive officers, and core council members.

### 6. Gallery (`/gallery`)
- Masonry-style photo grid featuring high-resolution images from past community drives.

### 7. Contact & Membership (`/contact`)
- **Become a Member Section**: Frequently asked membership questions and direct "Apply Now" Google Form CTA.
- **WhatsApp Channel Banner**: Subtle, frosted card inviting visitors to join the official WhatsApp channel for real-time announcements.
- **Contact Form**: Interactive form powered by Next.js API route and Nodemailer.

### 8. Floating WhatsApp CTA (`WhatsAppFloatingCta.tsx`)
- A subtle, frosted-glass floating button (`bottom-6 right-6`) rendered across all pages via `RootLayout` for quick one-click access to RCTNE's WhatsApp channel.

---

## 🔄 Data & Service Layer Pattern

All application content is driven through the service layer:

```ts
// 1. Data Definition (src/data/projects.data.ts)
export const projects: Project[] = [ ... ];

// 2. Service Layer (src/services/content.service.ts)
export const contentService = {
  getProjects: (): Promise<Project[]> => Promise.resolve(projects),
};

// 3. Component Usage (Server or Client Component)
const projects = await contentService.getProjects();
```

Central site configuration (SEO metadata, membership Google Form URL, WhatsApp channel URL, contact email recipients) is configured in:
`src/data/site-config.data.ts`

```ts
export const siteConfig = {
  whatsappChannel: "https://whatsapp.com/channel/0029Vb8jEJoF6sn6OzY2K802",
  joinFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd4PMpFJBqYdsu-CJOFm8DBKcnf_eUlXclo_QuyXF34FAKKw/viewform",
  contactForm: {
    recipients: [
      "rotaractthanenorthend@gmail.com",
      "rtrkhushimahajan@gmail.com",
      "rtr.virajpongurlekar@gmail.com",
      "rtr.anoushkka.nair@gmail.com",
      "rtrshreyadeshpande@gmail.com"
    ],
  },
};
```

---

## ✉️ Contact Form & SMTP Integration

The contact form sends automated email notifications to all configured recipient email addresses via `src/app/api/contact/route.ts`.

- **Endpoint**: `POST /api/contact`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+91 9876543210",
    "subject": "General Inquiry",
    "message": "I would like to volunteer for upcoming drives."
  }
  ```
- **SMTP Provider**: Gmail SMTP (`smtp.gmail.com:465`).

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Gmail SMTP Configuration for Contact Form Submissions
GMAIL_USER=rotaractthanenorthend@gmail.com
GMAIL_APP_PASSWORD=your_16_digit_app_password
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AadityaMall/rctne.git
   cd rctne
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Building & Deployment

### Run Type Checks
```bash
npx tsc --noEmit
```

### Run ESLint
```bash
npm run lint
```

### Build Production Bundle
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

---

## 🤖 AI Agent & Developer Cheat Sheet

For AI coding agents or developers extending this project:

| Task | File / Directory to Modify | Guidelines |
| :--- | :--- | :--- |
| **Add a new page** | `src/app/[page-name]/page.tsx` | Use server components by default; import data only via services. |
| **Add a static section/content** | `src/data/[name].data.ts` & `src/services/content.service.ts` | Export typed const in data file, wrap in Promise in service file. |
| **Update global metadata or links** | `src/data/site-config.data.ts` | Update `siteConfig` object (WhatsApp link, Google Form URL, email recipients). |
| **Add a new type** | `src/types/[name].types.ts` | Use TypeScript interfaces for object shapes; avoid `any`. |
| **Modify theme / colors** | `src/app/globals.css` | Update CSS variables (`OKLCH` values) for light/dark mode. |
| **Add a UI component** | `.agents/skills/shadcn/SKILL.md` | Follow shadcn component conventions. |

---

*Rotaract Club of Thane North End — Youth in Action, Impact in Motion.*
