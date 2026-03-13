<script setup lang="ts">
interface Props {
  id: string;
  prefix?: string;
  showIcon?: boolean;
}

withDefaults(defineProps<Props>(), {
  showIcon: true,
});
</script>

<template>
  <div class="group/id inline-flex pointer-events-auto" @click.stop>
    <div 
      class="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-50/50 border border-slate-100 group-hover/id:border-primary/20 group-hover/id:bg-white transition-all duration-300 cursor-default"
      title="Нажмите, чтобы выделить ID"
    >
      <svg 
        v-if="showIcon"
        class="w-2.5 h-2.5 text-slate-400 group-hover/id:text-primary/70 transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
      <span class="text-[9px] font-mono text-text-muted/80 tracking-tighter select-all uppercase">
        {{ id }}
      </span>
    </div>
  </div>
</template>
