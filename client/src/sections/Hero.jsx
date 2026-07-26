import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Dumbbell, Utensils, Stethoscope, CheckCircle2 } from 'lucide-react'
import Container from '../components/Container'
import Button from '../components/Button'

const SHOWCASE_CARDS = [
  {
    title: 'Velvet Beauty & Nails',
    subtitle: 'Nail Art & Salon Web App',
    header: 'Stylist Portfolio & Booking',
    metric: '4.9★ (320 Reviews)',
    icon: Sparkles,
  },
  {
    title: 'Pulse Fitness & Gym',
    subtitle: 'Gym Member App & Portal',
    header: 'HIIT Class Pass System',
    metric: '1,480 Active Members',
    icon: Dumbbell,
  },
  {
    title: 'Aura Bistro & Lounge',
    subtitle: 'Cafe & Restaurant App',
    header: 'Direct Table Reservations',
    metric: '+310% Online Bookings',
    icon: Utensils,
  },
  {
    title: 'Luminary Medical Center',
    subtitle: 'Doctor & Clinic Portal',
    header: '24/7 AI Triage Assistant',
    metric: 'HIPAA Compliant',
    icon: Stethoscope,
  },
]

const STATS = [
  { value: '7+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction Rate' },
  { value: '2+', label: 'Years Experience' },
  { value: '2', label: 'Active Engineers & Designers' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 -z-10 flex justify-center">
        <div className="h-[600px] w-[900px] bg-[radial-gradient(ellipse_at_top,_rgba(95,141,59,0.08),_transparent_70%)]" />
      </div>

      <Container>
        {/* Top Pill Badge (Helaph structure) */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5F8D3B]"
          >
            WEB DESIGN
          </motion.div>

          {/* Main Headline (Digital Products that Scale.) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-6xl lg:text-7xl leading-[1.05]"
          >
            Digital Products <span className="italic font-serif font-normal text-[#5F8D3B]">that Scale.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg lg:text-xl"
          >
            Transforming ambitious ideas into high-converting websites and scalable digital experiences.
          </motion.p>
        </div>

        {/* 4 Showcase Gallery Mockup Cards (Helaph structure) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SHOWCASE_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="minimal-card relative overflow-hidden p-5 flex flex-col justify-between min-h-[280px] group bg-white"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5F8D3B]">
                      SHOWCASE
                    </span>
                    <Icon className="h-4 w-4 text-[#999999]" />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-[#0F0F0F] group-hover:text-[#5F8D3B] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#555555] mt-1">{card.subtitle}</p>
                </div>

                {/* Inner Mockup Frame */}
                <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <span className="block text-[10px] font-mono font-bold uppercase text-[#999999]">
                    {card.header}
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0F0F0F]">{card.metric}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5F8D3B]" />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Action Buttons Below Showcase (Helaph structure: VIEW WORK ↗ + BOOK A DISCOVERY CALL ↗) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#work" variant="secondary" className="!px-7 !py-3.5 !text-xs font-bold uppercase tracking-wider">
            VIEW WORK <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button href="#contact" variant="primary" className="!px-8 !py-3.5 !text-xs font-bold uppercase tracking-wider">
            BOOK A DISCOVERY CALL <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Horizontal Stats Bar Below Hero (Helaph structure: 4 equal columns divided by hairlines) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 divide-x divide-[#E5E7EB] border-t border-[#E5E7EB] pt-10 sm:grid-cols-4"
        >
          {STATS.map((stat, i) => (
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
