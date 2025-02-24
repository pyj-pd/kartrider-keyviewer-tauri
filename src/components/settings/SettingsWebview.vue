<script setup lang="ts">
import { initConfigUpdater } from "@/composables/settings/initConfigUpdater"
import WindowSettings from "./sections/WindowSettings.vue"

initConfigUpdater()
</script>

<template>
  <main class="flex flex-col gap-2 p-3 w-screen">
    <WindowSettings />
  </main>
</template>
