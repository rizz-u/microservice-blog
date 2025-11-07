const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

async function request(path: string, opts: RequestInit = {}) {
  try {
    const apiPath = path.startsWith('/api/v1') ? path : `/api/v1${path.startsWith('/') ? '' : '/'}${path}`
    const url = `${API}${apiPath}`.replace(/([^:]\/)\/+/g, '$1')
    console.log('Making request to:', url, 'with options:', { ...opts, headers: opts.headers })
    
    const headers = new Headers(opts.headers || {})
    headers.set('x-correlation-id', cryptoRandom())

    const res = await fetch(url, {
      ...opts,
      headers,
      mode: 'cors',
      credentials: 'same-origin'
    })
    
    const contentType = res.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const data = isJson ? await res.json() : await res.text()
    
    if (!res.ok) {
      console.error('API Error:', { status: res.status, data })
      throw new Error(isJson ? data.message || 'Request failed' : data)
    }
    
    return data
  } catch (err) {
    console.error('Request failed:', err)
    throw err
  }
}

function cryptoRandom() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2)
}


export async function getPosts(query = '') {
  return request(`/posts${query}`)
}

export async function createPost(payload: { title: string; body: string; tags?: string[] }) {
  return request('/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
}

export async function createComment(payload: { postId: string; body: string }) {
  return request('/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
}
