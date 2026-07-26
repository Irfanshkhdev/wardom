import { motion } from 'framer-motion'
import Container from '../components/Container'

const STACK = [
  'React', 'Vite', 'TailwindCSS', 'Framer Motion', 'GSAP',
  'FastAPI', 'PostgreSQL', 'Python', 'Vercel', 'Railway',
]

export default function TechStack() {
  const loop = [...STACK, ...STACK]
  return (
    <section className="border-y border-cream/10 py-14">
      <Container className="mb-6">
        <p className="font-mono-num text-xs uppercase tracking-[0.25em] text-cream/40">
          Our stack
        </p>
      </Container>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {loop.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-heading text-3xl italic text-cream/25 md:text-4xl"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
