<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePublicProductQuery } from "@/entities/product";
import { ProductDetailInfo } from "@/widgets/ProductDetailInfo";

const route = useRoute();
const router = useRouter();
const productId = route.params.id as string;
const offersSort = ref<"price" | "delivery_date">("price");

const {
  data: product,
  isLoading: loading,
  error: queryError,
  refetch,
} = usePublicProductQuery(productId, offersSort);

const error = computed(() => {
  if (!queryError.value) return null;
  const err = queryError.value as { body?: { detail?: string }; message?: string };
  return err.body?.detail || err.message || "Ошибка при загрузке товара";
});

const handleSortChange = (newSort: "price" | "delivery_date") => {
  offersSort.value = newSort;
};
</script>

<template>
  <div class="product-details-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb / Back -->
    <div class="mb-6">
      <button
        @click="router.back()"
        class="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Назад к каталогу
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !product" class="animate-pulse">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="aspect-square bg-slate-100 rounded-2xl"></div>
        <div class="space-y-6 py-4">
          <div class="h-8 bg-slate-100 rounded-lg w-3/4"></div>
          <div class="h-6 bg-slate-100 rounded-lg w-1/2"></div>
          <div class="space-y-3 pt-6">
            <div class="h-5 bg-slate-100 rounded w-full"></div>
            <div class="h-5 bg-slate-100 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-md mx-auto py-20 text-center">
      <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-text-main mb-2">{{ error }}</h2>
      <p class="text-sm text-text-muted mb-6">Не удалось загрузить данные о товаре.</p>
      <button
        @click="refetch()"
        class="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
      >
        Повторить
      </button>
    </div>

    <!-- Content -->
    <div v-else-if="product" class="animate-fade-in-up">
      <ProductDetailInfo
        :product="product"
        @sort-change="handleSortChange"
      />
    </div>
  </div>
</template>
