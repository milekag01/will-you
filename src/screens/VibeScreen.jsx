import { useState } from 'react'
import { config } from '../config.js'
import Hearts from '../components/Hearts.jsx'

// Single-select: pick our ideal activity. Some picks trigger a playful reaction.
export default function VibeScreen({ value, onNext }) {
  const c = config.vibe
  const [picked, setPicked] = useState(value.vibe || '')

  const reaction = picked && c.reactions ? c.reactions[picked] : null

  return (
    <div className="screen">
      <Hearts total={4} current={4} />
      <h1>{c.title}</h1>
      <p className="subtitle">{c.subtitle}</p>

      <div className="grid">
        {c.options.map((o) => {
          const sel = picked === o.value
          return (
            <button
              key={o.value}
              className={`choice ${sel ? 'sel' : ''}`}
              onClick={() => setPicked(o.value)}
              aria-pressed={sel}
            >
              <span className="tick">✓</span>
              <span className="emoji">{o.emoji}</span>
              <span className="name">{o.value}</span>
            </button>
          )
        })}
      </div>

      {reaction && <p className="reaction">{reaction}</p>}

      <button className="btn" disabled={!picked} onClick={() => onNext({ vibe: picked })}>
        {picked ? c.button : c.emptyButton}
      </button>
    </div>
  )
}
