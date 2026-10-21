import type { WebProject } from "@/content/more-web-projects";

export function WebProjectCard({ project }: { project: WebProject }) {
  const primary = project.demo ?? project.github;
  const initials = project.title.split(/\s+/).slice(0, 2).map(word => word[0]).join("");

  return <article className="web-project-card">
    <div className="web-project-top"><span className="web-project-symbol" aria-hidden="true">{initials}</span><span className="web-project-note">{project.note}</span></div>
    <p className="eyebrow">{project.category[0]}</p>
    <h3>{primary ? <a href={primary} target="_blank" rel="noopener noreferrer">{project.title} <span aria-hidden="true">↗</span></a> : project.title}</h3>
    <p className="web-project-summary">{project.summary}</p>
    <div className="tag-row">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="web-project-actions">
      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source repository`}>View code ↗</a>}
      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live website`}>Visit site ↗</a>}
    </div>
  </article>;
}
