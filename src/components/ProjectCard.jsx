import ImageWithFallback from './ImageWithFallback'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
export default function ProjectCard({project}){
 return <article className={`glass project-card accent-${project.accent}`}>
  <div className="project-card-top"><span className="project-icon" aria-label={project.title+' icon'}>{project.icon}</span><span className="project-status"><i/> {project.status}</span></div>
  {project.image&&<Link to={`/projects/${project.id}`} className="project-cover"><ImageWithFallback src={project.image} alt={project.title+' project preview'} loading="lazy"/></Link>}<span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.slice(0,5).map(tag=><span key={tag}>{tag}</span>)}</div>
  <Link className="project-link" to={`/projects/${project.id}`}>View project details <ArrowUpRight size={16}/></Link>
 </article>
}