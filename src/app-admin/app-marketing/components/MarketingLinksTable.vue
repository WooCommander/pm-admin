<script setup lang="ts">
import { TirPmPagination } from 'tir-pm-pagination'
import { TirPmStatusBudge } from 'tir-pm-status-budge'
import { TirPmTable, TirPmTableTd, TirPmTableTh, TirPmTableTr } from 'tir-pm-table'
import { ClipboardDocumentIcon } from 'tir-style-system/icons/outline'
import { ref } from 'vue'

import type { MarketingLinkModel, MarketingLinkStatus } from '../models'

// Колонки: Название | Статус | Ссылка | Источник | Переходов | Регистраций
const TABLE_COLUMNS = ['12rem', '7rem', 'minmax(0, 1fr)', '17.9375rem', '11.9375rem', '8.6875rem']

const props = defineProps<{
  links: MarketingLinkModel[]
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'row-click', link: MarketingLinkModel): void
}>()

const currentPage = ref(1)
const pageSize = ref(19)

const totalPages = () => Math.max(1, Math.ceil(props.links.length / pageSize.value))

function statusLabel(status: MarketingLinkStatus): string {
  return status === 'active' ? 'Активная' : 'На паузе'
}

function statusColor(status: MarketingLinkStatus): string {
  return status === 'active' ? 'positive' : 'operation'
}

function statusIconType(status: MarketingLinkStatus): string {
  return status === 'active' ? 'positive' : 'operation'
}

async function copyLink(link: string): Promise<void> {
  if (!navigator?.clipboard?.writeText) return
  await navigator.clipboard.writeText(link)
}

const pagedLinks = () => {
  const start = (currentPage.value - 1) * pageSize.value
  return props.links.slice(start, start + pageSize.value)
}
</script>

<template>
  <div class="links-table">
    <div class="links-table__scroller">
      <TirPmTable
        :columns="TABLE_COLUMNS"
        :data="links"
        :is-bordered="true"
        class="links-table__grid"
      >
        <template #tableHead>
          <TirPmTableTh :is-left-border="false">Название</TirPmTableTh>
          <TirPmTableTh>Статус</TirPmTableTh>
          <TirPmTableTh>Ссылка</TirPmTableTh>
          <TirPmTableTh>Источник</TirPmTableTh>
          <TirPmTableTh>Переходов</TirPmTableTh>
          <TirPmTableTh>Регистраций</TirPmTableTh>
        </template>

        <template #tableBody>
          <TirPmTableTr
            v-for="link in pagedLinks()"
            :key="link.id"
            :columns="TABLE_COLUMNS"
            class="links-table__row"
            @click="emit('row-click', link)"
          >
            <!-- Название кампании -->
            <TirPmTableTd :is-left-border="false">
              <span class="links-table__campaign">{{ link.campaignName }}</span>
            </TirPmTableTd>

            <!-- Статус -->
            <TirPmTableTd>
              <span
                class="links-table__status"
                :class="`links-table__status--${link.status}`"
              >
                <TirPmStatusBudge
                  :status-icon-type="statusIconType(link.status)"
                  :status-color="statusColor(link.status)"
                />
                <span class="links-table__status-label">{{ statusLabel(link.status) }}</span>
              </span>
            </TirPmTableTd>

            <!-- Ссылка + копировать -->
            <TirPmTableTd>
              <span class="links-table__link-cell">
                <a
                  :href="`https://${link.link}`"
                  class="links-table__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ link.link }}</a>
                <button
                  class="links-table__copy-btn"
                  type="button"
                  :aria-label="'Скопировать ссылку'"
                  @click="copyLink(link.link)"
                >
                  <ClipboardDocumentIcon class="links-table__copy-icon" />
                </button>
              </span>
            </TirPmTableTd>

            <!-- Источник (channel) -->
            <TirPmTableTd>
              <span class="links-table__channel">{{ link.channel }}</span>
            </TirPmTableTd>

            <!-- Переходов -->
            <TirPmTableTd>
              <span class="links-table__number">{{ link.clicksCount.toLocaleString('ru-RU') }}</span>
            </TirPmTableTd>

            <!-- Регистраций -->
            <TirPmTableTd>
              <span class="links-table__number">{{ link.registrationsCount.toLocaleString('ru-RU') }}</span>
            </TirPmTableTd>
          </TirPmTableTr>
        </template>
      </TirPmTable>
    </div>

    <div class="links-table__footer">
      <TirPmPagination
        :model-value="currentPage"
        :pages="totalPages()"
        :range-size="2"
        @update:model-value="currentPage = $event"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.links-table {
  display: flex;
  flex-direction: column;
  min-width: 0;

  &__scroller {
    overflow-x: auto;
    padding: 0 1.75rem;
  }

  &__grid {
    width: 100%;
    min-width: 68.75rem;
    --tir-pm-table-container__padding: 0;
    --tir-pm-table-grid__gap: 0;
    --tir-pm-table-grid-header__padding: 0;
    --tir-pm-table-grid-tr__padding: 0;
    --tir-pm-table-grid-th__padding: 0.5rem 0.875rem;
    --tir-pm-table-grid-td__padding: 0.625rem 0.875rem;
  }

  // Название кампании
  &__campaign {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    max-width: 100%;
  }

  // Статус
  &__status {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  &__status-label {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1rem;
    text-transform: uppercase;

    .links-table__status--active & {
      color: #1d9b47;
    }

    .links-table__status--paused & {
      color: #cc7a00;
    }
  }

  // Ссылка
  &__link-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  &__link {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-info, #2a77ef);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;

    &:hover {
      text-decoration: underline;
    }
  }

  &__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    background: none;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    color: var(--text-secondary, #686c73);
    flex-shrink: 0;
    padding: 0;
    transition: background 0.12s, color 0.12s;

    &:hover {
      background: var(--neutral-10, #eaeaeb);
      color: var(--text-primary, #272d37);
    }
  }

  &__copy-icon {
    width: 1rem;
    height: 1rem;
  }

  // Источник
  &__channel {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
  }

  // Числа
  &__number {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
    font-weight: 500;
  }

  // Строка (кликабельная)
  &__row {
    cursor: pointer;

    &:hover {
      background: var(--neutral-5, #f5f5f6);
    }
  }

  // Футер
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.75rem;
  }
}
</style>
