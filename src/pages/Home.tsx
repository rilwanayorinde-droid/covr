import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import LiveCard from '../components/LiveCard'
import { LIVE_DROPS, UPCOMING_DROPS, FEATURED_ARTISTS, TICKER_ITEMS } from '../data'

const DELAY_CLASSES = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', lineHeight: 1 }}>{value}</span>
      <span className="font-label" style={{ color: 'var(--sub)', fontSize: '9px' }}>{label}</span>
    </div>
  )
}

function SectionHead({ label, title, linkTo, linkLabel }: { label: string; title: ReactNode; linkTo?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between mb-12 reveal">
      <div>
        <p className="label mb-4" style={{ fontSize: '9px' }}>{label}</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(38px, 5vw, 60px)', lineHeight: 1.05, color: 'var(--off-white)' }}>{title}</h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="btn btn-text hidden md:inline-flex" style={{ color: 'var(--sub)' }}>
          <span>{linkLabel ?? 'View All'}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      )}
    </div>
  )
}

function Step({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  return (
    <div className={"relative p-8 md:p-10 reveal " + DELAY_CLASSES[delay]} style={{ borderLeft: '1px solid var(--rule)' }}>
      <span className="absolute top-8 right-8 font-label" style={{ fontSize: '10px', color: 'var(--rule-2)' }}>{n}</span>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '26px', color: 'var(--off-white)', marginBottom: '16px' }}>{title}</h3>
      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
    </div>
  )
}

