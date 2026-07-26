import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'

const SERVICES_ROWS = [
  {
    number: '01',
    title: 'Landing Pages',
    summary: 'High-converting landing pages that turn visitors into customers',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'A/B Testing'],
  },
  {
    number: '02',
    title: 'Full-Stack Applications',
    summary: 'End-to-end engineering of complex web ecosystems. We build scalable, secure, and high-performance applications from the ground up, tailored to your business logic.',
    features: ['Modern Tech Stack', 'Scalable Architecture', 'API Integration', 'Cloud Deployment'],
  },
  {
    number: '03',
    title: 'Mobile Applications',
    summary: 'Next-generation mobile experiences for iOS and Android. We leverage native and cross-platform technologies to deliver fluid, responsive, and feature-rich apps.',
    features: ['Cross-Platform', 'Native Performance', 'App Store Ready', 'Push Notifications'],
  },
  {
    number: '04',
    title: 'Portfolio Websites',
    summary: 'Premium digital identity experiences. We craft high-impact, narrative-driven portfolios that showcase your expertise with cinematic quality and technical precision.',
    features: ['Professional Design', 'Portfolio Gallery', 'Contact Forms', 'SEO Ready'],
  },
]

export default function Services() {
  return (
    <Section id="services" className="bg-[#FAFAFA] border-y border-[#E5E7EB]">
      <Container>
        {/* Top Header Split (Helaph exact text) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#E5E7EB] pb-12">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
              OUR EXPERTISE
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
              Specialized services for digital growth.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#555555]">
            End-to-end digital solutions crafted with modern technology and a deep focus on performance, design, and reliable results.
          </p>
        </div>

        {/* 4 Numbered Service Rows */}
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

        {/* Bottom Action CTAs (Discuss your needs & View pricing) */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-8">
          <a href="#contact" className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] hover:text-[#5F8D3B] flex items-center gap-1">
            Discuss your needs <ArrowUpRight className="h-4 w-4" />
          </a>
          <Button href="/pricing" variant="primary" className="!text-xs !px-6 !py-3 font-bold uppercase tracking-wider">
            View pricing <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
