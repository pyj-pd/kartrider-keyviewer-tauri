<script setup lang="ts">
import { ColorHex } from "@/types/unit"
import { computed, ref, watch } from "vue"

const props = defineProps<{
  name: string

  defaultValue: ColorHex
}>()

const modelValue = defineModel<ColorHex>({ required: true })

const hexCodeWithoutHashSign = computed({
  get: () => modelValue.value?.substring(1),
  set: (value) => (modelValue.value = `#${value}`),
})

const resetValue = () => (modelValue.value = props.defaultValue)

// Validate input text
const draftValue = ref<ColorHex | undefined>(undefined)
const isInputTextInvalid = ref<boolean>(false)

watch(
  modelValue,
  (value) => {
    draftValue.value = value
    isInputTextInvalid.value = false
  },
  { immediate: true },
)

const validateColorInput = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement

  try {
    modelValue.value = ColorHex.parse(target.value)
  } catch {
    draftValue.value = modelValue.value
    isInputTextInvalid.value = true
  }
}
</script>

<template>
  <div class="flex items-center gap-3 w-full">
    <h3 class="block w-25 text-right">{{ name }}</h3>
    <ColorPicker v-model="hexCodeWithoutHashSign" format="hex" />
    <div class="flex-1">
      <InputText
        v-model="draftValue"
        :invalid="isInputTextInvalid"
        @focus="() => (isInputTextInvalid = false)"
        @change="validateColorInput"
        fluid
      />
    </div>
    <ResetButton
      v-if="defaultValue"
      :disabled="modelValue === defaultValue"
      @reset="resetValue"
    />
  </div>
</template>
