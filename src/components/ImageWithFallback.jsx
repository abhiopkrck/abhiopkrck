import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function placeholderFor(label = 'Image') {
  const title = String(label).replace(/[<>"'&]/g, '').slice(0, 48) || 'Image unavailable'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#18233e"/><stop offset="1" stop-color="#302b59"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><circle cx="400" cy="205" r="56" fill="#78e7f4" fill-opacity=".14"/><path d="M370 222l27-32 24 26 14-15 28 36h-93z" fill="#78e7f4" fill-opacity=".75"/><text x="400" y="330" text-anchor="middle" fill="#e0e8ff" font-family="Arial,sans-serif" font-size="24">${title}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export default function ImageWithFallback({ src, alt = 'Image', onError, onClick, ...props }) {
  const [failed, setFailed] = useState(false)
  const [enlarged, setEnlarged] = useState(false)
  const displaySrc = failed ? placeholderFor(alt) : src
  const zoomable = Boolean(alt)

  useEffect(() => {
    if (!enlarged) return undefined
    const closeOnEscape = event => event.key === 'Escape' && setEnlarged(false)
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [enlarged])

  const openImage = event => {
    onClick?.(event)
    if (!zoomable) return
    event.preventDefault()
    event.stopPropagation()
    setEnlarged(true)
  }

  return <>
    <img {...props} src={displaySrc} alt={alt} title={zoomable ? 'Click to enlarge' : undefined}
      className={`${props.className || ''}${zoomable ? ' zoomable-photo' : ''}`.trim()}
      tabIndex={zoomable ? 0 : undefined} aria-haspopup={zoomable ? 'dialog' : undefined}
      onClick={openImage}
      onKeyDown={event => {
        if (zoomable && (event.key === 'Enter' || event.key === ' ')) openImage(event)
      }}
      onError={event => {
        if (!failed) setFailed(true)
        onError?.(event)
      }} />
    {enlarged && createPortal(<div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={alt}
      onClick={event => event.target === event.currentTarget && setEnlarged(false)}>
      <button className="photo-lightbox-close" type="button" aria-label="Close enlarged photo" onClick={() => setEnlarged(false)}>×</button>
      <img src={displaySrc} alt={alt} />
    </div>, document.body)}
  </>
}
