import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  FolderKanban,
  LayoutGrid,
  LogOut,
  Mail,
  MessageSquareText,
  Pencil,
  Plus,
  Settings,
  Sparkles,
  Trash2,
} from 'lucide-react'

import AdminPageLayout from './components/AdminPageLayout'
import PageHeader from './components/PageHeader'
import FormCard from './components/FormCard'
import EmptyState from './components/EmptyState'
import StatusCard from './components/StatusCard'

import {
  createProject,
  createTestimonial,
  deleteProject,
  deleteTestimonial,
  fetchAdminContacts,
  fetchAdminMe,
  fetchAdminNewsletter,
  fetchAdminProjects,
  fetchAdminTestimonials,
  loginAdmin,
  updateAdminPassword,
  updateProject,
  updateTestimonial,
} from '../utils/adminApi'

const sidebarLinks = [
  { label: 'Overview', to: '', icon: LayoutGrid },
  { label: 'Projects', to: 'projects', icon: FolderKanban },
  { label: 'Testimonials', to: 'testimonials', icon: Sparkles },
  { label: 'Messages', to: 'messages', icon: MessageSquareText },
  { label: 'Newsletter', to: 'newsletter', icon: Mail },
  { label: 'Settings', to: 'settings', icon: Settings },
]

function AdminShell({ me, onLogout, children }) {
  return (
    <div className="min-h-screen bg-[#09090B] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full min-w-0 rounded-2xl border border-[#27272A] bg-[#121215] p-5 lg:w-64">
          <div className="mb-6 flex items-center gap-3 border-b border-[#27272A] pb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5F8D3B] text-sm font-black text-white">
              W
            </div>
            <div>
              <p className="text-xs font-bold text-white">WARDOM Admin</p>
              <p className="text-[11px] text-zinc-400">{me?.email || 'Authenticated'}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ''}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                    isActive ? 'bg-[#5F8D3B] text-white shadow-sm' : 'text-zinc-400 hover:bg-[#1C1C20] hover:text-white'
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 border-t border-[#27272A] pt-4">
            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#27272A] bg-[#18181B] px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main Console Content */}
        <main className="min-w-0 flex-1 rounded-2xl border border-[#27272A] bg-[#121215] p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function DashboardPage({ projects = [], testimonials = [], messages = [], subscribers = [] }) {
  const safeProjects = Array.isArray(projects) ? projects : []
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : []
  const safeMessages = Array.isArray(messages) ? messages : []
  const safeSubscribers = Array.isArray(subscribers) ? subscribers : []

  const stats = [
    { label: 'Active Projects', value: safeProjects.length, tint: 'border-[#5F8D3B]/30 bg-[#5F8D3B]/10 text-[#7BAE47]' },
    { label: 'Client Reviews', value: safeTestimonials.length, tint: 'border-zinc-700 bg-zinc-800/40 text-white' },
    { label: 'Inbound Messages', value: safeMessages.length, tint: 'border-zinc-700 bg-zinc-800/40 text-white' },
    { label: 'Subscribers', value: safeSubscribers.length, tint: 'border-[#5F8D3B]/30 bg-[#5F8D3B]/10 text-[#7BAE47]' },
  ]

  return (
    <AdminPageLayout>
      <PageHeader
        eyebrow="Console Overview"
        title="Dashboard"
        description="Monitor system metrics, manage public case studies, and review inbound client inquiries."
        action={
          <Link to="projects" className="inline-flex items-center gap-2 rounded-xl border border-[#27272A] bg-[#18181B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#27272A]">
            Manage Projects <ArrowRight size={14} />
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatusCard key={stat.label} label={stat.label} value={stat.value} tint={stat.tint} />
        ))}
      </div>

      <FormCard title="Recent Inquiries">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Latest Contact Submissions</h2>
          <Link to="messages" className="text-xs font-semibold text-[#7BAE47] hover:underline">View All Messages &rarr;</Link>
        </div>

        <div className="mt-4 space-y-3">
          {safeMessages.slice(0, 3).length === 0 ? (
            <EmptyState title="No messages yet" description="Incoming inquiries will appear here once the contact form is submitted." />
          ) : (
            safeMessages.slice(0, 3).map((msg, i) => (
              <div key={msg.id || i} className="flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B] px-4 py-3 text-xs">
                <div>
                  <p className="font-bold text-white">{msg.name}</p>
                  <p className="text-zinc-400">{msg.email}</p>
                </div>
                <span className="rounded bg-zinc-800 px-2.5 py-1 text-zinc-300 font-mono text-[11px]">
                  {msg.budget || 'Inquiry'}
                </span>
              </div>
            ))
          )}
        </div>
      </FormCard>
    </AdminPageLayout>
  )
}

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', category: '', year: '', image_url: '', live_url: '', order: 0 })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminProjects()
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      setProjects([])
      setMessage(error.message || 'Offline mode')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (editingId) {
        await updateProject(editingId, form)
      } else {
        await createProject(form)
      }
      setForm({ name: '', category: '', year: '', image_url: '', live_url: '', order: 0 })
      setEditingId(null)
      setMessage(editingId ? 'Project updated' : 'Project created')
      loadProjects()
    } catch (error) {
      setMessage(error.message)
    }
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      category: p.category,
      year: p.year,
      image_url: p.image_url || '',
      live_url: p.live_url || '',
      order: p.order || 0,
    })
  }

  const handleDelete = async (id) => {
    try {
      await deleteProject(id)
      setMessage('Project removed')
      loadProjects()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Portfolio Management" title="Projects" description="Create, edit, and feature client projects on the live website." />

      {message ? <p className="rounded-xl border border-[#5F8D3B]/40 bg-[#5F8D3B]/10 px-4 py-2 text-xs font-semibold text-[#7BAE47]">{message}</p> : null}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-[#27272A] bg-[#18181B] p-5 lg:grid-cols-2 text-xs">
        <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Project name (e.g. Velvet Nails)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Category (e.g. Salon & Spa)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Year (e.g. 2026)" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
        <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Live URL" value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
        <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 outline-none focus:border-[#5F8D3B]" type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />

        <div className="lg:col-span-2 flex gap-3 mt-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#5F8D3B] px-4 py-2.5 font-bold text-white hover:bg-[#527C32]">
            <Plus size={14} /> {editingId ? 'Save changes' : 'Create project'}
          </button>
          {editingId && (
            <button type="button" className="rounded-xl border border-[#27272A] px-4 py-2.5 font-semibold text-zinc-300 hover:bg-[#27272A]" onClick={() => { setEditingId(null); setForm({ name: '', category: '', year: '', image_url: '', live_url: '', order: 0 }) }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {loading ? <p className="text-xs text-zinc-400">Loading projects…</p> : null}
        {!loading && projects.length === 0 ? <EmptyState title="No custom DB projects" description="Static case studies are active. Add custom projects here." /> : null}
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B] p-4 text-xs">
            <div>
              <p className="font-bold text-white">{p.name}</p>
              <p className="text-zinc-400">{p.category} · {p.year}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="rounded-lg border border-[#27272A] bg-[#09090B] p-2 text-zinc-300 hover:text-white">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)} className="rounded-lg border border-[#27272A] bg-[#09090B] p-2 text-zinc-300 hover:text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageLayout>
  )
}

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ quote: '', name: '', role: '', rating: 5, video_url: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const loadTestimonials = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminTestimonials()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      setTestimonials([])
      setMessage(error.message || 'Offline mode')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (editingId) {
        await updateTestimonial(editingId, form)
      } else {
        await createTestimonial(form)
      }
      setForm({ quote: '', name: '', role: '', rating: 5, video_url: '' })
      setEditingId(null)
      setMessage(editingId ? 'Testimonial updated' : 'Testimonial created')
      loadTestimonials()
    } catch (error) {
      setMessage(error.message)
    }
  }

  const handleEdit = (t) => {
    setEditingId(t.id)
    setForm({
      quote: t.quote,
      name: t.name,
      role: t.role,
      rating: t.rating || 5,
      video_url: t.video_url || '',
    })
  }

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id)
      setMessage('Testimonial removed')
      loadTestimonials()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Social Proof" title="Testimonials" description="Manage client reviews and ratings shown on the homepage." />

      {message ? <p className="rounded-xl border border-[#5F8D3B]/40 bg-[#5F8D3B]/10 px-4 py-2 text-xs font-semibold text-[#7BAE47]">{message}</p> : null}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#27272A] bg-[#18181B] p-5 text-xs">
        <textarea className="min-h-[90px] w-full rounded-xl border border-[#27272A] bg-[#09090B] p-3 text-xs outline-none focus:border-[#5F8D3B]" placeholder="Client quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Client name (e.g. Sarah Vance)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 outline-none focus:border-[#5F8D3B]" placeholder="Role & Company" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#5F8D3B] px-4 py-2.5 font-bold text-white hover:bg-[#527C32]">
            <Plus size={14} /> {editingId ? 'Save testimonial' : 'Create testimonial'}
          </button>
          {editingId && (
            <button type="button" className="rounded-xl border border-[#27272A] px-4 py-2.5 font-semibold text-zinc-300" onClick={() => { setEditingId(null); setForm({ quote: '', name: '', role: '', rating: 5, video_url: '' }) }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {loading ? <p className="text-xs text-zinc-400">Loading testimonials…</p> : null}
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 text-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-zinc-300">“{t.quote}”</p>
                <p className="mt-2 font-bold text-white">{t.name} · <span className="text-zinc-400 font-normal">{t.role}</span></p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(t)} className="rounded-lg border border-[#27272A] bg-[#09090B] p-2 text-zinc-300 hover:text-white">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="rounded-lg border border-[#27272A] bg-[#09090B] p-2 text-zinc-300 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminPageLayout>
  )
}

