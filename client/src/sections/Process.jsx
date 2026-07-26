import { motion } from 'framer-motion'
import Section from '../components/Section'
import Container from '../components/Container'

const STEPS = [
  {
    number: '1',
    title: 'Discovery',
    description: 'We learn about your business goals, target clients, and technical requirements.',
  },
  {
    number: '2',
    title: 'Design',
    description: 'Bespoke UI design, mobile touch patterns, and conversion layout math.',
  },
  {
    number: '3',
    title: 'Development',
    description: 'Clean full-stack software engineering, booking system, & database integration.',
  },
  {
    number: '4',
    title: 'Launch',
    description: 'Cross-browser testing, Lighthouse 100 speed optimization, and live domain go-live.',
  },
  {
    number: '5',
    title: 'Support',
    description: '30-day post-launch warranty, ongoing growth management, and feature updates.',
  },
]

export default function Process() {
  return (
    <Section id="process" label="Simple Process" className="bg-[#FAFAFA] border-y border-[#E5E7EB]">
      <Container>
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
            HOW WE WORK
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
            Our simple 5-step process.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">
            No complicated jargon or endless meetings. We take care of everything from start to finish.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="minimal-card p-6 flex flex-col justify-between bg-white"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5F8D3B] text-xs font-bold text-white">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#999999]">Step {step.number}</span>
                </div>

                <h3 className="mt-4 text-base font-extrabold text-[#0F0F0F]">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
