<script setup lang="ts">
type SortOption = "price" | "delivery_date";

defineProps<{
  modelValue: SortOption;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: SortOption): void;
}>();
</script>

<template>
  <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
    <button
      @click="emit('update:modelValue', 'price')"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer',
        modelValue === 'price'
          ? 'bg-white text-text-main shadow-sm'
          : 'text-text-muted hover:text-text-main'
      ]"
    >
      По цене
    </button>
    <button
      @click="emit('update:modelValue', 'delivery_date')"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer',
        modelValue === 'delivery_date'
          ? 'bg-white text-text-main shadow-sm'
          : 'text-text-muted hover:text-text-main'
      ]"
    >
      По доставке
    </button>
  </div>
</template>
