<script setup lang="ts">
import { initGlobalKeyListener } from "@/composables/initGlobalKeyListener"
import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"
import { parseJSONFile } from "@/utils/json"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"
import { storeToRefs } from "pinia"
import KeyButton from "./KeyButton/KeyButton.vue"
import { calculateKeyViewerWindowSize } from "@/utils/keyviewer"
import { useConfigStore } from "@/stores/useConfigStore"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"

initGlobalKeyListener()

const { keyTemplate } = storeToRefs(useKeyViewerStore())
const { keyTemplatePath, width, keySize, keyGap } =
  storeToRefs(useConfigStore())

/** Gap style used for CSS styling. */
const gapStyle = ref<null | string>(null)

const openSettingsWindow = () => invoke("open_settings")

onMounted(async () => {
  // Double click to open settings
  window.addEventListener("dblclick", openSettingsWindow)
})

watch(
  keyTemplatePath,
  () => {
    // Read template
    if (keyTemplatePath.value !== null)
      parseJSONFile(keyTemplatePath.value, KeyTemplate).then(
        (data) => (keyTemplate.value = data),
      )
  },
  { immediate: true },
)

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

onBeforeUnmount(() => {
  window.removeEventListener("dblclick", openSettingsWindow)
})
</script>

<template>
  <main
    data-tauri-drag-region
    class="grid auto-cols-fr auto-rows-fr w-auto h-screen *:pointer-events-none"
    v-if="keyTemplate"
    :style="{
      gridTemplate: keyTemplate.gridAreas.map((line) => `'${line}'`).join('\n'),
      gap: gapStyle ?? undefined,
    }"
  >
    <KeyButton
      v-for="(keybindData, gridArea) in keyTemplate.keybinds"
      :key="gridArea"
      :keybind-data="keybindData"
      :grid-area="gridArea"
    />
  </main>
</template>
