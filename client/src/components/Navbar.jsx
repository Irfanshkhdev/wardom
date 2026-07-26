import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react'
import Button from './Button'

const LINKS = [
  { label: 'Work', href: '/projects' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

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
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
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
        </Link>

        {/* Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-semibold transition-colors ${
                  isActive ? 'text-[#5F8D3B] font-bold' : 'text-[#555555] hover:text-[#0F0F0F]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Phone + Start your project CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+916206103436" className="flex items-center gap-1.5 text-xs font-bold text-[#0F0F0F] hover:text-[#5F8D3B]">
            <Phone className="h-3.5 w-3.5 text-[#5F8D3B]" />
            +91 6206103436
          </a>
          <Button href="/#contact" variant="primary" className="!text-xs !px-5 !py-2.5 font-bold">
            Start your project <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile Hamburger */}
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
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0F0F0F] hover:bg-[#F4F4F5]"
              >
                Home
              </Link>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0F0F0F] hover:bg-[#F4F4F5]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-[#E5E7EB] pt-4 flex flex-col gap-2">
              <a href="tel:+916206103436" className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0F0F0F] py-2">
                <Phone className="h-3.5 w-3.5 text-[#5F8D3B]" />
                +91 6206103436
              </a>
              <Button href="/#contact" variant="primary" onClick={() => setOpen(false)} className="w-full justify-center">
                Start your project <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
