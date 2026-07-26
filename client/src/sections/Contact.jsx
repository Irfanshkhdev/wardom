import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Loader2, Mail, MapPin, Send, Github, Instagram, Twitter, Compass } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'
import { submitContactForm } from '../utils/api'

const SERVICE_OPTIONS = [
  'Landing Pages',
  'Full-Stack Web App',
  'Mobile Application',
  'AI & Automations',
  'Salon / Gym / Clinic Site',
  'Rebrand & Design',
]

const BUDGET_OPTIONS = [
  '₹50k – ₹1.5L ($1k - $2k)',
  '₹1.5L – ₹3.5L ($2k - $4k)',
  '₹3.5L – ₹8L ($4k - $10k)',
  '₹8L+ ($10k+)',
]

const initialForm = { name: '', email: '', service: SERVICE_OPTIONS[0], budget: BUDGET_OPTIONS[1], message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const payload = {
        name: form.name,
        email: form.email,
        budget: form.budget,
        message: `[Service Needed: ${form.service}] ${form.message}`,
      }
      await submitContactForm(payload)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <Section id="contact" className="bg-white border-t border-[#E5E7EB] py-24 lg:py-36">
      <Container>
        {/* Top Header (Helaph structure: Turn ideas into reality! + circular icon) */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-[#E5E7EB] pb-10">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
              START A PROJECT
            </span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-5xl lg:text-6xl leading-[1.05]">
              Turn ideas into <span className="italic font-serif font-normal text-[#5F8D3B]">reality!</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">
              Got an idea? Let's turn it into reality. Tell us about your project and we'll respond within 24 hours.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#FAFAFA] text-[#5F8D3B]">
            <Compass className="h-6 w-6 animate-spin-slow" />
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Left Column: Numbered Step Form (Helaph structure) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="minimal-card p-6 sm:p-10 shadow-sm bg-white border border-[#E5E7EB]"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5F8D3B] text-white">
                  <Check size={28} />
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F0F0F]">Message Received</h3>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#555555]">
                  Thank you! Our lead software engineer will review your project brief and respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-xs font-bold text-[#5F8D3B] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 01 */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>01</span> What's your name?
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Type your full name..."
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-xs text-[#0F0F0F] placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Step 02 */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>02</span> What's your email address?
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-xs text-[#0F0F0F] placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Step 03 */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-3">
                    <span>03</span> What type of service do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => setForm((f) => ({ ...f, service: srv }))}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                          form.service === srv
                            ? 'bg-[#5F8D3B] text-white'
                            : 'bg-[#FAFAFA] text-[#555555] border border-[#E5E7EB] hover:border-[#D1D5DB]'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 04 */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-3">
                    <span>04</span> What is your budget range?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setForm((f) => ({ ...f, budget: b }))}
                        className={`rounded-xl p-2.5 text-center text-xs font-semibold transition-all ${
                          form.budget === b
                            ? 'bg-[#0F0F0F] text-white'
                            : 'bg-[#FAFAFA] text-[#555555] border border-[#E5E7EB] hover:border-[#D1D5DB]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 05 */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>05</span> Tell us more about your project
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project goals, key requirements, target launch timeline..."
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-xs text-[#0F0F0F] placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs font-semibold text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="primary" className="!w-full justify-center !py-3.5 font-bold uppercase tracking-wider">
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> SENDING MESSAGE...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE <Send size={14} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Studio Contact & Social Links (Helaph structure) */}
          <div className="space-y-6">
            <div className="minimal-card p-6 bg-white border border-[#E5E7EB] space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] border-b border-[#E5E7EB] pb-3">
                STUDIO CONTACT DETAILS
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#999999]">DIRECT EMAIL</span>
                  <a href="mailto:hello@wardom.studio" className="block text-sm font-extrabold text-[#5F8D3B] hover:underline mt-0.5">
                    hello@wardom.studio
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#999999]">RESPONSE COMMITMENT</span>
                  <p className="font-semibold text-[#0F0F0F] mt-0.5">Under 24 hours guaranteed</p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#999999]">STUDIO PRESENCE</span>
                  <p className="font-semibold text-[#0F0F0F] mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#5F8D3B]" /> Remote-First Global Studio
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links (Helaph structure: Twitter/X ↗, Instagram ↗, GitHub ↗) */}
            <div className="minimal-card p-6 bg-white border border-[#E5E7EB] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] border-b border-[#E5E7EB] pb-3">
                CONNECT WITH US
              </h4>
              <div className="flex flex-col gap-3 text-xs font-semibold text-[#555555]">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-[#5F8D3B]">
                  <span className="flex items-center gap-2"><Twitter className="h-4 w-4" /> Twitter / X</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-[#5F8D3B]">
                  <span className="flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram / Visuals</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-[#5F8D3B]">
                  <span className="flex items-center gap-2"><Github className="h-4 w-4" /> GitHub / Open Source</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
