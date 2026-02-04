import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ Tailwind CSS Plugin added
  ],
  server: {
    port: 5173,       // ✅ Force Frontend to run on Port 5173
    strictPort: true, // ✅ If 5173 is busy, it will ERROR (not switch to 5174)
  }
})