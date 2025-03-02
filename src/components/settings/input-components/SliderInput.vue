<script setup lang="ts">
import ResetButton from "./ResetButton.vue"

const props = defineProps<{
  name: string

  defaultValue: number
  min: number
  max: number
  step?: number

  prefix?: string
  suffix?: string
}>()

const modelValue = defineModel<number>({ required: true })

const resetValue = () => (modelValue.value = props.defaultValue)
</script>

<template>
  <div class="flex items-center gap-3 w-full">
    <h3 class="block w-25 text-right">{{ name }}</h3>
    <div class="w-20">
      <InputNumber
        id="width-input"
        locale="en-US"
        v-model="modelValue"
        :step="step"
        :min="min"
        :max="max"
        :prefix="prefix"
        :suffix="suffix"
        fluid
      />
    </div>
    <div class="px-3 flex-1">
      <Slider
        v-model="modelValue as number"
        :step="step"
        :min="min"
        :max="max"
        fluid
      />
    </div>
    <ResetButton :disabled="modelValue === defaultValue" @reset="resetValue" />
  </div>
</template>
