import { Code2 } from 'lucide-react'
export default function SkillGroup({ group, index }) {
  return <article className="glass skill-card"><div className="skill-card-head"><span className="skill-index">0{index + 1}</span><Code2 size={19}/></div><h3>{group.title}</h3>
    <div className="skill-icon-grid">{group.items.map(item => <div className="skill-icon-item" key={item.name} title={item.name}><span className="skill-logo"><img src={item.icon} alt="" loading="lazy" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'grid' }}/><span className="skill-logo-fallback">{item.name.slice(0,2)}</span></span><small>{item.name}</small></div>)}</div>
  </article>
}
