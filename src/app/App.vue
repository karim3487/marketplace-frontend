<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue3-hot-toast'
</script>

<template>
  <RouterView />
  <div>
    <Toaster position="top-center" :reverseOrder="false" />
  </div>
</template>

<style>
@import '@/assets/main.css';
</style>
