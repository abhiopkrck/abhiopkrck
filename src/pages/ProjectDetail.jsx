import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Github, PlayCircle, Image as ImageIcon } from 'lucide-react'
import { projects } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
export default function ProjectDetail(){
 const {projectId}=useParams();const project=projects.find(item=>item.id===projectId)
 if(!project)return <div className="page-content section-pad"><SectionHeading eyebrow="PROJECT / NOT FOUND" title="This project isn't here." description="The project may have moved or its link may be incorrect."/><Link className="button button-primary" to="/projects"><ArrowLeft size={16}/> Back to projects</Link></div>
 const gallery=project.gallery?.length?project.gallery:[project.image].filter(Boolean)
 const video=project.videoUrl||''
 const isEmbed=/youtube\.com\/embed|youtu\.be|vimeo\.com\/video/.test(video)
 return <div className="page-content section-pad detail-page">
  <Link className="back-link" to="/projects"><ArrowLeft size={15}/> ALL PROJECTS</Link>
  <div className="detail-hero"><div><span className="eyebrow">{project.category} / CASE STUDY</span><h1>{project.title}</h1><p>{project.overview||project.description}</p><div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="detail-actions">{project.githubUrl&&<a className="button button-ghost" href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={16}/> Source code <ArrowUpRight size={14}/></a>}{project.demoUrl&&<a className="button button-primary" href={project.demoUrl} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={14}/></a>}</div></div><div className="detail-cover"><img src={project.image} alt={project.title+' preview'}/><span>{project.status}</span></div></div>
  <div className="detail-meta-grid"><div className="glass detail-meta"><small>MY ROLE</small><b>{project.role||'Project builder'}</b></div><div className="glass detail-meta"><small>PROJECT STATUS</small><b>{project.status}</b></div><div className="glass detail-meta"><small>TECH STACK</small><b>{project.tags.join(' · ')}</b></div></div>
  <section className="detail-section"><span className="eyebrow">01 / THE PROBLEM</span><h2>Why I built it</h2><p>{project.problem||project.description}</p></section>
  <section className="detail-section"><span className="eyebrow">02 / THE BUILD</span><h2>What it does</h2><p>{project.implementation||project.overview}</p><ul className="detail-list">{(project.features||[]).map(item=><li key={item}>{item}</li>)}</ul></section>
  {project.challenges?.length>0&&<section className="detail-section"><span className="eyebrow">03 / ENGINEERING NOTES</span><h2>Challenges & learning</h2><ul className="detail-list">{project.challenges.map(item=><li key={item}>{item}</li>)}</ul></section>}
  <section className="detail-section"><span className="eyebrow">04 / PROJECT MEDIA</span><h2>Screenshots & gallery</h2>{gallery.length?<div className="detail-gallery">{gallery.map((src,i)=><figure key={src}><img src={src} alt={project.title+' gallery image '+(i+1)}/><figcaption>{project.title} · Gallery {i+1}</figcaption></figure>)}</div>:<div className="media-empty"><ImageIcon size={22}/><span>Project screenshots will be added here.</span></div>}</section>
  <section className="detail-section"><span className="eyebrow">05 / VIDEO WALKTHROUGH</span><h2>See it in action</h2>{video?<div className="detail-video">{isEmbed?<iframe src={video} title={project.title+' video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>:<video src={video} controls preload="metadata"/>}</div>:<div className="media-empty"><PlayCircle size={24}/><span>Video walkthrough not uploaded yet. Add a YouTube embed URL or MP4 URL to this project's videoUrl field.</span></div>}</section>
  <div className="detail-bottom"><Link className="text-link" to="/projects"><ArrowLeft size={15}/> Back to all projects</Link></div>
 </div>
}