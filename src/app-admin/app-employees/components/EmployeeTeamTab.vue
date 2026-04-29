<script setup lang="ts">
import { PlusIcon, TrashIcon } from 'tir-style-system/icons/outline'

import type { EmployeeListItemModel } from '../models'

interface Props {
  members: EmployeeListItemModel[]
}

interface Emits {
  (e: 'add'): void
  (e: 'remove', id: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="team-tab">
    <button type="button" class="team-tab__add-btn" @click="emit('add')">
      <PlusIcon class="team-tab__add-icon" />
      <span>Добавить сотрудника</span>
    </button>

    <div class="team-tab__list">
      <div
        v-for="member in members"
        :key="member.id"
        class="team-tab__cell"
      >
        <div class="team-tab__avatar">
          <img
            v-if="member.avatarUrl"
            :src="member.avatarUrl"
            :alt="`${member.firstName} ${member.lastName}`"
            class="team-tab__avatar-img"
          />
          <span
            v-else
            class="team-tab__avatar-initials"
            :style="{ background: member.avatarColor }"
          >
            {{ `${member.firstName[0] ?? ''}${member.lastName[0] ?? ''}`.toUpperCase() }}
          </span>
        </div>

        <div class="team-tab__info">
          <p class="team-tab__name">{{ member.firstName }} {{ member.lastName }}</p>
          <p class="team-tab__role">{{ member.role }}</p>
        </div>

        <button
          type="button"
          class="team-tab__remove-btn"
          :aria-label="`Удалить ${member.firstName} ${member.lastName}`"
          @click.stop="emit('remove', member.id)"
        >
          <TrashIcon class="team-tab__remove-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team-tab {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.125rem;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.25rem 1rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--text-primary, #272d37);
    transition: background 0.12s;

    &:hover {
      background: var(--neutral-5, #f5f5f6);
    }

    &:focus-visible {
      outline: 0.125rem solid var(--text-info, #2a77ef);
      outline-offset: 0.125rem;
    }
  }

  &__add-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__cell {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    height: 4.5rem;
    padding: 0 1.25rem;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: background 0.12s;

    &:hover {
      background: rgba(39, 45, 55, 0.05);

      .team-tab__remove-btn {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  &__avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 0.875rem;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__avatar-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
  }

  &__info {
    flex: 1 0 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    justify-content: center;
  }

  &__name {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: var(--text-primary, #272d37);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__role {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--text-secondary, #686c73);
  }

  &__remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    background: transparent;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    color: var(--text-secondary, #686c73);
    flex-shrink: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s, background 0.12s, color 0.12s;

    &:hover {
      background: var(--neutral-10, #eaeaeb);
      color: var(--text-negative, #ec2e14);
    }

    &:focus-visible {
      opacity: 1;
      pointer-events: auto;
      outline: 0.125rem solid var(--text-info, #2a77ef);
      outline-offset: 0.125rem;
    }
  }

  &__remove-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
