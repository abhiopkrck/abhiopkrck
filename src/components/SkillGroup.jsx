import ImageWithFallback from './ImageWithFallback'
import { Code2 } from 'lucide-react'
export default function SkillGroup({ group, index }) {
  return <article className="glass skill-card"><div className="skill-card-head"><span className="skill-index">0{index + 1}</span><Code2 size={19}/></div><h3>{group.title}</h3>
    <div className="skill-icon-grid">{group.items.map(item => <div className="skill-icon-item" key={item.name} title={item.name}><span className="skill-logo"><ImageWithFallback src={item.icon} alt="" loading="lazy"/><span className="skill-logo-fallback">{item.name.slice(0,2)}</span></span><small>{item.name}</small></div>)}</div>
  </article>
}
