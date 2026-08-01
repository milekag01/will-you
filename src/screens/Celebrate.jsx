import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { config } from '../config.js'
import Hearts from '../components/Hearts.jsx'

export default function Celebrate({ onNext }) {
  const c = config.celebrate

  useEffect(() => {
    const colors = ['#2f53a8', '#6d90d6', '#b3c6ee', '#20407f', '#ffffff']
    const burst = (originX) =>
      confetti({
        particleCount: 70,
        spread: 75,
        startVelocity: 45,
        origin: { x: originX, y: 0.6 },
        colors,
        scalar: 0.9,
      })
    burst(0.5)
    const t1 = setTimeout(() => burst(0.2), 220)
    const t2 = setTimeout(() => burst(0.8), 380)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="screen">
      <Hearts total={4} current={1} />
      <div className="sticker">{c.sticker}</div>
      <h1>{c.title}</h1>
      <p className="subtitle">{c.subtitle}</p>
      {c.quote && (
        <div className="confession">
          {c.quoteLead && <p className="confession-lead">{c.quoteLead}</p>}
          <p className="quote">{c.quote}</p>
        </div>
      )}
      <button className="btn" onClick={onNext} style={{ marginTop: 8 }}>
        {c.button}
      </button>
    </div>
  )
}
