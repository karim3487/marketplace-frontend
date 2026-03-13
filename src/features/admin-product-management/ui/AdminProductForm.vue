<script setup lang="ts">
import { ref } from 'vue'
import { CurrencyCode, type ProductCreate, type ProductUpdate, type ProductResponse, type ProductAttributeCreate } from '@/shared/api/generated'

const props = defineProps<{
  initialData?: ProductResponse
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: ProductCreate | ProductUpdate): void
  (e: 'cancel'): void
}>()

const name = ref(props.initialData?.name || '')
const priceAmount = ref(props.initialData?.price.amount || 0)
const priceCurrency = ref(props.initialData?.price.currency || CurrencyCode.RUB)
const stock = ref(props.initialData?.stock || 0)
const attributes = ref<ProductAttributeCreate[]>(
  props.initialData?.attributes?.map(a => ({ key: a.key, value: a.value })) || []
)

function addAttribute() {
  attributes.value.push({ key: '', value: '' })
}

function removeAttribute(index: number) {
  attributes.value.splice(index, 1)
}

function handleSubmit() {
  const data = {
    name: name.value,
    price: {
      amount: priceAmount.value,
      currency: priceCurrency.value as CurrencyCode
    },
    stock: stock.value,
    attributes: attributes.value.filter(a => a.key && a.value)
  }
  emit('submit', data)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-10">
    <div class="flex flex-col gap-6">
      <!-- Basic Info -->
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold text-text-main ml-1">Название товара</label>
        <input 
          v-model="name"
          type="text" 
          required
          class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main placeholder:text-text-muted/40"
          placeholder="Напр. Смартфон Galaxy S24"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-semibold text-text-main ml-1">Цена</label>
          <input 
            v-model.number="priceAmount"
            type="number" 
            step="any"
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-xs font-semibold text-text-main ml-1">Валюта</label>
          <div class="relative group">
            <select 
              v-model="priceCurrency"
              class="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-bold text-text-main pr-10 cursor-pointer"
            >
              <option v-for="code in Object.values(CurrencyCode)" :key="code" :value="code">{{ code }}</option>
            </select>
            <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold text-text-main ml-1">Запас на складе (всего)</label>
        <div class="relative">
          <input 
            v-model.number="stock"
            type="number" 
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-muted">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Attributes -->
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 class="text-sm font-bold text-text-main">Характеристики товара</h3>
        <button 
          type="button" 
          @click="addAttribute"
          class="text-xs font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer"
        >
          + Добавить поле
        </button>
      </div>

      <div class="flex flex-col gap-3">
        <div v-for="(attr, index) in attributes" :key="index" class="flex items-center gap-3">
          <div class="flex-1">
            <input 
              v-model="attr.key"
              type="text" 
              placeholder="Название (напр. Цвет)"
              class="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:border-primary outline-none transition-all"
            />
          </div>
          <div class="flex-1">
            <input 
              v-model="attr.value"
              type="text" 
              placeholder="Значение (напр. Черный)"
              class="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:border-primary outline-none transition-all"
            />
          </div>
          <button 
            type="button" 
            @click="removeAttribute(index)"
            class="p-2 text-text-muted hover:text-red-500 transition-colors cursor-pointer"
          >
            <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div v-if="attributes.length === 0" class="py-8 text-center border-2 border-dashed border-slate-100 rounded-xl">
           <p class="text-xs text-text-muted font-medium italic">Характеристики не добавлены</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
      <button 
        type="button" 
        @click="emit('cancel')"
        class="px-5 py-2.5 text-sm font-semibold text-text-muted hover:text-text-main transition-colors cursor-pointer"
      >
        Отмена
      </button>
      <button 
        type="submit"
        :disabled="loading"
        class="px-8 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all disabled:bg-slate-300 disabled:shadow-none cursor-pointer"
      >
        {{ loading ? 'Сохранение...' : (initialData ? 'Сохранить товар' : 'Создать товар') }}
      </button>
    </div>
  </form>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
