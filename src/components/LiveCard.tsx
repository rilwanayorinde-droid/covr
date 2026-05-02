import { Link } from 'react-router-dom'
import type { Drop } from '../data'
import Countdown from './Countdown'
const DC = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']
export default function LiveCard({ drop, index }: { drop: Drop; index: number }) {
  return (
    <Link to={"/artwork/" + drop.id} className={"art-card group reveal " + DC[(index % 4) + 1] + " flex flex-col"} style={{ textDecoration: 'none' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)' }} />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Live · {drop.bids} bids</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
          <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.edition}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5" style={{ background: 'var(--ink-2)', flex: 1 }}>
        <div>
          <p className="font-label mb-1" style={{ color: 'var(--sub)', fontSize: '9px' }}>{drop.artist} — {drop.album}</p>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--off-white)', lineHeight: 1.2 }}>{drop.title}</h3>
        </div>
        <div className="flex items-end justify-between pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
          <div>
            <p className="font-label mb-1" style={{ color: 'var(--sub)', fontSize: '9px' }}>Current Bid</p>
            <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '26px' }}>{drop.currentBid}</p>
          </div>
          <Countdown initial={drop.endsIn} />
        </div>
        <div className="btn btn-gold w-full justify-center mt-1" style={{ fontSize: '10px' }}>
          Place Bid <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </Link>
  )
}