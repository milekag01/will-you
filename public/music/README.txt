Drop your background track here as:  song.mp3

So the file lives at:  public/music/song.mp3
And the app loads:     music/song.mp3   (set in src/config.js -> music.src)

The path is deliberately relative (no leading slash) so the same build works
both at a custom domain root and at a /repo/ GitHub Pages path.

Notes:
- mp3 is the most universally supported format for mobile browsers.
- Keep it small-ish (a 2-4 min loop, < 4 MB) so the page loads fast on phones.
- It starts on the first tap (mobile blocks autoplay) and has a mute button.
- If the file is missing, the mute button hides itself instead of pretending
  to play. If you never see the 🎵 button, the track didn't load.
- Want a different filename? Change `music.src` in src/config.js.
- Remember to re-run `npm run deploy` after adding the file.
