import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  useScrollReveal()
  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ padding: '64px 24px 56px' }}>
          <p className="f-label" style={{ marginBottom: '12px' }}>Our Story</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(40px, 8vw, 88px)', color: 'var(--c-ink)', lineHeight: 1, maxWidth: '800px', letterSpacing: '-0.02em' }}>Music art deserves a permanent home.</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '80px' }}>
          <div className="reveal">
            <p className="f-label" style={{ marginBottom: '16px' }}>The Problem</p>
            <p style={{ fontSize: '16px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.9 }}>Every album has a face. A visual identity chosen by the artist to represent their sound, their moment, their truth. But that artwork — often as personal and carefully crafted as the music itself — typically ends up as a compressed image on a streaming platform. It has no physical form. No owner. No permanence.</p>
          </div>
          <div className="reveal delay-2">
            <p className="f-label" style={{ marginBottom: '16px' }}>The Solution</p>
            <p style={{ fontSize: '16px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.9 }}>COVR creates a marketplace where the original artwork behind music can be bid on, won, and physically owned — before the world even hears the song. Delivered as a museum-quality framed print with a certificate of authenticity signed by the artist. A piece of music history. On your wall.</p>
          </div>
        </div>

        {/* Guidelines */}
        <div style={{ borderTop: '1px solid var(--c-rule)', paddingTop: '64px', marginBottom: '64px' }}>
          <p className="f-label reveal" style={{ marginBottom: '32px' }}>Artist Guidelines & Approval Standards</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--c-rule)' }}>
            {[
              { title: 'Originality', desc: 'All artwork must be original and created by or for the submitting artist. AI-generated images are not accepted. Third-party artwork requires proof of rights transfer.' },
              { title: 'Quality Standards', desc: 'Minimum 3000×3000px resolution. Accepted formats: PNG, TIFF, RAW. Work will be assessed for print quality before approval. Low-effort or template designs will be declined.' },
              { title: 'Verification — Independent', desc: 'Must demonstrate a minimum of 5,000 monthly listeners on a major streaming platform, an active social media presence, and distributor proof.' },
              { title: 'Verification — Label', desc: 'Signed artists must provide official label email verification or ISRC/℗ information. Label managers may submit on behalf of artists with written authorization.' },
              { title: 'Drop Timing', desc: 'Pre-release drops must be submitted at least 3 days before the release date. Surprise drops must be submitted within 72 hours of the song going live.' },
              { title: 'Commission & Fees', desc: 'COVR charges a 12% platform commission on the final sale price. Payment processing fees (1.5%) apply additionally. Artists receive approximately 86.5% of the final bid.' },
            ].map((s, i) => (
              <div key={s.title} className={`reveal delay-${(i % 4) + 1}`} style={{ background: 'var(--c-bg)', padding: '28px 32px' }}>
                <h3 className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping table */}
        <div style={{ borderTop: '1px solid var(--c-rule)', paddingTop: '64px', marginBottom: '64px' }}>
          <p className="f-label reveal" style={{ marginBottom: '24px' }}>Shipping & Framing Policy</p>
          <div className="reveal" style={{ border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '16px', padding: '12px 20px', background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-rule)' }}>
              {['Option', 'Description', 'Add-on Cost', 'Est. Delivery'].map(h => <p key={h} className="f-label" style={{ fontSize: '8px' }}>{h}</p>)}
            </div>
            {[
              { frame: 'Standard', desc: 'Simple archival frame, standard glass, ready to hang', cost: 'Included', time: '10–14 days' },
              { frame: 'Premium Wood', desc: 'Solid walnut or oak, museum glass, white mat board', cost: '+₦25,000', time: '14–18 days' },
              { frame: 'Museum Grade', desc: 'Conservation framing, UV protection, certificate presentation box', cost: '+₦65,000', time: '18–25 days' },
            ].map((r, i) => (
              <div key={r.frame} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '16px', padding: '16px 20px', background: 'var(--c-bg)', borderBottom: i < 2 ? '1px solid var(--c-rule)' : 'none' }}>
                <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{r.frame}</p>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300 }}>{r.desc}</p>
                <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 300 }}>{r.cost}</p>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink3)' }}>{r.time}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '12px', lineHeight: 1.7 }}>International shipping available. All deliveries fully insured. Damages must be reported within 48 hours of delivery.</p>
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', padding: '56px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
          <p className="f-label" style={{ marginBottom: '12px' }}>Ready to start?</p>
          <h2 className="f-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--c-ink)', marginBottom: '28px' }}>Join the COVR community</h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/drops" className="btn btn-primary">Explore Live Drops</Link>
            <Link to="/artist-submit" className="btn btn-outline" style={{ color: 'var(--c-gold)', borderColor: 'rgba(139,105,20,0.3)' }}>Submit Cover Art</Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-cols{grid-template-columns:1fr!important;}}`}</style>
    </main>
  )
}
