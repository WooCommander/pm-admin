// Расширение RouteMeta (title/isAuth/roles) — подтягиваем, чтобы типы были видны.
import './routes.types'

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { AppAccountsRoutes } from '@/app-admin/app-accounts'
import { AppAnalyticsRoutes } from '@/app-admin/app-analytics'
import { AppAuthRoutes } from '@/app-admin/app-auth'
import { AppBillingRoutes } from '@/app-admin/app-billing'
import { AppCrmRoutes } from '@/app-admin/app-crm'
import { AppEmployeesRoutes } from '@/app-admin/app-employees'
import { AppMarketingRoutes } from '@/app-admin/app-marketing'
import { AppStatisticsRoutes } from '@/app-admin/app-statistics'
import { AppSupportRoutes } from '@/app-admin/app-support'
import { AuthLayout, MainLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: AuthLayout,
    children: AppAuthRoutes,
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/marketing',
    children: [
      { path: 'marketing',  children: AppMarketingRoutes },
      { path: 'crm',        children: AppCrmRoutes },
      { path: 'accounts',   children: AppAccountsRoutes },
      { path: 'billing',    children: AppBillingRoutes },
      { path: 'statistics', children: AppStatisticsRoutes },
      { path: 'support',    children: AppSupportRoutes },
      { path: 'employees',  children: AppEmployeesRoutes },
      { path: 'analytics',  children: AppAnalyticsRoutes },
    ],
  },
  {
    // Любой неизвестный путь — на корень (дальше сам отредиректит на /marketing).
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
