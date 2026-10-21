import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap { const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""); if (!site) return []; return ["", "/about", "/projects", "/experience", "/contact", ...projects.map(project => `/projects/${project.slug}`)].map(path => ({ url: `${site}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : .7 })); }
