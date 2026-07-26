import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const PROJECTS = [
  {
    name: 'Nocturne Audio',
    category: 'Commerce · Web app',
    year: '2026',
    summary: 'A premium storefront and service portal that turns a complex catalog into a calm, conversion-led experience.',
  },
  {
    name: 'Alto Capital',
    category: 'Fintech · Brand + Web',
    year: '2025',
    summary: 'A polished financial platform narrative paired with a fast, highly structured product site.',
  },
  {
    name: 'Verdant Skincare',
    category: 'DTC · Commerce',
    year: '2025',
    summary: 'A quieter, more elevated direct-to-consumer experience with thoughtful shopping flows and motion.',
  },
  {
    name: 'Halcyon Studio',
    category: 'Portfolio · Motion',
    year: '2024',
    summary: 'A compact editorial portfolio that lets a creative team present work with the same care as the work itself.',
  },
]

export default function FeaturedWork() {
  const [projects, setProjects] = useState(PROJECTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api/projects`)
        if (!response.ok) throw new Error('Unable to load projects')
        const data = await response.json()
        if (Array.isArray(data) && data.length) {
          setProjects(data)
        }
      } catch {
        setProjects(PROJECTS)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <Section id="work" eyebrow="Featured work">
      <Container>
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl leading-tight text-primaryText md:text-6xl">
              Selected <span className="italic text-accent">products</span> for modern teams.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-secondaryText">
            Each engagement is shaped around a clear narrative, a disciplined system, and a high-quality product experience.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {loading ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-secondaryText lg:col-span-2">
              Loading featured work…
            </div>
          ) : null}
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group rounded-[28px] border border-white/10 bg-background/70 p-7 transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono-num text-sm uppercase tracking-[0.3em] text-secondaryText">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.25em] text-secondaryText">
                  {project.year}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-2xl text-primaryText md:text-3xl">{project.name}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-accent">{project.category || 'Featured project'}</p>
              <p className="mt-4 text-base leading-7 text-secondaryText">
                {project.summary || `A refined digital experience crafted for ${project.name || 'a modern team'}.`}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primaryText/80">
                View case study <ArrowUpRight size={16} />
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