function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchAdminContacts()
        setMessages(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setMessages([])
      } finally {
        setLoading(false)
      }
    }
    loadMessages()
  }, [])

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Inbound Leads" title="Messages" description="Review incoming project inquiry form submissions." />

      {loading ? <p className="text-xs text-zinc-400">Loading messages…</p> : null}
      <div className="space-y-3">
        {messages.length === 0 ? (
          <EmptyState title="No messages yet" description="Incoming inquiries will appear here when visitors submit the contact form." />
        ) : (
          messages.map((m, i) => (
            <div key={m.id || i} className="rounded-xl border border-[#27272A] bg-[#18181B] p-4 text-xs">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-white">{m.name}</p>
                  <p className="text-zinc-400">{m.email}</p>
                </div>
                <span className="rounded bg-[#5F8D3B]/20 text-[#7BAE47] px-2.5 py-1 font-mono text-[11px]">
                  {m.budget || 'Inquiry'}
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-zinc-300 border-t border-[#27272A] pt-3">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </AdminPageLayout>
  )
}

function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const data = await fetchAdminNewsletter()
        setSubscribers(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setSubscribers([])
      } finally {
        setLoading(false)
      }
    }
    loadSubscribers()
  }, [])

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Audience" title="Newsletter Subscribers" description="Manage email subscribers from the public website." />

      {loading ? <p className="text-xs text-zinc-400">Loading subscribers…</p> : null}
      <div className="rounded-2xl border border-[#27272A] bg-[#18181B] p-5 text-xs">
        <p className="font-semibold text-zinc-400">{subscribers.length} total subscribers</p>
        <div className="mt-3 space-y-2">
          {subscribers.length === 0 ? (
            <EmptyState title="No subscribers yet" description="Subscribers will appear here when visitors sign up." />
          ) : (
            subscribers.map((s, i) => (
              <div key={s.id || i} className="rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 text-zinc-300">
                {s.email}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

function SettingsPage() {
  const [profile, setProfile] = useState({ email: 'irfanshaikh3262@gmail.com' })
  const [form, setForm] = useState({ current_password: '', new_password: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAdminMe()
        if (data?.email) setProfile({ email: data.email })
      } catch (error) {
        setMessage(error.message)
      }
    }
    loadProfile()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateAdminPassword(form)
      setForm({ current_password: '', new_password: '' })
      setMessage('Password updated successfully')
    } catch (error) {
      setMessage(error.message || 'Password updated')
    }
  }

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Security" title="Account Settings" description="Update your admin password and manage account credentials." />

      {message ? <p className="rounded-xl border border-[#5F8D3B]/40 bg-[#5F8D3B]/10 px-4 py-2 text-xs font-semibold text-[#7BAE47]">{message}</p> : null}

      <div className="rounded-2xl border border-[#27272A] bg-[#18181B] p-5 text-xs">
        <span className="font-mono uppercase tracking-wider text-zinc-400">Authenticated Email</span>
        <p className="mt-1 text-sm font-bold text-white">{profile.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#27272A] bg-[#18181B] p-5 text-xs">
        <input className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 text-xs outline-none focus:border-[#5F8D3B]" type="password" placeholder="Current password" value={form.current_password} onChange={(e) => setForm({ ...form, current_password: e.target.value })} required />
        <input className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-2.5 text-xs outline-none focus:border-[#5F8D3B]" type="password" placeholder="New password" value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} required />
        <button type="submit" className="rounded-xl bg-[#5F8D3B] px-4 py-2.5 font-bold text-white hover:bg-[#527C32]">
          Update Password
        </button>
      </form>
    </AdminPageLayout>
  )
}

export default function AdminApp() {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => localStorage.getItem('wardom_admin_token'))
  const [me, setMe] = useState(() => ({ email: 'irfanshaikh3262@gmail.com' }))
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('wardom_admin_token')))
  const [error, setError] = useState('')
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [messages, setMessages] = useState([])
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    const syncSession = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const profile = await fetchAdminMe().catch(() => ({ email: 'irfanshaikh3262@gmail.com' }))
        if (profile?.email) setMe(profile)

        const [projectData, testimonialData, messageData, subscriberData] = await Promise.all([
          fetchAdminProjects().catch(() => []),
          fetchAdminTestimonials().catch(() => []),
          fetchAdminContacts().catch(() => []),
          fetchAdminNewsletter().catch(() => []),
        ])

        setProjects(Array.isArray(projectData) ? projectData : [])
        setTestimonials(Array.isArray(testimonialData) ? testimonialData : [])
        setMessages(Array.isArray(messageData) ? messageData : [])
        setSubscribers(Array.isArray(subscriberData) ? subscriberData : [])
      } catch (err) {
        console.warn('Session sync fallback:', err)
      } finally {
        setLoading(false)
      }
    }

    syncSession()
  }, [token])

  const handleLogin = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = form.get('email')
    const password = form.get('password')

    try {
      const result = await loginAdmin({ email, password })
      if (result?.access_token) {
        localStorage.setItem('wardom_admin_token', result.access_token)
        setToken(result.access_token)
        setMe({ email })
        setError('')
        navigate('/admin')
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('wardom_admin_token')
    setToken(null)
    setMe(null)
    setProjects([])
    setTestimonials([])
    setMessages([])
    setSubscribers([])
    navigate('/admin')
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#09090B] text-xs font-semibold text-zinc-400">Loading WARDOM console…</div>
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090B] px-4 text-white">
        <div className="w-full max-w-sm rounded-2xl border border-[#27272A] bg-[#121215] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5F8D3B] text-xs font-extrabold text-white">
              W
            </span>
            <span className="font-extrabold tracking-tight text-white text-sm">WARDOM Studio</span>
          </div>

          <h1 className="text-xl font-bold text-white">Admin Console</h1>
          <p className="mt-1 text-xs text-zinc-400">Sign in to manage portfolio projects, client testimonials, and messages.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-3 text-xs">
            <input className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-3 outline-none focus:border-[#5F8D3B]" name="email" type="email" placeholder="Admin Email" defaultValue="irfanshaikh3262@gmail.com" required />
            <input className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-4 py-3 outline-none focus:border-[#5F8D3B]" name="password" type="password" placeholder="Password" defaultValue="irfan123" required />
            {error && <p className="text-xs font-semibold text-red-400" role="alert">{error}</p>}
            <button className="w-full rounded-xl bg-[#5F8D3B] px-4 py-3 text-xs font-bold text-white hover:bg-[#527C32]">
              Sign In to Console
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <AdminShell me={me} onLogout={handleLogout}>
      <Routes>
        <Route index element={<DashboardPage projects={projects} testimonials={testimonials} messages={messages} subscribers={subscribers} />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="newsletter" element={<NewsletterPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </AdminShell>
  )
}
