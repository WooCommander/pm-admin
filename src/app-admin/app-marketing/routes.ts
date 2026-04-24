import type { RouteRecordRaw } from 'vue-router'

export const AppMarketingRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'marketing',
    component: () => import('./pages/MarketingIndexPage.vue'),
    meta: { title: 'Маркетинг' },
  },
]
