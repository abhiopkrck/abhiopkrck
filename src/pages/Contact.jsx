import { useState } from 'react'
import { ArrowUpRight, Copy, Github, Linkedin, Mail, Instagram, Youtube, Check, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'

export default function Contact() {
  const [copied,setCopied] = useState(false)
  const [form,setForm] = useState({ name:'', email:'', subject:'', message:'', website:'' })
  const [status,setStatus] = useState({ type:'', text:'' })
  const [sending,setSending] = useState(false)
  async function copyEmail(){try{await navigator.clipboard.writeText(profile.email);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{window.location.href='mailto:'+profile.email}}
  function update(event){setForm(current=>({...current,[event.target.name]:event.target.value}))}
  async function submit(event) {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setStatus({type:'',text:''})
    try {
      const response = await fetch('/api/contact', {
        method:'POST',
        headers:{'Content-Type':'application/json', 'Accept':'application/json'},
        body:JSON.stringify(form)
      })
      const raw = await response.text()
      let result = {}
      if (raw.trim()) {
        try {
          result = JSON.parse(raw)
        } catch {
          throw new Error(response.ok
            ? 'The contact service returned an invalid response. Please try again later.'
            : `The contact service failed (HTTP ${response.status}). Please try again later.`)
        }
      }
      if (!response.ok) {
        throw new Error(result.error || `Message could not be sent (HTTP ${response.status}).`)
      }
      if (result.ok !== true) {
        const contentType = response.headers.get('content-type') || 'unknown content type'
        throw new Error(
          result.error ||
          `Contact endpoint returned HTTP ${response.status} with ${contentType}, but did not confirm email delivery. Check the Render service and its logs.`
        )
      }
      setStatus({type:'success',text:'Message sent! I’ll get back to you soon.'})
      setForm({name:'',email:'',subject:'',message:'',website:''})
    } catch(error) {
      setStatus({type:'error',text:error.message || 'Could not send your message. Please try again.'})
    } finally {
      setSending(false)
    }
  }
  const socials=[['GitHub',profile.github,Github],['LinkedIn',profile.linkedin,Linkedin],['Instagram',profile.instagram,Instagram],['YouTube',profile.youtube,Youtube]]
  return <div className="page-content section-pad contact-page"><SectionHeading eyebrow="GET IN TOUCH / 01" title="Have something in mind?" description="Send a message directly from this page. Your message is delivered to my inbox by email."/><div className="contact-layout"><div className="glass contact-card"><span className="contact-icon"><Mail/></span><span className="eyebrow">SEND A MESSAGE</span><h2>Let's start<br/><span>a conversation.</span></h2><p>Fill in the form and I’ll receive your message by email.</p>
    <form className="contact-form" onSubmit={submit}>
      <label>Your name<input name="name" value={form.name} onChange={update} placeholder="Your name" minLength="2" maxLength="100" required /></label>
      <label>Your email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" maxLength="254" required /></label>
      <label>Subject <span>(optional)</span><input name="subject" value={form.subject} onChange={update} placeholder="What is this about?" maxLength="140" /></label>
      <label>Message<textarea name="message" value={form.message} onChange={update} placeholder="Write your message..." minLength="10" maxLength="5000" rows="5" required /></label>
      <label className="contact-honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={update} /></label>
      <button className="button button-primary" type="submit" disabled={sending}><Send size={15}/>{sending?'Sending…':'Send message'}</button>
      {status.text && <p className={`contact-status ${status.type}`} role="status">{status.text}</p>}
    </form>
    <a className="email-address" href={'mailto:'+profile.email}>{profile.email}</a><button className="button button-ghost" onClick={copyEmail}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copied!':'Copy email'}</button>
  </div><div className="glass socials-card"><span className="eyebrow">FIND ME ELSEWHERE</span>{socials.map(([name,url,Icon])=><a className="social-row" href={url} key={name} target="_blank" rel="noreferrer"><span><Icon size={19}/>{name}</span><ArrowUpRight size={17}/></a>)}</div></div></div>
}
