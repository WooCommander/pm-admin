<script setup lang="ts">
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import { TirPmSelect, TirPmSelectItemElement } from 'tir-pm-select'
import { TirPmStatusBudge } from 'tir-pm-status-budge'
import { TirToggle } from 'tir-pm-toggle-button'

import type { MarketingLinkFormModel, MarketingLinkStatus } from '../models'
import {
  MARKETING_CHANNEL_OPTIONS,
  MARKETING_STATUS_OPTIONS,
} from '../models'

const props = defineProps<{
  modelValue: MarketingLinkFormModel
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: MarketingLinkFormModel): void
}>()

function patch(partial: Partial<MarketingLinkFormModel>): void {
  emit('update:modelValue', { ...props.modelValue, ...partial })
}

function selectedChannelLabel(): string {
  const opt = MARKETING_CHANNEL_OPTIONS.find(o => o.value === props.modelValue.channel)
  return opt?.label ?? ''
}

function statusLabel(): string {
  const opt = MARKETING_STATUS_OPTIONS.find(o => o.value === props.modelValue.status)
  return opt?.label ?? ''
}

function statusColor(status: MarketingLinkStatus): string {
  return status === 'active' ? 'positive' : 'operation'
}

function statusIconType(status: MarketingLinkStatus): string {
  return status === 'active' ? 'positive' : 'operation'
}
</script>

<template>
  <div class="details-tab">
    <!-- Название кампании -->
    <TirPmInput
      :model-value="modelValue.campaignName"
      label="Название кампании"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ campaignName: String($event) })"
    />

    <!-- Слаг -->
    <TirPmInput
      :model-value="modelValue.slug"
      label="Слаг"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ slug: String($event) })"
    />

    <!-- Ссылка -->
    <TirPmInput
      :model-value="modelValue.url"
      label="Ссылка"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ url: String($event) })"
    />

    <!-- Канал -->
    <TirPmSelect
      label="Канал"
      class="details-tab__field"
    >
      <template #selectedContent>
        <span
          v-if="modelValue.channel"
          class="details-tab__select-value"
        >{{ selectedChannelLabel() }}</span>
      </template>
      <template #content="{ close }">
        <TirPmSelectItemElement
          v-for="opt in MARKETING_CHANNEL_OPTIONS"
          :key="opt.value"
          @click="() => { patch({ channel: opt.value }); close() }"
        >
          {{ opt.label }}
        </TirPmSelectItemElement>
      </template>
    </TirPmSelect>

    <!-- UTM Source -->
    <TirPmInput
      :model-value="modelValue.utmSource"
      label="utm_source"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ utmSource: String($event) })"
    />

    <!-- UTM Medium -->
    <TirPmInput
      :model-value="modelValue.utmMedium"
      label="utm_medium"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ utmMedium: String($event) })"
    />

    <!-- UTM Campaign -->
    <TirPmInput
      :model-value="modelValue.utmCampaign"
      label="utm_campaign"
      :size="TirPmInputSizeEnum.Regular"
      :is-with-hint="false"
      class="details-tab__field"
      @update:model-value="patch({ utmCampaign: String($event) })"
    />

    <!-- Статус -->
    <TirPmSelect
      label="Статус"
      class="details-tab__field"
    >
      <template #selectedContent>
        <span class="details-tab__status-value">
          <TirPmStatusBudge
            :status-icon-type="statusIconType(modelValue.status)"
            :status-color="statusColor(modelValue.status)"
          />
          <span class="details-tab__status-label">{{ statusLabel() }}</span>
        </span>
      </template>
      <template #content="{ close }">
        <TirPmSelectItemElement
          v-for="opt in MARKETING_STATUS_OPTIONS"
          :key="opt.value"
          @click="() => { patch({ status: opt.value }); close() }"
        >
          <span class="details-tab__status-option">
            <TirPmStatusBudge
              :status-icon-type="statusIconType(opt.value)"
              :status-color="statusColor(opt.value)"
            />
            <span>{{ opt.label }}</span>
          </span>
        </TirPmSelectItemElement>
      </template>
    </TirPmSelect>

    <!-- Переключатели -->
    <div class="details-tab__toggles">
      <!-- Отслеживать регистрации -->
      <div class="details-tab__toggle-row">
        <div class="details-tab__toggle-info">
          <span class="details-tab__toggle-label">Отслеживать регистрации</span>
        </div>
        <TirToggle
          :model-value="modelValue.trackRegistrations"
          @update:model-value="patch({ trackRegistrations: $event })"
        />
      </div>

      <!-- Отслеживать звонки -->
      <div class="details-tab__toggle-row">
        <div class="details-tab__toggle-info">
          <span class="details-tab__toggle-label">Отслеживать звонки</span>
        </div>
        <TirToggle
          :model-value="modelValue.trackCalls"
          @update:model-value="patch({ trackCalls: $event })"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details-tab {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;

  &__field {
    width: 100%;
  }

  &__select-value {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
  }

  &__status-value {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  &__status-label {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
  }

  &__status-option {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
  }

  &__toggles {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--neutral-20, #d4d5d7);
  }

  &__toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: var(--bg-base, #ffffff);

    & + & {
      border-top: 1px solid var(--neutral-20, #d4d5d7);
    }
  }

  &__toggle-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__toggle-label {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-primary, #272d37);
    font-weight: 500;
  }
}
</style>
