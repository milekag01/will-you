import { useState } from 'react'
import { config } from '../config.js'
import Hearts from '../components/Hearts.jsx'

// Multi-select: you can pick more than one.
export default function FoodScreen({ value, onNext }) {
  const c = config.food
  const [picked, setPicked] = useState(value.foods || [])

  const toggle = (v) =>
    setPicked((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))

  return (
    <div className="screen">
      <Hearts total={4} current={3} />
      <h1>{c.title}</h1>
      <p className="subtitle">{c.subtitle}</p>

      <div className="grid">
        {c.options.map((o) => {
          const sel = picked.includes(o.value)
          return (
            <button
              key={o.value}
              className={`choice ${sel ? 'sel' : ''}`}
              onClick={() => toggle(o.value)}
              aria-pressed={sel}
            >
              <span className="tick">✓</span>
              <span className="emoji">{o.emoji}</span>
              <span className="name">{o.value}</span>
            </button>
          )
        })}
      </div>

      <button
        className="btn"
        disabled={picked.length === 0}
        onClick={() => onNext({ foods: picked })}
      >
        {picked.length === 0 ? c.emptyButton : c.button}
      </button>
    </div>
  )
}
