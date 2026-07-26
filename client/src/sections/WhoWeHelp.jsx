import { motion } from 'framer-motion'
import { Coffee, Utensils, Dumbbell, Sparkles, Stethoscope, Hotel, Rocket, ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const AUDIENCES = [
  {
    icon: Coffee,
    emoji: '☕',
    title: 'Cafes & Bistros',
    subtitle: 'Modern digital menus, instant online ordering, and local Google Maps optimization.',
    outcome: 'Increased takeaway sales & walk-in customers.',
  },
  {
    icon: Utensils,
    emoji: '🍽',
    title: 'Restaurants',
    subtitle: 'Direct online table reservation engines, zero-commission ordering, and VIP customer loyalty.',
    outcome: '+42% direct table reservations.',
  },
  {
    icon: Dumbbell,
    emoji: '🏋',
    title: 'Gyms & Fitness',
    subtitle: 'HIIT & class booking platforms, automated membership billing, and personal trainer booking.',
    outcome: '+180% personal training inquiries.',
  },
  {
    icon: Sparkles,
    emoji: '💅',
    title: 'Nail Art & Salons',
    subtitle: 'Stylist portfolio galleries, online appointment booking, and advance deposits.',
    outcome: '-94% appointment no-shows.',
  },
  {
    icon: Stethoscope,
    emoji: '🏥',
    title: 'Clinics & Doctors',
    subtitle: '24/7 AI patient triage assistants, HIPAA-compliant patient intake, and calendar sync.',
    outcome: '+240% patient appointment conversions.',
  },
  {
    icon: Hotel,
    emoji: '🏨',
    title: 'Hotels & Resorts',
    subtitle: 'Direct room booking engines, amenity guides, mobile check-in, and local tourism hubs.',
    outcome: 'Eliminate third-party OTA commissions.',
  },
  {
    icon: Rocket,
    emoji: '🚀',
    title: 'Startups & SaaS',
    subtitle: 'High-converting landing pages, full-stack React dashboards, and Stripe subscription billing.',
    outcome: 'Accelerated time-to-market in weeks.',
  },
]

export default function WhoWeHelp() {
  return (
    <Section id="who-we-help" className="bg-[#FAFAFA] border-y border-[#E5E7EB]">
      <Container>
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
            WHO WE HELP
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
            We build websites & digital products for
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">
            No generic templates. Every platform is custom engineered to solve specific operational challenges and bring you more customers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="minimal-card p-6 flex flex-col justify-between group hover:border-[#5F8D3B] bg-white"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <h3 className="text-base font-extrabold text-[#0F0F0F] group-hover:text-[#5F8D3B] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <Icon className="h-4 w-4 text-[#999999]" />
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#555555]">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-3 flex items-center justify-between text-xs font-semibold text-[#5F8D3B]">
                  <span>{item.outcome}</span>
                  <a href="#contact" className="hover:underline inline-flex items-center gap-1">
                    Book <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
