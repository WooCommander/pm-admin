import type { AuthUserModel, LoginFormModel } from '../models'

/**
 * Результат попытки логина.
 *
 * Используем discriminated union вместо throw — так контракт явный
 * и легче разруливается во вью-слое без try/catch.
 */
export type LoginResult =
  | { kind: 'success'; user: AuthUserModel }
  | { kind: 'error'; message: string }

const MOCK_LATENCY_MS = 600
const VALID_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Mock-реализация авторизации.
 *
 * На этапе 3 бекенда ещё нет — симулируем сеть с задержкой.
 * Когда появится реальный API, этот же класс получит адаптер
 * в `app-auth/adapters/` и перестанет быть mock-ом, интерфейс наружу
 * не поменяется.
 */
export class AuthService {
  /** Тестовые учётки для проверки формы. */
  private readonly knownAccounts: Array<{
    email: string
    password: string
    displayName: string
  }> = [
    {
      email: 'admin@tirscript.com',
      password: 'admin',
      displayName: 'Админ Админов',
    },
    {
      email: 'sergey@tirscript.com',
      password: 'qwerty',
      displayName: 'Сергей',
    },
  ]

  async login(form: LoginFormModel): Promise<LoginResult> {
    await delay(MOCK_LATENCY_MS)

    if (!VALID_EMAIL_RE.test(form.email.trim())) {
      return { kind: 'error', message: 'Некорректный e-mail' }
    }
    if (form.password.length < 3) {
      return {
        kind: 'error',
        message: 'Пароль должен быть не короче 3 символов',
      }
    }

    const match = this.knownAccounts.find(
      (acc) =>
        acc.email.toLowerCase() === form.email.trim().toLowerCase() &&
        acc.password === form.password,
    )
    if (!match) {
      return { kind: 'error', message: 'Неверный e-mail или пароль' }
    }

    return {
      kind: 'success',
      user: {
        id: match.email,
        email: match.email,
        displayName: match.displayName,
        token: `mock-token-${Date.now()}`,
      },
    }
  }
}

/** Единственный инстанс — удобно держать в модуле. */
export const authService = new AuthService()

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
