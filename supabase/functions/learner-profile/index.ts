import { createClient } from 'npm:@supabase/supabase-js@2.95.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://m-dandrea.github.io',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}
const encoder = new TextEncoder()

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {status, headers: corsHeaders})
}

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function hashPassword(password: string, salt: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations: 120000}, key, 256)
  return hex(new Uint8Array(bits))
}

function sameHash(left: string, right: string) {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index++) difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  return difference === 0
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', {headers: corsHeaders})
  if (request.method !== 'POST') return response({error: 'Method not allowed.'}, 405)

  try {
    const body = await request.json()
    const action = String(body.action || '')
    const username = String(body.username || '').trim().toLowerCase()
    const password = String(body.password || '')
    if (!/^[a-z0-9_-]{3,24}$/.test(username)) return response({error: 'Invalid username.'}, 400)
    if (password.length < 6) return response({error: 'Password must contain at least 6 characters.'}, 400)

    const secretKeys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}')
    const secretKey = secretKeys.default || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, secretKey!)

    if (action === 'create') {
      const state = body.state && typeof body.state === 'object' ? body.state : {}
      if (JSON.stringify(state).length > 250000) return response({error: 'Profile is too large.'}, 413)
      const salt = hex(crypto.getRandomValues(new Uint8Array(16)))
      const passwordHash = await hashPassword(password, salt)
      const {error} = await supabase.from('learner_accounts').insert({username, password_hash: passwordHash, password_salt: salt, state})
      if (error?.code === '23505') return response({error: 'That username is already taken.'}, 409)
      if (error) throw error
      return response({state})
    }

    const {data: profile, error: loadError} = await supabase.from('learner_accounts').select('password_hash,password_salt,state').eq('username', username).maybeSingle()
    if (loadError) throw loadError
    if (!profile) return response({error: 'Username not found.'}, 404)
    if (profile.password_hash) {
      const candidate = await hashPassword(password, profile.password_salt)
      if (!sameHash(candidate, profile.password_hash)) return response({error: 'Incorrect password.'}, 401)
    } else {
      if (action !== 'load') return response({error: 'Open this username first to set its password.'}, 401)
      const salt = hex(crypto.getRandomValues(new Uint8Array(16)))
      const passwordHash = await hashPassword(password, salt)
      const {error} = await supabase.from('learner_accounts').update({password_hash: passwordHash, password_salt: salt, updated_at: new Date().toISOString()}).eq('username', username)
      if (error) throw error
    }

    if (action === 'load') return response({state: profile.state})
    if (action === 'save') {
      const state = body.state && typeof body.state === 'object' ? body.state : {}
      if (JSON.stringify(state).length > 250000) return response({error: 'Profile is too large.'}, 413)
      const {error} = await supabase.from('learner_accounts').update({state, updated_at: new Date().toISOString()}).eq('username', username)
      if (error) throw error
      return response({saved: true})
    }
    return response({error: 'Invalid action.'}, 400)
  } catch (error) {
    console.error(error)
    return response({error: 'Profile service unavailable.'}, 500)
  }
})
