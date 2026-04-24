import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Человекочитаемое имя роута — для title и хлебных крошек. */
    title?: string
    /** Требует ли авторизации. Проверяется middleware. Используем с этапа 4. */
    isAuth?: boolean
    /** Роли, которым доступен роут. Пока не используется. */
    roles?: string[]
  }
}

export {}
