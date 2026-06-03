// Progress indicator: `total` hearts, the first `current` of them lit.
export default function Hearts({ total = 4, current = 0 }) {
  return (
    <div className="hearts" aria-label={`step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && <span className={`bar ${i < current ? 'on' : ''}`} />}
          <span className={`h ${i < current ? 'on' : ''}`} aria-hidden="true">
            ♥
          </span>
        </span>
      ))}
    </div>
  )
}
