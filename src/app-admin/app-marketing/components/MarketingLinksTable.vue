<script setup lang="ts">
import { computed } from 'vue'

import type { MarketingLinkModel } from '../models'

interface Props {
  links: MarketingLinkModel[]
  isLoading?: boolean
}

const props = defineProps<Props>()

// ── Пагинация (мок — одна страница) ──────────────────────────────────────
const PAGE_SIZE = 19
const currentPage = 1
const totalPages = computed(() => Math.ceil(props.links.length / PAGE_SIZE) || 1)

// ── Утилиты ───────────────────────────────────────────────────────────────

/** Инициалы из ФИО для аватара-заглушки. */
function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
}

/** Форматирование числа: 4210 → «4 210». */
function formatNumber(n: number): string {
  return n.toLocaleString('ru-RU')
}

function copyLink(link: string): void {
  void navigator.clipboard.writeText(`https://${link}`)
}
</script>

<template>
  <div class="links-table">
    <!-- ── Шапка таблицы ─────────────────────────────────────────────── -->
    <div class="links-table__header-row">
      <div class="links-table__header-cells">
        <div class="links-table__th links-table__col--photo">Фото</div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--name">
          ФИО сотрудника
          <svg class="links-table__sort-icon" viewBox="0 0 16 16" fill="none">
            <path d="M5 4l3-3 3 3M5 12l3 3 3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--campaign">
          Название
          <svg class="links-table__sort-icon" viewBox="0 0 16 16" fill="none">
            <path d="M5 4l3-3 3 3M5 12l3 3 3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--status">
          Статус
          <svg class="links-table__sort-icon" viewBox="0 0 16 16" fill="none">
            <path d="M5 4l3-3 3 3M5 12l3 3 3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--link">Ссылка</div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--channel">Канал</div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--clicks">Переходов</div>
        <div class="links-table__sep" />
        <div class="links-table__th links-table__col--regs">Регистраций</div>
      </div>
      <div class="links-table__border-line" />
    </div>

    <!-- ── Строки данных ─────────────────────────────────────────────── -->
    <div v-if="props.isLoading" class="links-table__loading">
      Загрузка…
    </div>

    <template v-else>
      <div
        v-for="row in props.links"
        :key="row.id"
        class="links-table__row"
      >
        <div class="links-table__cells">
          <!-- Фото / аватар -->
          <div class="links-table__td links-table__col--photo">
            <img
              v-if="row.employeeAvatar"
              :src="row.employeeAvatar"
              :alt="row.employeeName"
              class="links-table__avatar"
            />
            <span v-else class="links-table__avatar-placeholder">
              {{ getInitials(row.employeeName) }}
            </span>
          </div>
          <div class="links-table__sep" />

          <!-- ФИО -->
          <div class="links-table__td links-table__col--name">
            <span class="links-table__text-regular">{{ row.employeeName }}</span>
          </div>
          <div class="links-table__sep" />

          <!-- Название кампании -->
          <div class="links-table__td links-table__col--campaign">
            <span class="links-table__text-medium">{{ row.campaignName }}</span>
          </div>
          <div class="links-table__sep" />

          <!-- Статус -->
          <div class="links-table__td links-table__col--status">
            <span
              class="links-table__status-badge"
              :class="`links-table__status-badge--${row.status}`"
            >
              <span class="links-table__status-dot" />
              {{ row.status === 'active' ? 'активна' : 'пауза' }}
            </span>
          </div>
          <div class="links-table__sep" />

          <!-- Ссылка + кнопка копировать -->
          <div class="links-table__td links-table__col--link">
            <a
              :href="`https://${row.link}`"
              class="links-table__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ row.link }}
            </a>
            <button
              class="links-table__copy-btn"
              type="button"
              aria-label="Скопировать ссылку"
              @click="copyLink(row.link)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5.5" y="5.5" width="8" height="9" rx="1.5" stroke="#686c73" stroke-width="1.2"/>
                <path d="M3.5 10.5H3A1.5 1.5 0 0 1 1.5 9V3A1.5 1.5 0 0 1 3 1.5H9A1.5 1.5 0 0 1 10.5 3V3.5" stroke="#686c73" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="links-table__sep" />

          <!-- Канал -->
          <div class="links-table__td links-table__col--channel">
            <span class="links-table__text-regular">{{ row.channel }}</span>
          </div>
          <div class="links-table__sep" />

          <!-- Переходов -->
          <div class="links-table__td links-table__col--clicks">
            <span class="links-table__text-mono">{{ formatNumber(row.clicksCount) }}</span>
          </div>
          <div class="links-table__sep" />

          <!-- Регистраций -->
          <div class="links-table__td links-table__col--regs">
            <span class="links-table__text-mono">{{ formatNumber(row.registrationsCount) }}</span>
          </div>
        </div>
        <div class="links-table__border-line" />
      </div>
    </template>

    <!-- ── Пагинация ────────────────────────────────────────────────── -->
    <div class="links-table__pagination">
      <div class="links-table__page-size">
        Показывать по {{ PAGE_SIZE }}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="#272d37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="links-table__pages">
        <button class="links-table__page-btn" type="button" :disabled="currentPage === 1" aria-label="Назад">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#272d37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="links-table__page-btn links-table__page-btn--active" type="button">
          {{ currentPage }}
        </button>
        <button class="links-table__page-btn" type="button" :disabled="currentPage === totalPages" aria-label="Вперёд">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="#272d37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ── Колонки — ширины из Figma 83-3789 ─────────────────────────────────────
