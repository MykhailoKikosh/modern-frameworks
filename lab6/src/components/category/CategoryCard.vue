<script setup lang="ts">
import type { CategoryCartProps } from "@/components/category/types";

withDefaults(defineProps<CategoryCartProps>(), {
  item: null
});
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
    <router-link :to="`/category/${item?.id}`" class="block">
      <figure>
        <img class="aspect-square object-cover rounded" :src="item?.image" :alt="item?.name" />
        <figcaption class="font-semibold text-center py-2 line-clamp-2">{{ item?.name }}</figcaption>
      </figure>
    </router-link>
  </div>
</template>

<style scoped>
</style>
