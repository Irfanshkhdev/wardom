import { motion } from 'framer-motion'
import Container from '../components/Container'
import { Zap, ShieldCheck, Award, Globe2 } from 'lucide-react'

const VERTICALS = [
  'Cafes & Bistros',
  'Gyms & Fitness',
  'Nail Art & Salons',
  'Doctors & Clinics',
  'Hotels & Resorts',
  'Tech Startups',
]

const STATS = [
  {
    value: '50+',
    label: 'Digital Products Built',
    description: 'Bespoke web apps, booking systems, and business platforms shipped to live production.',
    icon: Zap,
  },
  {
    value: '$40M+',
    label: 'Client Revenue Impact',
    description: 'Direct bottom-line revenue generated through high-converting web interfaces.',
    icon: ShieldCheck,
  },
  {
    value: '99.8%',
    label: 'On-Time Delivery Rate',
    description: 'Disciplined 2-to-4 week development sprints with zero scope creep.',
    icon: Award,
  },
  {
    value: '6+',
    label: 'Global Markets',
    description: 'Trusted by business owners and ambitious founders across 6 countries.',
    icon: Globe2,
  },
]

export default function Statistics() {
  return (
    <section className="border-y border-[#E5E7EB] bg-[#FAFAFA] py-20 lg:py-24">
      <Container>
        {/* Industry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] pb-10">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#999999]">
            Tailored For:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {VERTICALS.map((item) => (
              <span key={item} className="rounded-full bg-white border border-[#E5E7EB] px-3.5 py-1 text-xs font-medium text-[#0F0F0F] shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="minimal-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-extrabold tracking-tight text-[#0F0F0F] lg:text-5xl">
                      {stat.value}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5F8D3B]/10 text-[#5F8D3B]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[#0F0F0F]">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#555555]">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
