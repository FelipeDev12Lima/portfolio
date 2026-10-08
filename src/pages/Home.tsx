import { useOutletContext } from 'react-router-dom'
import { About } from '../components/About/About'
import { Contact } from '../components/Contact/Contact'
import { Career } from '../components/Career/Career'
import { Hero } from '../components/Hero/Hero'
import { Projects } from '../components/Projects/Projects'
import { Services } from '../components/Services/Services'
import { Stack } from '../components/Stack/Stack'
import type { LayoutContext } from '../components/Layout/Layout'

export default function Home() {
  const { ready } = useOutletContext<LayoutContext>()

  return (
    <main>
      <Hero ready={ready} />
      <About />
      <Services />
      <Career />
      <Projects />
      <Stack />
      <Contact />
    </main>
  )
}
