import type { RouteRecordRaw } from 'vue-router'

export const AppBillingRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'billing',
    component: () => import('./pages/BillingIndexPage.vue'),
    meta: { title: 'Биллинг' },
  },
]
