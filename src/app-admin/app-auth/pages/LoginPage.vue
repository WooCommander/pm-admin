<script setup lang="ts">
import { useRouter } from 'vue-router'

import { LoginForm, TirScriptLogo } from '../components'

/**
 * Страница входа.
 *
 * Макет: Figma 8-1450.
 *   - модалка 392px, bg `--bg-base`, border-radius 20, паддинги 40
 *   - лого сверху, под ним форма (2 инпута + 2 кнопки)
 *   - обработка «Восстановить доступ» пока заглушкой
 */

const router = useRouter()

const onLoginSuccess = (): void => {
  // После реального логина пойдём по умолчанию в /marketing.
  void router.push('/marketing')
}

const onForgotPassword = (): void => {
  // TODO: страница восстановления доступа появится в отдельном этапе.
  console.info('[auth] forgot-password: stub')
}
</script>

<template>
  <section class="login-page" aria-labelledby="login-title">
    <div class="login-page__modal">
      <header class="login-page__header">
        <TirScriptLogo />
        <h1 id="login-title" class="login-page__title">Вход в админку</h1>
      </header>

      <LoginForm @success="onLoginSuccess" @forgot-password="onForgotPassword" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 16px;

  &__modal {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 392px;
    padding: 40px;
    background: var(--bg-base);
    border-radius: 20px;
    box-shadow: 0 1px 2px rgba(39, 45, 55, 0.06);
    box-sizing: border-box;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  &__title {
    margin: 0;
    font-family: 'Roboto', system-ui, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: var(--text-primary);
  }
}
</style>
