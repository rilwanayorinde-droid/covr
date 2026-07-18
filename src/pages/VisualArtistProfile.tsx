import { useParams, Link } from 'react-router-dom'

const MOCK_VISUAL_ARTISTS = [
  {
    id: 1, username: 'lens_by_kolade', fullName: 'Kolade Adeyemi', artType: 'Photographer',
    bio: 'Lagos-based photographer specialising in music cover art and artist visuals. Work featured on 14 COVR drops. Known for cinematic lighting and urban textures.',
    instagram: '@lens_by_kolade', portfolioUrl: 'https://kolade.art',
    totalEarned: '₦2.4M', drops: 14, avgCommission: '22%', verified: true,
    portfolio: [
      { title: 'Invisible Cities', artist: 'SOLIS', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80', soldFor: '₦520,000', commission: '₦114,400', year: '2025' },
      { title: 'Still Water', artist: 'Amara', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80', soldFor: '₦185,000', commission: '₦40,700', year: '2025' },
      { title: 'Neon Residue', artist: 'SOLIS', img: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=400&q=80', soldFor: '₦640,000', commission: '₦140,800', year: '2025' },
    ]
  },
]

export default function VisualArtistProfile() {
  const { username } = useParams<{ username: string }>()
  const artist = MOCK_VISUAL_ARTISTS.find(a => a.username === username) || MOCK_VISUAL_ARTISTS[0]

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)', padding: '48px 0 40px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--c-bg3)', border: '1px solid var(--c-rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="f-display gold" style={{ fontSize: '28px' }}>{artist.fullName[0]}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                {artist.verified && <span className="badge badge-gold" style={{ fontSize: '8px' }}>◈ Verified Visual Artist</span>}
                <span className="badge badge-ink" style={{ fontSize: '8px' }}>{artist.artType}</span>
              </div>
              <h1 className="f-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--c-ink)', marginBottom: '4px' }}>{artist.fullName}</h1>
              <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-gold)', marginBottom: '12px' }}>@{artist.username}</p>
              <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7, maxWidth: '520px', marginBottom: '16px' }}>{artist.bio}</p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-gold)' }}>{artist.instagram}</p>
                {artist.portfolioUrl && <a href={artist.portfolioUrl} target="_blank" rel="noreferrer" className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink3)', textDecoration: 'none' }}>{artist.portfolioUrl} →</a>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--c-rule)', alignSelf: 'flex-start' }}>
              {[{ l: 'COVR Drops', v: String(artist.drops) }, { l: 'Total Earned', v: artist.totalEarned }, { l: 'Avg. Commission', v: artist.avgCommission }].map(s => (
                <div key={s.l} style={{ background: 'var(--c-bg)', padding: '14px 18px', textAlign: 'center' }}>
                  <p className="f-label" style={{ fontSize: '7px', marginBottom: '4px' }}>{s.l}</p>
                  <p className="f-display gold" style={{ fontSize: '16px' }}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <p className="f-label" style={{ marginBottom: '24px' }}>COVR Portfolio</p>
        <div className="grid-3">
          {artist.portfolio.map(piece => (
            <div key={piece.title} className="card">
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                <img src={piece.img} alt={piece.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
              <div style={{ padding: '18px' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{piece.artist} · {piece.year}</p>
                <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '12px' }}>{piece.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--c-rule)' }}>
                  <div><p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Final Sale</p><p className="f-display gold" style={{ fontSize: '15px' }}>{piece.soldFor}</p></div>
                  <div style={{ textAlign: 'right' }}><p className="f-label" style={{ fontSize: '7px', marginBottom: '2px' }}>Commission Earned</p><p className="f-display" style={{ fontSize: '15px', color: 'var(--c-green)' }}>{piece.commission}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', padding: '32px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)', textAlign: 'center' }}>
          <p className="f-label" style={{ marginBottom: '10px' }}>Are you a music artist?</p>
          <h2 className="f-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--c-ink)', marginBottom: '12px' }}>Commission {artist.fullName.split(' ')[0]} for your next cover</h2>
          <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 20px' }}>
            Reach out directly, agree on a commission rate, then submit your cover art on COVR using <strong>@{artist.username}</strong> — payment is handled automatically.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://instagram.com/${artist.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="btn btn-primary">Contact on Instagram</a>
            <Link to="/artist-submit" className="btn btn-outline">Submit Cover Art</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
