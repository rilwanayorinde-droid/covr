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

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>()
  const [bidOpen, setBidOpen] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [bidPlaced, setBidPlaced] = useState(false)
  const [watchlisted, setWatchlisted] = useState(false)
  const [frameTier, setFrameTier] = useState('standard')
  const [activeTab, setActiveTab] = useState<'story' | 'bids' | 'specs'>('story')

  const drop = [...LIVE_DROPS, ...UPCOMING_DROPS].find(d => String(d.id) === id)
  if (!drop) return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--ink)', paddingTop: '72px' }}>
      <div className="text-center">
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '60px', color: 'var(--off-white)' }}>Not found</h1>
        <Link to="/discover" className="btn btn-gold mt-8 inline-flex">Browse Artworks</Link>
      </div>
    </div>
  )

  const isLive = 'live' in drop && drop.live
  const currentBid = 'currentBid' in drop ? drop.currentBid : null
  const endsIn = 'endsIn' in drop ? drop.endsIn : null
  const bids = 'bids' in drop ? drop.bids : 0
  const story = 'story' in drop ? drop.story : ''

  const framePrices: Record<string, string> = { standard: '₦0', premium: '₦25,000', museum: '₦65,000' }
  const frameLabels: Record<string, string> = { standard: 'Standard Frame', premium: 'Premium Wood Frame', museum: 'Museum-Grade Frame' }

  const handleBid = () => {
    setBidPlaced(true)
    setTimeout(() => { setBidOpen(false); setBidPlaced(false); setBidAmount('') }, 2500)
  }

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10">
          <Link to="/drops" className="font-label" style={{ fontSize: '9px', color: 'var(--sub)', textDecoration: 'none' }}>Drops</Link>
          <span style={{ color: 'var(--rule-2)' }}>—</span>
          <span className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>{drop.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT */}
          <div style={{ position: 'sticky', top: '90px', alignSelf: 'start' }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1', border: '1px solid var(--rule)' }}>
              <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              {isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                  <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Bidding Live</span>
                </div>
              )}
              {'spotifyUrl' in drop && drop.spotifyUrl && (
                <a href={drop.spotifyUrl} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2" style={{ background: '#1DB954', textDecoration: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  <span className="font-label" style={{ fontSize: '8px', color: 'white' }}>Preview</span>
                </a>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[{ label: 'Edition', value: drop.edition }, { label: 'Format', value: 'Physical Print' }, { label: 'Bids', value: String(bids) }].map(s => (
                <div key={s.label} className="p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                  <p className="font-label mb-1" style={{ fontSize: '8px', color: 'var(--sub)' }}>{s.label}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">
            <div>
              <Link to="/artist/1" className="label mb-4" style={{ fontSize: '9px', textDecoration: 'none' }}>{drop.artist}</Link>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em', marginBottom: '8px' }}>{drop.title}</h1>
              {'album' in drop && drop.album && <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300 }}>From the album — <em>{drop.album}</em></p>}
            </div>

            {/* Bidding panel */}
            {isLive && currentBid && endsIn ? (
              <div style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)', padding: '24px' }}>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '44px', lineHeight: 1 }}>{currentBid}</p>
                    <p className="font-label mt-1" style={{ fontSize: '8px', color: 'var(--muted)' }}>{bids} bids placed</p>
                  </div>
                  <div><p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Ends In</p><Countdown initial={endsIn} /></div>
                </div>

                {/* Frame tier */}
                <div className="mb-5">
                  <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Framing Option</p>
                  <div className="flex flex-col gap-2">
                    {Object.keys(framePrices).map(tier => (
                      <button key={tier} onClick={() => setFrameTier(tier)}
                        className="flex items-center justify-between px-4 py-3 text-left"
                        style={{ border: '1px solid', borderColor: frameTier === tier ? 'var(--gold)' : 'var(--rule)', background: frameTier === tier ? 'rgba(184,134,11,0.05)' : 'transparent', cursor: 'pointer' }}>
                        <span className="font-label" style={{ fontSize: '9px', color: frameTier === tier ? 'var(--gold-pale)' : 'var(--sub)' }}>{frameLabels[tier]}</span>
                        <span className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>{framePrices[tier] === '₦0' ? 'Included' : '+ ' + framePrices[tier]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setBidOpen(true)} className="btn btn-gold flex-1 justify-center">Place Bid</button>
                  <button onClick={() => setWatchlisted(!watchlisted)} className="btn btn-ghost" style={{ padding: '14px 16px', borderColor: watchlisted ? 'var(--gold)' : 'var(--rule-2)', color: watchlisted ? 'var(--gold)' : 'var(--sub)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={watchlisted ? 'var(--gold)' : 'none'} stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)', padding: '24px' }}>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>{'dropsIn' in drop ? 'Drops In' : 'Status'}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', color: 'var(--gold-pale)' }}>{'dropsIn' in drop ? drop.dropsIn : 'Coming Soon'}</p>
                {'releaseDate' in drop && <p className="font-label mt-2" style={{ fontSize: '9px', color: 'var(--muted)' }}>Release Date: {'releaseDate' in drop ? drop.releaseDate : ''}</p>}
                <button className="btn btn-ghost w-full justify-center mt-4">Notify Me When Live</button>
              </div>
            )}

            {/* Tabs */}
            <div style={{ borderBottom: '1px solid var(--rule)' }}>
              <div className="flex">
                {(['story', 'bids', 'specs'] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={'tab-btn' + (activeTab === t ? ' active' : '')}>
                    {t === 'story' ? 'About' : t === 'bids' ? 'Bid History' : 'Specifications'}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'story' && (
              <div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8 }}>{story || 'This is the original artwork submitted directly by the artist. Every piece on COVR is authenticated and listed exclusively on this platform.'}</p>
              </div>
            )}
            {activeTab === 'bids' && isLive && (
              <div className="flex flex-col gap-2">
                {BID_HISTORY.map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                    <div>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--off-white)', fontWeight: 400 }}>{b.user}</p>
                      <p className="font-label" style={{ fontSize: '8px', color: 'var(--muted)' }}>{b.time}</p>
                    </div>
                    <p className={i === 0 ? 'gold-text' : ''} style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: i === 0 ? undefined : 'var(--body)' }}>{b.amount}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'specs' && (
              <div style={{ border: '1px solid var(--rule)', padding: '24px', background: 'var(--ink-2)' }}>
                <p className="label mb-5" style={{ fontSize: '9px' }}>What You Receive</p>
                {[
                  { icon: '◈', label: 'Original Artwork Print', desc: 'Museum-quality giclée on 300gsm fine art paper' },
                  { icon: '□', label: 'Professional Frame', desc: 'Based on your selected tier — standard to museum-grade' },
                  { icon: '◻', label: 'Certificate of Authenticity', desc: 'Signed by the artist, numbered, registered on COVR' },
                  { icon: '◇', label: 'Insured Delivery', desc: 'Tracked shipping within 14 days of auction close' },
                  { icon: '◆', label: 'Print Size', desc: 'A2 (420mm × 594mm) — ready to hang' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4 mb-5">
                    <span style={{ color: 'var(--gold)', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                    <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--off-white)' }}>{item.label}</p>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BID MODAL */}
      {bidOpen && (
        <div className="modal-overlay" onClick={() => setBidOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            {bidPlaced ? (
              <div className="text-center py-8">
                <p style={{ fontSize: '52px', marginBottom: '16px' }}>◈</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px', color: 'var(--off-white)', marginBottom: '8px' }}>Bid Placed</h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300 }}>You are currently the highest bidder. We will notify you if you are outbid.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', color: 'var(--off-white)' }}>Place a Bid</h3>
                  <button onClick={() => setBidOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--sub)', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}>×</button>
                </div>
                <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Highest Bid</p>
                <p className="gold-text mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px' }}>{currentBid}</p>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Your Bid Amount (₦)</p>
                <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder="Enter amount..." className="input-field" style={{ marginBottom: '12px' }} />
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Framing: {frameLabels[frameTier]} {framePrices[frameTier] !== '₦0' ? '(+ ' + framePrices[frameTier] + ')' : '(Included)'}</p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.6, marginBottom: '24px' }}>
                  Your bid is held in escrow. If you win, full payment is collected within 48 hours. COVR charges a 12% platform fee on the final sale price.
                </p>
                <button onClick={handleBid} className="btn btn-gold w-full justify-center" style={{ opacity: bidAmount ? 1 : 0.5 }}>Confirm Bid — {bidAmount ? '₦' + Number(bidAmount).toLocaleString() : '—'}</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}