// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import blue from '@/plugins/blue.js'
import './styles/blue.scss'

import '@blibli/blue-dls-utils/dist/scss/_box-sizing-helper.scss'

// Logic untuk menentukan apakah load mock
const shouldLoadMock = import.meta.env.VITE_MOCK_ENV === 'true'

const initializeApplication = async () => {
    // Di main.js, ubah bagian import mock:
    if (shouldLoadMock) {
        try {
            const mockModule = await import('@mocks')
        } catch (error) {
            console.warn('Failed to load mock API:', error)
            console.warn('Error stack:', error.stack)
        }
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