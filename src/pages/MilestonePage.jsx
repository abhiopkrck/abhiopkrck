import { ArrowUpRight, BriefcaseBusiness, Trophy, Award, BookOpen, Image as ImageIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { internships, hackathons, certifications, courses } from '../data/portfolio'

const pages = {
  internships: {
    eyebrow: 'CAREER / EXPERIENCE', title: 'Internship experience.',
    description: 'Professional experience, responsibilities and practical lessons from working with a team.',
    icon: BriefcaseBusiness, emptyTitle: 'Experience details are being prepared',
    emptyDescription: 'Add confirmed role, dates, responsibilities, technologies and work highlights.',
    items: internships
  },
  hackathons: {
    eyebrow: 'BUILD / COMPETE', title: 'Hackathons.',
    description: 'Events, team builds, prototypes, challenges and competition highlights.',
    icon: Trophy, emptyTitle: 'Hackathon highlights will appear here',
    emptyDescription: 'Only verified participation and results will be listed here.',
    items: hackathons
  },
  certifications: {
    eyebrow: 'CREDENTIALS / VERIFIED', title: 'Certifications.',
    description: 'Certificates and credentials earned through recognised learning providers.',
    icon: Award, emptyTitle: 'No certificates added yet',
    emptyDescription: 'This section is ready for certificate names, issuers, dates and verification links.',
    items: certifications
  },
  courses: {
    eyebrow: 'LEARNING / CONTINUOUS', title: 'Courses & learning.',
    description: 'Structured courses and learning paths supporting my current skills and goals.',
    icon: BookOpen, emptyTitle: 'Course library is ready',
    emptyDescription: 'Add course names, providers, progress and key takeaways as you complete them.',
    items: courses
  }
}

function EmptyState({ Icon, title, description }) {
  return <div className="glass journey-empty"><span className="journey-empty-icon"><Icon size={19}/></span><div><h3>{title}</h3><p>{description}</p><span>New entries will appear here when verified details are added.</span></div></div>
}

function EntryCard({ item, Icon }) {
  return <article className="glass journey-card">
    {item.image && <div className="journey-image-wrap"><img src={item.image} alt={item.imageAlt || item.title || item.name || 'Experience'} loading="lazy"/><span className="journey-image-label"><Icon size={14}/> FEATURE</span></div>}
    <div className="journey-card-body"><span className="eyebrow">{item.period || item.date || item.status || 'MILESTONE'}</span><h3>{item.title || item.name}</h3><p className="journey-org">{item.organization || item.issuer || item.provider || ''}</p><p>{item.detail || item.description || ''}</p>{item.status && <span className="journey-status">{item.status}</span>}{item.url && <a className="text-link" href={item.url} target="_blank" rel="noreferrer">View details <ArrowUpRight size={14}/></a>}</div>
  </article>
}

export default function MilestonePage({ type }) {
  const page = pages[type] || pages.courses
  const Icon = page.icon
  return <div className="page-content section-pad journey-page">
    <SectionHeading eyebrow={page.eyebrow} title={page.title} description={page.description}/>
    {page.items.length ? <div className="journey-grid">{page.items.map((item, index) => <EntryCard key={item.id || item.title || item.name || index} item={item} Icon={Icon}/>)}</div> : <EmptyState Icon={Icon} title={page.emptyTitle} description={page.emptyDescription}/>}
  </div>
}
