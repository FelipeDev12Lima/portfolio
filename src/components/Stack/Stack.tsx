import { useRef } from 'react'
import { stack } from '../../data/profile'
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap'
import './Stack.css'

// Repete as ferramentas para a faixa nunca "acabar" na tela
const REPEAT = 3

export function Stack() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Faixas deslizam em sentidos alternados, presas ao scroll
        gsap.utils.toArray<HTMLElement>('.marquee-row').forEach((row, i) => {
          const dir = i % 2 === 0 ? -1 : 1
          gsap.fromTo(
            row,
            { xPercent: dir === -1 ? 0 : -24 },
            {
              xPercent: dir === -1 ? -24 : 0,
              ease: 'none',
              scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
            },
          )
        })

        gsap.from('.stack-group', {
          opacity: 0,
          y: 32,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.stack-groups', start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="stack" className="stack section">
      <div className="container">
        <p className="section-label">Stack</p>
        <h2 className="section-title">As ferramentas de todo dia.</h2>
      </div>

      <div className="marquee" aria-hidden="true">
        {stack.map((g, i) => (
          <div key={g.group} className={`marquee-row${i % 2 ? ' marquee-row--alt' : ''}`}>
            {Array.from({ length: REPEAT }).flatMap((_, r) =>
              g.tools.map((t) => (
                <span key={`${r}-${t}`} className="marquee-item">
                  {t}
                </span>
              )),
            )}
          </div>
        ))}
      </div>

      <div className="container">
        <div className="stack-groups">
          {stack.map((g) => (
            <div key={g.group} className="stack-group">
              <h3>{g.group}</h3>
              <ul>
                {g.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
