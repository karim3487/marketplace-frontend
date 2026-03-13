<script setup lang="ts">
import { formatPrice, getCurrencySymbol } from '@/shared/lib/currency'
import type { ProductResponse } from '@/shared/api/generated'

defineProps<{
  products: ProductResponse[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

</script>

<template>
  <div class="card overflow-hidden">
    <div v-if="loading && products.length === 0" class="py-20 flex flex-col items-center justify-center gap-4">
       <div class="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
       <p class="text-xs text-text-muted font-bold uppercase tracking-widest">Загрузка данных...</p>
    </div>

    <div v-else-if="products.length === 0" class="py-20 flex flex-col items-center text-center">
       <div class="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
       </div>
       <p class="text-text-muted text-sm font-medium">Товары не найдены. Время добавить что-то новое.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-100 bg-slate-50/50">
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Товар</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Цена</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Склад</th>
            <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="product in products" :key="product.id" class="group hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shrink-0">
                  <img v-if="product.thumbnail_url" :src="product.thumbnail_url" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <div class="flex flex-col min-w-0">
                   <span class="font-semibold text-text-main truncate">{{ product.name }}</span>
                   <span class="text-[10px] text-text-muted font-mono leading-none mt-1">{{ product.id }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-baseline gap-1">
                 <span class="text-sm font-bold text-text-main">{{ formatPrice(product.price.amount) }}</span>
                 <span class="text-xs text-text-muted font-semibold underline underline-offset-2 decoration-slate-200 decoration-1">{{ getCurrencySymbol(product.price.currency) }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div 
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border"
                :class="[
                  (product.stock ?? 0) > 5
                    ? 'bg-green-50 text-green-700 border-green-100' 
                    : (product.stock ?? 0) > 0
                      ? 'bg-amber-50 text-amber-700 border-amber-100'
                      : 'bg-red-50 text-red-700 border-red-100'
                ]"
              >
                <div class="w-1 h-1 rounded-full" :class="(product.stock ?? 0) > 5 ? 'bg-green-500' : (product.stock ?? 0) > 0 ? 'bg-amber-500' : 'bg-red-500'"></div>
                {{ product.stock ?? 0 }} шт.
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="emit('edit', product.id)"
                  class="p-2 text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer"
                  title="Редактировать"
                >
                  <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  @click="emit('delete', product.id)"
                  class="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                  title="Удалить"
                >
                  <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
