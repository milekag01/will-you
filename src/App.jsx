import { useState } from 'react'
import BackgroundHearts from './components/BackgroundHearts.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import Intro from './screens/Intro.jsx'
import Celebrate from './screens/Celebrate.jsx'
import WhenScreen from './screens/WhenScreen.jsx'
import FoodScreen from './screens/FoodScreen.jsx'
import VibeScreen from './screens/VibeScreen.jsx'
import Recap from './screens/Recap.jsx'

const STEPS = ['intro', 'celebrate', 'when', 'food', 'vibe', 'recap']

// Where "back" goes from each screen. Anything not listed has no back button:
// intro/celebrate are before any choices, and recap has already been saved.
// Answers live in `data`, so every screen repopulates when she returns.
const BACK_TO = { when: 'celebrate', food: 'when', vibe: 'food' }

export default function App() {
  const [step, setStep] = useState('intro')
  const [data, setData] = useState({
    date: '',
    time: '',
    foods: [],
    vibe: '',
  })

  const go = (next) => setStep(next)
  const merge = (patch, next) => {
    setData((d) => ({ ...d, ...patch }))
    go(next)
  }

  return (
    <div className="app">
      <BackgroundHearts />
      <MusicToggle />

      {BACK_TO[step] && (
        <button
          className="back-btn"
          onClick={() => go(BACK_TO[step])}
          aria-label="go back"
          title="go back"
        >
          ←
        </button>
      )}

      {step === 'intro' && <Intro onYes={() => go('celebrate')} />}
      {step === 'celebrate' && <Celebrate onNext={() => go('when')} />}
      {step === 'when' && (
        <WhenScreen value={data} onNext={(p) => merge(p, 'food')} />
      )}
      {step === 'food' && (
        <FoodScreen value={data} onNext={(p) => merge(p, 'vibe')} />
      )}
      {step === 'vibe' && (
        <VibeScreen value={data} onNext={(p) => merge(p, 'recap')} />
      )}
      {step === 'recap' && <Recap data={data} />}
    </div>
  )
}
