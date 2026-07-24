<script setup lang="ts">
defineOptions({ name: 'CatalogoPage' })
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import Navbar from '@/component/navbar.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const productStore = useProductsStore()
const cartStore = useCartStore()
const toast = useToast()

interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  image: string | null
  isNew: boolean
  discount: number | null
}

const FALLBACK_IMAGE = 'https://picsum.photos/seed/placeholder/600/800'
const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const

const mockProducts: Product[] = [
  { id: 1,  name: 'Baby Doll Encaje',          brand: 'Saphirus', category: 'Ropa Interior', price: 18900,  image: 'https://picsum.photos/seed/babydoll/600/800', isNew: true,  discount: null },
  { id: 2,  name: 'Pijama Satín',              brand: 'Saphirus', category: 'Pijamas',      price: 25900,  image: 'https://picsum.photos/seed/pijamasatin/600/800', isNew: false, discount: null },
  { id: 3,  name: 'Conjunto Encaje Negro',     brand: 'Tienda',    category: 'Ropa Interior', price: 21500,  image: 'https://picsum.photos/seed/encajenegro/600/800', isNew: false, discount: 15 },
  { id: 4,  name: 'Pantuflas Soft',            brand: 'Saphirus', category: 'Pantuflas',    price: 12900,  image: 'https://picsum.photos/seed/pantuflassoft/600/800', isNew: false, discount: null },
  { id: 5,  name: 'Camisón Tul',               brand: 'Tienda',    category: 'Pijamas',      price: 29900,  image: 'https://picsum.photos/seed/camison/600/800', isNew: true,  discount: null },
  { id: 6,  name: 'Bralette Algodón',          brand: 'Tienda',    category: 'Ropa Interior', price: 14900,  image: 'https://picsum.photos/seed/bralette/600/800', isNew: false, discount: null },
  { id: 7,  name: 'Pijama Corto',              brand: 'Tienda',    category: 'Pijamas',      price: 19900,  image: 'https://picsum.photos/seed/pijamacorto/600/800', isNew: false, discount: null },
  { id: 8,  name: 'Pantys Encaje',             brand: 'Saphirus', category: 'Ropa Interior', price: 8900,   image: 'https://picsum.photos/seed/pantys/600/800', isNew: false, discount: null },
  { id: 9,  name: 'Bata Satín',                brand: 'Tienda',    category: 'Pijamas',      price: 34900,  image: 'https://picsum.photos/seed/batasatin/600/800', isNew: false, discount: 10 },
  { id: 10, name: 'Zapatillas Peluche',         brand: 'Tienda',    category: 'Pantuflas',    price: 15900,  image: 'https://picsum.photos/seed/zapatillas/600/800', isNew: false, discount: null },
  { id: 11, name: 'Conjunto Satén',             brand: 'Saphirus', category: 'Ropa Interior', price: 23900,  image: 'https://picsum.photos/seed/saten/600/800', isNew: true,  discount: null },
  { id: 12, name: 'Pantuflas Bambi',            brand: 'Tienda',    category: 'Pantuflas',    price: 13900,  image: 'https://picsum.photos/seed/bambi/600/800', isNew: false, discount: null },
]

const products = ref<Product[]>(mockProducts)
const loadingCatalog = ref(true)

onMounted(async () => {
  try {
    await productStore.loadPublished()
    if (productStore.products.length > 0) {
      products.value = productStore.products.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: p.price,
        image: p.image || FALLBACK_IMAGE,
        isNew: p.isNew,
        discount: p.discount,
      }))
    }
  } catch {
    // fallback a mock
  }
  loadingCatalog.value = false
  await nextTick()
  observeCards()
})

type FilterEntry = { brand: string; category: string }

const brandCategories = computed(() => {
  const map: Record<string, string[]> = {}
  for (const p of products.value) {
    if (!map[p.brand]) map[p.brand] = []
    const arr = map[p.brand]!
    if (!arr.includes(p.category)) arr.push(p.category)
  }
  return map
})

const searchQuery = ref('')
const sortBy = ref('')
const showFilters = ref(false)
const expandedBrands = ref<string[]>([])
const selectedFilters = ref<FilterEntry[]>([])
const filterRef = ref<HTMLElement | null>(null)
const activeSizeSelector = ref<number | null>(null)

const activeFiltersCount = computed(() => selectedFilters.value.length)

// --- Sincronización con la URL (búsqueda + filtros), con debounce ---

function encodeFilters(filters: FilterEntry[]) {
  return filters.map(f => `${f.brand}|${f.category}`).join(',')
}

