<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { appMarketingService } from '..'
import {
  MarketingFilterBar,
  MarketingLinksTable,
  MarketingOverlay,
  MarketingStatsCard,
} from '../components'
import type { MarketingFiltersModel } from '../models'

const service = appMarketingService
const state = service.state

onMounted(() => {
  void service.loadInitialData()
})

// ── Фильтрация ─────────────────────────────────────────────────────────────

const filteredLinks = computed(() => {
  const { statusTab, search } = state.filters
  return state.links.filter((link) => {
    const matchStatus =
      statusTab === 'all' ||
      (statusTab === 'active' && link.status === 'active') ||
      (statusTab === 'paused' && link.status === 'paused')

    const q = search.trim().toLowerCase()
    const matchSearch =
      !q ||
      link.link.toLowerCase().includes(q) ||
      link.campaignName.toLowerCase().includes(q) ||
      link.employeeName.toLowerCase().includes(q)

    return matchStatus && matchSearch
  })
})

// ── Обработчики ────────────────────────────────────────────────────────────

function onUpdateFilters(patch: Partial<MarketingFiltersModel>): void {
  service.patchFilters(patch)
}

function onApply(): void {
  // Заглушка — в реальном API тут перезагрузка данных с новыми датами
}

function onAdd(): void {
  // Заглушка — откроет модалку создания ссылки (M-6)
}
</script>

<template>
  <section class="marketing-page">
    <!-- Верхний блок: вкладки + диапазон дат -->
    <MarketingOverlay
      :filters="state.filters"
      @update:filters="onUpdateFilters"
      @apply="onApply"
    />

    <!-- 4 карточки статистики -->
    <div class="marketing-page__stats">
      <MarketingStatsCard
        v-for="card in state.statsCards"
        :key="card.id"
        :card="card"
      />
    </div>

    <!-- Строка фильтров: пилли + селект + поиск + добавить -->
    <MarketingFilterBar
      :filters="state.filters"
      @update:filters="onUpdateFilters"
      @add="onAdd"
    />

    <!-- Таблица ссылок + пагинация -->
    <MarketingLinksTable
      :links="filteredLinks"
      :is-loading="state.isLoading"
    />
  </section>
</template>

<style lang="scss" scoped>
.marketing-page {
  display: flex;
  flex-direction: column;
  background: var(--bg-base, #fff);
  min-height: 100%;

  &__stats {
    display: flex;
    gap: 12px;
    padding: 0 28px 24px;
  }
}
</style>
