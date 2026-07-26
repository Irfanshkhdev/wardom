import { motion } from 'framer-motion'
import Container from '../components/Container'

const TRUSTED_BY = ['Northstar Labs', 'Lumen Health', 'Aster Capital', 'Tidal AI', 'Sage & Co.', 'Harbor Works']
const HIGHLIGHTS = [
  'Launch-ready design systems',
  'Fast product iteration',
  'Clear product storytelling',
]

export default function Statistics() {
  return (
    <section className="border-y border-white/10 py-24 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-10 sm:px-8 lg:px-10"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-mono-num text-xs uppercase tracking-[0.3em] text-accent">Trusted by</p>
              <h2 className="mt-3 max-w-xl font-heading text-3xl leading-tight text-primaryText sm:text-4xl">
                Founders and operators building the next generation of software.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-secondaryText">
                We partner with ambitious teams that need clarity, speed, and a product experience that feels as refined as the company behind it.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {TRUSTED_BY.map((brand) => (
                <div key={brand} className="rounded-full border border-white/10 bg-background/70 px-4 py-3 text-center text-sm font-medium text-primaryText/80">
                  {brand}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-background/60 px-5 py-4 text-sm text-secondaryText">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
