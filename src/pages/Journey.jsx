import { GraduationCap, Image as ImageIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { education } from '../data/portfolio'
function EducationCard({ item }) {
  const images = item.images?.length ? item.images : item.image ? [item.image] : []
  return <article className="glass education-card">
    {images.length ? <div className="education-collage">{images.slice(0,3).map((src,index)=><img key={src} className={`education-photo education-photo-${index+1}`} src={src} alt={`Campus view ${index+1}`} loading="lazy"/>)}<span className="journey-image-label"><GraduationCap size={14}/> EDUCATION</span></div> : <div className="education-placeholder"><ImageIcon size={28}/><span>ADD SCHOOL / COLLEGE PHOTOS</span></div>}
    <div className="journey-card-body"><span className="eyebrow">{item.period || 'EDUCATION'}</span><h3>{item.title}</h3><p className="journey-org">{item.institution}</p><p>{item.detail}</p><div className="education-meta"><span>INSTITUTION</span><b>{item.institution}</b><span>QUALIFICATION</span><b>{item.title}</b></div></div>
  </article>
}
export default function Journey() {
  return <div className="page-content section-pad journey-page"><SectionHeading eyebrow="EDUCATION / LEARNING JOURNEY" title="Academic foundation." description="A visual record of schools, colleges, qualifications and the places where learning happened."/>
    {education.length ? <div className="education-grid">{education.map(item => <EducationCard key={item.id} item={item}/>)}</div> : <div className="glass journey-empty"><span className="journey-empty-icon"><ImageIcon size={19}/></span><div><h3>Education details coming soon</h3><p>Add school or college name, qualification, dates and campus photos.</p></div></div>}
  </div>
}
