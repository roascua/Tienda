<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-[#1f151b]">Productos</h1>
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

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="flex items-center gap-4 p-4 bg-white/50 dark:bg-[#2a1a20]/50 border border-rose-200/30 dark:border-rose-800/20 rounded-2xl">
        <div class="w-10 h-10 rounded-lg bg-rose-100/50 dark:bg-rose-900/20 skeleton-pulse shrink-0" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-1/3 bg-rose-100/50 dark:bg-rose-900/20 rounded skeleton-pulse" />
          <div class="h-3 w-1/4 bg-rose-100/50 dark:bg-rose-900/20 rounded skeleton-pulse" />
        </div>
      </div>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-20 text-sm text-gray-400">
      No hay productos todavía. Creá el primero.
    </div>

    <div v-else class="bg-white/80 dark:bg-[#2a1a20]/50 backdrop-blur-sm border border-rose-200/30 dark:border-rose-800/20 rounded-2xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-rose-100 dark:border-rose-800/20 text-left text-xs text-gray-400 uppercase tracking-wider">
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
            class="border-b border-rose-50 dark:border-rose-800/10 hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  v-if="p.image"
                  :src="p.image"
                  :alt="p.name"
                  class="w-10 h-10 rounded-lg object-cover shrink-0 bg-rose-100"
                  loading="lazy"
                />
                <div v-else class="w-10 h-10 rounded-lg bg-rose-100 shrink-0 flex items-center justify-center">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span class="font-medium text-[#1f151b]">{{ p.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ p.brand }}</td>
            <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ p.category }}</td>
            <td class="px-4 py-3 font-medium text-[#1f151b]">$ {{ p.price.toLocaleString('es-AR') }}</td>
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
                  class="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                >
                  Editar
                </router-link>
                <button
                  class="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const { products, loading, error, loadAll, remove } = useProductsStore()
const toast = useToast()
const confirm = useConfirm()

onMounted(() => {
  loadAll()
})

function handleDelete(id: number, name: string) {
  confirm.require({
    message: `¿Eliminar "${name}"? Esta acción no se puede deshacer.`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Eliminar',
    rejectClass: 'px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-rose-50/50 transition-colors',
    acceptClass: 'px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors',
    accept: async () => {
      await remove(id)
      toast.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: `"${name}" eliminado correctamente`,
        life: 3000,
      })
    },
  })
}
</script>
