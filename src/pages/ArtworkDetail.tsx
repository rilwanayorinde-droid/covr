import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import Countdown from '../components/Countdown'

// Simulated live bid feed
const INITIAL_BIDS = [
  { user: 'collector_44', amount: 520000, time: '2 min ago' },
  { user: 'dr_yusuf', amount: 480000, time: '14 min ago' },
  { user: 'music_lover_9', amount: 420000, time: '31 min ago' },
  { user: 'adaeze_c', amount: 350000, time: '1 hr ago' },
  { user: 'tunde_b', amount: 280000, time: '2 hr ago' },
]

function fmt(n: number) {
  return '₦' + n.toLocaleString()
}

function DeliveryForm({ onSubmit }: { onSubmit: (data: DeliveryData) => void }) {
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', address: '', city: '',
    state: '', country: 'Nigeria', postalCode: '', notes: '',
  })
  const u = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.fullName && form.phone && form.address && form.city && form.state

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(45,106,79,0.1)', border: '1px solid rgba(45,106,79,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-green)' }}>You won this auction</p>
        </div>
        <h3 className="f-display" style={{ fontSize: '26px', color: 'var(--c-ink)' }}>Delivery Details</h3>
        <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, marginTop: '6px', lineHeight: 1.6 }}>
          Your artwork will be professionally printed, framed to museum standard, and shipped to this address within 14 days.
        </p>
      </div>

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Full Name *</p>
            <input value={form.fullName} onChange={e => u('fullName', e.target.value)} placeholder="Your full name" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
          </div>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Phone Number *</p>
            <input value={form.phone} onChange={e => u('phone', e.target.value)} placeholder="+234 800 000 0000" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
          </div>
        </div>
        <div>
          <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Email Address</p>
          <input type="email" value={form.email} onChange={e => u('email', e.target.value)} placeholder="For delivery updates" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
        </div>
        <div>
          <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Street Address *</p>
          <input value={form.address} onChange={e => u('address', e.target.value)} placeholder="House number, street name" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>City *</p>
            <input value={form.city} onChange={e => u('city', e.target.value)} placeholder="Lagos" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
          </div>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>State *</p>
            <input value={form.state} onChange={e => u('state', e.target.value)} placeholder="Lagos State" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
          </div>
          <div>
            <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Postal Code</p>
            <input value={form.postalCode} onChange={e => u('postalCode', e.target.value)} placeholder="100001" className="input" style={{ fontSize: '14px', padding: '11px 14px' }} />
          </div>
        </div>
        <div>
          <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Country</p>
          <select value={form.country} onChange={e => u('country', e.target.value)} className="input" style={{ fontSize: '14px', padding: '11px 14px', cursor: 'pointer' }}>
            {['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'United States', 'Canada', 'Other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <p className="f-label" style={{ fontSize: '8px', marginBottom: '7px' }}>Delivery Notes (optional)</p>
          <textarea value={form.notes} onChange={e => u('notes', e.target.value)} placeholder="Apartment number, gate code, landmark, special instructions..." rows={3} className="input" style={{ resize: 'vertical', fontSize: '14px', padding: '11px 14px', lineHeight: 1.6 }} />
        </div>

        {/* Frame spec reminder */}
        <div style={{ padding: '16px 18px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '2px' }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          <div>
            <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)', marginBottom: '4px' }}>Premium Frame — Included</p>
            <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6 }}>Museum-grade archival frame · UV-protective glass · Certificate of authenticity · A2 giclée print on 300gsm fine art paper. Fully insured during transit.</p>
          </div>
        </div>

        <button
          onClick={() => valid && onSubmit(form)}
          className="btn btn-primary"
          style={{ justifyContent: 'center', padding: '15px', opacity: valid ? 1 : 0.4, marginTop: '4px', fontSize: '11px' }}
        >
          Confirm Delivery Address
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300, textAlign: 'center', lineHeight: 1.6 }}>
          Payment of {fmt(520000)} will be collected within 48 hours. Our team will contact you to confirm dispatch.
        </p>
      </div>
    </div>
  )
}

