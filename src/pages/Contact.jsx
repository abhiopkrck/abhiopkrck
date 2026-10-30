import { useState } from 'react'
import { ArrowUpRight, Copy, Github, Linkedin, Mail, Instagram, Youtube, Check, Send, Trash2, MessageSquare } from 'lucide-react'
import { profile } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'

const STORAGE_KEY = 'abhishek-portfolio-contact-messages'

function readSavedMessages() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export default function Contact() {
  const [copied,setCopied] = useState(false)
  const [form,setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status,setStatus] = useState({ type:'', text:'' })
  const [messages,setMessages] = useState(readSavedMessages)

  async function copyEmail(){try{await navigator.clipboard.writeText(profile.email);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{window.location.href='mailto:'+profile.email}}
  function update(event){setForm(current=>({...current,[event.target.name]:event.target.value}))}

  function submit(event) {
    event.preventDefault()
    const entry = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString()
    }

    try {
      const nextMessages = [entry, ...messages].slice(0, 50)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages))
      setMessages(nextMessages)
      setForm({ name:'', email:'', subject:'', message:'' })
      setStatus({type:'success',text:'Message saved below on this device.'})
    } catch {
      setStatus({type:'error',text:'This browser could not save the message. Check available site storage and try again.'})
    }
  }

  function deleteMessage(id) {
    const nextMessages = messages.filter(message => message.id !== id)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages))
      setMessages(nextMessages)
    } catch {
      setStatus({type:'error',text:'Could not update saved messages in this browser.'})
    }
  }

  const socials=[['GitHub',profile.github,Github],['LinkedIn',profile.linkedin,Linkedin],['Instagram',profile.instagram,Instagram],['YouTube',profile.youtube,Youtube]]
  return <div className="page-content section-pad contact-page">
    <SectionHeading eyebrow="GET IN TOUCH / 01" title="Have something in mind?" description="Write a message and it will be saved below on this device."/>
    <div className="contact-layout">
      <div className="glass contact-card">
        <span className="contact-icon"><Mail/></span><span className="eyebrow">WRITE A MESSAGE</span>
        <h2>Let's start<br/><span>a conversation.</span></h2>
        <p>Your messages are stored in this browser and stay here when you revisit this page on this device.</p>
        <form className="contact-form" onSubmit={submit}>
          <label>Your name<input name="name" value={form.name} onChange={update} placeholder="Your name" minLength="2" maxLength="100" required /></label>
          <label>Your email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" maxLength="254" required /></label>
          <label>Subject <span>(optional)</span><input name="subject" value={form.subject} onChange={update} placeholder="What is this about?" maxLength="140" /></label>
          <label>Message<textarea name="message" value={form.message} onChange={update} placeholder="Write your message..." minLength="10" maxLength="5000" rows="5" required /></label>
          <button className="button button-primary" type="submit"><Send size={15}/>Save message</button>
          {status.text && <p className={`contact-status ${status.type}`} role="status">{status.text}</p>}
        </form>

        <div className="saved-messages">
          <div className="saved-messages-heading">
            <div><span className="eyebrow"><MessageSquare size={13}/> LOCAL MESSAGE BOARD</span><h3>Saved messages <span>{messages.length}</span></h3></div>
            <small>Stored on this device</small>
          </div>
          {messages.length === 0 ? <p className="saved-messages-empty">Your saved messages will appear here after you submit the form.</p> : <div className="saved-message-list">
            {messages.map(message => <article className="saved-message" key={message.id}>
              <div className="saved-message-top"><div><strong>{message.name}</strong><span>{message.email}</span></div><button className="saved-message-delete" type="button" onClick={() => deleteMessage(message.id)} aria-label="Delete saved message" title="Delete message"><Trash2 size={15}/></button></div>
              {message.subject && <h4>{message.subject}</h4>}
              <p>{message.message}</p>
              <time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time>
            </article>)}
          </div>}
        </div>

        <a className="email-address" href={'mailto:'+profile.email}>{profile.email}</a>
        <button className="button button-ghost" onClick={copyEmail}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copied!':'Copy email'}</button>
      </div>
      <div className="glass socials-card"><span className="eyebrow">FIND ME ELSEWHERE</span>{socials.map(([name,url,Icon])=><a className="social-row" href={url} key={name} target="_blank" rel="noreferrer"><span><Icon size={19}/>{name}</span><ArrowUpRight size={17}/></a>)}</div>
    </div>
  </div>
}
