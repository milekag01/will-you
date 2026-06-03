import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { config } from '../config.js'
import { saveResponse } from '../db.js'
import { prettyDate } from '../utils.js'

export default function Recap({ data }) {
  const c = config.recap
  const [copied, setCopied] = useState(false)
  const saved = useRef(false)

  const dateStr = prettyDate(data.date)
  const foods = (data.foods || []).join(', ')
  const blurb = c.blurb.replace('{time}', data.time || '')

  // Write the response straight to the DB exactly once.
  useEffect(() => {
    if (saved.current) return
    saved.current = true
    saveResponse({
      answer: 'yes',
      date: data.date,
      time: data.time,
      foods: data.foods,
      vibe: data.vibe,
      user_agent: navigator.userAgent,
    })
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#2f53a8', '#6d90d6', '#b3c6ee', '#20407f', '#ffffff'],
    })
  }, [data])

  const plan = [
    "it's a date 💌",
    `when: ${dateStr} at ${data.time}`,
    `food: ${foods}`,
    `vibe: ${data.vibe}`,
  ].join('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plan)
    } catch (_) {
      /* clipboard blocked — the SMS body below still carries the plan */
    }
    setCopied(true)
    if (config.yourPhone) {
      const body = encodeURIComponent(plan)
      // sms: deep link — opens Messages on phones with the plan pre-filled
      window.location.href = `sms:${config.yourPhone}${smsSep()}body=${body}`
    }
  }

  return (
    <div className="screen">
      <div className="card recap-card">
        <div className="sticker" style={{ alignSelf: 'center' }}>{c.sticker}</div>
        <h1 style={{ textAlign: 'center' }}>{c.title}</h1>
        <p className="recap-blurb">{blurb}</p>
        <p className="recap-ps">{c.ps}</p>

        <div className="recap-rows">
          <div className="recap-row">
            <span className="ico">📅</span>
            <div>
              <div className="k">When</div>
              <div className="v">{dateStr}</div>
              <div style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>at {data.time}</div>
            </div>
          </div>

          <div className="recap-row">
            <span className="ico">🍽️</span>
            <div>
              <div className="k">Food</div>
              <div className="v">{foods}</div>
            </div>
          </div>

          <div className="recap-row">
            <span className="ico">✨</span>
            <div>
              <div className="k">Vibe</div>
              <div className="v">{data.vibe}</div>
            </div>
          </div>
        </div>

        <button className="btn" onClick={handleCopy} style={{ alignSelf: 'center' }}>
          {copied ? c.copied : `📋 ${c.button}`}
        </button>
      </div>
    </div>
  )
}

// iOS wants "sms:NUMBER&body=", Android wants "sms:NUMBER?body=". "&" is the
// safe cross-device separator when a number is present.
function smsSep() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? '&' : '?'
}
