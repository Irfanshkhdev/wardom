import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Code2, Globe, Layout } from 'lucide-react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'

const ALL_PROJECTS = [
  {
    title: 'Yana Nail Studio',
    category: 'portfolio',
    summary: 'Bespoke portfolio and appointment booking engine for high-end nail art studio.',
    icon: Sparkles,
  },
  {
    title: 'Rishu Portfolio',
    category: 'portfolio',
    summary: 'High-impact digital identity and interactive engineering portfolio.',
    icon: Code2,
  },
  {
    title: 'The Girlfriend Hour',
    category: 'Landing',
    summary: 'High-converting podcast landing page and media subscriber hub.',
    icon: Globe,
  },
  {
    title: 'Amber ENT',
    category: 'Landing',
    summary: 'Medical clinic patient intake portal and AI scheduling platform.',
    icon: Layout,
  },
  {
    title: 'Aura Bistro & Lounge',
    category: 'Full-Stack App',
    summary: 'Direct table reservation engine, QR contactless menu, and WhatsApp confirmations.',
    icon: Globe,
  },
  {
    title: 'Pulse Fitness & Gym',
    category: 'Mobile App',
    summary: 'HIIT class pass booking, member subscription billing, and trainer passes.',
    icon: Sparkles,
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0F0F0F]">
      <Navbar />

      <main className="pt-32 pb-24">
        <Container>
          <div className="max-w-3xl border-b border-[#E5E7EB] pb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5F8D3B]">
              SELECTED WORK
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-6xl">
              Crafted with precision & purpose.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#555555]">
              Explore our recent web applications, landing pages, mobile apps, and digital portfolios built for real business growth.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PROJECTS.map((p, idx) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="minimal-card p-6 bg-white border border-[#E5E7EB] hover:border-[#5F8D3B] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5F8D3B]">
                        {p.category}
                      </span>
                      <Icon className="h-4 w-4 text-[#999999]" />
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold text-[#0F0F0F]">{p.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#555555]">{p.summary}</p>
                  </div>

                  <div className="mt-6 border-t border-[#E5E7EB] pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#5F8D3B]">View Project Details</span>
                    <ArrowUpRight className="h-4 w-4 text-[#5F8D3B]" />
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-16 text-center rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-10">
            <h2 className="text-2xl font-extrabold text-[#0F0F0F]">Have a project in mind?</h2>
            <p className="mt-2 text-xs text-[#555555]">Let's build something world-class together.</p>
            <div className="mt-6 flex justify-center">
              <Button href="/#contact" variant="primary" className="!px-8 !py-3.5 font-bold">
                Start your project <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
