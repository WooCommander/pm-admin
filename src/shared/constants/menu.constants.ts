/**
 * Сайдбар админки. Порядок и группы — 1-в-1 по макету Figma (node 1-4213):
 * - группа `primary`  — основные бизнес-модули
 * - разделитель
 * - группа `admin`    — администрирование
 */

export type MenuGroup = 'primary' | 'admin'

export interface MenuItem {
  key: string
  title: string
  path: string
  group: MenuGroup
}

export const SIDEBAR_MENU: MenuItem[] = [
  // Группа 1 — основное
  { key: 'marketing',  title: 'Маркетинг',              path: '/marketing',  group: 'primary' },
  { key: 'crm',        title: 'CRM / Воронка',          path: '/crm',        group: 'primary' },
  { key: 'accounts',   title: 'Управление аккаунтами',  path: '/accounts',   group: 'primary' },
  { key: 'billing',    title: 'Биллинг',                path: '/billing',    group: 'primary' },
  { key: 'statistics', title: 'Статистика',             path: '/statistics', group: 'primary' },
  { key: 'support',    title: 'Техподдержка',           path: '/support',    group: 'primary' },
  // Группа 2 — администрирование
  { key: 'employees',  title: 'Сотрудники',             path: '/employees',  group: 'admin' },
  { key: 'analytics',  title: 'Аналитика',              path: '/analytics',  group: 'admin' },
]
