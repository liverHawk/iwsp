import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  // whsp-home の /iwsp 配下で配信する
  base: '/iwsp/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/iwsp/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/iwsp/, '')
      }
    }
  }
})
