import { useRef } from 'react'
import { profile } from '../../data/profile'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'
import { Avatar } from '../Avatar/Avatar'
import './Hero.css'

type Props = { ready: boolean }

export function Hero({ ready }: Props) {
  const root = useRef<HTMLElement>(null)

  // Saída com scroll: as letras do título se desfazem, o resto sobe e some
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const exit = (start = 'top top') => ({
          trigger: root.current,
          start,
          end: 'bottom 15%',
          scrub: true,
        })

        SplitText.create('.hero-title [aria-hidden]', {
          // words mantém cada palavra inteira na mesma linha
          type: 'words,chars',
          autoSplit: true,
          onSplit: (self) =>
            gsap.to(self.chars, {
              yPercent: -90,
              opacity: 0,
              ease: 'none',
              stagger: { each: 0.03, from: 'random' },
              scrollTrigger: exit(),
            }),
        })

        gsap.to('.hero-eyebrow-text, .hero-rest > *', {
          y: -48,
          opacity: 0,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: exit(),
        })

        gsap.to('.avatar-stage', {
          yPercent: 16,
          scale: 0.9,
          opacity: 0,
          ease: 'none',
          scrollTrigger: exit('top top-=5%'),
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="inicio" className={`hero container${ready ? ' is-ready' : ''}`}>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow-text">
            <span className="hero-pulse" aria-hidden="true" />
            {profile.role} · {profile.location} · atualmente na {profile.company}
          </span>
        </p>

        <h1 className="hero-title">
          <span className="sr-only">{profile.name}: transformo processos em produtos.</span>
          <span className="hero-narrow" aria-hidden="true">
            Processos <i>→</i>
          </span>
          <span className="hero-wide" aria-hidden="true">
            produtos.
          </span>
        </h1>

        <div className="hero-rest">
          <p className="hero-lede">{profile.lede}</p>

          <div className="hero-ctas">
            <a href="#projetos" className="btn btn--primary">
              Ver projetos
            </a>
            <a href="#contato" className="btn btn--ghost">
              Falar comigo
            </a>
          </div>

          <div className="hero-log" aria-hidden="true">
            {profile.pipelines.map((steps) => (
              <p key={steps.join()}>
                &gt; {steps.join(' → ')} <span>ok</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-avatar">
        <Avatar />
      </div>
    </section>
  )
}
