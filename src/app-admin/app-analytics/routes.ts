import type { RouteRecordRaw } from 'vue-router'

export const AppAnalyticsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'analytics',
    component: () => import('./pages/AnalyticsIndexPage.vue'),
    meta: { title: 'Аналитика' },
  },
]
