<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold text-text-main tracking-tight">Панель управления</h1>
      <p class="text-text-muted text-sm font-medium">Статистика и обзор системы (заглушка)</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="card p-6 border-slate-100">
        <div class="h-4 bg-slate-100 rounded w-1/3 mb-4 animate-pulse"></div>
        <div class="h-8 bg-slate-50 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>

    <div class="card p-10 text-center border-dashed border-slate-200">
      <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <p class="text-text-muted text-sm font-medium">Этот раздел находится в разработке.</p>
      <router-link to="/admin/products" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors inline-block cursor-pointer">Перейти к товарам</router-link>
    </div>
  </div>
</template>
