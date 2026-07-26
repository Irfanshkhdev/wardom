const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

function buildUrl(path) {
  return `${API_BASE}/api${path}`.replace(/\/+/g, '/')
}

async function postJson(path, payload) {
  const res = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || 'Something went wrong. Please try again.')
  }

  return res.json()
}

export async function submitContactForm(payload) {
  return postJson('/contact', payload)
}

export async function submitNewsletterForm(payload) {
  return postJson('/newsletter', payload)
}
