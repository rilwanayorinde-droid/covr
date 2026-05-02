import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'Discover', to: '/discover' },
  { label: 'Drops', to: '/drops' },
  { label: 'Artists', to: '/artists' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const location = useLocation()
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  useEffect(() => { setOpen(false); setSearchOpen(false) }, [location])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent', borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
          <Link to="/" className="gold-text select-none" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '30px', letterSpacing: '0.15em', textDecoration: 'none' }}>COVR</Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV.map(({ label, to }) => (
              <Link key={to} to={to} className="font-label transition-colors duration-200"
                style={{ color: location.pathname === to ? 'var(--off-white)' : 'var(--sub)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sub)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--off-white)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--sub)')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4-4" /></svg>
            </button>
            <Link to="/dashboard" className="font-label" style={{ color: 'var(--sub)', textDecoration: 'none' }}>My Bids</Link>
            <Link to="/login" className="font-label" style={{ color: 'var(--sub)', textDecoration: 'none' }}>Sign In</Link>
            <Link to="/signup" className="btn btn-gold" style={{ padding: '10px 20px' }}>Join</Link>
          </div>

          <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ display: 'block', height: '1px', width: '20px', background: 'var(--off-white)', transform: open ? 'translateY(6px) rotate(45deg)' : 'none', transition: 'all 0.3s' }} />
            <span style={{ display: 'block', height: '1px', width: '20px', background: 'var(--off-white)', opacity: open ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', height: '1px', width: '20px', background: 'var(--off-white)', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none', transition: 'all 0.3s' }} />
          </button>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t" style={{ borderColor: 'var(--rule)', background: 'var(--ink-2)', padding: '16px' }}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center gap-3"
              style={{ borderBottom: '1px solid var(--rule-2)', paddingBottom: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--sub)', flexShrink: 0 }}>
                <circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4-4" />
              </svg>
              <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search artworks, artists, albums..."
                style={{ background: 'none', border: 'none', outline: 'none', fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: 'var(--off-white)', fontWeight: 300, width: '100%' }} />
              {searchQ && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--ink-2)', borderBottom: '1px solid var(--rule)', padding: '8px 0', zIndex: 100 }}>
                  <Link to="/discover" style={{ display: 'block', padding: '10px 24px', fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--body)', textDecoration: 'none' }}>
                    Search for "{searchQ}" in all artworks
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-500"
        style={{ background: 'var(--ink)', opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', paddingTop: '72px' }}>
        <div className="flex flex-col" style={{ borderTop: '1px solid var(--rule)' }}>
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} className="font-label px-6 py-5"
              style={{ color: 'var(--body)', borderBottom: '1px solid var(--rule)', textDecoration: 'none' }}>{label}</Link>
          ))}
          <Link to="/dashboard" className="font-label px-6 py-5" style={{ color: 'var(--body)', borderBottom: '1px solid var(--rule)', textDecoration: 'none' }}>My Bids</Link>
          <div className="p-6 flex flex-col gap-4 mt-4">
            <Link to="/login" className="btn btn-ghost w-full justify-center">Sign In</Link>
            <Link to="/signup" className="btn btn-gold w-full justify-center">Create Account</Link>
          </div>
        </div>
      </div>
    </>
  )
}
