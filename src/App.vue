<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark } = useDarkMode()
</script>

<template>
  <div :class="{ 'dark': isDark }">
    <Toast position="top-right" />
    <ConfirmDialog />
    <router-view v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>