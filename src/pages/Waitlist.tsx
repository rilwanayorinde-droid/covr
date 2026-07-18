import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DROPS_COMING = [
  { title: 'Invisible Cities', artist: 'SOLIS', genre: 'Alternative R&B', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80' },
  { title: 'Still Water', artist: 'Amara', genre: 'Soul', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
  { title: 'Afterglow', artist: 'SOLIS', genre: 'Afropiano', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80' },
]

const SOCIAL_PROOF = [
  { name: 'Adaeze C.', city: 'London', msg: 'Finally — a way to own the art, not just stream the song.' },
  { name: 'Tunde B.', city: 'Lagos', msg: 'I have been waiting for something like this for years.' },
  { name: 'Kemi O.', city: 'Abuja', msg: 'Music deserves a physical home. COVR gets it.' },
]

export default function Waitlist() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'collector' | 'artist' | ''>('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [count, setCount] = useState(1200)
  const [proofIdx, setProofIdx] = useState(0)

  // Animate count up on mount
  useEffect(() => {
    let start = 1200
    const end = 1284
    const id = setInterval(() => {
      start += 3
      if (start >= end) { setCount(end); clearInterval(id) }
      else setCount(start)
    }, 30)
    return () => clearInterval(id)
  }, [])

  // Rotate social proof
  useEffect(() => {
    const id = setInterval(() => setProofIdx(i => (i + 1) % SOCIAL_PROOF.length), 4000)
    return () => clearInterval(id)
  }, [])

  const valid = name.trim().length > 1 && email.includes('@') && email.includes('.') && role !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) { setError('Please fill in all fields correctly.'); return }
    setLoading(true); setError('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), role }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); setLoading(false); return }
      setSubmitted(true)
      setCount(c => c + 1)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setLoading(false)
    }
  }

  // ── SUCCESS STATE ───────────────────────────────────────────────────────────
  if (submitted) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <div className="anim-1" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        </div>

        <p className="f-label anim-1" style={{ marginBottom: '12px', color: 'var(--c-gold)' }}>You are on the list</p>

        <h1 className="f-display anim-2" style={{ fontSize: 'clamp(36px, 6vw, 52px)', color: 'var(--c-ink)', marginBottom: '16px', lineHeight: 1.05 }}>
          Welcome to<br /><span className="f-display-italic gold">COVR.</span>
        </h1>

        <p className="anim-3" style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8, marginBottom: '32px' }}>
          {role === 'artist'
            ? `We received your artist application. We will be in touch at ${email} when submissions open.`
            : `A confirmation has been sent to ${email}. We will notify you 48 hours before each drop — giving you first bid rights.`
          }
        </p>

        <div className="anim-4" style={{ padding: '20px 24px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)', marginBottom: '32px' }}>
          <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>You are collector number</p>
          <p className="f-display gold" style={{ fontSize: '40px', lineHeight: 1 }}>#{count.toLocaleString()}</p>
          <p className="f-label" style={{ fontSize: '8px', marginTop: '6px', color: 'var(--c-ink3)' }}>on the COVR waitlist</p>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7, marginBottom: '20px' }}>
          Know someone who loves music and art? Share COVR with them.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`https://twitter.com/intent/tweet?text=I just joined the COVR waitlist — a marketplace to own original music cover art before the song drops. covr-art.vercel.app/waitlist`}
            target="_blank" rel="noreferrer" className="btn btn-primary btn-sm"
          >
            Share on X / Twitter
          </a>
          <a
            href={`https://wa.me/?text=I just joined COVR — you can bid on and own original music cover art before the song is released. Join the waitlist: covr-art.vercel.app/waitlist`}
            target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"
          >
            Share on WhatsApp
          </a>
          <Link to="/" className="btn btn-ghost btn-sm">Explore Platform</Link>
        </div>
      </div>
    </main>
  )

  // ── MAIN WAITLIST PAGE ──────────────────────────────────────────────────────
  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', padding: '72px 24px' }}>

          {/* LEFT */}
          <div>
            {/* Live counter badge */}
            <div className="anim-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', border: '1px solid var(--c-rule2)', background: 'var(--c-bg2)', marginBottom: '28px' }}>
              <span className="live-dot" />
              <span className="f-label" style={{ fontSize: '9px' }}>
                <span style={{ color: 'var(--c-gold)', fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 500 }}>
                  {count.toLocaleString()}
                </span>&nbsp;collectors already waiting
              </span>
            </div>

            <h1 className="f-display anim-2" style={{ fontSize: 'clamp(40px, 6vw, 68px)', color: 'var(--c-ink)', lineHeight: 0.97, marginBottom: '24px' }}>
              Be first to<br />own the<br /><span className="f-display-italic gold">cover art.</span>
            </h1>

            <p className="anim-3" style={{ fontSize: '16px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8, maxWidth: '400px', marginBottom: '32px' }}>
              COVR is opening bidding on original music cover art — before the world hears the song. Join the waitlist for early access and first bid rights.
            </p>

            {/* Feature pills */}
            <div className="anim-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {['Authenticated by the artist', 'Museum-grade framing', 'Delivered to your door', 'Certificate of authenticity'].map(f => (
                <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 10px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)', fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-ink3)' }}>
                  <span style={{ color: 'var(--c-gold)' }}>◈</span>{f}
                </span>
              ))}
            </div>

            {/* Rotating social proof */}
            <div className="anim-5" style={{ padding: '18px 20px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)', minHeight: '90px' }}>
              <div key={proofIdx} style={{ animation: 'fadeUp 0.5s var(--ease-out) both' }}>
                <p style={{ fontSize: '14px', color: 'var(--c-ink)', fontStyle: 'italic', fontFamily: 'Fraunces, serif', fontWeight: 300, marginBottom: '8px', lineHeight: 1.6 }}>
                  "{SOCIAL_PROOF[proofIdx].msg}"
                </p>
                <p className="f-label" style={{ fontSize: '8px' }}>
                  {SOCIAL_PROOF[proofIdx].name} · {SOCIAL_PROOF[proofIdx].city}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div>
            <div style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg)', overflow: 'hidden' }}>
              {/* Form header */}
              <div style={{ padding: '22px 26px', borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
                <p className="f-label" style={{ marginBottom: '6px', fontSize: '9px' }}>Limited Early Access</p>
                <h2 className="f-display" style={{ fontSize: '26px', color: 'var(--c-ink)', marginBottom: '4px' }}>Join the Waitlist</h2>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300 }}>Free to join. No credit card required.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: '26px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  {/* Name */}
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Full Name</p>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="input"
                      style={{ fontSize: '15px' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Email Address</p>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input"
                      style={{ fontSize: '15px' }}
                    />
                  </div>

                  {/* Role selector */}
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '10px' }}>I am joining as a</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {([
                        { v: 'collector' as const, label: 'Collector', desc: 'I want to bid on cover art', icon: '◻' },
                        { v: 'artist' as const, label: 'Artist', desc: 'I want to list my cover art', icon: '◈' },
                      ]).map(o => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setRole(o.v)}
                          style={{
                            padding: '13px 11px', border: '1px solid', cursor: 'pointer', textAlign: 'left',
                            borderColor: role === o.v ? 'var(--c-gold)' : 'var(--c-rule2)',
                            background: role === o.v ? 'rgba(196,154,40,0.05)' : 'var(--c-bg2)',
                            transition: 'all 0.2s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                            <span style={{ color: role === o.v ? 'var(--c-gold)' : 'var(--c-ink3)', fontSize: '11px' }}>{o.icon}</span>
                            <span className="f-label" style={{ fontSize: '9px', color: role === o.v ? 'var(--c-gold)' : 'var(--c-ink)' }}>{o.label}</span>
                          </div>
                          <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{o.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div style={{ padding: '10px 14px', background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.3)' }}>
                      <p style={{ fontSize: '12px', color: 'var(--c-live)', fontWeight: 300 }}>{error}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ justifyContent: 'center', padding: '14px', opacity: valid ? 1 : 0.4, fontSize: '11px', marginTop: '4px', transition: 'all 0.2s' }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <>Secure My Spot <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>
                    )}
                  </button>

                  <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300, textAlign: 'center', lineHeight: 1.6 }}>
                    No spam. Ever. Only drop alerts, early access news, and COVR updates.
                  </p>
                </div>
              </form>

              {/* Trust bar */}
              <div style={{ padding: '12px 26px', borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                {[{ icon: '◈', label: 'Artist Verified' }, { icon: '◻', label: 'Physical Frame' }, { icon: '◇', label: 'Insured Delivery' }].map(t => (
                  <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: 'var(--c-gold)', fontSize: '9px' }}>{t.icon}</span>
                    <span className="f-label" style={{ fontSize: '7px' }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media(max-width:768px){
            .wl-grid{grid-template-columns:1fr!important;gap:40px!important;padding:48px 16px!important;}
          }
          @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        `}</style>
      </section>

      {/* COMING DROPS PREVIEW */}
      <section className="section" style={{ borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '8px' }}>First to Drop</p>
              <h2 className="f-display" style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: 'var(--c-ink)' }}>What waitlist members bid on first</h2>
            </div>
            <span className="badge badge-live"><span className="live-dot" />Launching Soon</span>
          </div>
          <div className="grid-3">
            {DROPS_COMING.map((drop, i) => (
              <div key={drop.title} className={`card reveal delay-${i + 1}`}>
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                  <img src={drop.img} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.5) brightness(0.65)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,22,0.7) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge badge-ink" style={{ background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(8px)', fontSize: '8px' }}>Waitlist Only</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                    <p className="f-label" style={{ fontSize: '8px', color: 'rgba(244,243,238,0.6)', marginBottom: '2px' }}>{drop.artist} · {drop.genre}</p>
                    <h3 className="f-display" style={{ fontSize: '20px', color: '#F4F3EE' }}>{drop.title}</h3>
                  </div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300 }}>Original cover art. 1 of 1. Bidding opens to waitlist members first.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section" style={{ borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="f-label" style={{ marginBottom: '10px' }}>After You Join</p>
            <h2 className="f-display" style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: 'var(--c-ink)' }}>Your path to owning the art</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
            {[
              { n: '01', t: 'You join the waitlist today', d: 'Your spot is reserved. A confirmation email arrives from COVR within minutes.' },
              { n: '02', t: 'We notify you 48hrs before each drop', d: 'Before any auction goes public, waitlist members get early notice and first bid rights.' },
              { n: '03', t: 'You bid on original cover art', d: 'Real-time bidding. One original piece per auction. Highest bid when the clock ends wins.' },
              { n: '04', t: 'Your frame is prepared and shipped', d: 'Museum-grade print, archival frame, signed certificate of authenticity — delivered within 14 days.' },
              { n: '05', t: 'You own a piece of music history', d: 'Registered under your name. Artist-signed. Certified. Permanently, officially yours.' },
            ].map((step, i) => (
              <div key={step.n} className={`reveal delay-${(i % 3) + 1}`} style={{ display: 'flex', gap: '20px', padding: '20px 22px', background: 'var(--c-bg)', alignItems: 'flex-start' }}>
                <span className="f-display gold" style={{ fontSize: '22px', minWidth: '30px', flexShrink: 0, lineHeight: 1.2 }}>{step.n}</span>
                <div>
                  <h3 className="f-display" style={{ fontSize: '17px', color: 'var(--c-ink)', marginBottom: '3px' }}>{step.t}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: 'var(--c-ink)', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
          <p className="f-label reveal" style={{ color: 'rgba(244,243,238,0.4)', marginBottom: '14px' }}>Limited Waitlist</p>
          <h2 className="f-display reveal delay-1" style={{ fontSize: 'clamp(30px, 5vw, 48px)', color: '#F4F3EE', marginBottom: '16px', lineHeight: 1.05 }}>
            The art behind<br />the music is yours<br /><span className="f-display-italic gold">to own.</span>
          </h2>
          <p className="reveal delay-2" style={{ fontSize: '15px', color: 'rgba(244,243,238,0.5)', fontWeight: 300, lineHeight: 1.8, marginBottom: '28px' }}>
            Join {count.toLocaleString()}+ collectors who have already reserved their spot.
          </p>
          <div className="reveal delay-3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-gold"
            >
              Join the Waitlist
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <Link to="/" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(244,243,238,0.6)' }}>
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
