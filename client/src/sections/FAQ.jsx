import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const FAQS = [
  {
    q: 'What kinds of projects do you take on?',
    a: 'We work on premium websites, product marketing experiences, and modern software interfaces for companies that need both beauty and clarity.',
  },
  {
    q: 'How quickly can we begin?',
    a: 'Most projects start with a short discovery call and a focused proposal. From there, we can move into design and build within a matter of days.',
  },
  {
    q: 'Do you support long-term partnerships?',
    a: 'Yes. We often stay on after launch for iteration, evolution, and ongoing design support as the product grows.',
  },
  {
    q: 'What is the collaboration process like?',
    a: 'We keep things structured but thoughtful, with clear milestones, timely feedback loops, and a calm process that helps decisions move forward.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" eyebrow="FAQ" className="bg-surface/40">
      <Container>
        <div className="mb-14 max-w-2xl">
          <h2 className="font-heading text-4xl leading-tight text-primaryText md:text-6xl">
            Questions, <span className="italic text-accent">answered plainly.</span>
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="py-6">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-cursor-hover
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="font-heading text-xl text-primaryText md:text-2xl">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-accent"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 max-w-2xl text-base leading-7 text-secondaryText">{item.a}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
