/// <reference types="vitest" />
// Separate vitest config — does NOT include vite-plugin-glsl because the glsl
// plugin causes silent worker failures in vitest's jsdom environment.
// The build (vite build) still uses vite.config.ts with glsl enabled.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
