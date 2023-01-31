import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

/*
	https://vitejs.dev/config/server-options.html#server-hmr

	hmr.clientPort is an advanced option that overrides the port only on the client side, 
	allowing you to serve the websocket on a different port than the client code looks for it on.
*/