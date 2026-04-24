import type { RouteRecordRaw } from 'vue-router'

export const AppSupportRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'support',
    component: () => import('./pages/SupportIndexPage.vue'),
    meta: { title: 'Техподдержка' },
  },
]
