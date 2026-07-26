import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Layout, Globe, Code2 } from 'lucide-react'
import Container from '../components/Container'
import Button from '../components/Button'
import ProjectModal from '../components/ProjectModal'

const RECENT_WORK_CARDS = [
  {
    id: 'yana-nail-studio',
    title: 'Yana Nail Studio',
    tag: 'portfolio',
    clientType: 'Beauty & Spa',
    subtitle: 'Bespoke Nail Salon Web App',
    metric: 'Bespoke Portfolio & Booking',
    description: 'A minimalist, quiet luxury portfolio website built for Yana Nail Studio. Features a soft pastel and rich plum aesthetic, high-quality image galleries showing precise nail extensions and manicures, structured service pricing menus, and clean CTA flows for reserving a seat in the studio.',
    highlights: ['Quiet luxury visual design', 'Integrated video banner', 'Clean pricing & menu cards', 'Sanctuary experience highlights'],
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    images: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    ],
    liveUrl: 'https://helaph.online',
    icon: Sparkles,
  },
  {
    id: 'rishu-portfolio',
    title: 'Rishu Portfolio',
    tag: 'portfolio',
    clientType: 'Product Design',
    subtitle: 'Developer & Craft Identity',
    metric: 'High-Impact Digital Identity',
    description: 'A narrative-driven developer & design portfolio showcasing complex full-stack ecosystems, modern frameworks, and interactive side projects.',
    highlights: ['Interactive skills showcase', 'Cinematic theme', 'Project case studies', 'Instant booking contact flow'],
    stack: ['React', 'Framer Motion', 'TailwindCSS'],
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    liveUrl: 'https://helaph.online',
    icon: Code2,
  },
  {
    id: 'girlfriend-hour',
    title: 'The Girlfriend Hour',
    tag: 'Landing',
    clientType: 'Media & Podcast',
    subtitle: 'Podcast & Media Platform',
    metric: 'High-Converting Landing Page',
    description: 'An elegant, pastel-toned landing platform built for a popular podcast series with direct streaming links and community newsletter intake.',
    highlights: ['Spotify & Apple podcast embeds', 'Community membership intake', 'Pastel aesthetic', 'Sub-second speed'],
    stack: ['React', 'Vite', 'TailwindCSS'],
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    ],
    liveUrl: 'https://helaph.online',
    icon: Globe,
  },
  {
    id: 'amber-ent',
    title: 'Amber ENT',
    tag: 'Landing',
    clientType: 'Healthcare',
    subtitle: 'Medical Clinic Web Experience',
    metric: 'Patient Intake & Triage Engine',
    description: 'A clean, trustworthy medical clinic web experience with HIPAA-compliant intake forms and specialist appointment booking.',
    highlights: ['Trustworthy clinical layout', 'Instant calendar scheduling', 'Doctor bios & services', 'Mobile touch UX'],
    stack: ['Next.js', 'PostgreSQL', 'TailwindCSS'],
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    ],
    liveUrl: 'https://helaph.online',
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
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="top" className="relative overflow-hidden bg-white dark:bg-[#090A0F] pt-32 pb-16 lg:pt-40 lg:pb-24 transition-colors duration-200">
      {/* Background Glow */}
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
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#12131A] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5F8D3B]"
          >
            WE BUILD
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-[#0F0F0F] dark:text-white sm:text-6xl lg:text-7xl leading-[1.05]"
          >
            Digital Products <span className="italic font-serif font-normal text-[#5F8D3B]">that Scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#555555] dark:text-gray-300 sm:text-lg lg:text-xl"
          >
            Engineering world-class logic and seamless digital experiences.
          </motion.p>
        </div>

        {/* 4 Static Recent Work Cards Side-by-Side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14"
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#27272A] pb-3 mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F8D3B]">
              Recent work
            </span>
            <a href="/projects" className="text-xs font-bold text-[#555555] dark:text-gray-400 hover:text-[#5F8D3B] flex items-center gap-1">
              more work <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECENT_WORK_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveProject(card)}
                  className="minimal-card relative overflow-hidden p-5 flex flex-col justify-between min-h-[280px] cursor-pointer group bg-white dark:bg-[#12131A] border border-[#E5E7EB] dark:border-[#27272A] hover:border-[#5F8D3B] transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#27272A] pb-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5F8D3B]">
                        {card.tag}
                      </span>
                      <Icon className="h-4 w-4 text-[#999999] dark:text-gray-500" />
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-[#0F0F0F] dark:text-white group-hover:text-[#5F8D3B] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#555555] dark:text-gray-400 mt-1">{card.subtitle}</p>
                  </div>

                  <div className="mt-6 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] p-3.5 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0F0F0F] dark:text-white">{card.metric}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#5F8D3B]" />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
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

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 divide-x divide-[#E5E7EB] dark:divide-[#27272A] border-t border-[#E5E7EB] dark:border-[#27272A] pt-10 sm:grid-cols-4"
        >
          {HELAPH_STATS.map((stat, i) => (
            <div key={stat.label} className={`px-4 text-center ${i === 0 ? 'pl-0' : ''}`}>
              <div className="text-3xl font-extrabold tracking-tight text-[#0F0F0F] dark:text-white sm:text-4xl">
                {stat.value}
              </div>
              <p className="mt-1 text-xs font-medium text-[#555555] dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Theme Adaptive Project Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
