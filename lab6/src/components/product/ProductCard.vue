<script setup lang="ts">
import type {ProductCardProps} from "@/components/product/types";

withDefaults(defineProps<ProductCardProps>(), {
    item: undefined
});
</script>

<template>
    <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
        <router-link :to="`/products/${item?.id}`" class="block">
            <figure>
                <img 
                    class="aspect-square object-cover rounded" 
                    :src="item?.image || (item?.images && item.images[0]) || '/placeholder.png'" 
                    :alt="item?.title"/>
                <figcaption class="font-semibold text-sm text-center py-2 line-clamp-2">{{ item?.title }}</figcaption>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-blue-600">${{ item?.price }}</span>
                </div>
            </figure>
        </router-link>
    </div>
</template>

<style scoped>
</style>
