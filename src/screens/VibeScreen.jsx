import { useState } from 'react'
import { config } from '../config.js'
import Hearts from '../components/Hearts.jsx'

// Single-select: pick our ideal activity. Some picks trigger a playful reaction.
export default function VibeScreen({ value, onNext }) {
  const c = config.vibe
  const customOption = c.options.find((o) => o.custom)
  // A saved value that isn't one of the fixed options came from the text box.
  const savedIsCustom =
    Boolean(value.vibe) && !c.options.some((o) => o.value === value.vibe)

  const [picked, setPicked] = useState(
    savedIsCustom ? customOption?.value || '' : value.vibe || ''
  )
  const [customText, setCustomText] = useState(savedIsCustom ? value.vibe : '')

  const isCustom = Boolean(customOption) && picked === customOption.value
  const answer = isCustom ? customText.trim() : picked
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

      {isCustom && (
        <input
          className="vibe-input"
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder={c.customPlaceholder}
          maxLength={80}
          autoFocus
        />
      )}

      {reaction && <p className="reaction">{reaction}</p>}

      <button className="btn" disabled={!answer} onClick={() => onNext({ vibe: answer })}>
        {answer ? c.button : isCustom ? c.emptyCustomButton : c.emptyButton}
      </button>
    </div>
  )
}
