<script setup lang="ts">
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import type { KeybindData } from "@/types/key-templates"
import {
  getKeybindKeyCode,
  getKeybindLabel,
  getKeybindType,
} from "@/utils/keyviewer"
import { storeToRefs } from "pinia"
import ArrowUp from "./ArrowUp.vue"

const { keyTemplate, keyPressData } = storeToRefs(useKeyViewerStore())

const props = defineProps<{
  gridArea: string
  keybindData: KeybindData
}>()

const keyType = getKeybindType(props.keybindData)
</script>

<template>
  <template v-if="keyTemplate !== null">
    <div
      :class="[
        'button-container',
        keyPressData[getKeybindKeyCode(keybindData)] === 'pressed' && 'pressed',
      ]"
      :key="gridArea"
      :style="{
        gridArea,
      }"
    >
      <template v-if="keyType === 'arrow'">
        <ArrowUp />
      </template>
      <template v-else>
        {{ getKeybindLabel(keybindData) }}
      </template>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.button-container {
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
</style>
