<script setup lang="ts">
import { onMounted, ref } from "vue"
import {
  defaultWebview,
  webviewItems,
  type WebviewItem,
} from "./constants/webviews"
import "@/styles/global.scss"

const currentPage = ref<null | WebviewItem>(null)

onMounted(() => {
  // Load webview component
  const label = new URL(window.location.href).hash.substring(1)

  currentPage.value =
    webviewItems.find((item) => item.label === label) ?? defaultWebview
})
</script>

<template>
  <component :is="currentPage?.component" />
</template>
