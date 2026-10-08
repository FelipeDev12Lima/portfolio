import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Boot } from '../Boot/Boot'
import { Footer } from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { ScrollTrigger } from '../../lib/gsap'

function bootAlreadySeen() {
  try {
    return sessionStorage.getItem('booted') === '1'
  } catch {
    return false
  }
}

export type LayoutContext = {
  ready: boolean
  presenting: boolean
  setPresenting: (value: boolean) => void
}

/** Casca comum a todas as rotas: boot, tema, navbar, scroll suave e rodapé. */
export function Layout() {
  const [booted, setBooted] = useState(bootAlreadySeen)
  const [presenting, setPresenting] = useState(false)

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem('booted', '1')
    } catch {
      // sem sessionStorage: o boot volta a aparecer ao recarregar
    }
    setBooted(true)
  }, [])

  useSmoothScroll(booted)

  // As medidas das animações dependem das fontes: recalcula quando carregarem
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])

  // Saída do modo apresentação pelo Esc do navegador também precisa atualizar a navbar/footer
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setPresenting(false)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const context: LayoutContext = { ready: booted, presenting, setPresenting }

  return (
    <>
      {!booted && <Boot onDone={finishBoot} />}
      {!presenting && <Navbar />}
      <Outlet context={context} />
      {!presenting && <Footer />}
    </>
  )
}
