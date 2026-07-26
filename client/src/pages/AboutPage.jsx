import { motion } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, Code2, Users, Sparkles } from 'lucide-react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0F0F0F]">
      <Navbar />

      <main className="pt-32 pb-24">
        <Container>
          <div className="max-w-3xl border-b border-[#E5E7EB] pb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5F8D3B]">
              ABOUT WARDOM STUDIO
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-6xl leading-[1.08]">
              Designers, engineers, <span className="italic font-serif font-normal text-[#5F8D3B]">problem solvers.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#555555]">
              We're a tight-knit team of builders who care deeply about craft. From pixel-perfect interfaces to robust backend systems, we bring ideas to life with speed, intention, and an obsessive eye for detail.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="minimal-card p-6 bg-white border border-[#E5E7EB]">
              <Users className="h-6 w-6 text-[#5F8D3B]" />
              <h3 className="mt-4 text-lg font-bold text-[#0F0F0F]">Design Excellence</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                We don't use generic templates. Every visual layout, color palette, and micro-animation is designed specifically for your brand identity.
              </p>
            </div>

            <div className="minimal-card p-6 bg-white border border-[#E5E7EB]">
              <Code2 className="h-6 w-6 text-[#5F8D3B]" />
              <h3 className="mt-4 text-lg font-bold text-[#0F0F0F]">Engineering Rigor</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                Clean React, Next.js, Node.js, and PostgreSQL architecture ensuring sub-second page load times and 100/100 Lighthouse performance.
              </p>
            </div>

            <div className="minimal-card p-6 bg-white border border-[#E5E7EB]">
              <Sparkles className="h-6 w-6 text-[#5F8D3B]" />
              <h3 className="mt-4 text-lg font-bold text-[#0F0F0F]">Reliable Outcomes</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                Guaranteed on-time delivery, direct access to senior engineers, and dedicated post-launch support.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-[#FAFAFA] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F0F0F]">Ready to build something great?</h2>
              <p className="mt-1 text-xs text-[#555555]">Tell us about your project and we'll get back to you within 24 hours.</p>
            </div>
            <Button href="/#contact" variant="primary" className="!px-8 !py-3.5 font-bold">
              Start your project <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
