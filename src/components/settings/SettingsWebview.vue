<script setup lang="ts">
import { initConfigUpdater } from "@/composables/settings/initConfigUpdater"
import WindowSettings from "./sections/WindowSettings.vue"
import StylingSettings from "./sections/StylingSettings.vue"
import ColorSettings from "./sections/ColorSettings.vue"
import KeySettings from "./sections/KeySettings.vue"
import ProgramDescription from "./sections/ProgramDescription.vue"
// import ConfigFileSettings from "./sections/ConfigFileSettings.vue"

initConfigUpdater()
</script>

<template>
  <main class="flex flex-col gap-2 p-3 w-screen">
    <!-- Description -->
    <ProgramDescription />
    <!-- Settings -->
    <!-- <ConfigFileSettings /> -->
    <KeySettings />
    <WindowSettings />
    <StylingSettings />
    <ColorSettings />
  </main>
</template>
