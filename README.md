# Chinmayee Harane — portfolio

GitHub repository: [CHINMAYEEHARANE58/Portfolio](https://github.com/CHINMAYEEHARANE58/Portfolio). The local `main` branch tracks `origin/main`.

A multi-page Next.js App Router portfolio built with TypeScript. The homepage uses a compact single-page presentation with a live year counter, experience and education, a public GitHub contribution snapshot, selected project cards, highlights, contact, and a floating dock. The full directory includes twelve case studies and ten additional web projects. The original static site is retained in `legacy/` for reference.

## Local setup

Requires Node.js 22.12 or newer (Node 24 recommended) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. For a production check:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run start
```

Run browser tests after installing the browser once:

```bash
npx playwright install chromium
npm run test:e2e
```

The end-to-end tests start their own server on port 3100 and mock the email API for success and failure cases. They do not send real email. Automated axe checks run across the primary routes. Lighthouse can be run against a production server or deployed URL; scores vary by device and network.

## Content updates

- Profile, skills, and experience: `src/content/profile.ts`.
- Projects, links, status, evidence notes, and case-study text: `src/content/projects.ts`. Add a new entry to the array to generate its card and `/projects/[slug]` page. Categories come from the typed `categories` list.
- Homepage section content and featured-project selection: `src/content/showcase.ts`. The activity snapshot is `src/content/github-activity.json`; refresh it with `node scripts/update-github-activity.mjs`.
- Smaller GitHub web projects: `src/content/more-web-projects.ts`. These join the directory search and filters without implying a detailed case study. The directory now includes recent systems such as TeamFlow, StockPilot, SentinelOps, DocuMind, and CareConnect alongside earlier work. Empty repositories, portfolio copies, duplicate implementations, and infrastructure labs are excluded.
- Earlier portfolio links are retained in the `earlierProjects` list in the same file; they are displayed separately without unverified status or case-study claims.
- Resume: edit `scripts/build-resume.py` and run it with Python and ReportLab to regenerate `public/resume/Chinmayee_Harane_Resume.pdf` and `output/pdf/Chinmayee_Harane_Resume.pdf`. Keep the path in `src/content/profile.ts` in sync if renaming.
- Portrait: `public/images/chinmayee.jpg`.
- Availability badge: `NEXT_PUBLIC_AVAILABLE_FOR_WORK=true` when applicable. The default is “Open to conversations.”
- The homepage's live year animation is in `src/components/LiveYearCounter.tsx`. Earlier typing-role code remains in `src/components/TypedRole.tsx` for other uses.

Project illustrations other than the existing GigX image are abstract artwork, not screenshots. SplitStream's planned modules and integrations are explicitly separated from its current milestone. InternAgent's external submissions remain disabled; ClosetAI's AI functionality requires a configured server-side provider and its development mock is labeled.

## Contact form

Without configuration, `/contact` provides a working `mailto:` link. To enable the web form, set all of these environment variables from `.env.example` in `.env.local` for local work and in Vercel for deployment:

- `RESEND_API_KEY` — server-only Resend API key.
- `CONTACT_TO_EMAIL` — inbox that receives messages.
- `CONTACT_FROM_EMAIL` — sender address on a verified Resend domain.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — server-only Upstash Redis REST credentials for distributed rate limiting.

The endpoint validates inputs, checks same-origin requests, uses a hidden spam field, limits an IP hash to five submissions per hour, and reports provider failures. It does not persist message content. Redeploy after adding variables so the static contact page displays the form. Use a verified sender domain before testing real delivery.

## Deploy to Vercel

1. Import the linked GitHub repository in Vercel as a Next.js project. New commits to `main` can then trigger Vercel deployments after the project is connected.
2. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` origin before deployment. This enables canonical URLs, the sitemap, and absolute social preview images. Do not set it to a preview or placeholder domain for production.
3. Add the contact variables above only if the form should be active. Keep all secret values server-side.
4. Deploy. Vercel runs `next build`. Verify `/`, `/about`, `/projects`, each case study, `/experience`, `/contact`, `/robots.txt`, `/sitemap.xml`, the résumé URL, and the generated social image.
5. To connect a custom domain, add it in Vercel's project Domains settings, follow the displayed DNS records, set `NEXT_PUBLIC_SITE_URL` to that domain, and redeploy.

The project uses no database for portfolio content. The CSP currently permits inline scripts and styles because of Next.js hydration and style handling; other sources are restricted to the site origin. Review the policy when introducing third-party services. Do not commit `.env.local` or credentials.

## Structure

- `src/app` — routes, metadata, API, and styles.
- `src/components` — shared UI and client interactions.
- `src/content` — typed profile and project data.
- `src/lib` — filtering, validation, and metadata helpers.
- `tests` — unit and Playwright browser tests.
- `public` — portrait, project image, theme boot script, and current résumé.
- `legacy` — previous static HTML/CSS/JS.

No Vercel deployment has been performed from this local checkout.
