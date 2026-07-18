import type { VercelRequest, VercelResponse } from '@vercel/node'

const OWNER_EMAIL = 'rilwanayorinde@gmail.com'

// ── Resend (email API) ────────────────────────────────────────────────────────
// Sign up free at resend.com, get your API key, add to Vercel env vars as RESEND_API_KEY
// Free tier: 3,000 emails/month — more than enough for a waitlist

async function sendNotification(entry: { name: string; email: string; role: string }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email notification')
    return
  }

  // 1. Notify YOU (owner) about new signup
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'COVR Waitlist <onboarding@resend.dev>',
      to: [OWNER_EMAIL],
      subject: `🎨 New ${entry.role === 'artist' ? 'Artist' : 'Collector'} on COVR Waitlist — ${entry.name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 480px; margin: 0 auto; background: #1A1916; color: #F4F3EE; padding: 32px; border: 1px solid #3A3830;">
          <div style="border-bottom: 1px solid #3A3830; padding-bottom: 16px; margin-bottom: 24px;">
            <span style="color: #C49A28; font-size: 11px; letter-spacing: 2px;">C O V R</span>
            <h2 style="color: #F4F3EE; font-family: Georgia, serif; font-weight: 300; font-size: 22px; margin: 8px 0 0;">New Waitlist Signup</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #2A2825;">
              <td style="padding: 10px 0; color: #6B6860; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; width: 100px;">Name</td>
              <td style="padding: 10px 0; color: #F4F3EE; font-size: 14px;">${entry.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #2A2825;">
              <td style="padding: 10px 0; color: #6B6860; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">Email</td>
              <td style="padding: 10px 0; color: #C49A28; font-size: 14px;">${entry.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #2A2825;">
              <td style="padding: 10px 0; color: #6B6860; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">Role</td>
              <td style="padding: 10px 0; font-size: 14px;">
                <span style="background: ${entry.role === 'artist' ? '#8B6914' : '#2D6A4F'}; color: white; padding: 3px 10px; font-size: 10px; letter-spacing: 1px;">${entry.role.toUpperCase()}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6B6860; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;">Time</td>
              <td style="padding: 10px 0; color: #6B6860; font-size: 13px;">${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos', dateStyle: 'full', timeStyle: 'short' })} (Lagos)</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #3A3830;">
            <p style="color: #4A4740; font-size: 10px; letter-spacing: 1px; margin: 0;">COVR — covr-art.vercel.app</p>
          </div>
        </div>
      `,
    }),
  })

  // 2. Send welcome email TO the new subscriber
  const isArtist = entry.role === 'artist'
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Yusuf at COVR <onboarding@resend.dev>',
      to: [entry.email],
      reply_to: OWNER_EMAIL,
      subject: isArtist
        ? 'COVR — Your artist application is received.'
        : 'COVR — You are on the list.',
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 520px; margin: 0 auto; background: #FAFAF7; color: #1A1916; padding: 0;">
          <!-- Header -->
          <div style="background: #1A1916; padding: 24px 32px; border-left: 3px solid #C49A28;">
            <span style="font-family: 'Courier New', monospace; color: #C49A28; font-size: 10px; letter-spacing: 3px;">C O V R</span>
          </div>

          <!-- Body -->
          <div style="padding: 40px 32px;">
            <h1 style="font-weight: 300; font-size: 32px; line-height: 1.1; color: #1A1916; margin: 0 0 20px;">
              ${isArtist ? 'We received your artist application.' : `Welcome, ${entry.name.split(' ')[0]}.`}
            </h1>

            <p style="font-size: 15px; color: #6B6860; line-height: 1.8; font-family: 'Helvetica Neue', sans-serif; font-weight: 300; margin: 0 0 24px;">
              ${isArtist
                ? `Thank you for applying to list your cover art on COVR. We review every application personally. We will be in touch at this email address when artist submissions open — typically within the next few weeks.`
                : `You are on the COVR waitlist. Before any auction goes live, you will receive a 48-hour early notice — giving you first bid rights on original music cover art, before the public sees it.`
              }
            </p>

            <div style="background: #F4F3EE; border: 1px solid #E2E0D8; padding: 20px 24px; margin: 24px 0;">
              ${isArtist
                ? `<p style="font-family: 'Courier New', monospace; font-size: 10px; color: #8B6914; letter-spacing: 1px; margin: 0 0 8px; text-transform: uppercase;">What to prepare</p>
                   <p style="font-size: 14px; color: #3D3B35; line-height: 1.7; font-family: 'Helvetica Neue', sans-serif; font-weight: 300; margin: 0;">Your best original cover art — minimum 3000×3000px, PNG or TIFF. Know your Spotify profile URL and monthly listener count. We will walk you through the rest.</p>`
                : `<p style="font-family: 'Courier New', monospace; font-size: 10px; color: #8B6914; letter-spacing: 1px; margin: 0 0 8px; text-transform: uppercase;">What to expect</p>
                   <p style="font-size: 14px; color: #3D3B35; line-height: 1.7; font-family: 'Helvetica Neue', sans-serif; font-weight: 300; margin: 0;">Real bidding. Real art. Real frame delivered to your door. Every piece is original or strictly limited — authenticated by the artist, registered on COVR, and yours permanently when you win.</p>`
              }
            </div>

            <p style="font-size: 14px; color: #6B6860; line-height: 1.8; font-family: 'Helvetica Neue', sans-serif; font-weight: 300; margin: 0 0 8px;">
              In the meantime, explore the platform at:
            </p>
            <a href="https://covr-art.vercel.app" style="font-family: 'Courier New', monospace; font-size: 13px; color: #8B6914; text-decoration: none;">covr-art.vercel.app →</a>

            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E2E0D8;">
              <p style="font-size: 14px; color: #1A1916; margin: 0 0 4px;">Yusuf Ayorinde Rilwa</p>
              <p style="font-family: 'Courier New', monospace; font-size: 10px; color: #6B6860; margin: 0; letter-spacing: 1px;">FOUNDER, COVR</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #F4F3EE; border-top: 1px solid #E2E0D8; padding: 16px 32px; display: flex; justify-content: space-between;">
            <span style="font-family: 'Courier New', monospace; font-size: 9px; color: #9B9890; letter-spacing: 1px;">COVR — MUSIC ART OWNERSHIP PLATFORM</span>
            <span style="font-family: 'Courier New', monospace; font-size: 9px; color: #9B9890;">rilwanayorinde@gmail.com</span>
          </div>
        </div>
      `,
    }),
  })
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, role } = req.body as { name?: string; email?: string; role?: string }

  // Validate
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email and role are required.' })
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }
  if (!['collector', 'artist'].includes(role)) {
    return res.status(400).json({ error: 'Role must be collector or artist.' })
  }
  if (name.trim().length < 2) {
    return res.status(400).json({ error: 'Name is too short.' })
  }

  try {
    // Send emails (notify owner + welcome subscriber)
    await sendNotification({ name: name.trim(), email: email.trim().toLowerCase(), role })

    return res.status(200).json({
      success: true,
      message: `You are on the list, ${name.split(' ')[0]}. Check your email for confirmation.`,
    })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
