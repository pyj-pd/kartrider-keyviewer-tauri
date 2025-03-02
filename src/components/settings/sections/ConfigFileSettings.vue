<script setup lang="ts">
import { useLogMessage } from "@/composables/useLogMessage"
import { logMessages } from "@/constants/log-messages"
import { useConfigStore } from "@/stores/useConfigStore"
import {
  getTemplateFileList,
  type KeyTemplateResourcesDirectoryItem,
} from "@/utils/key-template"
import { storeToRefs } from "pinia"
import { computed, onMounted, ref } from "vue"

const { keyTemplatePath } = storeToRefs(useConfigStore())

// Load key template file list on mount
const { writeLogMessage } = useLogMessage()

const keyTemplateFileList = ref<KeyTemplateResourcesDirectoryItem[] | null>(
  null,
)
const allItemRelativePath = ref<string[] | null>(null)

const loadKeyTemplateFileList = async () => {
  try {
    const loadedData = await getTemplateFileList()

    keyTemplateFileList.value = loadedData.data
    allItemRelativePath.value = loadedData.allItemRelativePath
  } catch {
    keyTemplateFileList.value = []
    writeLogMessage({
      detail: logMessages.keyTemplate.failedToLoadDirectory,
      severity: "error",
    })
  }
}

onMounted(() => {
  loadKeyTemplateFileList()
})

// Check key template input first
const keyTemplatePathDraft = computed<string | undefined>({
  get: () => {
    if (allItemRelativePath.value === null) return undefined

    const path = keyTemplatePath.value ?? undefined

    if (typeof path === "string" && !allItemRelativePath.value.includes(path)) {
      writeLogMessage(
        {
          detail: logMessages.keyTemplate.failedToLocateFile,
          severity: "warn",
        },
        false,
      )

      return undefined
    }

    return path
  },
  set: (value) => {
    keyTemplatePath.value = value ?? null
  },
})
</script>

<template>
  <section>
    <Panel header="설정 파일">
      <CascadeSelect
        fluid
        v-model="keyTemplatePathDraft"
        :loading="keyTemplateFileList === null"
        :options="keyTemplateFileList ?? undefined"
        option-value="fileRelativePath"
        option-group-label="directoryName"
        option-group-children="items"
        option-label="fileName"
      >
        <template #option="slotProps">
          <div class="flex items-center">
            <!-- Icon -->
            <i
              v-if="slotProps.option.type === 'directory'"
              class="pi pi-folder mr-2"
            ></i>
            <i
              v-if="slotProps.option.type === 'file'"
              class="pi pi-file mr-2"
            ></i>
            <!-- Label -->
            <span>{{
              slotProps.option.directoryName || slotProps.option.fileName
            }}</span>
          </div>
        </template></CascadeSelect
      >
    </Panel>
  </section>
</template>
