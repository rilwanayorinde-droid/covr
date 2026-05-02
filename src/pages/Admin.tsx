import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ADMIN PASSWORD: COVR@Admin2025
const ADMIN_PASSWORD = 'COVR@Admin2025'

type AdminTab = 'pending' | 'listings' | 'transactions' | 'users' | 'analytics'

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
  { id: 1, name: 'Dr Yusuf', email: 'dr.yusuf@email.com', role: 'collector', joined: 'Feb 2025', bids: 8, spent: '₦850K', status: 'active' },
  { id: 2, name: 'SOLIS', email: 'solis@music.com', role: 'artist', joined: 'Jan 2025', bids: 0, spent: '—', status: 'verified' },
  { id: 3, name: 'Adaeze C.', email: 'adaeze@mail.com', role: 'collector', joined: 'Mar 2025', bids: 5, spent: '₦1.9M', status: 'active' },
  { id: 4, name: 'suspicious_99', email: 'sus@random.com', role: 'collector', joined: 'Apr 2025', bids: 12, spent: '₦0', status: 'flagged' },
]

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState<AdminTab>('pending')
  const [approved, setApproved] = useState<number[]>([])
  const [rejected, setRejected] = useState<number[]>([])
  const [rejectNote, setRejectNote] = useState<Record<number, string>>({})
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else { setPwError(true) }
  }

  if (!authed) return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '0 24px' }}>
        <div className="text-center mb-10">
          <p className="label justify-center mb-4" style={{ fontSize: '9px', color: 'var(--live)' }}>Restricted Access</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '48px', color: 'var(--off-white)' }}>Admin Panel</h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Admin Password</p>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwError(false) }} placeholder="Enter admin password" className="input-field" style={{ borderColor: pwError ? 'var(--live)' : 'var(--rule-2)' }} autoFocus />
            {pwError && <p className="font-label mt-2" style={{ fontSize: '9px', color: 'var(--live)' }}>Incorrect password. Access denied.</p>}
          </div>
          <button type="submit" className="btn btn-gold w-full justify-center mt-2">Authenticate</button>
        </form>
        <button onClick={() => navigate('/')} className="btn btn-ghost w-full justify-center mt-4" style={{ fontSize: '9px' }}>← Back to COVR</button>
      </div>
    </main>
  )

  const tabs: { key: AdminTab; label: string; alert?: number }[] = [
    { key: 'pending', label: 'Pending Approval', alert: PENDING.length - approved.length - rejected.length },
    { key: 'listings', label: 'Listings' },
    { key: 'transactions', label: 'Transactions' },
    { key: 'users', label: 'Users' },
    { key: 'analytics', label: 'Analytics' },
  ]

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="label mb-2" style={{ fontSize: '9px', color: 'var(--live)' }}>Admin Panel — Authenticated</p>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1, color: 'var(--off-white)' }}>Dashboard</h1>
            </div>
            <button onClick={() => setAuthed(false)} className="btn btn-ghost" style={{ fontSize: '9px', color: 'var(--live)', borderColor: 'var(--live)' }}>Sign Out</button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 mt-8" style={{ borderTop: '1px solid var(--rule)' }}>
            {[
              { label: 'Pending Review', value: String(PENDING.length - approved.length - rejected.length), alert: true },
              { label: 'Live Drops', value: '3' },
              { label: 'Total Revenue', value: '₦938K' },
              { label: 'Platform Fees', value: '₦112K' },
              { label: 'Active Bidders', value: '48' },
            ].map((s, i) => (
              <div key={s.label} className="py-5 pr-6" style={{ borderRight: i < 4 ? '1px solid var(--rule)' : 'none', paddingLeft: i > 0 ? '24px' : '0' }}>
                <p className="font-label mb-1" style={{ fontSize: '8px', color: s.alert ? 'var(--live)' : 'var(--sub)' }}>{s.label}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '26px', color: s.alert ? 'var(--live)' : 'var(--gold-pale)' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={'tab-btn' + (tab === t.key ? ' active' : '')}>
              {t.label}
              {t.alert && t.alert > 0 && (
                <span style={{ marginLeft: '8px', background: 'var(--live)', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontFamily: 'JetBrains Mono, monospace' }}>{t.alert}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* PENDING */}
        {tab === 'pending' && (
          <div className="flex flex-col gap-5">
            {PENDING.map(item => {
              const isApproved = approved.includes(item.id)
              const isRejected = rejected.includes(item.id)
              return (
                <div key={item.id} className="p-5" style={{ border: '1px solid', borderColor: isApproved ? 'var(--gold)' : isRejected ? 'var(--live)' : 'var(--rule)', background: 'var(--ink-2)', opacity: isApproved || isRejected ? 0.6 : 1, transition: 'all 0.3s' }}>
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    <div className="flex items-start gap-4">
                      <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--rule)' }} />
                      <div>
                        <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{item.artist} · {item.artistType}</p>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{item.title}</p>
                        <p className="font-label mt-1" style={{ fontSize: '8px', color: 'var(--muted)' }}>{item.edition} · {item.submitted}</p>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Artist Notes</p>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--body)', fontWeight: 300, lineHeight: 1.7, marginBottom: '12px' }}>{item.notes}</p>
                      {/* Quality checklist */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Min Listeners (5K)', met: item.listeners >= 5000 },
                          { label: 'Quality Score >80', met: item.quality >= 80 },
                          { label: 'Edition Valid', met: true },
                          { label: 'Distributor Verified', met: item.artistType === 'label' || item.listeners > 10000 },
                        ].map(c => (
                          <div key={c.label} className="flex items-center gap-2">
                            <span style={{ color: c.met ? '#34C759' : 'var(--live)', fontSize: '12px' }}>{c.met ? '✓' : '✗'}</span>
                            <span className="font-label" style={{ fontSize: '8px', color: c.met ? 'var(--body)' : 'var(--live)' }}>{c.label}</span>
                          </div>
                        ))}
                      </div>
                      {!isApproved && !isRejected && (
                        <div className="mt-4">
                          <p className="font-label mb-2" style={{ fontSize: '8px', color: 'var(--sub)' }}>Rejection Reason (if rejecting)</p>
                          <input value={rejectNote[item.id] || ''} onChange={e => setRejectNote(n => ({ ...n, [item.id]: e.target.value }))} placeholder="e.g. Listener count below minimum threshold" className="input-field" style={{ fontSize: '12px', padding: '10px 14px' }} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      {isApproved ? (
                        <span className="font-label text-center py-3" style={{ fontSize: '9px', color: 'var(--gold)', border: '1px solid var(--gold)' }}>✓ Approved — Goes Live</span>
                      ) : isRejected ? (
                        <div>
                          <span className="font-label text-center py-3 block" style={{ fontSize: '9px', color: 'var(--live)', border: '1px solid var(--live)' }}>✗ Rejected</span>
                          {rejectNote[item.id] && <p className="font-label mt-2" style={{ fontSize: '8px', color: 'var(--muted)' }}>Reason: {rejectNote[item.id]}</p>}
                        </div>
                      ) : (
                        <>
                          <button onClick={() => setApproved(p => [...p, item.id])} className="btn btn-gold w-full justify-center" style={{ fontSize: '9px' }}>Approve & List</button>
                          <button onClick={() => setRejected(p => [...p, item.id])} className="btn btn-ghost w-full justify-center" style={{ fontSize: '9px', color: 'var(--live)', borderColor: 'var(--live)' }}>Reject</button>
                          <p className="font-label text-center" style={{ fontSize: '8px', color: 'var(--muted)' }}>Quality: {item.quality}/100</p>
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
          <div className="flex flex-col gap-3">
            {LISTINGS.map(l => (
              <div key={l.id} className="grid md:grid-cols-5 gap-4 items-center p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <div className="md:col-span-2">
                  <p className="font-label mb-0.5" style={{ fontSize: '8px', color: 'var(--sub)' }}>{l.artist}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{l.title}</p>
                </div>
                <div>
                  <span className="font-label px-3 py-1.5 inline-flex items-center gap-2" style={{ fontSize: '9px', color: l.status === 'live' ? '#FF3B30' : 'var(--sub)', border: '1px solid', borderColor: l.status === 'live' ? '#FF3B30' : 'var(--rule-2)' }}>
                    {l.status === 'live' && <span className="live-pulse" />}{l.status === 'live' ? 'Live' : 'Upcoming'}
                  </span>
                </div>
                <div>
                  <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{l.bids} bids · {l.endsIn}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--gold-pale)' }}>{l.currentBid}</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <button className="btn btn-ghost" style={{ fontSize: '9px', padding: '8px 14px' }}>Edit</button>
                  <button className="btn btn-ghost" style={{ fontSize: '9px', padding: '8px 14px', color: 'var(--live)', borderColor: 'var(--live)' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TRANSACTIONS */}
        {tab === 'transactions' && (
          <div style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
            <div className="grid grid-cols-6 gap-4 px-5 py-3" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-3)' }}>
              {['Artwork', 'Buyer', 'Sale Amount', 'Platform Fee', 'Date', 'Status'].map(h => <p key={h} className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{h}</p>)}
            </div>
            {TRANSACTIONS.map((tx, i) => (
              <div key={tx.id} className="grid grid-cols-6 gap-4 items-center px-5 py-4" style={{ borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--rule)' : 'none', background: 'var(--ink-2)' }}>
                <div><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '17px', color: 'var(--off-white)' }}>{tx.title}</p><p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{tx.artist}</p></div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'var(--body)', fontWeight: 300 }}>{tx.buyer}</p>
                <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '17px' }}>{tx.amount}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '17px', color: '#34C759' }}>{tx.commission}</p>
                <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{tx.date}</p>
                <span className="font-label" style={{ fontSize: '8px', color: tx.status === 'delivered' ? 'var(--gold-pale)' : 'var(--sub)', padding: '3px 8px', border: '1px solid', borderColor: tx.status === 'delivered' ? 'var(--gold)' : 'var(--rule-2)', display: 'inline-block' }}>{tx.status === 'delivered' ? 'Delivered' : 'Framing'}</span>
              </div>
            ))}
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
            <div className="grid grid-cols-6 gap-4 px-5 py-3" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-3)' }}>
              {['User', 'Email', 'Role', 'Joined', 'Activity', 'Status'].map(h => <p key={h} className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{h}</p>)}
            </div>
            {USERS.map((u, i) => (
              <div key={u.id} className="grid grid-cols-6 gap-4 items-center px-5 py-4" style={{ borderBottom: i < USERS.length - 1 ? '1px solid var(--rule)' : 'none', background: u.status === 'flagged' ? 'rgba(255,59,48,0.05)' : 'var(--ink-2)' }}>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--off-white)', fontWeight: 400 }}>{u.name}</p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{u.email}</p>
                <span className="font-label" style={{ fontSize: '8px', color: u.role === 'artist' ? 'var(--gold)' : 'var(--sub)', padding: '3px 8px', border: '1px solid', borderColor: u.role === 'artist' ? 'var(--gold)' : 'var(--rule-2)', display: 'inline-block' }}>{u.role}</span>
                <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{u.joined}</p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'var(--body)', fontWeight: 300 }}>{u.bids} bids · {u.spent}</p>
                <span className="font-label" style={{ fontSize: '8px', color: u.status === 'flagged' ? 'var(--live)' : u.status === 'verified' ? '#34C759' : 'var(--sub)', padding: '3px 8px', border: '1px solid', borderColor: u.status === 'flagged' ? 'var(--live)' : u.status === 'verified' ? '#34C759' : 'var(--rule-2)', display: 'inline-block' }}>{u.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {tab === 'analytics' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="label mb-6" style={{ fontSize: '9px' }}>Revenue Overview</p>
              <div className="flex flex-col gap-3">
                {[{ label: 'April 2025', value: '₦938,000', pct: 100 }, { label: 'March 2025', value: '₦620,000', pct: 66 }, { label: 'February 2025', value: '₦410,000', pct: 44 }, { label: 'January 2025', value: '₦185,000', pct: 20 }].map(r => (
                  <div key={r.label}>
                    <div className="flex justify-between mb-2">
                      <span className="font-label" style={{ fontSize: '9px', color: 'var(--sub)' }}>{r.label}</span>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{r.value}</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: r.pct + '%' }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="label mb-6" style={{ fontSize: '9px' }}>Top Performing Drops</p>
              <div className="flex flex-col gap-3">
                {[{ title: 'Neon Residue', artist: 'SOLIS', amount: '₦640,000', bids: 22 }, { title: 'Invisible Cities', artist: 'SOLIS', amount: '₦520,000', bids: 14 }, { title: 'Coastal Static', artist: 'Amara', amount: '₦210,000', bids: 8 }].map((d, i) => (
                  <div key={d.title} className="flex items-center gap-4 p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--gold)', minWidth: '28px' }}>#{i + 1}</span>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{d.title}</p>
                      <p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{d.artist} · {d.bids} bids</p>
                    </div>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{d.amount}</p>
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
