<script setup lang="ts">
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import { storeToRefs } from "pinia"
import KeybindInput from "../input-components/KeybindInput.vue"

const { keyTemplate } = storeToRefs(useKeyViewerStore())
</script>

<template>
  <section>
    <Panel header="키 버튼 설정">
      <div className="flex flex-col gap-2 w-full">
        <template
          v-for="(keybindData, gridAreaKey) in keyTemplate.keybinds"
          :key="gridAreaKey"
        >
          <div class="flex gap-2">
            <KeybindInput v-model="keyTemplate.keybinds[gridAreaKey]" />
            <InputText
              class="flex-1"
              placeholder="라벨"
              v-model="keybindData.customLabel"
              fluid
            />
          </div>
        </template>
      </div>
    </Panel>
  </section>
</template>
