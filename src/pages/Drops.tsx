import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS, PAST_DROPS } from '../data'
import LiveCard from '../components/LiveCard'

type Tab = 'live' | 'upcoming' | 'past'

export default function Drops() {
  const [tab, setTab] = useState<Tab>('live')
  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg)' }}>
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '0' }}>
          <p className="f-label" style={{ marginBottom: '8px' }}>Marketplace</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'var(--c-ink)', marginBottom: '32px' }}>Drops</h1>
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            {([['live', 'Live Drops'], ['upcoming', 'Upcoming'], ['past', 'Past Sales']] as [Tab, string][]).map(([t, l]) => (
              <button key={t} onClick={() => setTab(t)} className={'tab-btn' + (tab === t ? ' active' : '')}>
                {t === 'live' && <span className="live-dot" style={{ marginRight: '6px' }} />}{l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container section">
        {tab === 'live' && (
          <div className="grid-3">
            {LIVE_DROPS.map((drop, i) => <LiveCard key={drop.id} drop={drop} delay={(i % 3) + 1} />)}
          </div>
        )}
        {tab === 'upcoming' && (
          <div className="grid-4">
            {UPCOMING_DROPS.map((drop, i) => (
              <Link to={`/artwork/${drop.id}`} key={drop.id} className="card" style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                  <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.3) brightness(0.55)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold2)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <span className="f-label" style={{ color: 'var(--c-gold3)', fontSize: '10px' }}>{drop.dropsIn}</span>
                    <span className="f-label" style={{ color: 'rgba(244,243,238,0.4)', fontSize: '8px' }}>{drop.releaseDate}</span>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p className="f-label" style={{ fontSize: '8px' }}>{drop.artist}</p>
                    <span className="badge badge-gold" style={{ fontSize: '8px', padding: '2px 7px' }}>{drop.edition}</span>
                  </div>
                  <h3 className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)', marginBottom: '12px' }}>{drop.title}</h3>
                  <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Notify Me</button>
                </div>
              </Link>
            ))}
          </div>
        )}
        {tab === 'past' && (
          <div className="grid-3">
            {PAST_DROPS.map(drop => (
              <div key={drop.id} className="card" style={{ opacity: 0.8 }}>
                <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                  <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.7)' }} loading="lazy" />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge badge-ink">Sold</span>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{drop.artist} Â· {drop.date}</p>
                  <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '16px' }}>{drop.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--c-rule)' }}>
                    <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Final Sale</p><p className="f-display gold" style={{ fontSize: '18px' }}>{drop.soldFor}</p></div>
                    <div style={{ textAlign: 'right' }}><p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Won by</p><p style={{ fontSize: '13px', color: 'var(--c-ink3)' }}>{drop.buyer}</p></div>
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

