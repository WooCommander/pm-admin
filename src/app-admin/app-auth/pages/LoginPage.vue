<script setup lang="ts">
/**
 * Этап 2: временная заглушка страницы логина.
 * Этап 3: реализация по макету Figma 8-1450 — модалка 392×416,
 *         два инпута 312×56, две кнопки 312×48, mock-сервис login().
 */
</script>

<template>
  <section class="login-stub">
    <h1 class="login-stub__title">Вход в pm-admin</h1>
    <p class="login-stub__message">
      Это заглушка. Полная форма логина появится на этапе 3.
    </p>
  </section>
</template>

<style lang="scss" scoped>
.login-stub {
  width: 392px;
  padding: 48px 40px;
  background: #ffffff;
  border: 1px solid #eaeaeb;
  border-radius: 12px;
  text-align: center;
  box-sizing: border-box;

  &__title {
    margin: 0 0 12px;
    font-size: 24px;
    font-weight: 500;
    color: #272d37;
  }

  &__message {
    margin: 0;
    font-size: 14px;
    color: #686c73;
  }
}
</style>
