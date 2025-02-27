<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import {
  defaultWebview,
  webviewItems,
  type WebviewItem,
} from "./constants/webviews"
import "@/styles/base.css"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { initConfigStore } from "./composables/initConfigStore"

const currentPage = ref<null | WebviewItem>(null)
const { isConfigLoaded } = initConfigStore()

const cancelRightClick = (event: MouseEvent) => {
  event.preventDefault()
}

onMounted(() => {
  // Load webview component
  const label = new URL(window.location.href).hash.substring(1)

  currentPage.value =
    webviewItems.find((item) => item.label === label) ?? defaultWebview

  getCurrentWindow().show()

  // Disable right click
  if (!import.meta.env.DEV)
    window.addEventListener("contextmenu", cancelRightClick)
})

onBeforeUnmount(() => {
  if (!import.meta.env.DEV)
    window.removeEventListener("contextmenu", cancelRightClick)
})
</script>

<template>
  <component v-if="isConfigLoaded" :is="currentPage?.component" />
</template>
