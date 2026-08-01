import { useEffect, useRef, useState } from 'react'
import { config } from '../config.js'

// Absolute URLs pass through; everything else hangs off the deploy base so
// the same build works at a domain root and at a /repo/ Pages path.
const srcUrl = /^https?:\/\//.test(config.music.src)
  ? config.music.src
  : import.meta.env.BASE_URL.replace(/\/?$/, '/') +
    config.music.src.replace(/^\.?\//, '')

const VOLUME = 0.45
const FADE = 0.22 // seconds

const AC = typeof window !== 'undefined'
  ? window.AudioContext || window.webkitAudioContext
  : null

// Music via Web Audio.
//
// iOS is the awkward one. An AudioContext created outside a user gesture can
// end up permanently suspended, and resume() on it quietly does nothing — the
// page looks fine and no sound ever arrives. So the raw bytes are fetched up
// front (that part is safe anywhere), and if the context we built at load
// won't run, we throw it away and build a fresh one *inside* the tap handler,
// which iOS always honours.
//
// Note decodeAudioData detaches the ArrayBuffer it's given, so every decode
// gets its own copy.
export default function MusicToggle() {
  const bytesRef = useRef(null) // pristine ArrayBuffer, kept for re-decodes
  const ctxRef = useRef(null)
  const bufferRef = useRef(null)
  const gainRef = useRef(null)
  const sourceRef = useRef(null)
  const wantsPlayRef = useRef(false)

  const [muted, setMuted] = useState(config.music.startMuted)
  const [broken, setBroken] = useState(false)

  const makeContext = () => {
    const ctx = new AC()
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(ctx.destination)
    ctxRef.current = ctx
    gainRef.current = gain
    return ctx
  }

  const decodeInto = (ctx) =>
    ctx.decodeAudioData(bytesRef.current.slice(0)).then((decoded) => {
      bufferRef.current = decoded
      return decoded
    })

  // ── fetch the bytes, and optimistically decode ────────────────────────
  useEffect(() => {
    if (!AC) {
      setBroken(true)
      return
    }
    let cancelled = false
    const t0 = performance.now()

    fetch(srcUrl)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.arrayBuffer()
      })
      .then((bytes) => {
        if (cancelled) return null
        bytesRef.current = bytes
        // Desktop fast path. On iOS this context may be born unusable; that's
        // fine, the tap handler will notice and replace it.
        return decodeInto(makeContext())
      })
      .then((decoded) => {
        if (cancelled || !decoded) return
        console.info(
          `[music] ready in ${Math.round(performance.now() - t0)}ms ` +
            `(${decoded.duration.toFixed(0)}s)`
        )
        if (wantsPlayRef.current) play()
      })
      .catch((e) => {
        console.warn('[music] load failed:', e.message)
        // A decode failure still leaves the bytes usable for a retry in-gesture.
        if (!cancelled && !bytesRef.current) setBroken(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const ramp = (to) => {
    const ctx = ctxRef.current
    const gain = gainRef.current
    if (!ctx || !gain) return
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(to, ctx.currentTime + FADE)
  }

  const startSource = () => {
    const ctx = ctxRef.current
    if (!ctx || !bufferRef.current || sourceRef.current) return
    const source = ctx.createBufferSource()
    source.buffer = bufferRef.current
    source.loop = true
    source.connect(gainRef.current)
    source.start(0)
    sourceRef.current = source
  }

  // Must be called from inside a real gesture for iOS to co-operate.
  const play = () => {
    if (!AC || !bytesRef.current) {
      wantsPlayRef.current = true
      return
    }
    let ctx = ctxRef.current || makeContext()
    ctx.resume?.()

    // iOS tell: still not running even though we're in a gesture. The context
    // is a dud — rebuild it here, where the gesture actually counts.
    if (ctx.state !== 'running') {
      try {
        ctx.close?.()
      } catch {
        /* already dead */
      }
      sourceRef.current = null
      bufferRef.current = null
      ctx = makeContext()
      ctx.resume?.()
      decodeInto(ctx)
        .then(() => {
          startSource()
          ramp(VOLUME)
          console.info('[music] recovered with a gesture-built context')
        })
        .catch((e) => console.warn('[music] decode failed:', e.message))
      return
    }

    if (!bufferRef.current) {
      wantsPlayRef.current = true // bytes are in, decode still running
      return
    }
    startSource()
    ramp(VOLUME)
  }

  // ── first interaction anywhere starts it ──────────────────────────────
  useEffect(() => {
    if (config.music.startMuted) return
    const EVENTS = ['pointerdown', 'touchstart', 'keydown', 'click']
    const onFirst = () => {
      const t = performance.now()
      play()
      console.info(
        `[music] tap handled in ${Math.round(performance.now() - t)}ms, ` +
          `ctx=${ctxRef.current?.state}`
      )
      EVENTS.forEach((e) => window.removeEventListener(e, onFirst, true))
    }
    EVENTS.forEach((e) => window.addEventListener(e, onFirst, true))
    return () => EVENTS.forEach((e) => window.removeEventListener(e, onFirst, true))
  }, [])

  const toggle = () => {
    if (muted) {
      play()
      setMuted(false)
    } else {
      wantsPlayRef.current = false
      ramp(0)
      setMuted(true)
    }
  }

  if (broken) return null

  return (
    <button
      className="music-btn"
      onClick={toggle}
      aria-label={muted ? 'unmute music' : 'mute music'}
      title={muted ? 'play music' : 'mute music'}
    >
      {muted ? '🔇' : '🎵'}
    </button>
  )
}
