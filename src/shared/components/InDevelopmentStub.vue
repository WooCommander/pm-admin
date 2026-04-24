<script setup lang="ts">
/**
 * Временная заглушка страницы модуля.
 * Используется на этапе 2, пока у модулей нет реальных страниц.
 */
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="in-dev">
    <div class="in-dev__card">
      <h1 class="in-dev__title">{{ title }}</h1>
      <p class="in-dev__message">Модуль в разработке</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.in-dev {
  min-height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  box-sizing: border-box;

  &__card {
    text-align: center;
  }

  &__title {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 500;
    color: #272d37;
  }

  &__message {
    margin: 0;
    font-size: 16px;
    color: #686c73;
  }
}
</style>
