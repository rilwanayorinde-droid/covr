import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'

type Tab = 'bids' | 'collection' | 'watchlist' | 'orders' | 'wallet' | 'settings'

const BIDS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', image: LIVE_DROPS[0].image, myBid: '₦550,000', currentBid: '₦580,000', status: 'outbid', endsIn: '2h 34m', album: 'Meridian' },
  { id: 2, title: 'Still Water', artist: 'Amara', image: LIVE_DROPS[1].image, myBid: '₦185,000', currentBid: '₦185,000', status: 'winning', endsIn: '6h 12m', album: 'Periphery' },
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
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80', paidFor: '₦640,000', date: 'Apr 10, 2025', stages: ['Won', 'Payment Cleared', 'Art Approved', 'Framed', 'Shipped', 'Delivered'], currentStage: 5 },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80', paidFor: '₦210,000', date: 'Apr 3, 2025', stages: ['Won', 'Payment Cleared', 'Art Approved', 'Framed', 'Shipped', 'Delivered'], currentStage: 3 },
]
const TRANSACTIONS = [
  { id: 1, type: 'Bid Win', desc: 'Neon Residue — SOLIS', amount: '-₦640,000', date: 'Apr 10' },
  { id: 2, type: 'Deposit', desc: 'Paystack Top-up', amount: '+₦1,000,000', date: 'Apr 8' },
  { id: 3, type: 'Bid Win', desc: 'Coastal Static — Amara', amount: '-₦210,000', date: 'Apr 3' },
  { id: 4, type: 'Bid Hold', desc: 'Invisible Cities — SOLIS', amount: '-₦550,000', date: 'Today' },
]

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('bids')
  const [name, setName] = useState('Dr Yusuf')
  const [email, setEmail] = useState('dr.yusuf@email.com')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'bids', label: 'My Bids' },
    { key: 'collection', label: 'Collection' },
    { key: 'watchlist', label: 'Watchlist' },
    { key: 'orders', label: 'Orders & Delivery' },
    { key: 'wallet', label: 'Wallet' },
    { key: 'settings', label: 'Settings' },
  ]

  const DELIVERY_LABELS: Record<string, string> = { delivered: 'Delivered', framing: 'Being Framed', shipped: 'Shipped', pending: 'Awaiting' }
  const DELIVERY_COLORS: Record<string, string> = { delivered: 'var(--gold-pale)', framing: 'var(--sub)', shipped: '#34C759', pending: 'var(--muted)' }

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
          <p className="label mb-3" style={{ fontSize: '9px' }}>Account</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, color: 'var(--off-white)' }}>{name}</h1>
          <div className="flex gap-6 mt-4">
            {[{ label: 'Pieces Owned', value: '2' }, { label: 'Active Bids', value: '2' }, { label: 'Total Spent', value: '₦850K' }, { label: 'Rank', value: '#1' }].map(s => (
              <div key={s.label}>
                <p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{s.label}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex overflow-x-auto">
          {tabs.map(t => <button key={t.key} onClick={() => setTab(t.key)} className={'tab-btn' + (tab === t.key ? ' active' : '')}>{t.label}</button>)}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* BIDS */}
        {tab === 'bids' && (
          <div>
            <p className="label mb-8" style={{ fontSize: '9px' }}>Active Bids</p>
            <div className="flex flex-col gap-4">
              {BIDS.map(bid => (
                <div key={bid.id} className="grid md:grid-cols-5 gap-6 items-center p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                  <div className="flex items-center gap-4 md:col-span-2">
                    <img src={bid.image} alt={bid.title} style={{ width: '64px', height: '64px', objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <p className="font-label mb-0.5" style={{ fontSize: '8px', color: 'var(--sub)' }}>{bid.artist} — {bid.album}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{bid.title}</p>
                    </div>
                  </div>
                  <div><p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>Your Bid</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{bid.myBid}</p></div>
                  <div><p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>Current Bid</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: bid.status === 'winning' ? 'var(--gold-pale)' : '#FF3B30' }}>{bid.currentBid}</p></div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-label" style={{ fontSize: '9px', color: bid.status === 'winning' ? 'var(--gold-pale)' : '#FF3B30', padding: '4px 10px', border: '1px solid', borderColor: bid.status === 'winning' ? 'var(--gold)' : '#FF3B30' }}>{bid.status === 'winning' ? 'Winning' : 'Outbid'}</span>
                    <Link to={"/artwork/" + bid.id} className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '9px' }}>Rebid</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLLECTION */}
        {tab === 'collection' && (
          <div>
            <p className="label mb-8" style={{ fontSize: '9px' }}>Owned Artworks</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {COLLECTION.map(item => (
                <div key={item.id} className="art-card">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)' }}>
                      <span className="font-label" style={{ fontSize: '9px', color: DELIVERY_COLORS[item.deliveryStatus] }}>{DELIVERY_LABELS[item.deliveryStatus]}</span>
                    </div>
                  </div>
                  <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{item.artist} · {item.date}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '12px' }}>{item.title}</h3>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                      <div><p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>Paid</p><p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{item.paidFor}</p></div>
                      {item.tracking && <p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{item.tracking}</p>}
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
            <p className="label mb-8" style={{ fontSize: '9px' }}>Saved Drops</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WATCHLIST.map(item => (
                <Link to={"/artwork/" + item.id} key={item.id} className="art-card group" style={{ textDecoration: 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'brightness(0.45) saturate(0.3)' }} loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{item.dropsIn}</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--muted)' }}>{item.artist}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <p className="label mb-8" style={{ fontSize: '9px' }}>Delivery Status</p>
            <div className="flex flex-col gap-8">
              {ORDERS.map(order => (
                <div key={order.id} className="p-6" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                  <div className="flex items-center gap-4 mb-8">
                    <img src={order.image} alt={order.title} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                    <div>
                      <p className="font-label mb-0.5" style={{ fontSize: '8px', color: 'var(--sub)' }}>{order.artist} · {order.date}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)' }}>{order.title}</p>
                      <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{order.paidFor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-0 overflow-x-auto">
                    {order.stages.map((stage, i) => (
                      <div key={stage} className="flex flex-col items-center min-w-[100px]">
                        <div className="flex items-center w-full">
                          {i > 0 && <div style={{ flex: 1, height: '1px', background: i <= order.currentStage ? 'var(--gold)' : 'var(--rule)' }} />}
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: i <= order.currentStage ? 'var(--gold)' : 'var(--rule-2)', border: '2px solid', borderColor: i <= order.currentStage ? 'var(--gold)' : 'var(--rule)', flexShrink: 0 }} />
                          {i < order.stages.length - 1 && <div style={{ flex: 1, height: '1px', background: i < order.currentStage ? 'var(--gold)' : 'var(--rule)' }} />}
                        </div>
                        <p className="font-label mt-2 text-center" style={{ fontSize: '7px', color: i <= order.currentStage ? 'var(--gold-pale)' : 'var(--muted)', paddingTop: '4px' }}>{stage}</p>
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
          <div className="max-w-2xl">
            <p className="label mb-8" style={{ fontSize: '9px' }}>Wallet & Payments</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-6" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Available Balance</p>
                <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px' }}>₦150,000</p>
              </div>
              <div className="p-6" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>In Escrow (Active Bids)</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', color: 'var(--off-white)' }}>₦550,000</p>
              </div>
            </div>
            <div className="flex gap-4 mb-10">
              <button className="btn btn-gold">Top Up via Paystack</button>
              <button className="btn btn-ghost">Withdraw Funds</button>
            </div>
            <p className="label mb-4" style={{ fontSize: '9px' }}>Transaction History</p>
            <div style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
              {TRANSACTIONS.map((tx, i) => (
                <div key={tx.id} className="flex items-center justify-between px-5 py-4" style={{ borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--rule)' : 'none', background: 'var(--ink-2)' }}>
                  <div>
                    <p className="font-label mb-0.5" style={{ fontSize: '8px', color: 'var(--sub)' }}>{tx.type} · {tx.date}</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--off-white)', fontWeight: 300 }}>{tx.desc}</p>
                  </div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: tx.amount.startsWith('+') ? '#34C759' : 'var(--off-white)' }}>{tx.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div className="max-w-xl">
            <p className="label mb-8" style={{ fontSize: '9px' }}>Account Settings</p>
            <div className="flex flex-col gap-6">
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Full Name</p><input value={name} onChange={e => setName(e.target.value)} className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Email Address</p><input value={email} onChange={e => setEmail(e.target.value)} className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>New Password</p><input type="password" placeholder="Leave blank to keep current" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Notification Preferences</p>
                <div className="flex flex-col gap-3">
                  {['Bid activity on my items', 'New drops from watched artists', 'Outbid alerts', 'Delivery updates'].map(pref => (
                    <label key={pref} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked style={{ accentColor: 'var(--gold)' }} />
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--body)', fontWeight: 300 }}>{pref}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button className="btn btn-gold">Save Changes</button>
                <button className="btn btn-ghost" style={{ color: '#FF3B30', borderColor: '#FF3B30' }}>Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}