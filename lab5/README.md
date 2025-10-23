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
npm install @mkik/vue-doc-uploader
```

or with yarn:
```bash
yarn add @mkik/vue-doc-uploader
```

## Usage
```vue
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
```