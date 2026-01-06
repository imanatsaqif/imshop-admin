// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import blue from '@/plugins/blue.js'
import './styles/blue.scss'

import '@blibli/blue-dls-utils/dist/scss/_box-sizing-helper.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(blue)
app.mount('#app')