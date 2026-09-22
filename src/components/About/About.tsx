import { useRef } from 'react'
import { about } from '../../data/profile'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../../lib/gsap'
import './About.css'

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // 1. O parágrafo acende palavra por palavra
        SplitText.create('.about-statement', {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.14 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.1,
                scrollTrigger: {
                  trigger: '.about-statement',
                  start: 'top 82%',
                  end: 'bottom 45%',
                  scrub: true,
                },
              },
            ),
        })

        // 2. Tela fixa: entrada → saída trocando letra por letra
        const stage = root.current!.querySelector<HTMLElement>('.swap-stage')!
        const slotIn = stage.querySelector<HTMLElement>('.slot--in')!
        const slotOut = stage.querySelector<HTMLElement>('.slot--out')!
        const wordsIn = gsap.utils.toArray<HTMLElement>('.slot--in .slot-word', stage)
        const wordsOut = gsap.utils.toArray<HTMLElement>('.slot--out .slot-word', stage)
        const captions = gsap.utils.toArray<HTMLElement>('.swap-caption-item', stage)
        const charsIn = wordsIn.map((w) => SplitText.create(w, { type: 'chars' }).chars)
        const charsOut = wordsOut.map((w) => SplitText.create(w, { type: 'chars' }).chars)
        const steps = wordsIn.length

        charsIn.slice(1).forEach((c) => gsap.set(c, { yPercent: 110, opacity: 0 }))
        charsOut.slice(1).forEach((c) => gsap.set(c, { yPercent: 110, opacity: 0 }))
        gsap.set(captions.slice(1), { opacity: 0, y: 14 })
        gsap.set(slotIn, { width: () => wordsIn[0].offsetWidth })
        gsap.set(slotOut, { width: () => wordsOut[0].offsetWidth })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${window.innerHeight * (steps - 1) * 0.9}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        tl.fromTo('.swap-progress span', { scaleX: 1 / steps }, { scaleX: 1, ease: 'none', duration: steps - 1 + 0.3 }, 0)

        for (let k = 0; k < steps - 1; k++) {
          const at = k + 0.15
          const swap = (chars: Element[][], slot: HTMLElement, words: HTMLElement[], delay: number) => {
            tl.to(chars[k], { yPercent: -110, opacity: 0, stagger: 0.025, duration: 0.35, ease: 'power2.in' }, at + delay)
              .to(slot, { width: () => words[k + 1].offsetWidth, duration: 0.45 }, at + delay + 0.1)
              .to(chars[k + 1], { yPercent: 0, opacity: 1, stagger: 0.025, duration: 0.35, ease: 'power2.out' }, at + delay + 0.28)
          }
          swap(charsIn, slotIn, wordsIn, 0)
          swap(charsOut, slotOut, wordsOut, 0.14)
          tl.to(captions[k], { opacity: 0, y: -14, duration: 0.25 }, at)
            .to(captions[k + 1], { opacity: 1, y: 0, duration: 0.3 }, at + 0.4)
        }
        tl.to({}, { duration: 0.3 })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="sobre" className="about section">
      <div className="container">
        <p className="section-label">Sobre</p>
        <p className="about-statement">{about.statement}</p>
      </div>

      <div className="swap-stage" aria-hidden="true">
        <div className="container swap-inner">
          <p className="swap-line">
            Recebo{' '}
            <span className="slot slot--in">
              {about.swaps.map((s) => (
                <span key={s.input} className="slot-word">
                  {s.input}
                </span>
              ))}
            </span>
          </p>
          <p className="swap-line swap-line--out">
            e entrego{' '}
            <span className="slot slot--out">
              {about.swaps.map((s) => (
                <span key={s.output} className="slot-word">
                  {s.output}
                </span>
              ))}
            </span>
          </p>
          <div className="swap-caption">
            {about.swaps.map((s) => (
              <p key={s.caption} className="swap-caption-item">
                &gt; {s.caption}
              </p>
            ))}
          </div>
          <div className="swap-progress">
            <span />
          </div>
        </div>
      </div>

      {/* Versão estática: leitores de tela e quem prefere menos movimento */}
      <div className="container">
        <ul className="swap-list">
          {about.swaps.map((s) => (
            <li key={s.input}>
              <strong>{s.input}</strong> → <strong>{s.output}</strong>
              <span>{s.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
