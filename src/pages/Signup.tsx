import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'collector' | 'artist'>('collector')
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate(role === 'artist' ? '/artist-submit' : '/dashboard') }

  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', maxWidth: '1320px', margin: '0 auto' }}>
        {/* Left */}
        <div className="hide-mobile" style={{ position: 'relative', overflow: 'hidden', background: 'var(--c-ink)', borderRight: '1px solid var(--c-rule)' }}>
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=90" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'grayscale(0.5)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--c-ink) 30%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '56px' }}>
            <p className="f-label" style={{ color: 'rgba(244,243,238,0.4)', marginBottom: '16px' }}>Join COVR</p>
            <h2 className="f-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#F4F3EE', lineHeight: 1.05, maxWidth: '380px', marginBottom: '32px' }}>Start your collection today.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Bid on original music cover art', 'Own physical framed pieces', 'Certified by the artists directly', 'Delivered to your door'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--c-gold2)', fontSize: '12px' }}>◈</span>
                  <span style={{ fontSize: '14px', color: 'rgba(244,243,238,0.6)', fontWeight: 300 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <Link to="/" className="f-display" style={{ fontSize: '20px', letterSpacing: '0.1em', display: 'block', marginBottom: '48px', color: 'var(--c-ink)' }}>COVR</Link>
            <p className="f-label" style={{ marginBottom: '8px' }}>New account</p>
            <h1 className="f-display" style={{ fontSize: '40px', color: 'var(--c-ink)', marginBottom: '28px' }}>Join COVR</h1>

            {/* Role picker */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px' }}>
              {(['collector', 'artist'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '12px', border: '1px solid', cursor: 'pointer', textAlign: 'center',
                  borderColor: role === r ? 'var(--c-gold)' : 'var(--c-rule2)',
                  background: role === r ? 'rgba(196,154,40,0.05)' : 'var(--c-bg2)',
                  fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: role === r ? 'var(--c-gold)' : 'var(--c-ink3)', transition: 'all 0.2s',
                }}>{r === 'collector' ? 'I am a Collector' : 'I am an Artist'}</button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Full Name</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Email Address</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Password</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 8 characters" className="input" />
              </div>
              <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6 }}>By creating an account you agree to COVR's Terms of Service and Privacy Policy.</p>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '15px', marginTop: '4px' }}>
                {role === 'artist' ? 'Continue to Artist Portal' : 'Create Account'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>
            <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '24px', textAlign: 'center' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--c-gold)', textDecoration: 'none', fontWeight: 400 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
