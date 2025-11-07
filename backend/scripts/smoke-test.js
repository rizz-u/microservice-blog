const GATEWAY = process.env.GATEWAY || 'http://localhost:8080'

async function waitFor(url, timeout = 60000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch (e) {}
    await new Promise(r => setTimeout(r, 1000))
  }
  throw new Error('timeout waiting for ' + url)
}

async function run() {
  console.log('Waiting for gateway health...')
  await waitFor(`${GATEWAY}/health`)
  console.log('Gateway healthy')

  // register user
  try {
    const regRes = await fetch(`${GATEWAY}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'smoke@example.com', name: 'Smoke', password: 'password' })
    })
    console.log('Register status:', regRes.status)
    const regText = await regRes.text()
    console.log('Register body:', regText)
  } catch (e) {
    console.error('Register error', e)
    throw e
  }

  // login
  let token
  try {
    const loginRes = await fetch(`${GATEWAY}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'smoke@example.com', password: 'password' })
    })
    console.log('Login status:', loginRes.status)
    const loginText = await loginRes.text()
    console.log('Login body:', loginText)
    try { token = JSON.parse(loginText).token } catch(e) { console.error('Failed to parse login body') }
  } catch (e) {
    console.error('Login error', e)
    throw e
  }

  // create post
  let postJson
  try {
    const postRes = await fetch(`${GATEWAY}/api/v1/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ title: 'Smoke test', body: 'This is a smoke test' })
    })
    console.log('Create post status:', postRes.status)
    const postText = await postRes.text()
    console.log('Create post body:', postText)
    try { postJson = JSON.parse(postText) } catch(e) { console.error('Failed to parse post JSON') }
  } catch (e) {
    console.error('Create post error', e)
    throw e
  }

  // create comment
  try {
    const commentRes = await fetch(`${GATEWAY}/api/v1/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ postId: postJson?._id || postJson?.id || 'unknown', body: 'Nice post' })
    })
    console.log('Create comment status:', commentRes.status)
    const commentText = await commentRes.text()
    console.log('Create comment body:', commentText)
  } catch (e) {
    console.error('Create comment error', e)
    throw e
  }

  console.log('Smoke test completed')
}

run().catch(err => { console.error(err); process.exit(1) })
