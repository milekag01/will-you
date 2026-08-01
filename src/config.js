// ────────────────────────────────────────────────────────────────────────────
//  💙  EDIT THIS FILE to personalize everything. No coding needed —
//      just change the text inside the quotes. The right-hand lines on the
//      time / food / vibe options are where your inside jokes go.
// ────────────────────────────────────────────────────────────────────────────

export const config = {
  // Your phone number for the "text me" button (include country code, digits only).
  // Example India: "+919876543210". Leave as "" to just copy the plan to clipboard.
  yourPhone: '+919537464102',

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
    // The sincere beat, right after the panic joke. Set quote to '' to hide both.
    quoteLead: 'okay i wanna admit something…',
    quote: "every time my phone vibrates, i hope it's you.",
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
      { value: '7:00 PM', label: '7:00 PM — early start, no rushing anything ✨' },
      { value: '7:30 PM', label: '7:30 PM — golden hour, easy pace 🌇' },
      { value: '8:00 PM', label: "8:00 PM — dinner o'clock, let's go 🍽️" },
      { value: '8:30 PM', label: '8:30 PM — fashionably late, noted 👀' },
      { value: '9:00 PM', label: '9:00 PM — late-night menace hours 🌜' },
    ],
    button: 'next →',
  },

  // ── Screen 4: the eat/drink part (single-select) ─────────────────────────
  //  This screen is the FORMAT of the date, not the cuisine. "Coffee" and
  //  "Dinner" are different kinds of evening; "dosa vs biryani" is a text
  //  message later. Keeping cuisine out is what stops this screen and the
  //  next one from blurring into each other.
  food: {
    title: 'what sounds good? 😋',
    subtitle: 'the eating-and-drinking part',
    options: [
      { value: 'Coffee', emoji: '☕' },
      { value: 'Dinner', emoji: '🍽️' },
      { value: 'Drinks', emoji: '🍸' },
      { value: 'Dessert', emoji: '🍰' },
      { value: 'Street food', emoji: '🥘' },
      // the graceful opt-out — still a real answer, not a skipped screen
      { value: 'You pick', emoji: '🤷' },
    ],
    button: 'next →',
    emptyButton: 'pick one first',
  },

  // ── Screen 5: the doing part (single-select) ────────────────────────────
  //  Strictly things you DO. Nothing you consume belongs here — that's
  //  screen 4's job.
  vibe: {
    title: 'and what do we do? 🌙',
    subtitle: 'the actually-doing-something part',
    options: [
      { value: 'Walk', emoji: '🌳' },
      { value: 'Bowling', emoji: '🎳' },
      { value: 'Karaoke', emoji: '🎤' },
      { value: 'Escape room', emoji: '🕵️' },
      { value: 'Art evening', emoji: '🎨' },
      // custom: true turns this one into a "type your own" box.
      { value: 'Something else', emoji: '💡', custom: true },
    ],
    // playful one-liners that pop up when a specific vibe is selected
    reactions: {
      Walk: 'soft launch energy. i approve 🌳',
      Bowling: "i'm bad at this and i'm still gonna trash talk 🎳",
      Karaoke: 'oh so you DO wanna watch me embarrass myself 💀 bet.',
      'Escape room': 'locked in a room together. bold opening move 🕵️',
      'Art evening': "cultured. i'll nod like i know what i'm looking at 🎨",
      'Something else': "okay okay, surprise me. i'm listening 👀",
    },
    // placeholder for the "Something else" text box
    customPlaceholder: 'so what do you wanna do? 👀',
    button: 'this one! →',
    emptyButton: 'pick one first',
    emptyCustomButton: 'type it out first',
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
    // No leading slash — it's resolved against the deploy base, so the same
    // build works at a domain root AND at a /repo/ GitHub Pages path.
    src: 'music/song.m4a',
    startMuted: false,
  },
}
