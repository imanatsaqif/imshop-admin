import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '')
  
  console.log('=== VITE CONFIG DEBUG ===')
  console.log('Mode:', mode)
  console.log('All env variables:', Object.keys(env).filter(k => k.includes('MOCK')))
  console.log('VITE_MOCK_ENV value:', env.VITE_MOCK_ENV)
  console.log('VITE_MOCK_ENV type:', typeof env.VITE_MOCK_ENV)
  console.log('isMockEnabled:', env.VITE_MOCK_ENV === 'true')
  console.log('=======================')
  
  const isMockEnabled = env.VITE_MOCK_ENV === 'true'
  console.log('- isMockEnabled:', isMockEnabled)
  
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // Gunakan VITE_MOCK_ENV sebagai kontrol
        '@mocks': isMockEnabled
          ? resolve('src/mocks')
          : resolve('src/empty')
      },
    },
  }
})