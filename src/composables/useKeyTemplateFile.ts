import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import { useFileHandler } from "./useFileHandler"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { defaultKeyTemplate } from "@/constants/key-template"
import { logMessages } from "@/constants/log-messages"
import { useLogMessage } from "./useLogMessage"

/**
 * Handler for handling key template files.
 * @returns Functions for saving and loading key template file
 */
export const useKeyTemplateFile = () => {
  const { keyTemplate } = storeToRefs(useKeyTemplateStore())
  const { keyTemplatePath } = storeToRefs(useConfigStore())

  const { getFileData, saveDataToFile } = useFileHandler(
    keyTemplatePath.value,
    KeyTemplate,
  )

  const { writeLogMessage } = useLogMessage()

  /**
   * Loads key template file and mutate the key template store.
   */
  const loadKeyTemplateFile = async () => {
    try {
      const keyTemplateFileData = await getFileData(defaultKeyTemplate)

      // No key template file
      if (keyTemplateFileData === null) {
        setDefaultKeyTemplate()

        writeLogMessage({
          detail: logMessages.keyTemplate.noFile,
          severity: "error",
        })
        return
      }

      keyTemplate.value = keyTemplateFileData
    } catch (error) {
      console.log(error)
      setDefaultKeyTemplate()

      writeLogMessage({
        detail: logMessages.keyTemplate.failedToLoadFallbackDefault,
        severity: "error",
      })
    }
  }

  /**
   * Saves key template store data to the key template file.
   */
  const saveKeyTemplateAsFile = async () => {
    if (keyTemplate.value === null) {
      writeLogMessage({
        detail: logMessages.keyTemplate.noData,
        severity: "error",
      })
      return
    }

    try {
      // Write to the file
      await saveDataToFile(keyTemplate.value)

      // Ping all windows
      await invoke("update_template", {
        from: await getCurrentWebviewWindow().label,
      })
    } catch {
      writeLogMessage({
        detail: logMessages.keyTemplate.failedToSave,
        severity: "error",
      })
    }
  }

  const setDefaultKeyTemplate = () => (keyTemplate.value = defaultKeyTemplate)

  return { loadKeyTemplateFile, saveKeyTemplateAsFile, setDefaultKeyTemplate }
}
