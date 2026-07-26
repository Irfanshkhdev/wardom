import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import Button from '../components/Button'
import { submitContactForm, submitNewsletterForm } from '../utils/api'

const initialForm = { name: '', email: '', budget: '', message: '' }
const initialNewsletterForm = { email: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [newsletterForm, setNewsletterForm] = useState(initialNewsletterForm)
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await submitContactForm(form)
      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  async function handleNewsletterSubmit(e) {
    e.preventDefault()
    setNewsletterStatus('loading')
    setNewsletterMessage('')
    try {
      await submitNewsletterForm(newsletterForm)
      setNewsletterStatus('success')
      setNewsletterForm(initialNewsletterForm)
      setNewsletterMessage('You are now subscribed to updates.')
    } catch (err) {
      setNewsletterStatus('error')
      setNewsletterMessage(err.message)
    }
  }

  return (
    <Section id="contact" eyebrow="Contact">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <h2 className="font-heading text-5xl leading-[0.95] text-primaryText md:text-7xl">
              Let’s create something <span className="italic text-accent">worth</span> remembering.
            </h2>
            <p className="mt-8 text-base leading-7 text-secondaryText md:text-lg">
              Share your goals and we’ll map a path that feels thoughtful, focused, and ready for launch.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-secondaryText">
              <a href="mailto:hello@wardom.studio" className="inline-flex items-center gap-2 text-primaryText/90 hover:text-accent">
                hello@wardom.studio <ArrowUpRight size={14} />
              </a>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Usually replies within one business day</span>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="mt-8 rounded-[24px] border border-white/10 bg-background/70 p-4 sm:p-5">
              <p className="text-sm font-medium text-primaryText">Subscribe for updates</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={newsletterForm.email}
                  onChange={(event) => setNewsletterForm({ email: event.target.value })}
                  placeholder="Email address"
                  className="w-full rounded-full border border-white/10 bg-background/70 px-4 py-3 text-sm text-primaryText placeholder:text-white/25 focus:border-accent focus:outline-none"
                />
                <Button type="submit" variant="outline" className="justify-center whitespace-nowrap">
                  {newsletterStatus === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Joining
                    </>
                  ) : (
                    'Join'
                  )}
                </Button>
              </div>
              {newsletterMessage ? <p className="mt-3 text-sm text-accent" role="status">{newsletterMessage}</p> : null}
            </form>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
          >
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background">
                  <Check size={24} />
                </span>
                <h3 className="font-heading text-2xl text-primaryText">Message received</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-secondaryText">
                  We’ll be in touch soon with a thoughtful next step.
                </p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-accent underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <Field label="Budget (₹)" name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. 30,000 – 2,00,000" />
                <Field label="Project details" name="message" as="textarea" rows={4} value={form.message} onChange={handleChange} required />

                {status === 'error' && <p className="text-sm text-accent" role="alert">{error}</p>}

                <Button type="submit" variant="primary" className="mt-2 w-full justify-center">
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending
                    </>
                  ) : (
                    'Send message'
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

function Field({ label, as = 'input', ...props }) {
  const Tag = as
  return (
    <label className="relative block">
      <span className="mb-2 block font-mono-num text-xs uppercase tracking-[0.25em] text-secondaryText">
        {label}
      </span>
      <Tag
        {...props}
        className="w-full rounded-[18px] border border-white/10 bg-background/70 px-4 py-3 text-sm text-primaryText placeholder:text-white/25 focus:border-accent focus:outline-none"
      />
    </label>
  )
}
