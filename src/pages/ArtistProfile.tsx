import { useParams, Link } from 'react-router-dom'
import { FEATURED_ARTISTS, LIVE_DROPS } from '../data'

export default function ArtistProfile() {
  const { id } = useParams<{ id: string }>()
  const artist = FEATURED_ARTISTS.find(a => String(a.id) === id)
  if (!artist) return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--ink)', paddingTop: '72px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '60px', color: 'var(--off-white)' }}>Artist not found</h1>
    </div>
  )
  const drops = LIVE_DROPS.filter(d => d.artist === artist.name)
  const displayDrops = drops.length > 0 ? drops : LIVE_DROPS.slice(0, 2)

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      {/* Banner */}
      <div className="relative overflow-hidden" style={{ height: '420px' }}>
        <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.5)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--ink) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-10 pb-12">
          <div className="flex items-center gap-3 mb-4">
            {artist.verified && (
              <span className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.85)', border: '1px solid var(--gold)' }}>
                <span style={{ color: 'var(--gold)', fontSize: '10px' }}>◈</span>
                <span className="font-label" style={{ fontSize: '8px', color: 'var(--gold)' }}>Verified Artist</span>
              </span>
            )}
            <span className="font-label px-3 py-1.5" style={{ fontSize: '8px', color: 'var(--sub)', background: 'rgba(10,10,10,0.85)', border: '1px solid var(--rule)' }}>{artist.artistType === 'label' ? 'Label Artist' : 'Independent'}</span>
          </div>
          <p className="label mb-3" style={{ fontSize: '9px' }}>{artist.genre}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>{artist.name}</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Sidebar */}
          <div>
            <img src={artist.avatar} alt={artist.name} className="w-full object-cover grayscale" style={{ aspectRatio: '3/4', border: '1px solid var(--rule)', marginBottom: '16px' }} />
            {/* Stats */}
            <div className="grid grid-cols-2 mb-4" style={{ border: '1px solid var(--rule)' }}>
              {[{ label: 'Artworks', value: String(artist.pieces) }, { label: 'Total Sales', value: artist.sales }, { label: 'Followers', value: artist.followers }, { label: 'Monthly', value: artist.monthlyListeners }].map((s, i) => (
                <div key={s.label} className="p-4" style={{ borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none', borderBottom: i < 2 ? '1px solid var(--rule)' : 'none', background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{s.label}</p>
                  <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px' }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="p-5 mb-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
              <p className="label mb-4" style={{ fontSize: '9px' }}>About</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8 }}>{artist.bio}</p>
              <p className="font-label mt-4" style={{ fontSize: '9px', color: 'var(--gold)' }}>{artist.instagram}</p>
            </div>
            <Link to="/artist-submit" className="btn btn-ghost w-full justify-center" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>Contact Artist</Link>
          </div>

          {/* Artworks */}
          <div className="md:col-span-2">
            <p className="label mb-8" style={{ fontSize: '9px' }}>Artworks on COVR</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {displayDrops.map(drop => (
                <Link to={"/artwork/" + drop.id} key={drop.id} className="art-card group" style={{ textDecoration: 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                    <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)' }} />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)' }}>
                      <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Live</span>
                    </div>
                  </div>
                  <div className="p-5" style={{ background: 'var(--ink-2)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{drop.album}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '8px' }}>{drop.title}</h3>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px' }}>{drop.currentBid}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Story/data section */}
            <div className="mt-8 p-6" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
              <p className="label mb-5" style={{ fontSize: '9px' }}>Artist Insights</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Avg. Sale Price', value: '₦310K' }, { label: 'Fastest Sale', value: '4 min' }, { label: 'Total Bidders', value: '142' }, { label: 'Return Collectors', value: '38%' }].map(s => (
                  <div key={s.label} className="p-4" style={{ border: '1px solid var(--rule)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{s.label}</p>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--off-white)' }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}