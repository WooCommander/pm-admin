<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { appMarketingService } from '..'
import {
  MarketingFilterBar,
  MarketingLinkModal,
  MarketingLinksTable,
  MarketingOverlay,
  MarketingStatsCard,
} from '../components'
import type { MarketingFiltersModel, MarketingLinkFormModel, MarketingLinkModel } from '../models'

const service = appMarketingService
const state = service.state

onMounted(() => {
  void service.loadInitialData()
})

// --- Фильтрация ---

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
      link.channel.toLowerCase().includes(q)

    return matchStatus && matchSearch
  })
})

function onUpdateFilters(patch: Partial<MarketingFiltersModel>): void {
  service.patchFilters(patch)
}

function onApply(): void {
  // TODO: перезагрузка данных с новым диапазоном дат
}

// --- Модал ---

type ModalMode = 'add' | 'edit'

const isModalVisible = ref(false)
const modalMode = ref<ModalMode>('add')
const modalLink = ref<MarketingLinkModel | null>(null)

function onAdd(): void {
  modalMode.value = 'add'
  modalLink.value = null
  isModalVisible.value = true
}

function onRowClick(link: MarketingLinkModel): void {
  modalMode.value = 'edit'
  modalLink.value = link
  isModalVisible.value = true
  void service.loadLinkStats(link.id)
}

function onModalClose(): void {
  isModalVisible.value = false
  modalLink.value = null
}

function onModalSave(form: MarketingLinkFormModel): void {
  // TODO: сохранение через сервис
  console.log('save link form', form)
  onModalClose()
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

    <!-- Строка фильтров: вкладки + поиск + добавить -->
    <MarketingFilterBar
      :filters="state.filters"
      @update:filters="onUpdateFilters"
      @add="onAdd"
    />

    <!-- Таблица ссылок + пагинация -->
    <MarketingLinksTable
      :links="filteredLinks"
      :is-loading="state.isLoading"
      @row-click="onRowClick"
    />

    <!-- Модал добавления / редактирования ссылки -->
    <MarketingLinkModal
      :is-visible="isModalVisible"
      :mode="modalMode"
      :link="modalLink"
      :link-stats="state.linkStats"
      @close="onModalClose"
      @save="onModalSave"
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
