<template>
  <UploadPreviewInput
    :documents="serverDocs"
    :max-files="8"
    accept="image/*,.pdf,.doc,.docx"
    @update:files="onLocalFilesUpdate"
    @remove:document="onRemoveServerDoc"
    @exceed="onExceed"
  />
</template>

<script setup lang="ts">

import UploadPreviewInput from '@/components/UploadPreviewInput.vue'

function onLocalFilesUpdate(files: File[]) {
  console.log('Local files:', files)
}

function onRemoveServerDoc(id: number) {
  serverDocs.value = serverDocs.value.filter(d => d.id !== id)
}

function onExceed(attempted: number, allowed: number) {
  alert(`Перевищено ліміт. Спробували додати: ${attempted}, доступно ще: ${allowed}`)
}
</script>