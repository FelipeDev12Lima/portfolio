import { useRef } from 'react'
import { closing } from '../../data/jornada'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'

export function JourneyClosing() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        SplitText.create('.journey-closing-title', {
          type: 'words,chars',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: () => gsap.utils.random(-160, 160),
              rotate: () => gsap.utils.random(-40, 40),
              opacity: 0,
              ease: 'none',
              stagger: { each: 0.02, from: 'random' },
              scrollTrigger: { trigger: '.journey-closing-title', start: 'top 90%', end: 'bottom 55%', scrub: 0.6 },
            }),
        })

        gsap.fromTo(
          '.journey-closing-paragraph',
          { opacity: 0.18, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            stagger: 0.18,
            scrollTrigger: { trigger: '.journey-closing-body', start: 'top 72%', end: 'bottom 60%', scrub: true },
          },
        )

        gsap.from('.journey-closing-quote, .journey-closing-footnote, .journey-closing-cta', {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.journey-closing-quote', start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="journey-closing">
      <p className="section-label">{closing.label}</p>
      <h2 className="journey-closing-title">{closing.title}</h2>

      <div className="journey-closing-body">
        {closing.paragraphs.map((p) => (
          <p key={p} className="journey-closing-paragraph">
            {p}
          </p>
        ))}
      </div>

      <p className="journey-closing-quote">&ldquo;{closing.quote}&rdquo;</p>
      <p className="journey-closing-footnote">{closing.footnote}</p>

      <a href="/#contato" className="journey-closing-cta btn btn--primary">
        Falar comigo
      </a>
    </div>
  )
}
