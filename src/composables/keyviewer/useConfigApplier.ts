import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"
import { parseJSONFile } from "@/utils/json"
import { KeyTemplate } from "@/types/key-templates"
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
  const { keyTemplatePath, windowSettings, styling } =
    storeToRefs(useConfigStore())

  const sizeStore = useSizeStore()
  const { windowWidth, windowHeight } = storeToRefs(sizeStore)

  // Apply key template
  watch(
    keyTemplatePath,
    () => {
      if (keyTemplatePath.value !== null)
        parseJSONFile(keyTemplatePath.value, KeyTemplate).then(
          (data) => (keyTemplate.value = data),
        )
    },
    { immediate: true },
  )

  // Calculate absolute sizes
  watchEffect(async () => {
    if (keyTemplate.value === null) return

    const columnCount = keyTemplate.value?.gridAreas[0].split(" ").length
    const rowCount = keyTemplate.value?.gridAreas.length

    const width = windowSettings.value.width
    const calculatedAbsoluteSizes = calculateKeyViewerAbsoluteSizes({
      width,

      ...styling.value,

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
