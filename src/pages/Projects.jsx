import { useMemo,useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/portfolio'
export default function Projects(){
 const [filter,setFilter]=useState('All')
 const categories=['All','Applications','AI & Automation','Game Development','Infrastructure']
 const filtered=useMemo(()=>projects.filter(p=>filter==='All'||(filter==='Applications'&&/APP|APPLICATION|PRODUCTIVITY|HEALTHCARE/.test(p.category))||(filter==='AI & Automation'&&/AI|AUTOMATION|VOICE|GENERATIVE/.test(p.category))||(filter==='Game Development'&&p.id==='world')||(filter==='Infrastructure'&&/INFRASTRUCTURE|CLOUD/.test(p.category))),[filter])
 return <div className="page-content section-pad"><SectionHeading eyebrow="PROJECT ARCHIVE / 01" title="Experiments into products." description="Explore the projects, prototypes and ideas. Open any project for its full story, implementation notes, technologies and media."/><div className="filter-row">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'filter active':'filter'}>{c}</button>)}</div><div className="project-grid">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div><p className="archive-note">More experiments live in my <a href="https://github.com/abhiopkrck?tab=repositories" target="_blank" rel="noreferrer">GitHub repositories ↗</a>.</p></div>
}