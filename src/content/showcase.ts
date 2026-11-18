export const featuredProjectSlugs = ["teamflow", "stockpilot", "sentinelops", "documind", "careconnect", "internagent"] as const;

export const featuredVisuals: Record<(typeof featuredProjectSlugs)[number], { image?: string; label: string; variant: string }> = {
  teamflow: { image: "/images/projects/teamflow.png", label: "TeamFlow dashboard screenshot", variant: "teamflow" },
  stockpilot: { image: "/images/projects/stockpilot.jpg", label: "StockPilot dashboard screenshot", variant: "stockpilot" },
  sentinelops: { image: "/images/projects/sentinelops.jpg", label: "SentinelOps dashboard screenshot", variant: "sentinelops" },
  documind: { label: "Illustrative DocuMind interface", variant: "documind" },
  careconnect: { label: "Illustrative CareConnect mobile interface", variant: "careconnect" },
  internagent: { label: "Illustrative InternAgent dashboard", variant: "internagent" },
};

export const education = [
  { institution: "MIT ADT University", label: "B.Tech, Computer Science", dates: "2023 - 2027", mark: "MIT" },
  { institution: "Kalvium", label: "Software Product Engineering program", dates: "2023 - 2027", mark: "K" },
] as const;

export const highlights = [
  { title: "Smart India Hackathon", eyebrow: "TWICE SHORTLISTED", description: "Shortlisted twice for the Smart India Hackathon and took part in coding and innovation challenges.", symbol: "SIH" },
  { title: "Building beyond coursework", eyebrow: "COMMUNITY & LEADERSHIP", description: "Former technical team member at Microsoft Learn Student Club and an active trek leader at MIT Adventure Club.", symbol: "CH" },
] as const;
