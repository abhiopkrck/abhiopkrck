import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Home, UserRound, FolderKanban, GraduationCap, BriefcaseBusiness, Trophy, Award, BookOpen, Mail, Settings2, Github, PanelLeftClose, PanelLeftOpen, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About', path: '/about', icon: UserRound },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'Education', path: '/journey', icon: GraduationCap },
  { label: 'Internship', path: '/experience', icon: BriefcaseBusiness },
  { label: 'Hackathons', path: '/hackathons', icon: Trophy },
  { label: 'Certifications', path: '/certifications', icon: Award },
  { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'Contact', path: '/contact', icon: Mail },
  { label: 'Settings', path: '/settings', icon: Settings2 }
]

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false)
  return <aside className={`sidebar-wrap ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <div className="glass sidebar">
      <div className="sidebar-brand-row">
        <Link to="/" className="sidebar-brand" aria-label="Abhishek portfolio home">
          <span className="brand-mark">A<span>.</span></span>
          <span className="sidebar-brand-copy">ABHISHEK<span>PORTFOLIO</span></span>
        </Link>
        <button className="sidebar-brand-toggle" type="button" onClick={() => setCollapsed(value => !value)} aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} title={collapsed ? 'Expand navigation' : 'Collapse navigation'}>
          {collapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}
        </button>
      </div>
      <div className="sidebar-divider"/>
      <span className="sidebar-caption">WORKSPACE</span>
      <nav className="sidebar-links" aria-label="Main navigation">
        {links.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} end={path === '/'} title={collapsed ? label : undefined} aria-label={label} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Icon size={19} strokeWidth={1.8}/><span className="sidebar-link-label">{label}</span><span className="sidebar-active-dot"/>
        </NavLink>)}
      </nav>
      <div className="sidebar-spacer"/>
      <a className="sidebar-github" href={profile.github} target="_blank" rel="noreferrer" title={collapsed ? 'GitHub' : undefined}>
        <Github size={18}/><span className="sidebar-link-label">GitHub</span><ArrowUpRight className="sidebar-external" size={13}/>
      </a>
      <div className="sidebar-profile"><span className="sidebar-avatar">AB</span><span className="sidebar-profile-copy"><b>Abhishek Boyane</b><small>Developer · Creator</small></span></div>
    </div>
  </aside>
}
