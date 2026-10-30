import { useState } from 'react'
import { ArrowUpRight, Copy, Github, Linkedin, Mail, Instagram, Youtube, Check } from 'lucide-react'
import { profile } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
export default function Contact() {
  const [copied,setCopied] = useState(false)
  async function copyEmail(){try{await navigator.clipboard.writeText(profile.email);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{window.location.href='mailto:'+profile.email}}
  const socials=[['GitHub',profile.github,Github],['LinkedIn',profile.linkedin,Linkedin],['Instagram',profile.instagram,Instagram],['YouTube',profile.youtube,Youtube]]
  return <div className="page-content section-pad contact-page"><SectionHeading eyebrow="GET IN TOUCH / 01" title="Have something in mind?" description="I'm always interested in thoughtful conversations, creative projects and opportunities to learn together."/><div className="contact-layout"><div className="glass contact-card"><span className="contact-icon"><Mail/></span><span className="eyebrow">DROP ME AN EMAIL</span><h2>Let's start<br/><span>a conversation.</span></h2><p>The easiest way to reach me is by email. Tell me what you're working on.</p><a className="email-address" href={'mailto:'+profile.email}>{profile.email}</a><button className="button button-primary" onClick={copyEmail}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copied!':'Copy email'}</button></div><div className="glass socials-card"><span className="eyebrow">FIND ME ELSEWHERE</span>{socials.map(([name,url,Icon])=><a className="social-row" href={url} key={name} target="_blank" rel="noreferrer"><span><Icon size={19}/>{name}</span><ArrowUpRight size={17}/></a>)}</div></div></div>
}