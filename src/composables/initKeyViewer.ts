import { listen } from "@tauri-apps/api/event"
import { onMounted, ref } from "vue"

/**
 * Initialize key viewer listener. Should only be used on `KeyViewer` components once.
 */
export const initKeyViewer = () => {
  const keyPressData = ref<{ [key: string]: "pressed" | "released" }>({})

  onMounted(() => {
    listen<string>("keypress", (key) => {
      keyPressData.value[key.payload] = "pressed"
    })

    listen<string>("keyrelease", (key) => {
      keyPressData.value[key.payload] = "released"
    })
  })

  return { keyPressData }
}
