<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfigStore"
import {
  maxKeyViewerWindowWidth,
  minKeyViewerWindowWidth,
} from "@/utils/keyviewer"
import { storeToRefs } from "pinia"

const { alwaysOnTop, width } = storeToRefs(useConfigStore())
</script>

<template>
  <section>
    <Panel header="창 설정">
      <div class="flex flex-col gap-4">
        <Fieldset legend="창 위치">
          <div class="flex items-center gap-2 w-full">
            <Checkbox v-model="alwaysOnTop" binary inputId="always-on-top" />
            <label for="always-on-top">창 항상 위에 두기</label>
          </div>
        </Fieldset>
        <Fieldset legend="창 크기">
          <div class="flex items-center gap-5 w-full">
            <div class="w-20">
              <InputNumber
                id="width-input"
                locale="en-US"
                v-model="width"
                :min="minKeyViewerWindowWidth"
                :max="maxKeyViewerWindowWidth"
                suffix="px"
                fluid
              />
            </div>
            <Slider
              v-model="width"
              :step="5"
              :min="minKeyViewerWindowWidth"
              :max="maxKeyViewerWindowWidth"
              class="flex-auto"
            />
          </div>
        </Fieldset>
      </div>
    </Panel>
  </section>
</template>
