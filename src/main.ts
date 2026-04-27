import './style/index.scss'

import { TirPmButtonStyleVars } from 'tir-pm-button'
import { TirPmDropdownStyleVars } from 'tir-pm-dropdown'
import { TirPmIconViewStyleVars } from 'tir-pm-icon-view'
import { TirPmInputStyleVars } from 'tir-pm-input'
import { TirPmPaginationStyleVars } from 'tir-pm-pagination'
import { TirPmPlateStyleVars } from 'tir-pm-plate'
import { TirPmSelectStyleVars } from 'tir-pm-select'
import { TirPmStatusBudgeStyleVars } from 'tir-pm-status-budge'
import { TirPmTableStyleVars } from 'tir-pm-table'
import { createApp } from 'vue'

import App from './App.vue'
import { appAdminService } from './app-admin'
import { router } from './router'

// initStyleVars() из tir-components сюда не подключаем:
// barrel тянет tir-pm-popover с битым реэкспортом типа.
// Поэтому подключаем только style vars для реально используемых
// и безопасных компонентов.
TirPmInputStyleVars.setVars(new TirPmInputStyleVars())
TirPmButtonStyleVars.setVars(new TirPmButtonStyleVars())
TirPmDropdownStyleVars.setVars(new TirPmDropdownStyleVars())
TirPmSelectStyleVars.setVars(new TirPmSelectStyleVars())
TirPmTableStyleVars.setVars(new TirPmTableStyleVars())
TirPmPaginationStyleVars.setVars(new TirPmPaginationStyleVars())
TirPmIconViewStyleVars.setVars(new TirPmIconViewStyleVars())
TirPmPlateStyleVars.setVars(new TirPmPlateStyleVars())
TirPmStatusBudgeStyleVars.setVars(new TirPmStatusBudgeStyleVars())

appAdminService.restoreFromCookie()

createApp(App).use(router).mount('#app')
