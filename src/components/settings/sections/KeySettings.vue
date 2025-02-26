<script setup lang="ts">
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { storeToRefs } from "pinia"
import KeybindInput from "../input-components/KeybindInput.vue"

const { keyTemplate } = storeToRefs(useKeyTemplateStore())
</script>

<template>
  <section>
    <Panel header="키 버튼 설정">
      <div className="flex flex-col gap-2 w-full">
        <template
          v-for="(keybindData, gridAreaKey) in keyTemplate.keybinds"
          :key="gridAreaKey"
        >
          <div class="flex items-center gap-3 w-full">
            <h3 class="block w-30 text-right">
              {{ keybindData.description }}
            </h3>
            <div className="flex-1">
              <KeybindInput v-model="keyTemplate.keybinds[gridAreaKey]" />
            </div>
            <div class="w-30">
              <InputText
                class="flex-1"
                placeholder="라벨"
                v-model="keyTemplate.keybinds[gridAreaKey].customLabel"
                fluid
              />
            </div>
          </div>
        </template>
      </div>
    </Panel>
  </section>
</template>
