<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, useAdminLoginMutation } from '../index'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const { mutate: login, isPending: loading, error: mutationError } = useAdminLoginMutation()

function handleLogin() {
  login({
    username: username.value,
    password: password.value
  }, {
    onSuccess: (response) => {
      authStore.setToken(response.access_token)
      router.push('/admin/products')
    }
  })
}
</script>

<template>
  <div class="admin-login-form">
    <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold text-text-main ml-1 uppercase tracking-wider">Логин</label>
        <div class="relative">
          <input 
            v-model="username"
            type="text" 
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main placeholder:text-text-muted/50"
            placeholder="admin@example.com"
          />
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-muted/40">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xs font-semibold text-text-main ml-1 uppercase tracking-wider">Пароль</label>
        <div class="relative">
          <input 
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium text-text-main placeholder:text-text-muted/50"
            placeholder="••••••••"
          />
           <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-muted/40">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
        </div>
      </div>

      <div v-if="mutationError" class="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-semibold border border-red-100 text-center animate-shake">
        Неверные учетные данные
      </div>

      <button 
        type="submit"
        :disabled="loading"
        class="mt-2 px-6 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 disabled:bg-slate-300 disabled:shadow-none transition-all cursor-pointer"
      >
        {{ loading ? 'Авторизация...' : 'Войти' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}
</style>
