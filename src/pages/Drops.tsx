import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import Countdown from '../components/Countdown'

type Tab = 'live' | 'upcoming' | 'past'
const PAST = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=600&q=80', soldFor: '640,000', edition: '1 of 1', date: 'Apr 10, 2025' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&q=80', soldFor: '210,000', edition: 'Ed. 1/5', date: 'Apr 3, 2025' },
  { id: 103, title: 'Pale Signal', artist: 'Kenn Ola', image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&q=80', soldFor: '88,000', edition: '1 of 1', date: 'Mar 28, 2025' },
]

export default function Drops() {
  const [tab, setTab] = useState<Tab>('live')
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="label mb-4" style={{ fontSize: '9px' }}>Marketplace</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 90px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>Drops</h1>
      </div>
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex">
          {(['live', 'upcoming', 'past'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} className="font-label py-5 px-8 relative" style={{ fontSize: '9px', color: tab === t ? 'var(--off-white)' : 'var(--sub)', background: 'none', border: 'none', cursor: 'pointer', borderBottom: tab === t ? '1px solid var(--gold)' : '1px solid transparent', marginBottom: '-1px' }}>
              {t === 'live' ? 'Live Drops' : t === 'upcoming' ? 'Upcoming' : 'Past Sales'}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {tab === 'live' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIVE_DROPS.map(drop => (
              <Link to={"/artwork/" + drop.id} key={drop.id} className="art-card group" style={{ textDecoration: 'none' }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 55%)' }} />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Live</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.edition}</span>
                  </div>
                </div>
                <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{drop.artist}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--off-white)', marginBottom: '16px' }}>{drop.title}</h3>
                  <div className="flex items-end justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                    <div>
                      <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p>
                      <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px' }}>{drop.currentBid}</p>
                    </div>
                    <Countdown initial={drop.endsIn} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {tab === 'upcoming' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UPCOMING_DROPS.map(drop => (
              <Link to={"/artwork/" + drop.id} key={drop.id} className="art-card group" style={{ textDecoration: 'none' }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'brightness(0.5) saturate(0.4)' }} loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.dropsIn}</span>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--muted)' }}>{drop.artist}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{drop.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
        {tab === 'past' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAST.map(drop => (
              <div key={drop.id} className="art-card" style={{ opacity: 0.7 }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover" style={{ filter: 'grayscale(60%)' }} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)' }} />
                  <div className="absolute top-4 left-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--sub)' }}>Sold</span>
                  </div>
                </div>
                <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{drop.artist}  {drop.date}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '12px' }}>{drop.title}</h3>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>Final Sale</span>
                    <span className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px' }}>{drop.soldFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