export default function Home() {
  useScrollReveal()
  return (
    <main>
      <div className="overflow-hidden" style={{ marginTop: '72px', borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)', padding: '11px 0' }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-label px-8 whitespace-nowrap" style={{ color: 'var(--muted)', fontSize: '9px' }}>
              <span style={{ color: 'var(--gold)', marginRight: '24px' }}></span>{item}
            </span>
          ))}
        </div>
      </div>
      <section className="relative flex items-center" style={{ minHeight: '92vh', overflow: 'hidden' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1800&q=90" alt="" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, var(--ink) 40%, transparent 100%)' }} />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label mb-8 slide-in" style={{ fontSize: '9px' }}>Music Art Ownership Platform</p>
            <h1 className="slide-in" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(72px, 11vw, 140px)', letterSpacing: '-0.02em', lineHeight: 0.92, marginBottom: '32px' }}>
              <span className="block" style={{ color: 'var(--off-white)' }}>Own</span>
              <span className="block gold-text slide-in-delay">the</span>
              <span className="block slide-in-delay" style={{ color: 'var(--off-white)' }}>Cover.</span>
            </h1>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.6, marginBottom: '40px', maxWidth: '440px' }}>
              Every song has a visual identity. COVR lets fans bid on and own the original artwork behind music they love  before release, certified, and delivered as a physical framed piece.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/drops" className="btn btn-gold">Explore Live Drops
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link to="/discover" className="btn btn-ghost">How It Works</Link>
            </div>
            <div className="flex gap-10 mt-14 pt-10" style={{ borderTop: '1px solid var(--rule)' }}>
              <Stat value="340+" label="Artworks Sold" />
              <Stat value="48M+" label="Total Bids" />
              <Stat value="120+" label="Artists" />
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-[420px]">
              <div className="art-card">
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=90" alt="Featured Drop" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 50%)' }} />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <div className="live-pulse" />
                    <span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Bidding Live</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>1 of 1</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>SOLIS  Meridian</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', color: 'var(--off-white)', marginBottom: '16px' }}>Invisible Cities</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p>
                        <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px' }}>520,000</p>
                      </div>
                      <Link to="/artwork/1" className="btn btn-gold" style={{ fontSize: '10px', padding: '12px 20px' }}>Bid Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHead label="Right Now" title={<>Live <span className="gold-text">Drops</span></>} linkTo="/drops" linkLabel="All Drops" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIVE_DROPS.map((drop, i) => <LiveCard key={drop.id} drop={drop} index={i} />)}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHead label="The Process" title="How it works" />
          <div className="grid md:grid-cols-4 gap-0" style={{ borderTop: '1px solid var(--rule)' }}>
            <Step n="01" title="Artist Submits" desc="Artists list their cover art before release or within 72 hours of a surprise drop." delay={1} />
            <Step n="02" title="We Curate" desc="Every submission is reviewed against COVR quality and originality standards. Only the best pass." delay={2} />
            <Step n="03" title="Fans Bid" desc="Listings go live. Bidding is real-time and transparent. Highest bid when the clock stops wins." delay={3} />
            <Step n="04" title="You Own It" desc="Receive a physical framed print, certified, signed, and shipped to your door." delay={4} />
          </div>
          <div className="grid grid-cols-3 mt-12 reveal" style={{ border: '1px solid var(--rule)' }}>
            {[{ icon: '', text: 'Artist Verified' }, { icon: '', text: 'Physical Frame Delivered' }, { icon: '', text: 'Certificate of Authenticity' }].map((item, i) => (
              <div key={item.text} className="flex items-center gap-4 p-6 md:p-8" style={{ borderRight: i < 2 ? '1px solid var(--rule)' : 'none' }}>
                <span style={{ color: 'var(--gold)', fontSize: '20px' }}>{item.icon}</span>
                <span className="font-label" style={{ fontSize: '9px', color: 'var(--sub)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHead label="Coming Soon" title="Upcoming Drops" linkTo="/drops" linkLabel="Full Schedule" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UPCOMING_DROPS.map((drop, i) => (
              <Link to={"/artwork/" + drop.id} key={drop.id} className={"art-card group reveal " + DELAY_CLASSES[(i % 4) + 1]}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
                  <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]" style={{ filter: 'brightness(0.5) saturate(0.4)' }} loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--gold-pale)' }}>{drop.dropsIn}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1" style={{ background: 'rgba(10,10,10,0.8)' }}>
                    <span className="font-label" style={{ fontSize: '8px', color: 'var(--gold)' }}>{drop.edition}</span>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--muted)' }}>{drop.artist}</p>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{drop.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHead label="The Creators" title="Featured Artists" linkTo="/artists" linkLabel="All Artists" />
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURED_ARTISTS.map((artist, i) => (
              <Link to={"/artist/" + artist.id} key={artist.id} className={"art-card group reveal " + DELAY_CLASSES[i + 1]}>
                <div className="relative overflow-hidden" style={{ height: '280px' }}>
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] grayscale group-hover:grayscale-0" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--ink-2) 0%, transparent 50%)' }} />
                </div>
                <div className="p-6 flex items-end justify-between" style={{ borderTop: '1px solid var(--rule)' }}>
                  <div>
                    <p className="font-label mb-1.5" style={{ fontSize: '9px', color: 'var(--sub)' }}>{artist.genre}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '26px', color: 'var(--off-white)' }}>{artist.name}</h3>
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
      <section className="py-32 md:py-40 relative overflow-hidden" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink)' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(120px, 25vw, 320px)', color: 'transparent', WebkitTextStroke: '1px var(--rule)', letterSpacing: '-0.04em', lineHeight: 1, whiteSpace: 'nowrap' }}>COVR</span>
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center reveal">
            <p className="label justify-center mb-8">The COVR Standard</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5.5vw, 66px)', lineHeight: 1.1, color: 'var(--off-white)', letterSpacing: '-0.02em', marginBottom: '32px' }}>
              Music art deserves<br /><em className="gold-text">a permanent home.</em>
            </h2>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 48px' }}>
              You are not buying a file. You are acquiring a physical, signed, framed piece of music history.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="btn btn-gold">Start Collecting</Link>
              <Link to="/discover" className="btn btn-ghost">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
      <div className="py-14" style={{ borderTop: '1px solid var(--rule)', background: 'var(--ink-3)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal">
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '34px', color: 'var(--off-white)' }}>Ready to own the art?</h3>
            <p className="font-label mt-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Join thousands of fans already collecting on COVR.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link to="/drops" className="btn btn-gold">Explore Drops</Link>
            <Link to="/signup" className="btn btn-ghost">Create Account</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
