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
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => setOpen(false), [location])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(250,250,247,0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--c-rule)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.4s var(--ease)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link to="/" className="f-display" style={{ fontSize: '22px', letterSpacing: '0.12em', color: 'var(--c-ink)' }}>
            COVR
          </Link>

          {/* Desktop Nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {NAV.map(({ label, to }) => (
              <Link key={to} to={to} className="f-label" style={{
                color: location.pathname.startsWith(to) ? 'var(--c-ink)' : 'var(--c-ink3)',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = location.pathname.startsWith(to) ? 'var(--c-ink)' : 'var(--c-ink3)')}
              >{label}</Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/login" className="f-label" style={{ color: 'var(--c-ink3)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-ink3)')}>Sign In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Join COVR</Link>
          </div>

          {/* Mobile toggle */}
          <button className="hide-desktop" onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--c-ink)', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none', transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--c-ink)', opacity: open ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--c-ink)', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none', transition: 'all 0.3s' }} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40, background: 'var(--c-bg)',
        paddingTop: '64px', transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s var(--ease-out)',
      }}>
        <div style={{ borderTop: '1px solid var(--c-rule)', padding: '24px 24px 0' }}>
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} style={{
              display: 'block', padding: '18px 0',
              borderBottom: '1px solid var(--c-rule)',
              fontFamily: 'Fraunces, serif', fontWeight: 300,
              fontSize: '28px', color: 'var(--c-ink)',
              letterSpacing: '-0.01em',
            }}>{label}</Link>
          ))}
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/signup" className="btn btn-primary" style={{ justifyContent: 'center', padding: '16px' }}>Join COVR</Link>
            <Link to="/login" className="btn btn-outline" style={{ justifyContent: 'center', padding: '16px' }}>Sign In</Link>
          </div>
        </div>
      </div>
    </>
  )
}
