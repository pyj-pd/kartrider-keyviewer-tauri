<script setup lang="ts">
import { initKeyViewer } from "@/composables/initKeyViewer"
import speedTemplate from "@/assets/key-templates/speed"
import { onMounted } from "vue"
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"

const { keyPressData } = initKeyViewer()

onMounted(async () => {
  const aspectRatio =
    speedTemplate.gridAreas[0].split(" ").length /
    speedTemplate.gridAreas.length

  const width = 1000
  const height = width / aspectRatio

  await getCurrentWindow().setSize(new LogicalSize(width, height))
})
</script>

<template>
  <main
    class="keyviewer-container"
    :style="{
      gridTemplate: speedTemplate.gridAreas
        .map((line) => `'${line}'`)
        .join('\n'),
    }"
  >
    <div
      v-for="(keybind, gridArea) in speedTemplate.keybinds"
      :class="{ pressed: keyPressData[keybind] === 'pressed' }"
      :key="keybind"
      :style="{
        gridArea,
      }"
    >
      {{ keybind }}, {{ gridArea }}
    </div>
  </main>
</template>

<style lang="scss" scoped>
.keyviewer-container {
  display: grid;

  width: auto;
  height: 100vh;

  // Keys
  & > div {
    background-color: blue;

    &.pressed {
      background-color: red;
    }
  }
}
</style>
