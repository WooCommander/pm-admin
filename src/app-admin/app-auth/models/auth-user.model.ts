/**
 * UI-модель авторизованного пользователя.
 *
 * Сейчас пользуемся в mock-сервисе; когда появится реальный API,
 * в адаптере будет маппинг DTO → этой модели.
 */
export interface AuthUserModel {
  id: string
  email: string
  displayName: string
  token: string
}
