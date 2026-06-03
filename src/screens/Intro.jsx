import { useRef, useState } from 'react'
import { config } from '../config.js'

// The big question. "Yes" advances; the small "no" runs away and can't be caught.
export default function Intro({ onYes }) {
  const c = config.intro
  const [pos, setPos] = useState(null) // null = resting beneath the yes button
  const [dodges, setDodges] = useState(0)
  const noRef = useRef(null)

  const flee = () => {
    const pad = 80
    const w = window.innerWidth
    const h = window.innerHeight
    const x = (dodges * 137 + 61) % (w - pad * 2) - (w - pad * 2) / 2
    const yMag = 70 + ((dodges * 83) % 180)
    const y = (dodges % 2 ? 1 : -1) * yMag
    setPos({ x, y: Math.max(-h / 2 + pad, Math.min(h / 2 - pad, y)) })
    setDodges((d) => d + 1)
  }

  const noLabel = pos === null ? c.no : c.noDodges[(dodges - 1) % c.noDodges.length]

  return (
    <div className="screen">
      <div className="sticker">{c.sticker}</div>
      <p className="kicker">{c.kicker}</p>
      <h1>{c.title}</h1>

      <div className="intro-actions">
        <button className="btn btn-xl" onClick={onYes}>
          {c.yes}
        </button>

        <button
          ref={noRef}
          className="no-ghost"
          onMouseEnter={flee}
          onClick={(e) => {
            e.preventDefault()
            flee()
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            flee()
          }}
          style={
            pos
              ? {
                  position: 'fixed',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                }
              : undefined
          }
        >
          {noLabel}
        </button>
      </div>

      {dodges > 2 && <p className="fade-note">{c.shyNote}</p>}
    </div>
  )
}
