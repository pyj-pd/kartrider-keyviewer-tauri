<script setup lang="ts">
import { initKeyViewer } from "@/composables/initKeyViewer"
import { onBeforeUnmount, onMounted, ref } from "vue"
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"
import { parseJSONFile } from "@/utils/json"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"

const speedTemplate = ref<null | KeyTemplate>(null)

const { keyPressData } = initKeyViewer()

// Relative sizes for calculation
const keySize = 100
const gap = 10

// Absolute sizes for CSS styling
const gapStyle = ref<null | string>(null)

const openSettingsWindow = () => invoke("open_settings")

onMounted(async () => {
  // Read template
  speedTemplate.value = await parseJSONFile(
    "resources/key-templates/speed.json",
    KeyTemplate,
  )

  const columnCount = speedTemplate.value?.gridAreas[0].split(" ").length
  const rowCount = speedTemplate.value?.gridAreas.length

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
    class="keyviewer-container"
    v-if="speedTemplate"
    :style="{
      gridTemplate: speedTemplate.gridAreas
        .map((line) => `'${line}'`)
        .join('\n'),
      gap: gapStyle ?? undefined,
    }"
  >
    <div
      v-for="(keybind, gridArea) in speedTemplate.keybinds"
      :class="{
        pressed:
          keyPressData[
            typeof keybind === 'string' ? keybind : keybind.keyCode
          ] === 'pressed',
      }"
      :key="gridArea"
      :style="{
        gridArea,
      }"
    >
      {{
        typeof keybind === "string"
          ? keybind
          : (keybind.customLabel ?? keybind.keyCode)
      }}
    </div>
  </main>
</template>

<style lang="scss" scoped>
.keyviewer-container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;

  width: auto;
  height: 100vh;

  background-color: white;

  // Keys
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    grid-row: 1;
    grid-column: 1;

    background-color: lightgray;

    border-radius: 1vw;

    overflow: hidden;
    font-weight: bold;

    &.pressed {
      background-color: black;
      color: white;
    }
  }
}
</style>
