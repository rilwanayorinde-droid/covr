import { useState } from 'react'
import { Link } from 'react-router-dom'

type Step = 1 | 2 | 3 | 4

export default function ArtistSubmit() {
  const [step, setStep] = useState<Step>(1)
  const [artistType, setArtistType] = useState<'independent' | 'label'>('independent')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    artistName: '', email: '', spotifyUrl: '', instagramHandle: '', monthlyListeners: '',
    distributorProof: '', labelEmail: '', songTitle: '', albumTitle: '', releaseDate: '',
    isSurprise: false, edition: '1of1', limitedCount: '', reservePrice: '', duration: '7',
    description: '', agreeTerms: false, agreeCopyright: false,
  })
  const u = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))
  const steps = ['Verification', 'Cover Art', 'Auction Setup', 'Review']

  if (submitted) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '440px', padding: '0 24px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(196,154,40,0.1)', border: '1px solid rgba(196,154,40,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h1 className="f-display" style={{ fontSize: '44px', color: 'var(--c-ink)', marginBottom: '16px' }}>Submitted</h1>
        <p style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8, marginBottom: '32px' }}>Your cover art is under review. Our team will respond within 48 hours via the email address you provided.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">Go to Home</Link>
          <Link to="/drops" className="btn btn-outline">Browse Drops</Link>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--c-rule)' }}>
        <div className="container" style={{ padding: '48px 24px 0' }}>
          <p className="f-label" style={{ marginBottom: '8px' }}>Artist Portal</p>
          <h1 className="f-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--c-ink)', marginBottom: '36px' }}>Submit Cover Art</h1>

          {/* Step progress */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'initial' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div className={`step-dot ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                    {step > i + 1
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                      : <span style={{ fontSize: '10px' }}>{i + 1}</span>
                    }
                  </div>
                  <span className="f-label" style={{ fontSize: '8px', color: step === i + 1 ? 'var(--c-ink)' : step > i + 1 ? 'var(--c-gold)' : 'var(--c-ink3)', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`} style={{ margin: '0 8px', marginBottom: '20px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '720px', padding: '48px 24px' }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '12px' }}>Artist Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {(['independent', 'label'] as const).map(t => (
                  <button key={t} onClick={() => setArtistType(t)} style={{
                    padding: '20px', border: '1px solid', cursor: 'pointer', textAlign: 'left',
                    borderColor: artistType === t ? 'var(--c-gold)' : 'var(--c-rule2)',
                    background: artistType === t ? 'rgba(196,154,40,0.04)' : 'var(--c-bg2)',
                    transition: 'all 0.2s',
                  }}>
                    <p className="f-label" style={{ fontSize: '9px', color: artistType === t ? 'var(--c-gold)' : 'var(--c-ink)', marginBottom: '6px' }}>{t === 'independent' ? 'Independent Artist' : 'Label / Signed Artist'}</p>
                    <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>{t === 'independent' ? 'Self-released via DistroKid, TuneCore, etc.' : 'Signed to a record label with official representation'}</p>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { l: 'Artist / Stage Name', k: 'artistName', p: 'Your artist name', t: 'text' },
                { l: 'Email Address', k: 'email', p: 'your@email.com', t: 'email' },
                { l: 'Spotify Profile URL', k: 'spotifyUrl', p: 'https://open.spotify.com/artist/...', t: 'text' },
                { l: 'Instagram Handle', k: 'instagramHandle', p: '@yourhandle', t: 'text' },
              ].map(f => (
                <div key={f.k}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>{f.l}</p>
                  <input type={f.t} value={(form as Record<string, string>)[f.k]} onChange={e => u(f.k, e.target.value)} placeholder={f.p} className="input" />
                </div>
              ))}
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Monthly Listeners (approx.)</p>
                <input type="number" value={form.monthlyListeners} onChange={e => u('monthlyListeners', e.target.value)} placeholder="e.g. 45000" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>{artistType === 'independent' ? 'Distributor Proof' : 'Label Email / Contract Ref'}</p>
                <input value={artistType === 'independent' ? form.distributorProof : form.labelEmail} onChange={e => u(artistType === 'independent' ? 'distributorProof' : 'labelEmail', e.target.value)} placeholder={artistType === 'independent' ? 'DistroKid/TuneCore link' : 'label@management.com'} className="input" />
              </div>
            </div>
            {/* Requirements check */}
            <div style={{ padding: '20px 24px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '14px' }}>Minimum Requirements</p>
              {[
                { l: '5,000+ monthly listeners', met: Number(form.monthlyListeners) >= 5000 },
                { l: 'Active social media presence', met: form.instagramHandle.length > 2 },
                { l: 'Distributor or label verification', met: form.distributorProof.length > 0 || form.labelEmail.length > 0 },
              ].map(r => (
                <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: r.met ? 'rgba(45,106,79,0.1)' : 'var(--c-bg3)', border: `1px solid ${r.met ? 'var(--c-green)' : 'var(--c-rule2)'}` }}>
                    {r.met && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                  </div>
                  <span style={{ fontSize: '13px', color: r.met ? 'var(--c-ink)' : 'var(--c-ink3)', fontWeight: 300 }}>{r.l}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(2)} className="btn btn-primary">Next: Cover Art <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Song / Single Title</p>
                <input value={form.songTitle} onChange={e => u('songTitle', e.target.value)} placeholder="Track title" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Album Title (optional)</p>
                <input value={form.albumTitle} onChange={e => u('albumTitle', e.target.value)} placeholder="Album name" className="input" />
              </div>
            </div>
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '10px' }}>Release Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[{ v: false, l: 'Pre-Release Drop', d: 'List before the song goes live.' }, { v: true, l: 'Surprise Release', d: 'Bidding opens within 72hrs of release.' }].map(o => (
                  <button key={String(o.v)} onClick={() => u('isSurprise', o.v)} style={{ padding: '16px', border: '1px solid', cursor: 'pointer', textAlign: 'left', borderColor: form.isSurprise === o.v ? 'var(--c-gold)' : 'var(--c-rule2)', background: form.isSurprise === o.v ? 'rgba(196,154,40,0.04)' : 'var(--c-bg2)', transition: 'all 0.2s' }}>
                    <p className="f-label" style={{ fontSize: '9px', color: form.isSurprise === o.v ? 'var(--c-gold)' : 'var(--c-ink)', marginBottom: '4px' }}>{o.l}</p>
                    <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{o.d}</p>
                  </button>
                ))}
              </div>
              {!form.isSurprise && (
                <div style={{ marginTop: '12px' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Planned Release Date</p>
                  <input type="date" value={form.releaseDate} onChange={e => u('releaseDate', e.target.value)} className="input" />
                </div>
              )}
            </div>
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Upload Cover Artwork</p>
              <div style={{ border: '2px dashed var(--c-rule2)', background: 'var(--c-bg2)', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-ink3)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                <p className="f-label" style={{ fontSize: '9px' }}>Drop file here or click to upload</p>
                <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>Min. 3000×3000px · PNG or TIFF · Original artwork only</p>
              </div>
            </div>
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Story Behind This Artwork</p>
              <textarea value={form.description} onChange={e => u('description', e.target.value)} placeholder="Tell collectors the story — what inspired this artwork, how it was created, what it means..." rows={5} className="input" style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} className="btn btn-outline">← Back</button>
              <button onClick={() => setStep(3)} className="btn btn-primary">Next: Auction Setup <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>Edition Type</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[{ v: '1of1', l: '1 of 1 — Single Original', d: 'One winner. Maximum rarity.' }, { v: 'limited', l: 'Limited Edition — Multiple Prints', d: 'Set a fixed number of numbered copies.' }].map(e => (
                  <button key={e.v} onClick={() => u('edition', e.v)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', border: '1px solid', cursor: 'pointer', textAlign: 'left', borderColor: form.edition === e.v ? 'var(--c-gold)' : 'var(--c-rule2)', background: form.edition === e.v ? 'rgba(196,154,40,0.04)' : 'var(--c-bg2)', transition: 'all 0.2s' }}>
                    <div><p className="f-label" style={{ fontSize: '9px', color: form.edition === e.v ? 'var(--c-gold)' : 'var(--c-ink)', marginBottom: '2px' }}>{e.l}</p><p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{e.d}</p></div>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${form.edition === e.v ? 'var(--c-gold)' : 'var(--c-rule2)'}`, background: form.edition === e.v ? 'var(--c-gold)' : 'transparent', transition: 'all 0.2s', flexShrink: 0 }} />
                  </button>
                ))}
                {form.edition === 'limited' && (
                  <div style={{ marginTop: '8px' }}>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Number of Copies</p>
                    <input type="number" value={form.limitedCount} onChange={e => u('limitedCount', e.target.value)} placeholder="e.g. 5" className="input" min="2" max="100" />
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Reserve Price (₦)</p>
                <input type="number" value={form.reservePrice} onChange={e => u('reservePrice', e.target.value)} placeholder="Minimum acceptable bid" className="input" />
              </div>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Auction Duration</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[{ v: '3', l: '3 Days' }, { v: '7', l: '7 Days' }, { v: '14', l: '14 Days' }].map(d => (
                    <button key={d.v} onClick={() => u('duration', d.v)} className={`btn btn-sm ${form.duration === d.v ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, justifyContent: 'center', fontSize: '9px' }}>{d.l}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: '20px 24px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>Platform Fees</p>
              {[{ l: 'COVR Commission', v: '12% of final sale' }, { l: 'Payment Processing', v: '1.5% (Paystack)' }, { l: 'You Receive', v: '~86.5% of final bid' }].map(f => (
                <div key={f.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300 }}>{f.l}</span>
                  <span className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink)' }}>{f.v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} className="btn btn-outline">← Back</button>
              <button onClick={() => setStep(4)} className="btn btn-primary">Next: Review <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--c-rule)' }}>
                <p className="f-label" style={{ fontSize: '8px' }}>Submission Summary</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--c-rule)' }}>
                {[
                  { l: 'Artist', v: form.artistName || '—' }, { l: 'Artist Type', v: artistType },
                  { l: 'Song', v: form.songTitle || '—' }, { l: 'Release', v: form.isSurprise ? 'Surprise Drop' : 'Pre-Release' },
                  { l: 'Edition', v: form.edition === '1of1' ? '1 of 1' : `Limited × ${form.limitedCount}` }, { l: 'Reserve', v: form.reservePrice ? `₦${Number(form.reservePrice).toLocaleString()}` : '—' },
                  { l: 'Duration', v: `${form.duration} days` }, { l: 'Spotify', v: form.spotifyUrl ? 'Provided' : 'Not provided' },
                ].map(r => (
                  <div key={r.l} style={{ background: 'var(--c-bg)', padding: '14px 20px' }}>
                    <p className="f-label" style={{ fontSize: '7px', marginBottom: '3px' }}>{r.l}</p>
                    <p style={{ fontSize: '14px', color: 'var(--c-ink)', fontWeight: 300 }}>{r.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { k: 'agreeTerms', l: "I agree to COVR's Artist Terms of Service, including platform commission rates and fulfillment obligations." },
                { k: 'agreeCopyright', l: "I confirm I own the copyright to this artwork. I understand that submitting AI-generated or third-party art will result in a permanent account ban." },
              ].map(c => (
                <label key={c.k} style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" checked={(form as Record<string, boolean>)[c.k]} onChange={e => u(c.k, e.target.checked)} style={{ accentColor: 'var(--c-gold)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>{c.l}</span>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(3)} className="btn btn-outline">← Back</button>
              <button onClick={() => setSubmitted(true)} className="btn btn-gold" disabled={!form.agreeTerms || !form.agreeCopyright} style={{ opacity: form.agreeTerms && form.agreeCopyright ? 1 : 0.4 }}>
                Submit for Approval <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