function decodeFilters(raw: string): FilterEntry[] {
  return raw
    .split(',')
    .filter(Boolean)
    .map(pair => {
      const [brand = '', category = ''] = pair.split('|')
      return { brand, category }
    })
    .filter(f => f.brand && f.category)
}

let syncTimer: ReturnType<typeof setTimeout> | undefined

function syncQueryToUrl() {
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(() => {
    router.replace({
      query: {
        q: searchQuery.value || undefined,
        filtros: selectedFilters.value.length ? encodeFilters(selectedFilters.value) : undefined,
      },
    })
  }, 250)
}

watch(searchQuery, syncQueryToUrl)
watch(selectedFilters, syncQueryToUrl, { deep: true })

onMounted(() => {
  if (route.query.q) searchQuery.value = route.query.q as string
  if (route.query.filtros) {
    selectedFilters.value = decodeFilters(route.query.filtros as string)
  } else if (route.query.marca) {
    const brand = route.query.marca as string
    const cats = brandCategories.value[brand] || []
    selectedFilters.value = cats.map(category => ({ brand, category }))
  }
})

// --- Filtros ---

function toggleBrandExpand(brand: string) {
  const i = expandedBrands.value.indexOf(brand)
  i === -1 ? expandedBrands.value.push(brand) : expandedBrands.value.splice(i, 1)
}

function toggleFilter(brand: string, category: string) {
  const idx = selectedFilters.value.findIndex(f => f.brand === brand && f.category === category)
  idx === -1 ? selectedFilters.value.push({ brand, category }) : selectedFilters.value.splice(idx, 1)
}

function isSelected(brand: string, category: string) {
  return selectedFilters.value.some(f => f.brand === brand && f.category === category)
}

function clearFilters() {
  selectedFilters.value = []
}

function removeFilter(brand: string, category: string) {
  const idx = selectedFilters.value.findIndex(f => f.brand === brand && f.category === category)
  if (idx !== -1) selectedFilters.value.splice(idx, 1)
}

// Cuántos productos hay para esa combinación marca+categoría, respetando la búsqueda activa.
// (Los filtros son OR entre sí, así que no tiene sentido cruzarlos acá: un producto que
// cumple esta combinación ya cuenta sin importar qué otra cosa esté tildada.)
function dynamicCount(brand: string, category: string) {
  return products.value.filter(p => {
    if (p.brand !== brand || p.category !== category) return false
    if (searchQuery.value && !p.name.toLowerCase().includes(searchQuery.value.toLowerCase())) return false
    return true
  }).length
}

const filteredProducts = computed(() => {
  const result = products.value.filter(p => {
    if (searchQuery.value && !p.name.toLowerCase().includes(searchQuery.value.toLowerCase())) return false
    if (selectedFilters.value.length === 0) return true
    return selectedFilters.value.some(f => f.brand === p.brand && f.category === p.category)
  })

  if (sortBy.value === 'price-asc') result.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') result.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'name') result.sort((a, b) => a.name.localeCompare(b.name))

  return result
})

function clearAll() {
  clearFilters()
  searchQuery.value = ''
}

// --- Animación de entrada al hacer scroll ---
const observedCards = new WeakSet<Element>()
let cardObserver: IntersectionObserver | null = null

function observeCards() {
  if (!cardObserver) {
    cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          cardObserver!.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
  }
  document.querySelectorAll('.product-card').forEach((el) => {
    if (!observedCards.has(el)) {
      observedCards.add(el)
      cardObserver!.observe(el)
    }
  })
}

watch(filteredProducts, () => {
  nextTick(() => observeCards())
})

// --- Cerrar paneles flotantes al clickear afuera ---

function onClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (filterRef.value && !filterRef.value.contains(target)) {
    showFilters.value = false
  }
  if (!target.closest('[data-size-popover]')) {
    activeSizeSelector.value = null
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
  cardObserver?.disconnect()
})

function formatPrice(n: number) {
  return '$ ' + Math.round(n).toLocaleString('es-AR')
}

function goToProduct(id: number) {
  router.push(`/producto/${id}`)
}

function onImageError(e: Event) {
  const img = e.target as HTMLImageElement
  if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE
}

// --- Carrito ---

function toggleSizeSelector(e: Event, productId: number) {
  e.stopPropagation()
  activeSizeSelector.value = activeSizeSelector.value === productId ? null : productId
}

function selectSize(e: Event, product: Product, size: string) {
  e.stopPropagation()
  addToCart(product, size)
  activeSizeSelector.value = null
}

