<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmDrawer, TirPmDrawerPositionEnum } from 'tir-pm-drawer'
import { TirPmTab, TirPmTabs } from 'tir-pm-tabs'
import { computed, ref, watch } from 'vue'

import type { MarketingLinkFormModel, MarketingLinkModel, MarketingLinkStatsModel } from '../models'
import { createEmptyMarketingLinkForm, createEmptyMarketingLinkStats } from '../models'
import MarketingLinkDetailsTab from './MarketingLinkDetailsTab.vue'
import MarketingLinkStatsTab from './MarketingLinkStatsTab.vue'

type ModalMode = 'add' | 'edit'
type TabKey = 'details' | 'stats'

const props = withDefaults(defineProps<{
  isVisible: boolean
  mode: ModalMode
  link?: MarketingLinkModel | null
}>(), {
  link: null,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', form: MarketingLinkFormModel): void
}>()

const activeTab = ref<TabKey>('details')
const form = ref<MarketingLinkFormModel>(createEmptyMarketingLinkForm())
const stats = ref<MarketingLinkStatsModel>(createEmptyMarketingLinkStats())

watch(() => props.isVisible, (visible) => {
  if (visible) {
    activeTab.value = 'details'
    form.value = createEmptyMarketingLinkForm()
    stats.value = createEmptyMarketingLinkStats()
  }
})

const drawerTitle = computed<string>(() =>
  props.mode === 'add' ? 'Добавление ссылки' : 'Ссылка'
)

const isFormFilled = computed<boolean>(() =>
  form.value.campaignName.trim().length > 0 &&
  form.value.url.trim().length > 0
)

const saveLabel = computed<string>(() =>
  props.mode === 'add' ? 'Добавить' : 'Сохранить'
)

const isVisible = computed({
  get: () => props.isVisible,
  set: (val: boolean) => { if (!val) emit('close') },
})

function onSave(): void {
  if (props.mode === 'add' && !isFormFilled.value) return
  emit('save', { ...form.value })
}
</script>

<template>
  <TirPmDrawer
    v-model:visible="isVisible"
    :position="TirPmDrawerPositionEnum.Right"
    size="540px"
    :is-active-animation="true"
  >
    <template #content>
      <div class="link-drawer">
        <!-- Шапка -->
        <div class="link-drawer__header">
          <h2 class="link-drawer__title">{{ drawerTitle }}</h2>
          <button
            class="link-drawer__close"
            type="button"
            aria-label="Закрыть"
            @click="emit('close')"
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="link-drawer__close-icon">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Вкладки (только edit) -->
        <div v-if="mode === 'edit'" class="link-drawer__tabs">
          <TirPmTabs v-model="activeTab">
            <TirPmTab val="details" :current-tab="activeTab" label="Детали" />
            <TirPmTab val="stats" :current-tab="activeTab" label="Статистика" />
          </TirPmTabs>
        </div>

        <!-- Тело (скролл) -->
        <div class="link-drawer__body">
          <MarketingLinkDetailsTab
            v-if="mode === 'add' || activeTab === 'details'"
            v-model="form"
          />
          <MarketingLinkStatsTab
            v-if="mode === 'edit' && activeTab === 'stats'"
            v-model="stats"
          />
        </div>

        <!-- Футер -->
        <div class="link-drawer__footer">
          <TirPmButton
            :variant="TirPmButtonVariantEnum.PrimaryState"
            :size="TirPmButtonSizeEnum.Middle"
            :is-disabled="mode === 'add' && !isFormFilled"
            class="link-drawer__save-btn"
            @click="onSave"
          >
            {{ saveLabel }}
          </TirPmButton>
          <TirPmButton
            :variant="TirPmButtonVariantEnum.TertiaryState"
            :size="TirPmButtonSizeEnum.Middle"
            class="link-drawer__cancel-btn"
            @click="emit('close')"
          >
            Отмена
          </TirPmButton>
        </div>
      </div>
    </template>
  </TirPmDrawer>
</template>

<style lang="scss" scoped>
.link-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-base, #ffffff);

  // Шапка
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--neutral-20, #d4d5d7);
  }

  &__title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: var(--text-primary, #272d37);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: var(--text-secondary, #686c73);
    padding: 0;
    transition: background 0.12s, color 0.12s;
    flex-shrink: 0;

    &:hover {
      background: var(--neutral-10, #eaeaeb);
      color: var(--text-primary, #272d37);
    }
  }

  &__close-icon {
    width: 20px;
    height: 20px;
  }

  // Вкладки
  &__tabs {
    flex-shrink: 0;
    padding: 0 24px;
    border-bottom: 1px solid var(--neutral-20, #d4d5d7);
  }

  // Скроллируемое тело
  &__body {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  // Футер
  &__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid var(--neutral-20, #d4d5d7);
    flex-shrink: 0;
  }

  &__save-btn {
    min-width: 120px;
  }

  &__cancel-btn {
    min-width: 90px;
  }
}
</style>
