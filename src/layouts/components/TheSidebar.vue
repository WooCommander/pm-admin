<script setup lang="ts">
/**
 * Сайдбар админки — 224px, две группы пунктов, разделитель между ними.
 * Источник меню — SIDEBAR_MENU из shared/constants.
 * Активный пункт подсвечивается через router-link-active.
 */
import { computed } from 'vue'

import { SIDEBAR_MENU } from '@/shared/constants'

const primaryItems = computed(() =>
  SIDEBAR_MENU.filter((i) => i.group === 'primary'),
)
const adminItems = computed(() =>
  SIDEBAR_MENU.filter((i) => i.group === 'admin'),
)
</script>

<template>
  <aside class="the-sidebar">
    <nav class="the-sidebar__group">
      <router-link
        v-for="item in primaryItems"
        :key="item.key"
        :to="item.path"
        class="the-sidebar__item"
        active-class="the-sidebar__item--active"
      >
        {{ item.title }}
      </router-link>
    </nav>

    <div class="the-sidebar__divider" />

    <nav class="the-sidebar__group">
      <router-link
        v-for="item in adminItems"
        :key="item.key"
        :to="item.path"
        class="the-sidebar__item"
        active-class="the-sidebar__item--active"
      >
        {{ item.title }}
      </router-link>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.the-sidebar {
  width: 224px;
  flex-shrink: 0;
  background: #ffffff;
  border-right: 1px solid #eaeaeb;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  box-sizing: border-box;

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__divider {
    height: 1px;
    background: #eaeaeb;
    margin: 12px 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    color: #272d37;
    font-size: 14px;
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: background-color 0.15s, color 0.15s;

    &:hover {
      background: #f8f6f9;
    }

    &--active {
      background: #f4f4f5;
      color: #21324f;
      font-weight: 500;
      border-left-color: #21324f;
    }
  }
}
</style>
