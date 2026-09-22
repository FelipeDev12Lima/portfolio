import { useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'
import './Contact.css'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const [copied, setCopied] = useState(false)
  const { email, linkedin, github } = profile.links

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // O inverso do hero: as letras chegam espalhadas e se montam no lugar
        SplitText.create('.contact-title', {
          type: 'words,chars',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: () => gsap.utils.random(-160, 160),
              rotate: () => gsap.utils.random(-40, 40),
              opacity: 0,
              ease: 'none',
              stagger: { each: 0.02, from: 'random' },
              scrollTrigger: { trigger: '.contact-title', start: 'top 95%', end: 'bottom 55%', scrub: 0.6 },
            }),
        })

        gsap.from('.contact-actions > *, .contact-links li', {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-actions', start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      })
    },
    { scope: root },
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // sem acesso à área de transferência: seleciona o e-mail para copiar à mão
      const sel = window.getSelection()
      if (sel && emailRef.current) {
        const range = document.createRange()
        range.selectNodeContents(emailRef.current)
        sel.removeAllRanges()
        sel.addRange(range)
      }
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={root} id="contato" className="contact section">
      <div className="container">
        <p className="section-label">Contato</p>
        <h2 className="contact-title">Tem um processo manual aí? Vamos conversar.</h2>

        <div className="contact-actions">
          <a ref={emailRef} className="contact-email" href={`mailto:${email}`}>
            {email}
          </a>
          <button type="button" className="contact-copy" onClick={copyEmail} aria-live="polite">
            {copied ? 'E-mail copiado' : 'Copiar e-mail'}
          </button>
        </div>

        <ul className="contact-links">
          <li>
            <a href={linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={github} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${email}`}>
              <span>E-mail</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
