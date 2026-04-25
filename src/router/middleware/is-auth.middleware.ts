import type { Router } from 'vue-router'

import { appAdminService } from '@/app-admin'

/**
 * Гард для защищённых веток.
 *
 * - Проверяет `meta.isAuth` по всей цепочке `to.matched` — чтобы родительский
 *   layout-роут мог пометить ветку защищённой одним полем.
 * - Незалогиненного с `isAuth`-ветки уводит на `auth-login`, передавая
 *   исходный `fullPath` через `query.from` — потом LoginPage по нему вернёт.
 * - Залогиненного, который пытается зайти на `/auth/*`, кидает на корень.
 */
export const installIsAuthMiddleware = (router: Router): void => {
  router.beforeEach((to) => {
    const requiresAuth = to.matched.some((record) => record.meta?.isAuth)

    if (requiresAuth && !appAdminService.state.isAuthenticated) {
      return { name: 'auth-login', query: { from: to.fullPath } }
    }

    if (to.path.startsWith('/auth') && appAdminService.state.isAuthenticated) {
      return '/'
    }

    return true
  })
}
