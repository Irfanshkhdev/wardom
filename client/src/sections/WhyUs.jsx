import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'

export default function WhyUs() {
  return (
    <Section id="why-us" className="bg-[#FAFAFA] dark:bg-[#090A0F] border-y border-[#E5E7EB] dark:border-[#27272A] transition-colors duration-200">
      <Container>
        {/* Clean Banner Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] dark:border-[#27272A] bg-gradient-to-br from-white to-[#FAFAFA] dark:from-[#12131A] dark:to-[#181924] p-8 sm:p-12 lg:p-16 shadow-sm max-w-5xl mx-auto"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0F0F0F] dark:text-white sm:text-4xl lg:text-5xl leading-[1.1]">
              Designers, engineers, <span className="italic font-serif font-normal text-[#5F8D3B]">problem solvers.</span>
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-[#555555] dark:text-gray-300 sm:text-base">
              We're a tight-knit team of builders who care deeply about craft. From pixel-perfect interfaces to robust backend systems, we bring ideas to life with speed, intention, and an obsessive eye for detail because great digital products deserve nothing less.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/about" variant="primary" className="!px-7 !py-3.5 !text-xs font-bold uppercase tracking-wider">
                About us <ArrowUpRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5F8D3B]">
                <ShieldCheck className="h-4 w-4" />
                <span>Obsessive eye for detail & craft</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
