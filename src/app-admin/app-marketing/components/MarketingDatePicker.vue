<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button'
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input'
import {
  CalendarDaysIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
} from 'tir-style-system/icons/outline'
import { computed, ref } from 'vue'

const PRESETS = [
  'За последние 5 минут',
  'За последние 15 минут',
  'За последние 30 минут',
  'За последний час',
  'За последние 3 часа',
  'За последние 6 часов',
  'За последние 12 часов',
  'За последние 24 часа',
  'За последние 2 дня',
]

const props = defineProps<{
  dateFrom: string | null
  dateTo: string | null
}>()

const emit = defineEmits<{
  (e: 'update:dateFrom', value: string | null): void
  (e: 'update:dateTo', value: string | null): void
  (e: 'apply'): void
}>()

const presetSearch = ref('')

const filteredPresets = computed(() =>
  presetSearch.value
    ? PRESETS.filter((p) =>
        p.toLowerCase().includes(presetSearch.value.toLowerCase()),
      )
    : PRESETS,
)

function selectPreset(preset: string): void {
  emit('update:dateFrom', preset)
}

function copyFromValue(): void {
  if (props.dateFrom) void navigator.clipboard?.writeText(props.dateFrom)
}

function pasteToFrom(): void {
  navigator.clipboard?.readText().then((text) => {
    if (text) emit('update:dateFrom', text)
  })
}
</script>

<template>
  <div class="date-picker">
    <!-- Шапка -->
    <div class="date-picker__header">
      <span class="date-picker__header-label">Дата и время начала</span>
    </div>

    <div class="date-picker__body">
      <!-- Левая панель -->
      <div class="date-picker__left">
        <div class="date-picker__section-header">Период</div>

        <div class="date-picker__fields">
          <!-- Поле «С» -->
          <div class="date-picker__field-group">
            <span class="date-picker__field-label">С</span>
            <TirPmInput
              :model-value="props.dateFrom ?? ''"
              label=""
              placeholder="Now-5min"
              :size="TirPmInputSizeEnum.Tiny"
              :is-with-hint="false"
              class="date-picker__input"
              @update:model-value="emit('update:dateFrom', String($event) || null)"
            >
              <template #leftInputAddons>
                <CalendarDaysIcon class="date-picker__input-icon" />
              </template>
            </TirPmInput>
          </div>

          <!-- Поле «По» -->
          <div class="date-picker__field-group">
            <span class="date-picker__field-label">По</span>
            <TirPmInput
              :model-value="props.dateTo ?? ''"
              label=""
              placeholder="Now"
              :size="TirPmInputSizeEnum.Tiny"
              :is-with-hint="false"
              class="date-picker__input"
              @update:model-value="emit('update:dateTo', String($event) || null)"
            >
              <template #leftInputAddons>
                <CalendarDaysIcon class="date-picker__input-icon" />
              </template>
            </TirPmInput>
          </div>

          <!-- Кнопки действий -->
          <div class="date-picker__actions">
            <TirPmButton
              class="date-picker__icon-btn"
              :variant="TirPmButtonVariantEnum.TertiaryState"
              :size="TirPmButtonSizeEnum.Tiny"
              :title="'Скопировать'"
              @click="copyFromValue"
            >
              <ClipboardIcon class="date-picker__btn-icon" />
            </TirPmButton>

            <TirPmButton
              class="date-picker__icon-btn"
              :variant="TirPmButtonVariantEnum.TertiaryState"
              :size="TirPmButtonSizeEnum.Tiny"
              :title="'Вставить'"
              @click="pasteToFrom"
            >
              <ClipboardDocumentIcon class="date-picker__btn-icon" />
            </TirPmButton>

            <TirPmButton
              class="date-picker__apply-btn"
              :variant="TirPmButtonVariantEnum.PrimaryState"
              :size="TirPmButtonSizeEnum.Tiny"
              @click="emit('apply')"
            >
              Применить
            </TirPmButton>
          </div>
        </div>
      </div>

      <!-- Правая панель -->
      <div class="date-picker__right">
        <div class="date-picker__search-wrap">
          <TirPmInput
            v-model="presetSearch"
            label=""
            placeholder="Поиск"
            :size="TirPmInputSizeEnum.Tiny"
            :is-with-hint="false"
            class="date-picker__search"
          >
            <template #leftInputAddons>
              <MagnifyingGlassIcon class="date-picker__input-icon" />
            </template>
          </TirPmInput>
        </div>

        <div class="date-picker__presets">
          <button
            v-for="preset in filteredPresets"
            :key="preset"
            class="date-picker__preset-item"
            type="button"
            @click="selectPreset(preset)"
          >
            {{ preset }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-picker {
  width: 543px;
  background: var(--bg-base, #fff);
  border: 1px solid var(--neutral-10, #eaeaeb);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    border-bottom: 1px solid var(--neutral-10, #eaeaeb);
    padding: 8px 12px;
  }

  &__header-label {
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    color: var(--text-secondary, #686c73);
  }

  &__body {
    display: flex;
    height: 200px;
  }

  // Левая панель
  &__left {
    flex: 1;
    border-right: 1px solid var(--neutral-10, #eaeaeb);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__section-header {
    border-bottom: 1px solid var(--neutral-10, #eaeaeb);
    padding: 8px 12px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: var(--text-primary, #272d37);
    flex-shrink: 0;
  }

  &__fields {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    overflow: hidden;
  }

  &__field-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__field-label {
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    color: var(--text-primary, #272d37);
  }

  &__input {
    width: 100%;
  }

  &__input-icon {
    width: 16px;
    height: 16px;
    color: var(--text-secondary, #686c73);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__icon-btn {
    width: 24px;
    height: 24px;
    padding: 4px;
    flex-shrink: 0;
  }

  &__btn-icon {
    width: 16px;
    height: 16px;
  }

  &__apply-btn {
    flex-shrink: 0;
  }

  // Правая панель
  &__right {
    width: 217px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  &__search-wrap {
    border-bottom: 1px solid var(--neutral-10, #eaeaeb);
    padding: 8px 12px;
    flex-shrink: 0;
  }

  &__search {
    width: 100%;
  }

  &__presets {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  &__preset-item {
    border: none;
    border-bottom: 1px solid var(--neutral-10, #eaeaeb);
    background: var(--bg-base, #fff);
    padding: 8px 12px;
    text-align: left;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: var(--text-primary, #272d37);
    cursor: pointer;
    transition: background 0.1s;
    flex-shrink: 0;

    &:hover {
      background: var(--neutral-10, #eaeaeb);
    }
  }
}
</style>
