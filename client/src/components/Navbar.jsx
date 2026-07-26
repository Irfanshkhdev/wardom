import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Button from './Button'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Reviews', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#E5E7EB] bg-white/90 px-6 py-3.5 shadow-sm backdrop-blur-md transition-all ${
          scrolled ? 'bg-white/95 py-3 shadow-md' : 'py-3.5'
        }`}
      >
        {/* Left Logo + ONLINE STUDIO tag (Helaph structure) */}
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F0F0F] text-xs font-black text-white">
            W
          </span>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-[#0F0F0F] text-base leading-none">
              WARDOM<span className="text-[#5F8D3B]">.</span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#999999] mt-0.5">
              ONLINE STUDIO
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-[#555555] hover:text-[#0F0F0F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Buttons (Helaph structure: Get in touch + LET'S TALK PROJECT ↗) */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="#contact" className="text-xs font-semibold text-[#555555] hover:text-[#0F0F0F]">
            Get in touch
          </a>
          <Button href="#contact" variant="primary" className="!text-xs !px-5 !py-2.5 font-bold uppercase tracking-wider">
            Let's Talk Project <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#FAFAFA] text-[#0F0F0F] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-lg backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0F0F0F] hover:bg-[#F4F4F5]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 border-t border-[#E5E7EB] pt-4">
              <Button href="#contact" variant="primary" onClick={() => setOpen(false)} className="w-full justify-center">
                Let's Talk Project <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
