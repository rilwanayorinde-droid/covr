import { useParams, Link } from 'react-router-dom'
import { FEATURED_ARTISTS, LIVE_DROPS } from '../data'

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>()
  const artist = FEATURED_ARTISTS.find(a => String(a.id) === id)
  if (!artist) return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--ink)', paddingTop: '72px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '60px', color: 'var(--off-white)' }}>Not found</h1>
    </div>
  )
  const drops = LIVE_DROPS.filter(d => d.artist === artist.name)
  const displayDrops = drops.length > 0 ? drops : LIVE_DROPS.slice(0, 2)
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="relative overflow-hidden" style={{ height: '380px' }}>
        <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--ink) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-10 pb-10">
          <p className="label mb-4" style={{ fontSize: '9px' }}>{artist.genre}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>{artist.name}</h1>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-20">
          <div>
            <img src={artist.avatar} alt={artist.name} className="w-full object-cover grayscale" style={{ aspectRatio: '3/4', border: '1px solid var(--rule)', marginBottom: '16px' }} />
            <div className="grid grid-cols-2" style={{ border: '1px solid var(--rule)' }}>
              {[{ label: 'Artworks', value: String(artist.pieces) }, { label: 'Total Sales', value: artist.sales }].map((s, i) => (
                <div key={s.label} className="p-5" style={{ borderRight: i === 0 ? '1px solid var(--rule)' : 'none', background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{s.label}</p>
                  <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px' }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
              <p className="label mb-4" style={{ fontSize: '9px' }}>About</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8 }}>{artist.name} is an acclaimed visual artist whose cover art has defined sonic identities for some of the most-listened releases of the past decade.</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="label mb-8" style={{ fontSize: '9px' }}>Artworks on COVR</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {displayDrops.map(drop => (
                <Link to={"/artwork/" + drop.id} key={drop.id} className="art-card group" style={{ textDecoration: 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 55%)' }} />
                  </div>
                  <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '8px' }}>{drop.title}</h3>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{drop.currentBid}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
