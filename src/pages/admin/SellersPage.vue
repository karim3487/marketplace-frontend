<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SellerResponse } from '@/shared/api/generated'
import { useSellersQuery } from '@/entities/seller'
import {
  useCreateSeller,
  useUpdateSeller,
  useDeleteSeller,
} from '@/features/admin-seller-management'

const { data: sellersData, isLoading: loading, error: queryError, refetch } = useSellersQuery()
const sellers = computed(() => sellersData.value || [])
const error = computed(() => (queryError.value ? 'Ошибка загрузки списка продавцов' : null))

const createMutation = useCreateSeller()
const updateMutation = useUpdateSeller()
const deleteMutation = useDeleteSeller()

// Create Form State
const showCreateModal = ref(false)
const newSellerName = ref('')
const newSellerRating = ref<number>(5.0)

async function handleCreateSeller() {
  if (!newSellerName.value) return

  createMutation.mutate(
    {
      name: newSellerName.value,
      rating: newSellerRating.value,
    },
    {
      onSuccess: () => {
        newSellerName.value = ''
        newSellerRating.value = 5.0
        showCreateModal.value = false
      },
    },
  )
}

// Edit Form State
const showEditModal = ref(false)
const editingSellerId = ref<string | null>(null)
const editSellerName = ref('')
const editSellerRating = ref<number>(5.0)

function openEditModal(seller: SellerResponse) {
  editingSellerId.value = seller.id
  editSellerName.value = seller.name
  editSellerRating.value = seller.rating
  showEditModal.value = true
}

async function handleEditSeller() {
  if (!editSellerName.value || !editingSellerId.value) return

  updateMutation.mutate(
    {
      id: editingSellerId.value,
      data: {
        name: editSellerName.value,
        rating: editSellerRating.value,
      },
    },
    {
      onSuccess: () => {
        showEditModal.value = false
      },
    },
  )
}

// Delete State
const deletingIds = ref<Set<string>>(new Set())

