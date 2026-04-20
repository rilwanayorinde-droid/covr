import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'

type Tab = 'bids' | 'collection' | 'watchlist' | 'settings'
const BIDS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', image: LIVE_DROPS[0].image, myBid: '550,000', currentBid: '580,000', status: 'outbid', endsIn: '2h 34m' },
  { id: 2, title: 'Still Water', artist: 'Amara', image: LIVE_DROPS[1].image, myBid: '185,000', currentBid: '185,000', status: 'winning', endsIn: '6h 12m' },
]
const COLLECTION = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80', paidFor: '640,000', date: 'Apr 10, 2025', delivered: true },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&q=80', paidFor: '210,000', date: 'Apr 3, 2025', delivered: false },
]
const WATCHLIST = [
  { id: 4, title: 'Afterglow', artist: 'SOLIS', image: UPCOMING_DROPS[0].image, dropsIn: '2 days' },
  { id: 5, title: 'Far Field', artist: 'Dessa M.', image: UPCOMING_DROPS[1].image, dropsIn: '4 days' },
]

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('bids')
  const [name, setName] = useState('Dr Yusuf')
  const [email, setEmail] = useState('dr.yusuf@email.com')
  const tabs: { key: Tab; label: string }[] = [{ key: 'bids', label: 'My Bids' }, { key: 'collection', label: 'Collection' }, { key: 'watchlist', label: 'Watchlist' }, { key: 'settings', label: 'Settings' }]
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
          <p className="label mb-3" style={{ fontSize: '9px' }}>Account</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, color: 'var(--off-white)' }}>{name}</h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className="font-label py-4 px-6" style={{ fontSize: '9px', color: tab === t.key ? 'var(--off-white)' : 'var(--sub)', background: 'none', border: 'none', cursor: 'pointer', borderBottom: tab === t.key ? '1px solid var(--gold)' : '1px solid transparent', marginBottom: '-1px' }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {tab === 'bids' && (
          <div className="flex flex-col gap-4">
            <p className="label mb-4" style={{ fontSize: '9px' }}>Active Bids</p>
            {BIDS.map(bid => (
              <div key={bid.id} className="grid md:grid-cols-4 gap-6 items-center p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <div className="flex items-center gap-4">
                  <img src={bid.image} alt={bid.title} style={{ width: '64px', height: '64px', objectFit: 'cover', flexShrink: 0 }} />
                  <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{bid.artist}</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{bid.title}</p></div>
                </div>
                <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Your Bid</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)' }}>{bid.myBid}</p></div>
                <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: bid.status === 'winning' ? 'var(--gold-pale)' : '#FF3B30' }}>{bid.currentBid}</p></div>
                <div className="flex items-center justify-between">
                  <span className="font-label" style={{ fontSize: '9px', color: bid.status === 'winning' ? 'var(--gold-pale)' : '#FF3B30', padding: '4px 10px', border: '1px solid', borderColor: bid.status === 'winning' ? 'var(--gold)' : '#FF3B30' }}>{bid.status === 'winning' ? 'Winning' : 'Outbid'}</span>
                  <Link to={"/artwork/" + bid.id} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '9px' }}>Bid Again</Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'collection' && (
          <div>
            <p className="label mb-8" style={{ fontSize: '9px' }}>Owned Artworks</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {COLLECTION.map(item => (
                <div key={item.id} className="art-card">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)' }}>
                      <span className="font-label" style={{ fontSize: '9px', color: item.delivered ? 'var(--gold-pale)' : 'var(--sub)' }}>{item.delivered ? 'Delivered' : 'In Transit'}</span>
                    </div>
                  </div>
                  <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{item.artist}  {item.date}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '12px' }}>{item.title}</h3>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                      <span className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>Paid</span>
                      <span className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{item.paidFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'watchlist' && (
          <div>
            <p className="label mb-8" style={{ fontSize: '9px' }}>Saved Drops</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WATCHLIST.map(item => (
                <Link to={"/artwork/" + item.id} key={item.id} className="art-card group" style={{ textDecoration: 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'brightness(0.5) saturate(0.4)' }} loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{item.dropsIn}</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--muted)' }}>{item.artist}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {tab === 'settings' && (
          <div className="max-w-xl">
            <p className="label mb-8" style={{ fontSize: '9px' }}>Account Settings</p>
            <div className="flex flex-col gap-6">
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Full Name</p><input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', background: 'var(--ink-2)', border: '1px solid var(--rule-2)', padding: '14px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--off-white)', outline: 'none', fontWeight: 300 }} /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Email Address</p><input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', background: 'var(--ink-2)', border: '1px solid var(--rule-2)', padding: '14px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--off-white)', outline: 'none', fontWeight: 300 }} /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Password</p><input type="password" placeholder="New password..." style={{ width: '100%', background: 'var(--ink-2)', border: '1px solid var(--rule-2)', padding: '14px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--off-white)', outline: 'none', fontWeight: 300 }} /></div>
              <div className="flex gap-4 pt-4"><button className="btn btn-gold">Save Changes</button><button className="btn btn-ghost" style={{ color: '#FF3B30', borderColor: '#FF3B30' }}>Sign Out</button></div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
