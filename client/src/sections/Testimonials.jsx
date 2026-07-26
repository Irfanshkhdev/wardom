import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const TESTIMONIALS = [
  {
    quote:
      'WARDOM gave our launch the calm confidence we needed. The product felt sharper, the brand felt clearer, and the entire experience was easier to explain to our customers.',
    name: 'Meera Kapoor',
    role: 'Founder, Nocturne Audio',
    rating: 5,
  },
  {
    quote:
      'They moved with discipline and taste. What usually feels messy in a product launch felt structured, fast, and deeply considered.',
    name: 'Aditya Rao',
    role: 'Head of Growth, Alto Capital',
    rating: 5,
  },
  {
    quote:
      'The final site feels elevated in every way. It has helped us present the brand with more confidence and depth.',
    name: 'Priya Sen',
    role: 'CEO, Verdant Skincare',
    rating: 5,
  },
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch(`${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api/testimonials`)
        if (!response.ok) throw new Error('Unable to load testimonials')
        const data = await response.json()
        if (Array.isArray(data) && data.length) {
          setTestimonials(data)
        }
      } catch {
        setTestimonials(TESTIMONIALS)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  return (
    <Section eyebrow="Testimonials">
      <Container>
        <div className="mb-14 max-w-3xl">
          <h2 className="font-heading text-4xl leading-tight text-primaryText md:text-6xl">
            Teams choose us when <span className="italic text-accent">clarity matters.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {loading ? (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-secondaryText lg:col-span-3">
              Loading testimonials…
            </div>
          ) : null}
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-6 text-base leading-7 text-secondaryText">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-medium text-primaryText">{t.name}</p>
                <p className="mt-1 font-mono-num text-xs uppercase tracking-[0.25em] text-secondaryText">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
