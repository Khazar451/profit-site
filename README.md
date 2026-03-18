# PROFIT — Streetwear E-Commerce Site

A modern, minimalist luxury streetwear e-commerce platform built with Next.js 16, React 19, and TypeScript. PROFIT delivers a sleek, noir-inspired shopping experience with smooth animations, a persistent cart, real-time search, and fully responsive design.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [Future Improvements](#future-improvements)

---

## Overview

PROFIT is a high-end streetwear brand storefront. The site showcases a curated collection of apparel, footwear, and accessories with a premium, minimalist aesthetic. It includes a fully functional shopping cart backed by `localStorage`, a slide-out search drawer, and animated product listings — all served through the Next.js App Router.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Prisma](https://www.prisma.io/) | ORM (configured, ready for a database) |
| [ESLint](https://eslint.org/) | Code quality |

---

## Features

- **Product Catalogue** — Responsive product grid with hover animations and quick-view cards
- **Product Detail Pages** — Individual pages per product with image, price, stock status, and reviews
- **Shopping Cart** — Slide-out cart drawer; quantities persist across page reloads via `localStorage`
- **Real-Time Search** — Instant search across product names and descriptions via a slide-out drawer
- **Responsive Design** — Mobile-first layout; hamburger navigation on small screens
- **Scroll-Aware Header** — Fixed header that reacts to scroll position
- **Smooth Animations** — Page-level and component-level transitions powered by Framer Motion
- **REST API Route** — `/api/products` endpoint returning the full product list from a local JSON store

---

## Project Structure

```
profit-site/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       └── route.ts        # GET /api/products
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Product detail page
│   │   ├── globals.css
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Homepage
│   │   └── page.module.css
│   ├── components/
│   │   ├── common/
│   │   │   └── Drawer.tsx          # Reusable slide-out drawer
│   │   ├── AddToCartButton.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SearchDrawer.tsx
│   ├── context/
│   │   └── CartContext.tsx         # Global cart state (React Context)
│   ├── data/
│   │   └── db.json                 # Product data store
│   └── lib/
│       └── db.ts                   # Data access helpers
├── public/
│   └── images/                     # Static assets
├── next.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

---

## Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later (or your preferred package manager)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Khazar451/profit-site.git
cd profit-site

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server with hot-reload |
| `npm run build` | Build an optimised production bundle |
| `npm start` | Start the production server (requires a build first) |
| `npm run lint` | Run ESLint across the project |

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero banner and full product grid |
| `/products/[id]` | Product detail — image, description, price, add-to-cart, reviews |
| `/api/products` | JSON API — returns the complete product catalogue |

---

## Future Improvements

- Connect Prisma to a production database (PostgreSQL / SQLite)
- Add authentication (user accounts, order history)
- Integrate a payment gateway (e.g. Stripe)
- Implement checkout flow and order management
- Add CMS support for product content management
- Expand filtering and sorting on the product grid
