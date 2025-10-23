# upload-preview-input

A Vue 3 component for **previewing images before upload**.  
This library allows users to select multiple images, see previews, and remove selected images before sending them to the server.

---

## Features

- Drag & select multiple images
- Preview selected images before upload
- Remove selected images
- Limit maximum number of files
- Fully typed with TypeScript
- Easy to install and use in any Vue 3 project

---

## Installation

```bash
npm install @munspel/upload-preview-input
```

or with yarn:
```bash
yarn add @munspel/upload-preview-input
```

## Usage
```vue

<script setup lang="ts">
import { ref } from 'vue'
const files = ref<File[]>([])
</script>

<template>
  <UploadPreviewInput v-model="files" :maxFiles="5" />
</template>
```

## How to publish

```shell
npm login
npm publish --access public
```