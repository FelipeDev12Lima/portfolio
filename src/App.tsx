import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About/About'
import { Boot } from './components/Boot/Boot'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { Career } from './components/Career/Career'
import { Hero } from './components/Hero/Hero'
import { Navbar } from './components/Navbar/Navbar'
import { Projects } from './components/Projects/Projects'
import { Services } from './components/Services/Services'
import { Stack } from './components/Stack/Stack'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ScrollTrigger } from './lib/gsap'

function bootAlreadySeen() {
  try {
    return sessionStorage.getItem('booted') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [booted, setBooted] = useState(bootAlreadySeen)

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

  return (
    <>
      {!booted && <Boot onDone={finishBoot} />}
      <Navbar />
      <main>
        <Hero ready={booted} />
        <About />
        <Services />
        <Career />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
