import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/home.vue') },
    { path: '/catalogo', name: 'catalogo', component: () => import('@/pages/catalogo.vue') },
    {
      path: '/producto/:id',
      name: 'producto',
      component: () => import('@/pages/ProductoDetail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about.vue'),
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('@/pages/contacto.vue'),
    },
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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
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