<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import ColorInput from "../input-components/ColorInput.vue"
import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"
import type { KeyColorOption, KeyViewerConfigV1 } from "@/types/config"

const { styling } = storeToRefs(useConfigStore())
const defaultColorConfig = defaultKeyViewerConfig.styling.keyColor

const colorCategoryName: {
  [key in keyof KeyViewerConfigV1["styling"]["keyColor"]]: string
} = { idle: "일반 상태", pressed: "눌린 상태" }

const colorTypeName: {
  [key in keyof KeyColorOption]: string
} = {
  backgroundColor: "배경 색",
  textColor: "글자 색",
  borderColor: "윤곽선 색",
}
</script>

<template>
  <section>
    <Panel header="키 색 설정">
      <template
        v-for="(colorData, category) in styling.keyColor"
        :key="category"
      >
        <Fieldset :legend="colorCategoryName[category]">
          <div className="flex flex-col gap-2">
            <template
              v-for="(_, colorType) in colorData"
              :key="`${category},${colorType}`"
            >
              <ColorInput
                :name="colorTypeName[colorType]"
                v-model="styling.keyColor[category][colorType]"
                :defaultValue="defaultColorConfig[category][colorType]"
              />
            </template>
          </div>
        </Fieldset>
      </template>
    </Panel>
  </section>
</template>
