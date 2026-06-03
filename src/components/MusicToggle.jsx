import { useEffect, useRef, useState } from 'react'
import { config } from '../config.js'

// A looping <audio> + a mute button. Mobile browsers block autoplay, so the
// track is kicked off by the first tap anywhere (see `armed`/`started`).
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(config.music.startMuted)
  const [started, setStarted] = useState(false)

  // Start playing on the very first user interaction with the page.
  useEffect(() => {
    if (config.music.startMuted) return
    const start = () => {
      const a = audioRef.current
      if (!a || started) return
      a.volume = 0.45
      a.play().then(() => setStarted(true)).catch(() => {})
      window.removeEventListener('pointerdown', start)
    }
    window.addEventListener('pointerdown', start, { once: false })
    return () => window.removeEventListener('pointerdown', start)
  }, [started])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (muted || a.paused) {
      a.volume = 0.45
      a.muted = false
      a.play().then(() => setStarted(true)).catch(() => {})
      setMuted(false)
    } else {
      a.muted = true
      setMuted(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={config.music.src} loop preload="auto" />
      <button
        className="music-btn"
        onClick={toggle}
        aria-label={muted ? 'unmute music' : 'mute music'}
        title={muted ? 'play music' : 'mute music'}
      >
        {muted ? '🔇' : '🎵'}
      </button>
    </>
  )
}
