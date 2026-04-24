import type { RouteRecordRaw } from 'vue-router'

export const AppEmployeesRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'employees',
    component: () => import('./pages/EmployeesIndexPage.vue'),
    meta: { title: 'Сотрудники' },
  },
]
