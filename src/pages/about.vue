<script setup lang="ts">
defineOptions({ name: 'AboutPage' })
import { useHead } from '@unhead/vue'
import Navbar from '@/component/navbar.vue'

useHead({
  title: 'Nosotros - Saphirus Tienda',
  meta: [
    { name: 'description', content: 'Conocé Saphirus, tu tienda de ropa interior, pijamas y pantuflas.' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-[#fff8f9]">
    <Navbar />
    <div class="pt-20 pb-16 px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-[#1f151b] tracking-tight">Nosotros</h1>
        <p class="text-gray-500 mt-4 text-lg">Conocé más sobre Saphirus.</p>
      </div>
    </div>
  </div>
</template>
