import { useState } from 'react'
import { config } from '../config.js'
import Hearts from '../components/Hearts.jsx'

// Single-select: this screen picks the FORMAT of the date (coffee vs dinner
// vs drinks), and you only get one of those. Saved as a one-item array so the
// stored shape stays the same as before.
export default function FoodScreen({ value, onNext }) {
  const c = config.food
  const [picked, setPicked] = useState(value.foods?.[0] || '')

  return (
    <div className="screen">
      <Hearts total={4} current={3} />
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

      <button
        className="btn"
        disabled={!picked}
        onClick={() => onNext({ foods: [picked] })}
      >
        {picked ? c.button : c.emptyButton}
      </button>
    </div>
  )
}
