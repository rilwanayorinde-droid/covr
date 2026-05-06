import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import LiveCard from '../components/LiveCard'
import { LIVE_DROPS, UPCOMING_DROPS, FEATURED_ARTISTS, TICKER_ITEMS, TOP_COLLECTORS, PAST_DROPS } from '../data'

export default function Home() {
  useScrollReveal()
  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)' }}>

      {/* TICKER */}
      <div className="ticker-wrap" style={{ background: 'var(--c-ink)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="f-label" style={{ padding: '0 32px', color: 'rgba(244,243,238,0.5)', fontSize: '9px', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--c-gold2)', marginRight: '20px' }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'var(--c-bg)' }}>
        {/* Subtle background texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(196,154,40,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', padding: '80px 24px' }}>
          {/* Left */}
          <div>
            <div className="anim-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px', padding: '6px 14px', border: '1px solid var(--c-rule2)', background: 'var(--c-bg2)' }}>
              <span className="live-dot" />
              <span className="f-label" style={{ fontSize: '9px', color: 'var(--c-live)' }}>3 auctions live now</span>
            </div>

            <h1 className="anim-2 f-display" style={{ fontSize: 'clamp(56px, 8vw, 96px)', lineHeight: 0.95, marginBottom: '28px', color: 'var(--c-ink)' }}>
              Own the<br />
              <span className="f-display-italic gold">original</span><br />
              cover art.
            </h1>

            <p className="anim-3" style={{ fontSize: '16px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.75, maxWidth: '420px', marginBottom: '36px' }}>
              Bid on authentic album artwork before release. Certified by the artist, professionally framed, delivered to your door.
            </p>

            <div className="anim-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
              <Link to="/drops" className="btn btn-primary">Browse Live Drops <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
              <Link to="/signup" className="btn btn-outline">Join as Collector</Link>
              <Link to="/artist-submit" className="btn btn-ghost">Submit Cover Art</Link>
            </div>

            {/* Stats */}
            <div className="anim-5" style={{ display: 'flex', gap: '32px', paddingTop: '32px', borderTop: '1px solid var(--c-rule)' }}>
              {[{ v: '1,284', l: 'Collectors' }, { v: '₦47M+', l: 'Artwork Sold' }, { v: '23', l: 'Drops This Month' }].map(s => (
                <div key={s.l}>
                  <div className="f-display gold" style={{ fontSize: '26px' }}>{s.v}</div>
                  <div className="f-label" style={{ fontSize: '8px', marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — featured card */}
          <div className="anim-3 hide-mobile" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(196,154,40,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div className="card" style={{ maxWidth: '400px', marginLeft: 'auto' }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg2)' }}>
                <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=90" alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,22,0.6) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-live" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)' }}>
                    <span className="live-dot" />Bidding Live · 14 bids
                  </span>
                </div>
                <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <span className="badge badge-gold" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)' }}>1 of 1</span>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                  <p className="f-label" style={{ color: 'rgba(244,243,238,0.6)', fontSize: '9px', marginBottom: '4px' }}>SOLIS — Meridian</p>
                  <h3 className="f-display" style={{ fontSize: '24px', color: '#F4F3EE', marginBottom: '16px' }}>Invisible Cities</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p className="f-label" style={{ color: 'rgba(244,243,238,0.5)', fontSize: '8px', marginBottom: '2px' }}>Current Bid</p>
                      <p className="f-display" style={{ fontSize: '22px', color: '#F0C84A' }}>₦520,000</p>
                    </div>
                    <Link to="/artwork/1" className="btn btn-gold btn-sm">Bid Now</Link>
                  </div>
                </div>
              </div>
              {/* Card bottom */}
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--c-rule)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--c-bg3)', border: '2px solid var(--c-bg)', marginLeft: i > 1 ? '-8px' : 0, overflow: 'hidden' }}>
                      <img src={`https://images.unsplash.com/photo-150700311696${i}-0a1dd7228f2d?w=50&q=80`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                  <span className="f-label" style={{ fontSize: '9px', marginLeft: '4px' }}>+10 bidders</span>
                </div>
                <span className="badge badge-ink">Ends in 3h 41m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero simplified */}
        <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important;padding:48px 16px!important;gap:32px!important;}}`}</style>
      </section>

      {/* LIVE DROPS */}
      <section className="section" style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '8px' }}>Right Now</p>
              <h2 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)' }}>Live <span className="f-display-italic gold">Drops</span></h2>
            </div>
            <Link to="/drops" className="btn btn-ghost btn-sm">View All <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid-3">
            {LIVE_DROPS.map((drop, i) => <LiveCard key={drop.id} drop={drop} delay={(i % 3) + 1} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="f-label" style={{ marginBottom: '12px' }}>The Process</p>
            <h2 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)' }}>How it works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: 'var(--c-rule)' }}>
            {[
              { n: '01', icon: '✦', title: 'Artist Submits', desc: 'Artists submit original cover art before release or within 72hrs of a surprise drop.' },
              { n: '02', icon: '◈', title: 'COVR Curates', desc: 'Every submission is reviewed for quality, originality, and artist verification.' },
              { n: '03', icon: '⚡', title: 'Fans Bid', desc: 'Listings go live. Real-time bidding. Highest bid when the timer ends wins.' },
              { n: '04', icon: '◻', title: 'You Own It', desc: 'Framed, certified, and shipped to your door within 14 days of auction close.' },
              { n: '05', icon: '◆', title: 'Legacy', desc: 'Your piece is registered on COVR with a certificate of authenticity.' },
            ].map((s, i) => (
              <div key={s.n} className={`reveal delay-${i + 1}`} style={{ background: 'var(--c-bg)', padding: '32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '20px', color: 'var(--c-gold2)' }}>{s.icon}</span>
                  <span className="f-label" style={{ fontSize: '9px', color: 'var(--c-rule2)' }}>{s.n}</span>
                </div>
                <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Promise bar */}
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: 'var(--c-rule)', marginTop: '2px' }}>
            {[{ icon: '◈', label: 'Artist Verified' }, { icon: '□', label: 'Physical Frame' }, { icon: '◻', label: 'Certificate of Authenticity' }, { icon: '◇', label: 'Insured Delivery' }].map(p => (
              <div key={p.label} style={{ background: 'var(--c-bg2)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--c-gold2)', fontSize: '16px' }}>{p.icon}</span>
                <span className="f-label" style={{ fontSize: '9px' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="section" style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '8px' }}>Coming Soon</p>
              <h2 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)' }}>Upcoming Drops</h2>
            </div>
            <Link to="/drops" className="btn btn-ghost btn-sm">Full Schedule <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid-4">
            {UPCOMING_DROPS.map((drop, i) => (
              <Link to={`/artwork/${drop.id}`} key={drop.id} className={`card reveal delay-${(i % 4) + 1}`} style={{ textDecoration: 'none' }}>
                <div className="img-hover" style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                  <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.3) brightness(0.6)' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold2)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <span className="f-label" style={{ color: 'var(--c-gold3)', fontSize: '10px' }}>{drop.dropsIn}</span>
                    <span className="f-label" style={{ color: 'rgba(244,243,238,0.4)', fontSize: '8px' }}>{drop.releaseDate}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <span className="badge badge-gold" style={{ background: 'rgba(250,250,247,0.9)' }}>{drop.edition}</span>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p className="f-label" style={{ fontSize: '8px' }}>{drop.artist}</p>
                    <span className="badge badge-ink" style={{ fontSize: '8px', padding: '2px 7px' }}>{drop.artistType === 'label' ? 'Label' : 'Indie'}</span>
                  </div>
                  <h3 className="f-display" style={{ fontSize: '18px', color: 'var(--c-ink)', marginBottom: '12px' }}>{drop.title}</h3>
                  <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', fontSize: '9px' }}>Notify Me</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISTS */}
      <section className="section" style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '8px' }}>The Creators</p>
              <h2 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)' }}>Featured Artists</h2>
            </div>
            <Link to="/artists" className="btn btn-ghost btn-sm">All Artists <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid-3">
            {FEATURED_ARTISTS.map((a, i) => (
              <Link to={`/artist/${a.id}`} key={a.id} className={`card reveal delay-${i + 1}`} style={{ textDecoration: 'none' }}>
                <div className="img-hover" style={{ position: 'relative', height: '240px', overflow: 'hidden', background: 'var(--c-bg3)' }}>
                  <img src={a.avatar} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)', transition: 'filter 0.5s var(--ease)' }}
                    onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0)')}
                    onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1)')} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,22,0.4) 0%, transparent 60%)' }} />
                  {a.verified && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span className="badge badge-gold" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)', fontSize: '8px' }}>◈ Verified</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px', borderTop: '1px solid var(--c-rule)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p className="f-label" style={{ fontSize: '8px' }}>{a.genre}</p>
                    <span className="badge badge-ink" style={{ fontSize: '8px', padding: '2px 7px' }}>{a.artistType === 'label' ? 'Label' : 'Independent'}</span>
                  </div>
                  <h3 className="f-display" style={{ fontSize: '24px', color: 'var(--c-ink)', marginBottom: '12px' }}>{a.name}</h3>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Sales</p><p className="f-display gold" style={{ fontSize: '16px' }}>{a.sales}</p></div>
                    <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Drops</p><p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{a.drops}</p></div>
                    <div><p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>Listeners</p><p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{a.monthlyListeners}</p></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section" style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            {/* Recently claimed */}
            <div className="reveal">
              <p className="f-label" style={{ marginBottom: '24px' }}>Recently Claimed</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                {PAST_DROPS.map(drop => (
                  <div key={drop.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--c-bg)' }}>
                    <img src={drop.image} alt={drop.title} style={{ width: '52px', height: '52px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '2px' }}>{drop.artist}</p>
                      <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{drop.title}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p className="f-display gold" style={{ fontSize: '16px' }}>{drop.soldFor}</p>
                      <p className="f-label" style={{ fontSize: '8px' }}>{drop.buyer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="reveal delay-2">
              <p className="f-label" style={{ marginBottom: '24px' }}>Top Collectors</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                {TOP_COLLECTORS.map(c => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--c-bg)' }}>
                    <span className="f-display gold" style={{ fontSize: '20px', minWidth: '28px' }}>#{c.rank}</span>
                    <img src={c.avatar} alt={c.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', color: 'var(--c-ink)', fontWeight: 400 }}>{c.name}</p>
                      <p className="f-label" style={{ fontSize: '8px' }}>{c.pieces} pieces owned</p>
                    </div>
                    <p className="f-display gold" style={{ fontSize: '16px' }}>{c.totalSpent}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section" style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-ink)', color: '#F4F3EE' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto', padding: '80px 24px' }}>
          <div className="reveal">
            <p className="f-label" style={{ color: 'rgba(244,243,238,0.4)', marginBottom: '24px' }}>The COVR Promise</p>
            <h2 className="f-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#F4F3EE', marginBottom: '24px', lineHeight: 1.05 }}>
              Music art deserves<br /><span className="f-display-italic gold">a permanent home.</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(244,243,238,0.55)', fontWeight: 300, lineHeight: 1.8, marginBottom: '40px' }}>
              You are not buying a file. You are acquiring a physical, certified, framed piece of music history — delivered to your wall.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link to="/signup" className="btn btn-gold">Start Collecting</Link>
              <Link to="/about" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(244,243,238,0.7)' }}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div style={{ borderTop: '1px solid var(--c-rule)', background: 'var(--c-bg2)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <h3 className="f-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--c-ink)', marginBottom: '4px' }}>Ready to own the art?</h3>
            <p className="f-label" style={{ fontSize: '9px' }}>Join 1,284 collectors already on COVR.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/drops" className="btn btn-primary">Explore Drops</Link>
            <Link to="/artist-submit" className="btn btn-outline" style={{ color: 'var(--c-gold)', borderColor: 'rgba(139,105,20,0.3)' }}>Submit Cover Art</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