async function handleDeleteSeller(seller: SellerResponse) {
  if (!confirm(`Вы уверены, что хотите удалить продавца "${seller.name}"?`)) return

  deletingIds.value.add(seller.id)
  deleteMutation.mutate(seller.id, {
    onSettled: () => {
      deletingIds.value.delete(seller.id)
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-10 max-w-7xl">
    <!-- Header Actions -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-text-main tracking-tight">Продавцы</h1>
        <p class="text-text-muted text-sm font-medium">Управление вендорами и поставщиками</p>
      </div>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Добавить продавца
      </button>
    </div>

    <!-- Error/Loading -->
    <div v-if="error" class="card border-red-100 bg-red-50/30 p-8 flex items-center gap-6">
      <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="font-bold text-text-main text-sm">Произошла ошибка</h4>
        <p class="text-red-600 text-sm font-medium mt-0.5">{{ error }}</p>
      </div>
      <button
        @click="() => refetch()"
        class="px-5 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-all cursor-pointer"
      >
        Повторить
      </button>
    </div>

    <!-- Content Table -->
    <div class="card overflow-hidden">
      <div v-if="loading" class="py-20 flex flex-col items-center justify-center gap-4">
        <div
          class="w-10 h-10 border-4 border-slate-100 border-t-primary rounded-full animate-spin"
        ></div>
        <p class="text-xs text-text-muted font-bold uppercase tracking-widest">
          Загрузка данных...
        </p>
      </div>

      <div v-else-if="sellers.length === 0" class="py-20 flex flex-col items-center text-center">
        <div
          class="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p class="text-text-muted text-sm font-medium">Продавцы не найдены</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50/50">
              <th class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                Продавец
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center"
              >
                Оценка
              </th>
              <th
                class="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-right"
              >
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="seller in sellers"
              :key="seller.id"
              class="group hover:bg-slate-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex flex-col min-w-0">
                  <span
                    class="font-semibold text-text-main group-hover:text-primary transition-colors"
                    >{{ seller.name }}</span
                  >
                  <span class="text-[10px] text-text-muted font-mono leading-none mt-1">{{
                    seller.id
                  }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <div
                  class="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs font-bold w-16"
                >
                  <svg class="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  {{ seller.rating.toFixed(1) }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div
                  class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="openEditModal(seller)"
                    class="p-2 text-text-muted hover:text-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Редактировать"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="handleDeleteSeller(seller)"
                    :disabled="deletingIds.has(seller.id)"
                    class="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
                    title="Удалить"
                  >
                    <svg
                      v-if="deletingIds.has(seller.id)"
                      class="w-4 h-4 animate-spin text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="showCreateModal = false"
        ></div>

        <div
          class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-8 relative z-10 animate-fade-in-up"
        >
          <div class="flex items-center justify-between mb-8">
            <div class="flex flex-col gap-0.5">
              <h3 class="text-xl font-bold text-text-main tracking-tight">Регистрация продавца</h3>
              <p class="text-xs text-text-muted font-medium">
                Добавление нового партнера в систему
              </p>
            </div>
            <button
              @click="showCreateModal = false"
              class="text-text-muted hover:text-text-main transition-colors cursor-pointer p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleCreateSeller" class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-semibold text-text-main ml-1">Название предприятия</label>
              <input
                v-model="newSellerName"
                type="text"
                required
                placeholder="Напр. Dragon Emporium"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main placeholder:text-text-muted/40"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-xs font-semibold text-text-main ml-1"
                >Оценка (от 1.0 до 5.0)</label
              >
              <input
                v-model.number="newSellerRating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main"
              />
            </div>

            <div
              v-if="createMutation.error.value"
              class="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold"
            >
              {{
                (createMutation.error.value as any)?.body?.detail ||
                createMutation.error.value?.message
              }}
            </div>

            <div class="flex items-center gap-3 mt-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                @click="showCreateModal = false"
                class="flex-1 py-2.5 text-sm font-semibold text-text-muted hover:text-text-main transition-colors cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="createMutation.isPending.value || !newSellerName"
                class="flex-2 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/20 disabled:bg-slate-300 disabled:shadow-none transition-all cursor-pointer"
              >
                {{ createMutation.isPending.value ? 'Создание...' : 'Создать продавца' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Edit Modal -->
    <Teleport to="body">
      <div v-if="showEditModal" class="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div
          class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          @click="showEditModal = false"
        ></div>

        <div
          class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-8 relative z-10 animate-fade-in-up"
        >
          <div class="flex items-center justify-between mb-8">
            <div class="flex flex-col gap-0.5">
              <h3 class="text-xl font-bold text-text-main tracking-tight">
                Редактирование продавца
              </h3>
              <p class="text-xs text-text-muted font-medium">Обновление данных партнера</p>
            </div>
            <button
              @click="showEditModal = false"
              class="text-text-muted hover:text-text-main transition-colors cursor-pointer p-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleEditSeller" class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-xs font-semibold text-text-main ml-1">Название предприятия</label>
              <input
                v-model="editSellerName"
                type="text"
                required
                placeholder="Напр. Dragon Emporium"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main placeholder:text-text-muted/40"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-xs font-semibold text-text-main ml-1"
                >Оценка (от 1.0 до 5.0)</label
              >
              <input
                v-model.number="editSellerRating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main"
              />
            </div>

            <div
              v-if="updateMutation.error.value"
              class="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-semibold"
            >
              {{
                (updateMutation.error.value as any)?.body?.detail ||
                updateMutation.error.value?.message
              }}
            </div>

            <div class="flex items-center gap-3 mt-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                @click="showEditModal = false"
                class="flex-1 py-2.5 text-sm font-semibold text-text-muted hover:text-text-main transition-colors cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="updateMutation.isPending.value || !editSellerName"
                class="flex-2 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/20 disabled:bg-slate-300 disabled:shadow-none transition-all cursor-pointer"
              >
                {{ updateMutation.isPending.value ? 'Сохранение...' : 'Сохранить изменения' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>
