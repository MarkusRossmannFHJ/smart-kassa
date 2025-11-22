// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,          
<<<<<<< HEAD
    environment: 'jsdom',  
=======
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
>>>>>>> frontend
  },
})
