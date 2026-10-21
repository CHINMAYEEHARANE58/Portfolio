import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <article className={`project-card ${compact ? "compact" : ""}`}>
    <Link href={`/projects/${project.slug}`} className={`project-visual visual-${project.art}`} aria-label={`Read ${project.title} case study`}>
      {project.art === "gigx" ? <Image src="/images/gigx.png" alt="GigX project interface" fill sizes="(max-width: 700px) 100vw, 50vw" /> : <><span className="visual-orbit" aria-hidden="true"></span><span className="visual-word" aria-hidden="true">{project.title}</span><span className="visual-detail" aria-hidden="true">{project.subtitle}</span></>}
    </Link>
    <div className="project-card-content"><div className="project-kicker"><span>{project.category[0]}</span><span>{project.status}</span></div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p><div className="tag-row">{project.stack.slice(0, compact ? 3 : 4).map(tag => <span key={tag}>{tag}</span>)}</div><div className="card-actions"><Link href={`/projects/${project.slug}`}>Case study <span aria-hidden="true">↗</span></Link>{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>Code ↗</a>}{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>Live ↗</a>}</div></div>
  </article>;
}
