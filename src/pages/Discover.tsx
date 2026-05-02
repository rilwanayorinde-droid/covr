import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import type { Drop, UpcomingDrop } from '../data'

type AnyDrop = (Drop & { status: 'live' }) | (UpcomingDrop & { status: 'upcoming'; currentBid: string; bids: number; live: boolean; album: string; endsIn: { h: number; m: number; s: number }; topBidder: string; reservePrice: string; story: string; spotifyUrl?: string })

const ALL: AnyDrop[] = [
  ...LIVE_DROPS.map(d => ({ ...d, status: 'live' as const })),
  ...UPCOMING_DROPS.map(d => ({ ...d, status: 'upcoming' as const, currentBid: '', bids: 0, live: false, album: '', endsIn: { h: 0, m: 0, s: 0 }, topBidder: '', reservePrice: '', story: '' })),
]

const GENRES = ['All', 'Alternative R&B', 'Soul', 'Afropiano', 'Neo-soul', 'Electronic', 'Amapiano']
const STATUSES = ['All', 'Live', 'Upcoming']
const ARTIST_TYPES = ['All', 'Independent', 'Label']

export default function Discover() {
  const [genre, setGenre] = useState('All')
  const [status, setStatus] = useState('All')
  const [artistType, setArtistType] = useState('All')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('default')

  let filtered = ALL.filter(d => {
    const mg = genre === 'All' || d.genre === genre
    const ms = status === 'All' || (status === 'Live' ? d.status === 'live' : d.status === 'upcoming')
    const ma = artistType === 'All' || (artistType === 'Independent' ? d.artistType === 'independent' : d.artistType === 'label')
    const mq = d.title.toLowerCase().includes(q.toLowerCase()) || d.artist.toLowerCase().includes(q.toLowerCase())
    return mg && ms && ma && mq
  })

  if (sort === 'bids') filtered = [...filtered].sort((a, b) => (('bids' in b ? b.bids : 0) - ('bids' in a ? a.bids : 0)))
  if (sort === 'ending') filtered = [...filtered].sort((a, b) => {
    const ta = 'endsIn' in a && a.endsIn ? a.endsIn.h * 3600 + a.endsIn.m * 60 + a.endsIn.s : 99999
    const tb = 'endsIn' in b && b.endsIn ? b.endsIn.h * 3600 + b.endsIn.m * 60 + b.endsIn.s : 99999
    return ta - tb
  })

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="label mb-4" style={{ fontSize: '9px' }}>Browse</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 90px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>Discover</h1>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30" style={{ background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid var(--rule)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex items-center gap-3" style={{ borderBottom: '1px solid var(--rule-2)', paddingBottom: '4px', minWidth: '200px', flex: 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--sub)', flexShrink: 0 }}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4-4" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search artworks or artists..." style={{ background: 'none', border: 'none', outline: 'none', fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--off-white)', fontWeight: 300, width: '100%' }} />
          </div>

          {/* Genre */}
          <select value={genre} onChange={e => setGenre(e.target.value)} style={{ background: 'var(--ink-3)', border: '1px solid var(--rule-2)', color: 'var(--sub)', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', padding: '8px 12px', outline: 'none', cursor: 'pointer' }}>
            {GENRES.map(g => <option key={g} value={g}>{g === 'All' ? 'All Genres' : g}</option>)}
          </select>

          {/* Status pills */}
          <div className="flex gap-1">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatus(s)} className="font-label" style={{ fontSize: '9px', padding: '6px 12px', background: status === s ? 'var(--gold-light)' : 'transparent', color: status === s ? 'var(--ink)' : 'var(--sub)', border: '1px solid', borderColor: status === s ? 'var(--gold-light)' : 'var(--rule-2)', cursor: 'pointer' }}>{s}</button>
            ))}
          </div>

          {/* Artist type */}
          <div className="flex gap-1">
            {ARTIST_TYPES.map(t => (
              <button key={t} onClick={() => setArtistType(t)} className="font-label" style={{ fontSize: '9px', padding: '6px 12px', background: artistType === t ? 'var(--ink-3)' : 'transparent', color: artistType === t ? 'var(--off-white)' : 'var(--sub)', border: '1px solid', borderColor: artistType === t ? 'var(--rule-2)' : 'transparent', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: 'var(--ink-3)', border: '1px solid var(--rule-2)', color: 'var(--sub)', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', padding: '8px 12px', outline: 'none', cursor: 'pointer' }}>
            <option value="default">Default</option>
            <option value="ending">Ending Soon</option>
            <option value="bids">Most Bids</option>
          </select>

          <p className="font-label ml-auto" style={{ fontSize: '9px', color: 'var(--muted)' }}>{filtered.length} results</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '40px', color: 'var(--muted)', marginBottom: '16px' }}>No artworks found</p>
              <button onClick={() => { setQ(''); setGenre('All'); setStatus('All'); setArtistType('All') }} className="btn btn-ghost">Clear Filters</button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((drop, i) => (
              <Link to={"/artwork/" + drop.id} key={String(drop.id) + drop.status + i} className="art-card group" style={{ textDecoration: 'none' }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)' }} />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
                    {drop.status === 'live' && <div className="live-pulse" />}
                    <span className="font-label" style={{ fontSize: '8px', color: drop.status === 'live' ? '#FF3B30' : 'var(--sub)' }}>{drop.status === 'live' ? 'Live' : 'Upcoming'}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                    <span className="font-label px-2 py-1" style={{ fontSize: '8px', color: 'var(--gold-pale)', background: 'rgba(10,10,10,0.85)' }}>{drop.edition}</span>
                    <span className="font-label px-2 py-1" style={{ fontSize: '8px', color: drop.artistType === 'label' ? 'var(--gold)' : 'var(--sub)', background: 'rgba(10,10,10,0.85)', border: '1px solid', borderColor: drop.artistType === 'label' ? 'var(--gold)' : 'var(--rule)' }}>{drop.artistType === 'label' ? 'Label' : 'Indie'}</span>
                  </div>
                  {'bids' in drop && drop.bids > 0 && (
                    <div className="absolute bottom-3 right-3 px-2 py-1" style={{ background: 'rgba(10,10,10,0.85)' }}>
                      <span className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{drop.bids} bids</span>
                    </div>
                  )}
                </div>
                <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{drop.artist}</p>
                    <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{drop.genre}</p>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px' }}>{drop.title}</h3>
                  {'currentBid' in drop && drop.currentBid && <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{drop.currentBid}</p>}
                  {'dropsIn' in drop && drop.dropsIn && <p className="font-label" style={{ fontSize: '8px', color: 'var(--gold-pale)' }}>{drop.dropsIn}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}