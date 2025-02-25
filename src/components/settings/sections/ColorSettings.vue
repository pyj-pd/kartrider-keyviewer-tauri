<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import ColorInput from "../input-components/ColorInput.vue"
import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"

const { styling } = storeToRefs(useConfigStore())
const defaultColorConfig = defaultKeyViewerConfig.styling.keyColor
</script>

<template>
  <section>
    <Panel header="키 색 설정">
      <Fieldset legend="일반 상태"
        ><div className="flex flex-col gap-2">
          <!-- @todo Fix color input -->
          <ColorInput
            name="배경 색"
            v-model="styling.keyColor.idle.backgroundColor"
            :defaultValue="defaultColorConfig.idle.backgroundColor"
          /></div></Fieldset
    ></Panel>
  </section>
</template>
