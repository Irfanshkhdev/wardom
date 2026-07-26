const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

function buildUrl(path) {
  return `${API_BASE}/api${path}`.replace(/\/+/g, '/')
}

async function request(path, options = {}, auth = true) {
  const headers = new Headers(options.headers || {})

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (auth) {
    const token = localStorage.getItem('wardom_admin_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
  })

  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(data?.detail || 'Request failed')
  }

  return data
}

export async function loginAdmin(payload) {
  return request('/admin/login', { method: 'POST', body: JSON.stringify(payload) }, false)
}

export async function fetchAdminMe() {
  return request('/admin/me')
}

export async function fetchAdminProjects() {
  return request('/admin/projects')
}

export async function fetchAdminTestimonials() {
  return request('/admin/testimonials')
}

export async function fetchAdminContacts() {
  return request('/admin/contacts')
}

export async function fetchAdminNewsletter() {
  return request('/admin/newsletter')
}

export async function fetchAdminServices() {
  return request('/admin/services')
}

export async function createService(payload) {
  return request('/admin/services', { method: 'POST', body: JSON.stringify(payload) })
}

export async function updateService(id, payload) {
  return request(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export async function deleteService(id) {
  return request(`/admin/services/${id}`, { method: 'DELETE' })
}

export async function fetchAdminSettings() {
  return request('/admin/settings')
}

export async function updateAdminSettings(payload) {
  return request('/admin/settings', { method: 'PUT', body: JSON.stringify(payload) })
}

export async function markMessageRead(id, isRead) {
  return request(`/admin/messages/${id}/read`, { method: 'POST', body: JSON.stringify({ is_read: isRead }) })
}

export async function deleteMessage(id) {
  return request(`/admin/messages/${id}`, { method: 'DELETE' })
}

export async function deleteSubscriber(id) {
  return request(`/admin/newsletter/${id}`, { method: 'DELETE' })
}

export async function updateAdminPassword(payload) {
  return request('/admin/password', { method: 'POST', body: JSON.stringify(payload) })
}

export async function createProject(payload) {
  return request('/admin/projects', { method: 'POST', body: JSON.stringify(payload) })
}

export async function updateProject(id, payload) {
  return request(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export async function deleteProject(id) {
  return request(`/admin/projects/${id}`, { method: 'DELETE' })
}

export async function createTestimonial(payload) {
  return request('/admin/testimonials', { method: 'POST', body: JSON.stringify(payload) })
}

export async function updateTestimonial(id, payload) {
  return request(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export async function deleteTestimonial(id) {
  return request(`/admin/testimonials/${id}`, { method: 'DELETE' })
}
