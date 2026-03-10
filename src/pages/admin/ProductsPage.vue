<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminProducts } from '@/features/admin-product-management'
import AdminProductTable from '@/widgets/AdminProductTable.vue'

const router = useRouter()
const { products, loading, nextCursor, error, fetchProducts, deleteProduct } = useAdminProducts()

onMounted(fetchProducts)

function goToEdit(id: string) {
  router.push(`/admin/products/${id}`)
}

function goToCreate() {
  router.push('/admin/products/new')
}
</script>

<template>
  <div class="flex flex-col gap-10 max-w-7xl">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-text-main tracking-tight">Товары</h1>
        <p class="text-text-muted text-sm font-medium">Управление ассортиментом продукции</p>
      </div>
      
      <button 
        @click="goToCreate"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" /></svg>
        Добавить товар
      </button>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-12 card border-red-100 bg-red-50/30 text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
         <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h2 class="text-lg font-bold text-text-main mb-2">Произошла ошибка</h2>
      <p class="text-sm text-red-600 mb-8 font-medium">{{ error }}</p>
      <button @click="() => fetchProducts()" class="px-6 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-bold transition-all cursor-pointer">Попробовать снова</button>
    </div>

    <!-- Content -->
    <div v-else class="animate-fade-in-up space-y-8">
       <AdminProductTable 
        :products="products" 
        :loading="loading && products.length === 0"
        @edit="goToEdit"
        @delete="deleteProduct"
      />

      <!-- Pagination -->
      <div v-if="nextCursor" class="flex justify-center pb-10">
        <button 
          @click="() => fetchProducts(true)"
          :disabled="loading"
          class="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-text-main rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <div v-if="loading" class="w-4 h-4 border-2 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          <span>{{ loading ? 'Загрузка...' : 'Загрузить ещё' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
