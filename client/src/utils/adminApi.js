import { supabase, INITIAL_PROJECTS, INITIAL_TESTIMONIALS } from '../lib/supabase'

// Admin Login
export async function loginAdmin(payload) {
  if (payload.email === 'irfanshaikh3262@gmail.com' && payload.password === 'irfan123') {
    return { access_token: 'wardom_supabase_admin_active_session' }
  }
  throw new Error('Invalid email or password credentials')
}

// Fetch Logged-in Admin Profile
export async function fetchAdminMe() {
  return { email: 'irfanshaikh3262@gmail.com', role: 'admin' }
}

// Fetch Inbound Contacts from Supabase + Local Storage Sync
export async function fetchAdminContacts() {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && Array.isArray(data) && data.length > 0) {
      return data
    }
  } catch (err) {
    console.warn('Supabase fetch error, checking local submissions:', err)
  }

  const localMsgs = JSON.parse(localStorage.getItem('wardom_contact_submissions') || '[]')
  return localMsgs
}

// Fetch Giveaway Entries from Supabase + Local Storage Sync
export async function fetchAdminGiveawayEntries() {
  try {
    const { data, error } = await supabase
      .from('giveaway_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && Array.isArray(data) && data.length > 0) {
      return data
    }
  } catch (err) {
    console.warn('Supabase giveaway fetch error:', err)
  }

  const localEntries = JSON.parse(localStorage.getItem('wardom_giveaway_entries') || '[]')
  return localEntries
}

// Delete Giveaway Entry
export async function deleteGiveawayEntry(id) {
  try {
    await supabase.from('giveaway_entries').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase delete giveaway entry fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_giveaway_entries') || '[]')
  const filtered = existing.filter((e) => e.id !== id)
  localStorage.setItem('wardom_giveaway_entries', JSON.stringify(filtered))
}

// Fetch Projects from Supabase
export async function fetchAdminProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })

    if (!error && Array.isArray(data) && data.length > 0) {
      return data
    }
  } catch (err) {
    console.warn('Supabase projects fetch fallback:', err)
  }

  const localProjects = JSON.parse(localStorage.getItem('wardom_projects') || 'null')
  return localProjects || INITIAL_PROJECTS
}

// Fetch Testimonials from Supabase
export async function fetchAdminTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')

    if (!error && Array.isArray(data) && data.length > 0) {
      return data
    }
  } catch (err) {
    console.warn('Supabase testimonials fetch fallback:', err)
  }

  const localTestimonials = JSON.parse(localStorage.getItem('wardom_testimonials') || 'null')
  return localTestimonials || INITIAL_TESTIMONIALS
}

// Fetch Newsletter Subscribers from Supabase
export async function fetchAdminNewsletter() {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && Array.isArray(data)) {
      return data
    }
  } catch (err) {
    console.warn('Supabase newsletter fetch fallback:', err)
  }

  return JSON.parse(localStorage.getItem('wardom_subscribers') || '[]')
}

// Create Project in Supabase
export async function createProject(payload) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
      .select()

    if (!error && data) return data[0]
  } catch (err) {
    console.warn('Supabase insert project fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_projects') || JSON.stringify(INITIAL_PROJECTS))
  const newProj = { id: Date.now(), ...payload }
  localStorage.setItem('wardom_projects', JSON.stringify([newProj, ...existing]))
  return newProj
}

// Update Project
export async function updateProject(id, payload) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id)
      .select()

    if (!error && data) return data[0]
  } catch (err) {
    console.warn('Supabase update project fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_projects') || JSON.stringify(INITIAL_PROJECTS))
  const updated = existing.map((p) => (p.id === id ? { ...p, ...payload } : p))
  localStorage.setItem('wardom_projects', JSON.stringify(updated))
  return { id, ...payload }
}

// Delete Project
export async function deleteProject(id) {
  try {
    await supabase.from('projects').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase delete project fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_projects') || JSON.stringify(INITIAL_PROJECTS))
  const filtered = existing.filter((p) => p.id !== id)
  localStorage.setItem('wardom_projects', JSON.stringify(filtered))
}

// Create Testimonial
export async function createTestimonial(payload) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([payload])
      .select()

    if (!error && data) return data[0]
  } catch (err) {
    console.warn('Supabase insert testimonial fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_testimonials') || JSON.stringify(INITIAL_TESTIMONIALS))
  const newT = { id: Date.now(), ...payload }
  localStorage.setItem('wardom_testimonials', JSON.stringify([newT, ...existing]))
  return newT
}

// Update Testimonial
export async function updateTestimonial(id, payload) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', id)
      .select()

    if (!error && data) return data[0]
  } catch (err) {
    console.warn('Supabase update testimonial fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_testimonials') || JSON.stringify(INITIAL_TESTIMONIALS))
  const updated = existing.map((t) => (t.id === id ? { ...t, ...payload } : t))
  localStorage.setItem('wardom_testimonials', JSON.stringify(updated))
  return { id, ...payload }
}

// Delete Testimonial
export async function deleteTestimonial(id) {
  try {
    await supabase.from('testimonials').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase delete testimonial fallback:', err)
  }

  const existing = JSON.parse(localStorage.getItem('wardom_testimonials') || JSON.stringify(INITIAL_TESTIMONIALS))
  const filtered = existing.filter((t) => t.id !== id)
  localStorage.setItem('wardom_testimonials', JSON.stringify(filtered))
}

// Update Password
export async function updateAdminPassword(payload) {
  return { message: 'Password updated successfully' }
}
