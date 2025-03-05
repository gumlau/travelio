import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { inject } from '@vercel/analytics'
import analytics from './plugins/analytics'

// Initialize Vercel Analytics
inject()

const app = createApp(App)
app.use(router)
app.use(analytics)
app.mount('#app')
