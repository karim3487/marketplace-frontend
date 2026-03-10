<script setup lang="ts">
import { ref, watch } from "vue";
import { formatPrice, getCurrencySymbol } from '@/shared/lib/currency';
import type { ProductDetailResponse } from "@/entities/product";
import OfferRow from "@/entities/offer/ui/OfferRow.vue";
import SortControls from "@/features/offers-sorting/ui/SortControls.vue";

defineProps<{
  product: ProductDetailResponse;
}>();

const emit = defineEmits<{
  (e: "sort-change", option: "price" | "delivery_date"): void;
}>();

const sortOption = ref<"price" | "delivery_date">("price");

watch(sortOption, (newVal) => {
  emit("sort-change", newVal);
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
    <!-- Image -->
    <div class="lg:col-span-5">
      <div class="card overflow-hidden aspect-square flex items-center justify-center bg-slate-50 p-8">
        <img
          v-if="product.image_url"
          :src="product.image_url"
          :alt="product.name"
          class="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
        <div v-else class="text-slate-200">
          <svg class="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- Stock info under image -->
      <div class="mt-4 flex items-center gap-3">
        <span
          class="badge"
          :class="(product.stock ?? 0) > 5 ? 'badge-success' : (product.stock ?? 0) > 0 ? 'badge-warning' : 'badge-danger'"
        >
          {{ (product.stock ?? 0) > 0 ? `В наличии: ${product.stock} шт.` : 'Нет в наличии' }}
        </span>
      </div>
    </div>

    <!-- Info & Offers -->
    <div class="lg:col-span-7 flex flex-col gap-8">
      <!-- Title & Price -->
      <div>
        <h1 class="text-3xl font-bold text-text-main leading-tight tracking-tight mb-3">{{ product.name }}</h1>
        <div class="flex items-baseline gap-1.5">
          <span class="text-2xl font-bold text-text-main">{{ formatPrice(product.price.amount) }}</span>
          <span class="text-lg text-text-muted font-medium">{{ getCurrencySymbol(product.price.currency) }}</span>
        </div>
      </div>

      <!-- Attributes -->
      <section v-if="product.attributes?.length">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Характеристики</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="attr in product.attributes"
            :key="attr.key"
            class="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
          >
            <span class="text-xs text-text-muted font-medium">{{ attr.key }}</span>
            <span class="text-sm text-text-main font-semibold">{{ attr.value }}</span>
          </div>
        </div>
      </section>

      <!-- Offers -->
      <section>
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
          <div>
            <h3 class="text-sm font-semibold text-text-main">Предложения продавцов</h3>
            <span class="text-xs text-text-muted">{{ product.offers?.length || 0 }} предложений</span>
          </div>
          <SortControls v-model="sortOption" />
        </div>

        <div class="flex flex-col gap-3">
          <OfferRow
            v-for="offer in product.offers"
            :key="offer.id"
            :offer="offer"
          />

          <div v-if="!product.offers?.length" class="py-12 text-center border border-dashed border-slate-200 rounded-xl">
            <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-sm text-text-muted">Нет предложений от продавцов</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
