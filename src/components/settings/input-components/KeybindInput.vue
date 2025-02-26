<script setup lang="ts">
import type { KeybindData } from "@/types/key-templates"
import { convertJSKeyCodeToRust } from "@/utils/keycode"
import { computed, ref } from "vue"

const modelValue = defineModel<KeybindData>({ required: true })

/** Set this value to the key code string that is invalid in order to show dialog about it. */
const invalidKeyCodeDialog = ref<null | string>(null)
const isDialogVisible = computed<boolean>({
  get: () => typeof invalidKeyCodeDialog.value === "string",
  set: (value) => {
    if (value === false) invalidKeyCodeDialog.value = null
  },
})

const isKeyListening = ref<boolean>(false)

const onClick = () => {
  if (isKeyListening.value) {
    // Cancel if already listening
    isKeyListening.value = false
  } else {
    // Start listening to key
    isKeyListening.value = true
  }
}

const onKeyPress = (event: KeyboardEvent) => {
  if (isKeyListening.value === false) return

  isKeyListening.value = false
  event.preventDefault()

  const inputKeyCode = event.code
  const rustKeyCode = convertJSKeyCodeToRust(inputKeyCode)

  if (rustKeyCode === null) {
    // Invalid key code
    invalidKeyCodeDialog.value = inputKeyCode
    return
  }

  modelValue.value.keyCode = rustKeyCode
}
</script>

<template>
  <Button
    class="flex-1"
    @click="onClick"
    @keydown="onKeyPress"
    @blur="isKeyListening = false"
    severity="secondary"
    fluid
    >{{
      isKeyListening ? "듣는 중... 눌러서 취소" : modelValue.keyCode
    }}</Button
  >
  <!-- Modal -->
  <Dialog v-model:visible="isDialogVisible" modal header="오류">
    <div className="flex flex-col gap-6 w-full">
      <p>{{ invalidKeyCodeDialog }}은(는) 지원되지 않는 키입니다.</p>
      <div class="flex justify-end">
        <Button @click="isDialogVisible = false">닫기</Button>
      </div>
    </div>
  </Dialog>
</template>
