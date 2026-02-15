# Ride Link Driver

A production-grade Progressive Web Application (PWA) built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. This application follows enterprise-level architectural patterns and best practices for scalability, maintainability, and performance.

## ✨ Features

- 🚀 **Next.js 16** - Latest Next.js with App Router, Turbopack, and React Server Components
- 📱 **Progressive Web App** - Installable app with offline support and service workers
- 🎨 **Tailwind CSS 4** - Modern utility-first CSS framework
- 🔒 **TypeScript** - Type-safe codebase with strict mode enabled
- 🧪 **Comprehensive Testing** - Jest, React Testing Library, and Playwright
- ⚡ **Development Tooling** - ESLint, Prettier, Husky, lint-staged
- 🔐 **Security Headers** - Modern security headers configured
- 📊 **CI/CD Ready** - GitHub Actions workflow included

## 🏗️ Tech Stack

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **PWA:** @ducanh2912/next-pwa with Workbox
- **Testing:**
  - Unit & Integration: Jest + React Testing Library
  - E2E: Playwright
- **Code Quality:** ESLint + Prettier + Husky
- **Package Manager:** pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 9.x or higher

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Ride-Link-Driver
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.local.example .env.local
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run all tests
- `pnpm test:unit` - Run unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate coverage report
- `pnpm test:e2e` - Run E2E tests with Playwright

## 📁 Project Structure

```
Ride-Link-Driver/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── .husky/                 # Git hooks
├── __tests__/              # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                   # Documentation
├── public/                 # Static assets
│   ├── icons/              # PWA icons
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── offline/        # Offline fallback
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── features/       # Feature components
│   │   ├── layout/         # Layout components
│   │   └── providers/      # Context providers
│   └── lib/                # Utilities and libraries
│       ├── hooks/          # Custom React hooks
│       ├── utils/          # Helper functions
│       ├── constants/      # App constants
│       ├── types/          # TypeScript types
│       └── services/       # API services
├── .env.local.example      # Environment variables template
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── jest.config.ts          # Jest configuration
├── next.config.ts          # Next.js configuration
├── playwright.config.ts    # Playwright configuration
├── package.json
└── tsconfig.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME="Ride Link Driver"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### PWA Configuration

The PWA is configured in `next.config.ts` with:

- Service worker registration
- Offline fallback pages
- Comprehensive caching strategies
- Security headers

## 🧪 Testing

### Unit Tests

```bash
pnpm test:unit
```

### E2E Tests

```bash
pnpm test:e2e
```

### Coverage

```bash
pnpm test:coverage
```

Coverage thresholds are set at 70% for branches, functions, lines, and statements.

## 🚢 Deployment

### Build Production Bundle

```bash
pnpm build
pnpm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The application is optimized for deployment on Vercel with zero configuration.

## 📝 Code Quality

This project enforces code quality through:

- **ESLint** - Static code analysis with Next.js recommended rules
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety and better IDE support
- **Husky** - Pre-commit hooks to ensure code quality
- **lint-staged** - Run linters only on staged files

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Workbox](https://developers.google.com/web/tools/workbox)
- [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa)
