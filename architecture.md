# Ride-Link Driver Next.js Architecture Document

This document outlines the recommended architecture, directory structure, and best practices for the **Ride-Link-Driver** Next.js application. It leverages the latest Next.js features (App Router, Server Components) and the chosen tech stack (React 19, Tailwind CSS v4, TypeScript, Jest, Playwright).

## 1. High-Level Architecture Overview

The application follows a **Domain-Driven / Feature-Sliced** architectural pattern. Instead of grouping files strictly by type (e.g., all components together, all hooks together), files are grouped by feature or domain (e.g., `auth`, `vehicles`, `bookings`). This ensures that as the application scales, related logic remains co-located for better maintainability.

### Core Stack

- **Framework:** Next.js (App Router)
- **UI & Styling:** React 19, Tailwind CSS v4
- **Language:** TypeScript (Strict mode enabled)
- **State Management:** React Context API + Server State (React Server Components / React Query for client state if needed)
- **Offline / PWA:** `next-pwa` with Workbox
- **Testing:** Jest (Unit/Integration) & Playwright (End-to-End)

---

## 2. Directory Structure

The project structure is organized to separate routing from business logic and UI components:

```text
ride-link-driver/
├── src/
│   ├── app/                    # Next.js App Router (Routing, Layouts, Pages)
│   │   ├── (auth)/             # Route groups for shared layouts
│   │   ├── api/                # Next.js Route Handlers (Backend BFF logic)
│   │   ├── layout.tsx          # Root layout (Providers, Fonts, Meta)
│   │   └── page.tsx            # Home page
│   │
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Generic, atomic UI components (Buttons, Inputs, Modals)
│   │   └── layout/             # Global layout components (Header, Footer, Navigation)
│   │
│   ├── features/               # Domain-driven feature modules
│   │   ├── auth/               # Authentication domain
│   │   │   ├── components/     # Specific auth components (LoginForm)
│   │   │   ├── actions.ts      # Next.js Server Actions for auth
│   │   │   ├── api.ts          # Client-side API calls
│   │   │   └── types.ts        # TypeScript interfaces for auth
│   │   ├── vehicle/            # Vehicle management domain
│   │   └── booking/            # Booking management domain
│   │
│   ├── lib/                    # Shared utility functions and configurations
│   │   ├── apiClient.ts        # Axios/Fetch wrapper
│   │   ├── constants.ts        # App-wide constants
│   │   └── utils.ts            # General helper functions (date formatting, strings)
│   │
│   ├── hooks/                  # Global custom React hooks
│   ├── store/                  # Global State Management (Zustand context/stores if needed)
│   ├── types/                  # Global TypeScript definitions
│   └── styles/                 # Global styles (globals.css, tailwind base)
│
├── public/                     # Static assets (images, icons, manifest.json)
├── __tests__/                  # Unit and Integration Tests (Jest)
├── e2e/                        # End-to-End Tests (Playwright)
└── next.config.ts              # Next.js configuration
```

---

## 3. Data Flow & State Management

### Server Components vs. Client Components

- **Default to Server Components (RSC):** All components in `src/app` are Server Components by default. Use them to fetch data directly from the backend, reducing client-side JavaScript bundles and improving SEO/performance.
- **Client Components (`"use client"`):** Use client components ONLY when absolutely necessary (e.g., handling state, effects, browser APIs like `window`, or user interactions like `onClick`). Pushed as deep into the component tree as possible.

### Data Fetching

1. **Server-Side Fetching:** Use standard `fetch` API in Server Components (`page.tsx` or `layout.tsx`) for initial data load. Leverage Next.js caching and revalidation logic (`force-cache`, `revalidate`, `no-store`).
2. **Mutations (Form Submissions):** Use **Next.js Server Actions**. Server Actions provide a seamless way to mutate data securely from the client directly to the server without exposing API routes.
3. **Client-Side Fetching:** For highly dynamic data that updates frequently on the client without a page navigation, use SWR or React Query inside Client Components.

### Global State

Avoid heavy global state libraries (like Redux) unless strictly necessary.

- **URL/Search Params:** Use the URL for shareable state (filters, search queries, pagination).
- **React Context:** Use Context for global UI state (Theme, Sidebar toggle, Auth User State).
- **Zustand:** If complex client-side state is required (e.g., multi-step booking forms).

