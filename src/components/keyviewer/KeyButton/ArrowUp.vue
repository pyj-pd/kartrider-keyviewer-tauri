<script setup lang="ts">
import {
  ARROW_KEYCODE_ROTATIONS,
  type ArrowKeyType,
} from "@/constants/keyviewer/arrow"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

const { keyTemplate } = storeToRefs(useKeyTemplateStore())

const props = defineProps<{
  keycode: ArrowKeyType
}>()

const arrowRotation = ARROW_KEYCODE_ROTATIONS[props.keycode]

/**
 * If font changes, you might need to adjust these values manually.
 * @todo Support font change
 */
const strokeWidth = computed(
  () => (keyTemplate.value.styling.fontWeight / 570) * 15,
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 100 100"
    class="w-[4vw]"
    :style="{
      transform: `rotate(${arrowRotation})`,
      width: '0.8em',
      overflow: 'visible',
    }"
  >
    <path
      stroke="currentColor"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M 50 0 L 0 50 M 50 0 L 50 100 M 50 0 L 100 50"
    />
  </svg>
</template>
