import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'

type Tab = 'bids' | 'collection' | 'watchlist' | 'orders' | 'wallet' | 'settings'

const BIDS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', album: 'Meridian', image: LIVE_DROPS[0].image, myBid: '₦550,000', currentBid: '₦580,000', status: 'outbid', endsIn: '2h 34m' },
  { id: 2, title: 'Still Water', artist: 'Amara', album: 'Periphery', image: LIVE_DROPS[1].image, myBid: '₦185,000', currentBid: '₦185,000', status: 'winning', endsIn: '6h 12m' },
]
const COLLECTION = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80', paidFor: '₦640,000', date: 'Apr 10, 2025', deliveryStatus: 'delivered', tracking: 'DHL123456789' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80', paidFor: '₦210,000', date: 'Apr 3, 2025', deliveryStatus: 'framing', tracking: null },
]
const WATCHLIST = [
  { id: 4, title: 'Afterglow', artist: 'SOLIS', image: UPCOMING_DROPS[0].image, dropsIn: '2 days' },
  { id: 5, title: 'Far Field', artist: 'Dessa M.', image: UPCOMING_DROPS[1].image, dropsIn: '4 days' },
]
const ORDERS = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80', paidFor: '₦640,000', date: 'Apr 10, 2025', stages: ['Won', 'Payment Cleared', 'Approved for Print', 'Framed', 'Shipped', 'Delivered'], current: 5 },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80', paidFor: '₦210,000', date: 'Apr 3, 2025', stages: ['Won', 'Payment Cleared', 'Approved for Print', 'Framed', 'Shipped', 'Delivered'], current: 3 },
]
const TXNS = [
  { type: 'Bid Win', desc: 'Neon Residue — SOLIS', amount: '-₦640,000', date: 'Apr 10', positive: false },
  { type: 'Deposit', desc: 'Paystack Top-up', amount: '+₦1,000,000', date: 'Apr 8', positive: true },
  { type: 'Bid Win', desc: 'Coastal Static — Amara', amount: '-₦210,000', date: 'Apr 3', positive: false },
  { type: 'Bid Hold', desc: 'Invisible Cities — SOLIS', amount: '-₦550,000', date: 'Today', positive: false },
]

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('bids')
  const [name, setName] = useState('Dr Yusuf')
  const [email, setEmail] = useState('dr.yusuf@email.com')
  const tabs: { key: Tab; label: string }[] = [
    { key: 'bids', label: 'My Bids' }, { key: 'collection', label: 'Collection' },
    { key: 'watchlist', label: 'Watchlist' }, { key: 'orders', label: 'Orders' },
    { key: 'wallet', label: 'Wallet' }, { key: 'settings', label: 'Settings' },
  ]

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ padding: '40px 24px 0' }}>
          <p className="f-label" style={{ marginBottom: '6px' }}>Account</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)', marginBottom: '20px' }}>{name}</h1>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[{ l: 'Pieces Owned', v: '2' }, { l: 'Active Bids', v: '2' }, { l: 'Total Spent', v: '₦850K' }, { l: 'Collector Rank', v: '#1' }].map(s => (
              <div key={s.l}><p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>{s.l}</p><p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{s.v}</p></div>
            ))}
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '0' }}>
            {tabs.map(t => <button key={t.key} onClick={() => setTab(t.key)} className={'tab-btn' + (tab === t.key ? ' active' : '')}>{t.label}</button>)}
          </div>
        </div>
      </div>

      <div className="container section">
        {/* BIDS */}
        {tab === 'bids' && (
          <div>
            <p className="f-label" style={{ marginBottom: '20px' }}>Active Bids</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
              {BIDS.map(bid => (
                <div key={bid.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '20px', alignItems: 'center', padding: '20px 24px', background: 'var(--c-bg)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src={bid.image} alt={bid.title} style={{ width: '56px', height: '56px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--c-rule)' }} />
                    <div>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{bid.artist}</p>
                      <p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{bid.title}</p>
                    </div>
                  </div>
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Your Bid</p>
                    <p className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)' }}>{bid.myBid}</p>
                  </div>
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Current Bid</p>
                    <p className="f-display" style={{ fontSize: '18px', color: bid.status === 'winning' ? 'var(--c-gold)' : 'var(--c-live)' }}>{bid.currentBid}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge ${bid.status === 'winning' ? 'badge-gold' : 'badge-live'}`}>{bid.status === 'winning' ? 'Winning' : 'Outbid'}</span>
                    <Link to={`/artwork/${bid.id}`} className="btn btn-outline btn-sm">Rebid</Link>
                  </div>
                </div>
              ))}
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
                      <span className={`badge ${item.deliveryStatus === 'delivered' ? 'badge-green' : 'badge-ink'}`} style={{ background: 'rgba(250,250,247,0.95)' }}>
                        {item.deliveryStatus === 'delivered' ? 'Delivered' : 'Being Framed'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '18px' }}>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{item.artist} · {item.date}</p>
                    <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '12px' }}>{item.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--c-rule)' }}>
                      <div><p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Paid</p><p className="f-display gold" style={{ fontSize: '16px' }}>{item.paidFor}</p></div>
                      {item.tracking && <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-ink3)' }}>{item.tracking}</p>}
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

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <p className="f-label" style={{ marginBottom: '20px' }}>Delivery Tracking</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ORDERS.map(order => (
                <div key={order.id} style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg)', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                    <img src={order.image} alt={order.title} style={{ width: '56px', height: '56px', objectFit: 'cover', border: '1px solid var(--c-rule)' }} />
                    <div>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{order.artist} · {order.date}</p>
                      <p className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)' }}>{order.title}</p>
                      <p className="f-display gold" style={{ fontSize: '16px' }}>{order.paidFor}</p>
                    </div>
                  </div>
                  {/* Timeline */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', overflowX: 'auto' }}>
                    {order.stages.map((stage, i) => (
                      <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '80px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          {i > 0 && <div style={{ flex: 1, height: '1px', background: i <= order.current ? 'var(--c-gold)' : 'var(--c-rule)' }} />}
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0, border: '2px solid', borderColor: i <= order.current ? 'var(--c-gold)' : 'var(--c-rule2)', background: i <= order.current ? 'var(--c-gold)' : 'var(--c-bg)', transition: 'all 0.3s' }} />
                          {i < order.stages.length - 1 && <div style={{ flex: 1, height: '1px', background: i < order.current ? 'var(--c-gold)' : 'var(--c-rule)' }} />}
                        </div>
                        <p className="f-label" style={{ fontSize: '7px', marginTop: '6px', textAlign: 'center', color: i <= order.current ? 'var(--c-gold)' : 'var(--c-ink3)', lineHeight: 1.3 }}>{stage}</p>
                      </div>
                    ))}
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
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>In Escrow</p>
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
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>Notifications</p>
                {['Bid activity on my items', 'New drops from watched artists', 'Outbid alerts', 'Delivery updates'].map(p => (
                  <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--c-gold)', width: '14px', height: '14px' }} />
                    <span style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300 }}>{p}</span>
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                <button className="btn btn-primary">Save Changes</button>
                <button className="btn btn-ghost" style={{ color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
