import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LIVE_DROPS, UPCOMING_DROPS } from '../data'
import Countdown from '../components/Countdown'

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>()
  const [bidOpen, setBidOpen] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [bidPlaced, setBidPlaced] = useState(false)
  const [watchlisted, setWatchlisted] = useState(false)
  const drop = [...LIVE_DROPS, ...UPCOMING_DROPS].find(d => String(d.id) === id)
  if (!drop) return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--ink)', paddingTop: '72px' }}>
      <div className="text-center">
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '60px', color: 'var(--off-white)' }}>Not found</h1>
        <Link to="/discover" className="btn btn-gold mt-8 inline-flex">Browse</Link>
      </div>
    </div>
  )
  const isLive = 'live' in drop && drop.live
  const currentBid = 'currentBid' in drop ? drop.currentBid : null
  const endsIn = 'endsIn' in drop ? drop.endsIn : null
  const handleBid = () => { setBidPlaced(true); setTimeout(() => { setBidOpen(false); setBidPlaced(false); setBidAmount('') }, 2000) }
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Link to="/drops" className="font-label" style={{ fontSize: '9px', color: 'var(--sub)', textDecoration: 'none' }}>Drops</Link>
          <span style={{ color: 'var(--rule-2)' }}></span>
          <span className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>{drop.title}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1', border: '1px solid var(--rule)' }}>
              <img src={drop.image} alt={drop.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              {isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)' }}>
                  <div className="live-pulse" /><span className="font-label" style={{ fontSize: '9px', color: '#FF3B30' }}>Bidding Live</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Edition</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{drop.edition}</p>
              </div>
              <div className="p-4" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Format</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>Physical Frame</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <p className="label mb-4" style={{ fontSize: '9px' }}>{drop.artist}</p>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, color: 'var(--off-white)', letterSpacing: '-0.02em', marginBottom: '8px' }}>{drop.title}</h1>
              {'album' in drop && drop.album && <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300 }}>From  {drop.album}</p>}
            </div>
            {isLive && currentBid && endsIn && (
              <div style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)', padding: '24px' }}>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p>
                    <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '42px', lineHeight: 1 }}>{currentBid}</p>
                  </div>
                  <div><p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Ends In</p><Countdown initial={endsIn} /></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setBidOpen(true)} className="btn btn-gold flex-1 justify-center">Place Bid</button>
                  <button onClick={() => setWatchlisted(!watchlisted)} className="btn btn-ghost" style={{ padding: '14px 16px', borderColor: watchlisted ? 'var(--gold)' : 'var(--rule-2)', color: watchlisted ? 'var(--gold)' : 'var(--sub)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={watchlisted ? 'var(--gold)' : 'none'} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                  </button>
                </div>
              </div>
            )}
            {!isLive && (
              <div style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)', padding: '24px' }}>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Drops In</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '32px', color: 'var(--gold-pale)' }}>{'dropsIn' in drop ? drop.dropsIn : 'Soon'}</p>
                <button className="btn btn-ghost w-full justify-center mt-4">Notify Me</button>
              </div>
            )}
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '32px' }}>
              <p className="label mb-6" style={{ fontSize: '9px' }}>About This Piece</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.8 }}>Original artwork submitted directly by the artist, reviewed by our curation team, and listed exclusively on COVR. The winning bidder receives a museum-quality physical print, professionally framed and delivered within 14 days alongside a certificate of authenticity.</p>
            </div>
            <div style={{ border: '1px solid var(--rule)', padding: '24px', background: 'var(--ink-2)' }}>
              <p className="label mb-5" style={{ fontSize: '9px' }}>What You Receive</p>
              {[{ icon: '', label: 'Original Artwork Print', desc: 'Museum-quality giclée on fine art paper' }, { icon: '', label: 'Professional Frame', desc: 'Solid wood, archival glass, ready to hang' }, { icon: '', label: 'Certificate of Authenticity', desc: 'Signed by the artist, numbered and registered' }, { icon: '', label: 'Delivery', desc: 'Insured shipping within 14 days of close' }].map(item => (
                <div key={item.label} className="flex items-start gap-4 mb-4">
                  <span style={{ color: 'var(--gold)', fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                  <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--off-white)' }}>{item.label}</p><p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--sub)', fontWeight: 300 }}>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {bidOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} onClick={() => setBidOpen(false)}>
          <div style={{ background: 'var(--ink-2)', border: '1px solid var(--rule)', padding: '40px', width: '100%', maxWidth: '440px', margin: '0 16px' }} onClick={e => e.stopPropagation()}>
            {bidPlaced ? (
              <div className="text-center py-8">
                <p style={{ fontSize: '48px', marginBottom: '16px' }}></p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '32px', color: 'var(--off-white)', marginBottom: '8px' }}>Bid Placed</h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300 }}>You are the highest bidder.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', color: 'var(--off-white)' }}>Place a Bid</h3>
                  <button onClick={() => setBidOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--sub)', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}></button>
                </div>
                <p className="font-label mb-2" style={{ fontSize: '9px', color: 'var(--sub)' }}>Current Bid</p>
                <p className="gold-text mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '36px' }}>{currentBid}</p>
                <p className="font-label mb-3" style={{ fontSize: '9px', color: 'var(--sub)' }}>Your Bid</p>
                <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder="Enter amount..." style={{ width: '100%', background: 'var(--ink)', border: '1px solid var(--rule-2)', padding: '14px 16px', fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: 'var(--off-white)', outline: 'none', fontWeight: 300, marginBottom: '24px' }} />
                <button onClick={handleBid} className="btn btn-gold w-full justify-center" style={{ opacity: bidAmount ? 1 : 0.5 }}>Confirm Bid</button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
