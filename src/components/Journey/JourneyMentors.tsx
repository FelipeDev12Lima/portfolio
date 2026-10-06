import { useRef } from 'react'
import { mentors, mentorsIntro } from '../../data/jornada'
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap'

export function JourneyMentors() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('.mentor-card', {
          opacity: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.mentor-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="journey-mentors">
      <p className="section-label">{mentorsIntro.label}</p>
      <h3 className="journey-chapter-title">{mentorsIntro.title}</h3>
      <p className="journey-chapter-paragraph">{mentorsIntro.body}</p>

      <ul className="mentor-grid">
        {mentors.map((m) => (
          <li key={m.name} className="mentor-card">
            <strong>{m.name}</strong>
            <span className="mentor-role">{m.role}</span>
            <p>{m.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
