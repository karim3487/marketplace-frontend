<script setup lang="ts">
import type { ProductListItem } from '../model/types'

defineProps<{
  product: ProductListItem
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div
    class="glass group relative flex flex-col rounded-2xl p-4 cursor-pointer"
    @click="$emit('click')"
  >
    <div
      class="aspect-square w-full overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center"
    >
      <img
        v-if="product.thumbnail_url"
        :src="product.thumbnail_url"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div v-else class="text-slate-400">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <div class="mt-4 flex flex-col flex-1">
      <h3
        class="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1"
      >
        {{ product.name }}
      </h3>

      <div class="mt-2 flex items-baseline gap-1">
        <span class="text-2xl font-black text-slate-900">
          {{ product.price.amount }}
        </span>
        <span class="text-sm font-medium text-slate-500 uppercase">
          {{ product.price.currency }}
        </span>
      </div>

      <div
        v-if="product.nearest_delivery_date"
        class="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-slate-500"
      >
        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>Доставка к {{ new Date(product.nearest_delivery_date).toLocaleDateString() }}</span>
      </div>
    </div>
  </div>
</template>
