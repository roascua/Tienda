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

<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('dark-mode') === 'true')

watch(isDark, (val) => {
  localStorage.setItem('dark-mode', String(val))
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

if (isDark.value) {
  document.documentElement.classList.add('dark')
}

function toggleDark() {
  isDark.value = !isDark.value
}

defineExpose({ toggleDark, isDark })
</script>
