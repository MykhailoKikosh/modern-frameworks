<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {Product} from "@/types";
import serviceProvider from "@/services";
import ProductWrapper from "@/components/product/ProductWrapper.vue";

const products = ref<Product[]>([]);
const loading = ref<boolean>(false);

const fetchProducts = async () => {
    try {
        loading.value = true;
        products.value = await serviceProvider.getProductService().get({limit: 20, offset: 0});
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchProducts();
})
</script>

<template>
    <main class="container mx-auto">
        <h1 class="text-center font-semibold p-8">Products</h1>
        <ProductWrapper :items="products" :loading="loading" />
    </main>
</template>

<style scoped>
</style>
