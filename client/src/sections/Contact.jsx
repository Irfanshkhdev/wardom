import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Loader2, Mail, MapPin, Phone, Send, Instagram, Twitter, Linkedin } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'
import { submitContactForm } from '../utils/api'

const SERVICE_OPTIONS = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Other',
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: SERVICE_OPTIONS[0],
  budget: '',
  message: '',
}

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
        message: `[Phone: ${form.phone}] [Company: ${form.company}] [Service: ${form.service}] [Budget: ${form.budget}] ${form.message}`,
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
        {/* Header */}
        <div className="mb-14 border-b border-[#E5E7EB] pb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-5xl lg:text-6xl leading-[1.05]">
            Turn ideas into <span className="italic font-serif font-normal text-[#5F8D3B]">reality!</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base max-w-2xl">
            Let us help you become even greater at what you do. Fill out the following form and we will get back to you in the next 24 hours.
          </p>

          {/* Marquee Ticker */}
          <div className="mt-8 overflow-hidden rounded-full border border-[#E5E7EB] bg-[#FAFAFA] py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-widest text-[#5F8D3B]">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              <span>Get in touch • Get in touch • Get in touch • Get in touch • Get in touch • Get in touch</span>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Left Column Form */}
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
                  Thank you! We will review your project brief and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-xs font-bold text-[#5F8D3B] underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 01 What's your name? */}
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

                {/* 02 What's your email address? */}
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

                {/* 03 What's your phone number? */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>03</span> What's your phone number?
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 72629 50982"
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-xs text-[#0F0F0F] placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* 04 What's your company/organization name? */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>04</span> What's your company/organization name?
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or Brand Name..."
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-xs text-[#0F0F0F] placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* 05 What services are you looking for? */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-3">
                    <span>05</span> What services are you looking for?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => setForm((f) => ({ ...f, service: srv }))}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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

                {/* 06 What have you budgeted for this project? (Typed Input) */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>06</span> What have you budgeted for this project?
                  </label>
                  <input
                    type="text"
                    name="budget"
                    required
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="Type your budget (e.g. ₹1.5L or $2,000)..."
                    className="w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-xs text-[#0F0F0F] placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* 07 Tell us about your project */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5F8D3B] mb-2">
                    <span>07</span> Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project goals, key requirements, target timeline..."
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
                      <Loader2 size={16} className="animate-spin" /> Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Details */}
          <div className="space-y-6">
            <div className="minimal-card p-6 bg-white border border-[#E5E7EB] space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] border-b border-[#E5E7EB] pb-3">
                CONTACT INFORMATION
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#999999]">Call Us</span>
                  <a href="tel:+917262950982" className="block text-sm font-extrabold text-[#0F0F0F] hover:text-[#5F8D3B] mt-0.5 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#5F8D3B]" /> +91 72629 50982
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#999999]">Address</span>
                  <p className="font-semibold text-[#0F0F0F] mt-0.5 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#5F8D3B]" /> Pune, Maharashtra, India
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#999999]">Email</span>
                  <a href="mailto:hello@wardom.store" className="block text-sm font-extrabold text-[#5F8D3B] hover:underline mt-0.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#5F8D3B]" /> hello@wardom.store
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="minimal-card p-6 bg-white border border-[#E5E7EB] space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] border-b border-[#E5E7EB] pb-3">
                Socials
              </h4>
              <div className="flex flex-col gap-3 text-xs font-semibold text-[#555555]">
                <a href="https://instagram.com/wardom.store" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-[#5F8D3B]">
                  <span className="flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram / wardom.store</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://twitter.com/wardomxd" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-[#5F8D3B]">
                  <span className="flex items-center gap-2"><Twitter className="h-4 w-4" /> Twitter / wardomxd</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a href="https://linkedin.com/in/irfanshkh" target="_blank" rel="noreferrer" className="flex items-center justify-between hover:text-[#5F8D3B]">
                  <span className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn / irfanshkh</span>
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
