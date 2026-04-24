# pm-admin

Админка по управлению продуктом. Модульный монолит на Vue 3 + Vite + TypeScript.
Библиотека UI — `tir-components` из verdaccio.

> Статус: **этап 1 — фундамент собран**. Есть `package.json`, Vite, TS-strict, eslint, prettier, минимальный `App.vue`. Логика модулей — дальше.

## Запуск

```bash
npm install
npm run dev
```

Должен открыться экран «pm-admin. Этап 1 фундамента собран.» на `http://localhost:5173`.

> `tir-components`, `tir-style-system` и `tir-pm-*` ставятся из внутреннего verdaccio.
> Реестр прописан в [`.npmrc`](./.npmrc). Убедитесь, что у вас есть доступ.

## Модули

| Модуль | Папка | Назначение |
|---|---|---|
| Авторизация | `src/app-admin/app-auth` | Логин, восстановление, инвайт |
| Сотрудники | `src/app-admin/app-employees` | Список, роли, приглашения |
| Маркетинг | `src/app-admin/app-marketing` | Кампании, рассылки, баннеры |
| Биллинг | `src/app-admin/app-billing` | Тарифы, счета, платежи |
| Статистика | `src/app-admin/app-statistics` | Бизнес-метрики, дашборды |
| Аналитика | `src/app-admin/app-analytics` | Поведение пользователей, сегменты |
| Аккаунты клиентов | `src/app-admin/app-accounts` | Клиенты, настройки, доступы |
| CRM / Воронка | `src/app-admin/app-crm` | Лиды, сделки, канбан |
| Техподдержка | `src/app-admin/app-support` | Тикеты, переписка |

## Архитектура

Подход такой же, как в `wiki-section` 2026: один репозиторий, внутри него домены
`app-<name>`, каждый домен самодостаточен. Межмодульная коммуникация — только через
родительский `AppAdminService`/`AppAdminState`.

```
src/
├── api/                 ← автогенерируемый клиент (data-source-builder)
├── app-admin/           ← корневой домен
│   ├── AppAdmin.vue
│   ├── AppAdminState.ts
│   ├── AppAdminService.ts
│   ├── app-auth/
│   ├── app-employees/
│   ├── app-marketing/
│   ├── app-billing/
│   ├── app-statistics/
│   ├── app-analytics/
│   ├── app-accounts/
│   ├── app-crm/
│   └── app-support/
├── layouts/             ← AuthLayout, MainLayout
├── router/              ← vue-router + middleware
├── shared/              ← общие модели, утилиты, константы, адаптеры
├── widgets/             ← автономные виджеты
├── style/
├── App.vue
└── main.ts
```

### Анатомия модуля

Каждый `app-<name>/` внутри устроен одинаково:

```
app-<name>/
├── models/              ← UI-модели (не DTO)
├── adapters/            ← DTO ↔ UI
├── services/            ← *.Service.ts (вызовы API, бизнес-логика)
├── components/          ← глупые компоненты
├── pages/               ← страницы роутера
├── routes.ts            ← набор RouteRecordRaw этого модуля
├── App<Name>State.ts    ← локальный стейт модуля (входит в глобальный)
├── App<Name>Service.ts  ← локальный сервис (НЕ входит в глобальный стейт)
├── App<Name>.vue        ← оболочка модуля
└── index.ts             ← barrel
```

## План этапов

1. **Фундамент.** `package.json`, Vite, TS-strict, eslint, `tir-components` из verdaccio. `npm run dev` показывает «Hello Admin». ✅
2. **Каркас оболочки.** `App.vue`, `MainLayout` (sidebar + header на tir-components), `AuthLayout`, корневой роутер, сборка `routes.ts` из модулей.
3. **Модуль `app-auth`.** Логин/восстановление/инвайт по фигме, пока mock-сервис.
4. **Глобальный стейт.** `AppAdminState`, `AppAdminService`, `currentUser`, middleware `isAuth`/`roles`.
5. **API-слой.** `data-source-builder`, `apiConfig.json`, первый живой вызов `Auth.login`, схема адаптеров.
6. **Модуль `app-employees`** — первый «настоящий» модуль, обкатываем шаблон.
7. **Модуль `app-accounts`** — закрепляем шаблон.
8. **Модуль `app-crm`** — канбан/воронка, подсвечивает слабые места дизайн-системы.
9. **Модуль `app-support`** — тикеты, чат.
10. **Модуль `app-marketing`**.
11. **Модуль `app-statistics`** — графики, виджеты.
12. **Полировка.** Роли, лоадеры, пустые состояния, уведомления.

## Ссылки

- Методология — см. [`CLAUDE.md`](./CLAUDE.md)
- Документация по модулям — папка [`docs/`](./docs)
