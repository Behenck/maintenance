import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'intranet.santacasa.com.br',
    port: 3332,
  },
  plugins: [react()],
})
