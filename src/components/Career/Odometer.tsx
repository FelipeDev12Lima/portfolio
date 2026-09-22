import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Odometer.css'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** Número que troca girando cada dígito, como um contador mecânico. */
export function Odometer({ value, pad = 0, className = '' }: { value: number; pad?: number; className?: string }) {
  const strips = useRef<(HTMLSpanElement | null)[]>([])
  const mounted = useRef(false)
  const reduced = useReducedMotion()
  const digits = String(value).padStart(pad, '0').split('').map(Number)

  useEffect(() => {
    const instant = reduced || !mounted.current
    mounted.current = true
    String(value)
      .padStart(pad, '0')
      .split('')
      .map(Number)
      .forEach((d, i, all) => {
        const el = strips.current[i]
        if (!el) return
        gsap.to(el, {
          yPercent: -d * 10,
          duration: instant ? 0 : 0.9,
          ease: 'power3.inOut',
          delay: instant ? 0 : (all.length - 1 - i) * 0.06,
          overwrite: true,
        })
      })
  }, [value, pad, reduced])

  return (
    <span className={`odometer ${className}`.trim()}>
      <span className="sr-only">{value}</span>
      {digits.map((_, i) => (
        <span key={i} className="odometer-col" aria-hidden="true">
          <span className="odometer-strip" ref={(el) => void (strips.current[i] = el)}>
            {DIGITS.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}
