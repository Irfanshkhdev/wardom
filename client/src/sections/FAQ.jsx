import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const FAQS = [
  {
    q: 'What types of businesses do you build for?',
    a: 'We specialize in custom web development and web apps for cafes & restaurants, gyms & fitness centers, nail art & beauty salons, medical clinics & doctors, luxury hotels, local services, personal brands, and tech startups.',
  },
  {
    q: 'How fast can our website be launched?',
    a: 'Our typical development sprint takes 2 to 4 weeks from project brief to live domain launch.',
  },
  {
    q: 'Do I own 100% of the code and design files?',
    a: 'Yes. Upon completion, we perform a full transfer of the GitHub repository, hosting accounts, and Figma design tokens.',
  },
  {
    q: 'Can you integrate online appointment booking & payment deposits?',
    a: 'Yes! We build automated booking systems with UPI, Stripe, and credit card deposit support to eliminate no-shows for salons, clinics, and gyms.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes 30 days of post-launch support, performance audits, and security updates.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <Section
      id="faq"
      label="FAQ"
      title="Questions & Answers"
      description="Everything you need to know about timeline, pricing, ownership, and post-launch support."
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm">
            {FAQS.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q} className="py-4 first:pt-1 last:pb-1">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 text-left transition-colors hover:text-[#5F8D3B]"
                  >
                    <span className="text-base font-bold text-[#0F0F0F] sm:text-lg">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen ? 'bg-[#5F8D3B] text-white border-[#5F8D3B]' : 'bg-[#FAFAFA] text-[#0F0F0F] border-[#E5E7EB]'
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-xs leading-relaxed text-[#555555] sm:text-sm">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
