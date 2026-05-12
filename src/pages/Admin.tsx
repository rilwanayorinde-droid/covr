import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = 'COVR@Admin2025'

type AdminTab = 'pending' | 'listings' | 'deliveries' | 'transactions' | 'users' | 'analytics'

const PENDING = [
  { id: 1, title: 'Solar Drift', artist: 'Neon Folklore', artistType: 'independent', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80', submitted: '2 hours ago', edition: '1 of 1', notes: 'Single cover for upcoming Afrobeats release. Monthly listeners: 42K. DistroKid verified.', listeners: 42000, quality: 85 },
  { id: 2, title: 'Amber Wave', artist: 'Kemi Osei', artistType: 'label', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', submitted: '5 hours ago', edition: 'Ed. 1/3', notes: 'Limited edition album artwork. Label: Afrowave Records. ISRC provided.', listeners: 89000, quality: 92 },
  { id: 3, title: 'Frequency', artist: 'REMA Arts', artistType: 'independent', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80', submitted: '1 day ago', edition: '1 of 1', notes: 'Cover art for surprise drop. Low listener count — borderline.', listeners: 4200, quality: 71 },
]

const DELIVERIES = [
  {
    id: 1, orderId: 'COVR-2025-001', title: 'Neon Residue', artist: 'SOLIS',
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=200&q=80',
    finalBid: '₦640,000', wonAt: 'Apr 10, 2025 14:32',
    buyer: { name: 'Dr Yusuf Rilwan', phone: '+234 803 456 7890', email: 'dr.yusuf@email.com', address: '14 Adeola Odeku Street', city: 'Victoria Island', state: 'Lagos', country: 'Nigeria', postalCode: '101241', notes: 'Call before delivery. Gate requires security clearance.' },
    stage: 'shipped', trackingNo: 'DHL9342871650',
    timeline: [
      { label: 'Payment Collected', date: 'Apr 11, 2025', done: true },
      { label: 'Artwork Approved for Print', date: 'Apr 11, 2025', done: true },
      { label: 'Printed & Framed', date: 'Apr 13, 2025', done: true },
      { label: 'Shipped', date: 'Apr 14, 2025', done: true },
      { label: 'Delivered', date: 'Pending', done: false },
    ]
  },
  {
    id: 2, orderId: 'COVR-2025-002', title: 'Coastal Static', artist: 'Amara',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&q=80',
    finalBid: '₦210,000', wonAt: 'Apr 3, 2025 09:15',
    buyer: { name: 'Adaeze Chukwu', phone: '+234 812 345 6789', email: 'adaeze@mail.com', address: '7 Aminu Kano Crescent, Wuse 2', city: 'Abuja', state: 'FCT', country: 'Nigeria', postalCode: '900288', notes: '' },
    stage: 'framing', trackingNo: null,
    timeline: [
      { label: 'Payment Collected', date: 'Apr 4, 2025', done: true },
      { label: 'Artwork Approved for Print', date: 'Apr 4, 2025', done: true },
      { label: 'Printed & Framed', date: 'In progress', done: false },
      { label: 'Shipped', date: 'Pending', done: false },
      { label: 'Delivered', date: 'Pending', done: false },
    ]
  },
  {
    id: 3, orderId: 'COVR-2025-003', title: 'Invisible Cities', artist: 'SOLIS',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&q=80',
    finalBid: '₦520,000', wonAt: 'May 7, 2025 18:41',
    buyer: { name: 'Tunde Bakare', phone: '+234 901 234 5678', email: 'tunde@music.ng', address: '22 Bourdillon Road, Ikoyi', city: 'Lagos', state: 'Lagos', country: 'Nigeria', postalCode: '101233', notes: 'Apartment 4B, 2nd floor' },
    stage: 'payment', trackingNo: null,
    timeline: [
      { label: 'Payment Collected', date: 'Pending', done: false },
      { label: 'Artwork Approved for Print', date: 'Pending', done: false },
      { label: 'Printed & Framed', date: 'Pending', done: false },
      { label: 'Shipped', date: 'Pending', done: false },
      { label: 'Delivered', date: 'Pending', done: false },
    ]
  },
]

const LISTINGS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', status: 'ended', currentBid: '₦520,000', bids: 14, endsIn: 'Ended' },
  { id: 2, title: 'Still Water', artist: 'Amara', status: 'live', currentBid: '₦185,000', bids: 6, endsIn: '7h 14m' },
  { id: 3, title: 'Drift', artist: 'Kenn Ola', status: 'live', currentBid: '₦74,000', bids: 3, endsIn: '14h 2m' },
  { id: 4, title: 'Afterglow', artist: 'SOLIS', status: 'upcoming', currentBid: '—', bids: 0, endsIn: '2 days' },
]

const TRANSACTIONS = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', buyer: 'dr.yusuf@email.com', amount: '₦640,000', commission: '₦76,800', date: 'Apr 10', status: 'delivered' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', buyer: 'adaeze@mail.com', amount: '₦210,000', commission: '₦25,200', date: 'Apr 3', status: 'framing' },
  { id: 103, title: 'Invisible Cities', artist: 'SOLIS', buyer: 'tunde@music.ng', amount: '₦520,000', commission: '₦62,400', date: 'May 7', status: 'payment' },
]

