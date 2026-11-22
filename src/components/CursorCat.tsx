"use client";

import { useEffect, useRef } from "react";

const CAT_SIZE = 48;
const EDGE_GAP = 8;

function clamp(value: number, max: number) {
  return Math.max(EDGE_GAP, Math.min(value, Math.max(EDGE_GAP, max - CAT_SIZE - EDGE_GAP)));
}

export function CursorCat() {
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = catRef.current;
    if (!cat) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initial = cat.getBoundingClientRect();
    let x = initial.left;
    let y = initial.top;
    let targetX = x;
    let targetY = y;
    let previousPointerX: number | null = null;
    let frame = 0;
    let lastFrame = 0;
    let hasPointer = false;
    let direction: "left" | "right" = "right";

    cat.style.left = "0";
    cat.style.top = "0";
    cat.style.right = "auto";
    cat.style.bottom = "auto";

    function place() {
      cat!.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    }

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      cat!.classList.remove("is-walking");
    }

    function animate(now: number) {
      frame = 0;
      if (reducedMotion.matches) {
        stop();
        return;
      }

      const elapsed = lastFrame ? Math.min(now - lastFrame, 64) : 16;
      lastFrame = now;
      const ease = 1 - Math.exp(-elapsed / 125);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;

      const distance = Math.hypot(targetX - x, targetY - y);
      cat!.classList.toggle("is-walking", distance > 1);
      place();

      if (distance > 0.5) frame = requestAnimationFrame(animate);
      else {
        x = targetX;
        y = targetY;
        place();
        stop();
      }
    }

    function follow(event: PointerEvent) {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      hasPointer = true;
      if (previousPointerX !== null && Math.abs(event.clientX - previousPointerX) > 2) {
        direction = event.clientX < previousPointerX ? "left" : "right";
        cat!.dataset.direction = direction;
      }
      previousPointerX = event.clientX;

      // The offset puts the cat behind the cursor instead of covering it.
      targetX = clamp(event.clientX + (direction === "left" ? 14 : -CAT_SIZE - 14), window.innerWidth);
      targetY = clamp(event.clientY + 14, window.innerHeight);
      if (!frame) frame = requestAnimationFrame(animate);
    }

    function keepInView() {
      if (!hasPointer) {
        targetX = window.innerWidth - CAT_SIZE - (window.innerWidth <= 700 ? 14 : 24);
        targetY = window.innerHeight - CAT_SIZE - (window.innerWidth <= 700 ? 82 : 24);
      } else {
        targetX = clamp(targetX, window.innerWidth);
        targetY = clamp(targetY, window.innerHeight);
      }
      x = clamp(x, window.innerWidth);
      y = clamp(y, window.innerHeight);
      place();
    }

    function motionChanged() {
      if (reducedMotion.matches) stop();
      else if (Math.hypot(targetX - x, targetY - y) > 0.5 && !frame) frame = requestAnimationFrame(animate);
    }

    place();
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("resize", keepInView);
    reducedMotion.addEventListener("change", motionChanged);
    cat.dataset.ready = "true";

    return () => {
      stop();
      delete cat.dataset.ready;
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("resize", keepInView);
      reducedMotion.removeEventListener("change", motionChanged);
    };
  }, []);

  return <div ref={catRef} className="cursor-cat" data-testid="cursor-cat" data-direction="right" aria-hidden="true">
    <span className="cursor-cat-facing">
      <svg className="cursor-cat-sprite" viewBox="0 0 32 32" width="48" height="48" shapeRendering="crispEdges" focusable="false">
        <g className="cursor-cat-tail">
          <path fill="#50392f" d="M2 13h3v2H4v4h3v2h3v3H6v-2H3v-3H1v-4h1z" />
          <path fill="#d5a87d" d="M3 15h1v4h3v2h2v2H7v-3H3z" />
        </g>
        <path fill="#50392f" d="M9 16h13v2h3v8h-2v4h-6v-3h-3v3H8v-4H6v-7h3z" />
        <path fill="#e7bf94" d="M9 18h13v2h2v5h-2v2h-3v-2h-6v2h-3v-2H8v-5h1z" />
        <path fill="#f8dfb9" d="M12 19h8v7h-8z" />
        <path fill="#b88461" d="M9 27h4v2H9zm9 0h4v2h-4z" />
        <path fill="#50392f" d="M19 8h2V4h4v3h1V4h4v8h1v11h-2v2h-9v-2h-2V11h1z" />
        <path fill="#e7bf94" d="M21 9h2V6h1v4h4V6h1v7h1v9h-2v2h-7v-2h-2V12h2z" />
        <path fill="#f5a7a8" d="M22 7h1v3h-1zm5 0h1v3h-1z" />
        <path fill="#f8dfb9" d="M21 18h8v4h-8z" />
        <g className="cursor-cat-eye"><path fill="#302c31" d="M21 14h2v3h-2zm5 0h2v3h-2z" /><path fill="#fff" d="M21 14h1v1h-1zm5 0h1v1h-1z" /></g>
        <path fill="#e8838f" d="M24 18h2v2h-2z" />
        <path fill="#50392f" d="M24 20h1v1h-1zm2 0h1v1h-1zm-9-2h3v1h-3zm-1 3h4v1h-4zm13-3h3v1h-3zm0 3h3v1h-3z" />
        <path fill="#518f8b" d="M19 22h10v2H19z" />
        <path fill="#f2c660" d="M24 23h2v2h-2z" />
      </svg>
    </span>
  </div>;
}
