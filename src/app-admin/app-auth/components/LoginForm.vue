<script setup lang="ts">
import { TirPmButton, TirPmButtonSizeEnum, TirPmButtonVariantEnum } from 'tir-pm-button';
import { TirPmInput, TirPmInputSizeEnum } from 'tir-pm-input';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, KeyIcon, UserIcon } from 'tir-style-system/icons/solid';
import { computed, reactive, ref, watch } from 'vue';

import { createEmptyLoginForm, type LoginFormModel } from '../models';
import { authService } from '../services';

const emit = defineEmits<{
  (e: 'success'): void;
  (e: 'forgot-password'): void;
}>();

const form = reactive<LoginFormModel>(createEmptyLoginForm());
const isLoading = ref(false);
const isPasswordVisible = ref(false);
const error = ref<string | null>(null);

const hasError = computed(() => Boolean(error.value));
const canSubmit = computed(
  () => form.email.trim().length > 0 && form.password.length > 0 && !isLoading.value,
);

watch(
  () => [form.email, form.password],
  () => {
    if (error.value) {
      error.value = null;
    }
  },
);

const passwordInputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const passwordToggleLabel = computed(() =>
  isPasswordVisible.value ? 'Скрыть пароль' : 'Показать пароль',
);

const onSubmit = async (): Promise<void> => {
  if (!canSubmit.value) return;

  isLoading.value = true;
  error.value = null;

  const result = await authService.login({
    email: form.email,
    password: form.password,
  });

  isLoading.value = false;

  if (result.kind === 'error') {
    error.value = result.message;
    return;
  }

  emit('success');
};

const onForgot = (): void => {
  emit('forgot-password');
};

const togglePasswordVisibility = (): void => {
  if (isLoading.value) return;
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="login-form__fields">
      <TirPmInput
        v-model="form.email"
        label="Электронная почта"
        class="login-form__input"
        type="email"
        autocomplete="email"
        placeholder="name@example.com"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        :is-disabled="isLoading"
        :is-with-error="hasError"
      >
        <template #leftInputAddons>
          <UserIcon class="login-form__icon" />
        </template>
      </TirPmInput>

      <TirPmInput
        v-model="form.password"
        label="Пароль"
        class="login-form__input"
        :type="passwordInputType"
        autocomplete="current-password"
        placeholder="Введите пароль"
        :size="TirPmInputSizeEnum.Regular"
        :is-with-hint="false"
        :is-disabled="isLoading"
        :is-with-error="hasError"
      >
        <template #leftInputAddons>
          <KeyIcon class="login-form__icon" />
        </template>

        <template #rightInputAddons>
          <button
            type="button"
            class="login-form__password-toggle"
            :aria-label="passwordToggleLabel"
            :title="passwordToggleLabel"
            :disabled="isLoading"
            @click.stop="togglePasswordVisibility"
          >
            <EyeIcon v-if="isPasswordVisible" class="login-form__icon login-form__icon--action" />
            <EyeSlashIcon v-else class="login-form__icon login-form__icon--action" />
          </button>
        </template>
      </TirPmInput>
<TirPmBadg
      <div v-if="error" class="login-form__error" role="alert">
        <ExclamationCircleIcon class="login-form__error-icon" />
        <div class="login-form__error-content">
          <p class="login-form__error-text">{{ error }}</p>
          <button type="button" class="login-form__error-link" @click="onForgot">
            Восстановить доступ
          </button>
        </div>
      </div>
    </div>

    <div class="login-form__actions">
      <TirPmButton
        type="submit"
        class="login-form__button"
        :size="TirPmButtonSizeEnum.Regular"
        :variant="TirPmButtonVariantEnum.PrimaryState"
        :is-disabled="!canSubmit"
        :is-loading="isLoading"
      >
        Войти
      </TirPmButton>

      <TirPmButton
        type="button"
        class="login-form__button"
        :size="TirPmButtonSizeEnum.Regular"
        :variant="TirPmButtonVariantEnum.SecondaryState"
        :is-disabled="isLoading"
        @click="onForgot"
      >
        Восстановить доступ
      </TirPmButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__input {
    width: 100%;
  }

  &__icon {
    width: 18px;
    height: 18px;
    color: var(--text-secondary);
    flex: 0 0 auto;
  }

  &__icon--action {
    color: var(--text-primary);
  }

  &__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  &__password-toggle:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &__error {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 12px 10px;
    background: #fdecec;
    border-radius: 8px;
  }

  &__error-icon {
    width: 18px;
    height: 18px;
    color: #ef4423;
    flex: 0 0 auto;
    margin-top: 1px;
  }

  &__error-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    min-width: 0;
  }

  &__error-text {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    color: #353748;
  }

  &__error-link {
    padding: 0;
    border: 0;
    background: transparent;
    color: #4d74ff;
    font-size: 12px;
    line-height: 16px;
    cursor: pointer;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__button {
    width: 100%;
  }
}
</style>