const STAGE_LABELS: Record<string, string> = { payment: 'Awaiting Payment', framing: 'Printing & Framing', shipped: 'Shipped', delivered: 'Delivered' }
const STAGE_COLORS: Record<string, string> = { payment: 'var(--c-live)', framing: 'var(--c-gold)', shipped: 'var(--c-ink)', delivered: 'var(--c-green)' }

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab] = useState<AdminTab>('deliveries')
  const [approved, setApproved] = useState<number[]>([])
  const [rejected, setRejected] = useState<number[]>([])
  const [expandedDelivery, setExpandedDelivery] = useState<number | null>(1)
  const [deliveryStages, setDeliveryStages] = useState<Record<number, string>>(
    Object.fromEntries(DELIVERIES.map(d => [d.id, d.stage]))
  )
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else setPwError(true)
  }

  const advanceStage = (id: number) => {
    const stages = ['payment', 'framing', 'shipped', 'delivered']
    const current = deliveryStages[id]
    const idx = stages.indexOf(current)
    if (idx < stages.length - 1) {
      setDeliveryStages(prev => ({ ...prev, [id]: stages[idx + 1] }))
    }
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

  const tabs: { key: AdminTab; label: string; alert?: number }[] = [
    { key: 'pending', label: 'Pending Approval', alert: PENDING.length - approved.length - rejected.length },
    { key: 'listings', label: 'Listings' },
    { key: 'deliveries', label: 'Deliveries', alert: DELIVERIES.filter(d => deliveryStages[d.id] !== 'delivered').length },
    { key: 'transactions', label: 'Transactions' },
    { key: 'users', label: 'Analytics' },
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
              { l: 'Pending Approval', v: String(PENDING.length - approved.length - rejected.length), alert: true },
              { l: 'Active Deliveries', v: String(DELIVERIES.filter(d => deliveryStages[d.id] !== 'delivered').length), alert: true },
              { l: 'Revenue', v: '₦1.37M' },
              { l: 'Platform Fees', v: '₦164K' },
              { l: 'Live Drops', v: '2' },
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

        {/* DELIVERIES TAB */}
        {tab === 'deliveries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
              <p className="f-label" style={{ fontSize: '9px' }}>All Delivery Orders</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {Object.entries(STAGE_LABELS).map(([k, v]) => (
                  <span key={k} className="badge" style={{ fontSize: '7px', color: STAGE_COLORS[k], borderColor: STAGE_COLORS[k] + '44', background: STAGE_COLORS[k] + '0D' }}>{v}</span>
                ))}
              </div>
            </div>

            {DELIVERIES.map(delivery => {
              const currentStage = deliveryStages[delivery.id]
              const isExpanded = expandedDelivery === delivery.id
              const isDelivered = currentStage === 'delivered'

              return (
                <div key={delivery.id} style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg)', overflow: 'hidden' }}>
                  {/* Order header */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '16px', alignItems: 'center', padding: '18px 22px', cursor: 'pointer', background: isExpanded ? 'var(--c-bg2)' : 'var(--c-bg)' }}
                    onClick={() => setExpandedDelivery(isExpanded ? null : delivery.id)}>
                    <img src={delivery.image} alt={delivery.title} style={{ width: '52px', height: '52px', objectFit: 'cover', border: '1px solid var(--c-rule)' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                        <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-ink3)' }}>{delivery.orderId}</p>
                        <span style={{ fontSize: '7px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid', color: STAGE_COLORS[currentStage], borderColor: STAGE_COLORS[currentStage] + '55', background: STAGE_COLORS[currentStage] + '0D' }}>
                          {STAGE_LABELS[currentStage]}
                        </span>
                      </div>
                      <p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{delivery.title} — {delivery.artist}</p>
                      <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '1px' }}>{delivery.buyer.name} · {delivery.buyer.city}, {delivery.buyer.country} · Won {delivery.wonAt}</p>
                    </div>
                    <p className="f-display gold" style={{ fontSize: '18px' }}>{delivery.finalBid}</p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-ink3)" strokeWidth="2" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {/* Expanded delivery detail */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid var(--c-rule)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--c-rule)' }}>

                        {/* Delivery address */}
                        <div style={{ background: 'var(--c-bg)', padding: '22px 24px' }}>
                          <p className="f-label" style={{ fontSize: '8px', marginBottom: '16px' }}>Delivery Address</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                              { l: 'Recipient', v: delivery.buyer.name },
                              { l: 'Phone', v: delivery.buyer.phone },
                              { l: 'Email', v: delivery.buyer.email },
                              { l: 'Address', v: delivery.buyer.address },
                              { l: 'City / State', v: `${delivery.buyer.city}, ${delivery.buyer.state}` },
                              { l: 'Country', v: delivery.buyer.country },
                              ...(delivery.buyer.postalCode ? [{ l: 'Postal Code', v: delivery.buyer.postalCode }] : []),
                              ...(delivery.buyer.notes ? [{ l: 'Notes', v: delivery.buyer.notes }] : []),
                            ].map(r => (
                              <div key={r.l} style={{ display: 'flex', gap: '12px' }}>
                                <p className="f-label" style={{ fontSize: '8px', minWidth: '80px', color: 'var(--c-ink3)', flexShrink: 0 }}>{r.l}</p>
                                <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 300, lineHeight: 1.5 }}>{r.v}</p>
                              </div>
                            ))}
                          </div>
                          {/* Copy address button */}
                          <button
                            onClick={() => navigator.clipboard?.writeText(`${delivery.buyer.name}\n${delivery.buyer.phone}\n${delivery.buyer.address}\n${delivery.buyer.city}, ${delivery.buyer.state} ${delivery.buyer.postalCode}\n${delivery.buyer.country}${delivery.buyer.notes ? '\nNotes: ' + delivery.buyer.notes : ''}`)}
                            className="btn btn-outline btn-sm"
                            style={{ marginTop: '16px', fontSize: '8px', justifyContent: 'center', width: '100%' }}>
                            Copy Address to Clipboard
                          </button>
                        </div>

                        {/* Delivery timeline + actions */}
                        <div style={{ background: 'var(--c-bg)', padding: '22px 24px' }}>
                          <p className="f-label" style={{ fontSize: '8px', marginBottom: '16px' }}>Fulfillment Timeline</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '20px' }}>
                            {delivery.timeline.map((stage, i, arr) => {
                              const stageOrder = ['payment', 'framing', 'shipped', 'delivered']
                              const currentIdx = stageOrder.indexOf(currentStage)
                              const isDone = i <= currentIdx
                              const isActive = i === currentIdx + 1

                              return (
                                <div key={stage.label} style={{ display: 'flex', gap: '12px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', flexShrink: 0, marginTop: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDone ? 'var(--c-green)' : isActive ? 'var(--c-bg)' : 'var(--c-bg2)', borderColor: isDone ? 'var(--c-green)' : isActive ? 'var(--c-gold)' : 'var(--c-rule2)', transition: 'all 0.3s' }}>
                                      {isDone && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                                    </div>
                                    {i < arr.length - 1 && <div style={{ width: '1px', flex: 1, background: isDone ? 'var(--c-green)' : 'var(--c-rule)', margin: '2px 0', minHeight: '16px', transition: 'all 0.3s' }} />}
                                  </div>
                                  <div style={{ paddingBottom: i < arr.length - 1 ? '14px' : '0' }}>
                                    <p style={{ fontSize: '13px', color: isDone ? 'var(--c-ink)' : 'var(--c-ink3)', fontWeight: isDone ? 400 : 300 }}>{stage.label}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{stage.date}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* Tracking */}
                          {delivery.trackingNo && (
                            <div style={{ padding: '12px 14px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <p className="f-label" style={{ fontSize: '8px' }}>Tracking Number</p>
                              <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontFamily: 'DM Mono, monospace', fontWeight: 500 }}>{delivery.trackingNo}</p>
                            </div>
                          )}

                          {/* Advance stage button */}
                          {!isDelivered && (
                            <button onClick={() => advanceStage(delivery.id)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '10px', padding: '12px' }}>
                              Mark as: {STAGE_LABELS[['payment', 'framing', 'shipped', 'delivered'][['payment', 'framing', 'shipped', 'delivered'].indexOf(currentStage) + 1]] || 'Delivered'}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                          )}
                          {isDelivered && (
                            <div style={{ padding: '12px 16px', background: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                              <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-green)' }}>Delivered Successfully</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Print address shortcut */}
                      <div style={{ padding: '14px 22px', borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                        <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>
                          Ship via DHL / GIG Logistics / GIGL to the address above.
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-outline btn-sm" style={{ fontSize: '8px' }}>Print Shipping Label</button>
                          <button className="btn btn-outline btn-sm" style={{ fontSize: '8px' }}>Email Buyer</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* PENDING TAB */}
        {tab === 'pending' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PENDING.map(item => {
              const isApproved = approved.includes(item.id)
              const isRejected = rejected.includes(item.id)
              return (
                <div key={item.id} style={{ border: '1px solid', borderColor: isApproved ? 'rgba(45,106,79,0.4)' : isRejected ? 'rgba(192,57,43,0.3)' : 'var(--c-rule)', background: 'var(--c-bg)', padding: '20px 24px', opacity: isApproved || isRejected ? 0.7 : 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'start' }}>
                    <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid var(--c-rule)' }} />
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink)' }}>{item.artist}</p>
                        <span className="badge badge-ink" style={{ fontSize: '7px', padding: '2px 7px' }}>{item.artistType}</span>
                        <span className="badge badge-gold" style={{ fontSize: '7px', padding: '2px 7px' }}>{item.edition}</span>
                        <span className="f-label" style={{ fontSize: '8px', color: 'var(--c-ink3)' }}>{item.submitted}</span>
                      </div>
                      <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '8px' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6, marginBottom: '12px' }}>{item.notes}</p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {[{ l: 'Min Listeners', met: item.listeners >= 5000 }, { l: 'Quality >80', met: item.quality >= 80 }, { l: 'Verification', met: item.artistType === 'label' || item.listeners > 10000 }].map(c => (
                          <span key={c.l} className={`badge ${c.met ? 'badge-green' : 'badge-live'}`} style={{ fontSize: '7px' }}>{c.met ? '✓' : '✗'} {c.l}</span>
                        ))}
                        <span className="f-label" style={{ fontSize: '8px', color: 'var(--c-ink3)' }}>Quality: {item.quality}/100</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                      {isApproved ? <span className="badge badge-green" style={{ fontSize: '8px' }}>✓ Approved</span>
                        : isRejected ? <span className="badge badge-live" style={{ fontSize: '8px' }}>✗ Rejected</span>
                          : <>
                            <button onClick={() => setApproved(p => [...p, item.id])} className="btn btn-primary btn-sm" style={{ justifyContent: 'center', fontSize: '9px' }}>Approve</button>
                            <button onClick={() => setRejected(p => [...p, item.id])} className="btn btn-outline btn-sm" style={{ justifyContent: 'center', fontSize: '9px', color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Reject</button>
                          </>}
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
                <span className={`badge ${l.status === 'live' ? 'badge-live' : l.status === 'ended' ? 'badge-ink' : 'badge-gold'}`} style={{ fontSize: '8px' }}>
                  {l.status === 'live' && <span className="live-dot" />}
                  {l.status === 'live' ? 'Live' : l.status === 'ended' ? 'Ended' : 'Upcoming'}
                </span>
                <p className="f-display gold" style={{ fontSize: '16px' }}>{l.currentBid}</p>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink3)' }}>{l.endsIn}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-outline btn-sm" style={{ fontSize: '8px', padding: '6px 12px' }}>Edit</button>
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
                <div><p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{tx.title}</p><p className="f-label" style={{ fontSize: '7px' }}>{tx.artist}</p></div>
                <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>{tx.buyer}</p>
                <p className="f-display gold" style={{ fontSize: '16px' }}>{tx.amount}</p>
                <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-green)' }}>{tx.commission}</p>
                <p className="f-label" style={{ fontSize: '8px' }}>{tx.date}</p>
                <span className={`badge ${tx.status === 'delivered' ? 'badge-green' : tx.status === 'payment' ? 'badge-live' : 'badge-gold'}`} style={{ fontSize: '7px' }}>{STAGE_LABELS[tx.status]}</span>
              </div>
            ))}
          </div>
        )}

        {/* ANALYTICS */}
        {tab === 'users' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '20px' }}>Monthly Revenue</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[{ l: 'May 2025', v: '₦520,000', pct: 55 }, { l: 'April 2025', v: '₦938,000', pct: 100 }, { l: 'March 2025', v: '₦620,000', pct: 66 }, { l: 'February 2025', v: '₦410,000', pct: 44 }].map(r => (
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
              <p className="f-label" style={{ marginBottom: '20px' }}>Delivery Performance</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                {[{ l: 'Avg. Delivery Time', v: '11 days' }, { l: 'On-Time Rate', v: '94%' }, { l: 'Total Shipped', v: '2 orders' }, { l: 'Pending Fulfillment', v: '1 order' }].map(s => (
                  <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--c-bg)' }}>
                    <p className="f-label" style={{ fontSize: '9px' }}>{s.l}</p>
                    <p className="f-display gold" style={{ fontSize: '18px' }}>{s.v}</p>
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
