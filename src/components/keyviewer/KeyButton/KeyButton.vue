<script setup lang="ts">
import { useKeyViewerStore } from "@/stores/keyviewer/useKeyViewerStore"
import type { KeybindData } from "@/types/key-templates"
import { getKeybindLabel, getKeybindType } from "@/utils/keyviewer"
import { storeToRefs } from "pinia"
import ArrowUp from "./ArrowUp.vue"
import type { ArrowKeyType } from "@/constants/keyviewer/arrow"
import { useSizeStore } from "@/stores/keyviewer/useSizeStore"
import { computed } from "vue"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"

const { keyTemplate } = storeToRefs(useKeyTemplateStore())
const { keyPressData } = storeToRefs(useKeyViewerStore())
const { fontSize, borderRadius, borderWidth } = storeToRefs(useSizeStore())

const props = defineProps<{
  gridArea: string
  keybindData: KeybindData
}>()

const keyType = getKeybindType(props.keybindData)
const isKeyPressed = computed(
  () => keyPressData.value[props.keybindData.keyCode] === "pressed",
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
          ? keyTemplate.styling.keyColor.pressed.backgroundColor
          : keyTemplate.styling.keyColor.idle.backgroundColor,
        color: isKeyPressed
          ? keyTemplate.styling.keyColor.pressed.textColor
          : keyTemplate.styling.keyColor.idle.textColor,
        borderColor: isKeyPressed
          ? keyTemplate.styling.keyColor.pressed.borderColor
          : keyTemplate.styling.keyColor.idle.borderColor,
      }"
    >
      <template
        v-if="
          keyType === 'arrow' && getKeybindLabel(keybindData, false) === null
        "
      >
        <ArrowUp :keycode="keybindData.keyCode as ArrowKeyType" />
      </template>
      <template v-else>
        {{ getKeybindLabel(keybindData) }}
      </template>
    </div>
  </template>
</template>
