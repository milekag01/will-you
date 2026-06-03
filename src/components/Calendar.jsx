import { useState } from 'react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const iso = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

// A compact custom calendar. Past days are disabled. Returns "YYYY-MM-DD".
export default function Calendar({ value, onChange }) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const init = value ? value.split('-').map(Number) : null
  const [view, setView] = useState(
    init ? { y: init[0], m: init[1] - 1 } : { y: now.getFullYear(), m: now.getMonth() },
  )

  const firstDow = new Date(view.y, view.m, 1).getDay()
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()

  // disable navigating to fully-past months
  const atCurrentMonth = view.y === now.getFullYear() && view.m === now.getMonth()

  const go = (delta) => {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="cal">
      <div className="cal-head">
        <button
          type="button"
          className="cal-nav"
          onClick={() => go(-1)}
          disabled={atCurrentMonth}
          aria-label="previous month"
        >
          ‹
        </button>
        <div className="cal-title">
          {MONTHS[view.m]} {view.y}
        </div>
        <button type="button" className="cal-nav" onClick={() => go(1)} aria-label="next month">
          ›
        </button>
      </div>

      <div className="cal-grid cal-dow">
        {WEEKDAYS.map((w) => (
          <div key={w} className="cal-dow-cell">
            {w}
          </div>
        ))}
      </div>

      <div className="cal-grid">
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} className="cal-cell empty" />
          const cellDate = new Date(view.y, view.m, d)
          const isPast = cellDate < today
          const isToday = cellDate.getTime() === today.getTime()
          const val = iso(view.y, view.m, d)
          const isSel = val === value
          return (
            <button
              type="button"
              key={val}
              className={`cal-cell day ${isSel ? 'sel' : ''} ${isToday ? 'today' : ''}`}
              disabled={isPast}
              onClick={() => onChange(val)}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
