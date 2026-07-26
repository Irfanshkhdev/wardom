import { motion } from 'framer-motion'
import Container from '../components/Container'

const STACK = [
  'React 19', 'Next.js', 'Vite', 'TailwindCSS', 'Framer Motion',
  'Python FastAPI', 'OpenAI GPT-4', 'PostgreSQL', 'Stripe', 'Redis',
  'React Native', 'Vercel', 'Pinecone Vector DB',
]

export default function TechStack() {
  const loop = [...STACK, ...STACK]
  return (
    <section className="border-y border-[#EAEAEA] bg-white py-12">
      <Container className="mb-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#5F8D3B]">
          Engineered with modern industry standards
        </p>
      </Container>

      <div className="relative overflow-hidden">
        {/* Left & Right gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex w-max gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {loop.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-3 text-lg font-bold text-[#111111]/70 transition-colors hover:text-[#5F8D3B]"
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
