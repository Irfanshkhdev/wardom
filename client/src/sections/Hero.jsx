import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Layout, Globe, Code2 } from 'lucide-react'
import Container from '../components/Container'
import Button from '../components/Button'

const RECENT_WORK_CARDS = [
  {
    title: 'Yana Nail Studio',
    tag: 'portfolio',
    type: 'Bespoke Nail Salon Web App',
    metric: 'Bespoke Portfolio & Booking',
    icon: Sparkles,
  },
  {
    title: 'Rishu Portfolio',
    tag: 'portfolio',
    type: 'Developer & Craft Identity',
    metric: 'High-Impact Digital Identity',
    icon: Code2,
  },
  {
    title: 'The Girlfriend Hour',
    tag: 'Landing',
    type: 'Podcast & Media Platform',
    metric: 'High-Converting Landing Page',
    icon: Globe,
  },
  {
    title: 'Amber ENT',
    tag: 'Landing',
    type: 'Medical Clinic Web Experience',
    metric: 'Patient Intake & Triage Engine',
    icon: Layout,
  },
]

const HELAPH_STATS = [
  { value: '7+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '2+', label: 'Years Experience' },
  { value: '2', label: 'Expert Developers' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 -z-10 flex justify-center">
        <div className="h-[600px] w-[900px] bg-[radial-gradient(ellipse_at_top,_rgba(95,141,59,0.08),_transparent_70%)]" />
      </div>

      <Container>
        {/* Top Eyebrow Badge (WE BUILD) */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5F8D3B]"
          >
            WE BUILD
          </motion.div>

          {/* Main Title (Digital Products that Scale.) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-6xl lg:text-7xl leading-[1.05]"
          >
            Digital Products <span className="italic font-serif font-normal text-[#5F8D3B]">that Scale.</span>
          </motion.h1>

          {/* Subheadline (Engineering world-class logic and seamless digital experiences.) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg lg:text-xl"
          >
            Engineering world-class logic and seamless digital experiences.
          </motion.p>
        </div>

        {/* Recent Work Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F8D3B]">
              Recent work
            </span>
            <a href="/projects" className="text-xs font-bold text-[#555555] hover:text-[#5F8D3B] flex items-center gap-1">
              more work <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECENT_WORK_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="minimal-card relative overflow-hidden p-5 flex flex-col justify-between min-h-[280px] group bg-white border border-[#E5E7EB] hover:border-[#5F8D3B] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5F8D3B]">
                        {card.tag}
                      </span>
                      <Icon className="h-4 w-4 text-[#999999]" />
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-[#0F0F0F] group-hover:text-[#5F8D3B] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#555555] mt-1">{card.type}</p>
                  </div>

                  <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                    <span className="block text-[10px] font-mono font-bold uppercase text-[#999999]">
                      Project Overview
                    </span>
                    <span className="mt-1 block text-xs font-extrabold text-[#0F0F0F]">{card.metric}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Action Buttons (more work & Start your project) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/projects" variant="secondary" className="!px-7 !py-3.5 !text-xs font-bold">
            more work <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button href="#contact" variant="primary" className="!px-8 !py-3.5 !text-xs font-bold">
            Start your project <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Horizontal Stats Bar (7+ Projects, 100% Satisfaction, 2+ Years Experience, 2 Expert Developers) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB] pt-10 sm:grid-cols-4"
        >
          {HELAPH_STATS.map((stat, i) => (
            <div key={stat.label} className={`px-4 text-center ${i === 0 ? 'pl-0' : ''}`}>
              <div className="text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-1 text-xs font-medium text-[#555555]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
