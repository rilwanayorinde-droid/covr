import { Link } from 'react-router-dom'
import { FEATURED_ARTISTS } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Artists() {
  useScrollReveal()
  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '40px' }}>
          <p className="f-label" style={{ marginBottom: '8px' }}>The Creators</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'var(--c-ink)', marginBottom: '16px' }}>Artists</h1>
          <p style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, maxWidth: '480px' }}>Verified musicians listing original cover artwork exclusively on COVR.</p>
        </div>
      </div>

      <div className="container section">
        <div className="grid-3">
          {FEATURED_ARTISTS.map((a, i) => (
            <Link to={`/artist/${a.id}`} key={a.id} className={`card reveal delay-${(i % 3) + 1}`} style={{ textDecoration: 'none' }}>
              <div className="img-hover" style={{ position: 'relative', height: '280px', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                <img src={a.avatar} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)', transition: 'filter 0.5s var(--ease)' }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1)')} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,22,0.35) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  {a.verified && <span className="badge badge-gold" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)', fontSize: '8px' }}>◈ Verified</span>}
                  <span className="badge badge-ink" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)', fontSize: '8px' }}>{a.artistType === 'label' ? 'Label' : 'Independent'}</span>
                </div>
              </div>
              <div style={{ padding: '20px', borderTop: '1px solid var(--c-rule)' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{a.genre}</p>
                <h3 className="f-display" style={{ fontSize: '26px', color: 'var(--c-ink)', marginBottom: '10px' }}>{a.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6, marginBottom: '16px' }}>{a.bio.substring(0, 90)}...</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--c-rule)' }}>
                  {[{ l: 'Drops', v: String(a.drops) }, { l: 'Followers', v: a.followers }, { l: 'Sales', v: a.sales }].map(s => (
                    <div key={s.l}><p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>{s.l}</p><p className="f-display" style={{ fontSize: '15px', color: 'var(--c-ink)' }}>{s.v}</p></div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '64px', padding: '56px', textAlign: 'center', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
          <p className="f-label" style={{ marginBottom: '12px' }}>Are you an artist?</p>
          <h2 className="f-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--c-ink)', marginBottom: '16px' }}>List your cover art on COVR</h2>
          <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 28px' }}>Submit original album or single artwork and reach thousands of superfans ready to own a piece of the music they love.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/artist-submit" className="btn btn-primary">Submit Cover Art</Link>
            <Link to="/about" className="btn btn-outline">View Guidelines</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
