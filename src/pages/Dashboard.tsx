import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'

type Tab = 'bids' | 'collection' | 'watchlist' | 'orders' | 'wallet' | 'settings'

const BIDS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', album: 'Meridian', image: LIVE_DROPS[0].image, myBid: 550000, currentBid: 580000, status: 'outbid', endsIn: '2h 34m' },
  { id: 2, title: 'Still Water', artist: 'Amara', album: 'Periphery', image: LIVE_DROPS[1].image, myBid: 185000, currentBid: 185000, status: 'winning', endsIn: '6h 12m' },
]

const COLLECTION = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80', paidFor: '₦640,000', date: 'Apr 10, 2025', deliveryStatus: 'shipped', tracking: 'DHL9342871650' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80', paidFor: '₦210,000', date: 'Apr 3, 2025', deliveryStatus: 'framing', tracking: null },
]

const WATCHLIST = [
  { id: 4, title: 'Afterglow', artist: 'SOLIS', image: UPCOMING_DROPS[0].image, dropsIn: '2 days' },
  { id: 5, title: 'Far Field', artist: 'Dessa M.', image: UPCOMING_DROPS[1].image, dropsIn: '4 days' },
]

const ORDERS = [
  {
    id: 101, title: 'Neon Residue', artist: 'SOLIS',
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80',
    paidFor: '₦640,000', wonAt: 'Apr 10, 2025',
    tracking: 'DHL9342871650',
    address: '14 Adeola Odeku Street, Victoria Island, Lagos',
    stages: [
      { label: 'Payment Collected', date: 'Apr 11', done: true },
      { label: 'Approved for Print', date: 'Apr 11', done: true },
      { label: 'Printed & Framed', date: 'Apr 13', done: true },
      { label: 'Shipped', date: 'Apr 14', done: true },
      { label: 'Delivered', date: 'Pending', done: false },
    ]
  },
  {
    id: 102, title: 'Coastal Static', artist: 'Amara',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80',
    paidFor: '₦210,000', wonAt: 'Apr 3, 2025',
    tracking: null,
    address: '7 Aminu Kano Crescent, Wuse 2, Abuja',
    stages: [
      { label: 'Payment Collected', date: 'Apr 4', done: true },
      { label: 'Approved for Print', date: 'Apr 4', done: true },
      { label: 'Printed & Framed', date: 'In progress', done: false },
      { label: 'Shipped', date: 'Pending', done: false },
      { label: 'Delivered', date: 'Pending', done: false },
    ]
  },
]

const TXNS = [
  { type: 'Bid Win', desc: 'Neon Residue — SOLIS', amount: '-₦640,000', date: 'Apr 10', positive: false },
  { type: 'Deposit', desc: 'Paystack Top-up', amount: '+₦1,000,000', date: 'Apr 8', positive: true },
  { type: 'Bid Win', desc: 'Coastal Static — Amara', amount: '-₦210,000', date: 'Apr 3', positive: false },
  { type: 'Bid Hold', desc: 'Invisible Cities — SOLIS (active bid)', amount: '-₦550,000', date: 'Today', positive: false },
]

const STATUS_LABELS: Record<string, string> = { payment: 'Awaiting Payment', framing: 'Printing & Framing', shipped: 'Shipped', delivered: 'Delivered' }
const STATUS_COLORS: Record<string, string> = { payment: 'var(--c-live)', framing: 'var(--c-gold)', shipped: 'var(--c-ink)', delivered: 'var(--c-green)' }

