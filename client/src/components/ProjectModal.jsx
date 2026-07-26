import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[#EAEAEA] bg-white p-6 shadow-cardHover sm:p-8 md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#EAEAEA] bg-[#F9FAFB] text-[#111111] transition-colors hover:bg-[#EAEAEA]"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="green" icon={Sparkles}>
                {project.category}
              </Badge>
              <Badge variant="outline">
                {project.clientType}
              </Badge>
            </div>

            <h3 className="mt-4 text-3xl font-extrabold text-[#111111] sm:text-4xl md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-[#666666]">
              {project.fullDescription || project.description}
            </p>

            {/* Visual Header Banner */}
            <div className={`mt-8 overflow-hidden rounded-2xl border border-[#EAEAEA] bg-gradient-to-br ${project.gradient || 'from-[#F9FAFB] to-[#F4F5F6]'} p-6 sm:p-10`}>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5F8D3B]">Key Impact Delivered</span>
                  <div className="mt-2 text-4xl font-extrabold text-[#111111] sm:text-5xl">
                    {project.metricValue}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#666666]">
                    {project.metricLabel}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#111111] shadow-subtle border border-[#EAEAEA]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {project.stats?.map((stat, i) => (
                <div key={i} className="rounded-2xl border border-[#EAEAEA] bg-[#F9FAFB] p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#666666]">
                    <TrendingUp className="h-4 w-4 text-[#5F8D3B]" />
                    {stat.label}
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-[#111111]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables & Technology */}
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-base font-bold text-[#111111] flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#5F8D3B]" />
                  What We Designed & Built
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.deliverables?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-[#666666]">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#5F8D3B] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#111111]">Tech Stack & Architecture</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack?.map((tech) => (
                    <span key={tech} className="rounded-xl border border-[#EAEAEA] bg-[#F9FAFB] px-3.5 py-2 text-xs font-semibold text-[#111111]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#EAEAEA] pt-6">
              <Button href="#contact" variant="primary" onClick={onClose}>
                Request Similar Product
              </Button>
              <Button href="#contact" variant="secondary" onClick={onClose}>
                Close Overview
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
