import { useEffect, useState } from 'react'
import { Check, Palette, RotateCcw, Smartphone } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const themes = [
  { id:'glassmorphism', name:'Glassmorphism', note:'Frosted translucent panels', colors:['#10172d','#79e7f3','#a99aff'] },
  { id:'claymorphism', name:'Claymorphism', note:'Soft, inflated surfaces', colors:['#e9dff7','#9875d7','#f5a8c8'] },
  { id:'simple', name:'Simple Light', note:'Clean, bright and readable', colors:['#f5f7fb','#3157a4','#1e293b'] },
  { id:'static', name:'Static Minimal', note:'Flat surfaces, no visual motion', colors:['#f1f2f4','#20252d','#687386'] },
  { id:'cyberpunk', name:'Cyberpunk', note:'Neon contrast and dark panels', colors:['#100b20','#ff3bd4','#d5ff3f'] },
  { id:'skewmorphism', name:'Skewmorphism', note:'Angled edges and layered depth', colors:['#101a2c','#ff9c62','#69e1d0'] },
  { id:'neumorphism', name:'Neumorphism', note:'Soft raised and inset surfaces', colors:['#dfe5ee','#536b91','#8c9bb0'] },
  { id:'aurora', name:'Aurora', note:'Northern-light gradients', colors:['#101b2b','#6de6c5','#a88cff'] },
  { id:'ocean', name:'Deep Ocean', note:'Calm blue interface', colors:['#071c2c','#46c6e8','#6b9dff'] },
  { id:'forest', name:'Forest', note:'Natural greens and warm neutrals', colors:['#12251e','#9bd7a5','#e0c68b'] },
  { id:'sunset', name:'Sunset', note:'Warm coral and violet', colors:['#24172b','#ff9a76','#d6a4ff'] },
  { id:'monochrome', name:'Monochrome', note:'Sharp black and white', colors:['#151515','#f2f2f2','#999999'] },
  { id:'terminal', name:'Retro Terminal', note:'Classic green phosphor terminal', colors:['#06130d','#54ff9b','#b6f7c9'] },
  { id:'rose', name:'Rose Quartz', note:'Soft pink and plum palette', colors:['#281b2b','#f3a8c8','#d8b6ff'] },
  { id:'solarized', name:'Solarized', note:'Balanced warm paper and teal', colors:['#fdf6e3','#268bd2','#586e75'] }
]

function readTheme(){ try { return localStorage.getItem('abhi-portfolio-theme') || 'glassmorphism' } catch { return 'glassmorphism' } }

export default function Settings() {
  const [active, setActive] = useState(readTheme)
  useEffect(() => { document.documentElement.dataset.theme = active }, [active])
  function chooseTheme(id) {
    setActive(id)
    document.documentElement.dataset.theme = id
    try { localStorage.setItem('abhi-portfolio-theme', id) } catch {}
  }
  return <div className="page-content section-pad settings-page">
    <SectionHeading eyebrow="PREFERENCES / 01" title="Make it yours." description="Choose the visual style used across the portfolio. Your selection is saved on this device." />
    <section className="settings-section">
      <div className="settings-section-heading"><span className="settings-icon"><Palette size={19}/></span><div><h2>Appearance</h2><p>15 visual themes · applies instantly</p></div><span className="settings-active-label">{themes.find(t=>t.id===active)?.name}</span></div>
      <div className="theme-grid">{themes.map(theme => <button type="button" key={theme.id} onClick={()=>chooseTheme(theme.id)} className={`theme-option ${active===theme.id?'selected':''}`} aria-pressed={active===theme.id}>
        <span className="theme-preview" style={{'--preview-bg':theme.colors[0],'--preview-a':theme.colors[1],'--preview-b':theme.colors[2]}}><i/><i/><b/><em/></span>
        <span className="theme-option-copy"><strong>{theme.name}</strong><small>{theme.note}</small></span>
        <span className="theme-check">{active===theme.id?<Check size={15}/>:null}</span>
      </button>)}</div>
      <button type="button" className="button button-ghost settings-reset" onClick={()=>chooseTheme('glassmorphism')}><RotateCcw size={14}/> Reset to Glassmorphism</button>
    </section>
    <section className="settings-section install-settings"><span className="settings-icon"><Smartphone size={19}/></span><div><h2>Install this portfolio</h2><p>On Android, open the browser menu and choose <b>Install app</b> or <b>Add to Home screen</b> if the install prompt is not shown. The install banner appears when your browser supports it.</p></div></section>
  </div>
}
