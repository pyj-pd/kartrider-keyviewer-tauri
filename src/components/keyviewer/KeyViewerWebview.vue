<script setup lang="ts">
import { initKeyViewer } from "@/composables/initKeyViewer"
import { onBeforeUnmount, onMounted, ref } from "vue"
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"
import { parseJSONFile } from "@/utils/json"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"
import { storeToRefs } from "pinia"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import KeyButton from "./KeyButton/KeyButton.vue"

initKeyViewer()

const { keyTemplate } = storeToRefs(useKeyViewerStore())

// Relative sizes for calculation
const keySize = 100
const gap = 10

// Absolute sizes
const gapStyle = ref<null | string>(null)

const openSettingsWindow = () => invoke("open_settings")

onMounted(async () => {
  // Read template
  // @todo Make template change feature
  keyTemplate.value = await parseJSONFile(
    "resources/key-templates/speed.json",
    KeyTemplate,
  )

  const columnCount = keyTemplate.value?.gridAreas[0].split(" ").length
  const rowCount = keyTemplate.value?.gridAreas.length

  // Set window size
  const width = keySize * columnCount + gap * (columnCount - 1)
  const height = keySize * rowCount + gap * (rowCount - 1)

  gapStyle.value = `${(gap / width) * 100}vw`

  await getCurrentWindow().setSize(new LogicalSize(width, height))

  // Double click to open settings
  window.addEventListener("dblclick", openSettingsWindow)
})

onBeforeUnmount(() => {
  window.removeEventListener("dblclick", openSettingsWindow)
})
</script>

<template>
  <main
    data-tauri-drag-region
    class="keyviewer-container"
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

<style lang="scss" scoped>
.keyviewer-container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;

  width: auto;
  height: 100vh;

  > * {
    pointer-events: none;
  }
}
</style>