// Фото: 48  Sep: 12  ФИО: 284  Sep: 12  Название: 192  Sep: 12
// Статус: 112  Sep: 12  Ссылка: flex  Sep: 12  Канал: flex
// Sep: 12  Переходов: 191  Sep: 12  Регистраций: 139

$col-photo:    48px;
$col-sep:      12px;
$col-name:    284px;
$col-campaign: 192px;
$col-status:   112px;
$col-clicks:   191px;
$col-regs:     139px;

.links-table {
  border: 1px solid var(--neutral-10, #eaeaeb);
  display: flex;
  flex-direction: column;

  // ── Шапка ───────────────────────────────────────────────────────────────

  &__header-row {
    display: flex;
    flex-direction: column;
    padding: 0 28px;
  }

  &__header-cells {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
  }

  &__th {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: var(--text-primary, #272d37);
    white-space: nowrap;
    overflow: hidden;
    padding: 8px 0;
  }

  &__sort-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--neutral-50, #93969b);
  }

  // ── Строка ───────────────────────────────────────────────────────────────

  &__row {
    display: flex;
    flex-direction: column;
    padding: 0 28px;
  }

  &__cells {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
  }

  &__td {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 8px 0;
    overflow: hidden;
  }

  // ── Разделитель колонок ─────────────────────────────────────────────────

  &__sep {
    width: $col-sep;
    height: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      background: var(--neutral-20, #d4d5d7);
    }
  }

  // ── Горизонтальный разделитель строк ────────────────────────────────────

  &__border-line {
    height: 1px;
    background: var(--neutral-10, #eaeaeb);
  }

  // ── Ширины колонок ───────────────────────────────────────────────────────

  &__col--photo    { width: $col-photo;    flex-shrink: 0; }
  &__col--name     { width: $col-name;     flex-shrink: 0; }
  &__col--campaign { width: $col-campaign; flex-shrink: 0; }
  &__col--status   { width: $col-status;   flex-shrink: 0; }
  &__col--link     { flex: 1 1 0; min-width: 0; }
  &__col--channel  { flex: 1 1 0; min-width: 0; }
  &__col--clicks   { width: $col-clicks;   flex-shrink: 0; }
  &__col--regs     { width: $col-regs;     flex-shrink: 0; }

  // ── Аватар ───────────────────────────────────────────────────────────────

  &__avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__avatar-placeholder {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--neutral-20, #d4d5d7);
    color: var(--text-secondary, #686c73);
    font-family: 'Roboto', sans-serif;
    font-size: 9px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    user-select: none;
  }

  // ── Типографика ячеек ────────────────────────────────────────────────────

  &__text-regular {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__text-medium {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__text-mono {
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.03em;
    color: var(--text-primary, #272d37);
    white-space: nowrap;
  }

  // ── Статус-бейдж ────────────────────────────────────────────────────────

  &__status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;

    &--active {
      background: #f1f9f1;
      color: #2e9a41;

      .links-table__status-dot { background: #2e9a41; }
    }

    &--paused {
      background: #f9eee9;
      color: #ee861f;

      .links-table__status-dot { background: #ee861f; }
    }
  }

  &__status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  // ── Ссылка ───────────────────────────────────────────────────────────────

  &__link {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-info, #2a77ef);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;

    &:hover { text-decoration: underline; }
  }

  &__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 4px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
    color: var(--text-secondary, #686c73);
    transition: background 0.15s;

    &:hover { background: var(--neutral-10, #eaeaeb); }

    &:focus-visible {
      outline: 2px solid var(--text-info, #2a77ef);
      outline-offset: 1px;
    }
  }

  // ── Загрузка ─────────────────────────────────────────────────────────────

  &__loading {
    padding: 32px 28px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: var(--text-secondary, #686c73);
  }

  // ── Пагинация ────────────────────────────────────────────────────────────

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 28px 12px;
  }

  &__page-size {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    cursor: pointer;
    user-select: none;
  }

  &__pages {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__page-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: var(--text-primary, #272d37);
    transition: background 0.15s;

    &:hover:not(:disabled):not(&--active) {
      background: var(--neutral-10, #eaeaeb);
    }

    &--active {
      background: var(--text-primary, #272d37);
      color: #fff;
      cursor: default;
    }

    &:disabled {
      opacity: 0.35;
      cursor: default;
    }

    &:focus-visible {
      outline: 2px solid var(--text-info, #2a77ef);
      outline-offset: 2px;
    }
  }
}
</style>
