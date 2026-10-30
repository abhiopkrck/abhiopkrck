import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PWAInstallPrompt from './components/PWAInstallPrompt.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Journey from './pages/Journey.jsx'
import Contact from './pages/Contact.jsx'
import Settings from './pages/Settings.jsx'
import MilestonePage from './pages/MilestonePage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    try { document.documentElement.dataset.theme = localStorage.getItem('abhi-portfolio-theme') || 'glassmorphism' } catch {}
  }, [])
  return <><ScrollToTop /><div className="ambient ambient-one" /><div className="ambient ambient-two" /><Navbar /><PWAInstallPrompt />
    <main className="site-shell"><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/experience" element={<MilestonePage type="internships" />} />
      <Route path="/hackathons" element={<MilestonePage type="hackathons" />} />
      <Route path="/certifications" element={<MilestonePage type="certifications" />} />
      <Route path="/courses" element={<MilestonePage type="courses" />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Home />} />
    </Routes></main><Footer /></>
}
