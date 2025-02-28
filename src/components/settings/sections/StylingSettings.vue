<script setup lang="ts">
import { storeToRefs } from "pinia"
import SliderInput from "../input-components/SliderInput.vue"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { defaultKeyStyling } from "@/constants/key-template"
import { onMounted, ref } from "vue"
import { invoke } from "@tauri-apps/api/core"
import SelectInput from "../input-components/SelectInput.vue"

const { keyTemplate } = storeToRefs(useKeyTemplateStore())

const roundNumber = (value: number) => Math.floor(value * 10) / 10

// Font selector
const fontList = ref<null | string[]>(null)

const loadFontList = async () => {
  fontList.value = await invoke<string[]>("get_font_family_list")
}

onMounted(() => {
  loadFontList()
})
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
            name="글자 크기"
            :defaultValue="defaultKeyStyling.fontSize"
            v-model="keyTemplate.styling.fontSize"
            :step="0.1"
            :min="0.1"
            :max="roundNumber(keyTemplate.styling.keySize / 3)"
          />
          <SliderInput
            name="글자 두께"
            :defaultValue="defaultKeyStyling.fontWeight"
            v-model="keyTemplate.styling.fontWeight"
            :step="1"
            :min="100"
            :max="900"
          />
          <SelectInput
            name="글꼴"
            :defaultValue="defaultKeyStyling.fontFamily"
            v-model="keyTemplate.styling.fontFamily"
            :options="fontList ?? undefined"
            :loading="fontList === null"
            :virtual-scroller-options="{
              itemSize: 38,
              autoSize: true,
              delay: 50,
            }"
          />
        </div>
      </Fieldset>
    </Panel>
  </section>
</template>
