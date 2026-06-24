import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home.vue'
import CatalogoView from '@/pages/catalogo.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalogo', name: 'catalogo', component: CatalogoView },
    {
      path: '/admin',
      redirect: '/admin/productos',
      component: () => import('@/component/admin/AppAdmin.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: 'productos', name: 'admin-productos', component: () => import('@/pages/admin/ProductosView.vue') },
        { path: 'productos/nuevo', name: 'admin-producto-nuevo', component: () => import('@/pages/admin/ProductoFormView.vue') },
        { path: 'productos/:id', name: 'admin-producto-editar', component: () => import('@/pages/admin/ProductoFormView.vue') },
      ],
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/pages/admin/LoginView.vue'),
    },
  ],
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    if (!auth.checkToken()) {
      return next('/admin/login')
    }
  }
  next()
})

export default router
