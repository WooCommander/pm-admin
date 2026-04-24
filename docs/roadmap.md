# Roadmap

Этот файл — живой журнал этапов. После каждого шага — отметка и короткие заметки
(что сделано, что отложено, что вылезло).

## Статус этапов

- [x] 0. Каркас папок + README + CLAUDE.md.
- [x] **1. Фундамент: `package.json`, Vite, TS-strict, eslint, `tir-components`.** — текущее состояние.
- [ ] 2. Каркас оболочки: `App.vue`, `MainLayout`, `AuthLayout`, роутер.
- [ ] 3. Модуль `app-auth` (логин/восстановление/инвайт), mock-сервис.
- [ ] 4. Глобальный стейт, `AppAdminService`, middleware `isAuth`/`roles`.
- [ ] 5. API-слой: `data-source-builder`, `apiConfig.json`, живой `Auth.login`.
- [ ] 6. Модуль `app-employees`.
- [ ] 7. Модуль `app-accounts`.
- [ ] 8. Модуль `app-crm` (воронка/канбан).
- [ ] 9. Модуль `app-support`.
- [ ] 10. Модуль `app-marketing`.
- [ ] 11. Модуль `app-statistics`.
- [ ] 12. Полировка: роли, лоадеры, пустые состояния, уведомления.

## Заметки по этапам

### Этап 0 (готово)
Создан чистый каркас папок под все модули, barrel-заглушки (`index.ts`), `README.md`, `CLAUDE.md`, `.gitignore`.

### Этап 1 (готово)
- Добавлены модули `app-billing` и `app-analytics` по итогам сверки с фигмой (пункты сайдбара 1-4213).
- `package.json` с зависимостями (Vue 3.5, vue-router 4.5, `tir-components`, `tir-style-system`, `tir-pm-toolkit`).
- Vite (`vite.config.ts`) с алиасом `@ → src`.
- TS-strict: `tsconfig.json` + `tsconfig.app.json` + `tsconfig.node.json` (через `@vue/tsconfig`).
- ESLint flat config по стилю `wiki-section` 2026 (+ `simple-import-sort`, Prettier-совместимо).
- `.npmrc` с verdaccio.
- Минимальный `src/App.vue` + `src/main.ts` + `src/style/index.scss`.
- `env.d.ts` с типами `*.vue`.

Что проверить первым делом:
- `npm install` проходит (есть доступ к verdaccio).
- `npm run dev` показывает заглушку «pm-admin. Этап 1 фундамента собран.»
- `npm run build` проходит.

### Этап 2 (следующий)
- Подключить `tir-style-system` глобально в `src/style/index.scss`.
- Сделать `layouts/AuthLayout.vue` (под логин) и `layouts/MainLayout.vue` (header 56px + sidemenu 224px + content) по макету `1-4213`.
- Корневой `router/index.ts`, собирающий пустые `routes.ts` из каждого `app-<name>`.
- Пока контент модулей — заглушки «В разработке».
- Должно открываться `/login` (пусто) и `/` (MainLayout с пустым контентом).
