import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { services } from '../../data/profile'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'
import './Services.css'

const STEP_LABELS = ['entrada', 'processo', 'saída']

export function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Título da seção: linhas sobem de dentro de uma máscara
        SplitText.create('.services .section-title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              stagger: 0.12,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: '.services .section-title', start: 'top 85%', toggleActions: 'play none none reverse' },
            }),
        })

        const cards = gsap.utils.toArray<HTMLElement>('.service-card')
        cards.forEach((card, i) => {
          // Letras do título do cartão aparecem ao entrar
          SplitText.create(card.querySelector('h3'), {
            type: 'words,chars',
            mask: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 110,
                stagger: 0.018,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none reverse' },
              }),
          })

          // Os passos do pipeline acendem em sequência
          gsap.from(card.querySelectorAll('.service-step'), {
            opacity: 0.2,
            x: -12,
            stagger: 0.12,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 60%', toggleActions: 'play none none reverse' },
          })

          // O cartão de baixo empurra o de cima para trás
          const next = cards[i + 1]
          if (next) {
            // --shade escurece via overlay; opacidade deixaria o cartão de trás transparecer
            gsap.to(card, {
              scale: 0.92,
              '--shade': 0.55,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
            })
          }
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="o-que-faco" className="services section">
      <div className="container">
        <p className="section-label">O que faço</p>
        <h2 className="section-title">Três frentes, um objetivo: menos trabalho manual.</h2>

        <div className="services-stack">
          {services.map((s, i) => (
            <article key={s.tag} className="service-card" style={{ '--i': i } as CSSProperties}>
              <div className="service-main">
                <span className="service-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="service-tools" aria-label="Ferramentas">
                  {s.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <ol className="service-pipeline" aria-label="Exemplo de fluxo">
                {s.pipeline.map((step, j) => (
                  <li key={step} className="service-step">
                    <span className="service-step-label">{STEP_LABELS[j]}</span>
                    <span className="service-step-value">{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
