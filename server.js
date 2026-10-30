import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')
const port = Number(process.env.PORT || 3000)
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
}

function json(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  })
  res.end(JSON.stringify(payload))
}

async function serveStatic(req, res, pathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return json(res, 405, { error: 'Method not allowed' })
  }

  let requestedPath
  try {
    requestedPath = decodeURIComponent(pathname)
  } catch {
    return json(res, 400, { error: 'Invalid URL path.' })
  }

  const relative = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\\/+/, '')
  let filePath = path.resolve(dist, relative)
  if (!filePath.startsWith(dist + path.sep) && filePath !== path.join(dist, 'index.html')) {
    return json(res, 403, { error: 'Forbidden' })
  }

  try {
    const info = await stat(filePath)
    if (info.isDirectory()) filePath = path.join(filePath, 'index.html')
    const content = await readFile(filePath)
    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': path.extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff'
    })
    res.end(req.method === 'HEAD' ? undefined : content)
  } catch {
    try {
      const html = await readFile(path.join(dist, 'index.html'))
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' })
      res.end(req.method === 'HEAD' ? undefined : html)
    } catch {
      json(res, 503, { error: 'The site has not been built yet.' })
    }
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost')
  if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'API endpoint not found.' })
  return serveStatic(req, res, url.pathname)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server listening on port ${port}`)
})
