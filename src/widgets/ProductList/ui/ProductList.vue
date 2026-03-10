<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import { ref } from "vue";
import { api } from "@/shared/api/api-client";
import type { ProductListItem } from "@/shared/api/generated";
import { formatPrice, getCurrencySymbol } from '@/shared/lib/currency';

const emit = defineEmits<{
  (e: "select-product", id: string): void;
}>();

const items = ref<ProductListItem[]>([]);
const loading = ref(false);
const finished = ref(false);
const offset = ref(0);
const limit = 12;

const formatDeliveryDate = (dateStr: string | null | undefined): string | null => {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.getTime() === today.getTime()) return "Сегодня";
  if (d.getTime() === tomorrow.getTime()) return "Завтра";

  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
};

const stockLabel = (stock: number): { text: string; type: string } => {
  if (stock === 0) return { text: "Нет в наличии", type: "danger" };
  if (stock <= 5) return { text: `Осталось ${stock} шт.`, type: "warning" };
  return { text: `В наличии`, type: "success" };
};

const fetchProducts = async () => {
  if (loading.value || finished.value) return;

  loading.value = true;
  try {
    const response = await api.public.getProductsApiV1PublicProductsGet(limit, offset.value);
    items.value.push(...response.items);
    offset.value += limit;
    if (response.items.length < limit) {
      finished.value = true;
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    finished.value = true;
  } finally {
    loading.value = false;
  }
};

// Initial load
fetchProducts();

// Infinite scroll
useInfiniteScroll(
  window,
  () => {
    fetchProducts();
  },
  { distance: 300 }
);
</script>

<template>
  <div class="product-list-widget">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div
        v-for="(product, index) in items"
        :key="product.id"
        class="card cursor-pointer overflow-hidden group"
        :style="{ animationDelay: `${(index % limit) * 60}ms` }"
        :class="{ 'animate-fade-in-up': true }"
        @click="emit('select-product', product.id)"
      >
        <!-- Image -->
        <div class="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img
            v-if="product.thumbnail_url"
            :src="product.thumbnail_url"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <!-- Stock badge -->
          <div class="absolute top-3 left-3">
            <span
              class="badge"
              :class="{
                'badge-success': stockLabel(product.stock).type === 'success',
                'badge-warning': stockLabel(product.stock).type === 'warning',
                'badge-danger': stockLabel(product.stock).type === 'danger',
              }"
            >
              {{ stockLabel(product.stock).text }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h3 class="text-sm font-semibold text-text-main leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {{ product.name }}
          </h3>

          <!-- Price -->
          <div class="flex items-end justify-between gap-2">
            <div>
              <span class="text-lg font-bold text-text-main">
                {{ formatPrice(product.price.amount) }}
              </span>
                <span class="text-xs font-semibold text-text-muted group-hover:text-primary-hover transition-colors ml-1">
                  {{ getCurrencySymbol(product.price.currency) }}
                </span>
            </div>
          </div>

          <!-- Delivery date -->
          <div v-if="formatDeliveryDate(product.nearest_delivery_date)" class="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Доставка: <strong class="text-text-main font-medium">{{ formatDeliveryDate(product.nearest_delivery_date) }}</strong></span>
          </div>
        </div>
      </div>

      <!-- Skeleton Loading -->
      <template v-if="loading">
        <div v-for="i in 12" :key="'skeleton-' + i" class="card overflow-hidden animate-pulse">
          <div class="aspect-[4/3] bg-slate-100"></div>
          <div class="p-4">
            <div class="h-4 bg-slate-100 rounded w-3/4 mb-3"></div>
            <div class="h-5 bg-slate-100 rounded w-1/3 mb-2"></div>
            <div class="h-3 bg-slate-100 rounded w-1/2"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- End of list -->
    <div v-if="finished && items.length > 0" class="mt-12 text-center">
      <span class="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-text-muted text-xs font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Вы просмотрели все товары
      </span>
    </div>

    <!-- Empty state -->
    <div v-if="!loading && items.length === 0 && finished" class="mt-16 text-center">
      <div class="w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p class="text-text-muted font-medium">Товары не найдены</p>
    </div>
  </div>
</template>
