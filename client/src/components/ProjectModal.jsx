import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null

  const images = project.images || [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  function prevSlide() {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  function nextSlide() {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#090A0F]/90 backdrop-blur-md"
        />

        {/* Dark Stage Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#27272A] bg-[#12131A] p-6 sm:p-8 text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-6">
            <h2 className="text-2xl font-serif font-semibold text-white tracking-tight sm:text-3xl">
              {project.title}
            </h2>

            <div className="flex items-center gap-3">
              <a
                href={project.liveUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#5F8D3B] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4d7330] transition-colors"
              >
                VISIT LIVE <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#181924] text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Center Image Slide Carousel */}
          <div className="relative overflow-hidden rounded-xl border border-[#27272A] bg-[#0A0B10] group">
            <div className="aspect-[16/9] w-full relative">
              <img
                src={images[currentIndex]}
                alt={`${project.title} slide ${currentIndex + 1}`}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === i ? 'w-5 bg-[#5F8D3B]' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Lower Grid Info */}
          <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_0.6fr]">
            {/* Left Narrative & Core Features */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5F8D3B]">
                  ABOUT PROJECT
                </span>
                <p className="mt-2 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  {project.fullDescription || project.description || 'A minimalist, quiet luxury portfolio & web platform engineered for high conversion and brand distinction.'}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#5F8D3B] block mb-3">
                  CORE FEATURES
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  {(project.highlights || ['Quiet luxury visual design', 'Integrated video banner', 'Clean pricing & menu cards', 'Sanctuary experience highlights']).map((feat) => (
                    <div key={feat} className="flex items-center gap-2 border-l border-[#27272A] pl-2.5 py-1">
                      <span className="h-1 w-1 rounded-full bg-[#5F8D3B]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Meta Column */}
            <div className="space-y-6 border-t border-[#27272A] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                  TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(project.stack || ['Next.js', 'Tailwind CSS', 'TypeScript']).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[#1C1D2A] px-2.5 py-1 font-mono text-[10px] text-gray-300 border border-[#27272A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">
                  PROJECT INFO
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Project Type</span>
                    <span className="font-bold text-white uppercase">{project.tag || 'PORTFOLIO'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Industry</span>
                    <span className="font-bold text-white">{project.clientType || 'Product Design'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
