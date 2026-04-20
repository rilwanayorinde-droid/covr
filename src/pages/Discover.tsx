import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import type { Drop, UpcomingDrop } from '../data'

type AnyDrop = (Drop & { status: 'live' }) | (UpcomingDrop & { status: 'upcoming' })
const ALL: AnyDrop[] = [
  ...LIVE_DROPS.map(d => ({ ...d, status: 'live' as const })),
  ...UPCOMING_DROPS.map(d => ({ ...d, status: 'upcoming' as const, album: '', currentBid: '', endsIn: { h: 0, m: 0, s: 0 }, live: false })),
]
const CATS = ['All', '1 of 1', 'Limited Edition']
const STATS = ['All', 'Live', 'Upcoming']

export default function Discover() {
  const [cat, setCat] = useState('All')
  const [stat, setStat] = useState('All')
  const [q, setQ] = useState('')
  const filtered = ALL.filter(d => {
    const mc = cat === 'All' || (cat === '1 of 1' ? d.edition === '1 of 1' : d.edition !== '1 of 1')
    const ms = stat === 'All' || (stat === 'Live' ? d.status === 'live' : d.status === 'upcoming')
    const mq = d.title.toLowerCase().includes(q.toLowerCase()) || d.artist.toLowerCase().includes(q.toLowerCase())
    return mc && ms && mq
  })
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="label mb-4" style={{ fontSize: '9px' }}>Browse</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 90px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>Discover</h1>
      </div>
      <div className="sticky top-[72px] z-30" style={{ background: 'rgba(10,10,10,0.97)', borderBottom: '1px solid var(--rule)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 flex-1 min-w-[180px]" style={{ borderBottom: '1px solid var(--rule-2)', paddingBottom: '4px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--sub)', flexShrink: 0 }}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4-4" /></svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." style={{ background: 'none', border: 'none', outline: 'none', fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--off-white)', fontWeight: 300, width: '100%' }} />
          </div>
          <div className="flex items-center gap-2">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} className="font-label" style={{ fontSize: '9px', padding: '6px 14px', background: cat === c ? 'var(--gold-light)' : 'transparent', color: cat === c ? 'var(--ink)' : 'var(--sub)', border: '1px solid', borderColor: cat === c ? 'var(--gold-light)' : 'var(--rule-2)', cursor: 'pointer' }}>{c}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {STATS.map(s => (
              <button key={s} onClick={() => setStat(s)} className="font-label" style={{ fontSize: '9px', padding: '6px 14px', background: stat === s ? 'var(--ink-3)' : 'transparent', color: stat === s ? 'var(--off-white)' : 'var(--sub)', border: '1px solid', borderColor: stat === s ? 'var(--rule-2)' : 'transparent', cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          <p className="font-label ml-auto" style={{ fontSize: '9px', color: 'var(--muted)' }}>{filtered.length} results</p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((drop, i) => (
            <Link to={"/artwork/" + drop.id} key={String(drop.id) + drop.status + i} className="art-card group" style={{ textDecoration: 'none' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 55%)' }} />
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
                  {drop.status === 'live' && <div className="live-pulse" />}
                  <span className="font-label" style={{ fontSize: '8px', color: drop.status === 'live' ? '#FF3B30' : 'var(--sub)' }}>{drop.status === 'live' ? 'Live' : 'Upcoming'}</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
                  <span className="font-label" style={{ fontSize: '8px', color: 'var(--gold-pale)' }}>{drop.edition}</span>
                </div>
              </div>
              <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{drop.artist}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)', marginBottom: '6px' }}>{drop.title}</h3>
                {'currentBid' in drop && drop.currentBid && <p className="gold-text font-label" style={{ fontSize: '11px' }}>{drop.currentBid}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
