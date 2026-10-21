export const profile = {
  name: "Chinmayee Harane",
  email: "chinmayee.harane@kalvium.community",
  location: "Pune, India",
  resume: "/resume/Chinmayee_Harane_Resume.pdf",
  social: {
    github: "https://github.com/CHINMAYEEHARANE58",
    portfolioSource: "https://github.com/CHINMAYEEHARANE58/Portfolio",
    linkedin: "https://www.linkedin.com/in/chinmayee-harane-568896287/",
    leetcode: "https://leetcode.com/u/chinmayeeharane/",
  },
  roles: ["FullStack Developer", "Problem Solver", "UI/UX Designer"],
  availableForWork: process.env.NEXT_PUBLIC_AVAILABLE_FOR_WORK === "true",
} as const;

export const skills = [
  { title: "Frontend engineering", items: ["React", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"] },
  { title: "Backend engineering", items: ["Node.js", "Express", "Spring Boot", "Rust / Axum", "FastAPI", "GraphQL", "REST APIs"] },
  { title: "Programming languages", items: ["C++", "Python", "Java", "JavaScript", "TypeScript", "Rust", "Dart"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Cloud Firestore", "Snowflake"] },
  { title: "Cloud & DevOps", items: ["AWS", "GCP fundamentals", "Docker", "Git", "GitHub"] },
  { title: "Data engineering", items: ["Apache Kafka", "Apache Airflow", "PySpark", "Snowflake"] },
  { title: "Cybersecurity", items: ["DLP", "GRC", "OWASP Top 10", "Burp Suite", "Kali Linux", "EDR / XDR"] },
  { title: "Developer tools", items: ["Postman", "Firebase", "Directus", "API testing"] },
] as const;

export const experience = [
  {
    company: "Nykaa", role: "Cyber Security Intern", period: "August 2026 — Present", type: "Security",
    summary: "Gaining practical exposure to enterprise security across data loss prevention, governance and compliance, application security, security operations, and cloud security.",
    details: ["Learning Proofpoint and Netskope workflows for protection policies, monitoring, and incident handling.", "Studying ISO/IEC 27001 and ITGC controls, plus OWASP Top 10 vulnerabilities and HTTP analysis with Kali Linux and Burp Suite.", "Exploring Cortex, EDR/XDR, AWS, and GCP security fundamentals."],
    stack: ["DLP", "GRC", "OWASP Top 10", "Burp Suite", "AWS / GCP"]
  },
  {
    company: "iCliniq", role: "Tech Intern", period: "March 2025 — January 2026", type: "Software engineering",
    summary: "Contributed frontend and backend features to a live healthcare platform with cross-functional teams.",
    details: ["Worked with React, TypeScript, Node.js, GraphQL, Directus, REST APIs, and SQL/NoSQL data integrations.", "Resolved frontend and API issues, debugged production problems, and improved user-facing features.", "Participated in code reviews, API testing, and agile development."],
    stack: ["React", "TypeScript", "Node.js", "GraphQL", "Directus"]
  }
] as const;
