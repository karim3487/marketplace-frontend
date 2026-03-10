<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/features/admin-auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navItems = [
  { 
    path: '/admin/products', 
    label: 'Товары', 
    icon: { 
      template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>' 
    } 
  },
  { 
    path: '/admin/sellers', 
    label: 'Продавцы', 
    icon: { 
      template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>' 
    } 
  }
]

const currentPageTitle = computed(() => {
  const current = navItems.find(item => route.path.startsWith(item.path))
  return current?.label || 'Панель управления'
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex bg-slate-50 text-text-main selection:bg-primary/10">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-slate-200 bg-white flex flex-col sticky top-0 h-screen">
      <div class="p-6">
        <RouterLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <span class="text-lg font-bold tracking-tight">Admin</span>
        </RouterLink>
      </div>

      <nav class="flex-1 px-3 py-2 space-y-1">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-semibold group text-sm"
          :class="[
            $route.path.startsWith(item.path) 
              ? 'bg-primary/5 text-primary' 
              : 'text-text-muted hover:bg-slate-50 hover:text-text-main'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 shrink-0" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-slate-100">
        <button 
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Выйти
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <header class="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-10">
        <h2 class="text-xl font-bold tracking-tight">{{ currentPageTitle }}</h2>
        
        <div class="flex items-center gap-4">
          <div class="flex flex-col items-end">
            <span class="text-xs font-bold">Administrator</span>
            <span class="text-[10px] text-text-muted font-medium">Super User</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-100 p-0.5 border border-slate-200">
            <div class="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
