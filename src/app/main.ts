import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './providers/router'
import App from './App.vue'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/shared/api/query-client'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
