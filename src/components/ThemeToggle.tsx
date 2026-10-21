"use client";
import { useSyncExternalStore } from "react";

function currentTheme(): "dark" | "light" { return document.documentElement.dataset.theme === "light" ? "light" : "dark"; }
function subscribe(callback: () => void) { window.addEventListener("portfolio-theme-change", callback); return () => window.removeEventListener("portfolio-theme-change", callback); }

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark");
  function toggle() {
    const current = currentTheme();
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }
  return <button className="theme-toggle icon-button" type="button" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title="Toggle color theme"><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span></button>;
}
