import { Lightbulb, Target, Wrench } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { principles, profile, skillGroups } from '../data/portfolio'
import SkillGroup from '../components/SkillGroup'
const icons = [Lightbulb, Target, Wrench]
export default function About() {
  return <div className="page-content section-pad"><SectionHeading eyebrow="A LITTLE ABOUT ME / 01" title="Curious by nature." description="I'm a computer science student who enjoys exploring how technology works—and making ideas tangible."/>
    <div className="about-layout"><article className="glass about-main"><span className="eyebrow">THE PERSON BEHIND THE CODE</span><h2>Not just writing code.<br/><span>Building possibilities.</span></h2><p>I'm Abhishek, a third-year B.Tech Computer Science student from India. I enjoy working across the stack—from shaping interfaces to building backend services—and exploring how automation can make everyday workflows better.</p><p>I'm also drawn to game development and interactive experiences. My long-term goal is to keep growing as a hands-on builder: someone who can take a problem, investigate it, prototype a solution and make it real.</p><div className="about-note">“Think boldly. Build small. Test honestly. Improve relentlessly.”</div></article><aside className="glass about-side"><span className="eyebrow">QUICK SNAPSHOT</span><div className="snapshot"><b>01</b><span>Computer Science student</span></div><div className="snapshot"><b>02</b><span>Full-stack experiments</span></div><div className="snapshot"><b>03</b><span>Automation & AI tools</span></div><div className="snapshot"><b>04</b><span>Game development</span></div></aside></div>
    <div className="principles-grid">{principles.map((p,i)=>{const Icon=icons[i];return <article className="glass principle-card" key={p.number}><Icon/><span>{p.number} / PRINCIPLE</span><h3>{p.title}</h3><p>{p.text}</p></article>})}</div>
    <SectionHeading eyebrow="CURRENT TOOLKIT / 02" title="What I work with."/><div className="skills-grid">{skillGroups.map((g,i)=><SkillGroup key={g.title} group={g} index={i}/>)}</div>
  </div>
}