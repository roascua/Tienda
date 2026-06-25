import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string | null
  quantity: number
  size: string | null
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'))

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))

  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  function addToCart(product: { id: number; name: string; price: number; image: string | null }, size: string | null = null) {
    const existing = items.value.find(i => i.id === product.id && i.size === size)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1, size })
    }
    save()
  }

  function removeFromCart(id: number, size: string | null = null) {
    const idx = items.value.findIndex(i => i.id === id && i.size === size)
    if (idx !== -1) {
      const item = items.value[idx]
      if (item && item.quantity > 1) {
        item.quantity--
      } else {
        items.value.splice(idx, 1)
      }
    }
    save()
  }

  function clearCart() {
    items.value = []
    save()
  }

  function save() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, clearCart }
})
