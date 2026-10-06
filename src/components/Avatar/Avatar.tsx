import { useEffect, useRef, useState } from 'react'
import portrait from '../../assets/avatar/avatar.webp'
import lidLeft from '../../assets/avatar/lid-L.png'
import lidRight from '../../assets/avatar/lid-R.png'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Avatar.css'

const BLINK_MS = 130
const WINK_MS = 380
const BUBBLE_MS = 2600

type Props = { lines?: readonly string[] }

export function Avatar({ lines: customLines }: Props = {}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const [blinking, setBlinking] = useState(false)
  const [winking, setWinking] = useState(false)
  const [hopKey, setHopKey] = useState(0)
  const [line, setLine] = useState<string | null>(null)
  const lineIndex = useRef(0)
  const timers = useRef<{ wink?: number; bubble?: number }>({})

  // Inclinação 3D em direção ao cursor + parallax do arco
  useEffect(() => {
    if (reduced) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const root = rootRef.current
        if (!root || !figureRef.current || !discRef.current) return
        const r = root.getBoundingClientRect()
        const clamp = (v: number) => Math.max(-1, Math.min(1, v))
        const nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 1.2))
        const ny = clamp((e.clientY - (r.top + r.height * 0.3)) / (r.height * 1.2))
        figureRef.current.style.transform = `rotateY(${nx * 9}deg) rotateX(${-ny * 6}deg) translate(${nx * 6}px, ${ny * 4}px)`
        discRef.current.style.transform = `translate(${-nx * 10}px, ${-ny * 6}px)`
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  // Piscar em intervalos aleatórios
  useEffect(() => {
    if (reduced) return
    let t: number
    const schedule = (delay: number) => {
      t = window.setTimeout(() => {
        setBlinking(true)
        t = window.setTimeout(() => {
          setBlinking(false)
          schedule(2800 + Math.random() * 3600)
        }, BLINK_MS)
      }, delay)
    }
    schedule(1600)
    return () => window.clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    const t = timers.current
    return () => {
      window.clearTimeout(t.wink)
      window.clearTimeout(t.bubble)
    }
  }, [])

  const poke = () => {
    const lines = customLines ?? profile.avatarLines
    setLine(lines[lineIndex.current++ % lines.length])
    setHopKey((k) => k + 1)
    setWinking(true)
    window.clearTimeout(timers.current.wink)
    window.clearTimeout(timers.current.bubble)
    timers.current.wink = window.setTimeout(() => setWinking(false), WINK_MS)
    timers.current.bubble = window.setTimeout(() => setLine(null), BUBBLE_MS)
  }

  const className = ['avatar', blinking && 'is-blinking', winking && 'is-winking']
    .filter(Boolean)
    .join(' ')

  return (
    <div className="avatar-stage">
      <p className={`avatar-bubble${line ? ' is-on' : ''}`} aria-live="polite">
        {line}
      </p>
      <div
        ref={rootRef}
        className={className}
        role="button"
        tabIndex={0}
        aria-label={`Retrato ilustrado de ${profile.name}, de braços cruzados. Ative para ele dizer algo.`}
        onClick={poke}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            poke()
          }
        }}
      >
        <div ref={discRef} className="avatar-disc" aria-hidden="true">
          <svg viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="var(--circuit)" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round">
              <path d="M20,250 H70 V160 H112" />
              <path d="M380,270 H334 V130 H294" />
              <circle cx="112" cy="160" r="5" fill="var(--avatar-bg)" />
              <circle cx="294" cy="130" r="5" fill="var(--avatar-bg)" />
            </g>
          </svg>
        </div>
        <div ref={figureRef} className="avatar-figure">
          <div key={hopKey} className={hopKey ? 'avatar-hop' : undefined}>
            <img className="avatar-photo" src={portrait} alt="" width={1024} height={1024} draggable={false} />
            {/* Posições em % da imagem de 1024px, medidas sobre os olhos */}
            <img className="avatar-lid avatar-lid--left" src={lidLeft} alt="" draggable={false} />
            <img className="avatar-lid avatar-lid--right" src={lidRight} alt="" draggable={false} />
          </div>
        </div>
      </div>
      <p className="avatar-hint">
        <span className="avatar-hint--mouse">mexa o mouse · clique no avatar</span>
        <span className="avatar-hint--touch">toque no avatar</span>
      </p>
    </div>
  )
}
