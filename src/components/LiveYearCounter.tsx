"use client";

import { useEffect, useState } from "react";

function fractionalYear(now: Date) {
  const year = now.getFullYear();
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year + 1, 0, 1).getTime();
  return `${year + (now.getTime() - start) / (end - start)}`.slice(0, 14);
}

export function LiveYearCounter() {
  const [value, setValue] = useState(() => fractionalYear(new Date()));
  useEffect(() => {
    const update = () => setValue(fractionalYear(new Date()));
    update();
    const timer = window.setInterval(update, 100);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="live-year" title="The current year, updating live" aria-label="The current year, updating live" suppressHydrationWarning>{value}</span>;
}
