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
import { useSizeStore } from "@/stores/keyviewer/useSizeStore"
import { useConfigStore } from "@/stores/useConfigStore"
import { computed } from "vue"

const { keyPressData, keyTemplate } = storeToRefs(useKeyViewerStore())
const { fontSize, borderRadius, borderWidth } = storeToRefs(useSizeStore())
const { styling } = storeToRefs(useConfigStore())

const props = defineProps<{
  gridArea: string
  keybindData: KeybindData
}>()

const keyType = getKeybindType(props.keybindData)
const isKeyPressed = computed(
  () => keyPressData.value[getKeybindKeyCode(props.keybindData)] === "pressed",
)
</script>

<template>
  <template v-if="keyTemplate !== null">
    <div
      class="flex items-center justify-center text-[2.5vw] overflow-hidden font-semibold font-[KartriderExtraBold]"
      :key="gridArea"
      :style="{
        gridArea,
        borderRadius,
        borderWidth,
        fontSize,

        backgroundColor: isKeyPressed
          ? styling.keyColor.pressed.backgroundColor
          : styling.keyColor.idle.backgroundColor,
        color: isKeyPressed
          ? styling.keyColor.pressed.textColor
          : styling.keyColor.idle.textColor,
        borderColor: isKeyPressed
          ? styling.keyColor.pressed.borderColor
          : styling.keyColor.idle.borderColor,
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
