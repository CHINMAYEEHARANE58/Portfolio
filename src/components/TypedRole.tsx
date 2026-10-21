"use client";
import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
export function TypedRole() {
  const target = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!target.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let instance: { destroy: () => void } | undefined;
    let active = true;
    import("typed.js").then(({ default: Typed }) => {
      if (active && target.current) instance = new Typed(target.current, { strings: [...profile.roles], typeSpeed: 100, backSpeed: 100, backDelay: 1000, loop: true });
    });
    return () => { active = false; instance?.destroy(); };
  }, []);
  return <span ref={target} className="typed-role">{profile.roles[0]}</span>;
}
