import { useMemo, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/portfolio'
export default function Projects() {
  const [filter,setFilter] = useState('All')
  const categories = ['All','Apps','AI & Automation','Game Development']
  const filtered = useMemo(() => projects.filter(p => filter==='All' || (filter==='Apps' && ['commandos','clinic'].includes(p.id)) || (filter==='AI & Automation' && ['jarvis','image-lab','seo-lab'].includes(p.id)) || (filter==='Game Development' && p.id==='world')), [filter])
  return <div className="page-content section-pad"><SectionHeading eyebrow="PROJECT ARCHIVE / 01" title="Experiments into products." description="A growing collection of applications, prototypes and ideas. Some are works in progress—because building is a process."/><div className="filter-row">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'filter active':'filter'}>{c}</button>)}</div><div className="project-grid">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div><p className="archive-note">More experiments live in my <a href="https://github.com/abhiopkrck?tab=repositories" target="_blank" rel="noreferrer">GitHub repositories ↗</a>.</p></div>
}