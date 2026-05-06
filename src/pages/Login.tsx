import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate('/dashboard') }

  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', maxWidth: '1320px', margin: '0 auto' }}>
        {/* Left image panel */}
        <div className="hide-mobile" style={{ position: 'relative', overflow: 'hidden', background: 'var(--c-bg3)', borderRight: '1px solid var(--c-rule)' }}>
          <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=90" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'grayscale(0.4)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--c-bg) 25%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '56px' }}>
            <p className="f-label" style={{ marginBottom: '16px' }}>The Art Behind the Music</p>
            <h2 className="f-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--c-ink)', lineHeight: 1.05, maxWidth: '380px' }}>Own a piece of music history.</h2>
          </div>
        </div>

        {/* Right form */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <Link to="/" className="f-display" style={{ fontSize: '20px', letterSpacing: '0.1em', display: 'block', marginBottom: '48px', color: 'var(--c-ink)' }}>COVR</Link>
            <p className="f-label" style={{ marginBottom: '8px' }}>Welcome back</p>
            <h1 className="f-display" style={{ fontSize: '40px', color: 'var(--c-ink)', marginBottom: '36px' }}>Sign In</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Email Address</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className="input" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <p className="f-label" style={{ fontSize: '8px' }}>Password</p>
                  <a href="#" className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)' }}>Forgot?</a>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="input" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '15px', marginTop: '8px' }}>
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
              <div className="divider" />
              <span className="f-label" style={{ fontSize: '8px', flexShrink: 0, color: 'var(--c-rule2)' }}>or</span>
              <div className="divider" />
            </div>

            <Link to="/admin" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '9px' }}>Admin Login →</Link>

            <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '24px', textAlign: 'center' }}>
              No account? <Link to="/signup" style={{ color: 'var(--c-gold)', textDecoration: 'none', fontWeight: 400 }}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.auth-grid{grid-template-columns:1fr!important;}}`}</style>
    </main>
  )
}
