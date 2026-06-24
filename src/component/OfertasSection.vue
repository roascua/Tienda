<script setup lang="ts">
const ofertas = [
  {
    src: 'https://saphirus.com.ar/wp-content/uploads/2022/04/saphirus-familia-olfativa-linah.jpg',
    alt: 'Perfume Saphirus',
    large: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=700&fit=crop&q=80',
    alt: 'Zapatos de colección',
    large: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop&q=80',
    alt: 'Accesorios premium',
    large: false,
  },
  {
    src: 'https://image.made-in-china.com/202f0j00BGoqTakyVzgt/Factory-Lingerie-Set-Pijama-Mujer-Sexy-Party-Four-PCS-Sets-Satin-Silk-Women-s-Pajama-for-Woman-Nightwear.webp',
    alt: 'Oferta especial',
    large: false,
  },
]
</script>

<template>
  <section id="ofertas" class="relative py-24 px-6 bg-gradient-to-b from-[#fff8f9] via-[#fce8ec] to-[#fff8f9]">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
        Ofertas Especiales
      </h2>
      <p class="text-center text-gray-500 mb-16 text-lg">
        Descubrí nuestras mejores ofertas en fragancias y accesorios
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div
          v-for="(item, index) in ofertas"
          :key="index"
          class="group relative overflow-hidden rounded-2xl shadow-md"
          :class="item.large ? 'md:row-span-2 min-h-[400px] md:min-h-[500px]' : 'min-h-[250px] md:min-h-[300px]'"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <span
              class="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-white/40 backdrop-blur-sm text-gray-800 border border-white/60"
            >
              Hasta 50% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
