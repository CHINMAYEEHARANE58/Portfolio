"use client";

import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/content/profile";

function Icon({ name }: { name: "home" | "projects" | "resume" | "github" | "linkedin" | "mail" }) {
  const common = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (name === "home") return <svg {...common}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/></svg>;
  if (name === "projects") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>;
  if (name === "resume") return <svg {...common}><path d="M6 2h9l4 4v16H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM14 2v5h5M8 12h8M8 16h8"/></svg>;
  if (name === "github") return <svg {...common}><path d="M9 19c-4.5 1.4-4.5-2.5-6-3m12 5v-3.9a3.5 3.5 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.5S17.5.2 15 2a13.5 13.5 0 0 0-6 0C6.5.2 5.3.6 5.3.6a4.8 4.8 0 0 0-.1 3.5 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.5 3.5 0 0 0 9 17.1V21"/></svg>;
  if (name === "linkedin") return <svg {...common}><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10v7M7 7h.01M11 17v-7h3v1.3a3 3 0 0 1 5 2.2V17"/></svg>;
  return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>;
}

export function FloatingDock() {
  return <nav className="showcase-dock" aria-label="Quick navigation">
    <a href="#home" aria-label="Back to top" title="Home"><Icon name="home"/></a>
    <a href="#projects" aria-label="Jump to projects" title="Projects"><Icon name="projects"/></a>
    <a href={profile.resume} target="_blank" rel="noopener noreferrer" aria-label="Open résumé" title="Résumé"><Icon name="resume"/></a>
    <span className="showcase-dock-divider" aria-hidden="true"/>
    <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Icon name="github"/></a>
    <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><Icon name="linkedin"/></a>
    <a href={`mailto:${profile.email}`} aria-label="Email Chinmayee" title="Email"><Icon name="mail"/></a>
    <span className="showcase-dock-divider" aria-hidden="true"/>
    <ThemeToggle/>
  </nav>;
}
