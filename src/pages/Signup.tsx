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
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center' }}>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-2" style={{ minHeight: 'calc(100vh - 72px)' }}>
        <div className="hidden md:block relative overflow-hidden" style={{ borderRight: '1px solid var(--rule)' }}>
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=90" alt="" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
          <div className="absolute inset-0 flex flex-col justify-end p-16" style={{ background: 'linear-gradient(135deg, var(--ink) 30%, transparent 100%)' }}>
            <p className="label mb-6" style={{ fontSize: '9px' }}>Join COVR</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 52px)', lineHeight: 1.05, color: 'var(--off-white)', maxWidth: '420px' }}>Start your collection today.</h2>
            <div className="flex flex-col gap-3 mt-10">
              {['Bid on original music cover art', 'Own physical framed pieces', 'Certified by the artists directly', 'Delivered to your door'].map(f => (
                <div key={f} className="flex items-center gap-3"><span style={{ color: 'var(--gold)', fontSize: '12px' }}>◈</span><span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300 }}>{f}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 md:px-16 py-20">
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Link to="/" className="gold-text inline-block mb-12" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', letterSpacing: '0.12em', textDecoration: 'none' }}>COVR</Link>
            <p className="label mb-4" style={{ fontSize: '9px' }}>New Account</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '48px', lineHeight: 1, color: 'var(--off-white)', marginBottom: '32px' }}>Join COVR</h1>
            {/* Role selector */}
            <div className="flex gap-2 mb-6">
              {(['collector', 'artist'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)} className="flex-1 py-3 font-label" style={{ fontSize: '9px', background: role === r ? 'var(--gold-light)' : 'var(--ink-2)', color: role === r ? 'var(--ink)' : 'var(--sub)', border: '1px solid', borderColor: role === r ? 'var(--gold-light)' : 'var(--rule-2)', cursor: 'pointer' }}>
                  {r === 'collector' ? 'I am a Collector' : 'I am an Artist'}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Full Name</p><input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Email</p><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Password</p><input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 8 characters" className="input-field" /></div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6 }}>By creating an account you agree to COVR's Terms of Service and Privacy Policy.</p>
              <button type="submit" className="btn btn-gold w-full justify-center mt-2">
                {role === 'artist' ? 'Continue to Artist Portal' : 'Create Account'}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, marginTop: '24px', textAlign: 'center' }}>Already have an account? <Link to="/login" style={{ color: 'var(--gold-pale)', textDecoration: 'none' }}>Sign in</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}
