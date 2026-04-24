import type { RouteRecordRaw } from 'vue-router'

export const AppAuthRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'auth-login' },
  },
  {
    path: 'login',
    name: 'auth-login',
    component: () => import('./pages/LoginPage.vue'),
    meta: { title: 'Вход' },
  },
]
