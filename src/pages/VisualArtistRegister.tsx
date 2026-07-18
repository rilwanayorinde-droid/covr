import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function VisualArtistRegister() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitted, setSubmitted] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)

  const [form, setForm] = useState({
    fullName: '', email: '', username: '', phone: '',
    artType: '' as 'photographer' | 'illustrator' | 'painter' | 'digital' | 'mixed' | '',
    instagramHandle: '', portfolioUrl: '', bio: '',
    bankName: '', accountNumber: '', accountName: '',
    agreeTerms: false,
  })

  const u = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const checkUsername = async (val: string) => {
    if (val.length < 3) { setUsernameAvailable(null); return }
    setCheckingUsername(true)
    await new Promise(r => setTimeout(r, 800))
    // Simulate check — in production this hits /api/check-username
    const taken = ['lens_by_kolade', 'artbyjide', 'covr_visual'].includes(val.toLowerCase())
    setUsernameAvailable(!taken)
    setCheckingUsername(false)
  }

  const handleUsernameChange = (val: string) => {
    const clean = val.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()
    u('username', clean)
    setUsernameAvailable(null)
    clearTimeout((window as unknown as Record<string, ReturnType<typeof setTimeout>>)._usernameTimeout)
    ;(window as unknown as Record<string, ReturnType<typeof setTimeout>>)._usernameTimeout = setTimeout(() => checkUsername(clean), 600)
  }

  const ART_TYPES = [
    { v: 'photographer', l: 'Photographer', icon: '◉' },
    { v: 'illustrator', l: 'Illustrator', icon: '◈' },
    { v: 'painter', l: 'Painter', icon: '◻' },
    { v: 'digital', l: 'Digital Artist', icon: '◆' },
    { v: 'mixed', l: 'Mixed Media', icon: '◇' },
  ]

  if (submitted) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(196,154,40,0.1)', border: '1px solid rgba(196,154,40,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <p className="f-label anim-1" style={{ marginBottom: '12px', color: 'var(--c-gold)' }}>Application Received</p>
        <h1 className="f-display anim-2" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--c-ink)', marginBottom: '16px', lineHeight: 1.05 }}>
          Welcome to<br /><span className="f-display-italic gold">COVR.</span>
        </h1>
        <div style={{ padding: '20px 28px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)', marginBottom: '24px' }}>
          <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Your COVR Visual Artist Code</p>
          <p className="f-display gold" style={{ fontSize: '28px', letterSpacing: '0.04em' }}>@{form.username}</p>
          <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '8px', lineHeight: 1.6 }}>
            Share this username with music artists when agreeing on cover art commissions. They will enter it when submitting their drop — COVR handles the payment split automatically.
          </p>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8, marginBottom: '28px' }}>
          We will verify your application at {form.email} within 48 hours. Once approved your profile goes live on COVR.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">Go to Home</Link>
          <Link to="/drops" className="btn btn-outline">Browse Drops</Link>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg)' }}>
        <div className="container" style={{ padding: '48px 24px 0' }}>
          <p className="f-label" style={{ marginBottom: '8px', color: 'var(--c-gold)' }}>Visual Artist Portal</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--c-ink)', marginBottom: '12px' }}>
            Register as a<br /><span className="f-display-italic gold">Visual Artist</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7, maxWidth: '520px', marginBottom: '36px' }}>
            Created artwork that became a music cover? Register on COVR to receive automatic commission payments every time your art sells at auction. Your unique username is your creative identity on the platform.
          </p>

          {/* How it works */}
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto', marginBottom: '32px' }}>
            {[
              { n: '01', t: 'Register', d: 'Create your COVR visual artist profile and get your unique @username' },
              { n: '02', t: 'Get Commissioned', d: 'Music artist hires you and you agree on a commission percentage' },
              { n: '03', t: 'They Submit', d: 'Music artist lists the cover art on COVR and enters your @username' },
              { n: '04', t: 'Auction Closes', d: 'COVR automatically splits and pays your agreed % of the final bid' },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ flex: 1, minWidth: '160px', padding: '16px 20px', borderRight: i < arr.length - 1 ? '1px solid var(--c-rule)' : 'none', background: 'var(--c-bg2)', borderTop: '1px solid var(--c-rule)', borderBottom: '1px solid var(--c-rule)', ...(i === 0 ? { borderLeft: '1px solid var(--c-rule)' } : {}) }}>
                <p className="f-display gold" style={{ fontSize: '18px', marginBottom: '6px' }}>{s.n}</p>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink)', marginBottom: '4px' }}>{s.t}</p>
                <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.5 }}>{s.d}</p>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0', overflowX: 'auto' }}>
            {['Your Details', 'Art Profile', 'Payment Info'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'initial' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div className={`step-dot ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                    {step > i + 1 ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg> : <span style={{ fontSize: '10px' }}>{i + 1}</span>}
                  </div>
                  <span className="f-label" style={{ fontSize: '8px', color: step === i + 1 ? 'var(--c-ink)' : step > i + 1 ? 'var(--c-gold)' : 'var(--c-ink3)', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < 2 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`} style={{ margin: '0 8px', marginBottom: '20px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '680px', padding: '48px 24px' }}>

        {/* STEP 1 — Your Details */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Full Name</p>
                <input value={form.fullName} onChange={e => u('fullName', e.target.value)} placeholder="Your full name" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Email Address</p>
                <input type="email" value={form.email} onChange={e => u('email', e.target.value)} placeholder="your@email.com" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Phone Number</p>
                <input value={form.phone} onChange={e => u('phone', e.target.value)} placeholder="+234 800 000 0000" className="input" />
              </div>
            </div>

            {/* Username */}
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Your COVR Username</p>
              <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, marginBottom: '10px', lineHeight: 1.6 }}>
                This is your permanent visual artist identity on COVR. Music artists will use this to credit you on every drop. Choose carefully — it cannot be changed.
              </p>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-ink3)', fontSize: '15px', fontFamily: 'DM Mono, monospace' }}>@</span>
                <input
                  value={form.username}
                  onChange={e => handleUsernameChange(e.target.value)}
                  placeholder="yourname"
                  className="input"
                  style={{ paddingLeft: '30px', borderColor: usernameAvailable === true ? 'var(--c-green)' : usernameAvailable === false ? 'var(--c-live)' : 'var(--c-rule2)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}
                  maxLength={30}
                />
                {checkingUsername && (
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-ink3)" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                  </div>
                )}
                {!checkingUsername && usernameAvailable === true && (
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                )}
                {!checkingUsername && usernameAvailable === false && (
                  <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-live)" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </div>
                )}
              </div>
              {form.username && (
                <p style={{ fontSize: '11px', marginTop: '6px', fontWeight: 300, color: usernameAvailable === true ? 'var(--c-green)' : usernameAvailable === false ? 'var(--c-live)' : 'var(--c-ink3)' }}>
                  {checkingUsername ? 'Checking...' : usernameAvailable === true ? `✓ @${form.username} is available` : usernameAvailable === false ? `✗ @${form.username} is already taken` : `Lowercase letters, numbers, underscores only`}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => { if (!form.fullName || !form.email || !form.username || usernameAvailable !== true) return; setStep(2) }} className="btn btn-primary" style={{ opacity: (form.fullName && form.email && form.username && usernameAvailable === true) ? 1 : 0.4 }}>
                Next: Art Profile <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Art Profile */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>Art Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
                {ART_TYPES.map(t => (
                  <button key={t.v} onClick={() => u('artType', t.v)} style={{ padding: '14px 10px', border: '1px solid', cursor: 'pointer', textAlign: 'center', borderColor: form.artType === t.v ? 'var(--c-gold)' : 'var(--c-rule2)', background: form.artType === t.v ? 'rgba(196,154,40,0.05)' : 'var(--c-bg2)', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: '16px', color: form.artType === t.v ? 'var(--c-gold)' : 'var(--c-ink3)', marginBottom: '4px' }}>{t.icon}</div>
                    <p className="f-label" style={{ fontSize: '8px', color: form.artType === t.v ? 'var(--c-gold)' : 'var(--c-ink)' }}>{t.l}</p>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Instagram Handle</p>
                <input value={form.instagramHandle} onChange={e => u('instagramHandle', e.target.value)} placeholder="@yourhandle" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Portfolio URL (optional)</p>
                <input value={form.portfolioUrl} onChange={e => u('portfolioUrl', e.target.value)} placeholder="https://yourportfolio.com" className="input" />
              </div>
            </div>

            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>About Your Work</p>
              <textarea value={form.bio} onChange={e => u('bio', e.target.value)} placeholder="Tell artists and collectors about your style, your process, and what you bring to cover art..." rows={5} className="input" style={{ resize: 'vertical' }} />
            </div>

            {/* What your profile looks like */}
            {form.username && (
              <div style={{ padding: '20px 24px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '14px' }}>Your Public Profile Preview</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--c-bg3)', border: '1px solid var(--c-rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="f-display gold" style={{ fontSize: '18px' }}>{form.fullName[0] || '?'}</span>
                  </div>
                  <div>
                    <p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)', marginBottom: '2px' }}>{form.fullName || 'Your Name'}</p>
                    <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)', marginBottom: '4px' }}>@{form.username}</p>
                    <p className="f-label" style={{ fontSize: '8px' }}>{ART_TYPES.find(t => t.v === form.artType)?.l || 'Visual Artist'} · COVR Verified</p>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '12px', lineHeight: 1.6 }}>
                  {form.bio || 'Your bio will appear here.'}
                </p>
                <p className="f-label" style={{ fontSize: '8px', marginTop: '12px', color: 'var(--c-ink3)' }}>Portfolio appears here once drops are live</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} className="btn btn-outline">← Back</button>
              <button onClick={() => setStep(3)} className="btn btn-primary" style={{ opacity: form.artType && form.instagramHandle ? 1 : 0.4 }}>
                Next: Payment Info <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Payment Info */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px 24px', background: 'rgba(196,154,40,0.05)', border: '1px solid rgba(196,154,40,0.2)' }}>
              <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)', marginBottom: '6px' }}>How Commission Payments Work</p>
              <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>
                When an auction closes, COVR automatically calculates your agreed commission percentage from the final bid and transfers it to your registered bank account within 5 business days. You do not need to chase payments — it is handled entirely by the platform.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Bank Name</p>
                <select value={form.bankName} onChange={e => u('bankName', e.target.value)} className="input" style={{ cursor: 'pointer' }}>
                  <option value="">Select your bank</option>
                  {['Access Bank', 'GTBank', 'First Bank', 'UBA', 'Zenith Bank', 'Kuda Bank', 'Opay', 'Palmpay', 'Sterling Bank', 'Fidelity Bank', 'Union Bank', 'Wema Bank', 'Stanbic IBTC', 'Other'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Account Number</p>
                <input type="number" value={form.accountNumber} onChange={e => u('accountNumber', e.target.value)} placeholder="10-digit account number" className="input" maxLength={10} />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Account Name</p>
                <input value={form.accountName} onChange={e => u('accountName', e.target.value)} placeholder="Name as it appears on your account" className="input" />
              </div>
            </div>

            {/* Commission example */}
            {form.bankName && (
              <div style={{ padding: '18px 22px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>Example Payout</p>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>
                  If your artwork sells for <strong style={{ color: 'var(--c-ink)' }}>₦500,000</strong> and your agreed commission is <strong style={{ color: 'var(--c-ink)' }}>25%</strong>, you receive <strong style={{ color: 'var(--c-gold)' }}>₦125,000</strong> automatically to {form.bankName}. The music artist receives ₦307,500 (61.5%) and COVR retains ₦67,500 (13.5%).
                </p>
              </div>
            )}

            {/* Terms */}
            <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input type="checkbox" checked={form.agreeTerms} onChange={e => u('agreeTerms', e.target.checked)} style={{ accentColor: 'var(--c-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>
                I confirm that all artwork I am credited for on COVR was created by me or with my direct involvement, and I have the right to receive commission from its sale. I agree to COVR's Visual Artist Terms of Service.
              </span>
            </label>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} className="btn btn-outline">← Back</button>
              <button
                onClick={() => setSubmitted(true)}
                className="btn btn-gold"
                disabled={!form.bankName || !form.accountNumber || !form.accountName || !form.agreeTerms}
                style={{ opacity: (form.bankName && form.accountNumber && form.accountName && form.agreeTerms) ? 1 : 0.4 }}
              >
                Register as Visual Artist
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </main>
  )
}
