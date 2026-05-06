import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import type { Drop, UpcomingDrop } from '../data'

type AnyDrop = (Drop & { status: 'live' }) | (UpcomingDrop & { status: 'upcoming'; currentBid: string; bids: number; live: boolean; album: string; endsIn: { h: number; m: number; s: number }; topBidder: string; reservePrice: string; story: string })

const ALL: AnyDrop[] = [
  ...LIVE_DROPS.map(d => ({ ...d, status: 'live' as const })),
  ...UPCOMING_DROPS.map(d => ({ ...d, status: 'upcoming' as const, currentBid: '', bids: 0, live: false, album: '', endsIn: { h: 0, m: 0, s: 0 }, topBidder: '', reservePrice: '', story: '' })),
]
const GENRES = ['All', 'Alternative R&B', 'Soul', 'Afropiano', 'Neo-soul', 'Electronic', 'Amapiano']

export default function Discover() {
  const [genre, setGenre] = useState('All')
  const [status, setStatus] = useState('All')
  const [q, setQ] = useState('')

  const filtered = ALL.filter(d => {
    const mg = genre === 'All' || d.genre === genre
    const ms = status === 'All' || (status === 'Live' ? d.status === 'live' : d.status === 'upcoming')
    const mq = d.title.toLowerCase().includes(q.toLowerCase()) || d.artist.toLowerCase().includes(q.toLowerCase())
    return mg && ms && mq
  })

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '24px' }}>
          <p className="f-label" style={{ marginBottom: '8px' }}>Browse</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'var(--c-ink)', marginBottom: '32px' }}>Discover</h1>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid var(--c-rule2)', padding: '10px 14px', flex: 1, minWidth: '180px', maxWidth: '300px', background: 'var(--c-bg)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-ink3)" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4-4" /></svg>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search artworks or artists..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: '13px', color: 'var(--c-ink)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, width: '100%' }} />
            </div>
            <select value={genre} onChange={e => setGenre(e.target.value)} style={{ border: '1px solid var(--c-rule2)', padding: '10px 14px', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-ink3)', background: 'var(--c-bg)', outline: 'none', cursor: 'pointer' }}>
              {GENRES.map(g => <option key={g} value={g}>{g === 'All' ? 'All Genres' : g}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['All', 'Live', 'Upcoming'].map(s => (
                <button key={s} onClick={() => setStatus(s)} className={`btn btn-sm ${status === s ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: '9px' }}>{s}</button>
              ))}
            </div>
            <p className="f-label" style={{ marginLeft: 'auto', fontSize: '9px' }}>{filtered.length} results</p>
          </div>
        </div>
      </div>

      <div className="container section">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h3 className="f-display" style={{ fontSize: '32px', color: 'var(--c-ink3)', marginBottom: '16px' }}>No artworks found</h3>
            <button onClick={() => { setQ(''); setGenre('All'); setStatus('All') }} className="btn btn-outline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid-4">
            {filtered.map((drop, i) => (
              <Link to={`/artwork/${drop.id}`} key={String(drop.id) + drop.status + i} className="card" style={{ textDecoration: 'none' }}>
                <div className="img-hover" style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                  <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: drop.status === 'upcoming' ? 'saturate(0.3) brightness(0.6)' : 'none' }} loading="lazy" />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {drop.status === 'live'
                      ? <span className="badge badge-live" style={{ background: 'rgba(250,250,247,0.94)', backdropFilter: 'blur(6px)', fontSize: '8px' }}><span className="live-dot" />Live</span>
                      : <span className="badge badge-ink" style={{ background: 'rgba(250,250,247,0.94)', backdropFilter: 'blur(6px)', fontSize: '8px' }}>Upcoming</span>
                    }
                  </div>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p className="f-label" style={{ fontSize: '8px' }}>{drop.artist}</p>
                    <span className="badge badge-gold" style={{ fontSize: '7px', padding: '2px 6px' }}>{drop.edition}</span>
                  </div>
                  <h3 className="f-display" style={{ fontSize: '17px', color: 'var(--c-ink)', marginBottom: '6px' }}>{drop.title}</h3>
                  {'currentBid' in drop && drop.currentBid && <p className="f-display gold" style={{ fontSize: '15px' }}>{drop.currentBid}</p>}
                  {'dropsIn' in drop && drop.dropsIn && <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold2)' }}>{drop.dropsIn}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
