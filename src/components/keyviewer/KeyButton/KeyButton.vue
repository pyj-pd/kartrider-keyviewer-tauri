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
import type { ArrowKeyType } from "@/constants/keyviewer/arrow"

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
        'flex items-center justify-center rounded-border text-[2.5vw] overflow-hidden font-bold',
        keyPressData[getKeybindKeyCode(keybindData)] === 'pressed'
          ? 'bg-primary-900 text-primary-100'
          : 'bg-primary-100 text-primary-900',
      ]"
      :key="gridArea"
      :style="{
        gridArea,
      }"
    >
      <template v-if="keyType === 'arrow'">
        <ArrowUp :keycode="getKeybindKeyCode(keybindData) as ArrowKeyType" />
      </template>
      <template v-else>
        {{ getKeybindLabel(keybindData) }}
      </template>
    </div>
  </template>
</template>
