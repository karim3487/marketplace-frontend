<script setup lang="ts">
import { useRouter } from "vue-router";
import { ProductList } from "@/widgets/ProductList";

const router = useRouter();

const goToDetails = (id: string) => {
  router.push({ name: "product-details", params: { id } });
};
</script>

<template>
  <div class="catalog-page min-h-screen bg-surface">

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductList @select-product="goToDetails" />
    </main>
  </div>
</template>
