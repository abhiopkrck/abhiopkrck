import { GraduationCap, Image as ImageIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { education } from '../data/portfolio'

export default function Journey() {
  return <div className="page-content section-pad journey-page">
    <SectionHeading eyebrow="EDUCATION / LEARNING JOURNEY" title="Academic foundation." description="My formal education and the concepts I'm exploring through coursework and hands-on projects."/>
    {education.length ? <div className="journey-grid">{education.map(item => <article className="glass journey-card" key={item.id}>
      {item.image && <div className="journey-image-wrap"><img src={item.image} alt={item.imageAlt || item.title} loading="lazy"/><span className="journey-image-label"><GraduationCap size={14}/> EDUCATION</span></div>}
      <div className="journey-card-body"><span className="eyebrow">{item.period || 'EDUCATION'}</span><h3>{item.title}</h3><p className="journey-org">{item.institution}</p><p>{item.detail}</p></div>
    </article>)}</div> : <div className="glass journey-empty"><span className="journey-empty-icon"><ImageIcon size={19}/></span><div><h3>Education details coming soon</h3><p>Add your institution, qualification and study dates.</p></div></div>}
  </div>
}
