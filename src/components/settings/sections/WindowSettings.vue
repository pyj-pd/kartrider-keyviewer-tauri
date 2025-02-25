<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfigStore"
import {
  maxKeyViewerWindowWidth,
  minKeyViewerWindowWidth,
} from "@/utils/keyviewer"
import { storeToRefs } from "pinia"
import SliderInput from "../input-components/SliderInput.vue"
import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"

const { windowSettings } = storeToRefs(useConfigStore())
const defaultWindowSettings = defaultKeyViewerConfig.windowSettings
</script>

<template>
  <section>
    <Panel header="창 설정">
      <div class="flex flex-col gap-2">
        <Fieldset legend="창 위치">
          <div class="flex items-center gap-2 w-full">
            <Checkbox
              v-model="windowSettings.alwaysOnTop"
              binary
              inputId="always-on-top"
            />
            <label for="always-on-top">창 항상 위에 두기</label>
          </div>
        </Fieldset>
        <Fieldset legend="창 크기">
          <SliderInput
            name="창 크기"
            v-model="windowSettings.width"
            :defaultValue="defaultWindowSettings.width"
            :min="minKeyViewerWindowWidth"
            :max="maxKeyViewerWindowWidth"
            suffix="px"
          />
        </Fieldset>
      </div>
    </Panel>
  </section>
</template>
