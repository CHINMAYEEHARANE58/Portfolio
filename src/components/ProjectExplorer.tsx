"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, projects } from "@/content/projects";
import { moreWebProjects } from "@/content/more-web-projects";
import { filterProjects, filterWebProjects, isCategory, sortedProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { WebProjectCard } from "./WebProjectCard";
export function ProjectExplorer() {
  const router = useRouter(); const params = useSearchParams();
  const selected = isCategory(params.get("category") || "") ? params.get("category")! : "All";
  const query = params.get("q") || "";
  const [search, setSearch] = useState(query);
  const visible = useMemo(() => filterProjects(sortedProjects(projects), selected, query), [selected, query]);
  const visibleWeb = useMemo(() => filterWebProjects(moreWebProjects, selected, query), [selected, query]);
  function update(category: string, q: string) { const next = new URLSearchParams(); if (category !== "All") next.set("category", category); if (q.trim()) next.set("q", q.trim()); router.replace(`/projects${next.size ? `?${next}` : ""}`, { scroll: false }); }
  const count = visible.length + visibleWeb.length;
  return <><div className="project-toolbar"><div className="filter-list" role="group" aria-label="Filter projects by category">{categories.map(category => <button key={category} type="button" className={selected === category ? "selected" : ""} aria-pressed={selected === category} onClick={() => update(category, query)}>{category}</button>)}</div><form role="search" onSubmit={event => { event.preventDefault(); update(selected, search); }}><label htmlFor="project-search" className="sr-only">Search projects by name or technology</label><input id="project-search" value={search} onChange={event => { setSearch(event.target.value); update(selected, event.target.value); }} placeholder="Search name or tech…" type="search" /></form></div><p className="results-count" aria-live="polite">{count} {count === 1 ? "project" : "projects"} found</p>{count ? <>
    {visible.length > 0 && <><div className="directory-heading"><h2>Projects with <em>case studies.</em></h2><p>Deeper notes on scope, architecture, and engineering decisions.</p></div><div className="project-grid">{visible.map(project => <ProjectCard key={project.slug} project={project}/>)}</div></>}
    {visibleWeb.length > 0 && <div className="web-project-section"><div className="directory-heading"><h2>More web <em>projects.</em></h2><p>Verified repositories and live links from my broader work.</p></div><div className="web-project-grid">{visibleWeb.map(project => <WebProjectCard key={project.title} project={project}/>)}</div></div>}
  </> : <div className="empty-state"><h2>No projects found</h2><p>Try another technology or clear the filters.</p><button type="button" className="button button-primary" onClick={() => { setSearch(""); update("All", ""); }}>Clear filters</button></div>}</>;
}
