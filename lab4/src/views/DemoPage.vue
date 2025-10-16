<script setup lang="ts">
import { useBreakpoints } from '@/composables/useBreakpoints'

// Стандартні брейкпоінти
const { width, isMobile, isTablet, isDesktop, greater, smaller, between } = useBreakpoints()

// Або з кастомними брейкпоінтами
// const { isMobile } = useBreakpoints({ mobile: 640, tablet: 960, desktop: 1280 })

const isLargeScreen = greater('desktop')
const isSmallScreen = smaller('tablet')
const isMediumRange = between('mobile', 'desktop')
</script>

<template>
  <div class="p-4">
    <p>Ширина вікна: {{ width }}px</p>
    <p v-if="isMobile">📱 Mobile</p>
    <p v-if="isTablet">📱 Tablet</p>
    <p v-if="isDesktop">🖥️ Desktop</p>
    <p v-if="isLargeScreen">Великий екран (>= 1440px)</p>
    <p v-if="isSmallScreen">Малий екран (< 1024px)</p>
    <p v-if="isMediumRange">Середній діапазон (768-1440px)</p>
  </div>
</template>