interface DeliveryData {
  fullName: string; phone: string; email: string; address: string
  city: string; state: string; country: string; postalCode: string; notes: string
}

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>()
  const [bidOpen, setBidOpen] = useState(false)
  const [bidAmt, setBidAmt] = useState('')
  const [bids, setBids] = useState(INITIAL_BIDS)
  const [currentBidAmt, setCurrentBidAmt] = useState(520000)
  const [bidStep, setBidStep] = useState<'input' | 'confirm' | 'done'>('input')
  const [watchlisted, setWatchlisted] = useState(false)
  const [tab, setTab] = useState<'story' | 'bids' | 'specs'>('story')
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [deliverySubmitted, setDeliverySubmitted] = useState(false)
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null)
  const [newBidFlash, setNewBidFlash] = useState(false)
  const bidInputRef = useRef<HTMLInputElement>(null)

  const drop = [...LIVE_DROPS, ...UPCOMING_DROPS].find(d => String(d.id) === id)

  // Simulate live bid updates every 25-40 seconds
  useEffect(() => {
    if (auctionEnded) return
    const names = ['fan_lagos', 'vinyl_collector', 'art_buyer_ng', 'sound_archive']
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 30000) + 10000
      const newAmt = currentBidAmt + increment
      const newBid = {
        user: names[Math.floor(Math.random() * names.length)],
        amount: newAmt,
        time: 'just now',
      }
      setCurrentBidAmt(newAmt)
      setBids(prev => [newBid, ...prev.slice(0, 7)])
      setNewBidFlash(true)
      setTimeout(() => setNewBidFlash(false), 2000)
    }, Math.random() * 15000 + 25000)
    return () => clearInterval(interval)
  }, [currentBidAmt, auctionEnded])

  if (!drop) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="f-display" style={{ fontSize: '48px', color: 'var(--c-ink3)', marginBottom: '24px' }}>Not found</h1>
        <Link to="/discover" className="btn btn-primary">Browse Artworks</Link>
      </div>
    </main>
  )

  const isLive = 'live' in drop && drop.live
  const endsIn = 'endsIn' in drop ? drop.endsIn : null
  const story = 'story' in drop ? drop.story : ''

  const minBid = currentBidAmt + 5000
  const bidAmtNum = Number(bidAmt)
  const bidValid = bidAmtNum >= minBid

  const handlePlaceBid = () => {
    if (!bidValid) return
    const newBid = { user: 'you', amount: bidAmtNum, time: 'just now' }
    setCurrentBidAmt(bidAmtNum)
    setBids(prev => [newBid, ...prev.slice(0, 7)])
    setNewBidFlash(true)
    setTimeout(() => setNewBidFlash(false), 2000)
    setBidStep('done')
    setTimeout(() => { setBidOpen(false); setBidStep('input'); setBidAmt('') }, 2200)
  }

  const handleDeliverySubmit = (data: DeliveryData) => {
    setDeliveryData(data)
    setDeliverySubmitted(true)
  }

  return (
    <main style={{ paddingTop: '64px', background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px' }}>
          <Link to="/drops" className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink3)' }}>Drops</Link>
          <span style={{ color: 'var(--c-rule2)' }}>›</span>
          <span className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink)' }}>{drop.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* LEFT — image */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s var(--ease)' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              {isLive && !auctionEnded && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-live" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)' }}>
                    <span className="live-dot" />Bidding Live
                  </span>
                </div>
              )}
              {auctionEnded && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-green" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)' }}>
                    Auction Closed
                  </span>
                </div>
              )}
            </div>

            {/* Frame spec */}
            <div style={{ marginTop: '1px', padding: '16px 20px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="1.5" style={{ flexShrink: 0 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              <div>
                <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)', marginBottom: '2px' }}>Premium Frame — Standard for All Winners</p>
                <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300 }}>Museum-grade archival frame · UV glass · A2 giclée print · Certificate of authenticity</p>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginTop: '1px', background: 'var(--c-rule)' }}>
              {[{ l: 'Edition', v: drop.edition }, { l: 'Total Bids', v: String(bids.length) }, { l: 'Unique Bidders', v: String(new Set(bids.map(b => b.user)).size) }].map(s => (
                <div key={s.l} style={{ background: 'var(--c-bg2)', padding: '14px 16px' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{s.l}</p>
                  <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <Link to="/artist/1" className="f-label" style={{ fontSize: '9px', color: 'var(--c-gold)', marginBottom: '10px', display: 'block' }}>{drop.artist}</Link>
              <h1 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)', lineHeight: 1, marginBottom: '8px' }}>{drop.title}</h1>
              {'album' in drop && drop.album && (
                <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300 }}>From — <em>{drop.album}</em></p>
              )}
            </div>

            {/* AUCTION ENDED — show delivery form or confirmation */}
            {auctionEnded ? (
              <div style={{ border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
                {deliverySubmitted && deliveryData ? (
                  <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(45,106,79,0.1)', border: '1px solid rgba(45,106,79,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                      </div>
                      <div>
                        <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-green)', marginBottom: '2px' }}>Delivery confirmed</p>
                        <h3 className="f-display" style={{ fontSize: '22px', color: 'var(--c-ink)' }}>We are on it.</h3>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)', marginBottom: '20px' }}>
                      {[
                        { l: 'Recipient', v: deliveryData.fullName },
                        { l: 'Address', v: `${deliveryData.address}, ${deliveryData.city}, ${deliveryData.state}` },
                        { l: 'Country', v: deliveryData.country },
                        { l: 'Phone', v: deliveryData.phone },
                        ...(deliveryData.notes ? [{ l: 'Notes', v: deliveryData.notes }] : []),
                      ].map(r => (
                        <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--c-bg2)', gap: '16px' }}>
                          <p className="f-label" style={{ fontSize: '8px', flexShrink: 0 }}>{r.l}</p>
                          <p style={{ fontSize: '13px', color: 'var(--c-ink)', fontWeight: 300, textAlign: 'right' }}>{r.v}</p>
                        </div>
                      ))}
                    </div>
                    {/* Timeline */}
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '16px' }}>What happens next</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      {[
                        { label: 'Payment Collected', desc: 'Within 48 hours', done: true },
                        { label: 'Artwork Approved for Print', desc: 'Quality verified by COVR team', done: true },
                        { label: 'Professionally Printed & Framed', desc: '3–5 business days', done: false },
                        { label: 'Shipped with Tracking', desc: 'Insured delivery to your address', done: false },
                        { label: 'Delivered', desc: 'Within 14 days total', done: false },
                      ].map((stage, i, arr) => (
                        <div key={stage.label} style={{ display: 'flex', gap: '14px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid', borderColor: stage.done ? 'var(--c-green)' : 'var(--c-rule2)', background: stage.done ? 'var(--c-green)' : 'var(--c-bg)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                              {stage.done && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                            </div>
                            {i < arr.length - 1 && <div style={{ width: '1px', flex: 1, background: stage.done ? 'var(--c-green)' : 'var(--c-rule)', margin: '3px 0' }} />}
                          </div>
                          <div style={{ paddingBottom: i < arr.length - 1 ? '16px' : '0' }}>
                            <p style={{ fontSize: '13px', color: stage.done ? 'var(--c-ink)' : 'var(--c-ink3)', fontWeight: stage.done ? 400 : 300 }}>{stage.label}</p>
                            <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{stage.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <DeliveryForm onSubmit={handleDeliverySubmit} />
                )}
              </div>
            ) : isLive && endsIn ? (
              /* LIVE BIDDING PANEL */
              <div style={{ border: '1px solid var(--c-rule)', overflow: 'hidden' }}>
                {/* Current bid display */}
                <div style={{
                  padding: '24px 28px',
                  borderBottom: '1px solid var(--c-rule)',
                  background: newBidFlash ? 'rgba(196,154,40,0.06)' : 'var(--c-bg)',
                  transition: 'background 0.5s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>
                        {newBidFlash ? '⚡ New bid placed!' : 'Current Highest Bid'}
                      </p>
                      <p className="f-display gold" style={{ fontSize: '40px', lineHeight: 1, transition: 'all 0.4s' }}>
                        {fmt(currentBidAmt)}
                      </p>
                      <p className="f-label" style={{ fontSize: '8px', marginTop: '4px' }}>{bids.length} bids · {new Set(bids.map(b => b.user)).size} bidders</p>
                    </div>
                    <div>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>Ends In</p>
                      <Countdown initial={endsIn} onEnd={() => setAuctionEnded(true)} />
                    </div>
                  </div>
                </div>

                {/* Min bid hint */}
                <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p className="f-label" style={{ fontSize: '8px' }}>Minimum next bid</p>
                  <p className="f-display" style={{ fontSize: '16px', color: 'var(--c-ink)' }}>{fmt(minBid)}</p>
                </div>

                {/* Actions */}
                <div style={{ padding: '20px 28px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setBidOpen(true); setTimeout(() => bidInputRef.current?.focus(), 100) }}
                    className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>
                    Place Bid
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                  <button onClick={() => setWatchlisted(!watchlisted)}
                    className="btn btn-outline" style={{ padding: '14px 16px', borderColor: watchlisted ? 'var(--c-gold)' : 'var(--c-rule2)', color: watchlisted ? 'var(--c-gold)' : 'var(--c-ink3)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={watchlisted ? 'var(--c-gold)' : 'none'} stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Simulate end for demo */}
                <div style={{ padding: '0 28px 16px' }}>
                  <button onClick={() => setAuctionEnded(true)} className="btn btn-ghost" style={{ fontSize: '9px', width: '100%', justifyContent: 'center', color: 'var(--c-ink3)' }}>
                    [Demo] Simulate Auction End →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ border: '1px solid var(--c-rule)', padding: '24px', background: 'var(--c-bg2)' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>{'dropsIn' in drop ? 'Drops In' : 'Status'}</p>
                <p className="f-display gold" style={{ fontSize: '32px', marginBottom: '16px' }}>{'dropsIn' in drop ? drop.dropsIn : 'Coming Soon'}</p>
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Notify Me When Live</button>
              </div>
            )}

            {/* Tabs */}
            {!auctionEnded && (
              <div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--c-rule)', marginBottom: '24px' }}>
                  {(['story', 'bids', 'specs'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)} className={'tab-btn' + (tab === t ? ' active' : '')} style={{ fontSize: '9px' }}>
                      {t === 'story' ? 'About' : t === 'bids' ? `Bid History (${bids.length})` : 'What You Receive'}
                    </button>
                  ))}
                </div>

                {tab === 'story' && (
                  <p style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.85 }}>{story || 'Original artwork submitted directly by the artist and authenticated by COVR.'}</p>
                )}

                {tab === 'bids' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                    {bids.map((b, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px', background: i === 0 && newBidFlash ? 'rgba(196,154,40,0.06)' : 'var(--c-bg)',
                        transition: 'background 0.5s',
                      }}>
                        <div>
                          <p style={{ fontSize: '14px', color: b.user === 'you' ? 'var(--c-gold)' : 'var(--c-ink)', fontWeight: b.user === 'you' ? 500 : 400 }}>
                            {b.user === 'you' ? 'You ✓' : b.user}
                          </p>
                          <p className="f-label" style={{ fontSize: '8px' }}>{b.time}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p className={`f-display ${i === 0 ? 'gold' : ''}`} style={{ fontSize: '18px', color: i === 0 ? undefined : 'var(--c-ink3)' }}>{fmt(b.amount)}</p>
                          {i === 0 && <p className="f-label" style={{ fontSize: '7px', color: 'var(--c-green)' }}>Highest bid</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'specs' && (
                  <div>
                    <div style={{ padding: '20px 24px', background: 'rgba(139,105,20,0.04)', border: '1px solid rgba(139,105,20,0.2)', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '1px' }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                      <div>
                        <p className="f-label" style={{ fontSize: '9px', color: 'var(--c-gold)', marginBottom: '4px' }}>One Standard. Museum Grade.</p>
                        <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7 }}>Every COVR winner receives the same premium framing. There are no tiers. This is the standard.</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                      {[
                        { l: 'Print Type', v: 'Museum-quality giclée on 300gsm Hahnemühle fine art paper' },
                        { l: 'Print Size', v: 'A2 (420 × 594mm) — professionally produced' },
                        { l: 'Frame', v: 'Solid wood, archival construction, white museum mat board' },
                        { l: 'Glass', v: 'UV-protective anti-reflective archival glass' },
                        { l: 'Certificate', v: 'Signed by the artist, numbered, registered on COVR' },
                        { l: 'Delivery', v: 'Fully insured, tracked shipping within 14 days of auction close' },
                        { l: 'Platform Fee', v: '12% of final sale price (deducted from payment)' },
                      ].map(s => (
                        <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--c-bg)', gap: '20px', alignItems: 'flex-start' }}>
                          <p className="f-label" style={{ fontSize: '8px', flexShrink: 0 }}>{s.l}</p>
                          <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, textAlign: 'right', lineHeight: 1.5 }}>{s.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BID MODAL */}
      {bidOpen && (
        <div className="modal-bg" onClick={() => { setBidOpen(false); setBidStep('input') }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ padding: '0', overflow: 'hidden' }}>
            {bidStep === 'done' ? (
              <div style={{ padding: '48px 36px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(45,106,79,0.1)', border: '1px solid rgba(45,106,79,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 className="f-display" style={{ fontSize: '32px', color: 'var(--c-ink)', marginBottom: '8px' }}>Bid Placed</h3>
                <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6 }}>
                  You are the highest bidder at <strong>{fmt(bidAmtNum)}</strong>.<br />We will notify you immediately if you are outbid.
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--c-rule)', background: 'var(--c-bg2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="f-display" style={{ fontSize: '24px', color: 'var(--c-ink)' }}>Place a Bid</h3>
                  <button onClick={() => { setBidOpen(false); setBidStep('input') }} style={{ background: 'none', border: 'none', fontSize: '22px', color: 'var(--c-ink3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>

                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Current bid */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '16px', background: 'var(--c-bg2)', border: '1px solid var(--c-rule)' }}>
                    <div>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>Current Highest Bid</p>
                      <p className="f-display gold" style={{ fontSize: '28px' }}>{fmt(currentBidAmt)}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>Minimum Bid</p>
                      <p className="f-display" style={{ fontSize: '20px', color: 'var(--c-ink)' }}>{fmt(minBid)}</p>
                    </div>
                  </div>

                  {/* Quick bid buttons */}
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '10px' }}>Quick Bid</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                      {[minBid, minBid + 25000, minBid + 50000].map(amt => (
                        <button key={amt} onClick={() => setBidAmt(String(amt))}
                          className="btn btn-outline btn-sm"
                          style={{ justifyContent: 'center', fontSize: '10px', borderColor: bidAmtNum === amt ? 'var(--c-gold)' : 'var(--c-rule2)', color: bidAmtNum === amt ? 'var(--c-gold)' : 'var(--c-ink3)' }}>
                          {fmt(amt)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom amount */}
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Or Enter Custom Amount (₦)</p>
                    <input
                      ref={bidInputRef}
                      type="number"
                      value={bidAmt}
                      onChange={e => setBidAmt(e.target.value)}
                      placeholder={`Min. ${fmt(minBid)}`}
                      className="input"
                      style={{ fontSize: '18px', padding: '14px 16px', borderColor: bidAmt && !bidValid ? 'var(--c-live)' : 'var(--c-rule2)' }}
                    />
                    {bidAmt && !bidValid && (
                      <p style={{ fontSize: '11px', color: 'var(--c-live)', marginTop: '6px', fontWeight: 300 }}>
                        Minimum bid is {fmt(minBid)}
                      </p>
                    )}
                    {bidAmt && bidValid && (
                      <p style={{ fontSize: '11px', color: 'var(--c-green)', marginTop: '6px', fontWeight: 300 }}>
                        ✓ Valid bid — you will be the highest bidder
                      </p>
                    )}
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6 }}>
                    Your bid is held in escrow. If you win, payment is collected within 48 hours. COVR charges 12% commission on the final sale price.
                  </p>

                  <button onClick={handlePlaceBid} className="btn btn-primary"
                    style={{ justifyContent: 'center', padding: '15px', opacity: bidValid ? 1 : 0.4 }}>
                    {bidValid ? `Confirm Bid — ${fmt(bidAmtNum)}` : 'Enter a valid bid amount'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .detail-grid{grid-template-columns:1fr!important;gap:32px!important;}
        }
      `}</style>
    </main>
  )
}
