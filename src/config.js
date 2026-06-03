// ────────────────────────────────────────────────────────────────────────────
//  💙  EDIT THIS FILE to personalize everything. No coding needed —
//      just change the text inside the quotes. The right-hand lines on the
//      time / food / vibe options are where your inside jokes go.
// ────────────────────────────────────────────────────────────────────────────

export const config = {
  // Your phone number for the "text me" button (include country code, digits only).
  // Example India: "+919876543210". Leave as "" to just copy the plan to clipboard.
  yourPhone: '',

  // Optional little signature on the final screen.
  yourName: 'me',

  // ── Screen 1: the big question ──────────────────────────────────────────
  intro: {
    sticker: '🫶',
    kicker: 'okay, real talk for a sec 👀',
    title: 'Will you go out with me?',
    yes: 'yes, obviously 💙',
    no: 'no',
    // tiny things the "no" button mutters as it runs away (cycles through)
    noDodges: ['nope', 'catch me', 'too slow', 'wrong one', 'you sure? 😏', 'lol no'],
    shyNote: '(the no button is shy. just tap yes 😌)',
  },

  // ── Screen 2: celebration ───────────────────────────────────────────────
  celebrate: {
    sticker: '🥹',
    title: 'WAIT… REALLY?? 🎉',
    subtitle: 'be cool be cool be cool',
    button: "let's plan it →",
  },

  // ── Screen 3: when ──────────────────────────────────────────────────────
  when: {
    sticker: '🗓️',
    title: 'when works for you?',
    dayLabel: 'Pick a day ✨',
    timeLabel: 'And a time? 🕯️',
    placeholder: 'pick a time…',
    // value = what gets saved; label = the cute line she sees in the dropdown
    times: [
      { value: '5:30 PM', label: '5:30 PM — chai + sunset type beat ☕' },
      { value: '6:30 PM', label: '6:30 PM — responsible-adult hours, respect' },
      { value: '7:30 PM', label: '7:30 PM — peak dinner, peak vibes' },
      { value: '8:30 PM', label: '8:30 PM — fashionably late, noted 👀' },
      { value: '9:30 PM', label: '9:30 PM — late-night menace hours 🌙' },
    ],
    button: 'next →',
  },

  // ── Screen 4: food (multi-select) ───────────────────────────────────────
  food: {
    title: 'what are we eating? 😋',
    subtitle: '(pick as many as you want, no judgement)',
    options: [
      { value: 'Dosa', emoji: '🫓' },
      { value: 'Biryani', emoji: '🍛' },
      { value: 'North Indian', emoji: '🧈' },
      { value: 'Chaat / street food', emoji: '🥘' },
      { value: 'Pan-Asian', emoji: '🍜' },
      { value: 'Pizza', emoji: '🍕' },
    ],
    button: 'this one! →',
    emptyButton: 'pick at least one',
  },

  // ── Screen 5: vibe / activity (single-select) ───────────────────────────
  vibe: {
    title: 'and the vibe? 🌙',
    subtitle: 'what should we actually do',
    options: [
      { value: 'Cubbon Park walk', emoji: '🌳' },
      { value: 'Brewery hop', emoji: '🍺' },
      { value: 'Wine night', emoji: '🍷' },
      { value: 'Dancing', emoji: '💃' },
      { value: 'A long talk', emoji: '🗣️' },
      { value: 'Long drive', emoji: '🚗' },
    ],
    // playful one-liners that pop up when a specific vibe is selected
    reactions: {
      Dancing: 'oh so you DO wanna watch me embarrass myself 💀 bet.',
      'Brewery hop': 'a woman of culture. Toit it is 🍺',
      'Long drive': 'Nandi Hills at 5am? unhinged. i love it 🚗',
      'Wine night': 'okay okay, fancy. i can do fancy 🍷',
      'Cubbon Park walk': 'soft launch energy. i approve 🌳',
      'A long talk': 'careful, i actually will talk for 4 hours 🗣️',
    },
    button: 'this one! →',
    emptyButton: 'pick one first',
  },

  // ── Screen 6: the recap ─────────────────────────────────────────────────
  recap: {
    sticker: '💙',
    title: "okay, it's official 💙",
    // {time} is swapped for the chosen time.
    blurb: "{time} it is. real talk — i'm nervous as hell rn. (the good kind.) 💙",
    ps: 'p.s. i typed and deleted a normal text like ten times. this felt a little easier. somehow.',
    button: 'copy plan & text me',
    copied: 'copied! 💙 now text me ↑',
  },

  // ── Background music ────────────────────────────────────────────────────
  // Drop your track at  public/music/song.mp3  (or change the path).
  // Mobile blocks autoplay, so it starts on the first tap. There's a mute button.
  music: {
    src: '/music/song.mp3',
    startMuted: false,
  },
}
