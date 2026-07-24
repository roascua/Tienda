<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const productStore = useProductsStore()
const cartStore = useCartStore()
const toast = useToast()

const loading = ref(true)
const selectedSize = ref('M')

const product = computed(() => productStore.current)

const sizes = ['XS', 'S', 'M', 'L', 'XL']

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    router.push('/404')
    return
  }
  await productStore.loadOne(id)
  loading.value = false
  if (!product.value) {
    router.push('/404')
  }
})

useHead({
  title: computed(() => product.value ? `${product.value.name} - Saphirus Tienda` : 'Cargando...'),
})

function formatPrice(n: number) {
  return '$ ' + n.toLocaleString('es-AR')
}

function addToCart() {
  if (!product.value) return
  cartStore.addToCart(
    {
      id: product.value.id,
      name: product.value.name,
      price: product.value.discount
        ? product.value.price - (product.value.price * product.value.discount) / 100
        : product.value.price,
      image: product.value.image,
    },
    selectedSize.value,
  )
  toast.add({
    severity: 'success',
    summary: 'Agregado al carrito',
    detail: `${product.value.name} (${selectedSize.value})`,
    life: 3000,
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#fff8f9]">
    <Navbar />
    <div class="pt-24 pb-16 px-6">
      <div class="max-w-6xl mx-auto">
        <button class="text-sm text-rose-600 hover:text-rose-700 mb-6 inline-flex items-center gap-1" @click="router.back()">
          ← Volver
        </button>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="aspect-[3/4] bg-rose-100/50 rounded-2xl skeleton-pulse" />
          <div class="space-y-4">
            <div class="h-8 w-3/4 bg-rose-100/50 rounded-xl skeleton-pulse" />
            <div class="h-4 w-1/4 bg-rose-100/50 rounded-xl skeleton-pulse" />
            <div class="h-12 w-1/3 bg-rose-100/50 rounded-xl skeleton-pulse" />
            <div class="h-20 w-full bg-rose-100/50 rounded-xl skeleton-pulse" />
          </div>
        </div>

        <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="space-y-3">
            <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-rose-50">
              <img
                :src="product.image || ''"
                :alt="product.name"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div class="md:pt-6">
            <p class="text-xs text-rose-400 uppercase tracking-wider mb-2">{{ product.brand }}</p>
            <h1 class="text-3xl md:text-4xl font-bold text-[#1f151b] mb-3">{{ product.name }}</h1>

            <div class="flex items-baseline gap-3 mb-6">
              <p v-if="product.discount" class="text-3xl font-bold text-rose-600">
                {{ formatPrice(product.price - (product.price * product.discount) / 100) }}
              </p>
              <p class="text-2xl" :class="product.discount ? 'text-gray-400 line-through' : 'font-bold text-[#1f151b]'">
                {{ formatPrice(product.price) }}
              </p>
              <span v-if="product.discount" class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                -{{ product.discount }}%
              </span>
            </div>

            <p class="text-sm text-gray-400 mb-6">
              3 cuotas sin interés de {{ formatPrice(Math.round((product.discount ? (product.price - (product.price * product.discount) / 100) : product.price) / 3) ) }}
            </p>

            <div class="mb-6">
              <p class="text-xs font-semibold text-[#3b2a35] uppercase tracking-wider mb-2">Talle</p>
              <div class="flex gap-2">
                <button
                  v-for="s in sizes"
                  :key="s"
                  class="w-10 h-10 rounded-xl text-sm font-medium border transition-colors"
                  :class="selectedSize === s ? 'bg-[#3B2A35] text-white border-[#3B2A35]' : 'border-rose-200 text-gray-600 hover:border-rose-300'"
                  @click="selectedSize = s"
                >
                  {{ s }}
                </button>
              </div>
            </div>

            <button
              class="w-full py-3 rounded-xl text-sm font-semibold bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors flex items-center justify-center gap-2"
              @click="addToCart"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Agregar al carrito
            </button>

            <div v-if="product.isNew" class="mt-4">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nuevo producto
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
