import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { name, email, subject, message, website } = req.body || {}
  // Honeypot field: bots often fill hidden inputs; silently accept without sending.
  if (website) return res.status(200).json({ ok: true })
  if (![name, email, message].every(value => typeof value === 'string')) {
    return res.status(400).json({ error: 'Please complete all required fields.' })
  }
  const cleanName = name.trim().slice(0, 100)
  const cleanEmail = email.trim().slice(0, 254)
  const cleanSubject = typeof subject === 'string' ? subject.trim().slice(0, 140) : ''
  const cleanMessage = message.trim().slice(0, 5000)
  if (cleanName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanMessage.length < 10) {
    return res.status(400).json({ error: 'Enter a valid name, email and message (at least 10 characters).' })
  }
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO_EMAIL']
  const missing = required.filter(key => !process.env[key])
  if (missing.length) return res.status(503).json({ error: 'The contact email service is not configured yet.' })
  try {
    const port = Number(process.env.SMTP_PORT)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: { name: cleanName, address: cleanEmail },
      subject: `Portfolio message: ${cleanSubject || 'New enquiry'}`,
      text: `New message from your portfolio\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject || '(not provided)'}\n\nMessage:\n${cleanMessage}`
    })
    return res.status(200).json({ ok: true, message: 'Your message has been sent.' })
  } catch (error) {
    console.error('Portfolio contact email failed:', error?.message || error)
    return res.status(500).json({ error: 'Could not send your message right now. Please try again later.' })
  }
}
