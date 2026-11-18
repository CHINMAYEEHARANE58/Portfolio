import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { moreWebProjects } from "@/content/more-web-projects";
import { filterProjects, filterWebProjects, isCategory, sortedProjects } from "@/lib/projects";
describe("project directory", () => {
  it("filters by category and technology", () => {
    expect(filterProjects(projects, "Mobile").map(item => item.slug)).toEqual(["careconnect", "smart-library-manager"]);
    expect(filterProjects(projects, "All", "Axum").map(item => item.slug)).toEqual(["grabapass"]);
    expect(filterProjects(projects, "Backend", "react").map(item => item.slug)).toEqual(["documind", "sentinelops", "splitstream"]);
  });
  it("sorts newest without changing source order", () => {
    const original = projects[0].slug;
    expect(sortedProjects(projects).map(item => item.slug)).toEqual(["careconnect", "stockpilot", "documind", "sentinelops", "teamflow", "internagent", "closetai", "splitstream", "finsight", "smart-library-manager", "grabapass", "gigx"]);
    expect(projects[0].slug).toBe(original);
  });
  it("searches the additional GitHub projects without duplicating the case studies", () => {
    expect(filterWebProjects(moreWebProjects, "AI / ML", "Python").map(item => item.title)).toEqual(["Vera merchant bot"]);
    expect(filterWebProjects(moreWebProjects, "Frontend", "quiz").map(item => item.title)).toEqual(["React Quiz"]);
    expect(new Set([...projects.map(item => item.title), ...moreWebProjects.map(item => item.title)]).size).toBe(22);
    const webSourceLinks = [
      ...projects.filter(item => item.slug !== "gigx" && item.slug !== "smart-library-manager" && item.slug !== "careconnect").map(item => item.github),
      ...moreWebProjects.map(item => item.github),
    ];
    expect(webSourceLinks).toHaveLength(19);
    expect(new Set(webSourceLinks).size).toBe(19);
    expect(webSourceLinks.every(url => url?.startsWith("https://github.com/CHINMAYEEHARANE58/"))).toBe(true);
  });
  it("rejects unknown categories", () => { expect(isCategory("All")).toBe(true); expect(isCategory("Other")).toBe(false); });
});
