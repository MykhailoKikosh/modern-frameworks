<template>
  <div class="relative" ref="dropdownRef">
    <!-- Input Display -->
    <div @click="toggleDropdown" class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <div class="flex flex-wrap gap-2 items-center">
        <template v-if="hasSelection">
          <!-- Multiple selection tags -->
          <template v-if="multiple && modelValue.length > 0">
            <span v-for="item in modelValue" :key="getItemValue(item)" class="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
              <slot name="tag" :item="item">
                {{ getItemLabel(item) }}
              </slot>
              <XMarkIcon @click.stop="removeItem(item)" class="w-3 h-3 cursor-pointer hover:text-indigo-900" />
            </span>
          </template>
          <!-- Single selection -->
          <template v-else-if="!multiple && modelValue">
            <slot name="selection" :item="modelValue">
              <span>{{ getItemLabel(modelValue) }}</span>
            </slot>
          </template>
        </template>
        <span v-else class="text-gray-500">{{ placeholder }}</span>
      </div>
      <!-- Clear & Dropdown Icons -->
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <XMarkIcon v-if="hasSelection" @click.stop="clearSelection" class="h-5 w-5 text-gray-400 hover:text-gray-600 pointer-events-auto cursor-pointer mr-2" />
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </div>

    <!-- Dropdown Panel -->
    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isOpen" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <!-- Search Input -->
        <div class="p-2">
          <input
            ref="searchInputRef"
            type="text"
            v-model="searchTerm"
            placeholder="Пошук..."
            class="w-full border-gray-100 rounded-md shadow-sm focus:ring-indigo-100 focus:border-indigo-100 p-3 sm:text-sm"
          />
        </div>
        <!-- Options List -->
        <ul @keydown.down.prevent="navigateDown" @keydown.up.prevent="navigateUp" @keydown.enter.prevent="selectActive">
          <li v-if="filteredItems.length === 0" class="text-gray-500 select-none relative py-2 px-4">
            Нічого не знайдено.
          </li>
          <li
            v-for="(item, index) in filteredItems"
            :key="getItemValue(item)"
            @click="selectItem(item)"
            :class="['cursor-default select-none relative py-2 pl-3 pr-9', { 'bg-indigo-600 text-white': activeIndex === index, 'text-gray-900': activeIndex !== index }]"
          >
            <slot name="option" :item="item" :selected="isSelected(item)">
              <span :class="['block truncate', { 'font-semibold': isSelected(item) }]">{{ getItemLabel(item) }}</span>
            </slot>
            <span v-if="isSelected(item)" :class="['absolute inset-y-0 right-0 flex items-center pr-4', { 'text-white': activeIndex === index, 'text-indigo-600': activeIndex !== index }]">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  modelValue: {
    type: [String, Object, Array],
    default: null,
  },
  items: {
    type: Array,
    required: true,
  },
  itemLabel: {
    type: String,
    default: 'label',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Виберіть значення',
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchTerm = ref('');
const activeIndex = ref(-1);
const dropdownRef = ref(null);
const searchInputRef = ref(null);

const getItemLabel = (item) => (typeof item === 'object' ? item[props.itemLabel] : item);
const getItemValue = (item) => (typeof item === 'object' ? item[props.itemValue] : item);

const filteredItems = computed(() => {
  if (!searchTerm.value) {
    return props.items;
  }
  return props.items.filter((item) =>
    getItemLabel(item).toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const hasSelection = computed(() => {
  if (props.multiple) {
    return props.modelValue && props.modelValue.length > 0;
  }
  return !!props.modelValue;
});

const isSelected = (item) => {
  if (props.multiple) {
    return props.modelValue.some(v => getItemValue(v) === getItemValue(item));
  }
  return props.modelValue && getItemValue(props.modelValue) === getItemValue(item);
};

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    searchInputRef.value?.focus();
  }
};

const selectItem = (item) => {
  if (props.multiple) {
    const selected = [...(props.modelValue || [])];
    const index = selected.findIndex(v => getItemValue(v) === getItemValue(item));
    if (index > -1) {
      selected.splice(index, 1); // unselect
    } else {
      selected.push(item); // select
    }
    emit('update:modelValue', selected);
  } else {
    emit('update:modelValue', item);
    isOpen.value = false;
  }
};

const removeItem = (itemToRemove) => {
  if (props.multiple) {
    const newValue = props.modelValue.filter(item => getItemValue(item) !== getItemValue(itemToRemove));
    emit('update:modelValue', newValue);
  }
};

const clearSelection = () => {
  emit('update:modelValue', props.multiple ? [] : null);
};

// Keyboard navigation
const navigateDown = () => {
  if (activeIndex.value < filteredItems.value.length - 1) {
    activeIndex.value++;
  }
};
const navigateUp = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  }
};
const selectActive = () => {
  if (activeIndex.value >= 0 && filteredItems.value[activeIndex.value]) {
    selectItem(filteredItems.value[activeIndex.value]);
  }
};

watch(searchTerm, () => {
  activeIndex.value = -1;
});
</script>
