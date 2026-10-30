import { ArrowUpRight } from 'lucide-react'
export default function ProjectCard({ project }) {
  return <article className={`glass project-card accent-${project.accent}`}>
    {project.image && <div className="project-cover"><img src={project.image} alt={project.title + ' project preview'} loading="lazy"/><span className="project-cover-icon">{project.icon}</span></div>}
    <div className="project-card-top"><span className="project-icon">{project.icon}</span><span className="project-status"><i/> {project.status}</span></div>
    <span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <a className="project-link" href={project.url || 'https://github.com/abhiopkrck?tab=repositories'} target="_blank" rel="noreferrer">Explore on GitHub <ArrowUpRight size={16}/></a>
  </article>
}
