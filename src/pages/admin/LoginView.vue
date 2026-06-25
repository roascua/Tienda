<template>
  <div class="min-h-screen bg-[#fff8f9] flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-[#1f151b]">Admin Saphirus</h1>
        <p class="text-sm text-gray-400 mt-1">Ingresá para administrar la tienda</p>
      </div>
      <form @submit.prevent="handleLogin" class="bg-white/80 dark:bg-[#2a1a20]/50 backdrop-blur-sm border border-rose-200/40 dark:border-rose-800/30 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#3b2a35] uppercase tracking-wider mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@ejemplo.com"
            class="w-full px-3 py-2 text-sm bg-white/70 dark:bg-[#1a1115]/70 border border-rose-200/40 dark:border-rose-800/30 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#3b2a35] uppercase tracking-wider mb-1.5">Contraseña</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-3 py-2 text-sm bg-white/70 dark:bg-[#1a1115]/70 border border-rose-200/40 dark:border-rose-800/30 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
          />
        </div>
        <p v-if="auth.error" class="text-xs text-red-500">{{ auth.error }}</p>
        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors disabled:opacity-50"
        >
          {{ auth.loading ? 'Ingresando…' : 'Ingresar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  try {
    await auth.login(email.value, password.value)
    router.push('/admin/productos')
  } catch {
    // error is in auth.error
  }
}
</script>
