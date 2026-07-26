import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'

import Hero from './sections/Hero'
import Services from './sections/Services'
import FeaturedWork from './sections/FeaturedWork'
import Testimonials from './sections/Testimonials'
import WhyUs from './sections/WhyUs'
import Contact from './sections/Contact'

import AdminApp from './admin/AdminApp'
import NotFound from './pages/NotFound'

import { initLenis } from './lib/lenis'

function PublicApp() {
  return (
    <div className="relative min-h-screen bg-white text-[#0F0F0F]">
      <Loader />
      <Navbar />

      <main>
        {/* 1. Hero (Digital Products that Scale + 4 Showcase Cards + 4-Column Stats Bar) */}
        <Hero />

        {/* 2. Specialized Services (01 Landing Pages, 02 Full-Stack Apps, 03 Mobile Apps, 04 Business Websites) */}
        <Services />

        {/* 3. Featured Work */}
        <FeaturedWork />

        {/* 4. Testimonials (REVIEWS · TESTIMONIALS) */}
        <Testimonials />

        {/* 5. Team / About Banner (Designers, engineers, problem solvers.) */}
        <WhyUs />

        {/* 6. Start A Project Form (Turn ideas into reality! + Numbered Step Form) */}
        <Contact />
      </main>

      <Footer />
    </div>
  )
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
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/" element={<PublicApp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
