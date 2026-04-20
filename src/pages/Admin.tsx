import { useState } from 'react'

type AdminTab = 'pending' | 'listings' | 'transactions'
const PENDING = [
  { id: 1, title: 'Solar Drift', artist: 'Neon Folklore', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80', submitted: '2 hours ago', edition: '1 of 1', notes: 'Single cover for upcoming Afrobeats release' },
  { id: 2, title: 'Amber Wave', artist: 'Kemi Osei', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', submitted: '5 hours ago', edition: 'Ed. 1/3', notes: 'Limited edition album artwork' },
  { id: 3, title: 'Frequency', artist: 'REMA Arts', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80', submitted: '1 day ago', edition: '1 of 1', notes: 'Cover art for surprise drop' },
]
const LISTINGS = [
  { id: 1, title: 'Invisible Cities', artist: 'SOLIS', status: 'live', currentBid: '520,000', bids: 7 },
  { id: 2, title: 'Still Water', artist: 'Amara', status: 'live', currentBid: '185,000', bids: 3 },
  { id: 3, title: 'Afterglow', artist: 'SOLIS', status: 'upcoming', currentBid: '', bids: 0 },
]
const TRANSACTIONS = [
  { id: 101, title: 'Neon Residue', artist: 'SOLIS', buyer: 'dr.yusuf@email.com', amount: '640,000', date: 'Apr 10, 2025', status: 'delivered' },
  { id: 102, title: 'Coastal Static', artist: 'Amara', buyer: 'collector@mail.com', amount: '210,000', date: 'Apr 3, 2025', status: 'in_transit' },
]

export default function Admin() {
  const [tab, setTab] = useState<AdminTab>('pending')
  const [approved, setApproved] = useState<number[]>([])
  const [rejected, setRejected] = useState<number[]>([])
  const tabs: { key: AdminTab; label: string }[] = [{ key: 'pending', label: 'Pending Approval' }, { key: 'listings', label: 'Manage Listings' }, { key: 'transactions', label: 'Transactions' }]
  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--ink)' }}>
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
          <p className="label mb-3" style={{ fontSize: '9px', color: 'var(--live)' }}>Admin Panel</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, color: 'var(--off-white)' }}>Dashboard</h1>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-0 grid grid-cols-3 md:grid-cols-4" style={{ borderTop: '1px solid var(--rule)' }}>
          {[{ label: 'Pending', value: String(PENDING.length - approved.length - rejected.length), alert: true }, { label: 'Live Drops', value: '3' }, { label: 'Revenue', value: '938K' }, { label: 'Bidders', value: '48' }].map((s, i) => (
            <div key={s.label} className="py-5 pr-6" style={{ borderRight: i < 3 ? '1px solid var(--rule)' : 'none', paddingLeft: i > 0 ? '24px' : '0' }}>
              <p className="font-label mb-1" style={{ fontSize: '9px', color: s.alert ? 'var(--live)' : 'var(--sub)' }}>{s.label}</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '28px', color: s.alert ? 'var(--live)' : 'var(--gold-pale)' }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className="font-label py-4 px-6" style={{ fontSize: '9px', color: tab === t.key ? 'var(--off-white)' : 'var(--sub)', background: 'none', border: 'none', cursor: 'pointer', borderBottom: tab === t.key ? '1px solid var(--gold)' : '1px solid transparent', marginBottom: '-1px' }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {tab === 'pending' && (
          <div className="flex flex-col gap-5">
            {PENDING.map(item => {
              const isApproved = approved.includes(item.id)
              const isRejected = rejected.includes(item.id)
              return (
                <div key={item.id} className="grid md:grid-cols-4 gap-6 items-center p-5" style={{ border: '1px solid', borderColor: isApproved ? 'var(--gold)' : isRejected ? 'var(--live)' : 'var(--rule)', background: 'var(--ink-2)', opacity: isApproved || isRejected ? 0.6 : 1 }}>
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} style={{ width: '72px', height: '72px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--rule)' }} />
                    <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{item.artist}</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{item.title}</p><p className="font-label mt-1" style={{ fontSize: '8px', color: 'var(--muted)' }}>{item.edition}</p></div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>Notes</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--body)', fontWeight: 300 }}>{item.notes}</p>
                    <p className="font-label mt-2" style={{ fontSize: '8px', color: 'var(--muted)' }}>Submitted {item.submitted}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {isApproved ? <span className="font-label text-center py-3" style={{ fontSize: '9px', color: 'var(--gold)', border: '1px solid var(--gold)' }}>Approved</span>
                      : isRejected ? <span className="font-label text-center py-3" style={{ fontSize: '9px', color: 'var(--live)', border: '1px solid var(--live)' }}>Rejected</span>
                      : <><button onClick={() => setApproved(p => [...p, item.id])} className="btn btn-gold w-full justify-center" style={{ fontSize: '9px' }}>Approve</button><button onClick={() => setRejected(p => [...p, item.id])} className="btn btn-ghost w-full justify-center" style={{ fontSize: '9px', color: 'var(--live)', borderColor: 'var(--live)' }}>Reject</button></>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {tab === 'listings' && (
          <div className="flex flex-col gap-3">
            {LISTINGS.map(l => (
              <div key={l.id} className="grid md:grid-cols-5 gap-4 items-center p-5" style={{ border: '1px solid var(--rule)', background: 'var(--ink-2)' }}>
                <div className="md:col-span-2"><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{l.artist}</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--off-white)' }}>{l.title}</p></div>
                <span className="font-label px-3 py-1.5 inline-block" style={{ fontSize: '9px', color: l.status === 'live' ? '#FF3B30' : 'var(--sub)', border: '1px solid', borderColor: l.status === 'live' ? '#FF3B30' : 'var(--rule-2)' }}>{l.status === 'live' ? 'Live' : 'Upcoming'}</span>
                <div><p className="font-label mb-1" style={{ fontSize: '9px', color: 'var(--sub)' }}>{l.bids} bids</p><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '20px', color: 'var(--gold-pale)' }}>{l.currentBid}</p></div>
                <div className="flex gap-2 justify-end"><button className="btn btn-ghost" style={{ fontSize: '9px', padding: '8px 14px' }}>Edit</button><button className="btn btn-ghost" style={{ fontSize: '9px', padding: '8px 14px', color: 'var(--live)', borderColor: 'var(--live)' }}>Remove</button></div>
              </div>
            ))}
          </div>
        )}
        {tab === 'transactions' && (
          <div style={{ border: '1px solid var(--rule)', overflow: 'hidden' }}>
            <div className="grid grid-cols-5 gap-4 px-5 py-3" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-3)' }}>
              {['Artwork', 'Buyer', 'Amount', 'Date', 'Status'].map(h => <p key={h} className="font-label" style={{ fontSize: '9px', color: 'var(--sub)' }}>{h}</p>)}
            </div>
            {TRANSACTIONS.map((tx, i) => (
              <div key={tx.id} className="grid grid-cols-5 gap-4 items-center px-5 py-4" style={{ borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid var(--rule)' : 'none', background: 'var(--ink-2)' }}>
                <div><p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px', color: 'var(--off-white)' }}>{tx.title}</p><p className="font-label" style={{ fontSize: '8px', color: 'var(--sub)' }}>{tx.artist}</p></div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: 'var(--body)', fontWeight: 300 }}>{tx.buyer}</p>
                <p className="gold-text" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '18px' }}>{tx.amount}</p>
                <p className="font-label" style={{ fontSize: '9px', color: 'var(--muted)' }}>{tx.date}</p>
                <span className="font-label" style={{ fontSize: '9px', color: tx.status === 'delivered' ? 'var(--gold-pale)' : 'var(--sub)', padding: '4px 10px', border: '1px solid', borderColor: tx.status === 'delivered' ? 'var(--gold)' : 'var(--rule-2)', display: 'inline-block' }}>{tx.status === 'delivered' ? 'Delivered' : 'In Transit'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
