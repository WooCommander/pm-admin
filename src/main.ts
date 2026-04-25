import './style/index.scss'

import { TirPmButtonStyleVars } from 'tir-pm-button'
import { TirPmInputStyleVars } from 'tir-pm-input'
import { TirPmPlateStyleVars } from 'tir-pm-plate'
import { TirPmStatusBudgeStyleVars } from 'tir-pm-status-budge'
import { createApp } from 'vue'

import App from './App.vue'
import { appAdminService } from './app-admin'
import { router } from './router'

// initStyleVars() из tir-components сюда не подключаем — barrel
// тянет tir-pm-popover с битым реэкспортом типа (см. tir-components.md).
// Поэтому нужные --tir-pm-* CSS-переменные ставим точечно: только под
// те пакеты, которые реально используются в админке. Базовые токены
// (--neutral-*, --accent, --text-*) уже даёт tir-style-system/index.scss.
TirPmInputStyleVars.setVars(new TirPmInputStyleVars())
TirPmButtonStyleVars.setVars(new TirPmButtonStyleVars())
TirPmPlateStyleVars.setVars(new TirPmPlateStyleVars())
TirPmStatusBudgeStyleVars.setVars(new TirPmStatusBudgeStyleVars())

// Поднимаем токен из cookie до маунта — иначе на первой же навигации
// isAuth-middleware кинет уже залогиненного пользователя на /auth/login.
appAdminService.restoreFromCookie()

createApp(App).use(router).mount('#app')
