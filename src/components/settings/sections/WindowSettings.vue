<script setup lang="ts">
import { useConfigFile } from "@/composables/useConfigFile"
import { useConfigStore } from "@/stores/useConfigStore"
import { maxKeyViewerWindowWidth } from "@/utils/keyviewer"
import { invoke } from "@tauri-apps/api/core"
import { storeToRefs } from "pinia"
import { watch } from "vue"

const { saveConfigFile } = useConfigFile()
const { alwaysOnTop, width } = storeToRefs(useConfigStore())

watch(alwaysOnTop, () => {
  invoke("set_keyviewer_always_on_top", { alwaysOnTop: alwaysOnTop.value })
})
</script>

<template>
  <section>
    <Panel header="창 설정">
      <div class="flex flex-col gap-3">
        <section class="flex items-center gap-2">
          <Checkbox v-model="alwaysOnTop" binary inputId="always-on-top" />
          <label for="always-on-top">창 항상 위에 두기</label>
        </section>
        <section class="flex items-center gap-2 w-full">
          <label>창 크기</label>
          <InputNumber v-model="width" />
          <Slider
            v-model="width"
            :max="maxKeyViewerWindowWidth"
            class="flex-auto"
          />
        </section>
      </div>
      <Button @click="saveConfigFile">Test</Button>
    </Panel>
  </section>
</template>
