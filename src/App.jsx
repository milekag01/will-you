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
