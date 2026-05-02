import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS, PAST_DROPS } from '../data'
import Countdown from '../components/Countdown'

type Tab = 'live' | 'upcoming' | 'past'

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
          {([['live', 'Live Drops'], ['upcoming', 'Upcoming'], ['past', 'Past Sales']] as [Tab, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)} className={'tab-btn' + (tab === t ? ' active' : '')}>
              {t === 'live' && tab === 'live' && <span className="live-pulse inline-block mr-2" style={{ verticalAlign: 'middle' }} />}
              {label}
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
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)' }} />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Live · {drop.bids} bids</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.edition}</span>
                  </div>
                </div>
                <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{drop.artist} — {drop.album}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--off-white)', marginBottom: '16px' }}>{drop.title}</h3>
                  <div className="flex items-end justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                    <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p>
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
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'brightness(0.45) saturate(0.3)' }} loading="lazy" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" style={{ stroke: 'var(--gold)' }} /></svg>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.dropsIn}</span>
                    <span className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{drop.releaseDate}</span>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{drop.artist}</p>
                    <span className="font-label" style={{ fontSize: '8px', color: drop.artistType === 'label' ? 'var(--gold)' : 'var(--sub)', padding: '2px 6px', border: '1px solid', borderColor: drop.artistType === 'label' ? 'var(--gold)' : 'var(--rule)' }}>{drop.artistType === 'label' ? 'Label' : 'Indie'}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)', marginBottom: '10px' }}>{drop.title}</h3>
                  <button className="btn btn-ghost w-full justify-center" style={{ fontSize: '9px', padding: '8px 0' }}>Notify Me</button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tab === 'past' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PAST_DROPS.map(drop => (
              <div key={drop.id} className="art-card" style={{ opacity: 0.75 }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover" style={{ filter: 'grayscale(70%)' }} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 55%)' }} />
                  <div className="absolute top-4 left-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--sub)' }}>Sold</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.edition}</span>
                  </div>
                </div>
                <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{drop.artist} · {drop.date}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '12px' }}>{drop.title}</h3>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                    <div><p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>Final Sale</p><p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px' }}>{drop.soldFor}</p></div>
                    <div className="text-right"><p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>Won by</p><p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--body)', fontWeight: 300 }}>{drop.buyer}</p></div>
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