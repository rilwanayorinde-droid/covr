import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

type Step = 1 | 2 | 3 | 4

export default function ArtistSubmit() {
  const [step, setStep] = useState<Step>(1)
  const [artistType, setArtistType] = useState<'independent' | 'label'>('independent')
  const [submitted, setSubmitted] = useState(false)
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null)
  const [artworkFile, setArtworkFile] = useState<File | null>(null)
  const [artworkError, setArtworkError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    artistName: '', email: '', spotifyUrl: '', instagramHandle: '',
    monthlyListeners: '', distributorProof: '', labelEmail: '',
    songTitle: '', albumTitle: '', releaseDate: '', isSurprise: false,
    reservePrice: '', duration: '7', description: '',
    visualArtistUsername: '', visualArtistCommission: '',
    agreeTerms: false, agreeCopyright: false,
  })

  const u = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))
  const steps = ['Verification', 'Cover Art', 'Auction Setup', 'Review']

  // â”€â”€ File handling â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleFile = (file: File) => {
    setArtworkError('')
    const validTypes = ['image/png', 'image/tiff', 'image/x-tiff', 'image/jpeg']
    const validExts = ['.png', '.tiff', '.tif', '.jpg', '.jpeg']
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()

    if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
      setArtworkError('Invalid file type. Please upload PNG, TIFF, or JPG.')
      return
    }
    if (file.size > 200 * 1024 * 1024) {
      setArtworkError('File is too large. Maximum size is 200MB.')
      return
    }

    setArtworkFile(file)
    const reader = new FileReader()
    reader.onload = e => setArtworkPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const removeArtwork = () => {
    setArtworkFile(null); setArtworkPreview(null); setArtworkError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (submitted) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '440px', padding: '0 24px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(196,154,40,0.1)', border: '1px solid rgba(196,154,40,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h1 className="f-display" style={{ fontSize: '44px', color: 'var(--c-ink)', marginBottom: '16px' }}>Submitted</h1>
        <p style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.8, marginBottom: '32px' }}>
          Your cover art is under review. Our team responds within 48 hours at the email you provided.
        </p>
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
                      : <span style={{ fontSize: '10px' }}>{i + 1}</span>}
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

        {/* STEP 1 â€” Verification */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p className="f-label" style={{ marginBottom: '12px' }}>Artist Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {(['independent', 'label'] as const).map(t => (
                  <button key={t} onClick={() => setArtistType(t)} style={{ padding: '18px', border: '1px solid', cursor: 'pointer', textAlign: 'left', borderColor: artistType === t ? 'var(--c-gold)' : 'var(--c-rule2)', background: artistType === t ? 'rgba(196,154,40,0.04)' : 'var(--c-bg2)', transition: 'all 0.2s' }}>
                    <p className="f-label" style={{ fontSize: '9px', color: artistType === t ? 'var(--c-gold)' : 'var(--c-ink)', marginBottom: '6px' }}>{t === 'independent' ? 'Independent Artist' : 'Label / Signed Artist'}</p>
                    <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>{t === 'independent' ? 'Self-released via DistroKid, TuneCore, etc.' : 'Signed to a record label'}</p>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[{ l: 'Artist / Stage Name', k: 'artistName', p: 'Your artist name', t: 'text' }, { l: 'Email Address', k: 'email', p: 'your@email.com', t: 'email' }, { l: 'Spotify Profile URL', k: 'spotifyUrl', p: 'https://open.spotify.com/artist/...', t: 'text' }, { l: 'Instagram Handle', k: 'instagramHandle', p: '@yourhandle', t: 'text' }].map(f => (
                <div key={f.k}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>{f.l}</p>
                  <input type={f.t} value={(form as unknown as Record<string, string>)[f.k]} onChange={e => u(f.k, e.target.value)} placeholder={f.p} className="input" />
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
              {[{ l: '5,000+ monthly listeners', met: Number(form.monthlyListeners) >= 5000 }, { l: 'Active social media presence', met: form.instagramHandle.length > 2 }, { l: 'Distributor or label verification', met: form.distributorProof.length > 0 || form.labelEmail.length > 0 }].map(r => (
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

        {/* STEP 2 â€” Cover Art */}
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

            {/* Release type */}
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '10px' }}>Release Type</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[{ v: false, l: 'Pre-Release Drop', d: 'List before the song goes live.' }, { v: true, l: 'Surprise Release', d: 'Bidding opens within 72hrs of release.' }].map(o => (
                  <button key={String(o.v)} onClick={() => u('isSurprise', o.v)} style={{ padding: '14px', border: '1px solid', cursor: 'pointer', textAlign: 'left', borderColor: form.isSurprise === o.v ? 'var(--c-gold)' : 'var(--c-rule2)', background: form.isSurprise === o.v ? 'rgba(196,154,40,0.04)' : 'var(--c-bg2)', transition: 'all 0.2s' }}>
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

            {/* ARTWORK UPLOAD */}
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Upload Cover Artwork</p>

              {!artworkPreview ? (
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{ border: `2px dashed ${isDragging ? 'var(--c-gold)' : 'var(--c-rule2)'}`, background: isDragging ? 'rgba(196,154,40,0.03)' : 'var(--c-bg2)', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isDragging ? 'var(--c-gold)' : 'var(--c-ink3)'} strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: isDragging ? 'var(--c-gold)' : 'var(--c-ink)', fontWeight: 300, marginBottom: '4px' }}>
                      {isDragging ? 'Drop it here' : 'Drop file here or click to upload'}
                    </p>
                    <p className="f-label" style={{ fontSize: '8px' }}>PNG or TIFF only Â· Minimum 3000Ã—3000px Â· Max 200MB</p>
                    <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)', marginTop: '4px' }}>Highest quality original files only â€” this goes to print</p>
                  </div>
                </div>
              ) : (
                <div style={{ position: 'relative', border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
                  <img src={artworkPreview} alt="Artwork preview" style={{ width: '100%', maxHeight: '320px', objectFit: 'contain', background: 'var(--c-bg3)' }} />
                  <div style={{ padding: '14px 16px', background: 'var(--c-bg2)', borderTop: '1px solid var(--c-rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 400 }}>{artworkFile?.name}</p>
                      <p className="f-label" style={{ fontSize: '8px', marginTop: '2px' }}>{artworkFile ? (artworkFile.size / 1024 / 1024).toFixed(1) + ' MB' : ''}</p>
                    </div>
                    <button onClick={removeArtwork} className="btn btn-ghost btn-sm" style={{ fontSize: '9px', color: 'var(--c-live)', borderColor: 'rgba(192,57,43,0.3)' }}>Remove</button>
                  </div>
                </div>
              )}

              {artworkError && (
                <div style={{ marginTop: '8px', padding: '10px 14px', background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.3)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--c-live)', fontWeight: 300 }}>{artworkError}</p>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept=".png,.tiff,.tif,.jpg,.jpeg" onChange={handleFileInput} style={{ display: 'none' }} />
            </div>

            {/* Visual artist credit */}
            <div style={{ padding: '20px 24px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px', color: 'var(--c-gold)' }}>Visual Artist Credit (Optional)</p>
              <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, marginBottom: '14px', lineHeight: 1.6 }}>
                If a registered COVR visual artist created this artwork, enter their username. Commission will be split automatically based on your agreed percentage.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Visual Artist Username</p>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-ink3)', fontSize: '14px', fontFamily: 'DM Mono, monospace' }}>@</span>
                    <input value={form.visualArtistUsername} onChange={e => u('visualArtistUsername', e.target.value)} placeholder="username" className="input" style={{ paddingLeft: '28px' }} />
                  </div>
                </div>
                <div>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Their Commission (%)</p>
                  <input type="number" value={form.visualArtistCommission} onChange={e => u('visualArtistCommission', e.target.value)} placeholder="e.g. 20" className="input" min="1" max="80" />
                </div>
              </div>
              {form.visualArtistUsername && form.visualArtistCommission && (
                <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(196,154,40,0.05)', border: '1px solid rgba(196,154,40,0.2)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--c-gold)', fontWeight: 300 }}>
                    @{form.visualArtistUsername} will receive {form.visualArtistCommission}% of the final bid. You receive the remaining {(86.5 - Number(form.visualArtistCommission)).toFixed(1)}% after COVR's 12% + 1.5% processing fee.
                  </p>
                </div>
              )}
            </div>

            {/* Story */}
            <div>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Story Behind This Artwork</p>
              <textarea value={form.description} onChange={e => u('description', e.target.value)} placeholder="Tell collectors the story â€” what inspired this artwork, how it was created, what it means to you..." rows={5} className="input" style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} className="btn btn-outline">â† Back</button>
              <button onClick={() => { if (!artworkFile) { setArtworkError('Please upload your cover artwork.'); return } setStep(3) }} className="btn btn-primary">
                Next: Auction Setup <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 â€” Auction Setup */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1 of 1 notice */}
            <div style={{ padding: '20px 24px', background: 'rgba(196,154,40,0.05)', border: '1px solid rgba(196,154,40,0.2)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '1px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <div>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-gold)', marginBottom: '4px' }}>Every Drop is 1 of 1</p>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>
                  COVR only lists original, one-of-a-kind artworks. One winner. One frame. No prints, no editions. This is the standard â€” there are no exceptions.
                </p>
              </div>
            </div>

            {/* Museum grade notice */}
            <div style={{ padding: '20px 24px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '1px' }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              <div>
                <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-gold)', marginBottom: '4px' }}>Museum Grade Frame â€” Standard for All Winners</p>
                <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>
                  Every COVR winner receives the same premium standard: solid wood archival frame, UV-protective anti-reflective glass, A2 giclÃ©e print on 300gsm HahnemÃ¼hle fine art paper, signed certificate of authenticity, and insured delivery within 14 days.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Reserve Price (â‚¦)</p>
                <input type="number" value={form.reservePrice} onChange={e => u('reservePrice', e.target.value)} placeholder="Minimum acceptable bid" className="input" />
                {form.reservePrice && (
                  <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '6px' }}>
                    Minimum bid collectors can place
                  </p>
                )}
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

            {/* Fee breakdown */}
            <div style={{ padding: '20px 24px', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <p className="f-label" style={{ fontSize: '8px', marginBottom: '14px' }}>Payout Breakdown</p>
              {[
                { l: 'Final Bid Amount', v: form.reservePrice ? `â‚¦${Number(form.reservePrice).toLocaleString()}+` : 'Final bid' },
                { l: 'COVR Commission', v: 'âˆ’12%' },
                { l: 'Payment Processing', v: 'âˆ’1.5%' },
                ...(form.visualArtistUsername && form.visualArtistCommission ? [{ l: `Visual Artist (@${form.visualArtistUsername})`, v: `âˆ’${form.visualArtistCommission}%` }] : []),
                { l: 'You Receive', v: form.visualArtistCommission ? `~${(86.5 - Number(form.visualArtistCommission)).toFixed(1)}%` : '~86.5%' },
              ].map(f => (
                <div key={f.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: f.l === 'You Receive' ? 'none' : '1px solid var(--c-rule)' }}>
                  <span style={{ fontSize: '13px', color: f.l === 'You Receive' ? 'var(--c-ink)' : 'var(--c-ink3)', fontWeight: f.l === 'You Receive' ? 500 : 300 }}>{f.l}</span>
                  <span className="f-label" style={{ fontSize: '9px', color: f.l === 'You Receive' ? 'var(--c-gold)' : 'var(--c-ink)' }}>{f.v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} className="btn btn-outline">â† Back</button>
              <button onClick={() => setStep(4)} className="btn btn-primary">Next: Review <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        )}

        {/* STEP 4 â€” Review */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Artwork preview */}
            {artworkPreview && (
              <div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '10px' }}>Artwork</p>
                <div style={{ position: 'relative', border: '1px solid var(--c-rule)', overflow: 'hidden', aspectRatio: '1/1', maxWidth: '200px' }}>
                  <img src={artworkPreview} alt="Cover art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            )}

            <div style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--c-rule)' }}>
                <p className="f-label" style={{ fontSize: '8px' }}>Submission Summary</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--c-rule)' }}>
                {[
                  { l: 'Artist', v: form.artistName || 'â€”' },
                  { l: 'Artist Type', v: artistType },
                  { l: 'Song', v: form.songTitle || 'â€”' },
                  { l: 'Release', v: form.isSurprise ? 'Surprise Drop' : 'Pre-Release' },
                  { l: 'Edition', v: '1 of 1 â€” Original' },
                  { l: 'Frame Standard', v: 'Museum Grade' },
                  { l: 'Reserve Price', v: form.reservePrice ? `â‚¦${Number(form.reservePrice).toLocaleString()}` : 'â€”' },
                  { l: 'Duration', v: `${form.duration} days` },
                  { l: 'Artwork File', v: artworkFile?.name || 'â€”' },
                  { l: 'Visual Artist', v: form.visualArtistUsername ? `@${form.visualArtistUsername} (${form.visualArtistCommission}%)` : 'None' },
                ].map(r => (
                  <div key={r.l} style={{ background: 'var(--c-bg)', padding: '12px 18px' }}>
                    <p className="f-label" style={{ fontSize: '7px', marginBottom: '3px' }}>{r.l}</p>
                    <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 300 }}>{r.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { k: 'agreeTerms', l: "I agree to COVR's Artist Terms of Service, including the 12% platform commission and fulfilment obligations." },
                { k: 'agreeCopyright', l: "I confirm I own full copyright to this artwork. Submitting AI-generated or third-party art will result in a permanent account ban." },
              ].map(c => (
                <label key={c.k} style={{ display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" checked={(form as unknown as Record<string, boolean>)[c.k]} onChange={e => u(c.k, e.target.checked)} style={{ accentColor: 'var(--c-gold)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>{c.l}</span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(3)} className="btn btn-outline">â† Back</button>
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

