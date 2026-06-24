import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchProducts,
  fetchAllProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductItem,
  type ProductInput,
} from '@/services/directus'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductItem[]>([])
  const current = ref<ProductItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const publishedProducts = computed(() => products.value.filter(p => p.status === 'published'))

  async function loadAll() {
    loading.value = true
    error.value = null
    try {
      products.value = await fetchAllProducts()
    } catch (e: any) {
      error.value = e?.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  async function loadPublished() {
    loading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
    } catch (e: any) {
      error.value = e?.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  async function loadOne(id: number) {
    loading.value = true
    error.value = null
    try {
      current.value = await fetchProduct(id)
    } catch (e: any) {
      error.value = e?.message || 'Error al cargar producto'
    } finally {
      loading.value = false
    }
  }

  async function create(data: ProductInput) {
    loading.value = true
    error.value = null
    try {
      const created = await createProduct(data)
      products.value.unshift(created as ProductItem)
      return created
    } catch (e: any) {
      error.value = e?.message || 'Error al crear producto'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function update(id: number, data: Partial<ProductInput>) {
    loading.value = true
    error.value = null
    try {
      const updated = await updateProduct(id, data)
      const idx = products.value.findIndex(p => p.id === id)
      if (idx !== -1) products.value[idx] = updated as ProductItem
      if (current.value?.id === id) current.value = updated as ProductItem
      return updated
    } catch (e: any) {
      error.value = e?.message || 'Error al actualizar producto'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function remove(id: number) {
    loading.value = true
    error.value = null
    try {
      await deleteProduct(id)
      products.value = products.value.filter(p => p.id !== id)
    } catch (e: any) {
      error.value = e?.message || 'Error al eliminar producto'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    current,
    loading,
    error,
    publishedProducts,
    loadAll,
    loadPublished,
    loadOne,
    create,
    update,
    remove,
  }
})
