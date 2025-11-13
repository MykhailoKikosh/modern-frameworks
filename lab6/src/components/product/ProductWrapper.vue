<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import type {ProductWrapperProps} from "@/components/product/types";
import ProductCard from "@/components/product/ProductCard.vue";
import ProductSkeleton from "@/components/product/ProductSkeleton.vue";

withDefaults(defineProps<ProductWrapperProps>(), {
    items: () => [],
    loading: false
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        <template v-if="loading">
            <ProductSkeleton v-for="i in 8" :key="i" />
        </template>
        <template v-else>
            <ProductCard v-for="product in items" :key="product.id" :item="product" />
        </template>
    </div>
</template>

<style scoped>
</style>
