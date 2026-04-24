<script setup lang="ts">
import {
  TirPmButton,
  TirPmButtonSizeEnum,
  TirPmButtonVariantEnum,
  TirPmInput,
  TirPmInputSizeEnum,
} from 'tir-components'
import { KeyIcon, UserIcon } from 'tir-style-system/icons/solid'
import { computed, reactive, ref } from 'vue'

import { createEmptyLoginForm, type LoginFormModel } from '../models'
import { authService } from '../services'

/**
 * Форма логина по макету Figma 8-1450.
 *
 * Держит своё состояние, вызывает mock-сервис и наружу отдаёт
 * только событие success — куда вести дальше решает страница.
 */

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'forgot-password'): void
}>()

const form = reactive<LoginFormModel>(createEmptyLoginForm())
const isLoading = ref(false)
const error = ref<string | null>(null)

const canSubmit = computed(
  () => form.email.trim().length > 0 && form.password.length > 0 && !isLoading.value,
)

const onSubmit = async (): Promise<void> => {
  if (!canSubmit.value) return
  isLoading.value = true
  error.value = null

  const result = await authService.login({
    email: form.email,
    password: form.password,
  })

  isLoading.value = false

  if (result.kind === 'error') {
    error.value = result.message
    return
  }

  // TODO (этап 4): положить user/token в store (pinia) + js-cookie.
  emit('success')
}

const onForgot = (): void => {
  emit('forgot-password')
}
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="login-form__fields">
      <TirPmInput
        v-model="form.email"
        class="login-form__input"
        type="email"
        autocomplete="email"
        placeholder="E-mail"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        :is-disabled="isLoading"
      >
        <template #leftInputAddons>
          <UserIcon class="login-form__icon" />
        </template>
      </TirPmInput>

      <TirPmInput
        v-model="form.password"
        class="login-form__input"
        type="password"
        autocomplete="current-password"
        placeholder="Пароль"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        :is-disabled="isLoading"
      >
        <template #leftInputAddons>
          <KeyIcon class="login-form__icon" />
        </template>
      </TirPmInput>

      <p v-if="error" class="login-form__error" role="alert">{{ error }}</p>
    </div>

    <div class="login-form__actions">
      <TirPmButton
        type="submit"
        class="login-form__button"
        :size="TirPmButtonSizeEnum.Regular"
        :variant="TirPmButtonVariantEnum.AccentState"
        :is-disabled="!canSubmit"
        :is-loading="isLoading"
      >
        <template #text>Войти</template>
      </TirPmButton>

      <TirPmButton
        type="button"
        class="login-form__button"
        :size="TirPmButtonSizeEnum.Regular"
        :variant="TirPmButtonVariantEnum.SecondaryState"
        :is-disabled="isLoading"
        @click="onForgot"
      >
        <template #text>Восстановить доступ</template>
      </TirPmButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__input {
    width: 100%;
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: var(--text-secondary);
  }

  &__error {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-error, #d04a4a);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__button {
    width: 100%;
  }
}
</style>
