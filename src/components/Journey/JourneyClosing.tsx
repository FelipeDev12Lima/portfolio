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

        gsap.from('.journey-closing-quote, .journey-closing-footnote', {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.journey-closing-quote', start: 'top 85%', toggleActions: 'play none none reverse' },
        })

        // Agradecimento final: letras entram e ficam "respirando" devagar, sem ser um botão
        SplitText.create('.journey-thanks-text', {
          type: 'chars',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.chars, { yPercent: 60, opacity: 0 })
            gsap
              .timeline({
                scrollTrigger: { trigger: '.journey-thanks', start: 'top 85%', toggleActions: 'play none none reverse' },
              })
              .to(self.chars, {
                yPercent: 0,
                opacity: 1,
                stagger: 0.035,
                duration: 0.7,
                ease: 'back.out(1.6)',
              })
              .to(
                self.chars,
                {
                  y: () => gsap.utils.random(-5, 5),
                  duration: () => gsap.utils.random(1.8, 2.6),
                  ease: 'sine.inOut',
                  repeat: -1,
                  yoyo: true,
                  stagger: { each: 0.09, from: 'random' },
                },
                '-=0.15',
              )
          },
        })

        const underline = root.current!.querySelector<SVGPathElement>('.journey-thanks-underline path')
        if (underline) {
          const length = underline.getTotalLength()
          gsap.set(underline, { strokeDasharray: length, strokeDashoffset: length })
          gsap.to(underline, {
            strokeDashoffset: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.journey-thanks', start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        }
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

      <div className="journey-thanks">
        <p className="journey-thanks-text">{closing.thanks}</p>
        <svg className="journey-thanks-underline" viewBox="0 0 240 20" aria-hidden="true">
          <path
            d="M4 12 C 40 2, 70 18, 110 8 S 180 0, 236 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
