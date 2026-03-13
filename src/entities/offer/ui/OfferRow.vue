<script setup lang="ts">
import type { OfferResponse } from '@/shared/api/generated'
import { getCurrencySymbol, formatPrice } from '@/shared/lib/currency'
import TechIdBadge from '@/shared/ui/TechIdBadge.vue'

defineProps<{
  offer: OfferResponse
}>()

const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <div
    class="card flex items-center justify-between p-5 group hover:border-primary/30 cursor-pointer"
  >
    <!-- Seller info -->
    <div class="flex flex-col gap-1.5">
      <div class="flex items-center gap-2.5">
        <span
          class="text-sm font-semibold text-text-main group-hover:text-primary transition-colors"
          >{{ offer.seller.name }}</span
        >
        <div
          class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-100 rounded-md"
        >
          <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-xs font-semibold text-amber-700">{{ offer.seller.rating }}</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5 text-xs text-text-muted">
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span
          >Доставка:
          <strong class="text-text-main font-medium">{{
            formatDate(offer.delivery_date)
          }}</strong></span
        >
      </div>

      <!-- Offer ID -->
      <div class="mt-0.5">
        <TechIdBadge :id="offer.id" />
      </div>
    </div>

    <!-- Price & Action -->
    <div class="flex items-center gap-5">
      <div class="text-right">
        <div class="flex items-baseline gap-1">
          <span class="text-xl font-bold text-text-main">{{
            formatPrice(offer.price.amount)
          }}</span>
          <span class="text-sm text-text-muted font-medium">{{
            getCurrencySymbol(offer.price.currency)
          }}</span>
        </div>
      </div>
      <button
        class="px-5 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wide rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
      >
        Заказать
      </button>
    </div>
  </div>
</template>
