<script setup lang="ts">
import { storeToRefs } from "pinia"
import SliderInput from "../input-components/SliderInput.vue"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { defaultKeyStyling } from "@/constants/key-template"

const { keyTemplate } = storeToRefs(useKeyTemplateStore())

const roundNumber = (value: number) => Math.floor(value * 10) / 10
</script>

<template>
  <section v-if="keyTemplate !== null">
    <Panel header="스타일 설정">
      <Fieldset legend="키"
        ><div className="flex flex-col gap-2">
          <SliderInput
            name="키간 간격"
            :defaultValue="defaultKeyStyling.keyGap"
            v-model="keyTemplate.styling.keyGap"
            :step="0.1"
            :min="0"
            :max="roundNumber(keyTemplate.styling.keySize / 2)"
          />
          <SliderInput
            name="모서리 둥글기"
            :defaultValue="defaultKeyStyling.keyBorderRadius"
            v-model="keyTemplate.styling.keyBorderRadius"
            :step="0.1"
            :min="0"
            :max="roundNumber(keyTemplate.styling.keySize / 3)"
          />
          <SliderInput
            name="윤곽선 두께"
            :defaultValue="defaultKeyStyling.keyBorderWidth"
            v-model="keyTemplate.styling.keyBorderWidth"
            :step="0.1"
            :min="0"
            :max="roundNumber(keyTemplate.styling.keySize / 8)"
          />
        </div>
      </Fieldset>
      <Fieldset legend="폰트">
        <div className="flex flex-col gap-2">
          <SliderInput
            name="폰트 크기"
            :defaultValue="defaultKeyStyling.fontSize"
            v-model="keyTemplate.styling.fontSize"
            :step="0.1"
            :min="0.1"
            :max="roundNumber(keyTemplate.styling.keySize / 3)"
          />
        </div>
      </Fieldset>
    </Panel>
  </section>
</template>
