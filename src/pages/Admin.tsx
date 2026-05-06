import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = 'COVR@Admin2025'

type Tab = 'pending' | 'listings' | 'transactions' | 'users' | 'analytics'

const PENDING = [
  { id: 1, title: 'Solar Drift', artist: 'Neon Folklore', artistType: 'independent', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80', submitted: '2 hours ago', edition: '1 of 1', notes: 'Single cover for upcoming Afrobeats release. Monthly listeners: 42K. DistroKid verified.', listeners: 42000, quality: 85 },
  { id: 2, title: 'Amber Wave', artist: 'Kemi Osei', artistType: 'label', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', submitted: '5 hours ago', edition: 'Ed. 1/3', notes: 'Limited edition album artwork. Label: Afrowave Records. ISRC provided.', listeners: 89000, quality: 92 },
  { id: 3, title: 'Frequency', artist: 'REMA Arts', artistType: 'independent', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80', submitted: '1 day ago', edition: '1 of 1', notes: 'Cover art for surprise drop. Low listener count — borderline.', listeners: 4200, quality: 71 },
]
const LISTINGS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', status: 'live', currentBid: '₦520,000', bids: 14, endsIn: '3h 41m' },
  { id: 2, title: 'Still Water', artist: 'Amara', status: 'live', currentBid: '₦185,000', bids: 6, endsIn: '7h 14m' },
  { id: 3, title: 'Drift', artist: 'Kenn Ola', status: 'live', currentBid: '₦74,000', bids: 3, endsIn: '14h 2m' },
  { id: 4, title: 'Afterglow', artist: 'SOLIS', status: 'upcoming', currentBid: '—', bids: 0, endsIn: '2 days' },
]
const TRANSACTIONS = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', buyer: 'dr.yusuf@email.com', amount: '₦640,000', commission: '₦76,800', date: 'Apr 10', status: 'delivered' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', buyer: 'collector@mail.com', amount: '₦210,000', commission: '₦25,200', date: 'Apr 3', status: 'framing' },
  { id: 103, title: 'Pale Signal', artist: 'Kenn Ola', buyer: 'fan@music.ng', amount: '₦88,000', commission: '₦10,560', date: 'Mar 28', status: 'delivered' },
]
const USERS = [
  { id: 1, name: 'Dr Yusuf', email: 'dr.yusuf@email.com', role: 'collector', joined: 'Feb 2025', spent: '₦850K', status: 'active' },
  { id: 2, name: 'SOLIS', email: 'solis@music.com', role: 'artist', joined: 'Jan 2025', spent: '—', status: 'verified' },
  { id: 3, name: 'Adaeze C.', email: 'adaeze@mail.com', role: 'collector', joined: 'Mar 2025', spent: '₦1.9M', status: 'active' },
  { id: 4, name: 'suspicious_99', email: 'sus@random.com', role: 'collector', joined: 'Apr 2025', spent: '₦0', status: 'flagged' },
]

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState<Tab>('pending')
  const [approved, setApproved] = useState<number[]>([])
  const [rejected, setRejected] = useState<number[]>([])
  const [rejectNotes, setRejectNotes] = useState<Record<number, string>>({})
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else setPwError(true)
  }

  if (!authed) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', border: '1px solid var(--c-rule2)', marginBottom: '20px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-ink3)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          </div>
          <p className="f-label" style={{ marginBottom: '6px', color: 'var(--c-live)' }}>Restricted Access</p>
          <h1 className="f-display" style={{ fontSize: '36px', color: 'var(--c-ink)' }}>Admin Panel</h1>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Admin Password</p>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwError(false) }} placeholder="Enter password" className="input" autoFocus style={{ borderColor: pwError ? 'var(--c-live)' : 'var(--c-rule2)' }} />
            {pwError && <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-live)', marginTop: '6px' }}>Incorrect password.</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>Authenticate</button>
        </form>
        <button onClick={() => navigate('/')} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>← Back to COVR</button>
      </div>
    </main>
  )

  const tabs: { key: Tab; label: string; alert?: number }[] = [
    { key: 'pending', label: 'Pending', alert: PENDING.length - approved.length - rejected.length },
    { key: 'listings', label: 'Listings' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'users', label: 'Users' },
    { key: 'analytics', label: 'Analytics' },
  ]

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ padding: '40px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '4px', color: 'var(--c-live)', fontSize: '9px' }}>● Admin — Authenticated</p>
              <h1 className="f-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--c-ink)' }}>Dashboard</h1>
            </div>
            <button onClick={() => setAuthed(false)} className="btn btn-outline btn-sm" style={{ color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Sign Out</button>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1px', background: 'var(--c-rule)', marginBottom: '24px' }}>
            {[
              { l: 'Pending Review', v: String(PENDING.length - approved.length - rejected.length), alert: true },
              { l: 'Live Drops', v: '3' }, { l: 'Revenue', v: '₦938K' },
              { l: 'Platform Fees', v: '₦112K' }, { l: 'Active Bidders', v: '48' },
            ].map(s => (
              <div key={s.l} style={{ background: 'var(--c-bg)', padding: '16px 20px' }}>
                <p className="f-label" style={{ fontSize: '7px', marginBottom: '4px', color: s.alert ? 'var(--c-live)' : 'var(--c-ink3)' }}>{s.l}</p>
                <p className="f-display" style={{ fontSize: '22px', color: s.alert ? 'var(--c-live)' : 'var(--c-gold)' }}>{s.v}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} className={'tab-btn' + (tab === t.key ? ' active' : '')}>
                {t.label}
                {t.alert && t.alert > 0 && (
                  <span style={{ marginLeft: '6px', background: 'var(--c-live)', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontFamily: 'DM Mono, monospace' }}>{t.alert}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container section">
        {/* PENDING */}
        {tab === 'pending' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PENDING.map(item => {
              const isApproved = approved.includes(item.id)
              const isRejected = rejected.includes(item.id)
              return (
                <div key={item.id} style={{ border: '1px solid', borderColor: isApproved ? 'rgba(45,106,79,0.4)' : isRejected ? 'rgba(192,57,43,0.3)' : 'var(--c-rule)', background: isApproved ? 'rgba(45,106,79,0.03)' : isRejected ? 'rgba(192,57,43,0.03)' : 'var(--c-bg)', padding: '20px 24px', opacity: isApproved || isRejected ? 0.7 : 1, transition: 'all 0.3s' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'start' }}>
                    <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid var(--c-rule)', flexShrink: 0 }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink)' }}>{item.artist}</p>
                        <span className="badge badge-ink" style={{ fontSize: '7px', padding: '2px 7px' }}>{item.artistType}</span>
                        <span className="badge badge-gold" style={{ fontSize: '7px', padding: '2px 7px' }}>{item.edition}</span>
                        <span className="f-label" style={{ fontSize: '8px', color: 'var(--c-ink3)' }}>{item.submitted}</span>
                      </div>
                      <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '8px' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6, marginBottom: '12px' }}>{item.notes}</p>
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {[
                          { l: 'Min Listeners', met: item.listeners >= 5000 },
                          { l: 'Quality >80', met: item.quality >= 80 },
                          { l: 'Verification', met: item.artistType === 'label' || item.listeners > 10000 },
                        ].map(c => (
                          <span key={c.l} className={`badge ${c.met ? 'badge-green' : 'badge-live'}`} style={{ fontSize: '7px' }}>
                            {c.met ? '✓' : '✗'} {c.l}
                          </span>
                        ))}
                        <span className="f-label" style={{ fontSize: '8px', color: 'var(--c-ink3)' }}>Quality Score: {item.quality}/100</span>
                      </div>
                      {!isApproved && !isRejected && (
                        <div style={{ marginTop: '12px' }}>
                          <input value={rejectNotes[item.id] || ''} onChange={e => setRejectNotes(n => ({ ...n, [item.id]: e.target.value }))} placeholder="Rejection reason (if rejecting)..." className="input" style={{ fontSize: '12px', padding: '8px 12px' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                      {isApproved ? (
                        <span className="badge badge-green" style={{ fontSize: '8px' }}>✓ Approved</span>
                      ) : isRejected ? (
                        <span className="badge badge-live" style={{ fontSize: '8px' }}>✗ Rejected</span>
                      ) : (
                        <>
                          <button onClick={() => setApproved(p => [...p, item.id])} className="btn btn-primary btn-sm" style={{ justifyContent: 'center', fontSize: '9px' }}>Approve</button>
                          <button onClick={() => setRejected(p => [...p, item.id])} className="btn btn-outline btn-sm" style={{ justifyContent: 'center', fontSize: '9px', color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* LISTINGS */}
        {tab === 'listings' && (
          <div style={{ border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '16px', padding: '12px 20px', background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
              {['Artwork', 'Status', 'Top Bid', 'Ends In', ''].map(h => <p key={h} className="f-label" style={{ fontSize: '8px' }}>{h}</p>)}
            </div>
            {LISTINGS.map((l, i) => (
              <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '16px', alignItems: 'center', padding: '16px 20px', background: 'var(--c-bg)', borderBottom: i < LISTINGS.length - 1 ? '1px solid var(--c-rule)' : 'none' }}>
                <div>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{l.artist}</p>
                  <p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{l.title}</p>
                </div>
                <span className={`badge ${l.status === 'live' ? 'badge-live' : 'badge-ink'}`} style={{ fontSize: '8px' }}>
                  {l.status === 'live' && <span className="live-dot" />}{l.status === 'live' ? 'Live' : 'Upcoming'}
                </span>
                <div>
                  <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>{l.bids} bids</p>
                  <p className="f-display gold" style={{ fontSize: '16px' }}>{l.currentBid}</p>
                </div>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink3)' }}>{l.endsIn}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-outline btn-sm" style={{ fontSize: '8px', padding: '6px 12px' }}>Edit</button>
                  <button className="btn btn-outline btn-sm" style={{ fontSize: '8px', padding: '6px 12px', color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRANSACTIONS */}
        {tab === 'transactions' && (
          <div style={{ border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '12px', padding: '12px 20px', background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
              {['Artwork', 'Buyer', 'Amount', 'Fee Earned', 'Date', 'Status'].map(h => <p key={h} className="f-label" style={{ fontSize: '8px' }}>{h}</p>)}
            </div>
            {TRANSACTIONS.map((tx, i) => (
              <div key={tx.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '12px', alignItems: 'center', padding: '16px 20px', background: 'var(--c-bg)', borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--c-rule)' : 'none' }}>
                <div>
                  <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{tx.title}</p>
                  <p className="f-label" style={{ fontSize: '7px' }}>{tx.artist}</p>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>{tx.buyer}</p>
                <p className="f-display gold" style={{ fontSize: '16px' }}>{tx.amount}</p>
                <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-green)' }}>{tx.commission}</p>
                <p className="f-label" style={{ fontSize: '8px' }}>{tx.date}</p>
                <span className={`badge ${tx.status === 'delivered' ? 'badge-green' : 'badge-ink'}`} style={{ fontSize: '7px' }}>{tx.status === 'delivered' ? 'Delivered' : 'Framing'}</span>
              </div>
            ))}
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div style={{ border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '12px', padding: '12px 20px', background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
              {['Name', 'Email', 'Role', 'Joined', 'Spent', 'Status'].map(h => <p key={h} className="f-label" style={{ fontSize: '8px' }}>{h}</p>)}
            </div>
            {USERS.map((u, i) => (
              <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '12px', alignItems: 'center', padding: '14px 20px', background: u.status === 'flagged' ? 'rgba(192,57,43,0.03)' : 'var(--c-bg)', borderBottom: i < USERS.length - 1 ? '1px solid var(--c-rule)' : 'none' }}>
                <p style={{ fontSize: '14px', color: 'var(--c-ink)', fontWeight: 400 }}>{u.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>{u.email}</p>
                <span className={`badge ${u.role === 'artist' ? 'badge-gold' : 'badge-ink'}`} style={{ fontSize: '7px' }}>{u.role}</span>
                <p className="f-label" style={{ fontSize: '8px' }}>{u.joined}</p>
                <p className="f-display" style={{ fontSize: '15px', color: 'var(--c-ink)' }}>{u.spent}</p>
                <span className={`badge ${u.status === 'flagged' ? 'badge-live' : u.status === 'verified' ? 'badge-green' : 'badge-ink'}`} style={{ fontSize: '7px' }}>{u.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {tab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '20px' }}>Monthly Revenue</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[{ l: 'April 2025', v: '₦938,000', pct: 100 }, { l: 'March 2025', v: '₦620,000', pct: 66 }, { l: 'February 2025', v: '₦410,000', pct: 44 }, { l: 'January 2025', v: '₦185,000', pct: 20 }].map(r => (
                  <div key={r.l}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="f-label" style={{ fontSize: '9px' }}>{r.l}</span>
                      <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{r.v}</p>
                    </div>
                    <div className="prog-bar"><div className="prog-fill" style={{ width: r.pct + '%' }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="f-label" style={{ marginBottom: '20px' }}>Top Performing Drops</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                {[{ title: 'Neon Residue', artist: 'SOLIS', amount: '₦640,000', bids: 22 }, { title: 'Invisible Cities', artist: 'SOLIS', amount: '₦520,000', bids: 14 }, { title: 'Coastal Static', artist: 'Amara', amount: '₦210,000', bids: 8 }].map((d, i) => (
                  <div key={d.title} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', background: 'var(--c-bg)' }}>
                    <p className="f-display gold" style={{ fontSize: '20px', minWidth: '24px' }}>#{i + 1}</p>
                    <div style={{ flex: 1 }}>
                      <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{d.title}</p>
                      <p className="f-label" style={{ fontSize: '8px' }}>{d.artist} · {d.bids} bids</p>
                    </div>
                    <p className="f-display gold" style={{ fontSize: '16px' }}>{d.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
