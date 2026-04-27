import './style/index.scss'

import { TirPmButtonStyleVars } from 'tir-pm-button'
import { TirPmDrawerVars } from 'tir-pm-drawer'
import { TirPmDropdownStyleVars } from 'tir-pm-dropdown'
import { TirPmIconViewStyleVars } from 'tir-pm-icon-view'
import { TirPmInputStyleVars } from 'tir-pm-input'
import { TirPmPaginationStyleVars } from 'tir-pm-pagination'
import { TirPmPlateStyleVars } from 'tir-pm-plate'
import { TirPmSelectStyleVars } from 'tir-pm-select'
import { TirPmStatusBudgeStyleVars } from 'tir-pm-status-budge'
import { TirPmSystemMessageStyleVars } from 'tir-pm-system-message'
import { TirPmTableStyleVars } from 'tir-pm-table'
import { TirPmTabsStyleVars } from 'tir-pm-tabs'
import { TirPmTooltipElementStyleVars } from 'tir-pm-tooltip-element'
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
TirPmDrawerVars.setVars(new TirPmDrawerVars())
TirPmDropdownStyleVars.setVars(new TirPmDropdownStyleVars())
TirPmIconViewStyleVars.setVars(new TirPmIconViewStyleVars())
TirPmPaginationStyleVars.setVars(new TirPmPaginationStyleVars())
TirPmPlateStyleVars.setVars(new TirPmPlateStyleVars())
TirPmSelectStyleVars.setVars(new TirPmSelectStyleVars())
TirPmStatusBudgeStyleVars.setVars(new TirPmStatusBudgeStyleVars())
TirPmSystemMessageStyleVars.setVars(new TirPmSystemMessageStyleVars())
TirPmTableStyleVars.setVars(new TirPmTableStyleVars())
TirPmTabsStyleVars.setVars(new TirPmTabsStyleVars())
TirPmTooltipElementStyleVars.setVars(new TirPmTooltipElementStyleVars())

appAdminService.restoreFromCookie()
createApp(App).use(router).mount('#app')
