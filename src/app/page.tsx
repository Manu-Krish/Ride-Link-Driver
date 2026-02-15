"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import InstallPrompt from "@/components/features/InstallPrompt";
import { useOnline } from "@/lib/hooks/useOnline";

export default function Home() {
  const isOnline = useOnline();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for client-side hydration before rendering
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                  isOnline ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </span>
            {isOnline ? "Online" : "Offline"}
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ride Link Driver
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A production-grade Progressive Web App built with Next.js 16, TypeScript, and
            enterprise-level architecture patterns.
          </p>

          {/* Auth Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg border-2 border-[#064E3B] bg-white px-6 py-2.5 font-semibold text-[#064E3B] transition-colors hover:bg-emerald-50"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#064E3B] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#065f46]"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Install Prompt */}
        <InstallPrompt />

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="🚀"
            title="Next.js 16"
            description="Latest Next.js with App Router, Turbopack, and React Server Components"
          />
          <FeatureCard
            icon="📱"
            title="PWA Ready"
            description="Installable app with offline support, service workers, and caching strategies"
          />
          <FeatureCard
            icon="🎨"
            title="Tailwind CSS"
            description="Modern utility-first CSS framework for rapid UI development"
          />
          <FeatureCard
            icon="🔒"
            title="TypeScript"
            description="Type-safe codebase with strict mode enabled for better DX"
          />
          <FeatureCard
            icon="🧪"
            title="Testing Suite"
            description="Jest, React Testing Library, and Playwright for comprehensive testing"
          />
          <FeatureCard
            icon="⚡"
            title="Dev Tooling"
            description="ESLint, Prettier, Husky, and lint-staged for code quality"
          />
        </div>

        {/* Quick Start */}
        <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Start</h2>
          <div className="space-y-4">
            <CodeBlock>pnpm dev</CodeBlock>
            <p className="text-gray-600">
              Open{" "}
              <a
                href="http://localhost:3000"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                http://localhost:3000
              </a>{" "}
              to see this page.
            </p>
            <CodeBlock>pnpm build</CodeBlock>
            <p className="text-gray-600">Build the production application.</p>
            <CodeBlock>pnpm test</CodeBlock>
            <p className="text-gray-600">Run the test suite.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <code className="block rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-gray-100">
      $ {children}
    </code>
  );
}
