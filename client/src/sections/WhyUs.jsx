import { motion } from 'framer-motion'
import { ArrowUpRight, Users, Code2, Sparkles, ShieldCheck } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'

export default function WhyUs() {
  return (
    <Section id="why-us" className="bg-[#FAFAFA] border-y border-[#E5E7EB]">
      <Container>
        {/* Large Rounded Banner Card (Helaph structure: Designers, engineers, problem solvers) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-gradient-to-br from-white to-[#FAFAFA] p-8 sm:p-12 lg:p-14 shadow-sm"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Column Text & Button */}
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
                WHO WE ARE
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
                Designers, engineers, <span className="italic font-serif font-normal text-[#5F8D3B]">problem solvers.</span>
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-[#555555] sm:text-base max-w-xl">
                We are a tight-knit digital studio that combines strategy, design, and full-stack software development to help ambitious businesses stand out and grow.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#contact" variant="primary" className="!px-7 !py-3.5 !text-xs font-bold uppercase tracking-wider">
                  READ OUR STORY <ArrowUpRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5F8D3B]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Direct Senior Team Access</span>
                </div>
              </div>
            </div>

            {/* Right Column Team Showcase Graphic (Helaph structure) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="minimal-card p-5 bg-white border border-[#E5E7EB]">
                <Users className="h-6 w-6 text-[#5F8D3B]" />
                <h3 className="mt-3 text-sm font-bold text-[#0F0F0F]">Senior Designers</h3>
                <p className="mt-1 text-xs text-[#555555]">Bespoke UI, typography hierarchy, and conversion layout math.</p>
              </div>

              <div className="minimal-card p-5 bg-white border border-[#E5E7EB]">
                <Code2 className="h-6 w-6 text-[#5F8D3B]" />
                <h3 className="mt-3 text-sm font-bold text-[#0F0F0F]">Lead Engineers</h3>
                <p className="mt-1 text-xs text-[#555555]">Clean React, Next.js, and sub-second page performance.</p>
              </div>

              <div className="minimal-card p-5 bg-white border border-[#E5E7EB] sm:col-span-2">
                <Sparkles className="h-6 w-6 text-[#5F8D3B]" />
                <h3 className="mt-3 text-sm font-bold text-[#0F0F0F]">AI & Automation Specialists</h3>
                <p className="mt-1 text-xs text-[#555555]">24/7 AI triage bots, WhatsApp reminders, and CRM sync.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
