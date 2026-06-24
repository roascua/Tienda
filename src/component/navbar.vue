<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollToOfertas() {
  router.push('/')
  setTimeout(() => {
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-sm border-b border-black/5">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
      <div class="flex gap-1">
        <router-link to="/">
          <Button label="Inicio" text style="color: #000; text-decoration: none;" class="hover:text-rose-500" />
        </router-link>
        <router-link to="/catalogo">
          <Button label="Catálogo" text style="color: #000; text-decoration: none;" class="hover:text-rose-500" />
        </router-link>
        <Button label="Ofertas" text style="color: #000; text-decoration: none;" class="hover:text-rose-500" @click="scrollToOfertas" />
      </div>
    </div>
  </nav>
</template>
