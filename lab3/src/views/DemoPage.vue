<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Демо UI Компонентів</h1>

      <!-- Button Component Demo -->
      <section class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Компонент: Button</h2>

        <!-- By Color -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-600 mb-3">Варіанти кольорів</h3>
          <div class="flex items-center gap-4">
            <Button v-for="color in buttonColors" :key="color" :label="color" :color="color" @click="logClick(color)" />
          </div>
        </div>

        <!-- By Size -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-600 mb-3">Варіанти розмірів</h3>
          <div class="flex items-center gap-4">
            <Button v-for="size in buttonSizes" :key="size" :label="size" :size="size" color="green" />
          </div>
        </div>

        <!-- With Icons -->
        <div>
          <h3 class="text-lg font-medium text-gray-600 mb-3">Кнопки з іконками</h3>
          <div class="flex items-center gap-4">
            <Button label="Редагувати" color="blue" size="small" :icon="PencilIcon" />
            <Button label="Додати" color="green" size="medium" :icon="PlusIcon" />
            <Button label="Видалити" color="red" size="large" :icon="TrashIcon" />
            <Button color="gray" size="large" :icon="ArrowDownTrayIcon" />
          </div>
        </div>
      </section>

      <!-- SearchableDropdown Component Demo -->
      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Компонент: SearchableDropdown</h2>

        <!-- Single Select -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-600 mb-3">Одиночний вибір</h3>
          <SearchableDropdown
            v-model="selectedCity"
            :items="cities"
            placeholder="Виберіть місто"
          />
          <p class="mt-2 text-sm text-gray-500">Вибрано: <span class="font-semibold">{{ selectedCity || 'Нічого' }}</span></p>
        </div>

        <!-- Multiple Select -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-600 mb-3">Множинний вибір</h3>
          <SearchableDropdown
            v-model="selectedSkills"
            :items="skills"
            :multiple="true"
            placeholder="Виберіть навички"
          />
          <p class="mt-2 text-sm text-gray-500">Вибрано: <span class="font-semibold">{{ selectedSkills.join(', ') || 'Нічого' }}</span></p>
        </div>

        <!-- Custom Slot -->
        <div>
          <h3 class="text-lg font-medium text-gray-600 mb-3">Кастомний вигляд (з аватарами)</h3>
          <SearchableDropdown
            v-model="selectedUser"
            :items="users"
            item-label="name"
            item-value="id"
            placeholder="Виберіть користувача"
          >
            <template #selection="{ item }">
              <div class="flex items-center">
                <img :src="item.avatar" class="w-6 h-6 rounded-full mr-2" />
                <span>{{ item.name }}</span>
              </div>
            </template>
            <template #option="{ item }">
              <div class="flex items-center">
                <img :src="item.avatar" class="w-6 h-6 rounded-full mr-3" />
                <div>
                  <div class="font-semibold">{{ item.name }}</div>
                  <div class="text-xs text-gray-500">{{ item.email }}</div>
                </div>
              </div>
            </template>
          </SearchableDropdown>
          <p class="mt-2 text-sm text-gray-500">Вибрано: <span class="font-semibold">{{ selectedUser?.name || 'Нічого' }}</span></p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/simple-button.vue';
import SearchableDropdown from '@/components/search-dropdown.vue';
import { PencilIcon, PlusIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/solid';

// --- Button Demo Data ---
const buttonColors = ['blue', 'red', 'green', 'gray'];
const buttonSizes = ['small', 'medium', 'large'];
const logClick = (color) => console.log(`Натиснуто кнопку: ${color}`);

// --- Dropdown Demo Data ---
// Single select
const selectedCity = ref(null);
const cities = ['Запоріжжя', 'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'];

// Multiple select
const selectedSkills = ref([]);
const skills = ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Tailwind CSS', 'SQL'];

// Custom slot with objects
const selectedUser = ref(null);
const users = [
  { id: 1, name: 'Анна Коваленко', email: 'anna@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Іван Петренко', email: 'ivan@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Ольга Сидоренко', email: 'olga@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Петро Іваненко', email: 'petro@example.com', avatar: 'https://i.pravatar.cc/150?img=4' },
];
</script>
