import { useRef, useState } from 'react'
import { career, education } from '../../data/profile'
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../../lib/gsap'
import { Odometer } from './Odometer'
import './Career.css'

const KIND_LABEL = { formação: 'Formação', trabalho: 'Experiência', atual: 'Agora' } as const

export function Career() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const current = career[active]

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.career-item')

      // O item que cruza o meio da tela vira o ativo (vale com ou sem animação)
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.career-line-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.career-list', start: 'top 55%', end: 'bottom 55%', scrub: true },
          },
        )

        items.forEach((item) => {
          SplitText.create(item.querySelector('h3'), {
            type: 'words,chars',
            mask: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 110,
                stagger: 0.012,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 78%', toggleActions: 'play none none reverse' },
              }),
          })
        })

        // Números contam do zero quando aparecem
        gsap.utils.toArray<HTMLElement>('.metric-num').forEach((el) => {
          const target = Number(el.dataset.value)
          const counter = { v: 0 }
          el.textContent = '0'
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v))
            },
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="trajetoria" className="career section">
      <div className="container">
        <p className="section-label">Trajetória</p>
        <h2 className="section-title">Em todo lugar, eu automatizava alguma coisa.</h2>

        <div className="career-grid">
          <aside className="career-aside" aria-hidden="true">
            <Odometer value={current.year} />
            <div key={active} className="career-now">
              <span className={`career-kind career-kind--${current.kind}`}>{KIND_LABEL[current.kind]}</span>
              <strong>{current.org}</strong>
              <span>{current.period}</span>
            </div>
          </aside>

          <div className="career-track">
            <span className="career-line-fill" aria-hidden="true" />
            <ol className="career-list">
              {career.map((c, i) => (
                <li key={c.role} className={`career-item${i === active ? ' is-active' : ''}`}>
                  <p className="career-period">
                    {c.period} · {c.org}
                  </p>
                  <h3>{c.role}</h3>
                  <p className="career-body">{c.body}</p>
                  {c.metrics.length > 0 && (
                    <ul className="career-metrics">
                      {c.metrics.map((m) => (
                        <li key={m.label}>
                          <span className="metric-value">
                            {m.prefix}
                            <span className="metric-num" data-value={m.value}>
                              {m.value}
                            </span>
                            {m.suffix}
                          </span>
                          <span className="metric-label">{m.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="career-education">
          <p className="section-label">Formação e cursos</p>
          <ul>
            {education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
