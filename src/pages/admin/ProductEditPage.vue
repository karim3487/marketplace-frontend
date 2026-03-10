<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductQuery, useProductAuditLogsQuery } from '@/entities/product/api/queries'
import {
  useCreateProduct,
  useUpdateProduct,
} from '@/features/admin-product-management/api/mutations'
import { AdminProductForm, AdminOfferManager } from '@/features/admin-product-management'
import { ImageUploader } from '@/features/admin-image-upload'
import AuditLogDetails from '@/entities/product/ui/AuditLogDetails.vue'
import type { ProductCreate, ProductUpdate } from '@/shared/api/generated'

const route = useRoute()
const router = useRouter()
const productId = computed(() => route.params.id as string | undefined)
const isEdit = computed(() => productId.value !== undefined)

const {
  data: product,
  isLoading: productLoading,
  error: productError,
  refetch: fetchProduct,
} = useProductQuery(productId)

const { data: auditLogsData, isLoading: logsLoading } = useProductAuditLogsQuery(productId)
const auditLogs = computed(() => auditLogsData.value || [])

const loading = computed(() => (isEdit.value ? productLoading.value || logsLoading.value : false))
const error = computed(() => (productError.value ? 'Ошибка загрузки данных товара' : null))

const createMutation = useCreateProduct()
const updateMutation = useUpdateProduct()

const actionLoading = computed(
  () => createMutation.isPending.value || updateMutation.isPending.value,
)

async function handleSubmit(data: ProductCreate | ProductUpdate) {
  if (isEdit.value && productId.value) {
    updateMutation.mutate(
      { id: productId.value, data: data as ProductUpdate },
      {
        onSuccess: () => {
          // Manual refetch is handled by mutation's onSuccess invalidation,
          // but we can also perform custom logic here if needed.
        },
      },
    )
  } else {
    createMutation.mutate(data as ProductCreate, {
      onSuccess: (newProduct) => {
        router.push('/admin/products/' + newProduct.id)
      },
    })
  }
}

function handleCancel() {
  router.push('/admin/products')
}
</script>

<template>
  <div class="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <button
        @click="handleCancel"
        class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-text-muted hover:text-text-main hover:border-slate-300 transition-all cursor-pointer"
      >
        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <div class="flex flex-col gap-0.5">
        <span class="text-[10px] font-bold uppercase tracking-wider text-text-muted"
          >Товары / {{ isEdit ? 'Редактирование' : 'Новый товар' }}</span
        >
        <h1 class="text-2xl font-bold text-text-main tracking-tight">
          {{ isEdit ? product?.name || 'Загрузка...' : 'Добавление товара' }}
        </h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Form -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Loading State -->
        <div v-if="loading" class="py-20 flex flex-col items-center gap-4 card">
          <div
            class="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin"
          ></div>
          <span class="text-text-muted font-bold uppercase tracking-widest text-[10px]"
            >Загрузка данных...</span
          >
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="p-10 card border-red-100 bg-red-50/30 text-center">
          <h2 class="text-red-600 font-bold mb-4">{{ error }}</h2>
          <button
            @click="() => fetchProduct()"
            class="px-6 py-2 bg-white border border-red-200 text-red-600 rounded-lg font-bold text-sm transition-all cursor-pointer"
          >
            Попробовать снова
          </button>
        </div>

        <!-- Form Section -->
        <div v-else class="card p-8">
          <div class="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <div class="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 class="text-sm font-bold text-text-main">Основные параметры</h3>
          </div>

          <AdminProductForm
            :initial-data="product"
            :loading="actionLoading"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>

        <!-- Offers Module -->
        <AdminOfferManager
          v-if="isEdit && product"
          :product-id="product.id"
          :offers="product.offers || []"
          @changed="() => fetchProduct()"
        />

        <!-- Audit Logs Module -->
        <div v-if="isEdit" class="card p-8">
          <div class="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <div class="w-1.5 h-6 bg-slate-400 rounded-full"></div>
            <h3 class="text-sm font-bold text-text-main">История изменений</h3>
          </div>
          <div v-if="auditLogs.length > 0" class="space-y-4">
            <AuditLogDetails v-for="log in auditLogs" :key="log.id" :log="log" />
          </div>
          <div v-else class="text-center py-8 text-slate-400 text-sm">
            История изменений пока пуста
          </div>
        </div>
      </div>

      <!-- Right Column: Image -->
      <div class="lg:col-span-1 space-y-8">
        <section v-if="isEdit && product" class="card p-6 h-fit">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-1.5 h-6 bg-secondary rounded-full"></div>
            <h3 class="text-sm font-bold text-text-main">Изображение</h3>
          </div>

          <div class="space-y-6">
            <div
              class="aspect-square rounded-xl border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center p-4"
            >
              <img
                v-if="product.image_url"
                :src="product.image_url"
                class="w-full h-full object-contain"
              />
              <div v-else class="flex flex-col items-center justify-center text-slate-300 gap-3">
                <svg
                  class="w-10 h-10 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-[10px] font-bold uppercase tracking-widest">Нет изображения</span>
              </div>
            </div>

            <ImageUploader :product-id="product.id" @success="() => fetchProduct()" />

            <p
              class="text-[11px] text-text-muted leading-relaxed font-medium bg-slate-50 p-4 rounded-lg border border-slate-100"
            >
              <svg
                class="w-4 h-4 text-primary inline-block mr-1.5 -mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Загрузите изображение высокого разрешения. Оно автоматически оптимизируется для сайта.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