function fmt(n: number) { return '₦' + n.toLocaleString() }

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('bids')
  const [name, setName] = useState('Dr Yusuf')
  const [email, setEmail] = useState('dr.yusuf@email.com')
  const [rebidModal, setRebidModal] = useState<typeof BIDS[0] | null>(null)
  const [rebidAmt, setRebidAmt] = useState('')
  const [rebidDone, setRebidDone] = useState(false)
  const [bidAmounts, setBidAmounts] = useState<Record<number, number>>(
    Object.fromEntries(BIDS.map(b => [b.id, b.currentBid]))
  )

  const tabs: { key: Tab; label: string }[] = [
    { key: 'bids', label: 'My Bids' }, { key: 'collection', label: 'Collection' },
    { key: 'watchlist', label: 'Watchlist' }, { key: 'orders', label: 'Orders & Delivery' },
    { key: 'wallet', label: 'Wallet' }, { key: 'settings', label: 'Settings' },
  ]

  const handleRebid = () => {
    if (!rebidModal || !rebidAmt) return
    const newAmt = Number(rebidAmt)
    setBidAmounts(prev => ({ ...prev, [rebidModal.id]: newAmt }))
    setRebidDone(true)
    setTimeout(() => { setRebidModal(null); setRebidDone(false); setRebidAmt('') }, 2000)
  }

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ padding: '40px 24px 0' }}>
          <p className="f-label" style={{ marginBottom: '6px' }}>Account</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)', marginBottom: '20px' }}>{name}</h1>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[{ l: 'Pieces Owned', v: '2' }, { l: 'Active Bids', v: '2' }, { l: 'Total Spent', v: '₦850K' }, { l: 'Rank', v: '#1' }].map(s => (
              <div key={s.l}>
                <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>{s.l}</p>
                <p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{s.v}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {tabs.map(t => <button key={t.key} onClick={() => setTab(t.key)} className={'tab-btn' + (tab === t.key ? ' active' : '')}>{t.label}</button>)}
          </div>
        </div>
      </div>

      <div className="container section">

        {/* MY BIDS */}
        {tab === 'bids' && (
          <div>
            <p className="f-label" style={{ marginBottom: '20px' }}>Active Bids</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
              {BIDS.map(bid => {
                const currentBid = bidAmounts[bid.id]
                const isWinning = currentBid === bid.myBid
                const minRebid = currentBid + 5000
                return (
                  <div key={bid.id} style={{ background: 'var(--c-bg)', padding: '20px 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'center' }}>
                      <img src={bid.image} alt={bid.title} style={{ width: '64px', height: '64px', objectFit: 'cover', border: '1px solid var(--c-rule)', flexShrink: 0 }} />
                      <div>
                        <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{bid.artist} — {bid.album}</p>
                        <p className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '10px' }}>{bid.title}</p>
                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                          <div>
                            <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Your Bid</p>
                            <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink3)' }}>{fmt(bid.myBid)}</p>
                          </div>
                          <div>
                            <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Current Highest</p>
                            <p className="f-display" style={{ fontSize: '18px', color: isWinning ? 'var(--c-green)' : 'var(--c-live)' }}>{fmt(currentBid)}</p>
                          </div>
                          <div>
                            <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Ends In</p>
                            <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink3)' }}>{bid.endsIn}</p>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
                        <span className={`badge ${isWinning ? 'badge-green' : 'badge-live'}`}>{isWinning ? '✓ Winning' : 'Outbid'}</span>
                        {!isWinning && (
                          <button onClick={() => { setRebidModal(bid); setRebidAmt(String(minRebid)) }} className="btn btn-primary btn-sm" style={{ justifyContent: 'center', fontSize: '9px' }}>
                            Rebid — Min {fmt(minRebid)}
                          </button>
                        )}
                        <Link to={`/artwork/${bid.id}`} className="btn btn-outline btn-sm" style={{ fontSize: '9px', justifyContent: 'center' }}>View Drop</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* COLLECTION */}
        {tab === 'collection' && (
          <div>
            <p className="f-label" style={{ marginBottom: '20px' }}>Owned Artworks</p>
            <div className="grid-3">
              {COLLECTION.map(item => (
                <div key={item.id} className="card">
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      <span className="badge" style={{ fontSize: '7px', color: STATUS_COLORS[item.deliveryStatus], borderColor: STATUS_COLORS[item.deliveryStatus] + '44', background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)' }}>
                        {STATUS_LABELS[item.deliveryStatus]}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '18px' }}>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{item.artist} · {item.date}</p>
                    <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '12px' }}>{item.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--c-rule)', alignItems: 'flex-end' }}>
                      <div>
                        <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Paid</p>
                        <p className="f-display gold" style={{ fontSize: '16px' }}>{item.paidFor}</p>
                      </div>
                      {item.tracking && (
                        <div style={{ textAlign: 'right' }}>
                          <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Tracking</p>
                          <p style={{ fontSize: '11px', color: 'var(--c-ink)', fontFamily: 'DM Mono, monospace' }}>{item.tracking}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WATCHLIST */}
        {tab === 'watchlist' && (
          <div>
            <p className="f-label" style={{ marginBottom: '20px' }}>Saved Drops</p>
            <div className="grid-4">
              {WATCHLIST.map(item => (
                <Link to={`/artwork/${item.id}`} key={item.id} className="card" style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.3) brightness(0.55)' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="f-label" style={{ color: 'var(--c-gold3)', fontSize: '10px' }}>{item.dropsIn}</span>
                    </div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{item.artist}</p>
                    <h3 className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS & DELIVERY */}
        {tab === 'orders' && (
          <div>
            <p className="f-label" style={{ marginBottom: '20px' }}>Delivery Tracking</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ORDERS.map(order => (
                <div key={order.id} style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg)', overflow: 'hidden' }}>
                  {/* Order header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
                    <img src={order.image} alt={order.title} style={{ width: '56px', height: '56px', objectFit: 'cover', border: '1px solid var(--c-rule)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{order.artist} · Won {order.wonAt}</p>
                      <p className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)' }}>{order.title}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Paid</p>
                      <p className="f-display gold" style={{ fontSize: '18px' }}>{order.paidFor}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--c-rule)' }}>
                    {/* Timeline */}
                    <div style={{ background: 'var(--c-bg)', padding: '20px 24px' }}>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '16px' }}>Fulfillment Status</p>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {order.stages.map((stage, i, arr) => (
                          <div key={stage.label} style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', flexShrink: 0, marginTop: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: stage.done ? 'var(--c-green)' : 'var(--c-bg)', borderColor: stage.done ? 'var(--c-green)' : 'var(--c-rule2)', transition: 'all 0.3s' }}>
                                {stage.done && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                              </div>
                              {i < arr.length - 1 && <div style={{ width: '1px', flex: 1, background: stage.done ? 'var(--c-green)' : 'var(--c-rule)', margin: '2px 0', minHeight: '16px' }} />}
                            </div>
                            <div style={{ paddingBottom: i < arr.length - 1 ? '14px' : '0' }}>
                              <p style={{ fontSize: '13px', color: stage.done ? 'var(--c-ink)' : 'var(--c-ink3)', fontWeight: stage.done ? 400 : 300 }}>{stage.label}</p>
                              <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{stage.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery info */}
                    <div style={{ background: 'var(--c-bg)', padding: '20px 24px' }}>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '16px' }}>Shipping Details</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <p className="f-label" style={{ fontSize: '8px', minWidth: '60px', color: 'var(--c-ink3)' }}>Address</p>
                          <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 300, lineHeight: 1.5 }}>{order.address}</p>
                        </div>
                        {order.tracking && (
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <p className="f-label" style={{ fontSize: '8px', minWidth: '60px', color: 'var(--c-ink3)' }}>Tracking</p>
                            <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontFamily: 'DM Mono, monospace' }}>{order.tracking}</p>
                          </div>
                        )}
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <p className="f-label" style={{ fontSize: '8px', minWidth: '60px', color: 'var(--c-ink3)' }}>Frame</p>
                          <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 300 }}>Museum-grade archival · UV glass · A2 giclée</p>
                        </div>
                      </div>
                      {order.tracking && (
                        <a href={`https://www.dhl.com/track/${order.tracking}`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ justifyContent: 'center', width: '100%', fontSize: '9px' }}>
                          Track Shipment →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WALLET */}
        {tab === 'wallet' && (
          <div style={{ maxWidth: '640px' }}>
            <p className="f-label" style={{ marginBottom: '20px' }}>Wallet & Payments</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--c-rule)', marginBottom: '24px' }}>
              <div style={{ background: 'var(--c-bg2)', padding: '24px' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>Available Balance</p>
                <p className="f-display gold" style={{ fontSize: '32px' }}>₦150,000</p>
              </div>
              <div style={{ background: 'var(--c-bg2)', padding: '24px' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>In Escrow (Active Bids)</p>
                <p className="f-display" style={{ fontSize: '32px', color: 'var(--c-ink)' }}>₦550,000</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
              <button className="btn btn-primary">Top Up via Paystack</button>
              <button className="btn btn-outline">Withdraw</button>
            </div>
            <p className="f-label" style={{ marginBottom: '12px' }}>Transaction History</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
              {TXNS.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--c-bg)' }}>
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{tx.type} · {tx.date}</p>
                    <p style={{ fontSize: '14px', color: 'var(--c-ink)', fontWeight: 300 }}>{tx.desc}</p>
                  </div>
                  <p className="f-display" style={{ fontSize: '18px', color: tx.positive ? 'var(--c-green)' : 'var(--c-ink)' }}>{tx.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div style={{ maxWidth: '480px' }}>
            <p className="f-label" style={{ marginBottom: '20px' }}>Account Settings</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Full Name</p><input value={name} onChange={e => setName(e.target.value)} className="input" /></div>
              <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Email Address</p><input value={email} onChange={e => setEmail(e.target.value)} className="input" /></div>
              <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>New Password</p><input type="password" placeholder="Leave blank to keep current" className="input" /></div>
              <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                <button className="btn btn-primary">Save Changes</button>
                <button className="btn btn-ghost" style={{ color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* REBID MODAL */}
      {rebidModal && (
        <div className="modal-bg" onClick={() => { setRebidModal(null); setRebidDone(false); setRebidAmt('') }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ padding: '0', overflow: 'hidden' }}>
            {rebidDone ? (
              <div style={{ padding: '48px 36px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(45,106,79,0.1)', border: '1px solid rgba(45,106,79,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 className="f-display" style={{ fontSize: '28px', color: 'var(--c-ink)', marginBottom: '8px' }}>Bid Updated</h3>
                <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300 }}>
                  Your bid of <strong>{fmt(Number(rebidAmt))}</strong> is now the highest.
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{rebidModal.artist}</p>
                    <h3 className="f-display" style={{ fontSize: '22px', color: 'var(--c-ink)' }}>{rebidModal.title}</h3>
                  </div>
                  <button onClick={() => setRebidModal(null)} style={{ background: 'none', border: 'none', fontSize: '22px', color: 'var(--c-ink3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>
                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Status banner */}
                  <div style={{ padding: '14px 16px', background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="live-dot" />
                    <p style={{ fontSize: '13px', color: 'var(--c-live)', fontWeight: 300 }}>
                      You were outbid. Current highest is <strong>{fmt(bidAmounts[rebidModal.id])}</strong>
                    </p>
                  </div>

                  {/* Quick bids */}
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '10px' }}>Quick Bid</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                      {[bidAmounts[rebidModal.id] + 5000, bidAmounts[rebidModal.id] + 25000, bidAmounts[rebidModal.id] + 50000].map(amt => (
                        <button key={amt} onClick={() => setRebidAmt(String(amt))} className="btn btn-outline btn-sm"
                          style={{ justifyContent: 'center', fontSize: '10px', borderColor: Number(rebidAmt) === amt ? 'var(--c-gold)' : 'var(--c-rule2)', color: Number(rebidAmt) === amt ? 'var(--c-gold)' : 'var(--c-ink3)' }}>
                          {fmt(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Custom Amount (₦)</p>
                    <input type="number" value={rebidAmt} onChange={e => setRebidAmt(e.target.value)}
                      placeholder={`Min. ${fmt(bidAmounts[rebidModal.id] + 5000)}`} className="input"
                      style={{ fontSize: '18px', padding: '14px 16px' }} />
                    {rebidAmt && Number(rebidAmt) <= bidAmounts[rebidModal.id] && (
                      <p style={{ fontSize: '11px', color: 'var(--c-live)', marginTop: '6px', fontWeight: 300 }}>Must be above {fmt(bidAmounts[rebidModal.id])}</p>
                    )}
                    {rebidAmt && Number(rebidAmt) > bidAmounts[rebidModal.id] && (
                      <p style={{ fontSize: '11px', color: 'var(--c-green)', marginTop: '6px', fontWeight: 300 }}>✓ You will become the highest bidder</p>
                    )}
                  </div>

                  <button onClick={handleRebid} className="btn btn-primary"
                    style={{ justifyContent: 'center', padding: '15px', opacity: (rebidAmt && Number(rebidAmt) > bidAmounts[rebidModal.id]) ? 1 : 0.4 }}>
                    {rebidAmt && Number(rebidAmt) > bidAmounts[rebidModal.id] ? `Confirm Rebid — ${fmt(Number(rebidAmt))}` : 'Enter a valid amount'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
