import { useRef, useState } from 'react'
import { Odometer } from '../Career/Odometer'
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../../lib/gsap'

type Props = {
  year: number
  period: string
  label: string
  title: string
  paragraphs: readonly string[]
  reverse?: boolean
}

/** Um capítulo da jornada: ano em odômetro + título e parágrafos que acendem no scroll. */
export function JourneyChapter({ year, period, label, title, paragraphs, reverse }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 65%',
        once: true,
        onEnter: () => setStarted(true),
      })

      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        SplitText.create('.journey-chapter-title', {
          type: 'words,chars',
          mask: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              stagger: 0.012,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: { trigger: root.current, start: 'top 78%', toggleActions: 'play none none reverse' },
            }),
        })

        gsap.fromTo(
          '.journey-chapter-paragraph',
          { opacity: 0.18, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.18,
            scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 60%', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className={`journey-chapter${reverse ? ' journey-chapter--reverse' : ''}`}>
      <aside className="journey-chapter-aside" aria-hidden="true">
        <Odometer value={started ? year : 0} pad={4} className="journey-odometer" />
        <span className="journey-chapter-period">{period}</span>
      </aside>

      <div className="journey-chapter-body">
        <p className="section-label">{label}</p>
        <h3 className="journey-chapter-title">{title}</h3>
        {paragraphs.map((p) => (
          <p key={p} className="journey-chapter-paragraph">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
