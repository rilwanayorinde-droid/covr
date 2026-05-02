import { useState } from 'react'
import { Link } from 'react-router-dom'

type Step = 1 | 2 | 3 | 4

export default function ArtistSubmit() {
  const [step, setStep] = useState<Step>(1)
  const [artistType, setArtistType] = useState<'independent' | 'label'>('independent')
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    artistName: '', email: '', spotifyUrl: '', instagramHandle: '',
    monthlyListeners: '', distributorProof: '', labelEmail: '',
    songTitle: '', albumTitle: '', releaseDate: '', isSurprise: false,
    edition: '1of1', limitedCount: '', reservePrice: '', duration: '7',
    artworkFile: '', description: '', agreeTerms: false, agreeCopyright: false,
  })

  const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const steps = ['Verification', 'Cover Art', 'Auction Setup', 'Review & Submit']

  if (submitted) return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center px-6" style={{ maxWidth: '480px' }}>
        <p style={{ fontSize: '60px', marginBottom: '24px' }}>◈</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '48px', color: 'var(--off-white)', marginBottom: '16px' }}>Submitted</h1>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8, marginBottom: '32px' }}>
          Your cover art submission is under review. Our team will respond within 48 hours. You will receive an email at the address provided once a decision is made.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn btn-gold">Go to Home</Link>
          <Link to="/drops" className="btn btn-ghost">Browse Drops</Link>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="label mb-4" style={{ fontSize: '9px' }}>Artist Portal</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em' }}>Submit Cover Art</h1>
      </div>

      {/* Progress */}
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center gap-0">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex items-center gap-3 shrink-0">
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid', borderColor: step > i + 1 ? 'var(--gold)' : step === i + 1 ? 'var(--gold)' : 'var(--rule-2)', background: step > i + 1 ? 'var(--gold)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {step > i + 1 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  ) : (
                    <span className="font-label" style={{ fontSize: '9px', color: step === i + 1 ? 'var(--gold)' : 'var(--muted)' }}>{i + 1}</span>
                  )}
                </div>
                <span className="font-label hidden md:block" style={{ fontSize: '9px', color: step === i + 1 ? 'var(--off-white)' : step > i + 1 ? 'var(--gold)' : 'var(--muted)' }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: '1px', background: step > i + 1 ? 'var(--gold)' : 'var(--rule)', margin: '0 12px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-14">

        {/* STEP 1 — Verification */}
        {step === 1 && (
          <div className="flex flex-col gap-8">
            <div>
              <p className="label mb-6" style={{ fontSize: '9px' }}>Artist Type</p>
              <div className="grid grid-cols-2 gap-4">
                {(['independent', 'label'] as const).map(t => (
                  <button key={t} onClick={() => setArtistType(t)} className="p-6 text-left" style={{ border: '1px solid', borderColor: artistType === t ? 'var(--gold)' : 'var(--rule-2)', background: artistType === t ? 'rgba(184,134,11,0.05)' : 'var(--ink-2)', cursor: 'pointer' }}>
                    <p className="font-label mb-2" style={{ fontSize: '9px', color: artistType === t ? 'var(--gold)' : 'var(--sub)' }}>{t === 'independent' ? 'Independent Artist' : 'Label / Signed Artist'}</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--muted)', fontWeight: 300 }}>{t === 'independent' ? 'Self-released or distributed via DistroKid, TuneCore, etc.' : 'Signed to a record label with official representation'}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Artist / Stage Name</p><input value={form.artistName} onChange={e => update('artistName', e.target.value)} placeholder="Your artist name" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Email Address</p><input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Spotify Artist Profile URL</p><input value={form.spotifyUrl} onChange={e => update('spotifyUrl', e.target.value)} placeholder="https://open.spotify.com/artist/..." className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Instagram Handle</p><input value={form.instagramHandle} onChange={e => update('instagramHandle', e.target.value)} placeholder="@yourhandle" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Monthly Listeners (approx.)</p><input value={form.monthlyListeners} onChange={e => update('monthlyListeners', e.target.value)} placeholder="e.g. 45000" className="input-field" /></div>
              {artistType === 'independent' ? (
                <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Distributor Proof (DistroKid / TuneCore statement URL or screenshot description)</p><input value={form.distributorProof} onChange={e => update('distributorProof', e.target.value)} placeholder="Link or description of proof" className="input-field" /></div>
              ) : (
                <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Official Label Email or Contract Reference</p><input value={form.labelEmail} onChange={e => update('labelEmail', e.target.value)} placeholder="label@management.com or contract ref" className="input-field" /></div>
              )}
            </div>

            <div className="p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
              <p className="label mb-4" style={{ fontSize: '9px' }}>Minimum Requirements</p>
              {[
                { label: '5,000+ monthly listeners on Spotify or Apple Music', met: Number(form.monthlyListeners) >= 5000 },
                { label: 'Active social media presence', met: form.instagramHandle.length > 2 },
                { label: 'Verified distributor or label connection', met: (form.distributorProof.length > 0 || form.labelEmail.length > 0) },
              ].map(r => (
                <div key={r.label} className="flex items-center gap-3 mb-3">
                  <span style={{ color: r.met ? '#34C759' : 'var(--rule-2)', fontSize: '16px' }}>{r.met ? '✓' : '○'}</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: r.met ? 'var(--body)' : 'var(--muted)', fontWeight: 300 }}>{r.label}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setStep(2)} className="btn btn-gold self-end">Next: Cover Art <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
          </div>
        )}

        {/* STEP 2 — Cover Art */}
        {step === 2 && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Song / Single Title</p><input value={form.songTitle} onChange={e => update('songTitle', e.target.value)} placeholder="Track title" className="input-field" /></div>
              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Album Title (if applicable)</p><input value={form.albumTitle} onChange={e => update('albumTitle', e.target.value)} placeholder="Album name or leave blank for single" className="input-field" /></div>

              <div>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Release Type</p>
                <div className="flex gap-3">
                  <button onClick={() => update('isSurprise', false)} className="flex-1 py-3 font-label" style={{ fontSize: '9px', background: !form.isSurprise ? 'var(--gold-light)' : 'var(--ink-2)', color: !form.isSurprise ? 'var(--ink)' : 'var(--sub)', border: '1px solid', borderColor: !form.isSurprise ? 'var(--gold-light)' : 'var(--rule-2)', cursor: 'pointer' }}>Pre-Release Drop</button>
                  <button onClick={() => update('isSurprise', true)} className="flex-1 py-3 font-label" style={{ fontSize: '9px', background: form.isSurprise ? 'var(--gold-light)' : 'var(--ink-2)', color: form.isSurprise ? 'var(--ink)' : 'var(--sub)', border: '1px solid', borderColor: form.isSurprise ? 'var(--gold-light)' : 'var(--rule-2)', cursor: 'pointer' }}>Surprise Release (72hr window)</button>
                </div>
                {!form.isSurprise && (
                  <div className="mt-4"><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Planned Release Date</p><input type="date" value={form.releaseDate} onChange={e => update('releaseDate', e.target.value)} className="input-field" /></div>
                )}
                {form.isSurprise && (
                  <div className="mt-4 p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.7 }}>For surprise releases, submit your cover art here before or on the day of release. COVR will open bidding within 72 hours of the song going live. Our team will verify the release before activation.</p>
                  </div>
                )}
              </div>

              <div>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Upload Cover Artwork</p>
                <div className="flex items-center justify-center" style={{ border: '2px dashed var(--rule-2)', background: 'var(--ink-2)', height: '160px', cursor: 'pointer' }}>
                  <div className="text-center">
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '24px', color: 'var(--muted)', marginBottom: '8px' }}>Drop file here</p>
                    <p className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>Min. 3000×3000px · PNG or TIFF · Original only</p>
                  </div>
                </div>
              </div>

              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Story Behind This Artwork</p><textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Tell collectors the story — what inspired this artwork, how it was created, what it means..." rows={5} className="input-field" style={{ resize: 'vertical' }} /></div>
            </div>

            <div className="flex gap-4 justify-between">
              <button onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
              <button onClick={() => setStep(3)} className="btn btn-gold">Next: Auction Setup <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        )}

        {/* STEP 3 — Auction Setup */}
        {step === 3 && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Edition Type</p>
                <div className="flex flex-col gap-2">
                  {[{ val: '1of1', label: '1 of 1 — Single Original', desc: 'One winner owns the only copy. Maximum rarity.' }, { val: 'limited', label: 'Limited Edition — Multiple Prints', desc: 'Set a fixed number of copies. Each winner gets a numbered print.' }].map(e => (
                    <button key={e.val} onClick={() => update('edition', e.val)} className="p-4 text-left" style={{ border: '1px solid', borderColor: form.edition === e.val ? 'var(--gold)' : 'var(--rule-2)', background: form.edition === e.val ? 'rgba(184,134,11,0.05)' : 'var(--ink-2)', cursor: 'pointer' }}>
                      <p className="font-label mb-1" style={{ fontSize: '9px', color: form.edition === e.val ? 'var(--gold)' : 'var(--sub)' }}>{e.label}</p>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'var(--muted)', fontWeight: 300 }}>{e.desc}</p>
                    </button>
                  ))}
                </div>
                {form.edition === 'limited' && (
                  <div className="mt-4"><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Number of Copies</p><input type="number" value={form.limitedCount} onChange={e => update('limitedCount', e.target.value)} placeholder="e.g. 5" className="input-field" min="2" max="100" /></div>
                )}
              </div>

              <div><p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Reserve Price (₦) — Minimum acceptable bid</p><input type="number" value={form.reservePrice} onChange={e => update('reservePrice', e.target.value)} placeholder="e.g. 50000" className="input-field" /></div>

              <div>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Auction Duration</p>
                <div className="flex gap-2">
                  {[{ val: '3', label: '3 Days' }, { val: '7', label: '7 Days' }, { val: '14', label: '14 Days' }].map(d => (
                    <button key={d.val} onClick={() => update('duration', d.val)} className="flex-1 py-3 font-label" style={{ fontSize: '9px', background: form.duration === d.val ? 'var(--gold-light)' : 'var(--ink-2)', color: form.duration === d.val ? 'var(--ink)' : 'var(--sub)', border: '1px solid', borderColor: form.duration === d.val ? 'var(--gold-light)' : 'var(--rule-2)', cursor: 'pointer' }}>{d.label}</button>
                  ))}
                </div>
              </div>

              <div className="p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <p className="label mb-4" style={{ fontSize: '9px' }}>Platform Fees</p>
                {[{ label: 'COVR Platform Commission', value: '12% of final sale' }, { label: 'Payment Processing', value: '1.5% (Paystack/Flutterwave)' }, { label: 'You Receive', value: '~86.5% of final bid' }].map(f => (
                  <div key={f.label} className="flex justify-between mb-3">
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300 }}>{f.label}</span>
                    <span className="font-label" style={{ fontSize: '9px', color: 'var(--off-white)' }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-between">
              <button onClick={() => setStep(2)} className="btn btn-ghost">← Back</button>
              <button onClick={() => setStep(4)} className="btn btn-gold">Next: Review <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        )}

        {/* STEP 4 — Review */}
        {step === 4 && (
          <div className="flex flex-col gap-8">
            <div className="p-6" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
              <p className="label mb-6" style={{ fontSize: '9px' }}>Submission Summary</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Artist', value: form.artistName || '—' },
                  { label: 'Artist Type', value: artistType },
                  { label: 'Song Title', value: form.songTitle || '—' },
                  { label: 'Release Type', value: form.isSurprise ? 'Surprise (72hr)' : 'Pre-Release' },
                  { label: 'Edition', value: form.edition === '1of1' ? '1 of 1' : 'Limited × ' + form.limitedCount },
                  { label: 'Reserve Price', value: form.reservePrice ? '₦' + Number(form.reservePrice).toLocaleString() : '—' },
                  { label: 'Duration', value: form.duration + ' days' },
                  { label: 'Spotify', value: form.spotifyUrl ? 'Provided' : '—' },
                ].map(r => (
                  <div key={r.label} className="py-3" style={{ borderBottom: '1px solid var(--rule)' }}>
                    <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{r.label}</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--off-white)', fontWeight: 300 }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.agreeTerms} onChange={e => update('agreeTerms', e.target.checked)} style={{ accentColor: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.7 }}>I agree to COVR's Artist Terms of Service, including platform commission rates and fulfillment obligations.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.agreeCopyright} onChange={e => update('agreeCopyright', e.target.checked)} style={{ accentColor: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.7 }}>I confirm that I own the copyright to this artwork and have the right to sell it. I understand that submitting AI-generated art or art I do not own will result in permanent account ban.</span>
              </label>
            </div>

            <div className="flex gap-4 justify-between">
              <button onClick={() => setStep(3)} className="btn btn-ghost">← Back</button>
              <button onClick={() => setSubmitted(true)} disabled={!form.agreeTerms || !form.agreeCopyright} className="btn btn-gold" style={{ opacity: form.agreeTerms && form.agreeCopyright ? 1 : 0.4 }}>
                Submit for Approval <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}