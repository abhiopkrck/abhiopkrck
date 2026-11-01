import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, GraduationCap, Image as ImageIcon } from 'lucide-react'
import { education } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
export default function EducationDetail(){
 const {educationId}=useParams();const item=education.find(x=>x.id===educationId)
 if(!item)return <div className="page-content section-pad"><SectionHeading eyebrow="EDUCATION / NOT FOUND" title="Education record not found."/><Link className="button button-primary" to="/journey"><ArrowLeft size={16}/> Back to education</Link></div>
 return <div className="page-content section-pad detail-page"><Link className="back-link" to="/journey"><ArrowLeft size={15}/> EDUCATION</Link><div className="detail-hero"><div><span className="eyebrow">ACADEMIC JOURNEY</span><h1>{item.title}</h1><p>{item.institution}</p><p>{item.detail}</p><div className="detail-status">{item.period} · {item.status||'Academic record'}</div></div><div className="detail-cover"><img src={item.images?.[0]||item.image} alt="Education campus"/><span><GraduationCap size={14}/> EDUCATION</span></div></div>
 <div className="detail-meta-grid"><div className="glass detail-meta"><small>QUALIFICATION</small><b>{item.qualification||item.title}</b></div><div className="glass detail-meta"><small>INSTITUTION</small><b>{item.institution}</b></div><div className="glass detail-meta"><small>PERIOD</small><b>{item.period}</b></div></div>
 <section className="detail-section"><span className="eyebrow">01 / ACADEMIC HIGHLIGHTS</span><h2>Learning journey</h2><ul className="detail-list">{(item.highlights||[]).map(x=><li key={x}>{x}</li>)}</ul></section>
 <section className="detail-section"><span className="eyebrow">02 / CAMPUS & MEMORIES</span><h2>Education gallery</h2>{item.images?.length?<div className="detail-gallery">{item.images.map((src,i)=><figure key={src}><img src={src} alt={'Education gallery '+(i+1)}/></figure>)}</div>:<div className="media-empty"><ImageIcon size={22}/><span>Add your actual college and campus photos here.</span></div>}</section>
 <Link className="text-link" to="/journey"><ArrowLeft size={15}/> Back to education</Link></div>
}