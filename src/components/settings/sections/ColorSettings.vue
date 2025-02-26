<script setup lang="ts">
import { storeToRefs } from "pinia"
import ColorInput from "../input-components/ColorInput.vue"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import type { KeyColorOption, KeyTemplate } from "@/types/key-templates"
import { defaultKeyStyling } from "@/constants/key-template"

const { keyTemplate } = storeToRefs(useKeyViewerStore())

const colorCategoryName: {
  [key in keyof KeyTemplate["styling"]["keyColor"]]: string
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
  <section v-if="keyTemplate !== null">
    <Panel header="키 색 설정">
      <template
        v-for="(colorData, category) in keyTemplate.styling.keyColor"
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
                :defaultValue="defaultKeyStyling.keyColor[category][colorType]"
                v-model="keyTemplate.styling.keyColor[category][colorType]"
              />
            </template>
          </div>
        </Fieldset>
      </template>
    </Panel>
  </section>
</template>
