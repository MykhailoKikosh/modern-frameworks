import type { App } from 'vue'
import UploadPreviewInput from './components/UploadPreviewInput.vue'

export { UploadPreviewInput }

export default {
    install(app: App) {
        app.component('UploadPreviewInput', UploadPreviewInput)
    },
}