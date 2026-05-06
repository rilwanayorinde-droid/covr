import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--c-bg2)', borderTop: '1px solid var(--c-rule)' }}>
      <div className="container" style={{ padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '56px' }}>
          <div>
            <div className="f-display" style={{ fontSize: '20px', letterSpacing: '0.1em', marginBottom: '12px', color: 'var(--c-ink)' }}>COVR</div>
            <p style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, lineHeight: 1.7, maxWidth: '200px' }}>Original music cover art. Authenticated, framed, yours.</p>
          </div>
          {[
            { h: 'Platform', links: [['Discover', '/discover'], ['Live Drops', '/drops'], ['Artists', '/artists'], ['How It Works', '/about']] },
            { h: 'Artists', links: [['Submit Cover Art', '/artist-submit'], ['Guidelines', '/about'], ['Verification', '/about'], ['Artist Portal', '/artist-submit']] },
            { h: 'Company', links: [['About', '/about'], ['Shipping Policy', '/about'], ['Terms', '/about'], ['Support', '/about']] },
          ].map(col => (
            <div key={col.h}>
              <p className="f-label" style={{ marginBottom: '16px', color: 'var(--c-ink)' }}>{col.h}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(([label, to]) => (
                  <Link key={label} to={to} style={{ fontSize: '13px', color: 'var(--c-ink3)', fontWeight: 300, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-ink3)')}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="divider" style={{ marginBottom: '24px' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p className="f-label" style={{ fontSize: '9px' }}>© 2025 COVR · Lagos, Nigeria</p>
          <p className="f-label" style={{ fontSize: '9px' }}>Art belongs to those who feel it.</p>
        </div>
      </div>
    </footer>
  )
}
