<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUploadProductImageMutation } from '@/entities/product/api/mutations'

const props = defineProps<{
  productId: string
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const { mutate, isPending: uploading, error: mutationError } = useUploadProductImageMutation()

const error = computed(() => {
  if (!mutationError.value) return null
  return (mutationError.value as Error).message || 'Ошибка загрузки'
})

async function handleUpload() {
  const file = fileInput.value?.files?.[0]
  if (!file) return

  mutate(
    { productId: props.productId, file },
    {
      onSuccess: () => {
        emit('success')
        if (fileInput.value) fileInput.value.value = ''
      },
      onError: (err: unknown) => {
        console.error(err)
      },
    },
  )
}

function triggerSelect() {
  fileInput.value?.click()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleUpload" />

    <div class="flex flex-col gap-3">
      <button
        @click="triggerSelect"
        :disabled="uploading"
        class="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-text-main rounded-lg text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50 cursor-pointer"
      >
        <svg
          v-if="!uploading"
          class="w-4 h-4 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        <div
          v-else
          class="w-4 h-4 border-2 border-slate-200 border-t-primary rounded-full animate-spin"
        ></div>
        {{ uploading ? 'Загрузка...' : 'Выбрать другое фото' }}
      </button>

      <div
        v-if="error"
        class="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-lg flex items-center gap-2"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ error }}
      </div>
    </div>
  </div>
</template>
