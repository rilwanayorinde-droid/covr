import { Link } from 'react-router-dom'
import { FEATURED_ARTISTS } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Artists() {
  useScrollReveal()
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="label mb-4" style={{ fontSize: '9px' }}>The Creators</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 7vw, 90px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>Artists</h1>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--sub)', fontWeight: 300, marginTop: '16px', maxWidth: '500px' }}>Verified musicians listing their original cover artwork exclusively on COVR.</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURED_ARTISTS.map((artist, i) => (
            <Link to={"/artist/" + artist.id} key={artist.id} className={"art-card group reveal reveal-delay-" + ((i % 3) + 1)} style={{ textDecoration: 'none' }}>
              <div className="relative overflow-hidden" style={{ height: '300px' }}>
                <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] grayscale group-hover:grayscale-0" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--ink-2) 0%, transparent 55%)' }} />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1.5" style={{ background: 'rgba(10,10,10,0.85)' }}>
                  {artist.verified && <span style={{ color: 'var(--gold)', fontSize: '10px' }}>◈</span>}
                  <span className="font-label" style={{ fontSize: '8px', color: artist.verified ? 'var(--gold)' : 'var(--sub)' }}>{artist.verified ? 'Verified' : 'Pending'}</span>
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1.5" style={{ background: 'rgba(10,10,10,0.85)' }}>
                  <span className="font-label" style={{ fontSize: '8px', color: artist.artistType === 'label' ? 'var(--gold-pale)' : 'var(--sub)' }}>{artist.artistType === 'label' ? 'Label' : 'Independent'}</span>
                </div>
              </div>
              <div className="p-6" style={{ borderTop: '1px solid var(--rule)' }}>
                <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{artist.genre}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', color: 'var(--off-white)', marginBottom: '8px' }}>{artist.name}</h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.6, marginBottom: '16px' }}>{artist.bio.substring(0, 100)}...</p>
                <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
                  {[{ label: 'Drops', value: String(artist.drops) }, { label: 'Followers', value: artist.followers }, { label: 'Sales', value: artist.sales }].map(s => (
                    <div key={s.label}>
                      <p className="font-label mb-0.5" style={{ fontSize: '8px', color: 'var(--muted)' }}>{s.label}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Artist CTA */}
        <div className="mt-16 p-10 text-center reveal" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
          <p className="label justify-center mb-4" style={{ fontSize: '9px' }}>Are You an Artist?</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--off-white)', marginBottom: '16px' }}>List your cover art on COVR</h2>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 28px' }}>
            Submit your original album or single artwork for approval. Reach thousands of superfans who want to own a piece of the music they love.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/artist-submit" className="btn btn-gold">Submit Cover Art</Link>
            <Link to="/about" className="btn btn-ghost">View Artist Guidelines</Link>
          </div>
        </div>
      </div>
    </main>
  )
}