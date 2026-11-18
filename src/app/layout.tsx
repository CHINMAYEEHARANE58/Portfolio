import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CursorCat } from "@/components/CursorCat";
import { pageMetadata } from "@/lib/metadata";
import Script from "next/script";
import "./globals.css";
import "./showcase.css";
import "./cursor-cat.css";

export const metadata: Metadata = { ...pageMetadata("Chinmayee Harane | Software Engineer", "Software engineer building full-stack applications and exploring backend systems, data, and cybersecurity."), ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}), applicationName: "Chinmayee Harane Portfolio" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "dark light" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><head><Script src="/theme-init.js" strategy="beforeInteractive" /></head><body><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">{children}</main><Footer/><CursorCat/></body></html>;
}
