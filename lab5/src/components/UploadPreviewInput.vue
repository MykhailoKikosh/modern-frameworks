<script setup lang="ts">
import {computed, defineEmits, defineProps, ref} from 'vue'
import type {PreviewImage} from "@/components/types.ts";

const props = defineProps<{ modelValue?: File[], maxFiles?: number }>()
const fileInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits<{ (e: 'update:modelValue', value: File[]): void }>()

const previews = ref<PreviewImage[]>([])

const handleFiles = (files: FileList | null) => {
  if (!files) return
  const newFiles = Array.from(files)
  const totalFiles = props.maxFiles
      ? previews.value.length + newFiles.length <= props.maxFiles
          ? newFiles
          : newFiles.slice(0, props.maxFiles - previews.value.length)
      : newFiles

  newFiles.forEach((file) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      previews.value.push({file, url})
    }
  })
  emit('update:modelValue', previews.value.map((p) => p.file))
}

const removeImage = (index: number) => {
  const [removed] = previews.value.splice(index, 1)
  // @ts-ignore
  URL.revokeObjectURL(removed.url)
  emit('update:modelValue', previews.value.map((p) => p.file))
}

const onSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  handleFiles(target.files)
  target.value = ''
}
const openDialog = () => {
  if (!fileInput.value) return
  fileInput.value.click()
}
const isMaxReached = computed(() => {
  return props.maxFiles ? previews.value.length >= props.maxFiles : false
})
</script>

<template>
  <div class="upload-preview">
    <input
        class="upload-preview__button"
        type="file"
        accept="image/*"
        multiple
        ref="fileInput"
        @change="onSelect"
        :disabled="isMaxReached"
    />

    <p v-if="!isMaxReached" class="upload-preview__label upload-preview__label--active" @click="openDialog">
      Натисніть, щоб вибрати
    </p>
    <p v-else class="upload-preview__label">
      Досягнуто максимальну кількість файлів ({{ maxFiles }})
    </p>

    <div class="upload-preview__items">
      <p v-if="previews.length == 0">Обрані зображення відсутні</p>
      <div v-for="(image, index) in previews"
           :key="index"
           class="upload-preview__item"
      >
        <img :src="image.url"
             alt="preview"
             class="upload-preview__image"
        />
        <div
            type="button"
            class="upload-preview__remove"
            @click.stop="removeImage(index)"
        >
          ✕
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-preview {
  &__label {
    position: relative;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;

    &--active {
      cursor: pointer;
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
  }

  &__item {
    position: relative;
    width: 250px;
    height: 200px;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;

    }
  }

  &__button {
    display: none;
  }

  &__image {

  }

  &__remove {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 0.5rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
}

</style>
