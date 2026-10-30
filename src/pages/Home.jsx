import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Sparkles } from 'lucide-react'
import { profile, projects, skillGroups } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import SkillGroup from '../components/SkillGroup'

export default function Home() {
  return <>
    <section className="hero section-pad">
      <div className="hero-copy"><div className="availability"><span className="pulse-dot"/> OPEN TO LEARNING & COLLABORATION</div>
        <p className="eyebrow hero-kicker">HELLO WORLD, I'M</p><h1>Abhishek<br/><span>Boyane<span className="gradient-dot">.</span></span></h1>
        <p className="hero-role">{profile.role}</p><p className="hero-description">{profile.intro}</p>
        <div className="hero-actions"><Link className="button button-primary" to="/projects">Explore my work <ArrowUpRight size={17}/></Link><Link className="button button-ghost" to="/contact">Let's connect <ArrowRight size={16}/></Link></div>
        <div className="hero-social"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><span>BASED IN {profile.location.toUpperCase()}</span></div>
      </div>
      <div className="hero-visual"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-glass glass"><div className="visual-top"><span>CREATIVE MINDSET</span><Sparkles size={17}/></div><div className="monogram">A<span>.</span></div><div className="visual-caption"><span>IDEAS → EXPERIMENTS</span><b>BUILD / BREAK / LEARN</b></div><div className="visual-code"><span>const</span> future = <em>'build it'</em>;</div></div><div className="float-chip chip-top">✳ &nbsp; SOFTWARE</div><div className="float-chip chip-bottom">⌘ &nbsp; AUTOMATION</div></div>
      <a href="#featured" className="scroll-cue"><ArrowDown size={15}/> SCROLL TO EXPLORE</a>
    </section>
    <section id="featured" className="section-pad"><SectionHeading eyebrow="SELECTED WORK / 01" title="Things I'm building." description="A few projects and experiments where ideas meet implementation."/><div className="project-grid">{projects.filter(p => p.featured || ['clinic','world'].includes(p.id)).map(p => <ProjectCard key={p.id} project={p}/>)}</div><div className="center-action"><Link className="text-link" to="/projects">View all projects <ArrowUpRight size={16}/></Link></div></section>
    <section className="section-pad skills-section"><SectionHeading eyebrow="MY TOOLKIT / 02" title="Tools of the trade." description="Technologies I use, learn and experiment with. The stack keeps evolving."/><div className="skills-grid">{skillGroups.map((g,i)=><SkillGroup key={g.title} group={g} index={i}/>)}</div></section>
    <section className="section-pad"><div className="glass cta-panel"><div><span className="eyebrow"><i/> HAVE AN IDEA?</span><h2>Let's make<br/><span>something useful.</span></h2><p>Have a project, a question, or an interesting problem? I'd love to hear about it.</p></div><Link to="/contact" className="button button-primary">Start a conversation <ArrowUpRight size={17}/></Link><div className="cta-orb"/></div></section>
  </>
}