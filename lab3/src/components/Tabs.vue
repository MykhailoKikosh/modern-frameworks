<script lang="ts" setup>
import { computed, provide, ref, watch, toRefs } from 'vue'

const props = defineProps({
  // Масив вкладок: [{ id: 'users', label: 'Users', icon: UserIcon, disabled: false }, ...]
  items: { type: Array, default: () => [] },
  // Керуємий активний id
  modelValue: { type: [String, Number, null], default: null },
  // Некеруємий активний id (початкове)
  defaultValue: { type: [String, Number, null], default: null },
  // 'underline' | 'pills' | 'boxed'
  variant: { type: String, default: 'underline' },
  // Додаткові класи на контейнер (опц.)
  class: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const internalValue = ref(
  props.modelValue ?? props.defaultValue ?? (props.items[0]?.id ?? null)
)

watch(
  () => props.modelValue,
  (v) => {
    if (v !== null && v !== undefined) internalValue.value = v
  }
)

function setActive(id) {
  if (props.modelValue === null || props.modelValue === undefined) {
    internalValue.value = id
  }
  emit('update:modelValue', id)
  emit('change', id)
}

const { variant } = toRefs(props)

const rootClasses = computed(() => {
  return [
    'w-full',
    variant.value === 'boxed' ? 'border border-gray-200 rounded-lg' : '',
    props.class
  ]
})

const listWrapperClasses = computed(() => {
  switch (variant.value) {
    case 'underline':
      return 'border-b border-gray-200'
    case 'pills':
      return 'flex gap-2 p-1 bg-gray-100 rounded-lg'
    case 'boxed':
      return 'px-3 pt-3'
    default:
      return ''
  }
})

const listClasses = computed(() => {
  switch (variant.value) {
    case 'underline':
      return 'flex gap-6'
    case 'pills':
      return 'flex gap-2'
    case 'boxed':
      return 'flex gap-2'
    default:
      return 'flex gap-2'
  }
})

function itemButtonClasses(id, disabled = false) {
  const isActive = id === internalValue.value
  const base = 'inline-flex items-center gap-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
  switch (variant.value) {
    case 'underline':
      return [
        base,
        'py-3 -mb-px border-b-2',
        isActive
          ? 'border-indigo-600 text-indigo-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300',
      ].join(' ')
    case 'pills':
      return [
        base,
        'px-3 py-1.5 rounded-full',
        isActive
          ? 'bg-indigo-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
      ].join(' ')
    case 'boxed':
      return [
        base,
        'px-3 py-2 rounded-md border',
        isActive
          ? 'bg-white border-gray-300 text-gray-900 shadow-sm'
          : 'bg-gray-50 border-transparent text-gray-700 hover:bg-white hover:border-gray-300',
      ].join(' ')
    default:
      return base
  }
}

provide('tabsContext', {
  get activeId() {
    return internalValue.value
  },
  setActive,
  get variant() {
    return variant.value
  }
})
</script>

<template>
  <div :class="rootClasses">
    <div :class="listWrapperClasses">
      <div :class="listClasses" role="tablist">
        <!-- Якщо є слот 'tab', використовуємо його для повного контролю кнопок -->
        <template v-if="$slots.tab">
          <slot
            name="tab"
            v-for="item in items"
            :key="item.id"
            :item="item"
            :active="item.id === internalValue"
            :set-active="() => setActive(item.id)"
            :classes="itemButtonClasses(item.id, item.disabled)"
          />
        </template>
        <template v-else>
          <button
            v-for="item in items"
            :key="item.id"
            :class="itemButtonClasses(item.id, item.disabled)"
            :disabled="item.disabled"
            role="tab"
            type="button"
            @click="!item.disabled && setActive(item.id)"
          >
            <component
              v-if="item.icon"
              :is="item.icon"
              class="h-5 w-5"
              :class="variant === 'underline' ? (item.id === internalValue ? 'text-indigo-600' : 'text-gray-400') : ''"
            />
            <span>{{ item.label }}</span>
          </button>
        </template>
      </div>
    </div>

    <!-- Контент вкладок -->
    <div class="p-3" :class="variant === 'boxed' ? 'pt-0' : ''">
      <!-- Слот для кастомного контенту вкладок -->
      <slot name="panel" :active-id="internalValue" />
      <!-- Якщо немає слоту panel — рендеримо items[i].content -->
      <template v-if="!$slots.panel">
        <div
          v-for="item in items"
          :key="item.id"
          role="tabpanel"
          v-show="item.id === internalValue"
          class="text-sm text-gray-800"
        >
          <component v-if="item.component" :is="item.component" v-bind="item.componentProps || {}" />
          <div v-else v-html="item.content"></div>
        </div>
      </template>
    </div>
  </div>
</template>
