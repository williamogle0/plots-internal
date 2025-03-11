import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Ensure process.env is handled correctly
    global: {},
  },
  optimizeDeps: {
    include: ['@aws-amplify/auth'],
  },
})
