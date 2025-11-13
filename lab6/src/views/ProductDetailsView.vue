<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import type {Product} from "@/types";
import serviceProvider from "@/services";

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

const productId = Number(route.params.id);

const fetchProduct = async () => {
    try {
        loading.value = true;
        error.value = null;
        product.value = await serviceProvider.getProductService().getById(productId);
    } catch (e) {
        console.error(e);
        error.value = "Failed to load product";
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.back();
};

onMounted(() => {
    fetchProduct();
});
</script>

<template>
    <main class="container mx-auto px-4 py-8">
        <button 
            @click="goBack" 
            class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            ← Back
        </button>

        <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ error }}
        </div>

        <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img 
                    :src="product.image || (product.images && product.images[0]) || '/placeholder.png'" 
                    :alt="product.title" 
                    class="w-full rounded-lg shadow-lg object-contain"/>
            </div>
            <div>
                <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
                
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-4xl font-bold text-blue-600">${{ product.price }}</span>
                </div>

                <div class="mb-6 pb-6 border-b">
                    <h2 class="font-semibold text-lg mb-2">Category</h2>
                    <p class="text-gray-700">
                        {{ typeof product.category === 'string' || typeof product.category === 'number' 
                            ? product.category 
                            : product.category?.name }}
                    </p>
                </div>

                <div class="mb-6">
                    <h2 class="font-semibold text-lg mb-2">Description</h2>
                    <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
                </div>

                <button class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>