function addToCart(product: Product, size: string) {
  cartStore.addToCart(
    {
      id: product.id,
      name: product.name,
      price: product.discount ? product.price - (product.price * product.discount) / 100 : product.price,
      image: product.image || FALLBACK_IMAGE,
    },
    size,
  )
  toast.add({
    severity: 'success',
    summary: 'Agregado',
    detail: `${product.name} · Talle ${size}`,
    life: 2000,
  })
}

useHead({
  title: 'Catálogo - Saphirus Tienda',
  meta: [
    { name: 'description', content: 'Explorá nuestro catálogo de ropa interior, pijamas y pantuflas.' },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-[#fff8f9]">
    <Navbar />

    <div class="pt-20 pb-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-[#1f151b] tracking-tight">Catálogo</h1>
            <p class="text-gray-400 mt-1 text-sm">
              <template v-if="loadingCatalog">
                Cargando...
              </template>
              <template v-else>
                {{ filteredProducts.length }} producto{{ filteredProducts.length !== 1 ? 's' : '' }}
                <span v-if="activeFiltersCount > 0" class="text-rose-400"> · {{ activeFiltersCount }} filtro{{ activeFiltersCount !== 1 ? 's' : '' }}</span>
              </template>
            </p>
            <div v-if="activeFiltersCount > 0" class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="f in selectedFilters"
                :key="f.brand + f.category"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-100/70 text-rose-700"
              >
                {{ f.brand }}: {{ f.category }}
                <button class="hover:text-rose-900 transition-colors" @click="removeFilter(f.brand, f.category)">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <div ref="filterRef" class="relative flex flex-wrap items-center gap-2">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-rose-200/40 bg-white/60 text-[#3b2a35] hover:border-rose-300 transition-all"
              :class="{ 'border-rose-300 bg-rose-50/50': showFilters }"
              @click="showFilters = !showFilters"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
              <span v-if="activeFiltersCount > 0" class="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">{{ activeFiltersCount }}</span>
            </button>

            <Transition name="filter-panel">
              <div v-if="showFilters" class="absolute top-full left-0 mt-2 w-72 z-30 bg-white/90 dark:bg-[#2a1a20]/90 backdrop-blur-xl border border-rose-200/40 dark:border-rose-800/30 rounded-2xl shadow-xl p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-semibold text-[#3b2a35] uppercase tracking-wider">Marca</span>
                  <button v-if="activeFiltersCount > 0" class="text-[10px] text-rose-600 hover:text-rose-700 underline underline-offset-2" @click="clearFilters()">Limpiar</button>
                </div>
                <div v-for="(cats, brand) in brandCategories" :key="brand" class="mb-1.5 last:mb-0">
                  <button
                    class="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-[#1f151b] hover:bg-rose-50/60 dark:hover:bg-rose-900/20 transition-colors text-left"
                    @click="toggleBrandExpand(brand)"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200"
                      :class="expandedBrands.includes(brand) ? 'rotate-90' : ''"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {{ brand }}
                  </button>
                  <div
                    class="accordion-body ml-6 mt-1"
                    :class="expandedBrands.includes(brand) ? 'open' : ''"
                  >
                    <div class="space-y-0.5">
                      <button
                        v-for="cat in cats"
                        :key="cat"
                        class="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-sm transition-colors text-left"
                        :class="isSelected(brand, cat) ? 'text-rose-700 font-medium' : 'text-gray-600 hover:text-gray-800 hover:bg-rose-50/40 dark:hover:bg-rose-900/20'"
                        @click="toggleFilter(brand, cat)"
                      >
                        <span
                          class="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
                          :class="isSelected(brand, cat) ? 'border-rose-500 bg-rose-500' : 'border-gray-300'"
                        >
                          <svg v-if="isSelected(brand, cat)" class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span class="flex-1">{{ cat }}</span>
                        <span class="text-[10px] text-gray-400">{{ dynamicCount(brand, cat) }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <div class="relative ml-auto">
              <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar..."
                class="w-32 lg:w-40 pl-8 pr-2.5 py-1.5 text-xs bg-white/70 dark:bg-[#2a1a20]/70 border border-rose-200/40 dark:border-rose-800/30 rounded-full outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
              />
            </div>

            <select
              v-model="sortBy"
              class="text-xs bg-white/70 dark:bg-[#2a1a20]/70 border border-rose-200/40 dark:border-rose-800/30 rounded-full px-3 py-1.5 outline-none focus:border-rose-300 transition-colors text-[#1f151b]"
            >
              <option value="">Ordenar</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="name">A-Z</option>
            </select>
          </div>
        </div>

        <!-- Loading skeletons -->
        <div v-if="loadingCatalog" class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="bg-white/50 dark:bg-[#2a1a20]/50 border border-rose-200/30 dark:border-rose-800/20 rounded-2xl overflow-hidden">
            <div class="aspect-[3/4] bg-rose-100/50 dark:bg-rose-900/20 skeleton-pulse" />
            <div class="p-4 space-y-3">
              <div class="h-3 w-1/3 bg-rose-100/50 dark:bg-rose-900/20 rounded skeleton-pulse" />
              <div class="h-5 w-3/4 bg-rose-100/50 dark:bg-rose-900/20 rounded skeleton-pulse" />
              <div class="h-5 w-1/3 bg-rose-100/50 dark:bg-rose-900/20 rounded skeleton-pulse" />
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            class="product-card group relative bg-white/70 dark:bg-[#2a1a20]/50 backdrop-blur-sm border border-rose-200/30 dark:border-rose-800/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-rose-900/10 transition-all duration-500 cursor-pointer"
            :style="{ transitionDelay: (index % 6) * 0.06 + 's' }"
            @click="goToProduct(product.id)"
          >
            <div class="aspect-[3/4] overflow-hidden relative">
              <img
                :src="product.image || FALLBACK_IMAGE"
                :alt="product.name"
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
                @error="onImageError"
              />

              <div v-if="product.isNew" class="absolute top-3 left-3 z-10">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm text-[#1f151b] border border-white/60">Nuevo</span>
              </div>
              <div v-if="product.discount" class="absolute top-3 right-3 z-10">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/90 text-white">-{{ product.discount }}%</span>
              </div>

              <!-- Botón de agregar al carrito: siempre visible (no depende de hover), funciona en mobile -->
              <div
                class="absolute z-20"
                :style="{ top: product.discount ? '3.5rem' : '0.75rem', right: '0.75rem' }"
                data-size-popover
              >
                <button
                  class="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
                  :aria-expanded="activeSizeSelector === product.id"
                  aria-label="Elegir talle y agregar al carrito"
                  @click="toggleSizeSelector($event, product.id)"
                >
                  <svg class="w-4 h-4 text-[#3B2A35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </button>

                <Transition name="size-popover">
                  <div
                    v-if="activeSizeSelector === product.id"
                    class="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-rose-100 p-2 grid grid-cols-3 gap-1.5"
                    data-size-popover
                    @click.stop
                  >
                    <button
                      v-for="size in SIZES"
                      :key="size"
                      class="py-1.5 text-xs font-medium rounded-lg text-[#1f151b] bg-rose-50 hover:bg-rose-500 hover:text-white transition-colors"
                      @click="selectSize($event, product, size)"
                    >
                      {{ size }}
                    </button>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="p-4">
              <p class="text-xs text-rose-400/80 uppercase tracking-wider mb-1">{{ product.brand }}</p>
              <h3 class="text-base font-semibold text-[#1f151b] mb-1.5">{{ product.name }}</h3>
              <div class="flex items-baseline gap-2">
                <p v-if="product.discount" class="text-base font-bold text-rose-600">{{ formatPrice(product.price - (product.price * product.discount) / 100) }}</p>
                <p class="text-lg font-bold" :class="product.discount ? 'text-gray-400 line-through text-sm' : 'text-[#1f151b]'">{{ formatPrice(product.price) }}</p>
              </div>
              <p class="text-xs text-gray-400 mt-1">3 cuotas sin interés de {{ formatPrice(product.discount ? (product.price - (product.price * product.discount) / 100) / 3 : product.price / 3) }}</p>
            </div>
          </div>
        </div>

        <div v-if="!loadingCatalog && filteredProducts.length === 0" class="text-center mt-20">
          <p class="text-gray-400 text-lg mb-4">No hay productos con esos filtros.</p>
          <button
            v-if="activeFiltersCount > 0 || searchQuery"
            class="px-5 py-2 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
            @click="clearAll"
          >
            Limpiar filtros y búsqueda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.product-card.in-view {
  opacity: 1;
  transform: translateY(0);
}

.accordion-body {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.35s ease, opacity 0.3s ease, margin 0.3s ease;
}
.accordion-body.open {
  max-height: 300px;
  opacity: 1;
}

.filter-panel-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.filter-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.filter-panel-enter-from,
.filter-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

.size-popover-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.size-popover-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.size-popover-enter-from,
.size-popover-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .product-card {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>