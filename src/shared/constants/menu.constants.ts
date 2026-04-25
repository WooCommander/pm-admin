import type { Component } from 'vue'

import {
  ChartBarIcon,
  FunnelIcon,
  LifebuoyIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
  UsersIcon,
} from 'tir-style-system/icons/outline'

export type MenuGroup = 'primary' | 'admin'

export interface MenuItem {
  key: string
  title: string
  path: string
  group: MenuGroup
  icon: Component
}

export const SIDEBAR_MENU: MenuItem[] = [
  { key: 'marketing', title: 'Маркетинг', path: '/marketing', group: 'primary', icon: PresentationChartBarIcon },
  { key: 'crm', title: 'CRM / Воронка', path: '/crm', group: 'primary', icon: FunnelIcon },
  { key: 'accounts', title: 'Управление аккаунтами', path: '/accounts', group: 'primary', icon: UserCircleIcon },
  { key: 'statistics', title: 'Статистика', path: '/statistics', group: 'primary', icon: ChartBarIcon },
  { key: 'support', title: 'Техподдержка', path: '/support', group: 'primary', icon: LifebuoyIcon },
  { key: 'employees', title: 'Сотрудники', path: '/employees', group: 'admin', icon: UsersIcon },
  { key: 'analytics', title: 'Аналитика', path: '/analytics', group: 'admin', icon: ChartBarIcon },
]
