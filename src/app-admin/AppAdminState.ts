import { reactive } from 'vue'

import type { AuthUserModel } from './app-auth/models'

/**
 * Глобальный стейт админки.
 *
 * По задумке (см. паттерн `AppWikiState` из wiki-section 2026) сюда
 * доводятся стейты доменных модулей: AppAdminState агрегирует, в нём
 * нет бизнес-логики — только данные. Менять стейт извне разрешено
 * только через {@link AppAdminService}, чтобы все мутации шли в одном
 * месте.
 *
 * На этапе 4 живёт минимально: текущий пользователь + токен. Когда
 * подъедут модули с собственными стейтами (`AppEmployeesState` и т.п.),
 * они станут полями этого класса.
 */
export class AppAdminState {
  /**
   * Внутренний реактивный объект.
   * Снаружи трогать только через геттеры/сеттеры — `private` от случайных
   * мутаций из шаблонов и сторонних мест.
   */
  private readonly data = reactive<{
    currentUser: AuthUserModel | null
    token: string | null
  }>({
    currentUser: null,
    token: null,
  })

  get currentUser(): AuthUserModel | null {
    return this.data.currentUser
  }

  get token(): string | null {
    return this.data.token
  }

  /** Точка истины для middleware и UI: считается ли пользователь залогиненным. */
  get isAuthenticated(): boolean {
    return Boolean(this.data.token)
  }

  /** Полное обновление сессии — пользуется только AppAdminService. */
  setSession(user: AuthUserModel | null, token: string | null): void {
    this.data.currentUser = user
    this.data.token = token
  }

  /**
   * Только токен — когда сессию восстанавливаем из cookie и профиля
   * пользователя пока нет (бэк не отвечает / нет API `/me`).
   */
  setToken(token: string | null): void {
    this.data.token = token
  }
}
