<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  log: {
    action: string
    admin_username: string | null
    created_at: string
    changes: Record<string, unknown> | null
  }
}>()

// Check if the changes are in "diff" format (UPDATE) vs "flat snapshot" format (CREATE)
// UPDATE logs have values like { field: { old: ..., new: ... } }
// CREATE logs have values like { field: "value", ... }
const isDiffFormat = computed(() => {
  if (!props.log.changes) return false
  const firstValue = Object.values(props.log.changes)[0]
  return (
    typeof firstValue === 'object' &&
    firstValue !== null &&
    ('old' in firstValue || 'new' in firstValue)
  )
})

const formatAttrs = (attrs: unknown): string => {
  if (!Array.isArray(attrs) || attrs.length === 0) return 'None'
  return attrs.map((a: Record<string, unknown>) => `${a.key}: ${a.value}`).join(', ')
}

const formatValue = (key: string, val: unknown): string => {
  if (key === 'attributes') return formatAttrs(val)
  if (typeof val === 'object' && val !== null) return JSON.stringify(val)
  if (val === undefined || val === null || val === '') return 'Empty'
  return String(val)
}

const formattedChanges = computed(() => {
  if (!props.log.changes) return []

  const changesList: { field: string; oldValue: string; newValue: string }[] = []

  for (const [key, change] of Object.entries(props.log.changes)) {
    if (isDiffFormat.value) {
      // UPDATE format: { old: ..., new: ... }
      const changeObj = change as { old?: unknown; new?: unknown }
      changesList.push({
        field: key,
        oldValue: formatValue(key, changeObj.old),
        newValue: formatValue(key, changeObj.new),
      })
    } else {
      // CREATE format: flat snapshot, show as "→ value" (no old value)
      changesList.push({
        field: key,
        oldValue: '—',
        newValue: formatValue(key, change),
      })
    }
  }

  return changesList
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <div class="p-4 bg-white border border-slate-200 rounded-lg shadow-sm mb-4">
    <div class="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <span
          class="px-2 py-1 text-xs font-bold rounded-md"
          :class="{
            'bg-green-100 text-green-700': log.action === 'CREATE',
            'bg-blue-100 text-blue-700': log.action === 'UPDATE',
            'bg-red-100 text-red-700': log.action === 'DELETE',
            'bg-purple-100 text-purple-700': log.action === 'OFFER_ADD',
            'bg-orange-100 text-orange-700': log.action === 'OFFER_REMOVE',
          }"
        >
          {{ log.action.replace('_', ' ') }}
        </span>
        <span class="text-sm font-medium text-slate-700">
          admin: {{ log.admin_username || 'System' }}
        </span>
      </div>
      <span class="text-xs text-slate-500">{{ formatDate(log.created_at) }}</span>
    </div>

    <div v-if="formattedChanges.length > 0" class="flex flex-col gap-3">
      <div
        v-for="change in formattedChanges"
        :key="change.field"
        class="bg-slate-50 p-3 rounded-md text-sm border border-slate-100"
      >
        <div class="font-semibold text-slate-700 mb-1 capitalize">
          {{ change.field.replace('_', ' ') }}
        </div>

        <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
          <!-- Old value block: only shown for UPDATE diffs -->
          <template v-if="isDiffFormat">
            <div
              class="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded border border-red-100 break-all"
            >
              <span class="text-xs uppercase font-bold opacity-50 mr-2">Было</span>
              <span class="font-mono">{{ change.oldValue }}</span>
            </div>
            <svg
              class="w-5 h-5 text-slate-400 rotate-90 sm:rotate-0 self-center shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </template>
          <div
            class="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded border border-green-100 break-all"
          >
            <span class="text-xs uppercase font-bold opacity-50 mr-2">Стало</span>
            <span class="font-mono">{{ change.newValue }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="log.action === 'CREATE' && log.changes"
      class="bg-slate-50 p-3 rounded-md border border-slate-100"
    >
      <details>
        <summary class="text-sm font-medium text-slate-600 cursor-pointer">
          View Initial Data
        </summary>
        <pre
          class="mt-2 p-3 bg-white text-xs text-slate-700 rounded border border-slate-200 overflow-x-auto"
          >{{ JSON.stringify(log.changes, null, 2) }}</pre
        >
      </details>
    </div>

    <div v-else class="text-sm text-slate-500 italic">No specific changes recorded.</div>
  </div>
</template>
