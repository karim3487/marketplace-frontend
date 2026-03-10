<script setup lang="ts">
import { AdminLoginForm } from '@/features/admin-auth'
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <div
          class="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-6"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-text-main tracking-tight mb-1">Admin Access</h1>
        <p class="text-text-muted text-sm font-medium">Консоль управления маркетплейсом</p>
      </div>

      <div class="card p-8 shadow-xl shadow-slate-200/50">
        <AdminLoginForm />
      </div>

      <p class="text-center mt-10 text-text-muted text-xs font-medium uppercase tracking-widest">
        Marketplace Prototype &copy; 2026
      </p>
    </div>
  </div>
</template>
