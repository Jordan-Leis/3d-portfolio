// CRITICAL: base must match the GitHub Pages subdirectory '/3d-portfolio/'.
// Changing it after first deploy breaks every deployed asset URL.
// Research: 01-RESEARCH.md Topic 1 + Pitfall 1.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  base: '/3d-portfolio/',

  plugins: [
    react(),
    glsl(),
  ],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js is ~600KB minified — isolated so its hash does not
          // invalidate when app code changes. NEVER downloaded on mobile
          // (lazy-loaded via React.lazy gate in plan 02).
          'vendor-three': ['three'],
          'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
          // Framer Motion lives in its own chunk so mobile can download it
          // for panel animations without pulling in Three.js.
          'vendor-framer': ['framer-motion'],
        },
      },
    },
  },
})
