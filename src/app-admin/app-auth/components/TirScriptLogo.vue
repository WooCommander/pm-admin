<script setup lang="ts">
/**
 * Простой текстовый лого TirScript.
 *
 * По макету — 232×32, шрифт Roboto, вес 500.
 * Когда будет настоящий SVG от дизайнеров — заменим разметку.
 */
</script>

<template>
  <div class="tirscript-logo" aria-label="TirScript">
    <span class="tirscript-logo__mark" aria-hidden="true">&#x25C6;</span>
    <span class="tirscript-logo__text">TirScript</span>
  </div>
</template>

<style lang="scss" scoped>
.tirscript-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 32px;
  font-family: 'Roboto', system-ui, sans-serif;
  color: var(--text-primary);

  &__mark {
    font-size: 24px;
    line-height: 1;
    color: var(--accent, #34538d);
  }

  &__text {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.4px;
  }
}
</style>
