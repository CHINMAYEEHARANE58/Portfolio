"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/content/profile";

const links = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/projects", label: "Projects" }, { href: "/experience", label: "Experience" }, { href: "/contact", label: "Contact" }];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = Array.from(document.querySelectorAll<HTMLAnchorElement>("#mobile-nav a"));
        if (!items.length) return;
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items[items.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === items[items.length - 1]) { event.preventDefault(); items[0].focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);
  const nav = links.map((link, index) => <Link key={link.href} ref={index === 0 ? firstLink : undefined} href={link.href} aria-current={pathname === link.href || (link.href === "/projects" && pathname.startsWith("/projects/")) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>);
  return <header className="site-header"><div className="nav-shell container">
    <Link href="/" className="mark" aria-label="Chinmayee Harane home"><span className="mark-symbol">CH<span className="accent">.</span></span><span className="mark-name">Chinmayee Harane</span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">{nav}</nav>
    <div className="nav-actions"><ThemeToggle/><a className="nav-resume" href={profile.resume} download>Resume <span aria-hidden="true">↗</span></a><button ref={menuRef} className="menu-toggle icon-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? "✕" : "☰"}</span></button></div>
  </div>{open && <><button className="menu-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)}></button><nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{nav}<a href={profile.resume} download onClick={() => setOpen(false)}>Download resume ↗</a></nav></>}</header>;
}
