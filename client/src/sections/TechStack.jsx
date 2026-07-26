import { motion } from 'framer-motion'

const STACK = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'React Native',
  'MongoDB', 'Firebase', 'Tailwind', 'Express.js', 'GraphQL',
  'PostgreSQL', 'Vercel',
]

export default function TechStack() {
  const loop = [...STACK, ...STACK, ...STACK]

  return (
    <section className="border-y border-[#E5E7EB] bg-[#FAFAFA] py-8 overflow-hidden">
      <div className="relative overflow-hidden">
        {/* Left & Right gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent" />

        <motion.div
          className="flex w-max gap-12"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {loop.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-widest text-[#0F0F0F]/80 transition-colors hover:text-[#5F8D3B]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#5F8D3B]" />
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
