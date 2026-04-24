import './style/index.scss'

import { initStyleVars } from 'tir-components'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'

// Регистрируем CSS-переменные всех tir-pm-* компонентов в :root.
initStyleVars()

createApp(App).use(router).mount('#app')
