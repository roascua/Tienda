<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'

useHead({
  title: 'Contacto - Saphirus Tienda',
  meta: [
    { name: 'description', content: 'Comunicate con Saphirus. Estamos para ayudarte.' },
  ],
})

const sent = ref(false)

function handleSubmit() {
  sent.value = true
  setTimeout(() => (sent.value = false), 5000)
}
</script>

<template>
  <div class="min-h-screen bg-[#fff8f9]">
    <Navbar />
    <div class="pt-28 pb-20 px-6">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-[#1f151b] mb-2">Contacto</h1>
        <p class="text-gray-400 mb-10">Escribinos y te respondemos a la brevedad.</p>

        <form @submit.prevent="handleSubmit" class="bg-white/60 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-8 shadow-sm space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Nombre</label>
              <input required placeholder="Tu nombre" class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" required placeholder="tu@email.com" class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Mensaje</label>
            <textarea required rows="5" placeholder="Escribí tu mensaje..." class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400 resize-none"></textarea>
          </div>
          <button type="submit" class="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors">
            Enviar mensaje
          </button>
          <p v-if="sent" class="text-sm text-green-600">Mensaje enviado con éxito. Te responderemos pronto.</p>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>
