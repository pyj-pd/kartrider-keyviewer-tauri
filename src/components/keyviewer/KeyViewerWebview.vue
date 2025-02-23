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
const keySize = 10
const gap = 1

// Absolute sizes
const initialWidth = 600
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
  const relativeWidth = keySize * columnCount + gap * (columnCount - 1)
  const relativeHeight = keySize * rowCount + gap * (rowCount - 1)

  const width = initialWidth
  const height = relativeHeight * (initialWidth / relativeWidth)

  gapStyle.value = `${(gap / relativeWidth) * 100}vw`

  await getCurrentWindow().setSize(new LogicalSize(width, height))
  const { width: innerWidth, height: innerHeight } =
    await getCurrentWindow().innerSize()
  console.log(width, height, innerWidth, innerHeight)

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
