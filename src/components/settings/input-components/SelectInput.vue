<script setup lang="ts">
import type { SelectProps } from "primevue"

const props = defineProps<
  {
    name: string

    loading?: boolean
    options?: string[]
    defaultValue: string
  } & Omit<SelectProps, "loading" | "options">
>()

const modelValue = defineModel<string>({ required: true })

const resetValue = () => (modelValue.value = props.defaultValue)
</script>

<template>
  <div class="flex items-center gap-3 w-full">
    <h3 class="block w-25 text-right">{{ name }}</h3>
    <div class="flex-auto">
      <Select
        v-bind="props"
        v-model="modelValue"
        :placeholder="loading ? '불러오는 중...' : name"
        filter
        :options
        :loading
        fluid
      ></Select>
    </div>
    <ResetButton :disabled="modelValue === defaultValue" @reset="resetValue" />
  </div>
</template>
