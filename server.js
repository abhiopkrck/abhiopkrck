import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

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

async function readJson(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 16 * 1024) throw Object.assign(new Error('Request body is too large.'), { status: 413 })
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
  } catch {
    throw Object.assign(new Error('Invalid request body.'), { status: 400 })
  }
}

async function sendContact(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message, website } = await readJson(req)
    // Silently accept bot submissions caught by the honeypot.
    if (website) return json(res, 200, { ok: true })

    if (![name, email, message].every(value => typeof value === 'string')) {
      return json(res, 400, { error: 'Please complete all required fields.' })
    }

    const cleanName = name.trim().slice(0, 100)
    const cleanEmail = email.trim().slice(0, 254)
    const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 140) : ''
    const cleanMessage = message.trim().slice(0, 5000)

    if (cleanName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanMessage.length < 10) {
      return json(res, 400, { error: 'Enter a valid name, email and message (at least 10 characters).' })
    }

    const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL']
    const missing = required.filter(key => !process.env[key])
    if (missing.length) {
      console.error('Contact email service missing environment variables:', missing.join(', '))
      return json(res, 503, { error: 'The contact email service is not configured yet. Please contact me using the email link.' })
    }

    const smtpPort = Number(process.env.SMTP_PORT)
    if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
      return json(res, 503, { error: 'The contact email service has an invalid SMTP configuration.' })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: { name: cleanName, address: cleanEmail },
      subject: `Portfolio message: ${cleanSubject || 'New enquiry'}`,
      text: `New message from your portfolio\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject || '(not provided)'}\n\nMessage:\n${cleanMessage}`
    })

    return json(res, 200, { ok: true, message: 'Your message has been sent.' })
  } catch (error) {
    if (error.status) return json(res, error.status, { error: error.message })
    console.error('Portfolio contact email failed:', error?.message || error)
    return json(res, 500, { error: 'Could not send your message right now. Please try again later.' })
  }
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

  const relative = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '')
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
    // Client-side routes (for example /contact) should load the SPA entry point.
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
  if (url.pathname === '/api/contact') return sendContact(req, res)
  if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'API endpoint not found.' })
  return serveStatic(req, res, url.pathname)
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server listening on port ${port}`)
})
