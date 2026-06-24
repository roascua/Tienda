<template>
  <div class="min-h-screen bg-[#f8f4f5] flex">
    <aside class="w-60 shrink-0 bg-white border-r border-rose-100 flex flex-col">
      <div class="h-14 flex items-center px-5 border-b border-rose-100">
        <span class="text-sm font-bold text-[#3B2A35] tracking-tight">Saphirus · Admin</span>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        <router-link
          to="/admin/productos"
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
          active-class="bg-rose-100/70 text-rose-700 font-medium"
          :class="{ 'text-gray-600 hover:text-gray-800 hover:bg-rose-50/50': true }"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Productos
        </router-link>
      </nav>
      <div class="p-3 border-t border-rose-100">
        <button
          class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-600 hover:bg-red-50/50 transition-colors"
          @click="handleLogout"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
    <main class="flex-1 min-w-0">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

async function handleLogout() {
  await auth.logout()
  router.push('/admin/login')
}
</script>
