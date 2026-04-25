<script setup lang="ts">
import logoUrl from '@/style/img/logo.svg';

/**
 * Логотип TirScript из SVG-ассета.
 */
</script>

<template>
  <div class="tirscript-logo" aria-label="TirScript">
    <img class="tirscript-logo__image" :src="logoUrl" alt="TirScript" />
  </div>
</template>

<style lang="scss" scoped>
.tirscript-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__image {
    display: block;
    width: 100%;
    max-width: 136px;
    height: auto;
  }
}
</style>
