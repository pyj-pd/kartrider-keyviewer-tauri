import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import { useFileHandler } from "./useFileHandler"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { defaultKeyTemplate } from "@/constants/key-template"
import { logMessages } from "@/constants/log-messages"

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

  /**
   * Loads key template file and mutate the key template store.
   */
  const loadKeyTemplateFile = async () => {
    try {
      const keyTemplateFileData = await getFileData()

      // No key template file
      if (keyTemplateFileData === null) {
        setDefaultKeyTemplate()
        console.error(logMessages.keyTemplate.noFile)
        return
      }

      keyTemplate.value = keyTemplateFileData
    } catch {
      setDefaultKeyTemplate()
      console.error(logMessages.keyTemplate.failedToLoadFallbackDefault)
    }
  }

  /**
   * Saves key template store data to the key template file.
   */
  const saveKeyTemplateAsFile = async () => {
    if (keyTemplate.value === null) {
      console.error(logMessages.keyTemplate.noData)
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
      console.error(logMessages.keyTemplate.failedToSave)
    }
  }

  const setDefaultKeyTemplate = () => (keyTemplate.value = defaultKeyTemplate)

  return { loadKeyTemplateFile, saveKeyTemplateAsFile, setDefaultKeyTemplate }
}
