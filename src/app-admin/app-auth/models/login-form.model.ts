/**
 * UI-модель формы логина.
 *
 * На этом этапе держим плоский интерфейс с двумя полями —
 * email и password. По мере роста (капча, OTP, запомнить меня)
 * расширяем, не трогая сервис.
 */
export interface LoginFormModel {
  email: string
  password: string
}

/**
 * Фабрика пустой формы — чтобы не хардкодить дефолты по месту.
 */
export const createEmptyLoginForm = (): LoginFormModel => ({
  email: '',
  password: '',
})
