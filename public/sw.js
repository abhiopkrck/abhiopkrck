const CACHE_NAME = 'abhishek-portfolio-v2'
const APP_SHELL = ['/', '/manifest.webmanifest', '/icons/app-icon.svg']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)

  // Never intercept API requests, form submissions, or cross-origin requests.
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

  // Let the server handle page navigation first. If offline, serve the cached
  // app shell; always return a valid Response even if the cache is empty.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cachedShell = await caches.match('/')
        return cachedShell || new Response(
          '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><body><h1>You are offline</h1><p>Please reconnect and try again.</p></body></html>',
          { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
        )
      })
    )
    return
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone()
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)))
      }
      return response
    }))
  )
})
