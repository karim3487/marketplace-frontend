<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface">
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <span class="text-lg font-bold text-text-main tracking-tight">
            Marketplace
          </span>
        </RouterLink>

        <div class="flex items-center gap-6">
          <RouterLink to="/" class="text-sm font-medium text-text-muted hover:text-primary transition-colors">Каталог</RouterLink>
          <a href="#" class="text-sm font-medium text-text-muted hover:text-primary transition-colors">О нас</a>
          <RouterLink
            to="/admin/login"
            class="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            Админка
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="grow">
      <RouterView />
    </main>

    <footer class="py-8 border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted text-sm">
        &copy; 2026 Marketplace Prototype • Сделано с любовью
      </div>
    </footer>
  </div>
</template>
