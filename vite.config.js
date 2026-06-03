import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static, frontend-only build. Outputs to /dist — deploy that folder anywhere.
// base: './' makes asset paths relative, so the same build works both at a
// GitHub Pages project path (/repo/) AND at a custom domain root (willyou.milekway.in).
export default defineConfig({
  base: './',
  plugins: [react()],
})
