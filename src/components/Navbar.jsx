import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [['Home', '/'], ['About', '/about'], ['Projects', '/projects'], ['Journey', '/journey'], ['Contact', '/contact']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return <header className="nav-wrap"><nav className="glass nav container">
    <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">A<span>.</span></span><span>ABHISHEK<span className="brand-sub"> / PORTFOLIO</span></span></Link>
    <button className="mobile-toggle icon-button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
    <div className={`nav-links ${open ? 'nav-open' : ''}`}>{links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}<a className="nav-cta" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a></div>
  </nav></header>
}