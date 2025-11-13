<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import type {Category, Product} from "@/types";
import serviceProvider from "@/services";

const route = useRoute();
const router = useRouter();
const category = ref<Category | null>(null);
const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const productsLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const categoryId = Number(route.params.id);

const fetchCategory = async () => {
    try {
        loading.value = true;
        error.value = null;
        category.value = await serviceProvider.getCategoriesService().getById(categoryId);
    } catch (e) {
        console.error(e);
        error.value = "Failed to load category";
    } finally {
        loading.value = false;
    }
};

const fetchProducts = async () => {
    try {
        productsLoading.value = true;
        // Fetch all products and filter by category ID
        const allProducts = await serviceProvider.getProductService().get({ limit: 100 });
        products.value = allProducts.filter(p => {
            let catId: number = 0;
            if (typeof p.category === 'number') {
                catId = p.category;
            } else if (typeof p.category === 'string') {
                catId = parseInt(p.category, 10);
            } else if (typeof p.category === 'object' && p.category?.id) {
                catId = p.category.id;
            }
            return catId === categoryId;
        });
    } catch (e) {
        console.error(e);
    } finally {
        productsLoading.value = false;
    }
};

const goBack = () => {
    router.back();
};

onMounted(() => {
    fetchCategory();
    fetchProducts();
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

        <div v-else-if="category" class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-4">Current category: {{ category.name }}</h1>
            
            <h2 class="text-2xl font-semibold mb-6">Products in this category</h2>
            <div v-if="productsLoading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <div v-else-if="products.length === 0" class="text-center text-gray-500 py-8">
                No products found in this category
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="product in products" :key="product.id" class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <router-link :to="`/products/${product.id}`" class="block">
                        <figure>
                            <img 
                                class="aspect-square object-cover rounded" 
                                :src="product.image || (product.images && product.images[0]) || '/placeholder.png'" 
                                :alt="product.title" />
                            <figcaption class="font-semibold text-sm text-center py-2 line-clamp-2">{{ product.title }}</figcaption>
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
                            </div>
                        </figure>
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>
