import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const webhook = import.meta.env.VITE_NOTIFY_WEBHOOK // optional: Discord/Slack/Zapier

export const hasSupabase = Boolean(url && key)

const supabase = hasSupabase ? createClient(url, key) : null

// Optional: ping you instantly the moment she answers (Discord/Slack webhook).
function pingMe(data) {
  if (!webhook) return
  const text = [
    '💙 SHE SAID YES 💙',
    `when: ${data.date} at ${data.time}`,
    `food: ${(data.foods || []).join(', ')}`,
    `vibe: ${data.vibe}`,
  ].join('\n')
  // `content` works for Discord, `text` works for Slack — send both.
  fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text, text }),
  }).catch(() => {})
}

// Saves a response. NEVER throws — the date should "just work" no matter what.
//  1. Always keeps a local copy (so nothing is ever lost).
//  2. If Supabase is configured, writes directly to the DB from the browser.
export async function saveResponse(data) {
  // 1. local copy
  try {
    const all = JSON.parse(localStorage.getItem('date_responses') || '[]')
    all.push(data)
    localStorage.setItem('date_responses', JSON.stringify(all))
  } catch (_) {
    /* localStorage unavailable (private mode) — that's fine */
  }

  // 2. optional instant ping to your phone
  pingMe(data)

  // 3. direct-to-DB write (no backend)
  if (!supabase) return { ok: true, where: 'local' }
  try {
    const { error } = await supabase.from('responses').insert([data])
    if (error) throw error
    return { ok: true, where: 'supabase' }
  } catch (e) {
    console.warn('[db] Supabase write failed, kept a local copy:', e?.message)
    return { ok: false, where: 'local', error: e?.message }
  }
}
