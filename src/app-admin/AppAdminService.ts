import Cookies from 'js-cookie'

import type { LoginFormModel } from './app-auth/models'
import { authService, type LoginResult } from './app-auth/services'
import { AppAdminState } from './AppAdminState'

const TOKEN_COOKIE = 'pm-admin.token'
const TOKEN_TTL_DAYS = 7
const COOKIE_OPTS: Cookies.CookieAttributes = {
  expires: TOKEN_TTL_DAYS,
  sameSite: 'lax',
  path: '/',
}

/**
 * Глобальный сервис админки.
 *
 * Хранит ссылку на {@link AppAdminState} и инкапсулирует все операции
 * над сессией: логин, логаут, восстановление из cookie. Доменные сервисы
 * (например, `authService`) вызываются только отсюда — так стейт
 * обновляется в одной точке, без рассинхрона.
 *
 * Пока экспортируется как singleton — так удобнее использовать в
 * middleware и в формах. Когда понадобится передавать его как
 * `globalService` в дочерние компоненты (как в wiki-section), переедем
 * на provide/inject без смены API класса.
 */
export class AppAdminService {
  readonly state = new AppAdminState()

  /**
   * Подтягивает токен из cookie. Зовётся один раз на старте, до маунта
   * приложения — чтобы middleware на первой же навигации видел реальный
   * `isAuthenticated`. Профиль пользователя без бэка не восстановить —
   * подъедет, когда появится `GET /me`.
   */
  restoreFromCookie(): void {
    const saved = Cookies.get(TOKEN_COOKIE)
    if (saved) {
      this.state.setToken(saved)
    }
  }

  async login(form: LoginFormModel): Promise<LoginResult> {
    const result = await authService.login(form)
    if (result.kind === 'success') {
      this.state.setSession(result.user, result.user.token)
      Cookies.set(TOKEN_COOKIE, result.user.token, COOKIE_OPTS)
    }
    return result
  }

  logout(): void {
    this.state.setSession(null, null)
    Cookies.remove(TOKEN_COOKIE, { path: '/' })
  }
}

/** Singleton на всё приложение. */
export const appAdminService = new AppAdminService()
