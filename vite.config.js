import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    build: {
        // optional, if you're customizing outDir or similar
        outDir: 'dist',
    },
    // 👇 This is only for local preview testing. Most important is your hosting config (see below)
    preview: {
        // This ensures that deep links fallback to index.html
        headers: {
            'Cache-Control': 'no-cache'
        },
        open: true
    }
})
