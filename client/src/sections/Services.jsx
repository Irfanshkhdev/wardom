import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Code2, Rocket, LineChart } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const FALLBACK_SERVICES = [
  {
    icon: Palette,
    title: 'Brand systems',
    description: 'Editorial identity, interaction language, and interface systems designed to feel composed from the first impression onward.',
  },
  {
    icon: Code2,
    title: 'Product engineering',
    description: 'Responsive, accessible front ends and modern back ends built for performance, maintainability, and clear iteration.',
  },
  {
    icon: Rocket,
    title: 'Launch support',
    description: 'From positioning to rollout, we help teams ship with calm confidence and a sharper narrative across every touchpoint.',
  },
  {
    icon: LineChart,
    title: 'Growth design',
    description: 'Conversion-aware pages, analytics hooks, and informed refinement loops that keep the experience improving after launch.',
  },
]

const ICONS = { palette: Palette, code2: Code2, rocket: Rocket, linechart: LineChart }

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch(`${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api/services`)
        if (!response.ok) throw new Error('Unable to load services')
        const data = await response.json()
        if (Array.isArray(data) && data.length) {
          setServices(data.map((service) => ({ ...service, icon: ICONS[service.icon] || Palette })))
        }
      } catch {
        setServices(FALLBACK_SERVICES)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <Section id="services" eyebrow="Services" className="bg-surface/40">
      <Container>
        <div className="mb-14 max-w-3xl">
          <h2 className="font-heading text-4xl leading-tight text-primaryText md:text-6xl">
            Strategy, design, and build <span className="italic text-accent">in one rhythm.</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-secondaryText md:text-lg">
            We work across the full product experience so your brand, website, and product feel cohesive rather than stitched together.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {loading ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-secondaryText lg:col-span-2">
              Loading services…
            </div>
          ) : null}
          {services.map((service, i) => {
            const Icon = service.icon || Palette
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-[28px] border border-white/10 bg-background/70 p-7 shadow-[0_16px_45px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-accent">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono-num text-sm uppercase tracking-[0.3em] text-secondaryText">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-2xl text-primaryText">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-secondaryText">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
