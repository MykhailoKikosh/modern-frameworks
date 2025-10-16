import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: Window | HTMLElement,
  event: string,
  handler: (event: Event) => void
) {
  onMounted(() => target.addEventListener(event, handler))
  onUnmounted(() => target.removeEventListener(event, handler))
}
