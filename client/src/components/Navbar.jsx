import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight, Phone, Sun, Moon } from 'lucide-react'
import Button from './Button'

const LINKS = [
  { label: 'Work', href: '/projects' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('wardom-theme') === 'dark' || document.documentElement.classList.contains('dark')
  })
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('wardom-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('wardom-theme', 'light')
    }
  }, [isDark])

  function toggleTheme() {
    setIsDark((prev) => !prev)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#E5E7EB] dark:border-[#27272A] bg-white/90 dark:bg-[#12131A]/90 px-6 py-3.5 shadow-sm backdrop-blur-md transition-all ${
          scrolled ? 'bg-white/95 dark:bg-[#12131A]/95 py-3 shadow-md' : 'py-3.5'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F0F0F] dark:bg-white text-xs font-black text-white dark:text-[#0F0F0F]">
            W
          </span>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-[#0F0F0F] dark:text-white text-base leading-none">
              WARDOM<span className="text-[#5F8D3B]">.</span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#999999] dark:text-gray-400 mt-0.5">
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
                  isActive ? 'text-[#5F8D3B] font-bold' : 'text-[#555555] dark:text-gray-300 hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Phone + Larger Theme Toggle + Start project CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+917262950982" className="flex items-center gap-1.5 text-xs font-bold text-[#0F0F0F] dark:text-white hover:text-[#5F8D3B]">
            <Phone className="h-3.5 w-3.5 text-[#5F8D3B]" />
            +91 72629 50982
          </a>

          {/* Slightly Larger Theme Toggle Button (h-10 w-10) */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] text-[#0F0F0F] dark:text-white hover:border-[#5F8D3B] transition-all hover:scale-105 active:scale-95 shadow-sm"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-[#555555]" />}
          </button>

          <Button href="/#contact" variant="primary" className="!text-xs !px-5 !py-2.5 font-bold">
            Start your project <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] text-[#0F0F0F] dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] text-[#0F0F0F] dark:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#12131A] p-4 shadow-lg backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0F0F0F] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#181924]"
              >
                Home
              </Link>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0F0F0F] dark:text-white hover:bg-[#F4F4F5] dark:hover:bg-[#181924]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-[#E5E7EB] dark:border-[#27272A] pt-4 flex flex-col gap-2">
              <a href="tel:+917262950982" className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0F0F0F] dark:text-white py-2">
                <Phone className="h-3.5 w-3.5 text-[#5F8D3B]" />
                +91 72629 50982
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
