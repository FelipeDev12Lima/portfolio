import { useRef } from 'react'
import { Avatar } from '../Avatar/Avatar'
import { JourneyChapter } from './JourneyChapter'
import { JourneyClosing } from './JourneyClosing'
import { JourneyMentors } from './JourneyMentors'
import { JourneyTurningPoint } from './JourneyTurningPoint'
import { chapters, jornada, learning, opportunity, preparation, turningPoint } from '../../data/jornada'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'
import './Journey.css'

export function Journey() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        SplitText.create('.journey-hero-title [aria-hidden]', {
          type: 'words,chars',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              opacity: 0,
              ease: 'power3.out',
              stagger: { each: 0.015, from: 'random' },
            }),
        })

        gsap.from('.journey-hero-eyebrow, .journey-hero-lede', {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
        })
      })
    },
    { scope: root },
  )

  return (
    <main ref={root} id="jornada-topo" className="journey">
      <section className="journey-hero container">
        <div className="journey-hero-copy">
          <p className="journey-hero-eyebrow">{jornada.kicker}</p>
          <h1 className="journey-hero-title">
            <span className="sr-only">{jornada.title}</span>
            <span aria-hidden="true">{jornada.title}</span>
          </h1>
          <p className="journey-hero-lede">{jornada.lede}</p>
        </div>
        <div className="journey-hero-avatar">
          <Avatar lines={jornada.avatarLines} />
        </div>
      </section>

      <section className="journey-section section container">
        <JourneyChapter
          year={chapters[0].year}
          period={chapters[0].period}
          label={chapters[0].label}
          title={chapters[0].title}
          paragraphs={chapters[0].paragraphs}
        />
      </section>

      <section className="journey-section journey-section--stage">
        <JourneyTurningPoint
          year={turningPoint.year}
          period={turningPoint.period}
          label={turningPoint.label}
          quote={turningPoint.quote}
          paragraphs={turningPoint.paragraphs}
        />
      </section>

      <section className="journey-section section container">
        <JourneyChapter
          year={learning.year}
          period={learning.period}
          label={learning.label}
          title={learning.title}
          paragraphs={learning.paragraphs}
          reverse
        />
      </section>

      <section className="journey-section section container">
        <JourneyMentors />
      </section>

      <section className="journey-section section container">
        <JourneyChapter
          year={preparation.year}
          period={preparation.period}
          label={preparation.label}
          title={preparation.title}
          paragraphs={preparation.paragraphs}
        />
      </section>

      <section className="journey-section section container">
        <JourneyChapter
          year={opportunity.year}
          period={opportunity.period}
          label={opportunity.label}
          title={opportunity.title}
          paragraphs={opportunity.paragraphs}
          reverse
        />
      </section>

      <section className="journey-section section container">
        <JourneyClosing />
      </section>
    </main>
  )
}
