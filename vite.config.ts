import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/SX102/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
})
