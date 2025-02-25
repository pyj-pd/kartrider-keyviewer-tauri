<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
defineEmits(["reset"])
</script>

<template>
  <Button
    icon="pi pi-undo"
    variant="text"
    aria-label="초기화"
    :disabled="disabled"
    @click="$emit('reset')"
  />
</template>
