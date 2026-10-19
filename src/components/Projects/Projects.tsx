import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { moreProjects, projects } from '../../data/profile'
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../../lib/gsap'
import { lenisStore } from '../../hooks/useSmoothScroll'
import { Odometer } from '../Career/Odometer'
import './Projects.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function Projects() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const cardTriggers = useRef<ScrollTrigger[]>([])
  const pinTrigger = useRef<ScrollTrigger | null>(null)
  const containerAnim = useRef<gsap.core.Tween | null>(null)

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, index))
    const trigger = cardTriggers.current[clamped]
    if (!trigger) return
    // Com containerAnimation, trigger.start/end são tempo (s) ao longo da tween da trilha,
    // não pixels da página: normaliza pela duração e mapeia para o intervalo real do pin.
    const pin = pinTrigger.current
    const anim = containerAnim.current
    const y = pin && anim ? pin.start + (trigger.start / anim.duration()) * (pin.end - pin.start) + 1 : trigger.start + 1
    if (lenisStore.current) lenisStore.current.scrollTo(y, { duration: 1 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  useGSAP(
    () => {
      cardTriggers.current = []
      pinTrigger.current = null
      containerAnim.current = null
      const mm = gsap.matchMedia()
      mm.add({ wide: '(min-width: 821px)', motion: MOTION_OK }, (ctx) => {
        const { wide, motion } = ctx.conditions as { wide: boolean; motion: boolean }
        const horizontal = wide && motion
        const cards = gsap.utils.toArray<HTMLElement>('.project-card')
        let containerAnimation: gsap.core.Tween | undefined

        // Desktop: a seção fica fixa e a trilha de projetos corre na horizontal
        if (horizontal) {
          const track = root.current!.querySelector<HTMLElement>('.projects-track')!
          const bar = root.current!.querySelector<HTMLElement>('.projects-progress span')!
          const distance = () => track.scrollWidth - document.documentElement.clientWidth
          containerAnimation = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: '.projects-pin',
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                bar.style.transform = `scaleX(${self.progress})`
              },
            },
          })
          pinTrigger.current = containerAnimation.scrollTrigger ?? null
          containerAnim.current = containerAnimation
        }

        if (motion) {
          SplitText.create('.projects-intro h2', {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.projects-intro', start: 'top 80%', toggleActions: 'play none none reverse' },
              }),
          })

          gsap.from('.more-item', {
            opacity: 0,
            x: -24,
            stagger: 0.07,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.more-list', start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        }

        // O cartão que passa pelo centro vira o ativo e o título entra letra por letra
        cards.forEach((card, i) => {
          const title = SplitText.create(card.querySelector('h3'), { type: 'words,chars', mask: 'words' })
          // immediateRender: false mantém o título visível até o cartão ganhar foco
          const intro = motion
            ? gsap.fromTo(
                title.chars,
                { yPercent: 110 },
                { yPercent: 0, stagger: 0.015, duration: 0.6, ease: 'power3.out', paused: true, immediateRender: false },
              )
            : null
          cardTriggers.current[i] = ScrollTrigger.create({
            trigger: card,
            containerAnimation,
            start: horizontal ? 'left center' : 'top center',
            end: horizontal ? 'right center' : 'bottom center',
            onToggle: (self) => {
              if (!self.isActive) return
              setActive(i)
              intro?.restart()
            },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="projetos" className="projects">
      <div className="projects-pin">
        <div className="container projects-hud">
          <p className="section-label" aria-hidden="true">
            Projetos
          </p>
          <div className="projects-counter" aria-hidden="true">
            <Odometer value={active + 1} pad={2} className="projects-odometer" />
            <span>/ {pad(projects.length)}</span>
          </div>
          <div className="projects-nav">
            <button
              type="button"
              className="projects-arrow"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Projeto anterior"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="projects-arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === projects.length - 1}
              aria-label="Próximo projeto"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="projects-progress" aria-hidden="true">
            <span />
          </div>
        </div>

        <div className="projects-track">
          <div className="projects-intro">
            <h2 className="section-title">Coisas que eu construí.</h2>
            <p>
              Os projetos internos aparecem sem nomes nem dados da empresa. Cada um mostra o caminho que ele automatiza,
              da entrada à saída.
            </p>
            <span className="projects-hint" aria-hidden="true">
              role para ver →
            </span>
          </div>

          {projects.map((p, i) => (
            <article key={p.title} className={`project-card${i === active ? ' is-active' : ''}`}>
              <header className="project-meta">
                <span>{p.context}</span>
                <span>{pad(i + 1)}</span>
              </header>
              <h3>{p.title}</h3>
              <p className="project-summary">{p.summary}</p>

              <ol className="flow" aria-label="Fluxo do projeto">
                {p.pipeline.map((step, j) => (
                  <li key={step} style={{ '--j': j } as CSSProperties}>
                    <span className="flow-dot" aria-hidden="true" />
                    <span className="flow-label">{step}</span>
                  </li>
                ))}
              </ol>

              <ul className="project-stack" aria-label="Tecnologias">
                {p.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="container projects-more">
        <p className="section-label">Mais projetos</p>
        <ul className="more-list">
          {moreProjects.map((m) => (
            <li key={m.title} className="more-item">
              <strong>{m.title}</strong>
              <span>{m.note}</span>
              <em>{m.tag}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
