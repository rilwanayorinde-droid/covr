import { useParams, Link } from 'react-router-dom'
import { FEATURED_ARTISTS, LIVE_DROPS } from '../data'
import LiveCard from '../components/LiveCard'

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>()
  const artist = FEATURED_ARTISTS.find(a => String(a.id) === id)
  if (!artist) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 className="f-display" style={{ fontSize: '48px', color: 'var(--c-ink3)' }}>Artist not found</h1>
    </main>
  )
  const drops = LIVE_DROPS.filter(d => d.artist === artist.name)
  const displayDrops = drops.length > 0 ? drops : LIVE_DROPS.slice(0, 2)

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden', background: 'var(--c-bg3)' }}>
        <img src={artist.avatar} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) saturate(0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--c-bg) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            {artist.verified && <span className="badge badge-gold" style={{ background: 'rgba(250,250,247,0.95)' }}>◈ Verified</span>}
            <span className="badge badge-ink" style={{ background: 'rgba(250,250,247,0.95)' }}>{artist.artistType === 'label' ? 'Label Artist' : 'Independent'}</span>
          </div>
          <p className="f-label" style={{ marginBottom: '6px' }}>{artist.genre}</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(40px, 8vw, 80px)', color: 'var(--c-ink)', lineHeight: 1 }}>{artist.name}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '56px', alignItems: 'start' }}>
          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <img src={artist.avatar} alt={artist.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'grayscale(1)', border: '1px solid var(--c-rule)', marginBottom: '1px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--c-rule)', marginBottom: '1px' }}>
              {[{ l: 'Artworks', v: String(artist.pieces) }, { l: 'Sales', v: artist.sales }, { l: 'Followers', v: artist.followers }, { l: 'Monthly', v: artist.monthlyListeners }].map((s, i) => (
                <div key={s.l} style={{ background: 'var(--c-bg2)', padding: '14px 16px' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{s.l}</p>
                  <p className={`f-display ${i === 1 ? 'gold' : ''}`} style={{ fontSize: '16px', color: i === 1 ? undefined : 'var(--c-ink)' }}>{s.v}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)', marginBottom: '12px' }}>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>About</p>
              <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8 }}>{artist.bio}</p>
              <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--c-gold)', fontWeight: 400 }}>{artist.instagram}</p>
            </div>
            <Link to="/artist-submit" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', color: 'var(--c-gold)', borderColor: 'rgba(139,105,20,0.3)' }}>Contact Artist</Link>
          </div>

          {/* Main */}
          <div>
            <p className="f-label" style={{ marginBottom: '24px' }}>Artworks on COVR</p>
            <div className="grid-2">
              {displayDrops.map((drop, i) => <LiveCard key={drop.id} drop={drop} delay={i + 1} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--c-rule)', marginTop: '32px' }}>
              {[{ l: 'Avg. Sale Price', v: '₦310K' }, { l: 'Fastest Sale', v: '4 min' }, { l: 'Total Bidders', v: '142' }, { l: 'Return Collectors', v: '38%' }].map(s => (
                <div key={s.l} style={{ background: 'var(--c-bg2)', padding: '20px 24px' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{s.l}</p>
                  <p className="f-display" style={{ fontSize: '22px', color: 'var(--c-ink)' }}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.profile-grid{grid-template-columns:1fr!important;}}`}</style>
    </main>
  )
}
