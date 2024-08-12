import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/server_api':{
        target:'https://real-state-app-server.onrender.com',
        secure:false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server_api/, ''),
      },
    },
  },
  plugins: [react()],
})
