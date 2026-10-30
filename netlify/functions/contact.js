import nodemailer from 'nodemailer'

export const handler = async event => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: { Allow: 'POST' }, body: JSON.stringify({ error: 'Method not allowed' }) }
  let body
  try { body = JSON.parse(event.body || '{}') } catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) } }
  const { name, email, subject, message, website } = body
  const reply = (statusCode, payload) => ({ statusCode, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(payload) })
  if (website) return reply(200, { ok: true })
  if (![name, email, message].every(value => typeof value === 'string')) return reply(400, { error: 'Please complete all required fields.' })
  const cleanName = name.trim().slice(0, 100)
  const cleanEmail = email.trim().slice(0, 254)
  const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 140) : ''
  const cleanMessage = message.trim().slice(0, 5000)
  if (cleanName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanMessage.length < 10) return reply(400, { error: 'Enter a valid name, email and message (at least 10 characters).' })
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL']
  if (required.some(key => !process.env[key])) return reply(503, { error: 'The contact email service is not configured yet.' })
  try {
    const port = Number(process.env.SMTP_PORT)
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: process.env.SMTP_SECURE === 'true' || port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: { name: cleanName, address: cleanEmail },
      subject: `Portfolio message: ${cleanSubject || 'New enquiry'}`,
      text: `New message from your portfolio\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject || '(not provided)'}\n\nMessage:\n${cleanMessage}`
    })
    return reply(200, { ok: true, message: 'Your message has been sent.' })
  } catch (error) {
    console.error('Portfolio contact email failed:', error?.message || error)
    return reply(500, { error: 'Could not send your message right now. Please try again later.' })
  }
}
