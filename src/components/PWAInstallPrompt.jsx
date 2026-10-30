import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null)
  const [visible, setVisible] = useState(false)
  const [ios, setIos] = useState(false)
  useEffect(() => {
    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    setIos(isIos && !standalone)
    if (standalone) return
    const dismissed = sessionStorage.getItem('pwa-install-dismissed')
    if (dismissed) return
    const onPrompt = event => { event.preventDefault(); setInstallEvent(event); setVisible(true) }
    const onInstalled = () => { setVisible(false); setInstallEvent(null) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    if (isIos) setVisible(true)
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled) }
  }, [])
  async function install() {
    if (!installEvent) return
    await installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
    setVisible(false)
  }
  function dismiss() { setVisible(false); try { sessionStorage.setItem('pwa-install-dismissed','1') } catch {} }
  if (!visible) return null
  return <aside className="pwa-install-card" role="dialog" aria-label="Install portfolio">
    <span className="pwa-install-icon"><Download size={19}/></span><div className="pwa-install-copy"><strong>Take this portfolio with you</strong><p>{ios ? 'Tap Share, then choose Add to Home Screen.' : 'Install it on your device for a quick app-like experience.'}</p></div>
    {installEvent && <button className="button button-primary pwa-install-action" onClick={install}>Install</button>}
    <button className="pwa-dismiss" onClick={dismiss} aria-label="Dismiss install prompt"><X size={16}/></button>
  </aside>
}
