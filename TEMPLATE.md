# Portfolio template

This repository is a reusable Next.js portfolio template. The homepage content is intentionally separated from its layout and styles so the site can be adapted without editing every component.

1. Update the name, email, social links, location, internship entries, and skill groups in `src/content/profile.ts`.
2. Add verified project entries to `src/content/projects.ts`. Each entry generates a directory card and case-study page. Keep current features separate from planned work.
3. Choose the homepage cards and edit education and highlights in `src/content/showcase.ts`. Put project screenshots in `public/images/projects/` and map them in `featuredVisuals`.
4. Replace `public/images/chinmayee.jpg` with a portrait, then adjust its path in `src/app/page.tsx`.
5. Refresh the public GitHub activity snapshot with `node scripts/update-github-activity.mjs` after changing its username in that script.
6. Edit `scripts/build-resume.py`, then run it with ReportLab to regenerate the downloadable PDF.
7. Run `npm run typecheck`, `npm run test`, `npm run build`, and `npm run test:e2e` before publishing.

The homepage layout and motion live in `src/app/page.tsx`, `src/app/showcase.css`, `src/components/LiveYearCounter.tsx`, and `src/components/FloatingDock.tsx`. The rest of the site uses the existing routes and styles. The GitHub activity data is a dated public snapshot, not a real-time private contribution feed.
