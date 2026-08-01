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

// Music via Web Audio rather than an <audio> element.
//
// An <audio> element decides when it's ready, and can stall on buffering or
// seeking at the worst possible moment — the tap. Here the whole track is
// downloaded and decoded to PCM in memory while she's still reading screen 1,
// so the tap only has to call start(), which is sample-accurate and cannot
// wait on anything.
//
// Autoplay policy still applies: an AudioContext starts suspended and only
// resumes inside a real gesture. That's unavoidable in every browser.
export default function MusicToggle() {
  const ctxRef = useRef(null)
  const bufferRef = useRef(null)
  const gainRef = useRef(null)
  const sourceRef = useRef(null)
  const wantsPlayRef = useRef(false)

  const [muted, setMuted] = useState(config.music.startMuted)
  const [broken, setBroken] = useState(false)

  // ── fetch + decode ahead of time ──────────────────────────────────────
  useEffect(() => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) {
      setBroken(true)
      return
    }
    let cancelled = false
    const ctx = new AC()
    ctxRef.current = ctx

    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(ctx.destination)
    gainRef.current = gain

    const t0 = performance.now()
    fetch(srcUrl)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.arrayBuffer()
      })
      .then((bytes) => ctx.decodeAudioData(bytes))
      .then((decoded) => {
        if (cancelled) return
        bufferRef.current = decoded
        console.info(
          `[music] ready in ${Math.round(performance.now() - t0)}ms ` +
            `(${decoded.duration.toFixed(0)}s decoded)`
        )
        // She already tapped while it was still decoding — go now.
        if (wantsPlayRef.current) play()
      })
      .catch((e) => {
        console.warn('[music] could not load', srcUrl, '—', e.message)
        if (!cancelled) setBroken(true)
      })

    return () => {
      cancelled = true
      ctx.close?.()
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

  const play = () => {
    const ctx = ctxRef.current
    const buffer = bufferRef.current
    const gain = gainRef.current
    if (!ctx || !gain) return
    ctx.resume?.()
    if (!buffer) {
      wantsPlayRef.current = true // not decoded yet; start the moment it is
      return
    }
    if (!sourceRef.current) {
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.connect(gain)
      source.start(0)
      sourceRef.current = source
    }
    ramp(VOLUME)
  }

  // ── first interaction anywhere unmutes ────────────────────────────────
  useEffect(() => {
    if (config.music.startMuted) return
    const EVENTS = ['pointerdown', 'touchstart', 'keydown', 'click']
    const onFirst = () => {
      const t = performance.now()
      play()
      console.info(`[music] started ${Math.round(performance.now() - t)}ms after tap`)
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
