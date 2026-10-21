export const categories = ["All", "Full Stack", "Frontend", "Backend", "AI / ML", "Mobile", "Data Engineering", "Cybersecurity"] as const;
export type Category = typeof categories[number];
export type Project = {
  slug: string; title: string; subtitle: string; date: string; dateSort: string;
  category: Category[]; status: "In Progress" | "Completed";
  summary: string; problem: string; approach: string; architecture: string;
  features: string[]; decisions: string[]; challenges: string[]; learnings: string[];
  stack: string[]; planned?: string[]; github?: string; demo?: string;
  art: "agent" | "closet" | "split" | "pass" | "gigx" | "library" | "finsight";
  sourceNote: string;
};

export const projects: Project[] = [
  {
    slug: "internagent", title: "InternAgent", subtitle: "A careful path from discovery to application", date: "October 2026", dateSort: "2026-10-17", category: ["Full Stack", "Backend", "AI / ML"], status: "In Progress", art: "agent",
    summary: "An internship assistant with authenticated dashboards, saved jobs, resume workflows, and evidence-bound application drafts.",
    problem: "Finding relevant internships and preparing tailored applications involves scattered information and repetitive decisions.",
    approach: "Build the account, persistence, and review workflow first. Keep job discovery and applications within explicit source capabilities and user authorization.",
    architecture: "The repository has a Next.js frontend, FastAPI API, PostgreSQL persistence, Clerk-based identity, and Redis-backed production API limits. A stored-catalogue adapter handles imported jobs; it does not fetch job websites.",
    features: ["Authenticated dashboard, settings, saved jobs, and persistent APIs", "Secure resume processing and stored-catalogue matching", "Fact-checked application drafts awaiting user review"],
    decisions: ["A deterministic policy engine gates application paths; AI-generated content cannot submit applications.", "Kept third-party job-site discovery and external submission disabled until reviewed integrations exist."],
    challenges: ["Coordinating verified identity, user-owned data, and safe draft generation across frontend and API boundaries."],
    learnings: ["The staged design separates a tested local workflow from live provider and deployment validation still to be completed."],
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Clerk", "Redis"],
    planned: ["Live Clerk browser verification", "Reviewed job-source integrations", "External application submission only after explicit authorization and integration review"],
    github: "https://github.com/CHINMAYEEHARANE58/apply-agent", sourceNote: "Repository README, architecture notes, and release-status report checked in October 2026. The repository does not claim production deployment or automated submissions."
  },
  {
    slug: "closetai", title: "ClosetAI", subtitle: "A wardrobe with more possibilities", date: "May–October 2026", dateSort: "2026-10-15", category: ["Full Stack", "AI / ML"], status: "In Progress", art: "closet",
    summary: "A fashion planning platform for organizing clothes, building outfits and lookbooks, and exploring provider-backed styling tools.",
    problem: "A wardrobe is hard to use when items, outfit ideas, and shopping decisions are spread across different places.",
    approach: "Bring wardrobe management and saved looks into one account, then add optional AI-assisted analysis with clear configuration and review boundaries.",
    architecture: "The public repository is a Next.js/React web app with an Express/TypeScript API and PostgreSQL through Prisma. Image analysis and chat call a configured provider on the server; the development mock is explicitly labeled. Saved outfits and lookbooks persist in PostgreSQL.",
    features: ["Account and wardrobe flows", "Persistent saved outfits and named lookbooks", "Optional server-side clothing analysis and chat stylist when an AI provider is configured"],
    decisions: ["Validate uploaded images and provider responses before saving user-confirmed garment details.", "Keep provider credentials on the server and label mock output as development-only."],
    challenges: ["Handling optional AI and storage services without presenting unavailable analysis as a real result."],
    learnings: ["The project documents clear boundaries between persistent product features, configured AI services, and disabled integrations."],
    stack: ["Next.js", "React", "TypeScript", "Express", "PostgreSQL", "Prisma"],
    planned: ["Pinterest board import after official API access", "Production service configuration and deployment validation"],
    github: "https://github.com/CHINMAYEEHARANE58/AI-stylist", sourceNote: "Current functionality and service limitations checked against the public repository README in October 2026."
  },
  {
    slug: "splitstream", title: "SplitStream", subtitle: "Shared expenses, clearer decisions", date: "October 2026", dateSort: "2026-10", category: ["Full Stack", "Backend", "Data Engineering"], status: "In Progress", art: "split",
    summary: "A group expense platform taking shape around shared balances, settlement planning, and spending insights.",
    problem: "Shared spending becomes difficult to track across roommates, friends, and travel groups.",
    approach: "The first milestone establishes the product shell and a real authentication flow before group and expense features are built.",
    architecture: "The current repository has a React and TypeScript frontend, FastAPI backend, PostgreSQL user store, JWT authentication, and Docker Compose setup. Its README explicitly places groups, expenses, balances, settlements, and analytics in later milestones.",
    features: ["Registration and login with validation", "JWT session restoration and protected application routes", "Responsive navigation and dashboard, groups, activity, analytics, settlements, and settings shells"],
    decisions: ["Established authentication and protected navigation as the first complete vertical slice.", "Kept the data pipeline separate from the initial application milestone."],
    challenges: ["Designing a path from a usable expense app to richer data workflows without claiming unfinished modules as shipped."],
    learnings: ["Relational data modeling, API design, and incremental delivery."],
    stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker"], planned: ["Group and expense workflows", "Balance and settlement calculations", "Kafka", "PySpark", "Airflow", "AWS S3", "Prometheus", "Grafana"],
    github: "https://github.com/CHINMAYEEHARANE58/SplitStream", demo: "https://split-stream-two.vercel.app/", sourceNote: "Current milestone and architecture checked against the public repository README."
  },
  {
    slug: "grabapass", title: "GrabAPass", subtitle: "Events, from discovery to booking", date: "February 2026", dateSort: "2026-02", category: ["Full Stack", "Backend"], status: "Completed", art: "pass",
    summary: "An event ticketing application connecting an Angular frontend to Rust services built with Axum.",
    problem: "Attendees and organizers need a central place to discover events and manage ticket workflows.",
    approach: "Built a responsive event interface with a Rust API and database-backed services.",
    architecture: "The public repository contains separate Angular frontend and Rust/Axum backend directories, PostgreSQL configuration, and Docker Compose setup.",
    features: ["Event discovery and booking workflows", "Authentication and event management flows", "Frontend and backend integration"],
    decisions: ["Used Angular for the application UI and Axum for backend services."],
    challenges: ["Learning Rust backend development and integrating a typed frontend with API services."],
    learnings: ["Axum API design, service integration, and full-stack system structure."],
    stack: ["Angular", "TypeScript", "Rust", "Axum", "PostgreSQL", "REST APIs"],
    github: "https://github.com/CHINMAYEEHARANE58/GrabAPass", sourceNote: "Stack and repository structure checked against the public README; feature scope follows the résumé."
  },
  {
    slug: "gigx", title: "GigX", subtitle: "A marketplace for freelance work", date: "August 2025", dateSort: "2025-08", category: ["Full Stack", "AI / ML"], status: "Completed", art: "gigx",
    summary: "A freelancer marketplace that helps clients find talent and manage project collaboration.",
    problem: "Freelancers and clients need simpler paths to discovery and ongoing project coordination.",
    approach: "Combined marketplace flows with authentication, project management, and AI-powered enhancements.",
    architecture: "The résumé identifies a MongoDB, Express, React, and Node.js stack using REST APIs, Gemini API, and Google OAuth. Further service boundaries are not documented here.",
    features: ["Freelancer discovery", "Authentication and project collaboration", "AI-powered enhancements"],
    decisions: ["Integrated Google OAuth and Gemini API into a MERN application."],
    challenges: ["Third-party API integration and maintaining accessible marketplace flows."],
    learnings: ["Authentication, API integration, and collaborative full-stack development."],
    stack: ["MongoDB", "Express", "React", "Node.js", "Gemini API", "Google OAuth"],
    demo: "https://gigx.vercel.app/", sourceNote: "Features and stack come from the supplied résumé; the existing portfolio supplied the live link."
  },
  {
    slug: "smart-library-manager", title: "Smart Library Manager", subtitle: "A library in sync", date: "March 2026", dateSort: "2026-03", category: ["Mobile", "Frontend"], status: "Completed", art: "library",
    summary: "A cross-platform library app for book inventory, reservations, borrowing history, and analytics.",
    problem: "Manual library operations make it harder to see inventory and track borrowing activity.",
    approach: "Built a role-based Flutter interface backed by Firebase Authentication and Cloud Firestore.",
    architecture: "The repository README documents Flutter clients, Firebase Auth, Firestore books, transactions, and users collections, plus local Firebase emulator support.",
    features: ["User and admin dashboards", "Book management and reservation flows", "Borrowing history and analytics"],
    decisions: ["Used Firestore for real-time data updates and Firebase Auth for identity."],
    challenges: ["Coordinating state, real-time updates, and responsive mobile UI."],
    learnings: ["Flutter state management, Firebase integration, and data visualization."],
    stack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "fl_chart"],
    github: "https://github.com/CHINMAYEEHARANE58/S56_02_chinmayee_vaishnavi_FlutterFirebase_SLM", sourceNote: "Repository README and supplied résumé."
  },
  {
    slug: "finsight", title: "FinSight", subtitle: "Make spending visible", date: "April 2026", dateSort: "2026-04", category: ["Frontend"], status: "Completed", art: "finsight",
    summary: "A personal finance dashboard for transactions, budgets, spending trends, and planning.",
    problem: "Personal finance data is hard to act on when transactions and budgets live in separate views.",
    approach: "Created a responsive dashboard with charts, transaction management, and role-based UI.",
    architecture: "The résumé describes a React and Vite frontend using local storage and mock APIs. This case study does not imply a production finance backend.",
    features: ["Transaction and budget views", "Interactive spending charts", "Role-based UI and planning tools"],
    decisions: ["Used local storage and mock APIs for the portfolio-stage application."],
    challenges: ["Presenting financial data clearly across screen sizes."],
    learnings: ["React state management, charting, and frontend architecture."],
    stack: ["React", "Vite", "JavaScript", "Tailwind CSS", "Framer Motion", "Recharts"],
    github: "https://github.com/CHINMAYEEHARANE58/FinSight", demo: "https://fin-sight-five-eosin.vercel.app/", sourceNote: "Supplied résumé and public repository README; data source is explicitly local storage and mock APIs."
  }
];

// Links retained from the previous portfolio. These are earlier projects, not
// newly verified case studies; no status or implementation claims are implied.
export const earlierProjects = [
  { title: "Mitworking", url: "https://mitworking.netlify.app/" },
  { title: "Puzzle Game", url: "https://cool-mermaid-b37774.netlify.app/" },
  { title: "Plate Poetry", url: "https://chinmayeeharane58.github.io/Plate-poetry/" },
  { title: "Hair Spectacle", url: "https://s56-bizarre-hairstyles.netlify.app/" },
  { title: "Car Rental System", url: "https://github.com/kalviumcommunity/Squad56_ChinmayeeHarane_OOP_CarRentalSystem" },
] as const;

export function getProject(slug: string) { return projects.find(project => project.slug === slug); }
