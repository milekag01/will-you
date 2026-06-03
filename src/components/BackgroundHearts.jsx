// Soft hearts drifting up behind everything. Pure decoration.
const HEARTS = [
  { left: '8%', delay: '0s', dur: '14s', size: '1.2rem' },
  { left: '20%', delay: '4s', dur: '18s', size: '1.6rem' },
  { left: '35%', delay: '2s', dur: '12s', size: '1rem' },
  { left: '52%', delay: '6s', dur: '16s', size: '1.8rem' },
  { left: '66%', delay: '1s', dur: '15s', size: '1.3rem' },
  { left: '78%', delay: '5s', dur: '19s', size: '1.5rem' },
  { left: '90%', delay: '3s', dur: '13s', size: '1.1rem' },
]

export default function BackgroundHearts() {
  return (
    <div className="bg-hearts" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          style={{
            left: h.left,
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.dur,
          }}
        >
          {['💙', '🤍', '✨'][i % 3]}
        </span>
      ))}
    </div>
  )
}
