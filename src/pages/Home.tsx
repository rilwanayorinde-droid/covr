import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import LiveCard from '../components/LiveCard'
import { LIVE_DROPS, UPCOMING_DROPS, FEATURED_ARTISTS, TICKER_ITEMS, TOP_COLLECTORS, PAST_DROPS } from '../data'

const DC = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', lineHeight: 1 }}>{value}</span>
      <span className="font-label" style={{ color: 'var(--sub)', fontSize: '9px' }}>{label}</span>
    </div>
  )
}

export default function Home() {
  useScrollReveal()
  return (
    <main>
      {/* TICKER */}
      <div className="overflow-hidden" style={{ marginTop: '72px', borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)', padding: '11px 0' }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-label px-8 whitespace-nowrap" style={{ color: 'var(--muted)', fontSize: '9px' }}>
              <span style={{ color: 'var(--gold)', marginRight: '24px' }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative flex items-center" style={{ minHeight: '95vh', overflow: 'hidden' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1800&q=90" alt="" className="w-full h-full object-cover" style={{ opacity: 0.15 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, var(--ink) 35%, transparent 100%)' }} />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label mb-8 slide-in" style={{ fontSize: '9px' }}>Music Art Ownership Platform</p>
            <h1 className="slide-in" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(64px, 11vw, 130px)', letterSpacing: '-0.02em', lineHeight: 0.92, marginBottom: '32px' }}>
              <span className="block" style={{ color: 'var(--off-white)' }}>Own</span>
              <span className="block gold-text slide-in-delay">the</span>
              <span className="block slide-in-delay" style={{ color: 'var(--off-white)' }}>Cover.</span>
            </h1>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.7, marginBottom: '40px', maxWidth: '440px' }}>
              Every song has a visual identity. Bid on original music cover art before release — certified, framed, and delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <Link to="/drops" className="btn btn-gold">Browse Live Drops <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
              <Link to="/signup" className="btn btn-ghost">Join as Collector</Link>
              <Link to="/artist-submit" className="btn btn-ghost" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>Submit Your Cover</Link>
            </div>
            <div className="flex gap-10 pt-10" style={{ borderTop: '1px solid var(--rule)' }}>
              <Stat value="1,284" label="Collectors" />
              <Stat value="₦47M+" label="Artwork Sold" />
              <Stat value="23" label="Drops This Month" />
            </div>
          </div>
          {/* Hero card */}
          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-[400px]">
              <div className="absolute -inset-8 rounded-full blur-3xl" style={{ background: 'rgba(184,134,11,0.07)' }} />
              <div className="art-card">
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=90" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 50%)' }} />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Bidding Live · 14 bids</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>SOLIS — Meridian</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '26px', color: 'var(--off-white)', marginBottom: '12px' }}>Invisible Cities</h3>
                    <div className="flex items-center justify-between">
                      <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p><p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '26px' }}>₦520,000</p></div>
                      <Link to="/artwork/1" className="btn btn-gold" style={{ fontSize: '10px', padding: '12px 20px' }}>Bid Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DROPS */}
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-12 reveal">
            <div><p className="label mb-4" style={{ fontSize: '9px' }}>Right Now</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(38px, 5vw, 60px)', color: 'var(--off-white)' }}>Live <span className="gold-text">Drops</span></h2>
            </div>
            <Link to="/drops" className="btn btn-text hidden md:inline-flex" style={{ color: 'var(--sub)' }}>All Drops <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIVE_DROPS.map((drop, i) => <LiveCard key={drop.id} drop={drop} index={i} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="reveal mb-12"><p className="label mb-4" style={{ fontSize: '9px' }}>The Process</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(38px, 5vw, 60px)', color: 'var(--off-white)' }}>How it works</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-0" style={{ borderTop: '1px solid var(--rule)' }}>
            {[
              { n: '01', title: 'Artist Submits', desc: 'Artist submits cover art with song metadata before release, or flags it as a surprise drop.' },
              { n: '02', title: 'COVR Approves', desc: 'Our team reviews quality, originality, and artist verification. Only genuine originals pass.' },
              { n: '03', title: 'Drop Goes Live', desc: 'Listing opens for bids. Pre-release drops open before the song. Surprise drops open within 72 hours.' },
              { n: '04', title: 'Fan Wins', desc: 'Highest bidder when the countdown ends wins. Payment is confirmed and held in escrow.' },
              { n: '05', title: 'Delivered', desc: 'Song releases. Artwork is professionally framed and shipped with a certificate of authenticity.' },
            ].map((s, i) => (
              <div key={s.n} className={"relative p-8 reveal " + DC[Math.min(i+1, 4)]} style={{ borderLeft: '1px solid var(--rule)' }}>
                <span className="absolute top-6 right-6 font-label" style={{ fontSize: '10px', color: 'var(--rule-2)' }}>{s.n}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '22px', color: 'var(--off-white)', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-12 reveal">
            <div><p className="label mb-4" style={{ fontSize: '9px' }}>Coming Soon</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(38px, 5vw, 60px)', color: 'var(--off-white)' }}>Upcoming Drops</h2>
            </div>
            <Link to="/drops" className="btn btn-text hidden md:inline-flex" style={{ color: 'var(--sub)' }}>Full Schedule <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UPCOMING_DROPS.map((drop, i) => (
              <Link to={"/artwork/" + drop.id} key={drop.id} className={"art-card group reveal " + DC[(i % 4) + 1]}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]" style={{ filter: 'brightness(0.45) saturate(0.3)' }} loading="lazy" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" style={{ stroke: 'var(--gold)' }} /></svg>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.dropsIn}</span>
                    <span className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{drop.releaseDate}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.85)' }}>
                    <span className="font-label" style={{ fontSize: '8px', color: 'var(--gold)' }}>{drop.edition}</span>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{drop.artist}</p>
                    <span className="font-label" style={{ fontSize: '8px', color: drop.artistType === 'label' ? 'var(--gold)' : 'var(--sub)', padding: '2px 6px', border: '1px solid', borderColor: drop.artistType === 'label' ? 'var(--gold)' : 'var(--rule)' }}>{drop.artistType === 'label' ? 'Label' : 'Indie'}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{drop.title}</h3>
                  <button className="btn btn-ghost w-full justify-center mt-3" style={{ fontSize: '9px', padding: '8px 0' }}>Notify Me</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTISTS */}
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-12 reveal">
            <div><p className="label mb-4" style={{ fontSize: '9px' }}>The Creators</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(38px, 5vw, 60px)', color: 'var(--off-white)' }}>Featured Artists</h2>
            </div>
            <Link to="/artists" className="btn btn-text hidden md:inline-flex" style={{ color: 'var(--sub)' }}>All Artists <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURED_ARTISTS.map((artist, i) => (
              <Link to={"/artist/" + artist.id} key={artist.id} className={"art-card group reveal " + DC[i + 1]}>
                <div className="relative overflow-hidden" style={{ height: '260px' }}>
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] grayscale group-hover:grayscale-0" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--ink-2) 0%, transparent 50%)' }} />
                  {artist.verified && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.85)' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '10px' }}>◈</span>
                      <span className="font-label" style={{ fontSize: '8px', color: 'var(--gold)' }}>Verified</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.85)' }}>
                    <span className="font-label" style={{ fontSize: '8px', color: artist.artistType === 'label' ? 'var(--gold-pale)' : 'var(--sub)' }}>{artist.artistType === 'label' ? 'Label' : 'Independent'}</span>
                  </div>
                </div>
                <div className="p-5 flex items-end justify-between" style={{ borderTop: '1px solid var(--rule)' }}>
                  <div>
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{artist.genre}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--off-white)' }}>{artist.name}</h3>
                    <p className="font-label mt-1" style={{ fontSize: '8px', color: 'var(--muted)' }}>{artist.monthlyListeners} monthly listeners</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--muted)' }}>Total Sales</p>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px' }}>{artist.sales}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY CLAIMED + LEADERBOARD */}
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Recently claimed */}
            <div className="reveal">
              <p className="label mb-6" style={{ fontSize: '9px' }}>Recently Claimed</p>
              <div className="flex flex-col gap-3">
                {PAST_DROPS.map(drop => (
                  <div key={drop.id} className="flex items-center gap-4 p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                    <img src={drop.image} alt={drop.title} style={{ width: '56px', height: '56px', objectFit: 'cover', flexShrink: 0 }} />
                    <div className="flex-1">
                      <p className="font-label mb-0.5" style={{ fontSize: '8px', color: 'var(--sub)' }}>{drop.artist}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{drop.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '16px' }}>{drop.soldFor}</p>
                      <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{drop.buyer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="reveal reveal-delay-2">
              <p className="label mb-6" style={{ fontSize: '9px' }}>Top Collectors</p>
              <div className="flex flex-col gap-3">
                {TOP_COLLECTORS.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: c.rank <= 3 ? 'var(--gold)' : 'var(--muted)', minWidth: '28px' }}>#{c.rank}</span>
                    <img src={c.avatar} alt={c.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }} />
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--off-white)', fontWeight: 400 }}>{c.name}</p>
                      <p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{c.pieces} pieces owned</p>
                    </div>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{c.totalSpent}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-32 relative overflow-hidden" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(100px, 22vw, 280px)', color: 'transparent', WebkitTextStroke: '1px var(--rule)', letterSpacing: '-0.04em', lineHeight: 1, whiteSpace: 'nowrap' }}>COVR</span>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center reveal">
            <p className="label justify-center mb-8">The COVR Standard</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.1, color: 'var(--off-white)', letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Music art deserves<br /><em className="gold-text">a permanent home.</em>
            </h2>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 40px' }}>
              You are not buying a file. You are acquiring a physical, certified, framed piece of music history — delivered to your wall.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="btn btn-gold">Start Collecting</Link>
              <Link to="/about" className="btn btn-ghost">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="py-14" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-3)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '34px', color: 'var(--off-white)' }}>Ready to own the art?</h3>
            <p className="font-label mt-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Join 1,284 collectors already on COVR.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link to="/drops" className="btn btn-gold">Explore Drops</Link>
            <Link to="/artist-submit" className="btn btn-ghost" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>Submit Cover Art</Link>
          </div>
        </div>
      </div>
    </main>
  )
}