---

## 4. Component Architecture (Feature-Sliced Design)

### The UI Layer (`src/components/ui`)

Dumb, stateless components that strictly render what they are given. Typical examples: `<Button />`, `<Input />`, `<Card />`. These components should mostly receive props, handle their own local UI state if necessary (e.g., dropdown open/close), and fire callbacks.

### The Feature Layer (`src/features/*`)

Smart components and business logic related to a specific domain.
Example for a Vehicle Listing feature:

- `features/vehicle/components/VehicleList.tsx` (Renders the list)
- `features/vehicle/actions.ts` (Server actions for fetching/updating vehicle data)
- `features/vehicle/utils.ts` (Formatters specific to vehicles)

### The Routing Layer (`src/app`)

Acts solely as the entry point. Pages should ideally do two things:

1. Parse URL/Search parameters.
2. Delegate to a Feature Component (e.g., `<VehicleDashboard />`) passing down the parameters.

---

## 5. Security & Authentication

- **Authentication Strategy:** Use secure, HttpOnly cookies for session management to protect against XSS attacks.
- **Middleware:** Use Next.js Middleware (`src/middleware.ts`) to intercept requests. Verify the authenticaton token from cookies; if invalid, redirect to `/login`.
- **Authorization:** Validate user roles (Driver vs. Owner) both in the Middleware (for page access) and on the backend API/Server Actions before executing sensitive mutations.
- **Environment Variables:** Never prefix secret keys with `NEXT_PUBLIC_`. Keep sensitive credentials exclusively on the server.

---

## 6. Styling & Theming

- **Tailwind CSS v4:** Use it via utility classes for all styling.
- **Design Tokens:** Define brand colors, font families, and spacing tokens inside the Tailwind configuration to maintain consistency (e.g., the `#136dec` primary blue theme).
- **Class Merging:** Use a utility like `clsx` and `tailwind-merge` in your `lib/utils.ts` to cleanly handle dynamic class names and avoid conflicting Tailwind properties.

---

## 7. Testing Strategy

The repository is pre-configured with two testing layers:

1. **Unit & Component Testing (Jest + React Testing Library):**
   - Located in `__tests__/unit/`.
   - Focus on testing isolated utility functions (`lib/utils.ts`) and pure UI components (`components/ui`).
   - Run via `npm run test:unit`.
2. **End-to-End Testing (Playwright):**
   - Located in `e2e/`.
   - Focus on testing critical user flows (Login, Search Vehicle, Request Booking, Digital Agreement).
   - Simulates real user interaction across desktop and mobile viewports.
   - Run via `npm run test:e2e`.

---

## 8. Progressive Web App (PWA) & Offline Capabilities

The driver app heavily targets mobile users who may experience poor network connectivity.

- **Service Worker (`next-pwa`):** Configured to cache static assets, Google Fonts, and core CSS/JS.
- **Manifest (`public/manifest.json`):** Configures the app to be installable on user home screens with proper icons and theme colors.
- **Offline Fallback:** Implement a custom offline screen that is severed when the network drops and the requested route isn't cached.
- **Background Sync:** Use Workbox Background Sync for non-critical API requests (like logging or analytic events) if the user goes offline briefly.

---

## 9. Error Handling & Monitoring

- **Error Boundaries:** Use `error.tsx` and `global-error.tsx` in the App Router to gracefully catch unexpected runtime errors and present a branded fallback UI, preventing white screens of death.
- **API Errors:** Standardize backend error responses so the frontend can consistently map custom error codes to user-friendly toast notifications.
- **Not Found Pages:** Customize the `not-found.tsx` to handle 404s cleanly.

---

## 10. Performance Optimization Guidelines

- **Image Optimization:** Always use Next.js `<Image />` component with properly defined `width` and `height` to prevent Cumulative Layout Shift (CLS) and leverage modern formats like WebP/AVIF.
- **Font Optimization:** Use `next/font/google` to natively host and optimize typography, removing external network requests.
- **Dynamic Imports:** Use `next/dynamic` for heavy components (e.g., Maps, Charts, PDFs) so they are lazy-loaded only when the user interacts with them or structural criteria are met.
