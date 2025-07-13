// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // your React dev port
    proxy: {
      // proxy REST API calls to your backend
      '/api': {
        target: 'http://localhost:3000',   // your Express server
        changeOrigin: true,
        secure: false,                     // if you ever use self-signed certs
        // rewrite: path => path.replace(/^\/api/, '') // optional
      },
      // proxy WebSocket upgrade requests
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
});
