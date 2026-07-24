<script setup lang="ts">
defineOptions({ name: 'AppNavbar' })
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useDarkMode } from '@/composables/useDarkMode'
import { ref } from 'vue'

const router = useRouter()
const cartStore = useCartStore()
const cartOpen = ref(false)
const { isDark, toggleDark } = useDarkMode()

function scrollToOfertas() {
  router.push('/')
  setTimeout(() => {
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white/20 dark:bg-[#1a1115]/80 backdrop-blur-sm border-b border-black/5 dark:border-white/5">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

      <div class="flex items-center gap-1">
        <router-link to="/">
          <Button label="Inicio" text style="color: inherit; text-decoration: none;" class="hover:text-rose-500" />
        </router-link>
        <Button label="Ofertas" text style="color: inherit; text-decoration: none;" class="hover:text-rose-500" @click="scrollToOfertas" />

        <button class="ml-2 p-2 rounded-lg text-gray-500 hover:text-[#1f151b] hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors" @click="toggleDark" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
          <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <button class="ml-1 p-2 rounded-lg text-gray-500 hover:text-[#1f151b] hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors relative" @click="cartOpen = !cartOpen">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <span v-if="cartStore.totalItems > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
            {{ cartStore.totalItems > 9 ? '9+' : cartStore.totalItems }}
          </span>
        </button>
      </div>
    </div>

    <Transition name="cart-panel">
      <div v-if="cartOpen" class="absolute top-full right-0 m-2 w-80 bg-white dark:bg-[#2a1a20] border border-rose-200 dark:border-rose-800/30 rounded-2xl shadow-xl p-4 z-50">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-semibold text-[#1f151b]">Carrito ({{ cartStore.totalItems }})</span>
          <button class="text-xs text-gray-400 hover:text-rose-500 transition-colors" @click="cartOpen = false">Cerrar</button>
        </div>
        <div v-if="cartStore.items.length === 0" class="text-sm text-gray-400 text-center py-6">
          El carrito está vacío.
        </div>
        <div v-else class="space-y-2 max-h-64 overflow-y-auto">
          <div v-for="item in cartStore.items" :key="item.id + (item.size || '')" class="flex items-center gap-3 py-2 border-b border-rose-100 dark:border-rose-800/20 last:border-0">
            <img :src="item.image || ''" :alt="item.name" class="w-10 h-10 rounded-lg object-cover shrink-0" loading="lazy" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-[#1f151b] truncate">{{ item.name }}</p>
              <p class="text-xs text-gray-400">{{ item.size ? `Talle ${item.size} · ` : '' }}{{ item.quantity }}x $ {{ item.price.toLocaleString('es-AR') }}</p>
            </div>
            <button class="text-gray-400 hover:text-red-500 transition-colors shrink-0" @click="cartStore.removeFromCart(item.id, item.size)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="cartStore.items.length > 0" class="mt-3 pt-3 border-t border-rose-100 dark:border-rose-800/20">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-semibold text-[#1f151b]">Total</span>
            <span class="text-sm font-bold text-rose-600">$ {{ cartStore.totalPrice.toLocaleString('es-AR') }}</span>
          </div>
          <button class="w-full py-2 rounded-xl text-sm font-semibold bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors">
            Finalizar compra
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.cart-panel-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cart-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.cart-panel-enter-from,
.cart-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
</style>