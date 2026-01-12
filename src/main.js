// src/main.js
console.log('=== MAIN.JS START ===')
console.log('import.meta.env.VITE_MOCK_ENV:', import.meta.env.VITE_MOCK_ENV)
console.log('import.meta.env:', JSON.stringify(import.meta.env, null, 2))
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import blue from '@/plugins/blue.js'
import './styles/blue.scss'

import '@blibli/blue-dls-utils/dist/scss/_box-sizing-helper.scss'

// Debug info - hanya di development
if (import.meta.env.DEV) {
    console.log('Environment Status:')
    console.log('- Mode:', import.meta.env.MODE)
    console.log('- VITE_MOCK_ENV:', import.meta.env.VITE_MOCK_ENV)
    console.log('- Is Development:', import.meta.env.DEV)
}

// Logic untuk menentukan apakah load mock
const shouldLoadMock = import.meta.env.VITE_MOCK_ENV === 'true'

const initializeApplication = async () => {
    // Di main.js, ubah bagian import mock:
    if (shouldLoadMock) {
        try {
            console.log('Attempting to load mock...')
            const mockModule = await import('@mocks')
            console.log('Mock module loaded:', mockModule)
            if (import.meta.env.DEV) {
                console.log('Mock API loaded successfully')
            }
        } catch (error) {
            console.warn('Failed to load mock API:', error)
            console.warn('Error stack:', error.stack)
        }
    } else if (import.meta.env.DEV) {
        console.log('Using real API backend')
    }

    // Create and mount app
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(blue)
    app.mount('#app')
}

// Start application
initializeApplication().catch((error) => {
    console.error('Application failed to initialize:', error)
})