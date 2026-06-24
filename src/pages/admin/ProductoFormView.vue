<template>
  <div class="p-6 max-w-2xl">
    <div class="mb-6">
      <router-link to="/admin/productos" class="text-xs text-rose-600 hover:text-rose-700 mb-2 inline-block">
        ← Volver a productos
      </router-link>
      <h1 class="text-2xl font-bold text-[#3B2A35]">{{ isEdit ? 'Editar producto' : 'Nuevo producto' }}</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl p-6 shadow-sm space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Nombre</label>
          <input
            v-model="form.name"
            required
            placeholder="Ej: Baby Doll Encaje"
            class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Marca</label>
          <select
            v-model="form.brand"
            required
            class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b]"
          >
            <option value="" disabled>Seleccionar</option>
            <option>Saphirus</option>
            <option>Tienda</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Categoría</label>
          <select
            v-model="form.category"
            required
            class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b]"
          >
            <option value="" disabled>Seleccionar</option>
            <option>Ropa Interior</option>
            <option>Pijamas</option>
            <option>Pantuflas</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Precio ($)</label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            required
            placeholder="18900"
            class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">Descuento (%)</label>
          <input
            v-model.number="form.discount"
            type="number"
            min="0"
            max="100"
            placeholder="0"
            class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
          />
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-[#3B2A35] uppercase tracking-wider mb-1.5">URL de imagen</label>
          <input
            v-model="form.image"
            placeholder="https://picsum.photos/seed/.../600/800"
            class="w-full px-3 py-2 text-sm bg-white/70 border border-rose-200/40 rounded-xl outline-none focus:border-rose-300 transition-colors text-[#1f151b] placeholder:text-gray-400"
          />
          <div v-if="form.image" class="mt-2">
            <img :src="form.image" alt="preview" class="w-20 h-20 rounded-lg object-cover border border-rose-200/40" />
          </div>
        </div>
        <div class="flex items-center gap-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="form.isNew"
              type="checkbox"
              class="w-4 h-4 rounded border-rose-300 text-rose-600 focus:ring-rose-300"
            />
            <span class="text-sm text-[#3B2A35]">Nuevo</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <select
              v-model="form.status"
              class="text-sm bg-white/70 border border-rose-200/40 rounded-xl px-3 py-1.5 outline-none focus:border-rose-300 transition-colors text-[#1f151b]"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </label>
        </div>
      </div>

      <p v-if="store.error" class="text-xs text-red-500">{{ store.error }}</p>

      <div class="flex items-center justify-end gap-3 pt-2">
        <router-link
          to="/admin/productos"
          class="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-rose-50/50 transition-colors"
        >
          Cancelar
        </router-link>
        <button
          type="submit"
          :disabled="store.loading"
          class="px-6 py-2 rounded-xl text-sm font-semibold bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors disabled:opacity-50"
        >
          {{ store.loading ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()

const isEdit = computed(() => !!route.params.id && route.params.id !== 'nuevo')
const productId = computed(() => (isEdit.value ? Number(route.params.id) : null))

const form = reactive({
  name: '',
  brand: '',
  category: '',
  price: 0,
  discount: null as number | null,
  image: '',
  isNew: false,
  status: 'draft',
})

onMounted(async () => {
  if (isEdit.value && productId.value) {
    await store.loadOne(productId.value)
    if (store.current) {
      form.name = store.current.name
      form.brand = store.current.brand
      form.category = store.current.category
      form.price = store.current.price
      form.discount = store.current.discount
      form.image = store.current.image || ''
      form.isNew = store.current.isNew
      form.status = store.current.status
    }
  }
})

async function handleSubmit() {
  const payload = {
    name: form.name,
    brand: form.brand,
    category: form.category,
    price: form.price,
    discount: form.discount || null,
    image: form.image || null,
    isNew: form.isNew,
    status: form.status,
    sort: null,
  }

  if (isEdit.value && productId.value) {
    await store.update(productId.value, payload)
  } else {
    await store.create(payload)
  }

  if (!store.error) {
    router.push('/admin/productos')
  }
}
</script>
