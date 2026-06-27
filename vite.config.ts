import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/react-syntax-highlighter')) {
            return 'vendor-syntax'
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            return 'vendor-react'
          }
          if (
            id.includes('node_modules/@radix-ui') ||
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/class-variance-authority') ||
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'vendor-ui'
          }
          // Course content chunks
          if (id.includes('/src/content/courses/cs-fundamentals/')) {
            return 'course-cs-fundamentals'
          }
          if (id.includes('/src/content/courses/js-ts-fundamental/')) {
            return 'course-js-ts-fundamental'
          }
          if (id.includes('/src/content/courses/js-ts-intermediate/')) {
            return 'course-js-ts-intermediate'
          }
        },
      },
    },
  },
})
