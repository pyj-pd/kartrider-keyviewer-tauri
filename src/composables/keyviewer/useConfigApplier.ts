import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"
import { parseJSONFile } from "@/utils/json"
import { KeyTemplate } from "@/types/key-templates"
import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import { calculateKeyViewerWindowSize } from "@/utils/keyviewer"
import { ref, watch } from "vue"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"

/**
 * Initialize config applier so that values like key template, width, always on top get applied automatically.
 * Should only be used on `KeyViewerWebview` components once.
 */
export const useConfigApplier = () => {
  const { keyTemplate } = storeToRefs(useKeyViewerStore())
  const { keyTemplatePath, width, keySize, keyGap, alwaysOnTop } =
    storeToRefs(useConfigStore())

  /** Gap style used for CSS styling. */
  const gapStyle = ref<null | string>(null)

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

  // Apply window size
  watch(
    [keyTemplate, width, keySize, keyGap],
    () => {
      if (keyTemplate.value === null) return

      const columnCount = keyTemplate.value?.gridAreas[0].split(" ").length
      const rowCount = keyTemplate.value?.gridAreas.length

      const { height, gapStyle: newGapStyle } = calculateKeyViewerWindowSize({
        width: width.value,
        keySize: keySize.value,
        gap: keyGap.value,
        columnCount,
        rowCount,
      })

      gapStyle.value = newGapStyle

      getCurrentWindow().setSize(new LogicalSize(width.value, height))
    },
    { immediate: true },
  )

  // Apply always on top
  watch(alwaysOnTop, () => getCurrentWindow().setAlwaysOnTop(alwaysOnTop.value))

  return { gapStyle, keyTemplate }
}
