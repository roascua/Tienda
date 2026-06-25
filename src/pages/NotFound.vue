<script setup lang="ts">
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
</script>

<template>
  <div class="min-h-screen bg-[#fff8f9] flex flex-col">
    <Navbar />
    <div class="flex-1 flex items-center justify-center px-6">
      <div class="text-center max-w-md">
        <h1 class="text-8xl font-bold text-rose-200 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-[#1f151b] mb-2">Página no encontrada</h2>
        <p class="text-gray-400 mb-8">La página que buscás no existe o fue movida.</p>
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors"
        >
          Volver al inicio
        </router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>
