<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import SliderInput from "../input-components/SliderInput.vue"
import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"

const { styling } = storeToRefs(useConfigStore())
const defaultStyling = defaultKeyViewerConfig.styling
</script>

<template>
  <section>
    <Panel header="스타일 설정">
      <Fieldset legend="키"
        ><div className="flex flex-col gap-2">
          <SliderInput
            name="키간 간격"
            v-model="styling.keyGap"
            :defaultValue="defaultStyling.keyGap"
            :step="0.1"
            :min="0"
            :max="styling.keySize / 2"
          />
          <SliderInput
            name="모서리 둥글기"
            v-model="styling.keyBorderRadius"
            :defaultValue="defaultStyling.keyBorderRadius"
            :step="0.1"
            :min="0"
            :max="styling.keySize / 3"
          />
          <SliderInput
            name="테두리 두께"
            v-model="styling.keyBorderWidth"
            :defaultValue="defaultStyling.keyBorderWidth"
            :step="0.1"
            :min="0"
            :max="styling.keySize / 8"
          />
        </div>
      </Fieldset>
      <Fieldset legend="폰트">
        <div className="flex flex-col gap-2">
          <SliderInput
            name="폰트 크기"
            v-model="styling.fontSize"
            :defaultValue="defaultStyling.fontSize"
            :step="0.1"
            :min="0.1"
            :max="styling.keySize / 3"
          />
        </div>
      </Fieldset>
    </Panel>
  </section>
</template>
