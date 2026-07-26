import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Button from './Button'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.2, 0.4, 0.6] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-3 py-2.5 shadow-[0_10px_45px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 ${
          scrolled ? 'scale-[0.985] bg-white/[0.08] py-2' : 'py-2.5'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 px-2 text-sm font-semibold tracking-[0.24em] text-white uppercase" data-cursor-hover>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[10px] text-[#E7B96A]">
            W
          </span>
          WARDOM
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '') || (link.href === '#top' && activeSection === 'top')

            return (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {link.label}
                {isActive ? <span className="absolute inset-x-2 bottom-1 h-[2px] rounded-full bg-[#E7B96A]" /> : null}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button href="#contact" variant="primary">Start a project</Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 rounded-[24px] border border-white/10 bg-[#0b0b0b]/90 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <Button href="#contact" variant="primary">Start a project</Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
