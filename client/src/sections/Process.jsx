import { motion } from 'framer-motion'
import Section from '../components/Section'
import Container from '../components/Container'

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    description: 'We start with the business context, audience, and product goals so the plan is grounded before any design choices are made.',
  },
  {
    num: '02',
    title: 'Shape',
    description: 'A refined experience framework emerges: structure, voice, interaction language, and the first design system decisions.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'We translate the concept into a production-ready product with thoughtful frontend architecture and high-quality code.',
  },
  {
    num: '04',
    title: 'Launch',
    description: 'The release is prepared with care, then supported through iteration as the product grows and evolves.',
  },
]

export default function Process() {
  return (
    <Section id="process" eyebrow="Process">
      <Container>
        <div className="mb-16 max-w-3xl">
          <h2 className="font-heading text-4xl leading-tight text-primaryText md:text-6xl">
            A disciplined path from <span className="italic text-accent">brief</span> to launch.
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="mb-6 block font-mono-num text-sm text-accent">{step.num}</span>
              <h3 className="mb-3 font-heading text-2xl text-primaryText">{step.title}</h3>
              <p className="text-sm leading-7 text-secondaryText">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
