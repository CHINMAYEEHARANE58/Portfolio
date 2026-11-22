"use client";

import { useEffect, useState } from "react";
import { fractionalAge } from "@/lib/age";

function formatAge(now: Date) {
  return fractionalAge(now).toFixed(10);
}

export function LiveAgeCounter() {
  const [value, setValue] = useState(() => formatAge(new Date()));

  useEffect(() => {
    const update = () => setValue(formatAge(new Date()));
    update();
    const timer = window.setInterval(update, 100);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="live-age" title="Age in years, updating live">
    <span aria-hidden="true" suppressHydrationWarning>{value}</span>
    <span className="sr-only" suppressHydrationWarning>{Math.floor(Number(value))} years old</span>
  </span>;
}
