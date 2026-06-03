import { useState } from 'react'
import { config } from '../config.js'
import Hearts from '../components/Hearts.jsx'
import Calendar from '../components/Calendar.jsx'
import FancySelect from '../components/FancySelect.jsx'

export default function WhenScreen({ value, onNext }) {
  const c = config.when
  const [date, setDate] = useState(value.date || '')
  const [time, setTime] = useState(value.time || '')

  const ready = date && time

  return (
    <div className="screen">
      <Hearts total={4} current={2} />
      <div className="sticker">{c.sticker}</div>
      <h1>{c.title}</h1>

      <div className="card">
        <div className="field">
          <label>{c.dayLabel}</label>
          <Calendar value={date} onChange={setDate} />
        </div>

        <div className="field">
          <label>{c.timeLabel}</label>
          <FancySelect
            options={c.times}
            value={time}
            placeholder={c.placeholder}
            onChange={setTime}
          />
        </div>
      </div>

      <button className="btn" disabled={!ready} onClick={() => onNext({ date, time })}>
        {c.button}
      </button>
    </div>
  )
}
