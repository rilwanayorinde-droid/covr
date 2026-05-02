import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="label mb-6" style={{ fontSize: '9px' }}>Our Story</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em', maxWidth: '900px' }}>
          Music art deserves a permanent home.
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-20">
          <div>
            <p className="label mb-6" style={{ fontSize: '9px' }}>The Problem</p>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.9 }}>
              Every album has a face. A visual identity chosen by the artist to represent their sound, their moment, their truth. But that artwork — often as personal and carefully crafted as the music itself — typically ends up as a compressed JPEG on a streaming platform. It has no physical form. It has no owner. It has no permanence.
            </p>
          </div>
          <div>
            <p className="label mb-6" style={{ fontSize: '9px' }}>The Solution</p>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.9 }}>
              COVR creates a marketplace where the original artwork behind music can be bid on, won, and physically owned — before the world even hears the song. Delivered as a museum-quality framed print with a certificate of authenticity signed by the artist. A piece of music history. On your wall.
            </p>
          </div>
        </div>

        {/* Standards */}
        <div className="mb-20" style={{ borderTop: '1px solid var(--rule)', paddingTop: '64px' }}>
          <p className="label mb-8" style={{ fontSize: '9px' }}>Artist Guidelines & Approval Standards</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Originality', desc: 'All artwork must be original and created by or for the submitting artist. AI-generated images are not accepted. Third-party artwork requires proof of rights transfer.' },
              { title: 'Quality Standards', desc: 'Minimum 3000×3000px resolution. Accepted formats: PNG, TIFF, RAW. Work will be assessed for print quality before approval. Low-effort or template-based designs will be declined.' },
              { title: 'Artist Verification', desc: 'Independent artists must demonstrate a minimum of 5,000 monthly listeners on a major streaming platform, an active social media presence, and provide distributor proof.' },
              { title: 'Label Artists', desc: 'Signed artists must provide official label email verification or ISRC/℗ information. Label managers may submit on behalf of artists with written authorization.' },
              { title: 'Drop Timing', desc: 'Pre-release drops must be submitted at least 3 days before the release date. Surprise drops must be submitted within 72 hours of the song going live. No exceptions.' },
              { title: 'Pricing & Commission', desc: 'Artists set their own reserve price. COVR charges a 12% platform commission on the final sale price. Payment processing fees (1.5%) are additional. Artists receive approximately 86.5% of the final bid.' },
            ].map(s => (
              <div key={s.title} className="p-6" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--off-white)', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="mb-20" style={{ borderTop: '1px solid var(--rule)', paddingTop: '64px' }}>
          <p className="label mb-8" style={{ fontSize: '9px' }}>Shipping & Delivery Policy</p>
          <div style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
            <div className="grid grid-cols-4 gap-4 px-6 py-3" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-3)' }}>
              {['Framing Option', 'Description', 'Add-on Cost', 'Delivery Time'].map(h => <p key={h} className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{h}</p>)}
            </div>
            {[
              { frame: 'Standard', desc: 'Simple black frame, archival glass', cost: 'Included', time: '10–14 days' },
              { frame: 'Premium Wood', desc: 'Solid walnut or oak, museum glass', cost: '+₦25,000', time: '14–18 days' },
              { frame: 'Museum-Grade', desc: 'Conservation framing, UV protection, certificate box', cost: '+₦65,000', time: '18–25 days' },
            ].map((r, i) => (
              <div key={r.frame} className="grid grid-cols-4 gap-4 px-6 py-4" style={{ borderBottom: i < 2 ? '1px solid var(--rule)' : 'none', background: 'var(--ink-2)' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{r.frame}</p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300 }}>{r.desc}</p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--off-white)', fontWeight: 300 }}>{r.cost}</p>
                <p className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>{r.time}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--muted)', fontWeight: 300, marginTop: '12px', lineHeight: 1.7 }}>International shipping available. Rates calculated at checkout. All deliveries are fully insured. Damages must be reported within 48 hours of delivery.</p>
        </div>

        <div className="text-center py-16 reveal" style={{ borderTop: '1px solid var(--rule)' }}>
          <p className="label justify-center mb-6" style={{ fontSize: '9px' }}>Ready to start?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/drops" className="btn btn-gold">Explore Live Drops</Link>
            <Link to="/artist-submit" className="btn btn-ghost" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>Submit Your Cover Art</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
