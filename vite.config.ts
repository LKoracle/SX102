

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/SX102/',  // <--- 关键！一定要加上这一行，且前后都有斜杠
})