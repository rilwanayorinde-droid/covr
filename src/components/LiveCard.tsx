import { Link } from 'react-router-dom'
import type { Drop } from '../data'
import Countdown from './Countdown'

export default function LiveCard({ drop, delay = 0 }: { drop: Drop; delay?: number }) {
  return (
    <Link to={`/artwork/${drop.id}`} className={`card reveal delay-${delay}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
      <div className="img-hover" style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg2)' }}>
        <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,22,0.5) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className="badge badge-live" style={{ background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(8px)' }}>
            <span className="live-dot" />Live · {drop.bids} bids
          </span>
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span className="badge badge-gold" style={{ background: 'rgba(250,250,247,0.92)', backdropFilter: 'blur(8px)' }}>{drop.edition}</span>
        </div>
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p className="f-label" style={{ marginBottom: '4px', fontSize: '9px' }}>{drop.artist} — {drop.album}</p>
          <h3 className="f-display" style={{ fontSize: '22px', color: 'var(--c-ink)' }}>{drop.title}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--c-rule)', marginTop: 'auto' }}>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>Current Bid</p>
            <p className="f-display gold" style={{ fontSize: '22px' }}>{drop.currentBid}</p>
          </div>
          <Countdown initial={drop.endsIn} />
        </div>
        <div className="btn btn-primary" style={{ justifyContent: 'center', fontSize: '10px' }}>
          Place Bid
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </Link>
  )
}
