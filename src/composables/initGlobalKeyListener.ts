import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import type { KeyPressData } from "@/types/keyviewer"
import { getKeybindKeyCode } from "@/utils/keyviewer"
import { listen } from "@tauri-apps/api/event"
import { storeToRefs } from "pinia"
import { onMounted, ref, watch } from "vue"

/**
 * Initialize global key listener. Should only be used on `KeyViewer` components once.
 */
export const initGlobalKeyListener = () => {
  const { keyTemplate, keyPressData } = storeToRefs(useKeyViewerStore())
  /**
   * List of keys that are being used in the template and should be detected.
   */
  const detectingKeys = ref<string[]>([])

  const addKeyPressData = (keyCode: string, status: KeyPressData[string]) => {
    if (detectingKeys.value.includes(keyCode))
      keyPressData.value[keyCode] = status
  }

  onMounted(() => {
    listen<string>("keypress", (key) => addKeyPressData(key.payload, "pressed"))

    listen<string>("keyrelease", (key) =>
      addKeyPressData(key.payload, "released"),
    )
  })

  watch(
    [keyTemplate],
    () => {
      // Refetch detecting keys
      if (keyTemplate.value === null) return

      const newDetectingKeys: string[] = []

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, keybindData] of Object.entries(
        keyTemplate.value.keybinds,
      )) {
        newDetectingKeys.push(getKeybindKeyCode(keybindData))
      }

      detectingKeys.value = newDetectingKeys
    },
    { immediate: true, deep: true },
  )
}
