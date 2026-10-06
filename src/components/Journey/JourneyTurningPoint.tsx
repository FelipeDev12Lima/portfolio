import { useRef } from 'react'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'

type Props = {
  year: number
  period: string
  label: string
  quote: string
  paragraphs: readonly string[]
}

/** O momento-chave da jornada: a frase fica presa na tela e se monta letra por letra. */
export function JourneyTurningPoint({ year, period, label, quote, paragraphs }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const [intro, ...rest] = paragraphs

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.turning-point-intro .journey-chapter-paragraph',
          { opacity: 0.18, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.18,
            scrollTrigger: { trigger: '.turning-point-intro', start: 'top 72%', end: 'bottom 60%', scrub: true },
          },
        )

        const stage = root.current!.querySelector<HTMLElement>('.turning-point-stage')!

        SplitText.create('.turning-point-quote', {
          type: 'words,chars',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.chars, { yPercent: 70, opacity: 0 })
            gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                start: 'top top',
                end: '+=120%',
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
              .to(self.chars, { yPercent: 0, opacity: 1, stagger: 0.02, ease: 'power2.out', duration: 1 })
              .to(self.chars, { opacity: 0.3, duration: 0.6 }, '+=0.4')
          },
        })

        gsap.fromTo(
          '.turning-point-rest .journey-chapter-paragraph',
          { opacity: 0.18, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.18,
            scrollTrigger: { trigger: '.turning-point-rest', start: 'top 72%', end: 'bottom 60%', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="turning-point">
      <div className="turning-point-intro">
        <p className="section-label">
          {label} · {period}
        </p>
        <p className="journey-chapter-paragraph">{intro}</p>
      </div>

      <div className="turning-point-stage">
        <span className="sr-only">{quote}</span>
        <p className="turning-point-quote" aria-hidden="true">
          {quote}
        </p>
        <span className="turning-point-year" aria-hidden="true">
          {year}
        </span>
      </div>

      <div className="turning-point-rest">
        {rest.map((p) => (
          <p key={p} className="journey-chapter-paragraph">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
