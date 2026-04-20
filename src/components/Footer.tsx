import { Link } from 'react-router-dom'

const COLS = [
  { heading: 'Platform', links: ['Discover', 'Live Drops', 'Upcoming', 'Artists'], hrefs: ['/discover', '/drops', '/drops', '/artists'] },
  { heading: 'Account', links: ['Sign In', 'Create Account', 'Dashboard', 'Watchlist'], hrefs: ['/login', '/signup', '/dashboard', '/dashboard'] },
  { heading: 'Company', links: ['About', 'Artist Program', 'Standards', 'Contact'], hrefs: ['#', '#', '#', '#'] },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink-2)', borderTop: '1px solid var(--rule)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="gold-text inline-block mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: '32px', letterSpacing: '0.12em', textDecoration: 'none' }}>
              COVR
            </Link>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--sub)', fontWeight: 300, lineHeight: 1.6 }}>
              The only marketplace for original music cover art  authenticated, physical, yours.
            </p>
            <p className="font-label mt-6" style={{ color: 'var(--muted)', fontSize: '9px' }}>Lagos, Nigeria</p>
          </div>
          {COLS.map((col) => (
            <div key={col.heading}>
              <p className="font-label mb-5" style={{ color: 'var(--sub)', fontSize: '9px' }}>{col.heading}</p>
              <ul className="flex flex-col gap-3" style={{ listStyle: 'none' }}>
                {col.links.map((link, i) => (
                  <li key={link}>
                    <Link to={col.hrefs[i]} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: 'var(--muted)', fontWeight: 300, textDecoration: 'none' }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-14 pt-8" style={{ borderTop: '1px solid var(--rule)' }}>
          <p className="font-label" style={{ color: 'var(--muted)', fontSize: '9px' }}> 2025 COVR. All rights reserved.</p>
          <p className="font-label" style={{ color: 'var(--muted)', fontSize: '9px' }}>Art belongs to those who feel it.</p>
        </div>
      </div>
    </footer>
  )
}
