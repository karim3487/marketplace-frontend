import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/features/admin-auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/widgets/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'catalog',
          component: () => import('@/pages/CatalogPage/ui/CatalogPage.vue'),
        },
        {
          path: 'products/:id',
          name: 'product-details',
          component: () => import('@/pages/ProductDetailsPage/ui/ProductDetailsPage.vue'),
        },
      ],
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/pages/admin/LoginPage.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/widgets/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'admin-products' },
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/pages/admin/ProductsPage.vue'),
        },
        {
          path: 'products/new',
          name: 'admin-product-create',
          component: () => import('@/pages/admin/ProductEditPage.vue'),
        },
        {
          path: 'products/:id',
          name: 'admin-product-edit',
          component: () => import('@/pages/admin/ProductEditPage.vue'),
        },
        {
          path: 'sellers',
          name: 'admin-sellers',
          component: () => import('@/pages/admin/SellersPage.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthorized) {
    next({ name: 'admin-login' })
  } else if (to.name === 'admin-login' && authStore.isAuthorized) {
    next({ name: 'admin-products' })
  } else {
    next()
  }
})

export default router
