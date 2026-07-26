import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://agyfounroewklczcmrpm.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KBpRRpBL1QVK7m6ds5UGvQ_HJnz6xG1'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Initial default fallback data when Supabase tables are freshly initialized
export const INITIAL_PROJECTS = [
  {
    id: 1,
    name: 'Yana Nail Studio',
    category: 'Beauty & Spa · Web App',
    year: '2026',
    image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
    live_url: 'https://helaph.online',
    order: 1,
  },
  {
    id: 2,
    name: 'Rishu Portfolio',
    category: 'Product Design · Portfolio',
    year: '2026',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    live_url: 'https://helaph.online',
    order: 2,
  },
  {
    id: 3,
    name: 'The Girlfriend Hour',
    category: 'Media & Podcast · Landing',
    year: '2026',
    image_url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    live_url: 'https://helaph.online',
    order: 3,
  },
  {
    id: 4,
    name: 'Amber ENT',
    category: 'Healthcare · Medical Portal',
    year: '2026',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    live_url: 'https://helaph.online',
    order: 4,
  },
]

export const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    quote: 'Working with WARDOM was a game-changer for our business. They delivered a stunning website that perfectly captured our vision and helped us increase our online conversions by 300%.',
    name: 'Priya Sharma',
    role: 'Founder, TechStart India',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The team at WARDOM transformed our outdated website into a modern, mobile-responsive platform. Our bounce rate decreased by 60% and user engagement increased significantly.',
    name: 'Rajesh Kumar',
    role: 'CEO, Digital Solutions Ltd',
    rating: 5,
  },
  {
    id: 3,
    quote: 'From concept to launch, WARDOM exceeded our expectations. Their technical expertise and creative approach resulted in a website that performs flawlessly.',
    name: 'Anita Patel',
    role: 'Marketing Director, Creative Agency Pro',
    rating: 5,
  },
  {
    id: 4,
    quote: 'WARDOM made the process so easy and affordable. The website has helped us reach new customers and grow our business by 200% in just 6 months.',
    name: 'Vikram Singh',
    role: 'Business Owner, Local Services Co',
    rating: 5,
  },
  {
    id: 5,
    quote: 'The mobile app WARDOM developed for us is absolutely fantastic. The user experience is smooth, the design is intuitive, and the performance is outstanding.',
    name: 'Deepika Mehta',
    role: 'Product Manager, StartupXYZ',
    rating: 5,
  },
  {
    id: 6,
    quote: 'We needed a complex web application to manage our inventory and customer orders. WARDOM delivered exactly what we needed, on time and within budget.',
    name: 'Arjun Gupta',
    role: 'Operations Director, Manufacturing Corp',
    rating: 5,
  },
]
