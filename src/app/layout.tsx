import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ride Link Driver",
    template: "%s | Ride Link Driver",
  },
  description:
    "Professional ride-sharing driver application for managing rides, tracking earnings, and connecting with passengers",
  applicationName: "Ride Link Driver",
  authors: [{ name: "Ride Link Team" }],
  keywords: [
    "ride sharing",
    "driver app",
    "transportation",
    "earnings tracker",
    "progressive web app",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ride Link Driver",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Ride Link Driver",
    title: "Ride Link Driver",
    description: "Professional ride-sharing driver application",
  },
  twitter: {
    card: "summary",
    title: "Ride Link Driver",
    description: "Professional ride-sharing driver application",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
