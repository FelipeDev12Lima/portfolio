import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, profile } from '../../data/profile'
import { useTheme } from '../../hooks/useTheme'
import './Navbar.css'

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  // Fora da home, uma âncora como "#sobre" não existe na página atual: aponta para a home.
  const anchorHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)
  const nextLabel = theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'

  // Esc fecha o menu do celular
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`navbar${open ? ' is-open' : ''}`}>
      <div className="container navbar-inner">
        <a href={anchorHref('inicio')} className="navbar-logo" onClick={() => setOpen(false)}>
          {profile.handle}
          <span className="navbar-dot" aria-hidden="true" />
        </a>

        <nav id="navbar-menu" aria-label="Seções">
          <ul className="navbar-links">
            {navItems.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as CSSProperties}>
                <a href={anchorHref(item.id)} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ '--i': navItems.length } as CSSProperties}>
              <Link
                to="/jornada"
                className={pathname === '/jornada' ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                Jornada
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <button type="button" className="navbar-icon" onClick={toggle} aria-label={nextLabel} title={nextLabel}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              {theme === 'dark' ? (
                <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                </g>
              ) : (
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              )}
            </svg>
          </button>
          <a href={anchorHref('contato')} className="navbar-cta" onClick={() => setOpen(false)}>
            Falar comigo
          </a>
          <button
            type="button"
            className="navbar-icon navbar-burger"
            aria-expanded={open}
            aria-controls="navbar-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
