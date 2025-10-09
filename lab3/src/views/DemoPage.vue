<script lang="ts" setup>
import { ref } from 'vue'
import Tabs from '@/components/Tabs.vue'

import { UserIcon, Cog6ToothIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'

// Underline
const activeUnderline = ref('home')
const underlineTabs = [
  { id: 'home', label: 'Home', content: '<p>Welcome to Home.</p>' },
  { id: 'profile', label: 'Profile', content: '<p>Your profile details.</p>' },
  { id: 'settings', label: 'Settings', content: '<p>App settings here.</p>' },
]

// Pills з іконками
const activePills = ref('users')
const pillsTabs = [
  { id: 'users', label: 'Users', icon: UserIcon, content: '<p>Users list</p>' },
  { id: 'chat', label: 'Chat', icon: ChatBubbleLeftRightIcon, content: '<p>Team chat</p>' },
  { id: 'config', label: 'Config', icon: Cog6ToothIcon, content: '<p>Configuration</p>' },
]

// Boxed з кастомним вмістом вкладок (slot)
const activeBoxed = ref('a')
const boxedTabs = [
  { id: 'a', label: 'Alpha', content: '<p>Alpha content</p>' },
  { id: 'b', label: 'Beta', content: '<p>Beta content</p>' },
  { id: 'c', label: 'Gamma', content: '<p>Gamma content</p>' },
]
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 space-y-12">
    <!-- Demo 1: Underline -->
    <section>
      <h3 class="text-lg font-semibold mb-4">Underline Tabs</h3>
      <Tabs
        :items="underlineTabs"
        v-model="activeUnderline"
        variant="underline"
        class="bg-white"
      />
    </section>

    <!-- Demo 2: Pills з іконками -->
    <section>
      <h3 class="text-lg font-semibold mb-4">Pills Tabs with Icons</h3>
      <Tabs
        :items="pillsTabs"
        v-model="activePills"
        variant="pills"
        class="bg-white"
      />
    </section>

    <!-- Demo 3: Boxed з кастомним слотом для кнопок -->
    <section>
      <h3 class="text-lg font-semibold mb-4">Boxed Tabs with custom tab button slot</h3>
      <Tabs
        :items="boxedTabs"
        v-model="activeBoxed"
        variant="boxed"
        class="bg-white"
      >
        <!-- Кастомний рендер кнопок вкладок -->
        <template #tab="{ item, active, setActive, classes }">
          <button
            :class="[classes, 'relative']"
            type="button"
            @click="setActive()"
          >
            <span>{{ item.label }}</span>
            <!-- Додатковий бейдж для активної вкладки -->
            <span
              v-if="active"
              class="ml-2 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
            >
              Active
            </span>
          </button>
        </template>

        <!--
        <template #panel="{ activeId }">
          <div class="rounded-md border border-gray-200 p-4">
            <p class="text-sm text-gray-700">Active tab: {{ activeId }}</p>
          </div>
        </template>
        -->
      </Tabs>
    </section>
  </div>
</template>
