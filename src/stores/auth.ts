import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginAdmin, logoutAdmin, getToken } from '@/services/directus'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('directus_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      await loginAdmin(email, password)
      const t = await getToken()
      token.value = t
      if (t) localStorage.setItem('directus_token', t)
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Error al iniciar sesión'
      error.value = message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await logoutAdmin()
    } catch {
      // ignore
    }
    token.value = null
    localStorage.removeItem('directus_token')
  }

  function checkToken() {
    const saved = localStorage.getItem('directus_token')
    token.value = saved
    return !!saved
  }

  return { token, loading, error, isAuthenticated, login, logout, checkToken }
})
