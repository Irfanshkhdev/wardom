import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'

import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import Services from './sections/Services'
import Testimonials from './sections/Testimonials'
import WhyUs from './sections/WhyUs'
import Contact from './sections/Contact'

import ProjectsPage from './pages/ProjectsPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'

import AdminApp from './admin/AdminApp'
import NotFound from './pages/NotFound'

import { initLenis } from './lib/lenis'

function PublicApp() {
  return (
    <div className="relative min-h-screen bg-white text-[#0F0F0F]">
      <Loader />
      <Navbar />

      <main>
        {/* 1. Hero (Digital Products that Scale + Auto-scrolling Recent Work + 4 Stats) */}
        <Hero />

        {/* Marquee Stack Ticker */}
        <TechStack />

        {/* 2. Services (OUR EXPERTISE - 01 Landing Pages, 02 Full-Stack Apps, 03 Mobile Apps, 04 Portfolio Websites) */}
        <Services />

        {/* 3. Testimonials (Client feedback - 6 Exact Helaph Quotes) */}
        <Testimonials />

        {/* 4. Team Banner (Designers, engineers, problem solvers.) */}
        <WhyUs />

        {/* 5. Contact Form (Turn ideas into reality! + Typed Budget Input + Contact Sidebar) */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  useEffect(() => {
    initLenis()
  }, [])

  useEffect(() => {
    document.title = 'WARDOM Studio — Digital Products that Scale'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'WARDOM Studio designs & engineers high-converting websites, web applications, mobile apps, and AI automations.'
      )
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/" element={<PublicApp />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
