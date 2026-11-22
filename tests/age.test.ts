import { describe, expect, it } from "vitest";
import { fractionalAge } from "@/lib/age";

describe("live age counter", () => {
  it("turns 21 at midnight on 8 May in Pune", () => {
    expect(fractionalAge(new Date("2026-05-07T18:29:59.999Z"))).toBeLessThan(21);
    expect(fractionalAge(new Date("2026-05-07T18:30:00.000Z"))).toBe(21);
  });

  it("progresses smoothly between birthdays, including leap years", () => {
    const start = new Date("2027-05-07T18:30:00.000Z");
    const end = new Date("2028-05-07T18:30:00.000Z");
    const midpoint = new Date((start.getTime() + end.getTime()) / 2);
    expect(fractionalAge(start)).toBe(22);
    expect(fractionalAge(midpoint)).toBe(22.5);
    expect(fractionalAge(end)).toBe(23);
  });
});
