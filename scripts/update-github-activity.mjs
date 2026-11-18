import { writeFile } from "node:fs/promises";
import { URL } from "node:url";

const username = "CHINMAYEEHARANE58";
const response = await globalThis.fetch(`https://github.com/users/${username}/contributions`, {
  headers: { "User-Agent": "ChinmayeePortfolio/1.0" },
});
if (!response.ok) throw new Error(`GitHub contributions request failed: ${response.status}`);
const html = await response.text();
const days = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g)]
  .map(([, date, level]) => ({ date, level: Number(level) }));
if (days.length < 300) throw new Error(`Expected a year of contribution data, got ${days.length} days`);
const payload = { username, fetchedAt: new Date().toISOString(), days };
await writeFile(new URL("../src/content/github-activity.json", import.meta.url), JSON.stringify(payload, null, 2) + "\n");
globalThis.console.log(`Saved ${days.length} public GitHub contribution days`);
