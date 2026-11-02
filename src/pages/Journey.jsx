import ImageWithFallback from '../components/ImageWithFallback'
import { GraduationCap,Image as ImageIcon,ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { education } from '../data/portfolio'
function EducationCard({item}){
 const images=item.images?.length?item.images:item.image?[item.image]:[]
 return <article className="glass education-card">{images.length?<div className="education-collage">{images.slice(0,3).map((src,index)=><ImageWithFallback key={src} className={`education-photo education-photo-${index+1}`} src={src} alt={`Campus view ${index+1}`} loading="lazy"/>)}<span className="journey-image-label"><GraduationCap size={14}/> EDUCATION</span></div>:<div className="education-placeholder"><ImageIcon size={28}/><span>ADD SCHOOL / COLLEGE PHOTOS</span></div>}<div className="journey-card-body"><span className="eyebrow">{item.period||'EDUCATION'}</span><h3>{item.title}</h3><p className="journey-org">{item.institution}</p><p>{item.detail}</p><div className="education-meta"><span>INSTITUTION</span><b>{item.institution}</b><span>QUALIFICATION</span><b>{item.qualification||item.title}</b></div><Link className="text-link" to={`/education/${item.id}`}>View education details <ArrowUpRight size={15}/></Link></div></article>
}
export default function Journey(){return <div className="page-content section-pad journey-page"><SectionHeading eyebrow="EDUCATION / LEARNING JOURNEY" title="Academic foundation." description="A dedicated record of qualifications, academic milestones and campus memories."/><div className="education-grid">{education.map(item=><EducationCard key={item.id} item={item}/>)}</div></div>}