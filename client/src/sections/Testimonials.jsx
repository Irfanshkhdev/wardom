import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const TESTIMONIALS_DATA = [
  {
    quote: 'WARDOM transformed our clinic’s patient acquisition. The AI triage bot handles 70% of patient inquiries after hours, and online bookings grew +240% in 60 days.',
    name: 'Dr. Sarah Vance, MD',
    role: 'Medical Director, Luminary Health Center',
  },
  {
    quote: 'Working with WARDOM was the best investment we made for Aura Bistro. Our table reservation app and web experience feel like something designed in Cupertino.',
    name: 'Vikram Malhotra',
    role: 'Owner, Aura Bistro & Lounge',
  },
  {
    quote: 'They moved with discipline and taste. Advance deposits completely eliminated our nail salon no-shows! Our clients love the online portfolio and booking system.',
    name: 'Ananya Sharma',
    role: 'Founder, Velvet Nails & Beauty Studio',
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS_DATA)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch(`${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api/testimonials`)
        if (!response.ok) throw new Error('Unable to load')
        const data = await response.json()
        if (Array.isArray(data) && data.length) setTestimonials(data)
      } catch {
        setTestimonials(TESTIMONIALS_DATA)
      }
    }
    loadTestimonials()
  }, [])

  return (
    <Section id="testimonials" className="bg-white">
      <Container>
        {/* Eyebrow Header (Helaph structure: REVIEWS · TESTIMONIALS) */}
        <div className="mb-12">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
            REVIEWS · TESTIMONIALS
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl">
            What founders & business owners say.
          </h2>
        </div>

        {/* Testimonial Cards Grid (Helaph structure) */}
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="minimal-card flex flex-col justify-between p-6 sm:p-8 bg-white border border-[#E5E7EB]"
            >
              <div>
                <Quote className="h-6 w-6 text-[#5F8D3B] opacity-60 mb-3" />
                <p className="text-sm leading-relaxed text-[#555555]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                <h4 className="text-xs font-extrabold text-[#0F0F0F]">{t.name}</h4>
                <p className="text-[11px] text-[#999999] mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
