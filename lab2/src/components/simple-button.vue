<template>
  <button
    @click="$emit('click')"
    :class="buttonClasses"
    class="inline-flex items-center justify-center font-semibold border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
    :disabled="disabled"
  >
    <component
      v-if="icon"
      :is="icon"
      :class="iconClasses"
      aria-hidden="true"
    />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'blue'
  },
  size: {
    type: String,
    default: 'medium'
  },
  icon: {
    type: Object,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const colorClasses = computed(() => {
  const colorMap = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white',
    gray: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-800'
  }
  return colorMap[props.color] || colorMap.blue
})

const sizeClasses = computed(() => {
  const sizeMap = {
    small: 'px-2.5 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  }
  return sizeMap[props.size] || sizeMap.medium
})

const iconClasses = computed(() => {
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-5 w-5'
  }
  const marginClass = props.label ? (props.size === 'small' ? '-ml-0.5 mr-1.5' : '-ml-1 mr-2') : ''
  return `${sizeMap[props.size] || sizeMap.medium} ${marginClass}`
})

const buttonClasses = computed(() => [
  colorClasses.value,
  sizeClasses.value,
  props.disabled ? 'opacity-50 cursor-not-allowed' : ''
].join(' '))
</script>
