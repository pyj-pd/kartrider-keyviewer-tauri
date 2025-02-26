import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"
import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import { calculateKeyViewerAbsoluteSizes } from "@/utils/keyviewer"
import { watch, watchEffect } from "vue"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useSizeStore } from "@/stores/keyviewer/useSizeStore"

/**
 * Initialize config applier so that values like key template, width, always on top get applied automatically.
 * Should only be used on `KeyViewerWebview` components once.
 */
export const useConfigApplier = () => {
  const { keyTemplate } = storeToRefs(useKeyViewerStore())
  const { windowSettings } = storeToRefs(useConfigStore())

  const sizeStore = useSizeStore()
  const { windowWidth, windowHeight } = storeToRefs(sizeStore)

  // Calculate absolute sizes
  watchEffect(async () => {
    if (keyTemplate.value === null) return

    const columnCount = keyTemplate.value?.gridAreas[0].split(" ").length
    const rowCount = keyTemplate.value?.gridAreas.length

    const width = windowSettings.value.width
    const calculatedAbsoluteSizes = calculateKeyViewerAbsoluteSizes({
      width,

      ...keyTemplate.value.styling,

      columnCount,
      rowCount,
    })

    sizeStore.$patch(calculatedAbsoluteSizes)
  })

  // Apply window sizes
  watch(
    [windowWidth, windowHeight],
    () =>
      getCurrentWebviewWindow().setSize(
        new LogicalSize(windowWidth.value, windowHeight.value),
      ),
    { immediate: true },
  )

  // Apply always on top
  watch(
    () => windowSettings.value.alwaysOnTop,
    () => getCurrentWindow().setAlwaysOnTop(windowSettings.value.alwaysOnTop),
    { immediate: true },
  )

  return { keyTemplate }
}
