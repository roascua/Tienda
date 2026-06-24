<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-[#3B2A35]">Productos</h1>
        <p class="text-sm text-gray-400 mt-0.5">
          {{ products.length }} producto{{ products.length !== 1 ? 's' : '' }}
          <span v-if="error" class="text-red-400 ml-2">{{ error }}</span>
        </p>
      </div>
      <router-link
        to="/admin/productos/nuevo"
        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-[#3B2A35] text-white hover:bg-[#4a3a45] transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Nuevo producto
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-20 text-sm text-gray-400">Cargando productos…</div>

    <div v-else-if="products.length === 0" class="text-center py-20 text-sm text-gray-400">
      No hay productos todavía. Creá el primero.
    </div>

    <div v-else class="bg-white/80 backdrop-blur-sm border border-rose-200/30 rounded-2xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-rose-100 text-left text-xs text-gray-400 uppercase tracking-wider">
            <th class="px-4 py-3 font-medium">Producto</th>
            <th class="px-4 py-3 font-medium">Marca</th>
            <th class="px-4 py-3 font-medium">Categoría</th>
            <th class="px-4 py-3 font-medium">Precio</th>
            <th class="px-4 py-3 font-medium">Dto.</th>
            <th class="px-4 py-3 font-medium">Estado</th>
            <th class="px-4 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in products"
            :key="p.id"
            class="border-b border-rose-50 hover:bg-rose-50/30 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  v-if="p.image"
                  :src="p.image"
                  :alt="p.name"
                  class="w-10 h-10 rounded-lg object-cover shrink-0 bg-rose-100"
                />
                <div v-else class="w-10 h-10 rounded-lg bg-rose-100 shrink-0 flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="font-medium text-[#3B2A35]">{{ p.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ p.brand }}</td>
            <td class="px-4 py-3 text-gray-600">{{ p.category }}</td>
            <td class="px-4 py-3 font-medium text-[#3B2A35]">$ {{ p.price.toLocaleString('es-AR') }}</td>
            <td class="px-4 py-3">
              <span v-if="p.discount" class="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">-{{ p.discount }}%</span>
              <span v-else class="text-gray-300">—</span>
            </td>
            <td class="px-4 py-3">
              <span
                class="px-2 py-0.5 rounded-full text-xs font-medium"
                :class="p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
              >
                {{ p.status === 'published' ? 'Publicado' : 'Borrador' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <router-link
                  :to="`/admin/productos/${p.id}`"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Editar
                </router-link>
                <button
                  class="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                  @click="handleDelete(p.id, p.name)"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'

const { products, loading, error, loadAll, remove } = useProductsStore()

onMounted(() => {
  loadAll()
})

async function handleDelete(id: number, name: string) {
  if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
  await remove(id)
}
</script>
