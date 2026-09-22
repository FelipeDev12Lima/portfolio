import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

const NAV_OFFSET = -72

/**
 * Rolagem suave (Lenis) sincronizada com o ScrollTrigger.
 * `active = false` trava a rolagem (usado durante o boot).
 */
export function useSmoothScroll(active: boolean) {
  const lenisRef = useRef<Lenis | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ anchors: { offset: NAV_OFFSET } })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (active) lenis.start()
    else lenis.stop()
  }, [active, reduced])
}
