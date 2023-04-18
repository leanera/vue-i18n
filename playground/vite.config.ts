import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

const currentDir = new URL('.', import.meta.url).pathname

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(currentDir, 'src')}/`,
      '@leanera/vue-i18n': resolve(currentDir, '../src/index.ts'),
    },
  },

  plugins: [Vue()],

  optimizeDeps: {
    exclude: [
      '@leanera/vue-i18n',
    ],
  },
})
