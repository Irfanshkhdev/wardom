import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'

const SERVICES_ROWS = [
  {
    number: '01',
    title: 'Landing Pages',
    summary: 'High-converting web design tailored for local businesses & startups.',
    features: ['Rapid 2-Week Turnaround', 'SEO & Speed Optimization', 'Conversion-Focused Funnel', 'A/B Testing Ready'],
  },
  {
    number: '02',
    title: 'Full-Stack Applications',
    summary: 'Custom web applications, booking portals, client dashboards, and custom CMS.',
    features: ['Secure Auth & Payments', 'Scalable Cloud Infrastructure', 'Custom Executive Admin Panel', 'Real-Time Database'],
  },
  {
    number: '03',
    title: 'Mobile Applications',
    summary: 'Cross-platform iOS & Android apps for appointment booking, customer loyalty, and pre-orders.',
    features: ['Native Performance', 'Push Notifications', 'Intuitive Touch UX', 'App Store Release'],
  },
  {
    number: '04',
    title: 'Portfolio & Business Websites',
    summary: 'High-craft websites for Cafes, Salons, Gyms, Clinics, Hotels, and Personal Brands.',
    features: ['Bespoke Visual Identity', 'Sub-Second Page Speeds', 'Custom Micro-Animations', '100% Code Ownership'],
  },
]

export default function Services() {
  return (
    <Section id="services" className="bg-[#FAFAFA] border-y border-[#E5E7EB]">
      <Container>
        {/* Top Header Split (Helaph structure) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#E5E7EB] pb-12">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
              OUR SERVICES
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
              Specialized services for digital growth.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#555555]">
            We build modern digital products that turn visitors into customers... combining research, top-tier engineering, and human-centric design.
          </p>
        </div>

        {/* 4 Numbered Service Rows divided by hairline lines (Helaph structure) */}
        <div className="mt-10 divide-y divide-[#E5E7EB]">
          {SERVICES_ROWS.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="py-10 first:pt-4 last:pb-4 grid gap-8 lg:grid-cols-[0.4fr_1.6fr] lg:items-center"
            >
              {/* Left Number & Title */}
              <div>
                <span className="font-mono text-sm font-bold text-[#5F8D3B] block">
                  {service.number}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-[#0F0F0F]">
                  {service.title}
                </h3>
              </div>

              {/* Right Summary & 2x2 Feature Checkmarks */}
              <div className="grid gap-6 md:grid-cols-2 lg:items-center">
                <p className="text-sm leading-relaxed text-[#555555]">
                  {service.summary}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs font-semibold text-[#0F0F0F]">
                      <CheckCircle2 className="h-4 w-4 text-[#5F8D3B] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Action CTAs (Helaph structure: DISCOVER ALL SERVICES ↗ + GET A CUSTOM QUOTE ↗) */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-8">
          <a href="#work" className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] hover:text-[#5F8D3B] flex items-center gap-1">
            DISCOVER ALL SERVICES <ArrowUpRight className="h-4 w-4" />
          </a>
          <Button href="#contact" variant="primary" className="!text-xs !px-6 !py-3 font-bold uppercase tracking-wider">
            GET A CUSTOM QUOTE <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
