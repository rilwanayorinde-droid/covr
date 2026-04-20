import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Discover', to: '/discover' },
  { label: 'Drops', to: '/drops' },
  { label: 'Artists', to: '/artists' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent', borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
          <Link to="/" className="gold-text select-none" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '30px', letterSpacing: '0.15em', textDecoration: 'none' }}>COVR</Link>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className="font-label transition-colors duration-200" style={{ color: location.pathname === to ? 'var(--off-white)' : 'var(--sub)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="font-label" style={{ color: 'var(--sub)', textDecoration: 'none' }}>Sign In</Link>
            <Link to="/signup" className="btn btn-gold" style={{ padding: '10px 20px' }}>Join</Link>
          </div>
          <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="block h-px w-5 transition-all duration-300" style={{ background: 'var(--off-white)', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span className="block h-px w-5 transition-all duration-300" style={{ background: 'var(--off-white)', opacity: open ? 0 : 1 }} />
            <span className="block h-px w-5 transition-all duration-300" style={{ background: 'var(--off-white)', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </nav>
      </header>
      <div className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-500" style={{ background: 'var(--ink)', opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', paddingTop: '72px' }}>
        <div className="flex flex-col" style={{ borderTop: '1px solid var(--rule)' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} className="font-label px-6 py-5" style={{ color: 'var(--body)', borderBottom: '1px solid var(--rule)', textDecoration: 'none' }}>{label}</Link>
          ))}
          <div className="p-6 flex flex-col gap-4 mt-4">
            <Link to="/login" className="btn btn-ghost w-full justify-center">Sign In</Link>
            <Link to="/signup" className="btn btn-gold w-full justify-center">Create Account</Link>
          </div>
        </div>
      </div>
    </>
  )
}
