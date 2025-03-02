<script setup lang="ts">
import { initGlobalKeyListener } from "@/composables/initGlobalKeyListener"
import { onBeforeUnmount, onMounted } from "vue"
import { invoke } from "@tauri-apps/api/core"
import KeyButton from "./KeyButton/KeyButton.vue"
import { useConfigApplier } from "@/composables/keyviewer/useConfigApplier"
import { storeToRefs } from "pinia"
import { useSizeStore } from "@/stores/keyviewer/useSizeStore"

/** Register global key listener */
initGlobalKeyListener()

/** Auto apply config */
const { keyTemplate } = useConfigApplier()

const { gap } = storeToRefs(useSizeStore())

const openSettingsWindow = () => invoke("open_settings")

onMounted(async () => {
  // Double click to open settings
  window.addEventListener("dblclick", openSettingsWindow)
})

onBeforeUnmount(() => {
  window.removeEventListener("dblclick", openSettingsWindow)
})

const isDev = import.meta.env.DEV
</script>

<template>
  <main
    data-tauri-drag-region
    :class="[
      'grid auto-cols-fr auto-rows-fr w-auto h-screen *:pointer-events-none',
      isDev && 'bg-amber-600',
    ]"
    v-if="keyTemplate"
    :style="{
      gridTemplate: keyTemplate.gridAreas.map((line) => `'${line}'`).join('\n'),
      gap,
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
