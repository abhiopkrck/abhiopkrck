import { Code2 } from 'lucide-react'
export default function SkillGroup({ group, index }) {
  return <article className="glass skill-card"><div className="skill-card-head"><span className="skill-index">0{index + 1}</span><Code2 size={19}/></div><h3>{group.title}</h3><div className="tag-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>
}