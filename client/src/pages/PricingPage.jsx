import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'

const TIERS = [
  {
    name: 'Landing Page',
    price: '₹50,000 / $650',
    description: 'High-converting single page website designed for startups & local businesses.',
    features: [
      'Bespoke Mobile-First Design',
      'SEO & Speed Optimization',
      'Contact Form & Lead Capture',
      'Google Maps & Analytics',
      '2-Week Turnaround',
    ],
  },
  {
    name: 'Full-Stack Application',
    price: '₹1,50,000 / $1,800',
    popular: true,
    description: 'Complex web ecosystems, client dashboards, booking portals, and custom CMS.',
    features: [
      'Everything in Landing Page',
      'User Auth & Database Setup',
      'Razorpay / Stripe Integration',
      'Executive Admin Console',
      'Custom API Engineering',
      '3-4 Week Turnaround',
    ],
  },
  {
    name: 'Mobile Application',
    price: '₹2,50,000 / $3,000',
    description: 'Cross-platform iOS & Android mobile apps built with React Native.',
    features: [
      'iOS & Android App Build',
      'Push Notifications Engine',
      'Real-Time Sync & Offline Cache',
      'App Store & Play Store Publishing',
      'Dedicated Backend API',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0F0F0F]">
      <Navbar />

      <main className="pt-32 pb-24">
        <Container>
          <div className="max-w-3xl border-b border-[#E5E7EB] pb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5F8D3B]">
              TRANSPARENT PRICING
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-6xl">
              Simple, predictable investments.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#555555]">
              No hidden fees or unexpected costs. Choose the tier that matches your business scope or request a custom quote.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`minimal-card p-8 bg-white flex flex-col justify-between border ${
                  tier.popular ? 'border-[#5F8D3B] ring-2 ring-[#5F8D3B]/20' : 'border-[#E5E7EB]'
                }`}
              >
                <div>
                  {tier.popular && (
                    <span className="inline-block rounded-full bg-[#5F8D3B] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold text-[#0F0F0F]">{tier.name}</h3>
                  <div className="mt-4 text-2xl font-extrabold text-[#5F8D3B]">{tier.price}</div>
                  <p className="mt-2 text-xs leading-relaxed text-[#555555]">{tier.description}</p>

                  <div className="mt-6 border-t border-[#E5E7EB] pt-6 space-y-3">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs font-semibold text-[#0F0F0F]">
                        <CheckCircle2 className="h-4 w-4 text-[#5F8D3B] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Button href="/#contact" variant={tier.popular ? 'primary' : 'secondary'} className="!w-full justify-center !py-3 font-bold">
                    Start project <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
