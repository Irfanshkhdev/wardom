import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'
import ProjectModal from '../components/ProjectModal'

const CASE_STUDIES = [
  {
    id: 'aura-bistro',
    title: 'Aura Bistro & Lounge',
    category: 'Cafe & Restaurant Website',
    clientType: 'Cafes & Restaurants',
    outcomeBadge: '+42% Online Reservations',
    description: 'Direct table reservation engine, contactless digital menu, and local Google Maps optimization.',
    fullDescription: 'Aura Bistro replaced expensive third-party booking portals with their own high-converting web reservation platform, boosting repeat VIP customer bookings and saving commission fees.',
    highlights: ['+42% Online Table Reservations', 'Contactless QR Digital Menu', 'Google Maps Location Sync', 'Direct WhatsApp Table Confirmations'],
    tags: ['Restaurant', 'Table Reservations', 'Digital Menu', 'Zero Commission'],
    stats: [
      { label: 'Monthly Reservations', value: '420+' },
      { label: 'Third-Party Fee Saved', value: '₹1.2L / mo' },
      { label: 'VIP Return Rate', value: '78%' },
    ],
    deliverables: [
      'Bespoke Web Platform with 60fps animations',
      'Direct Table Booking & Instant Confirmation',
      'QR Code Contactless Menu Integration',
      'Automated SMS Booking Reminders',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
  },
  {
    id: 'velvet-salon',
    title: 'Velvet Nails & Beauty Studio',
    category: 'Nail Salon & Spa Web App',
    clientType: 'Nail Art & Beauty Studio',
    outcomeBadge: 'Zero No-Shows',
    description: 'Stylist portfolio gallery, online appointment booking, and advance booking deposit integration.',
    fullDescription: 'Velvet Nails eliminated client no-shows and simplified stylist schedule management by introducing advance booking deposits and instant SMS reminders.',
    highlights: ['Zero Appointment No-Shows', 'Advance Payment Deposit System', 'Interactive Nail Art Gallery', 'Automated SMS Reminders'],
    tags: ['Nail Art', 'Salon Booking', 'Payment Deposit', 'Gallery'],
    stats: [
      { label: 'Monthly Bookings', value: '680+' },
      { label: 'No-Show Drop', value: '-94%' },
      { label: 'Client Rating', value: '4.9 / 5.0' },
    ],
    deliverables: [
      'Interactive Nail Art & Design Gallery',
      'Stylist Schedule & Booking Calendar',
      'Instant UPI & Card Deposit Integration',
      'Automated WhatsApp Appointment Reminders',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Razorpay'],
  },
  {
    id: 'pulse-gym',
    title: 'Pulse Fitness & Performance',
    category: 'Gym & Fitness App',
    clientType: 'Gyms & Athletic Centers',
    outcomeBadge: '+180% Training Leads',
    description: 'HIIT & class schedule booking platform, auto-renew membership portals, and personal trainer booking.',
    fullDescription: 'Pulse Fitness wanted to streamline member check-ins and HIIT class reservations. We built a unified web platform that manages recurring subscriptions and instant class pass generation.',
    highlights: ['+180% Personal Training Leads', 'HIIT Class Scheduling System', 'Auto-Renew Membership Portal', 'Trainer Pass Generation'],
    tags: ['Gym & Fitness', 'Member Portal', 'Class Booking', 'Stripe'],
    stats: [
      { label: 'Active Members', value: '1,480+' },
      { label: 'Class Capacity', value: '96%' },
      { label: 'Member Retention', value: '92%' },
    ],
    deliverables: [
      'Class Schedule & HIIT Booking Platform',
      'Automated Monthly Subscription Billing',
      'Personal Trainer Booking & WhatsApp Pass',
      'Owner Analytics Dashboard',
    ],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
  },
  {
    id: 'luminary-clinic',
    title: 'Luminary Medical Center',
    category: 'Doctor & Clinic Portal',
    clientType: 'Medical Clinics & Doctors',
    outcomeBadge: '24/7 Patient Booking',
    description: '24/7 AI patient triage assistant, HIPAA-compliant patient intake, and doctor calendar sync.',
    fullDescription: 'Luminary Medical Center reduced phone triage workload by implementing our 24/7 AI Patient Assistant that answers patient questions and books specialist appointments automatically.',
    highlights: ['24/7 Patient Booking', 'Reduced Phone Workload (-68%)', 'Instant Calendar Sync', 'Automated Medical Reminders'],
    tags: ['Clinic', 'Healthcare', 'AI Triage', 'Patient Care'],
    stats: [
      { label: 'Patient Drop-off', value: '-68%' },
      { label: 'Triage Accuracy', value: '99.4%' },
      { label: 'Staff Time Saved', value: '34 Hrs/wk' },
    ],
    deliverables: [
      '24/7 Conversational AI Patient Assistant',
      'Doctor Schedule & Real-time Calendar Sync',
      'Automated Appointment Reminders',
      'HIPAA-Compliant Patient Record Intake',
    ],
    stack: ['Next.js', 'OpenAI GPT-4 API', 'PostgreSQL', 'TailwindCSS'],
  },
]

export default function FeaturedWork() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <Section id="work" label="Featured Work" className="bg-white">
      <Container>
        <div className="mb-14 max-w-3xl">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
            PROVEN RESULTS
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.1]">
            Real business outcomes for real business owners.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-base">
            We build platforms focused on business metrics: more reservations, zero no-shows, and automated customer onboarding.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setActiveProject(project)}
              className="minimal-card cursor-pointer p-6 sm:p-8 flex flex-col justify-between group hover:border-[#5F8D3B] bg-white"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#5F8D3B]">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#5F8D3B]/10 px-3 py-1 text-xs font-bold text-[#5F8D3B]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {project.outcomeBadge}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-[#0F0F0F] transition-colors group-hover:text-[#5F8D3B]">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#555555]">
                  {project.description}
                </p>

                {/* Business Highlights List */}
                <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F0F0F] block mb-2">
                    Key Features Built:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#0F0F0F]">
                    {project.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#5F8D3B] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-4 flex items-center justify-between text-xs font-bold text-[#5F8D3B]">
                <span>Explore Full Case Study</span>
                <span className="inline-flex items-center gap-1 group-hover:underline">
                  Details <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </Section>
  )
}
