<script setup lang="ts">
const props = defineProps<{
  name: string

  defaultValue: string
}>()

const modelValue = defineModel<string>()

const resetValue = () => (modelValue.value = props.defaultValue)
</script>

<template>
  <div class="flex flex-col gap-2 w-fit">
    <h3>{{ name }}</h3>
    <div class="flex items-center gap-2">
      <ColorPicker v-model="modelValue" format="hex" class="flex-auto" />
      <InputText v-model="modelValue" prefix="#" />
      <ResetButton
        :disabled="modelValue === defaultValue"
        @reset="resetValue"
      />
    </div>
  </div>
</template>
