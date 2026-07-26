import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Section from '../components/Section'
import Container from '../components/Container'

const HELAPH_TESTIMONIALS = [
  {
    quote: 'Working with WARDOM was a game-changer for our business. They delivered a stunning website that perfectly captured our vision and helped us increase our online conversions by 300%. Their attention to detail and communication throughout the project was exceptional.',
    name: 'Priya Sharma',
    role: 'Founder, TechStart India',
  },
  {
    quote: 'The team at WARDOM transformed our outdated website into a modern, mobile-responsive platform. The results speak for themselves - our bounce rate decreased by 60% and user engagement increased significantly. Highly recommended!',
    name: 'Rajesh Kumar',
    role: 'CEO, Digital Solutions Ltd',
  },
  {
    quote: 'From concept to launch, WARDOM exceeded our expectations. Their technical expertise and creative approach resulted in a website that not only looks amazing but also performs flawlessly. Our clients love the new design!',
    name: 'Anita Patel',
    role: 'Marketing Director, Creative Agency Pro',
  },
  {
    quote: 'As a small business owner, I was hesitant about investing in a professional website. But WARDOM made the process so easy and affordable. The website has helped us reach new customers and grow our business by 200% in just 6 months.',
    name: 'Vikram Singh',
    role: 'Business Owner, Local Services Co',
  },
  {
    quote: 'The mobile app WARDOM developed for us is absolutely fantastic. The user experience is smooth, the design is intuitive, and the performance is outstanding. They truly understand what users want and need.',
    name: 'Deepika Mehta',
    role: 'Product Manager, StartupXYZ',
  },
  {
    quote: 'We needed a complex web application to manage our inventory and customer orders. WARDOM delivered exactly what we needed, on time and within budget. Their support after launch has been excellent too.',
    name: 'Arjun Gupta',
    role: 'Operations Director, Manufacturing Corp',
  },
]

export default function Testimonials() {
  return (
    <Section id="testimonials" className="bg-white">
      <Container>
        {/* Eyebrow Header (Client feedback) */}
        <div className="mb-12">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#5F8D3B]">
            Client feedback
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl">
            What founders & business owners say.
          </h2>
        </div>

        {/* 6 Testimonial Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HELAPH_TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="minimal-card flex flex-col justify-between p-6 sm:p-8 bg-white border border-[#E5E7EB]"
            >
              <div>
                <Quote className="h-6 w-6 text-[#5F8D3B] opacity-60 mb-3" />
                <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                <h4 className="text-xs font-extrabold text-[#0F0F0F]">{t.name}</h4>
                <p className="text-[11px] text-[#999999] mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
