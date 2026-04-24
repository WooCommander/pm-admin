<script setup lang="ts">
// Этап 1: минимальный root. Роутинг и layouts появятся на этапе 2.
</script>

<template>
  <main class="pm-admin-hello">
    <h1>pm-admin</h1>
    <p>Этап 1 фундамента собран. Дальше — оболочка и роутер.</p>
  </main>
</template>

<style lang="scss" scoped>
.pm-admin-hello {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', system-ui, sans-serif;
  color: #272d37;
  background: #f4f4f5;

  h1 {
    font-size: 32px;
    font-weight: 500;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: #686c73;
    margin: 0;
  }
}
</style>
