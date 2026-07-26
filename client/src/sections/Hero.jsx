import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Container from '../components/Container'
import { useMousePosition } from '../hooks/useMousePosition'

const reveal = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: 0.85, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { x, y } = useMousePosition()
  const glowRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.setProperty('--gx', `${x}px`)
      glowRef.current.style.setProperty('--gy', `${y}px`)
    }
  }, [x, y])

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5

    setTilt({ x: offsetY * -6, y: offsetX * 6 })
  }

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(700px circle at var(--gx, 50%) var(--gy, 50%), rgba(231,185,106,0.16), transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.65) 0, transparent 30%), radial-gradient(circle at 80% 12%, rgba(231,185,106,0.6) 0, transparent 35%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.35) 0, transparent 32%)' }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/%3E%3C/svg%3E")' }}
      />

      <Container className="relative z-10 grid min-h-screen items-center gap-14 py-28 md:grid-cols-[1.02fr_0.98fr] md:py-36 lg:py-40">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70"
          >
            <Sparkles size={14} className="text-[#E7B96A]" />
            Premium digital agency
          </motion.div>

          <h1 className="max-w-3xl font-heading text-[clamp(3rem,7vw,5.2rem)] leading-[0.9] tracking-[-0.03em] text-white">
            {['Designing', 'clarity for', 'ambitious brands.'].map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  custom={index}
                  variants={reveal}
                  initial="hidden"
                  animate="visible"
                  className={`block ${index === 2 ? 'text-[#E7B96A]' : ''}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 max-w-xl text-base leading-7 text-white/70 md:text-lg"
          >
            We craft calm, conversion-led digital experiences for modern companies that want to lead with clarity rather than noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#E7B96A] px-6 py-3 text-sm font-medium text-[#080808] transition-transform duration-300 hover:-translate-y-0.5">
              Book a discovery call
              <ArrowRight size={16} />
            </a>
            <a href="#work" className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/20 hover:text-white">
              View selected work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-6 text-sm text-white/60"
          >
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#E7B96A]" />14+ launches</div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white/40" />Remote-first teams</div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-white/40" />Fast response</div>
          </motion.div>
        </div>

        <div className="flex justify-center md:justify-end">
          <motion.div
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            animate={{ rotateX: tilt.x, rotateY: tilt.y, y: [0, -8, 0] }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatType: 'mirror' }}
            className="relative w-full max-w-[430px]"
          >
            <div className="absolute inset-0 rounded-[36px] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.35)]" />
            <div className="relative h-[500px] rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 backdrop-blur-xl">
              <div className="absolute inset-6 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(231,185,106,0.2),transparent_55%),rgba(8,8,8,0.95)]" />
              <div className="relative flex h-full flex-col justify-between p-1">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Studio briefing</p>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E7B96A]" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-[20px] border border-white/10 bg-black/35 p-5">
                    <div className="h-2.5 w-24 rounded-full bg-white/20" />
                    <div className="mt-4 h-2.5 w-full rounded-full bg-white/10" />
                    <div className="mt-2 h-2.5 w-4/5 rounded-full bg-white/10" />
                    <div className="mt-2 h-2.5 w-3/5 rounded-full bg-white/10" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Focus</p>
                      <p className="mt-2 text-sm text-white/80">Thoughtful positioning</p>
                    </div>
                    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Craft</p>
                      <p className="mt-2 text-sm text-white/80">Elegant systems</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between px-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Launch-ready</p>
                    <p className="mt-1 text-xl font-semibold text-white">A calm system</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.06] p-3 text-[#E7B96A]">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
