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
  { label: 'Dashboard', to: '', icon: LayoutGrid },
  { label: 'Projects', to: 'projects', icon: FolderKanban },
  { label: 'Testimonials', to: 'testimonials', icon: Sparkles },
  { label: 'Messages', to: 'messages', icon: MessageSquareText },
  { label: 'Newsletter', to: 'newsletter', icon: Mail },
  { label: 'Settings', to: 'settings', icon: Settings },
]

function AdminShell({ me, onLogout, children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(231,185,106,0.18),transparent_28%),linear-gradient(135deg,#060606,#111111)] px-4 py-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
        <aside className="w-full min-w-0 rounded-[30px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl lg:w-72 lg:p-5">
          <div className="mb-8 flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/20 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7B96A]/30 bg-[#E7B96A]/15 text-sm font-semibold text-[#E7B96A]">
              W
            </div>
            <div>
              <p className="text-sm font-semibold">WARDOM Admin</p>
              <p className="text-xs text-white/55">{me?.email || 'Authenticated'}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ''}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-full px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={onLogout}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.08]"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1 rounded-[32px] border border-white/10 bg-black/20 p-4 backdrop-blur-2xl sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function DashboardPage({ projects, testimonials, messages, subscribers }) {
  const stats = [
    { label: 'Projects', value: projects.length, tint: 'bg-[#E7B96A]/15 text-[#E7B96A]' },
    { label: 'Testimonials', value: testimonials.length, tint: 'bg-white/10 text-white' },
    { label: 'Messages', value: messages.length, tint: 'bg-white/10 text-white' },
    { label: 'Subscribers', value: subscribers.length, tint: 'bg-[#E7B96A]/15 text-[#E7B96A]' },
  ]

  return (
    <AdminPageLayout>
      <PageHeader
        eyebrow="Operations"
        title="Dashboard"
        action={<Link to="projects" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/80">Manage content <ArrowRight size={16} /></Link>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatusCard key={stat.label} label={stat.label} value={stat.value} tint={stat.tint} />
        ))}
      </div>

      <FormCard title="Recent inquiries">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Latest messages</h2>
          <Link to="messages" className="text-sm text-[#E7B96A]">View all</Link>
        </div>

        <div className="mt-4 space-y-3">
          {messages.slice(0, 3).length === 0 ? (
            <EmptyState title="No messages yet" description="Incoming inquiries will appear here once the contact form is used." />
          ) : (
            messages.slice(0, 3).map((message) => (
              <div key={message.id} className="flex items-center justify-between rounded-[18px] border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{message.name}</p>
                  <p className="text-sm text-white/60">{message.email}</p>
                </div>
                <p className="text-sm text-white/55">{message.budget || 'No budget'}</p>
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
      setProjects(data)
    } catch (error) {
      setMessage(error.message)
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

  const handleEdit = (project) => {
    setEditingId(project.id)
    setForm({
      name: project.name,
      category: project.category,
      year: project.year,
      image_url: project.image_url || '',
      live_url: project.live_url || '',
      order: project.order || 0,
    })
  }

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId)
      setMessage('Project removed')
      loadProjects()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Content" title="Projects" description="Create, edit, and feature the work that should appear publicly on the homepage." />

      {message ? <p className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70">{message}</p> : null}

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-2">
        <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Project name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required />
        <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Year" value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} required />
        <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Image URL" value={form.image_url} onChange={(event) => setForm({ ...form, image_url: event.target.value })} />
        <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Live URL" value={form.live_url} onChange={(event) => setForm({ ...form, live_url: event.target.value })} />
        <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" type="number" placeholder="Order" value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} />
        <label className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 lg:col-span-2">
          <input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => setForm({ ...form, featured: event.target.checked })} />
          Featured on homepage
        </label>
        <div className="lg:col-span-2 flex gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#E7B96A] px-4 py-2.5 text-sm font-medium text-[#090909]">
            <Plus size={16} /> {editingId ? 'Save changes' : 'Create project'}
          </button>
          {editingId ? <button type="button" className="rounded-full border border-white/10 px-4 py-2.5 text-sm" onClick={() => { setEditingId(null); setForm({ name: '', category: '', year: '', image_url: '', live_url: '', order: 0 }) }}>Cancel</button> : null}
        </div>
      </form>

      <div className="space-y-3">
        {loading ? <p className="text-sm text-white/60">Loading projects…</p> : null}
        {!loading && projects.length === 0 ? (
          <EmptyState title="No projects yet" description="Add your first project and it will appear in the public portfolio." />
        ) : null}
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">{project.name}</p>
              <p className="text-sm text-white/60">{project.category} · {project.year}</p>
              {project.featured ? <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#E7B96A]">Featured</p> : null}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-white/80">
                <Pencil size={15} />
              </button>
              <button onClick={() => handleDelete(project.id)} className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-white/80">
                <Trash2 size={15} />
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
      setTestimonials(data)
    } catch (error) {
      setMessage(error.message)
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

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id)
    setForm({
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      rating: testimonial.rating || 5,
      video_url: testimonial.video_url || '',
    })
  }

  const handleDelete = async (testimonialId) => {
    try {
      await deleteTestimonial(testimonialId)
      setMessage('Testimonial removed')
      loadTestimonials()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Growth" title="Testimonials" description="Manage the social proof that appears on the public site." />

      {message ? <p className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70">{message}</p> : null}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
        <textarea className="min-h-[110px] w-full rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Quote" value={form.quote} onChange={(event) => setForm({ ...form, quote: event.target.value })} required />
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} required />
          <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" type="number" min="1" max="5" placeholder="Rating" value={form.rating} onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })} />
          <input className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" placeholder="Video URL" value={form.video_url} onChange={(event) => setForm({ ...form, video_url: event.target.value })} />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#E7B96A] px-4 py-2.5 text-sm font-medium text-[#090909]">
            <Plus size={16} /> {editingId ? 'Save testimonial' : 'Create testimonial'}
          </button>
          {editingId ? <button type="button" className="rounded-full border border-white/10 px-4 py-2.5 text-sm" onClick={() => { setEditingId(null); setForm({ quote: '', name: '', role: '', rating: 5, video_url: '' }) }}>Cancel</button> : null}
        </div>
      </form>

      <div className="space-y-3">
        {loading ? <p className="text-sm text-white/60">Loading testimonials…</p> : null}
        {!loading && testimonials.length === 0 ? (
          <EmptyState title="No testimonials yet" description="Add a short quote and it will appear in the public testimonials section." />
        ) : null}
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-white/80">“{testimonial.quote}”</p>
                <p className="mt-2 text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-white/55">{testimonial.role}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(testimonial)} className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-white/80">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(testimonial.id)} className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-white/80">
                  <Trash2 size={15} />
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
        setMessages(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
  }, [])

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Inbound" title="Messages" description="Review incoming inquiries and keep the inbox organized." />

      {loading ? <p className="text-sm text-white/60">Loading messages…</p> : null}
      <div className="space-y-3">
        {messages.length === 0 ? (
          <EmptyState title="No messages yet" description="New contact submissions will appear here for review." />
        ) : (
          messages.map((message) => (
            <div key={message.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{message.name}</p>
                  <p className="text-sm text-white/60">{message.email}</p>
                </div>
                <p className="text-sm text-white/55">{message.budget || 'No budget indicated'}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/70">{message.message}</p>
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
        setSubscribers(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadSubscribers()
  }, [])

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Audience" title="Newsletter" description="Review and manage subscribers from the public newsletter form." />

      {loading ? <p className="text-sm text-white/60">Loading subscribers…</p> : null}
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm text-white/60">{subscribers.length} active subscribers</p>
        <div className="mt-4 space-y-2">
          {subscribers.length === 0 ? (
            <EmptyState title="No subscribers yet" description="The list will populate as visitors sign up from the public website." />
          ) : (
            subscribers.map((subscriber) => (
              <div key={subscriber.id} className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                {subscriber.email}
              </div>
            ))
          )}
        </div>
      </div>
    </AdminPageLayout>
  )
}

function SettingsPage() {
  const [profile, setProfile] = useState({ email: '' })
  const [form, setForm] = useState({ current_password: '', new_password: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAdminMe()
        setProfile({ email: data.email })
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
      setMessage('Password updated')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminPageLayout>
      <PageHeader eyebrow="Account" title="Settings" description="Manage the account profile and update the admin password securely." />

      {message ? <p className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70">{message}</p> : null}

      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-white/55">Profile</p>
        <p className="mt-3 text-lg font-semibold text-white">{profile.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
        <input className="w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" type="password" placeholder="Current password" value={form.current_password} onChange={(event) => setForm({ ...form, current_password: event.target.value })} required />
        <input className="w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" type="password" placeholder="New password" value={form.new_password} onChange={(event) => setForm({ ...form, new_password: event.target.value })} required />
        <button type="submit" className="rounded-full bg-[#E7B96A] px-4 py-2.5 text-sm font-medium text-[#090909]">Update password</button>
      </form>
    </AdminPageLayout>
  )
}

export default function AdminApp() {
  const navigate = useNavigate()
  const [token, setToken] = useState(() => localStorage.getItem('wardom_admin_token'))
  const [me, setMe] = useState(null)
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
        const profile = await fetchAdminMe()
        setMe(profile)
        const [projectData, testimonialData, messageData, subscriberData] = await Promise.all([
          fetchAdminProjects(),
          fetchAdminTestimonials(),
          fetchAdminContacts(),
          fetchAdminNewsletter(),
        ])
        setProjects(projectData)
        setTestimonials(testimonialData)
        setMessages(messageData)
        setSubscribers(subscriberData)
      } catch (err) {
        setError(err.message)
        localStorage.removeItem('wardom_admin_token')
        setToken(null)
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
      localStorage.setItem('wardom_admin_token', result.access_token)
      setToken(result.access_token)
      setError('')
      navigate('/admin')
    } catch (err) {
      setError(err.message)
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
    return <div className="flex min-h-screen items-center justify-center bg-[#060606] text-sm text-white/70">Loading admin console…</div>
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(231,185,106,0.18),transparent_28%),linear-gradient(135deg,#060606,#111111)] px-4">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/55">WARDOM Studio</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Admin access</h1>
          <p className="mt-2 text-sm text-white/65">Sign in with the existing admin credentials to manage projects, testimonials, messages and newsletter subscribers.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input className="w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" name="email" type="email" placeholder="Email" required />
            <input className="w-full rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" name="password" type="password" placeholder="Password" required />
            {error ? <p className="text-sm text-[#E7B96A]">{error}</p> : null}
            <button className="w-full rounded-full bg-[#E7B96A] px-4 py-3 text-sm font-medium text-[#090909]">Sign in</button>
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
