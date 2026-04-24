import type { RouteRecordRaw } from 'vue-router'

export const AppStatisticsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'statistics',
    component: () => import('./pages/StatisticsIndexPage.vue'),
    meta: { title: 'Статистика' },
  },
]
