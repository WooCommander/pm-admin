<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button';
import { TirPmDrawer, TirPmDrawerPositionEnum } from 'tir-pm-drawer';
import { TirPmTab, TirPmTabs } from 'tir-pm-tabs';
import { XMarkIcon } from 'tir-style-system/icons/outline';
import { computed, ref, watch } from 'vue';

import type {
  MarketingLinkFormModel,
  MarketingLinkModel,
  MarketingLinkStatsModel,
} from '../models';
import { createEmptyMarketingLinkForm, createEmptyMarketingLinkStats } from '../models';
import MarketingLinkDetailsTab from './MarketingLinkDetailsTab.vue';
import MarketingLinkStatsTab from './MarketingLinkStatsTab.vue';

type ModalMode = 'add' | 'edit';
type TabKey = 'details' | 'stats';

const props = withDefaults(
  defineProps<{
    isVisible: boolean;
    mode: ModalMode;
    link?: MarketingLinkModel | null;
    linkStats?: MarketingLinkStatsModel | null;
  }>(),
  {
    link: null,
    linkStats: null,
  },
);

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', form: MarketingLinkFormModel): void;
}>();

const activeTab = ref<TabKey>('details');
const form = ref<MarketingLinkFormModel>(createEmptyMarketingLinkForm());
const stats = ref<MarketingLinkStatsModel>(createEmptyMarketingLinkStats());

watch(
  () => props.isVisible,
  (visible) => {
    if (visible) {
      activeTab.value = 'details';
      form.value = createEmptyMarketingLinkForm();
      stats.value = createEmptyMarketingLinkStats();
    }
  },
);

watch(
  () => props.linkStats,
  (newStats) => {
    if (newStats) stats.value = newStats;
  },
);

const drawerTitle = computed<string>(() => (props.mode === 'add' ? 'Добавление ссылки' : 'Ссылка'));

const isFormFilled = computed<boolean>(
  () => form.value.campaignName.trim().length > 0 && form.value.url.trim().length > 0,
);

const saveLabel = computed<string>(() => (props.mode === 'add' ? 'Добавить' : 'Сохранить'));

const isSaveDisabled = computed<boolean>(() => props.mode === 'add' && !isFormFilled.value);

const isVisible = computed({
  get: () => props.isVisible,
  set: (val: boolean) => {
    if (!val) emit('close');
  },
});

function onSave(): void {
  if (isSaveDisabled.value) return;
  emit('save', { ...form.value });
}
</script>

<template>
  <TirPmDrawer
    v-model:visible="isVisible"
    :position="TirPmDrawerPositionEnum.Right"
    size="52.5rem"
    :is-active-animation="true"
  >
    <template #content>
      <div class="link-drawer">
        <!-- Шапка -->
        <div class="link-drawer__header">
          <div class="link-drawer__header-content">
            <h2 class="link-drawer__title">{{ drawerTitle }}</h2>
            <TirPmButton
              :variant="TirPmButtonVariantEnum.LinkState"
              :size="TirPmButtonSizeEnum.Middle"
              @click="emit('close')"
            >
              <template #leftSlot>
                <XMarkIcon />
              </template>
            </TirPmButton>
          </div>
        </div>

        <!-- Тело (скролл) -->
        <div class="link-drawer__body">
          <!-- Вкладки (только edit) -->
          <div v-if="mode === 'edit'" class="link-drawer__tabs">
            <TirPmTabs v-model="activeTab">
              <TirPmTab val="details" :current-tab="activeTab" label="Детали" />
              <TirPmTab val="stats" :current-tab="activeTab" label="Статистика" />
            </TirPmTabs>
          </div>

          <!-- Контент -->
          <MarketingLinkDetailsTab
            v-if="mode === 'add' || activeTab === 'details'"
            v-model="form"
          />
          <MarketingLinkStatsTab v-if="mode === 'edit' && activeTab === 'stats'" v-model="stats" />
        </div>

        <!-- Футер -->
        <div class="link-drawer__footer">
          <TirPmButton
            :variant="
              isSaveDisabled
                ? TirPmButtonVariantEnum.TertiaryState
                : TirPmButtonVariantEnum.PrimaryState
            "
            :size="TirPmButtonSizeEnum.Middle"
            :is-disabled="isSaveDisabled"
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
    flex-shrink: 0;
    padding: 1.75rem 1.75rem 0;
  }

  &__header-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
  }

  &__title {
    margin: 0;
    font-size: 1.625rem;
    font-weight: 500;
    line-height: 2rem;
    color: var(--text-primary, #272d37);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background: none;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    color: var(--text-secondary, #686c73);
    padding: 0.5rem;
    transition:
      background 0.12s,
      color 0.12s;
    flex-shrink: 0;
    margin-top: -0.5rem;
    margin-right: -0.75rem;

    &:hover {
      background: var(--neutral-10, #eaeaeb);
      color: var(--text-primary, #272d37);
    }
  }

  &__close-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  // Вкладки (внутри body)
  &__tabs {
    flex-shrink: 0;
    border-bottom: 0.0625rem solid var(--neutral-30, #bfc0c3);
  }

  // Тело
  &__body {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    padding: 1.75rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  // Футер
  &__footer {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2.5rem 2.5rem;
    border-top: 0.0625rem solid var(--neutral-20, #d4d5d7);
    flex-shrink: 0;
  }

  &__save-btn {
    min-width: 6.5rem;
  }

  &__cancel-btn {
    min-width: 6.5rem;
  }
}
</style>
