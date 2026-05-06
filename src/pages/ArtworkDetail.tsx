import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import Countdown from '../components/Countdown'

const BID_HISTORY = [
  { user: 'collector_44', amount: '₦520,000', time: '2 min ago' },
  { user: 'dr_yusuf', amount: '₦480,000', time: '14 min ago' },
  { user: 'music_lover_9', amount: '₦420,000', time: '31 min ago' },
  { user: 'adaeze_c', amount: '₦350,000', time: '1 hr ago' },
]
const FRAME_TIERS = [
  { id: 'standard', label: 'Standard Frame', desc: 'Simple archival frame', price: '₦0', extra: 'Included' },
  { id: 'premium', label: 'Premium Wood', desc: 'Solid walnut, museum glass', price: '₦25,000', extra: '+₦25,000' },
  { id: 'museum', label: 'Museum Grade', desc: 'Conservation framing, UV protection', price: '₦65,000', extra: '+₦65,000' },
]

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState<'story' | 'bids' | 'specs'>('story')
  const [frame, setFrame] = useState('standard')
  const [bidOpen, setBidOpen] = useState(false)
  const [bidAmt, setBidAmt] = useState('')
  const [bidDone, setBidDone] = useState(false)
  const [watchlisted, setWatchlisted] = useState(false)

  const drop = [...LIVE_DROPS, ...UPCOMING_DROPS].find(d => String(d.id) === id)
  if (!drop) return (
    <main style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="f-display" style={{ fontSize: '48px', color: 'var(--c-ink3)', marginBottom: '24px' }}>Not found</h1>
        <Link to="/discover" className="btn btn-primary">Browse Artworks</Link>
      </div>
    </main>
  )

  const isLive = 'live' in drop && drop.live
  const currentBid = 'currentBid' in drop ? drop.currentBid : null
  const endsIn = 'endsIn' in drop ? drop.endsIn : null
  const bids = 'bids' in drop ? drop.bids : 0
  const story = 'story' in drop ? drop.story : ''

  const handleBid = () => {
    setBidDone(true)
    setTimeout(() => { setBidOpen(false); setBidDone(false); setBidAmt('') }, 2500)
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
          {/* LEFT */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', border: '1px solid var(--c-rule)', background: 'var(--c-bg2)' }}>
              <img src={drop.image} alt={drop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s var(--ease)' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              {isLive && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-live" style={{ background: 'rgba(250,250,247,0.95)', backdropFilter: 'blur(8px)' }}>
                    <span className="live-dot" />Bidding Live
                  </span>
                </div>
              )}
              {'spotifyUrl' in drop && drop.spotifyUrl && (
                <a href={drop.spotifyUrl} target="_blank" rel="noreferrer"
                  style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#1DB954', textDecoration: 'none' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  <span className="f-label" style={{ fontSize: '8px', color: 'white' }}>Preview Track</span>
                </a>
              )}
            </div>
            {/* Mini stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginTop: '1px', background: 'var(--c-rule)' }}>
              {[{ l: 'Edition', v: drop.edition }, { l: 'Format', v: 'Physical Print' }, { l: 'Total Bids', v: String(bids) }].map(s => (
                <div key={s.l} style={{ background: 'var(--c-bg2)', padding: '14px 16px' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>{s.l}</p>
                  <p className="f-display" style={{ fontSize: '15px', color: 'var(--c-ink)' }}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <Link to="/artist/1" className="f-label" style={{ fontSize: '9px', marginBottom: '8px', display: 'block', color: 'var(--c-gold)', textDecoration: 'none' }}>{drop.artist}</Link>
              <h1 className="f-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--c-ink)', lineHeight: 1, marginBottom: '8px' }}>{drop.title}</h1>
              {'album' in drop && drop.album && (
                <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300 }}>From — <em>{drop.album}</em></p>
              )}
            </div>

            {/* Bid panel */}
            {isLive && currentBid && endsIn ? (
              <div style={{ border: '1px solid var(--c-rule)', background: 'var(--c-bg)' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--c-rule)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>Current Bid</p>
                    <p className="f-display gold" style={{ fontSize: '36px', lineHeight: 1 }}>{currentBid}</p>
                    <p className="f-label" style={{ fontSize: '8px', marginTop: '4px' }}>{bids} bids placed</p>
                  </div>
                  <div>
                    <p className="f-label" style={{ fontSize: '8px', marginBottom: '6px' }}>Ends In</p>
                    <Countdown initial={endsIn} />
                  </div>
                </div>

                {/* Frame selector */}
                <div style={{ padding: '20px', borderBottom: '1px solid var(--c-rule)' }}>
                  <p className="f-label" style={{ fontSize: '8px', marginBottom: '12px' }}>Framing Option</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {FRAME_TIERS.map(t => (
                      <button key={t.id} onClick={() => setFrame(t.id)} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 14px', border: '1px solid', cursor: 'pointer', textAlign: 'left',
                        borderColor: frame === t.id ? 'var(--c-gold)' : 'var(--c-rule)',
                        background: frame === t.id ? 'rgba(196,154,40,0.04)' : 'var(--c-bg2)',
                        transition: 'all 0.2s',
                      }}>
                        <div>
                          <p className="f-label" style={{ fontSize: '9px', color: frame === t.id ? 'var(--c-gold)' : 'var(--c-ink)', marginBottom: '2px' }}>{t.label}</p>
                          <p style={{ fontSize: '11px', color: 'var(--c-ink3)', fontWeight: 300 }}>{t.desc}</p>
                        </div>
                        <span className="f-label" style={{ fontSize: '9px', color: 'var(--c-ink3)' }}>{t.extra}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => setBidOpen(true)} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>Place Bid</button>
                  <button onClick={() => setWatchlisted(!watchlisted)} className="btn btn-outline" style={{ padding: '14px 16px', borderColor: watchlisted ? 'var(--c-gold)' : 'var(--c-rule2)', color: watchlisted ? 'var(--c-gold)' : 'var(--c-ink3)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={watchlisted ? 'var(--c-gold)' : 'none'} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ border: '1px solid var(--c-rule)', padding: '24px', background: 'var(--c-bg2)' }}>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>{'dropsIn' in drop ? 'Drops In' : 'Status'}</p>
                <p className="f-display gold" style={{ fontSize: '32px', marginBottom: '16px' }}>{'dropsIn' in drop ? drop.dropsIn : 'Coming Soon'}</p>
                {'releaseDate' in drop && <p className="f-label" style={{ fontSize: '8px', marginBottom: '16px', color: 'var(--c-ink3)' }}>Release: {'releaseDate' in drop ? drop.releaseDate : ''}</p>}
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Notify Me When Live</button>
              </div>
            )}

            {/* Tabs */}
            <div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--c-rule)', marginBottom: '24px' }}>
                {(['story', 'bids', 'specs'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} className={'tab-btn' + (tab === t ? ' active' : '')} style={{ fontSize: '9px' }}>
                    {t === 'story' ? 'About' : t === 'bids' ? 'Bid History' : 'Specifications'}
                  </button>
                ))}
              </div>
              {tab === 'story' && (
                <p style={{ fontSize: '15px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.85 }}>{story || 'Original artwork submitted directly by the artist and authenticated by COVR. The winning bidder receives a physical framed print with a certificate of authenticity.'}</p>
              )}
              {tab === 'bids' && isLive && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                  {BID_HISTORY.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--c-bg)' }}>
                      <div>
                        <p style={{ fontSize: '14px', color: 'var(--c-ink)', fontWeight: 400 }}>{b.user}</p>
                        <p className="f-label" style={{ fontSize: '8px' }}>{b.time}</p>
                      </div>
                      <p className={`f-display ${i === 0 ? 'gold' : ''}`} style={{ fontSize: '18px', color: i === 0 ? undefined : 'var(--c-ink3)' }}>{b.amount}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'specs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--c-rule)' }}>
                  {[
                    { l: 'Print Type', v: 'Museum-quality giclée on 300gsm fine art paper' },
                    { l: 'Print Size', v: 'A2 (420mm × 594mm)' },
                    { l: 'Frame', v: 'Based on selected tier' },
                    { l: 'Certificate', v: 'Signed by artist, numbered, COVR registered' },
                    { l: 'Delivery', v: 'Insured shipping within 14 days of close' },
                    { l: 'Platform Fee', v: '12% of final sale price' },
                  ].map(s => (
                    <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--c-bg)', gap: '16px' }}>
                      <p className="f-label" style={{ fontSize: '9px', flexShrink: 0 }}>{s.l}</p>
                      <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, textAlign: 'right' }}>{s.v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BID MODAL */}
      {bidOpen && (
        <div className="modal-bg" onClick={() => setBidOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {bidDone ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(196,154,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 className="f-display" style={{ fontSize: '32px', color: 'var(--c-ink)', marginBottom: '8px' }}>Bid Placed</h3>
                <p style={{ fontSize: '14px', color: 'var(--c-ink3)', fontWeight: 300 }}>You are currently the highest bidder. We will notify you if outbid.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 className="f-display" style={{ fontSize: '28px', color: 'var(--c-ink)' }}>Place a Bid</h3>
                  <button onClick={() => setBidOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: 'var(--c-ink3)', cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '4px' }}>Current Highest Bid</p>
                <p className="f-display gold" style={{ fontSize: '32px', marginBottom: '24px' }}>{currentBid}</p>
                <p className="f-label" style={{ fontSize: '8px', marginBottom: '8px' }}>Your Bid Amount (₦)</p>
                <input type="number" value={bidAmt} onChange={e => setBidAmt(e.target.value)} placeholder="Enter amount..." className="input" style={{ marginBottom: '8px' }} />
                <p className="f-label" style={{ fontSize: '8px', color: 'var(--c-gold)', marginBottom: '20px' }}>Frame: {FRAME_TIERS.find(f => f.id === frame)?.label} — {FRAME_TIERS.find(f => f.id === frame)?.extra}</p>
                <p style={{ fontSize: '12px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.6, marginBottom: '20px' }}>Your bid is held in escrow. COVR charges 12% on the final sale price. Payment is collected within 48hrs of winning.</p>
                <button onClick={handleBid} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: bidAmt ? 1 : 0.5 }}>
                  Confirm Bid {bidAmt ? `— ₦${Number(bidAmt).toLocaleString()}` : ''}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile layout fix */}
      <style>{`@media(max-width:768px){.detail-grid{grid-template-columns:1fr!important;gap:32px!important;}}`}</style>
    </main>
  )
}
