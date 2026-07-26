import { motion } from 'framer-motion'
import { Gauge, Fingerprint, ShieldCheck } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const REASONS = [
  {
    icon: Gauge,
    title: 'Calm execution',
    description: 'We bring structure to fast-moving ideas so momentum feels clear, not chaotic.',
  },
  {
    icon: Fingerprint,
    title: 'Tailored systems',
    description: 'Every interface and interaction is shaped to fit the brand, product, and audience it serves.',
  },
  {
    icon: ShieldCheck,
    title: 'Built to endure',
    description: 'The final product is maintainable, documented, and robust enough for real-world growth.',
  },
]

export default function WhyUs() {
  return (
    <Section id="why-us" eyebrow="Why WARDOM" className="bg-surface/40">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-xl">
            <h2 className="font-heading text-4xl leading-tight text-primaryText md:text-6xl">
              The kind of partner that makes <span className="italic text-accent">complex work feel effortless.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-white/10 bg-background/70 p-6"
                >
                  <Icon className="mb-6 text-accent" size={24} />
                  <h3 className="mb-2 font-heading text-xl text-primaryText">{reason.title}</h3>
                  <p className="text-sm leading-7 text-secondaryText">{reason.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
