import type { RouteRecordRaw } from 'vue-router'

export const AppCrmRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'crm',
    component: () => import('./pages/CrmIndexPage.vue'),
    meta: { title: 'CRM / Воронка' },
  },
]
