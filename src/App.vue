<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { directus } from './services/directus'

const mensaje = ref('Cargando...')

onMounted(async () => {
  try {
    const response = await fetch(
      'http://192.168.0.107:8055/server/health'
    )

    const data = await response.json()

    mensaje.value = `Directus conectado: ${data.status}`
  } catch (error) {
    mensaje.value = 'Error conectando con Directus'
    console.error(error)
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <h1 class="text-3xl font-bold">
      {{ mensaje }}
    </h1>
  </div>
</template>