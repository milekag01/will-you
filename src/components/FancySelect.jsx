import { useEffect, useRef, useState } from 'react'

// A fully custom dropdown — no ugly native <select>. Animated panel,
// click-outside to close, keyboard support (Esc / arrows / Enter).
export default function FancySelect({ options, value, placeholder, onChange }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1) // keyboard-highlighted row
  const rootRef = useRef(null)

  const selected = options.find((o) => o.value === value)

  // close when clicking outside
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [open])

  const pick = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onKey = (e) => {
    if (e.key === 'Escape') return setOpen(false)
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(options.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault()
      pick(options[active].value)
    }
  }

  return (
    <div className={`fsel ${open ? 'open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={`fsel-trigger ${selected ? 'has-val' : ''}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected ? selected.value : placeholder}</span>
        <span className="fsel-caret">⌄</span>
      </button>

      {open && (
        <ul className="fsel-panel" role="listbox" onKeyDown={onKey}>
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`fsel-opt ${o.value === value ? 'sel' : ''} ${
                i === active ? 'active' : ''
              }`}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(o.value)}
            >
              {o.label || o.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
