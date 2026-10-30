import { ArrowUpRight, GraduationCap, BriefcaseBusiness, Trophy, Award, BookOpen, Image as ImageIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { education, internships, hackathons, certifications, courses } from '../data/portfolio'

function FeatureCard({ item, icon: Icon, label }) {
  return <article className="glass journey-card">
    <div className="journey-image-wrap"><img src={item.image} alt={item.imageAlt || label} loading="lazy"/><span className="journey-image-label"><Icon size={14}/> {label}</span></div>
    <div className="journey-card-body"><span className="eyebrow">{item.period || item.issuer || item.date || 'MILESTONE'}</span><h3>{item.title || item.name}</h3><p className="journey-org">{item.institution || item.organization || item.issuer || item.provider || ''}</p><p>{item.detail || item.description || ''}</p>{item.status && <span className="journey-status">{item.status}</span>}{item.url && <a className="text-link" href={item.url} target="_blank" rel="noreferrer">View credential <ArrowUpRight size={14}/></a>}</div>
  </article>
}

function EmptyState({ title, description }) {
  return <div className="glass journey-empty"><span className="journey-empty-icon"><ImageIcon size={19}/></span><div><h3>{title}</h3><p>{description}</p><span>Entries will appear here when details are added.</span></div></div>
}

function Section({ id, eyebrow, title, description, items, icon, emptyTitle, emptyDescription }) {
  const Icon = icon
  return <section className="journey-section" id={id}><SectionHeading eyebrow={eyebrow} title={title} description={description}/>{items.length ? <div className="journey-grid">{items.map(item => <FeatureCard key={item.id || item.title || item.name} item={item} icon={Icon} label={eyebrow.split('/')[0].trim()}/>)}</div> : <EmptyState title={emptyTitle} description={emptyDescription}/>}</section>
}

export default function Journey() {
  return <div className="page-content section-pad journey-page">
    <SectionHeading eyebrow="THE ROAD SO FAR / 01" title="Learning by doing." description="Education, work experience and milestones that shape the builder I'm becoming."/>
    <div className="journey-photo-banner glass"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85" alt="Students walking across a university campus"/><div><span className="eyebrow">MY JOURNEY</span><h2>Every step adds<br/><span>another skill.</span></h2><p>A living timeline of what I'm learning, building and exploring.</p></div></div>
    <Section id="education" eyebrow="EDUCATION / 02" title="Academic foundation." description="My formal learning and the ideas I'm exploring along the way." items={education} icon={GraduationCap} emptyTitle="Education details coming soon" emptyDescription="Add your institution, qualification and study dates."/>
    <Section id="internship" eyebrow="INTERNSHIP / 03" title="Experience in the field." description="Professional exposure, responsibilities and lessons from working with a team." items={internships} icon={BriefcaseBusiness} emptyTitle="No internship entries yet" emptyDescription="Add the company, role, dates and a short summary of your work."/>
    <Section id="hackathons" eyebrow="HACKATHONS / 04" title="Build under pressure." description="Team builds, challenges, prototypes and event highlights." items={hackathons} icon={Trophy} emptyTitle="Hackathon highlights will go here" emptyDescription="Add event names, dates, team/project details, placements and photos."/>
    <Section id="certifications" eyebrow="CERTIFICATIONS / 05" title="Credentials earned." description="Verified certificates and credentials from recognised learning providers." items={certifications} icon={Award} emptyTitle="Certificates will appear here" emptyDescription="Add the certificate name, issuing organisation, date and credential link or image."/>
    <Section id="courses" eyebrow="COURSES / 06" title="Always learning." description="Courses and structured learning paths that support my current goals." items={courses} icon={BookOpen} emptyTitle="Learning list is ready" emptyDescription="Add course names, providers, completion status and what you learned."/>
  </div>
}