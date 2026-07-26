import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'

import Hero from './sections/Hero'
import FeaturedWork from './sections/FeaturedWork'
import Statistics from './sections/Statistics'
import Services from './sections/Services'
import Process from './sections/Process'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import TechStack from './sections/TechStack'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import AdminApp from './admin/AdminApp'
import NotFound from './pages/NotFound'

import { initLenis } from './lib/lenis'

function PublicApp({ theme, onToggleTheme }) {
  return (
    <div className="relative">
      <Loader />
      <CustomCursor />
      <div className="noise" />

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main>
        <Hero />
        <FeaturedWork />
        <Statistics />
        <Services />
        <Process />
        <WhyUs />
        <Testimonials />
        <TechStack />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    initLenis()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    document.title = 'WARDOM Studio — Crafting Digital Experiences'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'WARDOM Studio designs and builds premium digital products for brands who refuse to look ordinary.')
    }
  }, [])

  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/" element={<PublicApp theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
