import type { RouteRecordRaw } from 'vue-router'

export const AppAccountsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'accounts',
    component: () => import('./pages/AccountsIndexPage.vue'),
    meta: { title: 'Управление аккаунтами' },
  },
]
