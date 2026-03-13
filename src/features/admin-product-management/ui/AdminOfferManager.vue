<script setup lang="ts">
import { ref } from 'vue'
import { CurrencyCode, type OfferResponse } from '@/shared/api/generated'
import { getCurrencySymbol } from '@/shared/lib/currency'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'
import { useSellersQuery } from '../api/queries'
import { useCreateOfferMutation, useDeleteOfferMutation, useUpdateOfferMutation } from '../api/mutations'

const props = defineProps<{
  productId: string
  offers: OfferResponse[]
}>()

const { data: sellers = [] } = useSellersQuery()
const createOffer = useCreateOfferMutation()
const updateOffer = useUpdateOfferMutation()
const deleteOffer = useDeleteOfferMutation()

const showModal = ref(false)
const editingOfferId = ref<string | null>(null)
const offerForm = ref({
  seller_id: '',
  priceAmount: 0,
  priceCurrency: CurrencyCode.RUB as CurrencyCode,
  delivery_date: null as string | null,
})

function openCreateModal() {
  editingOfferId.value = null
  offerForm.value = {
    seller_id: '',
    priceAmount: 0,
    priceCurrency: CurrencyCode.RUB,
    delivery_date: null,
  }
  showModal.value = true
}

function openEditModal(offer: OfferResponse) {
  editingOfferId.value = offer.id
  offerForm.value = {
    seller_id: offer.seller.id,
    priceAmount: offer.price.amount,
    priceCurrency: offer.price.currency ?? CurrencyCode.RUB,
    delivery_date: offer.delivery_date,
  }
  showModal.value = true
}

async function handleDelete(offerId: string) {
  if (!confirm('Вы уверены, что хотите удалить это предложение?')) return
  await deleteOffer.mutateAsync({ productId: props.productId, offerId })
}

async function handleSubmit() {
  if (!offerForm.value.seller_id) return
  if (!offerForm.value.delivery_date) return

  const data = {
    product_id: props.productId,
    seller_id: offerForm.value.seller_id,
    price: {
      amount: Number(offerForm.value.priceAmount),
      currency: offerForm.value.priceCurrency,
    },
    delivery_date: offerForm.value.delivery_date,
  }

  if (editingOfferId.value) {
    await updateOffer.mutateAsync({ 
      offerId: editingOfferId.value, 
      data: data
    })
  } else {
    await createOffer.mutateAsync(data)
  }

  showModal.value = false
}
</script>

<template>
  <div class="card p-6">
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-6 bg-accent rounded-full"></div>
        <h3 class="text-sm font-bold text-text-main">Предложения продавцов</h3>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover shadow-sm transition-all cursor-pointer"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Добавить
      </button>
    </div>

    <!-- Offers List -->
    <div class="space-y-3">
      <div
        v-if="offers.length === 0"
        class="text-center py-8 text-sm text-text-muted font-medium bg-slate-50/50 rounded-xl border border-slate-100 border-dashed"
      >
        Пока нет предложений для этого товара
      </div>

      <div
        v-for="offer in offers"
        :key="offer.id"
        class="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all group shadow-sm"
      >
        <div class="flex flex-col gap-1">
          <span class="text-sm font-bold text-text-main">{{ offer.seller.name }}</span>
          <span class="text-xs font-medium text-text-muted flex items-center gap-2">
            <span>⭐️ {{ offer.seller.rating.toFixed(1) }}</span>
            <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span
              >Доставка:
              {{ new Date(offer.delivery_date + 'T00:00:00').toLocaleDateString('ru-RU') }}</span
            >
          </span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <span class="text-sm font-extrabold text-text-main"
              >{{ offer.price.amount }} {{ getCurrencySymbol(offer.price.currency) }}</span
            >
          </div>
          
          <div class="flex items-center gap-1.5">
            <button
              @click="openEditModal(offer)"
              class="text-text-muted hover:text-primary transition-all p-1.5 bg-slate-50 rounded-md cursor-pointer hover:bg-primary/5"
              title="Редактировать предложение"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              @click="handleDelete(offer.id)"
              class="text-text-muted hover:text-red-500 transition-all p-1.5 bg-slate-50 rounded-md cursor-pointer hover:bg-red-50"
              title="Удалить предложение"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="showModal = false"
        ></div>

        <div
          class="bg-white rounded-2xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden animate-fade-in-up"
        >
          <div
            class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50"
          >
            <h2 class="text-base font-bold text-text-main">
              {{ editingOfferId ? 'Редактировать предложение' : 'Новое предложение' }}
            </h2>
            <button
              @click="showModal = false"
              class="text-text-muted hover:text-text-main cursor-pointer p-1"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <div class="space-y-4">
              <!-- Seller -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-text-muted ml-0.5">Продавец</label>
                <div class="relative group">
                  <select
                    v-model="offerForm.seller_id"
                    required
                    :disabled="!!editingOfferId"
                    class="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all text-text-main pr-10 cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled>Выберите продавца</option>
                    <option v-for="seller in sellers" :key="seller.id" :value="seller.id">
                      {{ seller.name }}
                    </option>
                  </select>
                  <div
                    v-if="!editingOfferId"
                    class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Price -->
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-semibold text-text-muted ml-0.5">Цена</label>
                  <input
                    v-model.number="offerForm.priceAmount"
                    type="number"
                    step="any"
                    min="0"
                    required
                    class="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all text-text-main"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-semibold text-text-muted ml-0.5">Валюта</label>
                  <div class="relative group">
                    <select
                      v-model="offerForm.priceCurrency"
                      class="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all text-text-main pr-10 cursor-pointer"
                    >
                      <option v-for="code in Object.values(CurrencyCode)" :key="code" :value="code">
                        {{ code }}
                      </option>
                    </select>
                    <div
                      class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Delivery Date -->

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-text-muted ml-0.5">Дата доставки</label>

                <VueDatePicker
                  v-model="offerForm.delivery_date"
                  format="dd.MM.yyyy"
                  model-type="yyyy-MM-dd"
                  :locale="ru"
                  :enable-time-picker="false"
                  :teleport="true"
                  auto-apply
                  cancel-text="Отмена"
                  select-text="Выбрать"
                >
                  <template #dp-input="{ value }">
                    <input
                      :value="value"
                      class="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium transition-all text-text-main cursor-pointer"
                      placeholder="Выберите дату"
                      readonly
                    />
                  </template>
                </VueDatePicker>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="showModal = false"
                class="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="createOffer.isPending.value || updateOffer.isPending.value"
                class="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-primary-hover disabled:opacity-50 transition-all cursor-pointer relative overflow-hidden group"
              >
                <span v-if="!createOffer.isPending.value && !updateOffer.isPending.value">
                  {{ editingOfferId ? 'Сохранить' : 'Добавить' }}
                </span>
                <div v-else class="flex items-center justify-center">
                  <div
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>
