import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Boot.css'

const STEPS = [
  'iniciando felipe.lima',
  'carregando agentes de IA',
  'conectando automações',
  'compilando portfólio',
]
const STEP_MS = 260
const EXIT_MS = 500

type Props = { onDone: () => void }

/** Tela de loading em formato de log de terminal. Aparece uma vez por sessão. */
export function Boot({ onDone }: Props) {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduced) {
      onDone()
      return
    }
    if (step < STEPS.length) {
      const t = window.setTimeout(() => setStep((s) => s + 1), STEP_MS)
      return () => window.clearTimeout(t)
    }
    const leave = window.setTimeout(() => setLeaving(true), 220)
    const done = window.setTimeout(onDone, 220 + EXIT_MS)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
    }
  }, [step, reduced, onDone])

  const progress = Math.round((step / STEPS.length) * 100)

  return (
    <div className={`boot${leaving ? ' is-leaving' : ''}`} role="status" aria-label="Carregando portfólio">
      <div className="boot-log">
        {STEPS.slice(0, step + 1).map((s, i) => (
          <p key={s}>
            <span className="boot-prompt">&gt;</span> {s}
            {i < step ? <span className="boot-ok"> ok</span> : <span className="boot-caret" />}
          </p>
        ))}
        {step >= STEPS.length && (
          <p>
            <span className="boot-prompt">&gt;</span> pronto<span className="boot-ok">.</span>
          </p>
        )}
      </div>
      <div className="boot-bar" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="boot-pct">{progress}%</p>
    </div>
  )
}
