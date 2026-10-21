import { categories, projects, type Category, type Project } from "@/content/projects";
import type { WebProject } from "@/content/more-web-projects";

export function isCategory(value: string): value is Category { return categories.includes(value as Category); }
export function filterProjects(items: Project[], category = "All", query = "") {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(project => (category === "All" || project.category.includes(category as Category)) &&
    (!term || [project.title, project.subtitle, project.summary, ...project.stack].join(" ").toLocaleLowerCase().includes(term)));
}
export function sortedProjects(items = projects) { return [...items].sort((a, b) => b.dateSort.localeCompare(a.dateSort)); }
export function filterWebProjects(items: WebProject[], category = "All", query = "") {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(project => (category === "All" || project.category.includes(category as Category)) &&
    (!term || [project.title, project.summary, ...project.stack].join(" ").toLocaleLowerCase().includes(term)));
}
