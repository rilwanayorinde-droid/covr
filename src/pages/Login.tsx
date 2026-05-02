import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate('/dashboard') }
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center' }}>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 grid md:grid-cols-2" style={{ minHeight: 'calc(100vh - 72px)' }}>
        <div className="hidden md:block relative overflow-hidden" style={{ borderRight: '1px solid var(--rule)' }}>
          <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=90" alt="" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
          <div className="absolute inset-0 flex flex-col justify-end p-16" style={{ background: 'linear-gradient(135deg, var(--ink) 30%, transparent 100%)' }}>
            <p className="label mb-6" style={{ fontSize: '9px' }}>Welcome Back</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.05, color: 'var(--off-white)', maxWidth: '420px' }}>Own a piece of music history.</h2>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 md:px-16 py-20">
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Link to="/" className="gold-text inline-block mb-12" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', letterSpacing: '0.12em', textDecoration: 'none' }}>COVR</Link>
            <p className="label mb-4" style={{ fontSize: '9px' }}>Collector Login</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '48px', lineHeight: 1, color: 'var(--off-white)', marginBottom: '40px' }}>Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Email</p><input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Password</p><input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="input-field" /></div>
              <div className="flex justify-end"><a href="#" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--sub)', textDecoration: 'none' }}>Forgot password?</a></div>
              <button type="submit" className="btn btn-gold w-full justify-center mt-2">Continue <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </form>
            <div className="flex items-center gap-4 my-6"><div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} /><span className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>or</span><div style={{ flex: 1, height: '1px', background: 'var(--rule)' }} /></div>
            <Link to="/admin" style={{ display: 'block', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.1em', padding: '12px', border: '1px solid var(--rule)' }}>Admin Login →</Link>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, marginTop: '24px', textAlign: 'center' }}>No account? <Link to="/signup" style={{ color: 'var(--gold-pale)', textDecoration: 'none' }}>Create one</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}