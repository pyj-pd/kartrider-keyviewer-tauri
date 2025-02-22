import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import { listen } from "@tauri-apps/api/event"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"

/**
 * Initialize key viewer listener. Should only be used on `KeyViewer` components once.
 */
export const initKeyViewer = () => {
  const { keyPressData } = storeToRefs(useKeyViewerStore())

  onMounted(() => {
    listen<string>("keypress", (key) => {
      keyPressData.value[key.payload] = "pressed"
    })

    listen<string>("keyrelease", (key) => {
      keyPressData.value[key.payload] = "released"
    })
  })
}
