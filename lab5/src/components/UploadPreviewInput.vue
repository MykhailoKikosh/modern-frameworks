<script setup lang="ts">
import {computed, defineEmits, defineProps, ref} from 'vue'
import {getFileIcon} from './fileIcons'

interface Document {
  id: string | number
  name: string
  url?: string
  type?: string
}

interface PreviewItem {
  file?: File
  url: string
  name: string
  isUploaded: boolean
  id?: string | number
}

const props = defineProps<{
  modelValue?: File[]
  maxFiles?: number
  documents?: Document[]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits<{ (e: 'update:modelValue', value: File[]): void, (e: 'remove-document', id: string | number): void }>()
const previews = ref<PreviewItem[]>([])
const isDragging = ref(false)

if (props.documents) {
  previews.value = props.documents.map(doc => ({
    url: doc.url || '',
    name: doc.name,
    isUploaded: false,
    id: doc.id
  }))
}

const isImageFile = (file: File) => file.type.startsWith('image/')

const handleFiles = (files: FileList | null) => {
  if (!files) return

  const currentUploadedCount = previews.value.filter(p => p.isUploaded).length
  const availableSlots = props.maxFiles ? props.maxFiles - previews.value.length : Infinity

  if (availableSlots <= 0) return

  const newFiles = Array.from(files).slice(0, availableSlots)

  newFiles.forEach((file) => {
    const url = URL.createObjectURL(file)
    previews.value.push({
      file,
      url,
      name: file.name,
      isUploaded: true
    })
  })

  emit('update:modelValue', previews.value.filter(p => p.isUploaded && p.file).map((p) => p.file!))
}

const removeItem = (index: number) => {
  const item = previews.value[index]

  if (item.isUploaded && item.url) {
    URL.revokeObjectURL(item.url)
  } else if (item.id) {
    emit('remove-document', item.id)
  }

  previews.value.splice(index, 1)
  emit('update:modelValue', previews.value.filter(p => p.isUploaded && p.file).map((p) => p.file!))
}

const onSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  handleFiles(target.files)
  target.value = ''
}

const openDialog = () => {
  if (!fileInput.value || isMaxReached.value) return
  fileInput.value.click()
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (isMaxReached.value) return
  handleFiles(e.dataTransfer?.files || null)
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  if (!isMaxReached.value) {
    isDragging.value = true
  }
}

const onDragLeave = () => {
  isDragging.value = false
}

const isMaxReached = computed(() => {
  return props.maxFiles ? previews.value.length >= props.maxFiles : false
})
</script>

<template>
  <div class="upload-preview">
    <input
      class="upload-preview__input"
      type="file"
      accept="*/*"
      multiple
      ref="fileInput"
      @change="onSelect"
      :disabled="isMaxReached"
    />

    <div
      class="upload-preview__dropzone"
      :class="{
        'upload-preview__dropzone--active': isDragging,
        'upload-preview__dropzone--disabled': isMaxReached
      }"
      @click="openDialog"
      @drop.prevent="onDrop"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
    >
      <div class="upload-preview__dropzone-content">
        <svg class="upload-preview__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p v-if="!isMaxReached" class="upload-preview__label">
          <span class="upload-preview__label-primary">Натисніть для вибору</span>
          <span class="upload-preview__label-secondary">або перетягніть файли сюди</span>
        </p>
        <p v-else class="upload-preview__label upload-preview__label--disabled">
          Досягнуто максимальну кількість файлів ({{ maxFiles }})
        </p>
      </div>
    </div>

    <div v-if="previews.length > 0" class="upload-preview__grid">
      <div
        v-for="(item, index) in previews"
        :key="index"
        class="upload-preview__item"
      >
        <button
          type="button"
          class="upload-preview__remove"
          @click.stop="removeItem(index)"
          aria-label="Видалити"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div v-if="item.isUploaded && item.file && isImageFile(item.file)" class="upload-preview__image-wrapper">
          <img :src="item.url" :alt="item.name" class="upload-preview__image" />
        </div>

        <div v-else class="upload-preview__document">
          <div class="upload-preview__document-icon" v-html="getFileIcon(item.name)"></div>
          <div class="upload-preview__document-name" :title="item.name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <p v-else class="upload-preview__empty">
      Файли відсутні
    </p>
  </div>
</template>

<style scoped lang="scss">
.upload-preview {
  width: 100%;

  &__input {
    display: none;
  }

  &__dropzone {
    border: 2px dashed #d1d5db;
    border-radius: 0.75rem;
    padding: 3rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f9fafb;

    &:hover:not(&--disabled) {
      border-color: #3b82f6;
      background-color: #eff6ff;
    }

    &--active {
      border-color: #3b82f6;
      background-color: #dbeafe;
      transform: scale(1.02);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
      background-color: #f3f4f6;
    }
  }

  &__dropzone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__icon {
    width: 3rem;
    height: 3rem;
    color: #6b7280;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 1rem;
    color: #374151;

    &-primary {
      font-weight: 600;
      color: #3b82f6;
    }

    &-secondary {
      font-size: 0.875rem;
      color: #6b7280;
    }

    &--disabled {
      color: #9ca3af;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  &__item {
    position: relative;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: white;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);

      .upload-preview__remove {
        opacity: 1;
      }
    }
  }

  &__image-wrapper {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__document {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    min-height: 150px;
    gap: 0.75rem;
  }

  &__document-icon {
    width: 4rem;
    height: 4rem;
    color: #6b7280;

    :deep(svg) {
      width: 100%;
      height: 100%;
      stroke: currentColor;
    }
  }

  &__document-name {
    font-size: 0.875rem;
    color: #374151;
    text-align: center;
    word-break: break-word;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__remove {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
      background-color: rgba(239, 68, 68, 0.9);
      transform: scale(1.1);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__empty {
    margin-top: 1.5rem;
    text-align: center;
    color: #9ca3af;
    font-size: 0.875rem;
  }
}
</style>