<script setup lang="ts">
defineOptions({ name: 'HomePage' })
import { useHead } from '@unhead/vue'
import Navbar from '@/component/navbar.vue'
import HeroSection from '@/component/HeroSection.vue'
import OfertasSection from '@/component/OfertasSection.vue'
import Footer from '@/component/footer.vue'

useHead({
  title: 'Saphirus Tienda - Ropa Interior, Pijamas y Pantuflas',
  meta: [
    { name: 'description', content: 'Descubrí la colección exclusiva de Saphirus. Ropa interior, pijamas y pantuflas con la mejor calidad y diseño.' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-[#fff8f9]">
    <Navbar />
    <HeroSection />
    <OfertasSection />
    <Footer />
  </div>
</template>
